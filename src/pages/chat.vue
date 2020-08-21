<template>
  <div class="chat"> 
    <div class="chat-header flex align-items-center column justify-content-center">
      <div class="flex align-items-center title-content">
        <div class="flex auto justify-content-center title">대화</div>
      </div>
    </div>
    <div class="chat-tab flex auto align-items-center justify-content-center"> 
        <div @click="setIsMyChat(true)" class="flex auto btn justify-content-center align-items-center" :class="{'selected':isMyChat}">MY</div>
        <div @click="setIsMyChat(false)" class="flex auto btn justify-content-center align-items-center" :class="{'selected':!isMyChat}">퍼블릭</div>
    </div>
    
      <vue-scroll class="chat-content"
        :ops = "ops"
        @refresh-start="handleRS"
        @load-before-deactivate="handleLBD"
        @refresh-before-deactivate="handleRBD"
        @load-start="handleLoadStart">
          <div class="slot-load" slot="load-beforeDeactive"></div>
          <div class="slot-load" slot="load-deactive"></div>
          <div class="slot-load" slot="load-start"></div>
          <div class="slot-load" slot="load-active"></div>
          <div class="slot-refresh" slot="refresh-deactive"></div>
          <div class="slot-refresh" slot="refresh-beforeDeactive"></div>
          <div class="slot-refresh" slot="refresh-start"></div>
          <div class="slot-refresh" slot="refresh-active"></div>
          <div class="child">
            <div v-if="isMyChat">
              <ChatList :chatList="chatList"></ChatList>
            </div>
            <div v-else>
              <div style="color:#555; font-size:4.5vw; margin-top:10vw;">
                준비중입니다.
              </div>
              </div>
          </div>
        </vue-scroll>
      <Footer v-bind:footerIndex="2"></Footer>
   
  </div>
</template>

<script>
import ChatList from '@/components/chat/chat_list.vue'
import Footer from '@/components/footer'
export default {
  components:{
    ChatList,
    Footer,
  },
  props:{
    
  },
  data () {
    return {
      isMyChat:true,
      chatList:[],
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
            enable: true,
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
    limit:100,
    size:0,
    sort:1,
    }
  },
  methods:{
    setIsMyChat(type){
      this.isMyChat = type
    },
    async handleRS(vsInstance, refreshDom, done) { //위로 당겨서 새로고침
      done();
    },
    handleRBD(vm, loadDom, done) {
      done();
    },
    async handleLoadStart(vm, dom, done) { //아래 당겨서 더보기
       if(this.offset + this.limit <= this.size){
        this.offset+=this.limit
        await this.getMessages()
      }
      done();
    },
    handleLBD(vm, loadDom, done) {
      done();
    },
    async getMessages(){
        let messages = await this.$api.getChatRoomList({
          userId:this.$store.state.me.userId
        })
        this.chatList = messages.data.data
        console.log(messages)
    },
    socketJoinListener(data){
      let found = this.chatList.find(item=>item.chatRoomId==data.chatRoomId)
      if(found){
        found.notiCount ++
        found.lastChat={
          imgList:data.imgList,
          text:data.text,
          writerId:data.writerId,
          createdAt:data.createdAt
        }
      }else{
        this.chatList = []
        this.getMessages()
      }
      
    },
  },
  async mounted(){  
    console.log("####joinList")
    this.$socket.emit('joinList',this.$store.state.me.userId)

    let that = this
    this.$socket.on('listMessage', (data)=> { 
      that.socketJoinListener(data)
    })
    this.getMessages()
  },
  async beforeDestroy(){
    console.log("######chat list beforeDestroy")
    this.$socket.removeListener('listMessage', this.socketJoinListener)
  }
}
</script>
<style scoped>
.chat{
  background:white;
}
.chat-content{
  width:100%;
  height:calc(100% - 38vw) !important;
  overflow-y:auto;
}
.chat-header{
  background:white;
  height:14vw;
  border-bottom: 1px solid #eee;
  padding:0 4vw;
}
.chat-header .title-content{
  width:100%;
  font-size: 6vw;
  color:#333;
  font-weight: bold;
}
.chat-header .sub{
  font-size: 3vw;
}
.chat-header .sub > span{
  color:#21baf6;
}
.chat-tab{
  height:10vw;
  background:white;
  border-bottom: 1px solid #eee;
}
.chat-tab .btn{
  height:100%;
}
.chat-tab .btn.selected{
  border-bottom:3px solid #000;
}
</style>