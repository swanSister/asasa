
<template>
  <div class="post-header">
    <vue-scroll>
      <div class="x-scroller flex auto align-items-center">
        <div class="flex none align-items-center plus-btn" ><span class="icon-plus"></span></div>
        <div class="subject" v-for="(subject, index) in subjects" :key="index + 'subject'">
          {{subject.name}}
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>

export default {
  name: 'postHeader',
  components:{
  },
  
  data: function () {
    return {
      subjects: [
        {
          name:"마켓",
        },
        {
          name:"썸",
        },
        {
          name:"암호화폐",
        },
        {
          name:"19+",
        },
        {
          name:"암호화폐",
        },
        {
          name:"19+",
        },
        {
          name:"암호화폐",
        },
      ]
    }
  }
}
</script>

<style scoped>
  .post-header{
    margin-top:0;
    margin-left:5%;
    width:90%;
    overflow:hidden;
    align-items:center;
    height:17vw;
  }
  .x-scroller{
    width:100vw;
    height:17vw;
    display:flex;
    flex:auto;
  }
   .x-scroller > div{
    display:flex;
    flex:none;
    margin-right:4vw;
    margin-bottom:0;
  }
  .post-header .subject{
    padding:2vw 4vw;
    background:gray;
    margin-right:4vw;
    color:white;
    border-radius:1vw;
  }
  
</style>
