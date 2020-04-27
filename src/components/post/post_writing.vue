
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

      <div class="body flex auto column">
        <textarea @keydown="autosize" placeholder="제목을 입력해 주세요"></textarea>
        <div @click="onKeyup($event)" @keyup="onKeyup($event)" @keydown="onKeydown($event)"  
       
        class="input-content" ref="inputContent" contentEditable placeholder="내용을 입력해 주세요">
          
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
    autosize: function(e){
      var el = e.target;
      setTimeout(function(){
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
      },0);
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
      this.inputRange = window.getSelection().getRangeAt(0);
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
          let img = document.createElement('img')
          img.src = oFREvent.target.result
          img.setAttribute('style','max-width:90vw; display:inline-block;')
          
          that.inputRange.insertNode(img);

          that.inputRange.collapse(false);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(that.inputRange);
          
        };
    }
  },
  mounted: function () {
   
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
    height:calc(100vh - 28vw);
    padding:2vw;
    padding-bottom:10vw;
  }
  .body textarea{
    font-size: 4vw;
    line-height:1.5;
    max-height: 100vw;
    height:12vw;
    overflow-y: hidden; /* fixes scrollbar flash - kudos to @brettjonesdev */
  }
  .body textarea:first-child{
    border:0;
    border-bottom:1px solid #ddd;
  }
  div[contenteditable] {
    color : #8e8e8e;
    font-size: 4vw;
    text-align: left;
    padding-top: 4vw;
    display: inline-block;
    white-space: pre-wrap;
    height:calc(100% - 12vw);
    overflow:scroll;
    background:rgb(221, 220, 220);
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

  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
  .input-content img{
    max-width:100vw;
    object-fit: cover;
  }

  

</style>
