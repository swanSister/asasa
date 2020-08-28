
<template>
  <div class="post-detail-scroll">
     <vue-scroll ref="vs" :ops = "ops"
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
          <div class="post-detail">
            <div class="flex align-items-center header">
              <div class="flex auto justify-content-start">
                <span @click="$router.go(-1)" class="icon-left-open"></span>
              </div>
              <div class="flex auto justify-content-end right-icons">
                <!-- <span class="icon-bell-alt"></span> -->
                <span :class="{'red':isBookmarking()}" class="icon-bookmark" @click="isBookmarking() ? unBookmark() : setBookmark()"></span>
                <div class="more-btn-content" v-if="postData.writerId == $store.state.me.userId">
                  <span class="icon-ellipsis more-btn"></span>
                  <select @change="onChangeSelect">
                    <option value="0" hidden selected></option>
                    <option value="1">삭제</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="body">
              <div class="title">{{postData.title}}</div>
              <div class="info">
                <div class="name" @click="WriterPopupOpen(postData.writer)">
                  {{postData.writerId}} <span>- {{$getBuildingName(postData.writer)}}</span>
                  </div>
                <div class="time">{{$getTime(postData.createdAt)}}</div>
              </div>
              <div class="content">
                  <pre>{{postData.text}}</pre>
                  <div class="img-containner" v-for="(item, index) in postData.imgList" :key="'imageList'+index">
                    <div v-if="item">
                      <div class="img-popup-btn flex justify-content-center align-items-center icon-resize-full-1"></div>
                      <img :src="item.url" @click="imgPopupSrc=item.url">
                      <div class="img-desc" v-if="item.text">
                        {{item.text}}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="button-content flex align-items-center">
              <div :class="{'red':isLiking()}" @click="isLiking() ? unLike() : setLike()" 
              class="flex none justify-content-center align-items-center border-right"><!-- like-->
                <span class="icon red icon-thumbs-up-alt"></span>{{postData.likeCount ? postData.likeCount : '좋아요'}}
              </div>
              <div class="flex none justify-content-center align-items-center border-right"><!-- comment-->
                <span class="icon-comment"></span>{{postData.commentCount ? postData.commentCount : '댓글'}}
              </div>
              <div class="flex none justify-content-center align-items-center"><!-- comment-->
                <span class="icon-share-1"></span>공유하기
              </div>
            </div>
          </div>

          <div class="comment-list" v-if="commentList.length">
              <div class="comment" v-for="(item, index) in commentList" :key="'commentList'+index" >
                <div @click="WriterPopupOpen(item.writer)" class="name flex align-items-center">
                  {{item.writer.userId}} <span>- {{$getBuildingName(item.writer)}}</span>
                </div>
                <div class="comment-img-list flex">
                  <div v-for="(imgItem,index) in item.imgList" :key="'comment-img-list'+index">
                    <img v-if="imgItem" :src="imgItem" @click="imgPopupSrc=imgItem"/>
                  </div>
                </div>
                <div class="text">{{item.text}}</div>
                <div class="flex align-items-center">
                  <div class="time flex auto">
                    {{$getTime(item.createdAt)}}
                  </div>
                  <div class="more-btn-content flex" v-if="item.writerId == $store.state.me.userId">
                    <span class="icon-ellipsis more-btn"></span>
                    <select @change="onChangeCommentSelect($event, item)">
                      <option value="0" hidden selected></option>
                      <option value="1">삭제</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </vue-scroll>
      <div class="footer flex column align-items-center">
        <div ref="commentImg" class="flex justify-content-start comment-img" :style="{
          borderBottom: imgInputList.length ? '1px solid #ddd' : '0'
        }">
          <div v-for="(item, index) in imgInputList" :key="'commentImga'+index" >
              <div class="flex align-items-center justify-content-center close-btn" @click="removeCommentImg(index)">
                <span class="icon-cancel"></span>
              </div>
              <img :src="item" @click="imgPopupSrc=item">
          </div>
        </div>
        <div class="flex comment-input align-items:center;">
          <div class="flex none justify-content-start align-items-center">
              <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none; z-index:-1">
              <label for="file" class="icon icon-camera"></label>
          </div>
          <textarea @keypress="onKeyPress" class="flex align-items-center input-content" ref="inputContent" placeholder="내용을 입력해 주세요" v-model="commentText">
          </textarea>
          <div @click="uploadComment" class="flex align-items-center upload">등록</div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="isWriterPopupShow" class="writer-popup">
          <div class="header flex justify-content-end">
            <span class="icon icon-cancel" @click="isWriterPopupShow=false"></span>
          </div>
          
          <div class="user-id">{{writerPopupData.userId}}</div>
          <div class="building-name">{{$getBuildingName(writerPopupData)}}</div>
          <div class="menu">
            <div class="item" @click="createChatRoom"><span class="icon-chat-empty"></span> 1:1 대화하기</div>
          </div>
        </div>
      </transition>
      <img-popup v-if="imgPopupSrc" :src="imgPopupSrc" @close="imgPopupSrc=''"></img-popup>
      </div>
</template>

<script>


global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import imgPopup from '@/components/popup/imgPopup'
export default {
  name: 'postHeader',

  components:{
    imgPopup
  },
  
  data: function () {
    return {
      isWriterPopupShow:false,
      writerPopupData:{},
      postData:{},
      inputRange:null,
      imgInputList:[],
      commentList:[],
      commentText:'',
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
    imgPopupSrc:null,
    }
  },

  methods: {
    async onChangeSelect(e){
      let res = e.target.value
      e.target.selectedIndex = 0

      if(res==1){
        if(confirm("게시글을 삭제 하시겠습니까?")){
          this.deletePost()
        }
      }
    },
    async onChangeCommentSelect(e, item){
      let res = e.target.value
      e.target.selectedIndex = 0
      if(res==1){
        if(confirm("댓글을 삭제 하시겠습니까?")){
          this.deleteComment(item)
        }
      }
    },
    
    async deleteComment(item){
      let messages = await this.$api.deleteCommentById(item)
      if(messages.status == 200){
        this.commentList = []
        this.offset = 0
        this.postData.commentCount --
        this.getCommentList()
      }else{
        alert("댓글 삭제에 실패했습니다.")
      }
    },
    async deletePost(){
      let messages = await this.$api.deletePostById(this.postData)
      if(messages.status == 200){
          this.$router.go(-1)
          this.$eventBus.$emit("mainPostUpdate", this.postData.topicId)
          
      }else{
        alert("게시글 삭제에 실패했습니다.")
      }
    },
    async updateChatReadTime(chatRoomId, userId){
      await this.$api.updateChatReadTime({
          chatRoomId:chatRoomId,
          userId:userId
        })
    },
    async createChatRoom(){//대화방 존재 유무 체크
      let chatRoomId = ''
      if(confirm('대화방을 만드시겠습니까?')){
        let isExist = await this.$api.checkChatRoomExist({
          openerId:this.$store.state.me.userId,
          userId:this.writerPopupData.userId})
        console.log(isExist)
        if(!isExist.data.data){
          let res = await this.$api.createChatRoom({
            openerId:this.$store.state.me.userId,
            userList:[this.writerPopupData.userId, this.$store.state.me.userId]
          })
          chatRoomId = res.data.data.chatRoomId
          console.log("createChatRoom:", res.data)
          await this.updateChatReadTime(chatRoomId, this.writerPopupData.userId)
        }else{
          chatRoomId = isExist.data.data.chatRoomId
          console.log("chat room exist:", isExist.data.data)
        }
      }
      this.$router.push({name:'chatDetail',query:{
        chatRoomId:chatRoomId,
        youId:this.writerPopupData.userId
      }})
    },
    WriterPopupOpen(writer){
      console.log(writer)
      if(writer.userId != this.$store.state.me.userId){
        this.writerPopupData = writer
        this.isWriterPopupShow = true
      }
    },
    async handleLoadStart(vm, dom, done) {
      this.offset+=this.limit
      await this.getCommentList(this.currentPath,this.offset+1, this.limit)
      done();
    },
    handleLBD(vm, loadDom, done) {
      done();
    },
    async handleRS(vsInstance, refreshDom, done) {
      this.getMessageDetail()
      done();
    },
    handleRBD(vm, loadDom, done) {
      done();
    },
    isLiking(){
      let likeList = this.$store.state.likeList
      let found = likeList.find(item => item.postId == this.postData.postId)
      return found ? true : false
    },
    async setLike(){
      let res = await this.$api.setLike({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('likeList',res.data.data)
        this.postData.likeCount +=1
      }
    },
    async unLike(){
      let res = await this.$api.unLike({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('likeList',res.data.data)
        this.postData.likeCount -=1
      }
    },
    isBookmarking(){
      let bookmarkList = this.$store.state.bookmarkList
      let found = bookmarkList.find(item => item.postId == this.postData.postId)
      return found ? true : false
    },
    async setBookmark(){
      let res = await this.$api.setBookmark({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('bookmarkList',res.data.data)
      }
    },
    async unBookmark(){
      let res = await this.$api.unBookmark({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('bookmarkList',res.data.data)
      }
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
    onKeyPress(e){
      if (e.keyCode == 13) {
        this.uploadComment()
        setTimeout(function(){
            e.target.style.cssText = 'height:9.5vw'
            e.target.blur()
          },100)
      }
    },
    async uploadComment(){
      try{
        if(!this.$store.state.me. isAuthSuccess){
          this.commentText = ''
          this.imgInputList = []
          alert('글쓰기는 인증 후 가능합니다.')
          return
        }

        this.$eventBus.$emit("showLoading")
        
        let writingRes = await this.$api.uploadComment({
            postId: this.$route.query.postId,
            postWriterId:this.postData.writerId,
            text:this.commentText,
            writerId:this.$store.state.me.userId,
            writer:this.$store.state.me,
          })
        
        console.log(writingRes)
        if(writingRes.status==200){
          let commentId = writingRes.data.data.commentId
          console.log("####imgInputList", this.imgInputList)
          for(let i = 0; i<this.imgInputList.length; i++){
            let imgRes = await this.$api.uploadCommentImage(this.dataUriToBlob(this.imgInputList[i]),`${commentId}_${i}_post`)
            console.log(imgRes)
          }
          this.imgInputList = []
          this.commentText = ''
          this.commentList = []
          this.offset = 0
          this.postData.commentCount ++
          this.getCommentList()
        }else{
          console.error(writingRes)
          alert("댓글을 등록에 실패했습니다.")
        }
        this.$eventBus.$emit("hideLoading")
      }catch(e){
        console.error(e.message)
        this.$eventBus.$emit("hideLoading")
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
                that.imgInputList.push(src)
              }
        };
    },
    removeCommentImg: function(index){
      this.imgInputList.splice(index,1);
    },
    async getPostDetail(){
      let messages = await this.$api.getPostDetail({postId: this.$route.query.postId})
      console.log("psot detail:",messages)
      this.postData = messages.data.data
    },
    async getCommentList(){
      let comments = await this.$api.getCommentList({
        postId:this.$route.query.postId,
        offset:this.offset,
        limit:this.limit
      })
      
      comments.data.data.map(item => this.commentList.push(item))
      console.log("comments:",comments.data.data)
    },
    async getMessageDetail(){
      this.commentList = []
      this.offset = 0
      if(this.$route.query.postId){
        this.getPostDetail()
        this.getCommentList()
      }else{
        this.$router.go(-1)
      }
    },
    async checkView(){
      let viewList = this.$store.state.viewList
      let found = viewList.find(item => item == this.$route.query.postId)
      if(!found){
        let res = await this.$api.setViewCount({postId:this.$route.query.postId})
        if(res.status == 200){
          viewList.push(this.$route.query.postId)
          this.$store.commit('viewList',viewList)
        }
      }
    }
  },
  async mounted () {
   try{
      await this.$updateUserInfo()
      this.checkView()
      this.getMessageDetail()
   }catch(e){
     console.error(e.messages)
     alert("error")
     this.$router.push('login')
   }
  }
}
</script>

<style scoped>
 
  .post-detail-scroll{
    height:calc(100% - 18vw) !important;
  }
  .post-detail{
    width:100vw;
    padding:2vw 4vw;
    background:white;
    font-size:4.5vw;
    text-align: left;
    margin-bottom:2vw;
  }
  .header{
    padding:1vw 0;
  }
  .right-icons span{
    font-size:4.5vw;
    color:#aaa;
    margin-right:2vw;
  }
  .right-icons .red{
    color:rgb(21, 134, 204) ;
  }
  .body{

  }
  .body .title{
   font-size:6.5vw;
   font-weight: bold;
   margin:6vw 0 4vw 0;
  }
  .body .info{
    font-size:3.5vw;
    color:#aaa;
    margin-bottom:6vw;
  }
  .body .info .time{
   margin-top: 2vw;
  }
  .body .info .name span{
   color:rgb(21, 134, 204) ;
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
    color:#aaa;
  }
  .button-content > div span{
    margin-right:2vw;
  }
  .button-content > div.red{
    color:rgb(21, 134, 204) ;
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
    font-size:6.5vw;
  }
  [placeholder]:empty::before {
    content: attr(placeholder);
  }
  .footer .comment-input{
    width:100%;
    
    padding:2vw 0;
  }
  .footer .input-content{
    background:white;
    height:9.5vw;
    width:80vw;
    margin-left:4vw;
    font-size: 4vw;
    padding:2vw 0;
  }
  .footer .comment-img{
    width:100%;
    flex-wrap: wrap;
  }
  .comment-img > div{
    display:inline-block;
    position:relative;
    height:20vw;
    margin:2vw 2vw 2vw 0;
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
    color:rgb(21, 134, 204) ;
  }
  .img-desc{
    border-bottom:1px solid rgb(221,221,221);
    margin-bottom:8vw;
    line-height: 8vw;
    color:#000;
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
    font-size:3.5vw;
    margin:1vw 0;
  }
  .comment .name, .comment .time{
    font-size:3.5vw;
    color:#aaa;
  }
  .comment .name{
   margin-bottom:2vw;
  }
  .comment .name span{
    margin-left:2vw;
    color:rgb(21, 134, 204) ;
  }
  .comment-img-list{
    flex-wrap: wrap;
  }
  .comment-img-list img{
    width:22vw;
    height:22vw;
    object-fit: cover;
    margin-right: 1vw;
  }
  .comment-img-list div:last-child img{
    margin-right:0;
  }

  .writer-popup{
    position:fixed;
    left:0;
    top:0;
    width:100vw;
    height:100%;
    background:white;
    z-index: 6;
    padding:0 6vw;
    text-align: left;
  }
  .writer-popup .header{
    font-size:5vw;
    padding:4vw 0;
  }
  .writer-popup .user-id{
    font-size:6.5vw;
    color:#000;
    font-weight: bold;
    margin-bottom: 2vw;
  }
  .writer-popup .building-name{
    margin-bottom:4vw;
  }
  .writer-popup .menu{
    border-top:1px solid #eee;
  }
  .writer-popup .menu .item{
    padding:2vw 0;
    border-bottom:1px solid #eee;
  }
  .more-btn-content{
    position:relative;
  }
  .more-btn-content select{
    position:absolute;
    left:0;
    top:0;
    border:0; 
    height:100%;
    background:transparent;
    opacity: .5;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }
   .more-btn-content select:focus{
     border:0;
     box-shadow: 0;
     outline:none;
   }
</style>
