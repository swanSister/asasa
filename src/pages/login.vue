<template>
  <div class="login flex column justify-content-center">
    
    <div class="header">
      <img src="@/assets/login_footer_dark.png">
    </div>
    <div id="body" class="body">
      <div id="loginBtn" @click="goAuth">시작하기</div>
    </div>
    <privacy-popup @close="isPrivacyPopupShow=false" v-if="isPrivacyPopupShow"></privacy-popup>
  </div>
</template>

<script>

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import privacyPopup from '@/components/popup/privacyPopup.vue';
export default {
  components:{
    privacyPopup
  },
  props:{
  
  },
  data () {
    return {
      isPrivacyPopupShow:false,
      address:'',
      buildingName:'',
      bcode:'',
      isAddressPopup:false,
      userId:'',
    }
  },
  methods:{
    async goAuth(){
      let me = this.$store.state.me
      if(me.userId){
        this.$router.push('main')
      }else{
        this.$router.push('auth')
      }
    },
    async getAddress(){
      console.log("aaaa")
      this.isAddressPopup = true
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
      document.head.appendChild(recaptchaScript)
      
      let that = this
      let interval = null
      interval = setInterval(function(){
        if(!global.daum.Postcode) return
        new global.daum.Postcode({
            width:"100%",
            height:"100%",
            oncomplete: function(data) {
              console.log(data)
              if(data.apartment == "N"){
                this.$eventBus.$emit("openAlertPopup","아파트가 아닙니다.")
              }else{
                that.buildingName = data.buildingName
                that.bcode = data.bcode
                that.address = data
              }
              that.isAddressPopup = false
            }
        }).embed(document.getElementById("addressSearch"));
        clearInterval(interval)
      },50)
    }
  },
  async mounted(){
    if(this.$store.state.me.userId){
        this.$router.push('main')
        return
      }else{
        this.isPrivacyPopupShow = true
      }
  }
}
</script>
<style scoped>
.login{
  background:white;
}
.header img{
 width:80vw;
 height:auto;
 margin-top:-10vw;
}
.body{
  padding:0 10vw;
  margin-top:10vw;
}
#addressInput{
  padding:0 4vw;
  font-size:4.5vw;
  height:12vw;
  width:100%;
  background:#f5f5f5;
  color:black;
}
#loginBtn{
  background-color:rgb(21, 134, 204) ;
  color:white;
  font-size: 4vw;
  height:12vw;
  line-height:12vw;
  z-index: 2;
}
#addressSearch{
  width:100vw;
  height:100%;
  position:fixed;
  left:0;
  top:0;
}
.footer img{
 width:60vw;
 height:auto;
 z-index: 1;
 margin-bottom:4vw;
}
</style>