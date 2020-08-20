<template>
  <div class="chat">
    <div class="chat-body flex auto align-items-center" @click="goDetail">
     <div class="thumbnail-content">
       <span class="flex justify-content-center align-items-end icon-user thumbnail"></span>
    </div>
     <div class="flex auto text-box">
      <div class="flex auto">
          <div class="text-content flex column">
            <div class="title flex align-items-center">
              <div>{{chatData.userList[0] == $store.state.me.userId ? chatData.userList[1] : chatData.userList[0]}}</div>
              <span v-if="chatData.notiCount > 0">{{chatData.notiCount}}</span>
            </div>
            <div class="sub"> {{chatData.lastChat.imgList && chatData.lastChat.imgList.length ? '사진' : (chatData.lastChat.text ? chatData.lastChat.text : '대화를 시작해 보세요.')}}</div>
          </div>
      </div>
      <div class="time flex align-items-center">{{chatData.lastChat.createdAt ? getTime(chatData.lastChat.createdAt) :  getTime(chatData.createdAt) }}</div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  props: {
    chatData:{},
   
  },
  data: function () {
    return {
      notReadCount:0,
      messageData:{},
    }
  },
  methods:{
    getTime(time){
      let today = this.$moment().format('YYYYMMDD')
      let day = this.$moment(time).format('YYYYMMDD')
      let yesterday = this.$moment().subtract(1, 'days').format('YYYYMMDD')
      let year = this.$moment().format('YYYY')
      

      if(today == day){
        return this.$moment(time).format('a h:mm')
      }else if(day == yesterday){
        return '어제'
      }else if(year == this.$moment(time).format('YYYY')){
        return this.$moment(time).format('MM월 DD일')
      }
      else{
        return this.$moment(time).format('YYYY.MM.DD')
      }
    },
   goDetail(){
     this.$router.push({name:'chatDetail',query:{
       chatRoomId:this.chatData.chatRoomId,
       youId:this.chatData.userList[0] == this.$store.state.me.userId ? this.chatData.userList[1] : this.chatData.userList[0]
      }})
   },
 
  },
  async mounted () {
  }
}

</script>

<style scoped>
  .chat{
    background:white;
    display:flex;
    flex-direction:column;
    color:#aaa;
  }
  .chat-body{
    padding:4vw 4vw 0 4vw;
  }
  .chat-body > .thumbnail-content{
    width:10vw;
    height:10vw;
    border-radius: 50%;
    background:#eee;
    overflow: hidden;
    margin-bottom:4vw;
  }
  .chat-body > .thumbnail-content > .thumbnail{
    width:10vw;
    height:10vw;
    font-size:8vw;
    color:#aaa;
  }
  .chat-body .text-box{
    border-bottom:1px solid #eee;
    margin-left: 4vw;
    padding-bottom: 4vw;
  }
  .chat-body .text-content{
    min-width:55vw;
    max-width:55vw;
    white-space: nowrap;
    text-align: left;
  }
  .chat-body .text-content div{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chat-body .text-content .title{
    font-size: 5vw;
    color:#555;
    margin-bottom: 1.5vw;
  }
  .chat-body .text-content .title > div{
    max-width:90%;
  }
  .chat-body .text-content .title > span{
    background:rgb(21, 134, 204) ;
    font-weight: bold;
    padding:.5vw 1vw;
    font-size: 3.5vw;
    margin-left:2vw;
    border-radius: 1vw;
    color:white;
  }
  .chat-body .text-content .sub{
    font-size: 4vw;
    color:#999;
  }
  .chat-body .time{
    font-size: 3.5vw;
  }
</style>
