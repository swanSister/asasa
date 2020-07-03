<template>
    <div class="auth">
      <div class="header">
        인증
      </div>
      <div class="body">
        <div class="user-info">
          <div class="section">
            <div class="flex none justify-content-center align-items-center main-text">
              <div class="left">닉네임</div>
              <input class="right" v-model="userId" @keydown="onKeyPress"/>
            </div>
            <div class="sub-text">{{idSubTxt}}</div>
          </div>
          <div class="section">
            <div class="flex none justify-content-center align-items-center main-text">
              <div class="left">주소</div>
              <div class="right" @click="getAddress">
                <div v-if="!address">주소를 검색해 주세요.</div>
                <div>{{address.address}}
                  <div class="building" v-if="buildingName">'{{buildingName}}'</div>
                </div>
              </div>
            </div>
            <div class="sub-text">아파트 동/호수는 입력받지 않습니다. </div>
          </div>
          </div>

          <div class="auth-title">
            주거 형태를 선택해 주세요.
          </div>
          <div class="btn-content">
            <div @click="houseType.map(item=>item.isSelect=false), item.isSelect=true" class="btn" :class="{'selected':item.isSelect}" v-for="(item, index) in houseType" :key="'houseType'+index">
              {{item.name}}
            </div>
            
          </div>
        <div class="auth-content">
          <div class="auth-title">
            주소를 인증해 주세요.
          </div>
          <div class="image-box flex align-items-center justify-content-center">
            <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none; z-index:-1">
            <label id="authImageLabel" for="file"  class="camera-icon icon-camera-1"></label>
            <img v-if="authImageSrc" :src="authImageSrc" @click="imageClick"/>
          </div>
          <div>
            <div class="sub-text">1) 신분증 상의 주소</div>
            <div class="sub-text">2) 우현물, 택배 등의 주소</div>
            <div class="sub-text">3) 기타 입주를 증명할 수 있는 내용이 담긴 사진</div>

            <div class="sub-text red">※ 주소를 인증하지 않으면 이용이 제한됩니다.</div>
          </div>
        </div>
        <div id="authBtn" @click="createUser">시작하기</div>
      </div>
      <div v-if="isAddressPopup" id="addressSearch" ></div>
     
    </div>
</template>

<script>

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

export default {
  components:{

  },
  props:{
  
  },
  data () {
    return {
      authImageSrc:'',
      address:'',
      buildingName:'',
      bcode:'',
      isAddressPopup:false,
      userId:'',
      idSubTxt:'랜덤 ID 입니다.',
      houseType:[{
        name:'아파트',
        type:1,
        isSelect:true,
      },
      {
        name:'오피스텔',
        type:2,
        isSelect:false,
      },
      {
        name:'주택',
        type:3,
        isSelect:false,
      }]
    }
  },
  methods:{
    async onKeyPress(){
      
      if(this.userId.length < 4){
        this.idSubTxt = "4자 이상 입력해 주세요."
      }else{
        let messages = await this.$api.getByPathWhere(`users`,`userId=${this.userId}`)
        if(messages.data.documents.length){
          this.idSubTxt = "해당 ID가 존재합니다."
        }else{
          this.idSubTxt = "사용가능한 ID 입니다."
        }
        console.log(messages)
      }
    },
    dataUriToBlob(dataURI){
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], {type: mimeString});
      return blob;
    },
    async uploadAuthImg(){
      let imgRes = await this.$api.uploadImages(`upload/images`,
       [this.dataUriToBlob(this.authImageSrc)]
      )
      return imgRes
    },
    imageClick(){
      $('#authImageLabel').click()
    },
    async createUser(){
        if(this.userId.length < 4){
          alert("ID를 4자 이상 입력해 주세요.")
          return
        }

        if(!this.address.address){
          alert("주소를 입력해 주세요.")
          return
        }
        
        this.$eventBus.$emit("showLoading")
        let bcode = this.bcode
        let sido_code = parseInt(bcode.substring(0,2),10)
        let sigungu_code = parseInt(bcode.substring(0,5),10)
        let b_code = parseInt(bcode.substring(0,8),10)

        //create 시군구, 읍면동 토픽 생성 및 id 가져오기
        let path1 = await this.getPostIdById(sido_code, this.address.sido, 1)
        let path2 = await this.getPostIdById(sigungu_code, this.address.sigungu, 2, this.address.sido)
        let path3 = await this.getPostIdById(b_code, this.address.bname, 3, this.address.sido, this.address.sigungu)
        let imgRes = this.authImageSrc ? (await this.uploadAuthImg()).headers.location : ''
        console.log(path1, path2, path3)
        let houseType = this.houseType.find(item=>item.isSelect==true)
        let me = {
          userId: this.userId,
          addressData:this.address,
          buildingName:this.buildingName,
          houseType:houseType,
          public: houseType.type == 1 ? true : false,
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
          authImgSrc: imgRes ? `ref ${imgRes}` : '',
          auth:null
        }
        let messages = await this.$api.postByPath(`users`,me)
        me.path = messages.headers.location
        this.$eventBus.$emit("hideLoading")
        if(messages.data.code == 201){
          this.$store.commit('me',me)
          console.log('me:',this.$store.state.me)
          this.$router.push('main')
        }else{
          alert("ERROR code : " + messages.data.code)
        }
        
      },
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
        let path = ''
        if(!getMessage.data.documents.length){
          let postMessage = await this.$api.postByPath(`posts`,{
            code: code,
            name: name,
            type: type,
            parent1: parent1 ? parent1 : '',
            parent2:parent2 ? parent2 : '',
          })
          path = postMessage.headers.location
        }else{
          path = getMessage.data.documents[0].path
        }
        console.log("####path", path)
          return path
      },
   async previewFiles(event) {
      let that = this
      var oFReader = new FileReader()
      if(!event.target.files) return

      oFReader.readAsDataURL(event.target.files[0])
      oFReader.onload = function (oFREvent) {
          let image = new Image()
            image.src= oFREvent.target.result
            image.onload = function(){
              let src = that.$resizeImage(image)
              that.authImageSrc = src
            }
      };
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
              that.buildingName = data.buildingName
              that.bcode = data.bcode
              that.address = data
              that.isAddressPopup = false
            }
        }).embed(document.getElementById("addressSearch"));
        clearInterval(interval)
      },50)
    },
  },
  mounted(){
    this.userId = this.generateUID()
  }
}
</script>
<style scoped>
  .auth{
    overflow:auto;
    padding-bottom:4vw;
    background:white;
  }
  .auth .header{
    font-size:6vw;
    font-weight:bold;
    margin:4vw 0;
  }
  .auth .body{
    width:80%;
    margin-left:10%;
  }
  .auth-title{
    font-size:4vw;
    margin:4vw 0 2vw 0;
    text-align: left;
  }
  .auth .user-info .section{
    margin-bottom:4vw;
  }
  .auth .user-info .section .main-text{
    padding:1vw 2vw;
  }
  .auth .user-info .section .sub-text{
    width:70%;
    margin-left:22%;
    text-align: left;
    font-size: 3vw;
    color:#aaa;
  }
  
  .auth .user-info .left{
    min-width:20%;
    max-width:20%;
    font-weight: bold;
    text-align: left;
  }
  .auth .user-info .right{
    text-align: left;
    background:rgb(240, 240, 240);
    min-width:80%;
    max-width:80%;
    padding:2vw;
    font-size:4vw;
  }
  .auth .building{
    color:tomato;
    display: inline-block;
  }
  .auth .image-box{
    width:100%;
    height:40vw;
    margin:0 auto;
    background:rgb(240, 240, 240);
    margin-bottom:2vw;
    position: relative;
  }
  .auth .image-box img{
    width:100%;
    height:100%;
    object-fit: cover;
    position: absolute;
    left:0;
    top:0;
  }
  .auth .image-box .camera-icon{
    font-size:15vw;
    color:#ddd;
  }
  
  .auth-content .sub-text{
    text-align: left;
    font-size: 3vw;
    color:black;
  }
   .auth-content .sub-text.red {
     color:tomato; 
     margin-top:2vw;
   }
  #authBtn{
    margin:0 auto;
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

.auth-popup{
  background:rgba(0,0,0,.3);
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
.auth-popup .popup-content{
  width: 80vw;
  height:auto;
  position:absolute;
  left:10vw;
  top:50%;
  transform:translate(0,-50%);
  background:white;
}
.auth-popup .popup-title{
  font-size:6vw;
  margin:8vw;
}
.btn-content{
  text-align: center;
}
.btn-content .btn{
  display:inline-block;
  width:33%;
  background:#eee;
  padding:2vw 0;
}
.btn-content .btn.selected{
  background:tomato;
  color:white;
  font-weight: bold;
}
</style>