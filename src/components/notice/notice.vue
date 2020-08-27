<template>
  <div class="notice" @click="$router.push({name:'noticeDetail', query:{noticeId:noticeData.noticeId}})">
    <div class="notice-body flex auto" @click="goDetail">
      <div class="icon">
        <span class="icon-bell-alt"></span>
      </div>
      <div class="flex column auto" style="max-width:93%;">
        <div class="text-content">
          <div class="title">{{noticeData.title}}</div>
          <div class="sub" style="max-width:100%;">
            <div>{{noticeData.text}}</div>
          </div>
        </div>
        <div class="flex auto writer-content">
         <div class="writer">{{noticeData.writerId}}</div> 
         <div class="time">{{$moment(noticeData.createdAt).format('YYYY-MM-DD')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  props: {
    noticeData:{},
  },
  data: function () {
    return {
      
    }
  },
  methods:{
   goDetail(){
     
   }
  },
  mounted () {
   console.log(this.noticeData)
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
