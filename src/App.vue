<template>
  <div id="app" style="height:100%; width:100%; margin:0; padding:0; background-color:rgb(240,240,240);">
    <router-view style="height:100%; width:100%;"/>
  </div>
</template>

<script>

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import { polyfill } from 'es6-promise'
polyfill()

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
   data: function () {
    return {
      varUA:null,
    }
  },
  methods:{
    onFocus: function(){
      if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
        setTimeout(function(){
          let vh = window.innerHeight * 0.01 * 0.6;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
         },100);
      }
    },
    onBlur: function(){
      if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
        setTimeout(function(){
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
         },100);
      }
    },
    autosize: function(e){
     
      var el = e.target
    
      el.style.cssText = 'height:auto; padding:0'
      el.style.cssText = 'height:' + (el.scrollHeight+20) + 'px'
      
    },
  },
  mounted:function(){
    let that = this
    $( document ).ready(function() {
      that.varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

      $("input[type=text], textarea").on("focus",that.onFocus)
      $("input[type=text], textarea").on("blur",that.onBlur)
      $(document).on("keyup", "textarea", that.autosize)

      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      window.addEventListener('resize', () => {
        console.log("resize")
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    })

    
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
 
}
</style>
