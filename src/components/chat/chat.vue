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
              <div>{{chatData.title}}</div>
              <span>{{chatData.count}}</span>
            </div>
            <div class="sub">{{chatData.subText}}</div>
          </div>
      </div>
      <div class="time flex none">{{chatData.time}}</div>
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
      
    }
  },
  methods:{
   goDetail(){
     this.$router.push('chatDetail')
   }
  },
  mounted () {
   console.log(this.chatData)
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
    background:#eee;
    padding:.5vw 1vw;
    font-size: 2vw;
    margin-left:2vw;
    color:#aaa;
  }
  .chat-body .text-content .sub{
    font-size: 3.5vw;
  }
  .chat-body .time{
    font-size: 3vw;
  }
</style>
