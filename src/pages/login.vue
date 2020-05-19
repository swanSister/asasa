<template>
  <div class="login">
    <div class="header">로고</div>
    <div class="body">
      <input id="addressInput" placeholder="살고계신 아파트 이름을 검색해 주세요." @click="getAddress"/>
      <div id="loginBtn" @click="$router.push('main')">인증</div>
    </div>
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
    async getAddress(){
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
      document.head.appendChild(recaptchaScript)
      setTimeout(function(){

      
      new global.daum.Postcode({
          oncomplete: function(data) {
            console.log(data)
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
              // 예제를 참고하여 다양한 활용법을 확인해 보세요.
          }
      }).open();

      },500)
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
  font-size:4vw;
  height:12vw;
  width:100%;
  background:#f5f5f5;
  color:#aaa;
}
#loginBtn{
  margin-top:4vw;
  background-color:tomato;
  color:white;
  font-size: 4vw;
  height:12vw;
  line-height:12vw;
}
</style>