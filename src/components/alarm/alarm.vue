<template>
  <div class="notice">
    <div class="notice-body flex auto" @click="goDetail">
      <div class="icon">
        <span class="icon-bell-alt"></span>
      </div>
      <div class="flex column auto" style="max-width:93%;">
        <div class="text-content">
          <div class="title">{{title}}</div>
          <div class="sub" style="max-width:100%;">
            <div>{{text}}</div>
          </div>
        </div>
        <div class="flex auto writer-content justify-content-end">
         <div class="time">{{$moment(alarmData.createdAt).format('YYYY-MM-DD')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  props: {
    alarmData:{},
  },
  data: function () {
    return {
      title:"",
      text:"",
      targetData:{},
    }
  },
  methods:{
   goDetail(){
     if(this.alarmData.alarmType==1){
       this.$router.push({name:'chatDetail',query:{
        chatRoomId:this.alarmData.targetId,
        youId:this.targetData.userId
      }})
     }else if(this.alarmData.alarmType==2){
       this.$router.push({name: 'postDetail', query: { postId: this.alarmData.targetId }})
     }
   }
  },
  mounted () {
   console.log(this.alarmData)
   this.targetData = JSON.parse(this.alarmData.targetData)
   if(this.alarmData.alarmType==1){
     this.title = "채팅방에 초대되었습니다."
     this.text = `${this.targetData.userId} ${this.targetData.buildingName}`
   }else if(this.alarmData.alarmType==2){
     this.title =  `내가 작성한 글에 ${this.alarmData.alarmCount} 개 댓글이 달렸습니다.`
     this.text = `[${this.targetData.topicName}] ${this.targetData.title}`
   }
  }
}

</script>

<style scoped>
  .notice{
    background:white;
    display:flex;
    flex-direction:column;
    color:#aaa;
  }
  .notice-body{
    margin:4vw 4vw 0 4vw;
    padding-bottom: 4vw;
    border-bottom:1px solid #eee;
  }
  .notice-body .icon span{
    border:1px solid rgb(21, 134, 204) ;
    border-radius: 50%;
    font-size: 4vw;
    color:rgb(21, 134, 204) ;
  }
  .notice-body .text-content{
    text-align: left;
    margin-left:3.5vw;
  }
  .notice-body .title{
    color:#555;
    margin-bottom:2vw;
    font-weight: bold;
  }
  .notice-body .sub{
    color:#555;
    margin-bottom:2vw;
    width:100%;
  }
  .notice-body .sub > div{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .notice-body .writer-content{
    font-size: 3vw;
    margin-left:4vw;
  }
  .notice-body .writer-content .writer{
    color:#544;
    margin-right: 4vw;
    font-weight: bold;
  }
  .notice-body .writer-content .time{
    color:#aaa;
  }
</style>
