
<template>
  <div>
      <div class="post-detail" v-if="postData.fields">
        <div class="flex align-items-center header">
          <div class="flex auto justify-content-start">
            <span @click="$router.go('-1')" class="icon-left-open"></span>
          </div>
          <div class="flex auto justify-content-end right-icons">
            <span class="icon-bell-alt"></span>
            <span :class="{'red':$store.state.me.bookmark && $store.state.me.bookmark[postData.path]}" class="icon-bookmark" @click="setBookmark"></span>
            <span class="icon-dot-3"></span>
          </div>
        </div>
        <div class="body">
          <div class="title">{{postData.fields.title}}</div>
          <div class="info">
            <div class="name">
              {{postData.fields.userId}} <span>· {{postData.fields.buildingName}}</span>
              </div>
            <div class="time">{{postData.updatedAt}}</div>
          </div>
          <div class="content">
              <pre>{{postData.fields.text}}</pre>
              <div class="img-containner" v-for="(item, index) in postData.fields.imgList.files" :key="'imageList'+index">
                <div v-if="item">
                  <div class="img-popup-btn flex justify-content-center align-items-center icon-resize-full-1"></div>
                  <img :src="item">
                  <div class="img-desc" v-if="postData.fields.imgDescList[index]">
                    {{postData.fields.imgDescList[index]}}
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="button-content flex align-items-center">
          <div :class="{'red':$store.state.me.like && $store.state.me.like[postData.path]}" @click="setLike" 
          class="flex none justify-content-center align-items-center border-right"><!-- like-->
            <span class="icon red icon-thumbs-up-alt"></span>{{postData.fields.like ? postData.fields.like : '좋아요'}}
          </div>
          <div class="flex none justify-content-center align-items-center border-right"><!-- comment-->
            <span class="icon-comment"></span>{{postData.fields.commentCount ? postData.fields.commentCount : '댓글'}}
          </div>
          <div class="flex none justify-content-center align-items-center"><!-- comment-->
            <span class="icon-share-1"></span>공유하기
          </div>
        </div>
      </div>

       <div class="comment-list" v-if="commentList.length">
          <div class="comment" v-for="(item, index) in commentList" :key="'commentList'+index" >
            <div class="name flex align-items-center">
              {{item.fields.userId}} <span>· {{item.fields.buildingName}}</span>
            </div>
            <div class="comment-img-list flex">
              <div v-for="(src,index) in item.fields.imgList.files" :key="'comment-img'+index">
                <img v-if="src" :src="src"/>
              </div>
            </div>
            <div class="text">{{item.fields.text}}</div>
            <div class="time">
              {{item.updatedAt}}
            </div>
          </div>
        </div>
        <div class="footer flex column align-items-center">
          <div ref="commentImg" class="flex justify-content-start comment-img" :style="{
            borderBottom: imgInputList.length ? '1px solid #ddd' : '0'
          }">
            <div v-for="(item, index) in imgInputList" :key="'commentImga'+index" >
                <div class="flex align-items-center justify-content-center close-btn" @click="removeCommentImg(index)">
                  <span class="icon-cancel"></span>
                </div>
                <img :src="item.src">
            </div>
          </div>
          <div class="flex comment-input align-items:center;">
            <div class="flex none justify-content-start align-items-center;">
                <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none; z-index:-1">
                <label for="file" class="icon icon-camera"></label>
            </div>
            <textarea class="flex align-items-center input-content" ref="inputContent" placeholder="내용을 입력해 주세요" v-model="commentText">
            </textarea>
            <div @click="addComment" class="flex align-items-start upload">등록</div>
          </div>
        </div>
  </div>
</template>

<script>

export default {
  name: 'postHeader',

  components:{
    
  },
  
  data: function () {
    return {
      varUA:null,
      postData:{},
      inputRange:null,
      imgInputList:[],
      commentList:[],
      commentText:'',
    }
  },
  methods: {
    async setBookmark(){
      await this.$setCount('counts/bookmark',this.postData.path)
    },
    async setLike(){
      await this.$setCount('counts/like',this.postData.path)
      this.getPostDetail()
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
    async uploadCommentImg(){
       let imgList = []
        for(let i = 0; i<this.imgInputList.length; i++){
          imgList.push(this.dataUriToBlob(this.imgInputList[i].src))
        }
        let imgRes = await this.$api.uploadImages(`upload/images`,imgList)
        return imgRes
    },


    async addComment(){
      
      if(!this.$store.state.me.isAuth){
         alert('글쓰기는 인증 후 가능합니다.')
         this.commentText = ''
         this.imgInputList = []
        return
      }

      this.$eventBus.$emit("showLoading")
      let imgRes

      if(this.imgInputList.length){
        imgRes = await this.uploadCommentImg()
      }
      let writingRes = await this.$api.postByPath(`${this.$route.query.path}/comments`, {
          imgList:imgRes ? `ref ${imgRes.headers.location}` : '',
          text:this.commentText,
          userId:this.$store.state.me.userId,
          buildingName:this.$store.state.me.public ?
          (this.$store.state.me.houseType == 3 ? '주택' : (this.$store.state.me.addressData.buildingName)) : '비공개',
          writer:'ref '+this.$store.state.me.path
        })

      let mineRes = await this.$api.postByPath(`${this.$store.state.me.path}/mine`, {
        path: this.$route.query.path,
        type: 2, //댓글
        topic: this.postData.fields.topic,
        title: this.commentText
      })

      this.$eventBus.$emit("hideLoading")
      if(writingRes.data.code == 201 && mineRes.data.code == 201){
        alert("댓글을 등록했습니다.")
        this.imgInputList = []
        this.commentText = ''
        this.getCommentList()
      }else{
        console.error(writingRes)
        console.error(mineRes)
        alert("댓글을 등록 실패")
      }
        
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
                let imgInputData = {src:src}
                that.imgInputList.push(imgInputData)
              }
        };
    },
    removeCommentImg: function(index){
      this.imgInputList.splice(index,1);
    },
    async getPostDetail(){
      let messages = await this.$api.getByPath(`${this.$route.query.path}`)
      console.log("psot detail:",messages)
      this.postData = messages.data
    },
    async getCommentList(){
      let comments = await this.$api.getByPath(`${this.$route.query.path}/comments`)
      this.commentList = comments.data.documents
      //console.log("comments",this.commentList)
    },
    async getMessageDetail(){
      if(this.$route.query.path){
        this.getPostDetail()
        this.getCommentList()
        
      }else{
        this.$router.go(-1)
      }
    },
  },
  async mounted () {
   try{
      if( !this.$store.state.me.view || (this.$store.state.me.view && !this.$store.state.me.view[this.$route.query.path])){
        this.$setCount('counts/view',this.$route.query.path)
      }else{
        await this.$updateUserInfo()
      }
      this.getMessageDetail()
      this.varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
   }catch(e){
     console.error(e.messages)
     alert("error")
     this.$router.push('login')
   }
  }
}
</script>

<style scoped>
  .post-detail{
    width:100vw;
    padding:2vw 4vw;
    background:white;
    font-size:4vw;
    text-align: left;
    margin-bottom:2vw;
  }
  .header{
    padding:1vw 0;
  }
  .right-icons span{
    font-size:4vw;
    color:#aaa;
    margin-right:2vw;
  }
  .right-icons .red{
    color:tomato;
  }
  .body{

  }
  .body .title{
   font-size:6vw;
   font-weight: bold;
   margin:4vw 0;
  }
  .body .info{
    font-size:3vw;
    color:#aaa;
    margin-bottom:6vw;
  }
  .body .info .name{
   
  }
  .body .info .name span{
   color:tomato;
  }
  .body .content{
    padding:4vw 0 2vw 0;
    border-top:1px solid #ddd;

  }
  .body .content img{
    max-width: 100%;
    width:100%;
  }
  .img-containner{
    position:relative;
  }
  .img-containner .img-popup-btn{
    position:absolute;
    right:1vw;
    top:1vw;
    color:white;
    background:#666;
    width:6vw;
    height:6vw;
    font-size: 5vw;
  }
  .button-content{
    margin:2vw 0;
  }
  .button-content > div{
    font-size: 3.5vw;
    width:33%;
  }
  .button-content > div span{
    margin-right:2vw;
  }
  .button-content > div.red{
    color:tomato;
  }
  .button-content > div.border-right{
    border-right:1px solid #ddd;
  }
  .footer{
    min-height:10vw;
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:white;
    padding:0 2vw;
  }
  .footer .icon{
    font-size:6vw;
  }
  [placeholder]:empty::before {
    content: attr(placeholder);
  }
  .footer .comment-input{
    width:100%;
    
    padding-top:2vw;
  }
  .footer .input-content{
    background:white;
    height:auto;
    width:80vw;
    margin-left:4vw;
    font-size: 4vw;
  }
  .footer .comment-img{
    padding:2vw 2vw 0 2vw;
    width:100%;
    flex-wrap: wrap;
    
  }
  .comment-img > div{
    display:inline-block;
    position:relative;
    margin-right:2vw;
  }
  .comment-img > div > .close-btn{
    width:4vw;
    height:4vw;
    border-radius: 50%;;
    background:#aaa;
    position:absolute;
    right:.5vw;
    top:.5vw;
    color:#fff;
  }
  .footer .comment-img img{
    width:20vw; 
    height:20vw; 
    object-fit:cover; 
    display:inline-block;
  }
  .footer .upload{
    width:10vw;
    color:tomato;
  }
  .img-desc{
    border-bottom:1px solid #ddd;
    margin-bottom:4vw;
    color:#aaa;
  }
  .comment-list{
    width:100vw;
    background:white;
    border-top:1px solid #ddd;
    margin-bottom:16vw;
    border-top:1px solid #ddd;
    
  }
  .comment{
    width:100vw;
    padding:2vw;
    border-bottom:1px solid #ddd;
    text-align: left;
  }
  .comment .text{
    min-height:4vw;
    font-size:3vw;
    margin:1vw 0;
  }
  .comment .name, .comment .time{
    font-size:3vw;
    color:#aaa;
  }
  .comment .name{
   
  }
  .comment .name span{
    margin-left:2vw;
    color:tomato;
  }
  .comment-img-list{
    flex-wrap: wrap;
  }
  .comment-img-list img{
    width:18vw;
    height:18vw;
    object-fit: cover;
    margin-right: 1vw;
  }
  .comment-img-list div:last-child img{
    margin-right:0;
  }
</style>
