
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
        <div class="add flex auto justify-content-end" @click="$router.go(-1)">
          등록
        </div>
      </div>

      <div ref="body" class="body">
        <textarea class="flex auto" @focus="onFocus" @blur="onFocusout" @keydown="autosize" placeholder="제목을 입력해 주세요"></textarea>
        <textarea @focus="onFocus" @blur="onFocusout" @click="onKeyup($event)" @keydown="autosize" 
        class="input-content flex none" ref="inputContent" placeholder="내용을 입력해 주세요">
        </textarea>
        <div class="img-list" v-for="(item, index) in imgInputList" :key="'imgInputList'+index">
          <img :src="item.src"/>
          <input placeholder="이미지에 대한 설명을 입력해주세요.(선택)"/>
        </div>
      </div>

      <div ref="footer" class="footer flex auto justify-content-start align-items-center;">
        <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none; z-index:-1">
        <label for="file" class="icon icon-camera"></label>
     </div>

      <transition name="fade">
        <div v-if="isLocationListShow" @click.self="isLocationListShow=false" class="location-list">
            <div class="list">
              <div @click="onClickListItem(item)" class="item" v-for="(item, index) in locationList" :key="index+'-itemList'">
                <div class="name">{{item.name}}</div>
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
      imgInputList:[],
      varUA:null,
      inputRange:null,
      title:'등록위치선택',
      isLocationListShow:false,
      locationList:[
        {
          name:"헬리오시티",
          desc:"우리 아파트 사람만 볼 수 있습니다"
        },
        {
          name:"송파구 가락동",
          desc:"우리 동네 사람만 볼 수 있습니다"
        },
        {
          name:"토픽",
          desc:"아사사 사람들 모두가 볼 수 있습니다"
        },
        {
          name:"스크롤 테스트",
          desc:"아사사 사람들 모두가 볼 수 있습니다"
        }
      ],
      imgList:[]
    }
  },
  methods:{
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

      el.style.cssText = 'height:' + (el.scrollHeight + 30) + 'px';
      
    },
    onKeydown: function(e){
       if (e.keyCode === 13) {//엔터시 contenteditable 강제 줄바꿈
          e.preventDefault(); //Prevent default browser behavior
          if (window.getSelection) {
              var selection = window.getSelection(),
                  range = selection.getRangeAt(0),
                  br = document.createElement("br"),
                  textNode = document.createTextNode("\u00a0");
              
              range.insertNode(br);
              range.collapse(false);
              range.insertNode(textNode);
              range.setStartAfter(br);
              range.setEndAfter(br);

              range.deleteContents();
              selection.removeAllRanges();
              selection.addRange(range);
          }
       }
    },
    onKeyup: function(){
      //this.inputRange = window.getSelection().getRangeAt(0);
    },
    onClickListItem:function(item){
      this.title = item.name
      this.isLocationListShow = false;
      this.$refs.fileInput.focus()
    },   
    previewFiles(event) {
      let that = this
      var oFReader = new FileReader()
        oFReader.readAsDataURL(event.target.files[0])
        oFReader.onload = function (oFREvent) {
          let imgInputData = {src:oFREvent.target.result, desdc:''}
          that.imgInputList.push(imgInputData)
          // let img = document.createElement('img'),
          // br = document.createElement("br")

          // img.src = oFREvent.target.result
          // img.setAttribute('style','max-width:90vw; display:block;')
          
          // that.inputRange.insertNode(img);

          // that.inputRange.collapse(false);
          // that.inputRange.insertNode(br);
          // that.inputRange.setStartAfter(br);
          // that.inputRange.setEndAfter(br);

          // window.getSelection().removeAllRanges();
          // window.getSelection().addRange(that.inputRange);
          // that.onFocusout();
        };
    }
  },
  mounted: function () {
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
