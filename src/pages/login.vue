<template>
  <div class="login flex column justify-content-center">
    
    <div class="header">
      <img src="@/assets/login_footer_dark.png">
    </div>
    <div id="body" class="body">
      <div id="loginBtn" @click="goAuth(true)" style="margin-bottom:2vw;">Test mode 시작하기</div>
      <div id="loginBtn" @click="goAuth(false)">시작하기</div>
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
      testUser:{
    "userId": "tq3v74",
    "isPublic": 1,
    "authId": "45b181gstmejzvxwp",
    "authImgUrl": "http://3.34.211.151:3011/uploads/auth/tq3v74_auth.jpeg",
    "addressData": {
        "sido": "경기",
        "bcode": "4146125930",
        "bname": "아곡리",
        "hname": "",
        "query": "한숲시티 ",
        "b_code": 41461259,
        "bname1": "남사읍",
        "bname2": "아곡리",
        "address": "경기 용인시 처인구 남사읍 한숲로 83",
        "sigungu": "용인시 처인구",
        "postcode": "",
        "roadname": "한숲로",
        "zonecode": "17117",
        "apartment": "Y",
        "postcode1": "",
        "postcode2": "",
        "sido_code": 41,
        "noSelected": "N",
        "addressType": "R",
        "postcodeSeq": "",
        "roadAddress": "경기 용인시 처인구 남사읍 한숲로 83",
        "sidoEnglish": "Gyeonggi-do",
        "sigunguCode": "41461",
        "bnameEnglish": "Agok-ri",
        "buildingCode": "4146132031106520001211662",
        "buildingName": "e편한세상 용인 한숲시티",
        "jibunAddress": "경기 용인시 처인구 남사읍 아곡리 681",
        "roadnameCode": "3351702",
        "sigungu_code": 41461,
        "bname1English": "Namsa-eup",
        "bname2English": "Agok-ri",
        "addressEnglish": "83 Hansup-ro, Namsa-eup, Cheoin-gu, Yongin-si, Gyeonggi-do, Republic of Korea",
        "sigunguEnglish": "Cheoin-gu Yongin-si",
        "autoRoadAddress": "",
        "roadnameEnglish": "Hansup-ro",
        "autoJibunAddress": "",
        "userLanguageType": "K",
        "userSelectedType": "R",
        "roadAddressEnglish": "83 Hansup-ro, Namsa-eup, Cheoin-gu, Yongin-si, Gyeonggi-do, Republic of Korea",
        "jibunAddressEnglish": "681 Agok-ri, Namsa-eup, Cheoin-gu, Yongin-si, Gyeonggi-do, Republic of Korea",
        "autoRoadAddressEnglish": "",
        "autoJibunAddressEnglish": ""
    },
    "buildingName": "e편한세상 용인 한숲시티",
    "houseType": 1,
    "createdAt": "2025-08-20T13:14:57.000Z",
    "updatedAt": "2025-08-20T13:14:57.000Z",
    "isAuthWait": 0,
    "isAuthSuccess": 1,
    "authReason": "",
    "topics": [
     
    ]
}
    }
  },
  methods:{
    async goAuth(isTestmode){
      let me = this.$store.state.me
      if(isTestmode){
        me = this.testUser
        this.$store.state.me = this.testUser
        this.$router.push('main')
      }
      else if(me.userId){
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
      console.log(this.$store.state.me.userId)
        this.$router.push('main')
        return
      }else{
        //this.isPrivacyPopupShow = true
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