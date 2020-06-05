<template>
  <div class="login">
    <div class="header">로고</div>
    <div class="body">
      <input readonly v-model="buildingName" id="addressInput" placeholder="살고계신 아파트 이름을 검색해 주세요." @click="getAddress"/>
      <div id="loginBtn" @click="createUser">로그인</div>
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
      buildingName:'',
      bcode:'',
      isAddressPopup:false,
      userId:''
    }
  },
  methods:{
    generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
    },
    async getPostIdById(code, name, type, parent1, parent2){//type 1 : 시도 , 2: 군구, 3:동읍면리
      let getMessage = await this.$api.getByPathWhere(`posts`,`code=${code}`)
      let path
      if(!getMessage.data.documents.length){
        let postMessage = await this.$api.postByPath(`posts?`,{
          code: code,
          name: name,
          type: type,
          parent1: parent1 ? parent1 : '',
          parent2:parent2 ? parent2 : '',
        })
        console.log(postMessage)
        let reMessage = await this.$api.getByPathWhere(`posts`,`code=${code}`)
        path = reMessage.data.documents[0].path
      }else{
        path = getMessage.data.documents[0].path
      }
        return path
    },
    async createUser(){
      this.userId = this.generateUID()
      console.log(this.userId)
      
      console.log(this.address)
      let bcode = this.bcode
      let sido_code = parseInt(bcode.substring(0,2),10)
      let sigungu_code = parseInt(bcode.substring(0,5),10)
      let b_code = parseInt(bcode.substring(0,8),10)

      //create 시군구, 읍면동 토픽 생성 및 id 가져오기
      let path1 = await this.getPostIdById(sido_code, this.address.sido, 1)
      let path2 = await this.getPostIdById(sigungu_code, this.address.sigungu, 2, this.address.sido)
      let path3 = await this.getPostIdById(b_code, this.address.bname, 3, this.address.sido, this.address.sigungu)
      

      let me = {
        userId: this.userId,
        addressData:this.address,
        buildingName:this.buildingName,
        topics:[
          {
            name:'토픽',
            code:'00',
            path:'posts/topic'
          },
          {
          name:this.address.sido,
          code:sido_code,
          path:path1
          },
          {
          name:this.address.sigungu,
          code:sigungu_code,
          path:path2
          },
          {
          name:this.address.bname,
          code:b_code,
          path:path3
          }],
        isAuth: false,
      }
      let messages = await this.$api.postByPath(`users`,me)
      console.log("messages: ", messages)
      if(messages.data.code == 201){
        this.$store.commit('me',me)
        console.log('me:',this.$store.state.me)
        this.$router.push('auth')
      }else{
        alert("ERROR code : " + messages.data.code)
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
                alert("아파트가 아닙니다.")
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
    console.log(this.$store.state.me)
      if(this.$store.state.me.userId){
        let findUser = await this.$api.getByPathWhere(`users`,`userId=${this.$store.state.me.userId}`)
        //서버 user data 동기화
        if(findUser.data.documents.length){
          this.$store.commit('me',findUser.data.documents[0].fields)
        }else{//local data 초기화
          this.$store.commit('me',{})
        }
        if(!this.$store.state.me.isAuth){
          this.$router.push('auth')
        }else{
          this.$router.push('main')
        }
      }
      
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