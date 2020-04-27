<template>
  <div id="app" style="height:100%; width:100%; margin:0; padding:0; background-color:rgb(240,240,240);">
    <router-view style="height:100%; width:100%;"/>
  </div>
</template>

<script>

import Vue from 'vue'
import vuescroll from 'vuescroll'

Vue.use(vuescroll, {
  ops: {
    // The global config
  }
});
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#000'
  }
};


import "@/assets/css/main.css"
import "@/assets/css/fontello.css"

export default {
  name: 'App',
  mounted:function(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      console.log("resize")
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
