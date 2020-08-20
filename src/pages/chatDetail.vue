<template>
  <div ref="chatDetail" class="chat-detail"> 
    <div class="header flex none align-items-center">
        <div class="backButton" style="font-size:5vw; margin-left:2vw;">
            <span @click="$router.push('chat')" class="icon-left-open"></span>
        </div>
        <div class="flex auto justify-content-center">
          {{youData.userId}},{{keyboardHeight}}
        </div>
        <div @click="isSliderMenuShow= !isSliderMenuShow" class="backButton" style="font-size:5vw; margin-right:2vw;">
            <span class="icon-menu"></span>
        </div>
      </div>
      <vue-scroll ref="vs" class="chat-detail-content"
        :ops = "ops"
        @refresh-start="handleRS"
        @refresh-before-deactivate="handleRBD">
          <div class="slot-refresh" slot="refresh-deactive"></div>
          <div class="slot-refresh" slot="refresh-beforeDeactive"></div>
          <div class="slot-refresh" slot="refresh-start"></div>
          <div class="slot-refresh" slot="refresh-active"></div>
          <div ref="scrollChild" class="child">
            <div class="chat-content flex column-reverse justify-content-start" >
              <div v-for="(item, index) in chatMessages" :key="'chatMessages'+index">

                <div class="me flex column auto justify-content-end align-items-end" v-if="item.writerId == $store.state.me.userId">
          
                  <div class="flex auto justify-content-end align-items-end">
                    <div>{{$moment(item.createdAt).format('a h:mm')}}</div>
                    
                    <div class="flex column">
                      <img class="chat-content-img" v-for="(src, index) in item.imgList" :key="'chatImg'+index" :src="src"/>
                      <div class="chat-text" v-if="item.text">{{item.text}}</div>
                    </div>
                  </div>
                </div>

                <div class="you flex column auto justify-content-start align-items-start" v-if="item.writerId != $store.state.me.userId">
                  <div class="flex auto justify-content-end align-items-end">
                    <div class="flex column">
                      <img class="chat-content-img" v-for="(src, index) in item.imgList" :key="'chatImg'+index" :src="src"/>
                      <div class="chat-text" v-if="item.text">{{item.text}}</div>
                    </div>
                    <div>{{$moment(item.createdAt).format('a h:mm')}}</div>
                  </div>
                </div>

                <div v-if="item.isDateChanged" class="date-line">
                  <span>{{getDate(item.createdAt)}}</span>
                </div>
              </div>
            </div>
          </div>


        </vue-scroll>
        
        <div ref="textInputContent" class="text-input-content flex column align-items-center">
          <div ref="chatImg" class="flex justify-content-start chat-img" :style="{
            borderBottom: imgInputList.length ? '1px solid #ddd' : '0'
          }">
            <div v-for="(item, index) in imgInputList" :key="'chatImage'+index" >
                <div class="flex align-items-center justify-content-center close-btn" @click="removeChatImg(index)">
                  <span class="icon-cancel"></span>
                </div>
                <img :src="item">
            </div>
          </div>
          <div class="flex chat-input align-items:center;">
            <div class="flex none justify-content-start align-items-center">
                <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none; z-index:-1">
                <label for="file" class="icon icon-camera"></label>
            </div>
            <textarea @focus="onFocusInput" @blur="onBlurInput" @keypress="onKeyPress" class="flex align-items-center input-content" ref="inputContent"  v-model="inputText">
            </textarea>
            <div @click="addChat" class="flex align-items-center upload send-btn">전송</div>
          </div>
        </div>
        <div v-if="isSliderMenuShow" class="slide-menu-bg" @click.self="isSliderMenuShow=false">
        </div>
      <transition name="slide">
          <div v-if="isSliderMenuShow" class="slide-menu">
              <div class="slide-menu-header flex justify-content-start align-items-center">
                <div>방 생성일</div>
                <div class="created-date">{{$moment(chatRoom.createdAt).format('YYYY-MM-DD')}}</div>
              </div>
              <vue-scroll class="slide-menu-body" v-if="youData">
                <div class="user-data flex column justify-content-center align-items-start">
                  
                  <div class="user-id flex align-items-center">
                    <div class="thumbnail-content">
                      <span class="flex justify-content-center align-items-end icon-user thumbnail"></span>
                    </div>
                    <div>
                      <div>{{youData.userId}}</div>
                      <div class="building-name">{{$getBuildingName(youData)}}</div>
                    </div>
                    
                  </div>
                  
                </div>
              </vue-scroll>
              <div class="slide-menu-footer align-items-center flex align-items-center">
                <div class="flex auto justify-content-start"> 
                  <span class="icon-logout" @click="outChatRoom"></span>
                </div>
                <div class="flex auto">
                  <div class="flex auto justify-content-end">
                  </div>
                </div>
              </div> 
          </div>
      </transition>
  </div>
</template>

<script>
export default {
  components:{
  },
  props:{
    
  },
  data () {
    return {
      keyboardHeight:'',
      isSliderMenuShow:false,
      ops : {
        vuescroll: {
          mode: 'slide',
          pullRefresh: {
            enable: true,
            tips:{
              deactive: '',
            active: '',
            start: '',
            beforeDeactive: ''
            }
          },
          pushLoad: {
            enable: false,
            auto: true,
            autoLoadDistance: 10,
            tips:{
              deactive: '',
            active: '',
            start: '',
            beforeDeactive: ''
            }
          }
        }
    },
    offset:0,
    limit:10,
    size:0,
    sort:1,
    chatRoom:{},
    chatMessages:[],
    imgInputList:[],
    inputText:'',
    youData:{}
    }
  },
  methods:{
    onKeyPress(e){
      window.scrollTo(0,0)
      if (e.keyCode == 13) {
        this.addChat(e)
        setTimeout(function(){
          e.target.style.cssText = 'height:9.5vw'
          
        },100)
      }
    },
    getDate(time){
      return this.$moment(time).format('YYYY.MM.DD')
    },
    checkDate(){
      console.log("####checkDate")
      this.chatMessages.map(item => item.isDateChanged = false)
      if(!this.chatMessages.length) return
      
      let date = this.$moment(this.chatMessages[0].createdAt).format('YYYYMMDD')
      for(let i in this.chatMessages){
        let chatDate = this.$moment(this.chatMessages[i].createdAt).format('YYYYMMDD')
        
        if(date != chatDate){
          this.chatMessages[i].isDateChanged = true
          date = chatDate
        }
      }
    },
    async uploadChatImg(){
       let imgList = []
        for(let i = 0; i<this.imgInputList.length; i++){
          imgList.push(this.dataUriToBlob(this.imgInputList[i].src))
        }
        let imgRes = await this.$api.uploadImages(`upload/images`,imgList)
        return imgRes
    },
    dataUriToBlob(dataURI){
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: mimeString});
        return blob;
    },
    async outChatRoom(){
      if(confirm('채팅방을 나가시겠습니까?')){
        let outUserList = this.chatRoom.outUserList
        outUserList.push(this.$store.state.me.userId)

        let messages = await this.$api.outChatRoom({
          chatRoomId:this.chatRoom.chatRoomId,
          outUserList:outUserList
        })
        if(messages.status == 200){
          this.$router.go(-1)
        }
      }
    },
    async addChat(e){
      e.preventDefault()
      e.stopPropagation()
      if(!this.inputText.length && !this.imgInputList.length){
        return
      }

      let writingRes = await this.$api.sendChatMessage({
        chatRoomId:this.$route.query.chatRoomId,
        writerId:this.$store.state.me.userId,
        text:this.inputText,
        userList:this.chatRoom.userList,
        imgList:[],
      })
      this.$eventBus.$emit("hideLoading")
      if(writingRes.status == 200){
        let chatData = writingRes.data.data
        let chatId = chatData.chatId
        
        for(let i = 0; i<this.imgInputList.length; i++){
          console.log("#####",i)
          let imgRes = await this.$api.uploadChatImage(this.dataUriToBlob(this.imgInputList[i]),`${chatId}_${i}_post`)
          chatData.imgList.push(imgRes.data.data)
        }

        this.imgInputList = []
        this.inputText = ''

        chatData.youId = this.youData.userId
        chatData.createdAt = new Date()
        this.$socket.emit('message',{ message: chatData })
        this.$refs.inputContent.click()
        console.log("input click@@@@@@@")
        }else{
          console.error(writingRes)
          alert("채팅 실패")
        }
    },
    removeChatImg: function(index){
      this.imgInputList.splice(index,1);
    },
    async previewFiles(event) {
      let that = this
      var oFReader = new FileReader()
        oFReader.readAsDataURL(event.target.files[0])
        oFReader.onload = function (oFREvent) {
           let image = new Image()
              image.src= oFREvent.target.result
              image.onload = function(){
                let src = that.$resizeImage(image)
                that.imgInputList.push(src)
              }
        };
    },
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 더보기
        this.offset += this.limit
        await this.getChatList()
        done();
    },
    handleRBD(vm, loadDom, done) {
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
      done();
    },
    handleLBD(vm, loadDom, done) {
      done();
    },
    async getChatRoom(){
      let messages = await this.$api.getChatRoom({
        chatRoomId:this.$route.query.chatRoomId,
        youId:this.$route.query.youId})

      this.chatRoom = messages.data.data
      this.youData = this.chatRoom.youData
      console.log("youData:",this.youData)
      this.getChatList()
    },
    async getChatList(){
      let messages = await this.$api.getChatList({
        chatRoomId:this.$route.query.chatRoomId,
        userId:this.$store.state.me.userId,
        offset:this.offset,
        limit:this.limit
      })
      messages.data.data.map(item => this.chatMessages.push(item))
      console.log(this.chatMessages)
      this.checkDate()
    },
    async updateChatReadTime(){
      let messages = await this.$api.updateChatReadTime({
          chatRoomId:this.chatRoom.chatRoomId,
          userId:this.$store.state.me.userId
        })
        console.log("updateChatReadTime:",messages.data)
    },
    socketJoinListener(data){
      this.offset ++
      console.log("#####receive message:", data) 
      this.chatMessages.unshift(data)
      this.goToScrollBottom()
      this.checkDate()
    },
    goToScrollBottom(){
      let that = this
      setTimeout(function(){
        if(!that.$refs["vs"]) return
        that.$refs["vs"].scrollTo(
        {
            y: that.$refs["vs"].scroller.__maxScrollTop
          },
          300,
          "easeInQuad"
      )
      },300)
    },
    onFocusInput(){
      console.log(this.$refs.textInputContent)
      this.$refs.textInputContent.setAttribute("style","height:50%;")
      this.$refs.scrollChild.setAttribute("style","padding-bottom:70%")
      this.goToScrollBottom()
      setTimeout(function(){
        window.scrollTo(0,0)
      },200)
    },
    onBlurInput(){
      this.$refs.textInputContent.setAttribute("style","height:14vw;")
      this.$refs.scrollChild.setAttribute("style","padding-bottom:4vw;")
    }
  },
  async mounted(){
    this.updateChatReadTime()

    this.chatMessages = []
    this.getChatRoom()
    this.goToScrollBottom()
    this.$socket.emit('join',this.$route.query.chatRoomId)
    
    let that = this
    this.$socket.on('message', (data)=> { 
      that.socketJoinListener(data)
    })
    

  },
  async beforeDestroy(){
    console.log("######chat room beforeDestroy")
    this.updateChatReadTime()
    this.$socket.removeListener('message', this.socketJoinListener)
  }
}
</script>
<style scoped>
.chat-detail{
  background:white;
  position:fixed;
  height:100%;
  width:100%;
}
.chat-detail-content{
  width:100%;
  height:calc(100% - 28vw) !important;
  overflow-y:auto;
}
.header{
  font-size:6.5vw;
  font-weight: bold;
  height:14vw;
  background:white;
  color:#333;
}

.slide-menu-bg{
  overflow: hidden;
  width:100vw;
  height:100vh;
  background:rgba(0,0,0,.5);
  position:fixed;
  left:0;
  top:0;
  z-index: 5;
}
.slide-menu{
  width:60vw;
  height:100%;
  background:rgb(240,240,240);
  position: fixed;
  right:0;
  top:0;
  z-index: 6;
}
.slide-leave-active,
.slide-enter-active {
  transition: .5s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}

.slide-menu-header{
  height:14vw;
  border-bottom: 1px solid #ddd;
  font-size:4vw;
  color:#aaa;
  padding:0 4vw;
  background:white;
}
.slide-menu-header .created-date{
  color:#000;
  font-weight: bold;
  margin-left:4vw;
}
.slide-menu-body{
  margin-top:1vw;
  height:calc(100% - 30vw) !important;
  border-bottom: 1px solid #ddd;
  background:white;
}
.slide-menu-body .user-data{
  padding:2vw 4vw;
  border-bottom:1px solid #eee;
  font-size: 5vw;
}
.slide-menu-body .user-data .user-id{
  color:#000;
}
.slide-menu-body .user-data .user-id > .thumbnail-content{
  width:10vw;
  height:10vw;
  border-radius: 50%;
  background:#eee;
  overflow: hidden;
  margin-right:4vw;
}
.slide-menu-body .user-data .user-id > .thumbnail-content > .thumbnail{
  width:10vw;
  height:10vw;
  font-size:8vw;
  color:#aaa;
}
.slide-menu-body .user-data .building-name{
  color:#aaa;
  font-size: 3.5vw;
  text-align: left;
  color:rgb(21, 134, 204) ;
}
.slide-menu-footer{
  margin-top:1vw;
  height:14vw;
  max-height: 14vw;
  font-size: 5vw;
  padding:0 4vw;
  background:white;
}
.text-input-content{
  border-top:1px solid #eee;
  min-height:10vw;
  width:100%;
  background:white;
  padding:0 2vw;
  position:absolute;
  bottom:0;
  height:14vw;
  left:0;
}
.text-input-content .icon{
  font-size:6.5vw;
}
[placeholder]:empty::before {
  content: attr(placeholder);
}
.text-input-content .chat-input{
  width:100%;
  padding:2vw 0;
}
.text-input-content .input-content{
  background:white;
  height:9.5vw;
  width:80vw;
  margin-left:4vw;
  font-size: 4vw;
  padding:2vw 0;
}
.text-input-content .chat-img{
  padding:0 2vw 0 2vw;
  width:100%;
  flex-wrap: wrap;
}
.text-input-content .chat-img > div{
  display:inline-block;
  position:relative;
  margin :2vw;
}
.text-input-content .chat-img > div > .close-btn{
  width:4vw;
  height:4vw;
  border-radius: 50%;;
  background:#aaa;
  position:fixed;
  right:.5vw;
  top:.5vw;
  color:#fff;
}

.text-input-content .chat-img img{
  width:20vw;
  height:20vw;
  object-fit:cover; 
  display:inline-block;
}
.text-input-content .upload{
  width:10vw;
  color:rgb(21, 134, 204) ;
}
.chat-content{
  padding-bottom:4vw;
}
.chat-content .me, .chat-content .you{
  font-size:3.5vw;
}
.chat-content .me > div, .chat-content .you > div{

}
.chat-content .chat-text{
  max-width:70vw;
  font-size: 4vw;
  background:rgb(21, 134, 204) ;
  padding:2vw;
  color:white;
  word-break: break-all;
  border-radius: 2vw;
  margin:4vw 4vw 0 4vw;
}
.chat-content .me .chat-text{
  text-align: left;
}
.chat-content .you .chat-text{
  text-align: right;
}
.chat-content-img{
  width:40vw;
  height:40vw;
  object-fit: cover;
  margin:4vw 4vw 0 4vw;
}
.chat-content .you .chat-text{
  background:#eee;
  color:#000;
}
.chat-content .date-line{
  margin-top:6vw;
  border-bottom:1px solid #eee;
  line-height: 0.1em;
}
.chat-content .date-line span{
  background:white;
  padding:0 2vw;
  font-size: 3.5vw;
}
</style>