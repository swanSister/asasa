<template>
  <div class="flex auto footer justify-content-center align-items-center">
    <div class="flex auto justify-content-center"> 
      <div class="icon icon-home"></div>
    </div>
    <div class="flex auto justify-content-center">
      <div class="icon icon-search"></div>
    </div>
    <div class="flex auto justify-content-center">
      <div class="icon icon-chat-empty"></div>
    </div>
    <div class="flex auto justify-content-center">
      <div class="icon icon-bell"></div>
    </div>
    <div class="flex auto justify-content-center">
      <div class="icon icon-dot-3"></div>
    </div>

    <div @click="$router.push('postWriting')" class="flex auto justify-content-center align-items-center pencil">
      <div class="icon icon-pencil"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
 
  },
  data () {
    return {
      categories:[
        {name:'토픽'}
      ]
    }
  },
  methods:{
    backHandler(){
      console.log("history length : " + window.history.length)
      if(window.history.length>2){
        this.$router.go(-1)
      }else{
         this.$router.push('main')
      }
    }

  },
  mounted(){
   
  }
}
</script>
<style scoped>
.footer{
  min-height:14vw;
  max-height:14vw;
  position: fixed;
  bottom:0;
  left:0;
  border-top:1px solid #ddd;
  background:white;
  width:100%;
  padding-right:4vw;
}
.footer .icon{
  font-size:6vw;
}
.footer .pencil .icon{
  font-size:5vw;
}
.footer .pencil{
  max-width:9vw;
  min-width:9vw;
  max-height:9vw;
  min-height:9vw;
  border-radius: 50%;
  background:tomato;
  color:white;
}
</style>