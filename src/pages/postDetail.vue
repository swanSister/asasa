<template>
  <div>
    <div class="header flex align-items-center">
      <div class="flex justify-content-start align-items-center">
        <div @click="$router.go(-1);" class="flex none icon-left-small back-btn"></div>
        <div class="title">토픽</div>
      </div>
      <div class="flex auto justify-content-end">
        알람, 북마크, 더보기 아이콘
      </div>
    </div>
     <vuescroll class="post-content">
     </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
export default {
  components:{
    vuescroll,
   
  },
  props:{
  
  },
  data () {
    return {
    
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>
<style scoped>
.header{
  background:white;
  padding:1.5vh;
}
.back-btn{
  width:10vw; color:#aaa; font-size:5vh;
}
.header .title{
  font-size:3vh;
  font-weight: bold;
  color:#aaa;
}
</style>