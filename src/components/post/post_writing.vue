
<template>
  <div class="post-writing">
      <div class="header flex align-items-center">
        <div class="cancel flex auto justify-content-start" @click="$router.go(-1)">
          취소
        </div>
        <div @click="isLocationListShow=true" class="title flex auto justify-content-center align-items-center">
          {{title}}
          <span class="icon icon-down-open"></span>
        </div>
        <div class="add flex auto justify-content-end" @click="writePost">
          등록
        </div>
      </div>

      <div ref="body" class="body">
        <textarea class="flex auto" v-model="subject" @focus="onFocus" @blur="onFocusout" @keydown="autosize" placeholder="제목을 입력해 주세요"></textarea>
        <textarea class="input-content flex none" v-model="content" @focus="onFocus" @blur="onFocusout" @keydown="autosize" placeholder="내용을 입력해 주세요"></textarea>
        <div class="img-list" v-for="(item, index) in imgInputList" :key="'imgInputList'+index">
          <img :src="item.src"/>
          <input v-model="item.desc" maxlength="30" placeholder="이미지에 대한 설명을 입력해주세요.(선택)"/>
        </div>
      </div>

      <div ref="footer" class="footer flex auto justify-content-start align-items-center;">
        <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none; z-index:-1">
        <label for="file" class="icon icon-camera"></label>
     </div>

      <transition name="fade">
        <div v-if="isLocationListShow" @click.self="isLocationListShow=false" class="location-list">
            <div class="list">
              <div @click="onClickListItem(item)" class="item" v-for="(item, index) in postList" :key="index+'-itemList'">
                <div class="name">{{item.data.name}}</div>
                <div class="desc">{{item.desc}}</div>
              </div>
            </div>
        </div>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'postHeader',
  components:{
    //vuescroll,
  },

  
  data: function () {
    return {
      postList:[],
      imgInputList:[],
      varUA:null,
      inputRange:null,
      title:'등록위치선택',
      isLocationListShow:false,
      imgList:[],
      subject:'',
      content:'',
    }
  },
  methods:{
     async getPosts(){
      let res = await this.$api.getPosts()
      this.postList = res.data.data
    },
    onFocus: function(){
      if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
        setTimeout(function(){
          let vh = window.innerHeight * 0.01 * 0.6;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
         },100);
      }
    },
    onFocusout: function(){
      if (this.varUA.indexOf("iphone")>-1||this.varUA.indexOf("ipad")>-1||this.varUA.indexOf("ipod")>-1) { 
        setTimeout(function(){
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
         },100);
      }
    },
    autosize: function(e){
      var el = e.target;
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + (el.scrollHeight) + 'px';
    },
    onClickListItem:function(item){
      this.postList.map(item => item.data.isSelected = false)
      this.title = item.data.name
      item.data.isSelected = true
      this.isLocationListShow = false;
      this.$refs.fileInput.focus()
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
        oFReader.readAsDataURL(event.target.files[0])
        oFReader.onload = function (oFREvent) {
           let image = new Image()
              image.src= oFREvent.target.result
              image.onload = function(){
                let src = that.resizeImage(image)
                console.log(oFREvent.target.result.length, src.length)
                let imgInputData = {src:src, desc:''}
                that.imgInputList.push(imgInputData)
              }
        };
    },
    async writePost(){
      let found = this.postList.find(item => item.data.isSelected == true)
      if(found){
        let imgList = [], imgDescList = []
        for(let i = 0; i<this.imgInputList.length; i++){
          let key = `img_${i}`
          imgList.push({[key]:this.imgInputList[i].src})
          imgDescList.push(this.imgInputList[i].desc)
        }

        console.log(imgList)
        let imageRes = await this.$api.uploadImages(`upload/images`,imgList)
        console.log(imageRes)
        // let imgRes = {
        //     "message": "OK",
        //     "data": "images/GivWoVTeScuw2YKf775c",
        //     "createdAt": "2020-05-09T13:17:56.140Z",
        //     "updatedAt": "2020-05-09T13:17:56.140Z"
        //   }
        
        let writingRes = await this.$api.postByPath(`${found.path}/messages`, {
          imgList:`ref ${imgRes.data}`,
          imgDescList:imgDescList,
          like:0,
          view:0,
          name:'test user',
          tag:'사회, 투자',
          title:this.subject,
          text:this.content,
        })
        console.log(writingRes)
      }else{
        alert("게시글 등록위치를 선택해 주세요.")
      }
     
      //this.$router.go(-1)
    }
  },
  async mounted () {
    this.getPosts()
    this.varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  }
}
</script>

<style scoped>
  .post-writing{
    width:100%; height:100%;
    background:white;
  }
  .header{
    height:14vw;
    border-bottom:1px solid #ddd;
    padding:0 4vw;
    font-size: 4vw;
  }
  .header .cancel{
    color:#000;
  }
  .header .title{
    font-weight: bold;
  }
  .header .title .icon{
    font-size:1.5vw;
    margin-left:1vw;
  }
  .header .add{
    color:tomato;
  }
  .body{
    padding:2vw;
    padding-bottom:10vw;
    height:calc(calc(var(--vh, 1vh) * 100) - 28vw);
    overflow:scroll;
  }
  .body textarea{
    width:100%;
    font-size: 4vw;
    line-height:1.5;
    max-height: 100vw;
    min-height:12vw;
    overflow-y: hidden; /* fixes scrollbar flash - kudos to @brettjonesdev */
  }
  .body textarea:first-child{

    border:0;
    border-bottom:1px solid #ddd;
  }
  .body textarea:nth-child(2){
    overflow: auto;
  }
  div[contenteditable] {
    color : #8e8e8e;
    font-size: 4vw;
    text-align: left;
    padding-top: 4vw;
    white-space: pre-wrap;
    min-height: 20vh;
  }
  [placeholder]:empty::before {
    content: attr(placeholder);
      
  }
  .footer{
    width:100%;
    position:relative;
    height:14vw;
    border-top:1px solid #ddd;
    padding:0 4vw;
    background:white;
  }
  .footer .icon{
    font-size:7vw;
    margin-top:2vw;
  }

  .location-list{
    background:rgba(0,0,0,.5);
    width:100vw;
    height:100vh;
    position:fixed;
    left:0;
    top:0;
    z-index: 1;
  }
  .location-list .list{
    width:100vw;
    max-height:70vw;
    background:white;
    position: fixed;
    left:0;
    bottom:0;
    overflow:scroll;
    padding:0 2vw;
  }
  .location-list .list .item{
    border-bottom:1px solid #ddd;
    padding:3vh 0;
  }
  .location-list .list .item .name{
    font-size:4vw;
    font-weight: bold;
    color:#000;
  }
  .location-list .list .item .desc{
    font-size:3vw;
    color:#aaa;
    font-weight: bold;
    margin-top:1vw;
  }
  .img-list img{
    width:100%;
  }
  .img-list input{
    width:100%;
    font-size: 4vw;
    padding:2vw 0;
    border:0;
    border-bottom:1px solid #ddd;
  }
  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
  

</style>
