<template>
  <div> 
    <div>
     
    </div>
    <div></div>
    <div id="loginBtn" @click="$router.push('main')">Login</div>
  </div>
</template>

<script>
export default {
  components:{
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
      console.log("login main")
  }
}
</script>
<style scoped>

#loginBtn{
  margin-top:2vh;
  background-color:tomato;
  color:white;
  font-size: 4vh;
  padding:2vh;
}
</style>