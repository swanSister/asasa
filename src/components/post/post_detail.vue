
<template>
  <div>
      <div class="post-detail" v-if="postData.data">
        <div class="flex align-items-center header">
          <div class="flex auto justify-content-start">
            <span @click="$router.go('-1')" class="icon-left-open"></span>
          </div>
          <div class="flex auto justify-content-end right-icons">
            <span :class="{'icon-bell':!isAlarm, 'icon-bell-alt':isAlarm}" @click="isAlarm = !isAlarm"></span>
            <span :class="{'icon-bookmark-empty':!isBookmark, 'icon-bookmark':isBookmark}" @click="isBookmark = !isBookmark"></span>
            <span class="icon-dot-3"></span>
          </div>
        </div>
        <div class="body">
          <div class="title">{{postData.data.title}}</div>
          <div class="info">
            <div class="name">{{postData.data.name}}</div>
            <div class="time">{{postData.updatedAt}}</div>
          </div>
          <div class="content">
              {{postData.data.text}}
              <div class="img-containner" v-for="(item, index) in Object.keys(postData.data.imgList)" :key="'imageList'+index">
                <div v-if="postData.data.imgList[item]">
                  <div class="img-popup-btn flex justify-content-center align-items-center icon-resize-full-1"></div>
                  <img :src="postData.data.imgList[item]">
                  <div class="img-desc" v-if="postData.data.imgDescList[index]">
                    {{postData.data.imgDescList[index]}}
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="button-content flex align-items-center">
          <div class="flex none justify-content-center align-items-center border-right"><!-- like-->
            <span class="icon-thumbs-up-1"></span>좋아요
          </div>
          <div class="flex none justify-content-center align-items-center border-right"><!-- comment-->
            <span class="icon-comment"></span>{{postData.data.commentCount}}
          </div>
          <div class="flex none justify-content-center align-items-center"><!-- comment-->
            <span class="icon-share-1"></span>공유하기
          </div>
        </div>

        <div class="comment-list" v-if="commentList.data">
          <div class="comment" v-for="(item, index) in commentList.data" :key="'commentList'+index" >
            <div class="name">name</div>
            <div class="text">{{item.data.text}}</div>
            <div class="">


            </div>
          </div>

        </div>

        <div class="footer flex column align-items-center">
          <div ref="commentImg" class="flex justify-content-start comment-img">
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
            <div @click="addComment" class="flex align-items-center upload">등록</div>
          </div>
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
      isAlarm:false,
      isBookmark:false,
      postData:{},
      inputRange:null,
      imgInputList:[],
      commentList:[],
      commentText:'',
    }
  },
  methods: {
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
    async addComment(){
       let imgList = {}
       for(let i = 0; i<this.imgInputList.length; i++){
          let key = `img_${i}`
          console.log(key)
          imgList[key] = this.dataUriToBlob(this.imgInputList[i].src)
        }
        console.log("imglist:",imgList)
        let imgRes = await this.$api.uploadImages(`upload/images`,imgList)
        // let imgRes = {
        //     "message": "OK",
        //     "data": "images/GivWoVTeScuw2YKf775c",
        //     "createdAt": "2020-05-09T13:17:56.140Z",
        //     "updatedAt": "2020-05-09T13:17:56.140Z"
        //   }
          
        let writingRes = await this.$api.postByPath(`${this.$route.params.path}/comments`, {
          imgList:`ref ${imgRes.data}`,
          text:this.commentText,
          like:5
        })
        console.log(writingRes)
    },
   resizeImage(image) {
        let canvas = document.createElement("canvas"),
        max_size = 1000,
        // 최대 기준을 1280으로 잡음.
        width = image.width,
        height = image.height;
        if (width > height) {
          if (width > max_size) {
            height *= max_size / width;
            width = max_size;
          }
        } else {
          if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        return dataUrl
    },
    async previewFiles(event) {
      let that = this
      var oFReader = new FileReader()
        oFReader.readAsDataURL(event.target.files[0])
        oFReader.onload = function (oFREvent) {
           let image = new Image()
              image.src= oFREvent.target.result
              image.onload = function(){
                let src = that.resizeImage(image)
                console.log(oFREvent.target.result.length, src.length)
                let imgInputData = {src:src}
                that.imgInputList.push(imgInputData)
                console.log(that.imgInputList)
              }
        };
    },
    removeCommentImg: function(index){
      this.commentImgs.splice(index,1);
    },
    async getMessageDetail(){
      if(this.$route.params.path){
        let messages = await this.$api.getByPath(`${this.$route.params.path}`)
        let comments = await this.$api.getByPath(`${this.$route.params.path}/comments`)
        this.postData = messages.data
        this.commentList = comments.data
        console.log("comments",comments)
      }else{
        this.$router.go(-1)
      }
    },
  },
  async mounted () {
    this.getMessageDetail()
    this.varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  }
}
</script>

<style scoped>
  .post-detail{
    padding:2vw 4vw;
    background:white;
    font-size:4vw;
    text-align: left;
    margin-bottom:16vw;
  }
  .header{
    padding:1vw 0;
  }
  .header > div > span{
    font-size:5vw;
  }
  .right-icons span{
    margin-right:2vw;
  }
  .icon-bell-alt, .icon-bookmark{
    color:tomato;
  }
  .body{

  }
  .body .title{
   font-size:7vw;
   font-weight: bold;
   margin:4vw 0;
  }
  .body .info{
    font-size:3vw;
    color:#aaa;
    margin-bottom:6vw;
  }
  .body .info .name{
   color:tomato;
  }
  .body .content{
    padding:4vw 0 2vw 0;
    border-top:1px solid #ddd;

  }
  .body .content img{
    max-width: 100%;
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
    margin:4vw 0;
  }
  .button-content > div{
    width:33%;
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
    padding:2vw;
  }
  .footer .icon{
    font-size:6vw;
  }
  [placeholder]:empty::before {
    content: attr(placeholder);
  }
  .footer .comment-input{
    width:100%;
    border-top: 1px solid #ddd;
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
    padding:0 2vw;
    width:100%;
    margin-bottom:2vw;
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
    line-height:8vw;
  }
  .comment-list{
    width:100%;
    background:rgb(238, 238, 238);
  }
  .comment-list .text{
    color:#000;
  }
</style>
