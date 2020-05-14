
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

        <div class="footer flex column align-items-center">
          <div ref="commentImg" class="flex justify-content-start comment-img">
            <div v-for="(item, index) in commentImgs" :key="'commentImga'+index" >
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
            <div @focus="onFocus" @blur="onFocusout" @click="onKeyup($event)" @keyup="onKeyup($event)" @keydown="onKeydown($event)"  
                class="flex align-items-center input-content" ref="inputContent" contentEditable placeholder="내용을 입력해 주세요">
            </div>
            <div class="flex align-items-center upload">등록</div>
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
      isAlarm:false,
      isBookmark:false,
      postData:{},
      inputRange:null,
      commentImgs:[],

    }
  },
  methods: {
    onFocus: function(){
      if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
        setTimeout(function(){
          let vh = window.innerHeight * 0.01 * 0.6;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
         },100);
      }
    },
    onFocusout: function(){
      if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
        setTimeout(function(){
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
         },100);
      }
    },
    onKeydown: function(e){
       if (e.keyCode === 13) {//엔터시 contenteditable 강제 줄바꿈
          e.preventDefault(); //Prevent default browser behavior
          if (window.getSelection) {
              var selection = window.getSelection(),
                  range = selection.getRangeAt(0),
                  br = document.createElement("br"),
                  textNode = document.createTextNode("\u00a0");
              
              range.insertNode(br);
              range.collapse(false);
              range.insertNode(textNode);
              range.setStartAfter(br);
              range.setEndAfter(br);

              range.deleteContents();
              selection.removeAllRanges();
              selection.addRange(range);
          }
       }
    },
    previewFiles(event) {
      let that = this
      var oFReader = new FileReader()
        oFReader.readAsDataURL(event.target.files[0])
        oFReader.onload = function (oFREvent) {
          let img = document.createElement('img'),
          br = document.createElement("br")
          
          that.commentImgs.push({src:oFREvent.target.result})
          
          that.$refs.commentImg.append(img);

          that.inputRange.collapse(false);
          that.inputRange.insertNode(br);
          that.inputRange.setStartAfter(br);
          that.inputRange.setEndAfter(br);

          window.getSelection().removeAllRanges();
          window.getSelection().addRange(that.inputRange);
          this.onFocusout();
        };
    },
    onKeyup: function(){
      this.inputRange = window.getSelection().getRangeAt(0);
    },
    removeCommentImg: function(index){
      this.commentImgs.splice(index,1);
    },
    async getMessageDetail(){
      if(this.$route.params.path){
        let messages = await this.$api.getByPath(`${this.$route.params.path}`)
        this.postData = messages.data
        console.log(this.postData)
      }else{
        this.$router.go(-1)
      }
    },
  },
  async mounted () {
    this.getMessageDetail()
  }
}
</script>

<style scoped>
  .post-detail{
    padding:2vw 4vw;
    background:white;
    font-size:4vw;
    text-align: left;
    margin-bottom:12vw;
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
</style>
