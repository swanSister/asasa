<template>
  <div class="login">
    <div class="header">로고</div>
    <div class="body">
      <input readonly v-model="address" id="addressInput" placeholder="살고계신 아파트 이름을 검색해 주세요." @click="getAddress"/>
      <div id="loginBtn" @click="$router.push('main')">인증</div>
      <div>행정구역코드: {{bcode}}</div>
    </div>
    <div v-if="isAddressPopup" id="addressSearch" ></div>
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
      address:'',
      bcode:'',
      isAddressPopup:false,
    }
  },
  methods:{
    async getAddress(){
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
              that.address = data.buildingName
              that.bcode = data.bcode
              that.isAddressPopup = false
              
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            }
        }).embed(document.getElementById("addressSearch"));
        clearInterval(interval)
      },50)
    },
  },
  mounted(){
      console.log("login main param : ", this.$router.params)
  }
}
</script>
<style scoped>
.login{
  background:white;
}
.header{
  width:80vw;
  color:tomato;
  font-weight:bold;
  font-size:20vw;
  margin:10vw;
}
.body{
  padding:10vw;
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
  margin-top:4vw;
  background-color:tomato;
  color:white;
  font-size: 4vw;
  height:12vw;
  line-height:12vw;
}
#addressSearch{
  width:100vw;
  height:100vh;
  position:fixed;
  left:0;
  top:0;
}

</style>