
<template>
  <div class="post-writing">
      <div class="header flex align-items-center">
        <div class="cancel flex auto justify-content-start" @click="$router.go(-1)">
          취소
        </div>
        <div @click="isLocationListShow=true" class="title flex auto justify-content-center align-items-center">
          {{title}}
          <span class="icon icon-down-open"></span>
        </div>
        <div class="add flex auto justify-content-end" @click="writePost">
          등록
        </div>
      </div>

      <div ref="body" class="body">
        <textarea class="flex auto" v-model="subject" placeholder="제목을 입력해 주세요"></textarea>
        <textarea class="input-content flex none" v-model="content" placeholder="내용을 입력해 주세요"></textarea>
        <div class="img-list" v-for="(item, index) in imgInputList" :key="'imgInputList'+index">
          <img :src="item.src"/>
          <input v-model="item.desc" maxlength="30" placeholder="이미지에 대한 설명을 입력해주세요.(선택)"/>
        </div>
      </div>

      <div ref="footer" class="footer flex auto justify-content-start align-items-center;">
        <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none; z-index:-1">
        <label for="file" class="icon icon-camera"></label>
     </div>

      <transition name="fade">
        <div v-if="isLocationListShow" @click.self="isLocationListShow=false" class="location-list">
            <div class="list">
              <div @click="onClickListItem(item)" class="item" v-for="(item, index) in postList" :key="index+'-itemList'">
                <div class="name">{{item.name}}</div>
              </div>
            </div>
        </div>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'postHeader',
  components:{
    
  },

  
  data: function () {
    return {
      postList:[],
      imgInputList:[],
      varUA:null,
      inputRange:null,
      title:'등록위치선택',
      isLocationListShow:false,
      subject:'',
      content:'',
    }
  },
  methods:{

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

    onClickListItem:function(item){
      this.postList.map(item => item.isSelected = false)
      this.title = item.name
      item.isSelected = true
      this.isLocationListShow = false;
      this.$refs.fileInput.focus()
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
                console.log(oFREvent.target.result.length, src.length)
                let imgInputData = {src:src, desc:''}
                that.imgInputList.push(imgInputData)
              }
        };
    },

    async writePost(){
      let found = this.postList.find(item => item.isSelected == true)
      console.log(found)
      if(found){
        this.$eventBus.$emit("showLoading")
 
       let writingRes = await this.$api.uploadPost({
          topicId: found.topicId,
          userId:this.$store.state.me.userId,
          writerId:this.$store.state.me.userId,
          writer:this.$store.state.me,
          title:this.subject,
          text:this.content,
          viewCount:0,
          likeCount:0
        })
        
        console.log(writingRes.data.data.postId)
        
        if(writingRes.status == 200){//post image upload 
          let postId = writingRes.data.data.postId
          for(let i = 0; i<this.imgInputList.length; i++){
            let imgRes = await this.$api.uploadPostImage(this.dataUriToBlob(this.imgInputList[i].src),`${postId}_${i}_post`,this.imgInputList[i].desc)
            console.log(imgRes)
          }
          this.$router.go(-1)
          this.$eventBus.$emit("mainPostUpdate", found.topicId)
        }else{
          console.error(writingRes)
        }
        this.$eventBus.$emit("hideLoading")
      }else{
        this.$eventBus.$emit("openAlertPopup","게시글 등록위치를 선택해 주세요.")
      }
    }
  },
  async mounted () {
    await this.$updateUserInfo()
    let topics = JSON.parse(JSON.stringify(this.$store.state.me.topics))
    
    this.postList = this.$store.state.me. isAuthSuccess ? topics : [topics[0]]
    this.varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  }
}
</script>

<style scoped>
  .post-writing{
    width:100%; height:100%;
    background:white;
  }
  .header{
    height:18vw;
    border-bottom:1px solid #ddd;
    padding:0 4vw;
    font-size: 4.5vw;
  }
  .header .cancel{
    color:#000;
  }
  .header .title{
    font-weight: bold;
  }
  .header .title .icon{
    font-size:1.5vw;
    margin-left:1vw;
  }
  .header .add{
    color:rgb(21, 134, 204) ;
  }
  .body{
    padding:2vw;
    padding-bottom:10vw;
    height:calc(calc(var(--vh, 1vh) * 100) - 36vw);
    overflow:scroll;
  }
  .body textarea{
    width:100%;
    font-size: 4vw;
    line-height:1.5;
    min-height:12vw;
    overflow-y: hidden; /* fixes scrollbar flash - kudos to @brettjonesdev */
  }
  .body textarea:first-child{
    max-height:18vw;
    border-bottom:1px solid #ddd;
  }
  .body textarea:nth-child(2){
    overflow: auto;
    height:auto;
    resize:none;
    
    max-height:130vw;
  }
  div[contenteditable] {
    color : #8e8e8e;
    font-size: 4vw;
    text-align: left;
    padding-top: 4vw;
    white-space: pre-wrap;
    min-height: 20vh;
  }
  [placeholder]:empty::before {
    content: attr(placeholder);
      
  }
  .footer{
    width:100%;
    position:relative;
    height:18vw;
    border-top:1px solid #ddd;
    padding:0 4vw;
    background:white;
    z-index: 1;
  }
  .footer .icon{
    font-size:7vw;
    margin-top:2vw;
  }

  .location-list{
    background:rgba(0,0,0,.5);
    width:100vw;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    z-index: 1;
  }
  .location-list .list{
    width:100vw;
    max-height:100vw;
    background:white;
    position: fixed;
    left:0;
    bottom:0;
    overflow:scroll;
    padding:0 2vw;
  }
  .location-list .list .item{
    border-bottom:1px solid #ddd;
    padding:3vh 0;
  }
  .location-list .list .item .name{
    font-size:4.5vw;
    font-weight: bold;
    color:#000;
  }
  .location-list .list .item .desc{
    font-size:3.5vw;
    color:#aaa;
    font-weight: bold;
    margin-top:1vw;
  }
  .img-list img{
    width:100%;
  }
  .img-list input{
    width:100%;
    font-size: 4vw;
    padding:2vw 0;
    border:0;
    border-bottom:1px solid #ddd;
  }
  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
  

</style>
