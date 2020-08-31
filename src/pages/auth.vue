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
              <input class="right flex auto" v-model="userId" @keypress="onKeyPress" lang="ko-KR"/>
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
            <label id="authImageLabel" for="file"  class="camera-icon  icon-camera"></label>
            <img v-if="authImageSrc" :src="authImageSrc" @click="imageClick"/>
          </div>
          <div>
            <div class="sub-text">1) 신분증 상의 주소</div>
            <div class="sub-text">2) 우퍈물, 택배 등의 주소</div>
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
      }],
      isUserExistTimeout: null,
      isUserExist:false,
    }
  },
  methods:{
    async onKeyPress(e){
      let that = this
      
      if(this.isUserExistTimeout) clearTimeout(this.isUserExistTimeout)
      this.isUserExistTimeout = setTimeout(async function(){
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      
        if(regExp.test(that.userId)){
            alert("특수문자는 입력 할 수 없습니다.")
            that.userId = that.userId.replace(regExp, "");
        }

        if(that.userId.length < 4){
        that.idSubTxt = "4자 이상 입력해 주세요."
        }else{
          let messages = await that.$api.isUserExist({userId:that.userId})
          if(messages.data.data.length){
            that.idSubTxt = "해당 ID가 존재합니다."
            that.isUserExist = true
          }else{
            that.idSubTxt = "사용가능한 ID 입니다."
            that.isUserExist = false
          }
        }
      },300)
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
    imageClick(){
      $('#authImageLabel').click()
    },
    async createUser(){
      try{
        if(this.userId.length < 4){
          alert("ID를 4자 이상 입력해 주세요.")
          return
        }
        if(this.isUserExist){
          alert("ID가 이미 존재합니다.")
          return
        }
        if(!this.address.address){
          alert("주소를 입력해 주세요.")
          return
        }
        if(!this.authImageSrc){
          alert("인증사진을 등록해 주세요.")
          return
        }
        
        let houseType = this.houseType.find(item=>item.isSelect==true)
        if(!this.buildingName && (houseType.type ==1 || houseType.type == 2)){
          alert("주거형태을 확인해 주세요.")
          return
        }

        this.$eventBus.$emit("showLoading")
        let bcode = this.address.bcode
        let sido_code = parseInt(bcode.substring(0,2),10)
        let sigungu_code = parseInt(bcode.substring(0,5),10)
        let b_code = parseInt(bcode.substring(0,8),10)

        let addressData = this.address
        addressData.sido_code = sido_code
        addressData.sigungu_code = sigungu_code
        addressData.b_code = b_code

       
        let me = {
          userId: this.userId,
          isPublic: houseType.type == 1 ? true : false,
          addressData:addressData,
          buildingName:this.buildingName,
          houseType:houseType.type
        }
        let messages = await this.$api.createUser(me)
        let imgRes = await this.$api.uploadAuthImage(this.dataUriToBlob(this.authImageSrc),`${me.userId}_auth`)
        me = messages.data.data
        me.authImgUrl = imgRes.data.data
        this.$store.commit('me',me)
        console.log(me)
        this.$eventBus.$emit("hideLoading")
        this.$router.push({name:'main', params:{reload:true}})
      }catch(e){
        console.error(e.message)
        this.$eventBus.$emit("hideLoading")
      }
    },
      generateUID() {
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return firstPart + secondPart;
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
      try{
        
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
              that.address = data
              that.buildingName = data.buildingName
              
              that.isAddressPopup = false
            }
        }).embed(document.getElementById("addressSearch"));
        clearInterval(interval)
      },100)

      }catch(e){
        console.error(e.message)
      }
    },
  },
  mounted(){
    console.log("###auth")
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
    font-size:6.5vw;
    font-weight:bold;
    margin:4vw 0 6vw 0;
  }
  .auth .body{
    width:70%;
    margin-left:15%;
  }
  .auth-title{
    font-size:4.5vw;
    margin:10vw 0 2vw 0;
    text-align: left;
  }
  .auth .user-info .section{
    margin-bottom:4vw;
  }
  .auth .user-info .section .main-text{
    padding:1vw 2vw;
  }
  .auth .user-info .section .sub-text{
    width:51.5vw;
    margin-left:20.5vw;
    text-align: left;
    font-size: 3vw;
    color:#aaa;
  }
  
  .auth .user-info .left{
    min-width:15vw;
    max-width:15vw;
    font-weight: bold;
    text-align: left;
  }
  .auth .user-info .right{
    text-align: left;
    background:rgb(240, 240, 240);
    padding:2vw;
    font-size:4.5vw;
    max-width:48vw;
    min-width:48vw;
  }
  .auth .building{
    color:rgb(21, 134, 204) ;
    display: inline-block;
  }
  .auth .image-box{
    width:100%;
    height:40vw;
    margin:0 auto;
    background:rgb(240, 240, 240);
    margin-bottom:4vw;
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
     color:red;  
     margin-top:2vw;
   }
  #authBtn{
    margin:0 auto;
    margin:12vw 0;
    background-color:rgb(21, 134, 204) ;
    color:white;
    font-size: 4vw;
    height:12vw;
    line-height:12vw;
  }

  #addressSearch{
  width:100vw;
  height:100%;
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
  font-size:6.5vw;
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
  background:rgb(21, 134, 204) ;
  color:white;
  font-weight: bold;
}
</style>