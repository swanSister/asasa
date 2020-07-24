<template>
  <div class="chat">
    <div class="chat-body flex auto" @click="goDetail">
     <div class="thumbnail-content">
       <span class="flex justify-content-center align-items-end icon-user thumbnail"></span>
    </div>
     <div class="flex auto text-box">
      <div class="flex auto">
          <div class="text-content flex column">
            <div class="title flex align-items-center">
              <div>{{chatData.fields.receiverId == $store.state.me.userId ? chatData.fields.senderId : chatData.fields.receiverId}}</div>
              <span v-if="notReadCount > 0">{{notReadCount}}</span>
            </div>
            <div class="sub" v-if="messageData.fields">{{messageData.fields.text}}</div>
          </div>
      </div>
      <div class="time flex align-items-center">{{getTime(messageData.createdAt)}}</div>
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
      
      if(today == day){
        return this.$moment(time).format('a h:mm')
      }else if(day == yesterday){
        return '어제'
      }else{
        return this.$moment(time).format('YYYY년 MM월 DD')
      }
    },
   goDetail(){
     this.$router.push({name:'chatDetail',query:{path:this.chatData.path}})
   },
   async getText(){
     let messages = await this.$api.getByPath(`${this.chatData.path}/messages`,0, 1)
   
     if(localStorage.getItem(this.chatData.path)){
       let size = parseInt(localStorage.getItem(this.chatData.path))
       console.log(size, messages.data.size)
       if(messages.data.size > size){
         this.notReadCount = messages.data.size - size
       }
     }
     
     if(messages.data.documents.length){
       this.messageData = messages.data.documents[0]
     }
   }
  },
  async mounted () {
   this.getText()
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
    font-size: 4vw;
    color:#555;
    margin-bottom: 1.5vw;
  }
  .chat-body .text-content .title > div{
    max-width:90%;
  }
  .chat-body .text-content .title > span{
    background:tomato;
    font-weight: bold;
    padding:.5vw 1vw;
    font-size: 2.5vw;
    margin-left:2vw;
    border-radius: 1vw;
    color:white;
  }
  .chat-body .text-content .sub{
    font-size: 3.5vw;
    color:#999;
  }
  .chat-body .time{
    font-size: 3vw;
  }
</style>
