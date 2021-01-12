
<template>
  <div class="notice-detail-scroll">
     <vue-scroll ref="vs">
        <div class="child">
          <div class="notice-detail">
            <div class="flex align-items-center header">
              <div class="flex none justify-content-start">
                <span @click="$router.go(-1)" class="icon-left-open"></span>
              </div>
            </div>
            <div class="body">
              <div class="title">{{noticeData.title}}</div>
              <div class="info">
                <div class="name" @click="WriterPopupOpen(noticeData.writer)">
                  {{noticeData.writerId}}
                  </div>
                <div class="time">{{$moment(noticeData.createdAt).format('YYYY-MM-DD')}}</div>
              </div>
              <div class="content">
                  <pre>{{noticeData.text}}</pre>
                  <div class="img-containner" v-for="(item, index) in noticeData.imgList" :key="'imageList'+index">
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
          </div>
        </div>
      </vue-scroll>

      <img-popup v-if="imgPopupSrc" :src="imgPopupSrc" @close="imgPopupSrc=''"></img-popup>
      </div>
</template>

<script>

import imgPopup from '@/components/popup/imgPopup'
export default {
  name: 'noticeDetail',

  components:{
    imgPopup
  },
  
  data: function () {
    return {
    noticeData:{},
      
    imgPopupSrc:null,
    }
  },

  methods: {
    async getNoticeDetail(){
      console.log("#####",this.$route.query.noticeId)
      let messages = await this.$api.getNoticeDetail({noticeId: this.$route.query.noticeId})
      console.log("notice detail:",messages)
      this.noticeData = messages.data.data
    },
  },
  async mounted () {
   try{
      this.getNoticeDetail()
   }catch(e){
     console.error(e.messages)
     this.$eventBus.$emit("openAlertPopup","error")
   }
  }
}
</script>

<style scoped>
 
  .notice-detail-scroll{
    height:100% !important;
  }
  .notice-detail{
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
