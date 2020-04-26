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
    console.log("mounted header")
  }
}
</script>
<style scoped>
.footer{
  min-height:8vh;
  max-height:8vh;
  position: fixed;
  bottom:0;
  left:0;
  border-top:1px solid #ddd;
  background:white;
  width:100%;
  padding-right:2.5vh;
}
.footer .icon{
  font-size:3vh;
}
.footer .pencil .icon{
  font-size:3vh;
}
.footer .pencil{
  max-width:6vh;
  min-width:6vh;
  max-height:6vh;
  min-height:6vh;
  border-radius: 50%;
  background:tomato;
  color:white;
}
</style>