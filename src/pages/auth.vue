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
              <div class="right"> {{this.$store.state.me.userId}}</div>
            </div>
            <div class="sub-text">랜덤 닉네임 입니다.</div>
          </div>
            <div class="section">
              <div class="flex none justify-content-center align-items-center main-text">
                <div class="left">주소</div>
                <div class="right">
                  {{this.$store.state.me.addressData.address}}
                  <div class="building">'{{this.$store.state.me.addressData.buildingName}}'</div>
                </div>
              </div>
              <div class="sub-text">아파트 동/호수는 입력받지 않습니다. </div>
            </div>
          </div>
        
        <div class="auth-content">
          <div class="auth-title">
            아파트 실거주자 임을 인증해 주세요.
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
          </div>
        </div>

        <div id="authBtn" @click="$router.push('main')">인증</div>

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
     authImageSrc:''
    }
  },
  methods:{
  imageClick(){
    $('#authImageLabel').click()
  },
  resizeImage(image) {
      let canvas = document.createElement("canvas"),
      max_size = 1000,
      // 최대 기준을 1280으로 잡음.
      width = image.width,
      height = image.height;
      if (width > height) {
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      return dataUrl
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
              let src = that.resizeImage(image)
              that.authImageSrc = src
            }
      };
    },
  },
  mounted(){
    console.log(this.$store.state.me.addressData)
  }
}
</script>
<style scoped>
  .auth{
    background:white;
  }
  .auth .header{
    font-size:8vw;
    padding:4vw;
    font-weight:bold;
    margin:4vw 0;
  }
  .auth .body{
    width:80%;
    margin-left:10%;
  }
  .auth-title{
    font-size:4vw;
    font-weight:bold;
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
  #authBtn{
    margin:0 auto;
    margin-top:8vw;
    background-color:tomato;
    color:white;
    font-size: 4vw;
    height:12vw;
    line-height:12vw;
  }
</style>