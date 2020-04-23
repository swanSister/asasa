
<template>
  <div class="post-header">
    <vuescroll>
      <div class="x-scroller">
        <div class="plus-btn" >+</div>
        <div class="subject" v-for="(subject, index) in subjects" :key="index + 'subject'">
          {{subject.name}}
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>

import vuescroll from 'vuescroll';
export default {
  name: 'postHeader',
  components:{
    vuescroll,
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
    margin-top:3vh;
    margin-left:5%;
    width:90%;
    overflow:hidden;
    align-items:center;
  }
  .x-scroller{
    width:100vw;
    display:flex;
    flex:auto;
  }
   .x-scroller > div{
    display:flex;
    flex:none;
    margin-right:2vh;
    margin-bottom:1.5vh;
  }
  .post-header .subject{
    padding:1vh 2vh;
    background:gray;
    margin-right:2vh;
    color:white;
    border-radius:.5vh;
  }
  
</style>
