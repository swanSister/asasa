<template>
  <div id="app" style="height:100%; width:100%; margin:0; padding:0; background-color:white;">
    <keep-alive>
        <router-view class="router-view" v-if="$route.meta.keepAlive && !$route.params.reload"></router-view>
    </keep-alive>
    <router-view class="router-view" v-if="!$route.meta.keepAlive || $route.params.reload"></router-view>
    <Footer></Footer>
    <loading v-if="isLoadingShow"/>
    <alert-popup v-if="isAlertPopupShow" :message="alertMessage" @close="isAlertPopupShow=false"></alert-popup>
      
  </div>
</template>

<script>

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import { polyfill } from 'es6-promise'

import Vue from 'vue'
import vuescroll from 'vuescroll'
Vue.use(vuescroll,{
  mode: 'native',
  pullRefresh: {
      enable: true,
      tips: {
        deactive: 'Pull to Refresh',
        active: 'Release to Refresh',
        start: 'Refreshing...',
        beforeDeactive: 'Refresh Successfully!'
      }
    },
});
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#000'
  },
};

polyfill()


import "@/assets/css/main.css"
import "@/assets/css/fontello.css"
import Loading from "@/components/loading"
import alertPopup from '@/components/popup/alertPopup'
import Footer from '@/components/footer'
export default {
  name: 'App',
   data: function () {
    return {
      varUA:null,
       isLoadingShow:false,
       inputHeightRestTimeout:null,

      isAlertPopupShow:false,
      alertMessage:'',
    }
  },
  components:{
    Loading,
    alertPopup,
    Footer
  },
  methods:{
    openAlertPopup(msg){
      this.isAlertPopupShow= true
      this.alertMessage = msg
    },
    closeAlertPopup(){
      this.isAlertPopupShow = false
      this.alertMessage = ''
    },
    onShowLoading(){
      console.log("####onShowLoading")
      this.isLoadingShow = true
    },
    onHideLoading(){
      console.log("####onHideLoading")
      this.isLoadingShow = false
    },
    onFocus: function(){
      // if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
      //   setTimeout(function(){
      //     let vh = window.innerHeight * 0.01 * 0.6;
      //     document.documentElement.style.setProperty('--vh', `${vh}px`);
      //    },100);
      // }
    },
    onBlur: function(){
      // if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
      //   setTimeout(function(){
      //     let vh = window.innerHeight * 0.01;
      //     document.documentElement.style.setProperty('--vh', `${vh}px`);
      //    },100);
      // }
    },
    autosize: function(e){
      e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px'
    },
    onInputBlur: function(e){
      console.log("inputblur")
      e.target.style.cssText = 'height:9.5vw'
      e.target.blur()
      
    },
    windowResize(){
        console.log("####windowResize##")
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
    viewportResize(){
        console.log("visualViewport")
        let vh = window.visualViewport.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
  mounted:function(){
    this.$eventBus.$on("showLoading", this.onShowLoading)
    this.$eventBus.$on("hideLoading", this.onHideLoading)

    this.$eventBus.$on("openAlertPopup", this.openAlertPopup)
    this.$eventBus.$on("closeAlertPopup", this.closeAlertPopup)

    this.$eventBus.$on("inputBlur", this.onInputBlur)
    let that = this
    $( document ).ready(function() {
      that.varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

      $("input[type=text], textarea").on("focus",that.onFocus)
      $("input[type=text], textarea").on("blur",that.onBlur)
      $(document).on("keypress", "textarea", that.autosize)

      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`)

        var agent = navigator.userAgent.toLowerCase(),
        name = navigator.appName,
        browser = '';
        
        if(agent.indexOf('safari') > -1) { // Chrome or Safari
            if(agent.indexOf('chrome') > -1) { // Chrome
                browser = 'chrome';
            } else { // Safari
                browser = 'safari';
            }
        }
      if(browser=='safari'){
        window.visualViewport.addEventListener('resize', this.viewportResize);
      }else{
        window.addEventListener('resize', that.windowResize)
      }
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
.router-view{
  width:100%;
  height:calc(100% - 18vw);
  background-color:rgb(240,240,240);
}
</style>
