
<template>
  <div class="post-writing">
    <vuescroll>
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
        <textarea placeholder="제목을 입력해 주세요"></textarea>
        <div class="input-content" ref="inputContent" contentEditable="true" placeholder="내용을 입력해 주세요">
          
        </div>
      </div>

      <div class="footer flex auto justify-content-start align-items-center;">
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
    </vuescroll>
  </div>
</template>

<script>

import vuescroll from 'vuescroll';
export default {
  name: 'postHeader',
  components:{
    vuescroll,
  },
  
  data: function () {
    return {
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
    onClickListItem:function(item){
      this.title = item.name
      this.isLocationListShow = false;
      this.$refs.fileInput.focus()
      console.log(this.$refs.fileInput)
    },   
    previewFiles(event) {
      let that = this;
      var oFReader = new FileReader()
        oFReader.readAsDataURL(event.target.files[0])
        
        oFReader.onload = function (oFREvent) {
          let linebreak1 = document.createElement('br');
          let linebreak2 = document.createElement('br');
          let img = document.createElement('img')
          let inputContent = that.$refs.inputContent
          img.src = oFREvent.target.result
          img.setAttribute('style','max-width:100vw')
          inputContent.appendChild(img)
          inputContent.appendChild(linebreak1)
          inputContent.appendChild(linebreak2)
        };
    }
  }
}
</script>

<style scoped>
  .post-writing{
    width:100%; height:100%;
    background:white;
  }
  .header{
    height:8vh;
    border-bottom:1px solid #ddd;
    padding:0 2vh;
    font-size: 2.5vh;
  }
  .header .cancel{
    color:#000;
  }
  .header .title{
    font-weight: bold;
  }
  .header .title .icon{
    font-size:1.5vh;
    margin-left:1vh;
  }
  .header .add{
    color:tomato;
  }
  .body{
    padding:2vh;
    padding-bottom:10vh;
  }
  .body textarea{
    font-size: 2vh;
  }
  .body textarea:first-child{
    border:0;
    border-bottom:1px solid #ddd;
  }
  .footer{
    width:100%;
    position:fixed;
    left:0;
    bottom:0;
    height:6vh;
    border-top:1px solid #ddd;
    padding:0 2vh;
    background:white;
  }
  .footer .icon{
    font-size:4vh;
    
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
    max-height:50vh;
    background:white;
    position: fixed;
    left:0;
    bottom:0;
    overflow:scroll;
    padding:0 2vh;
  }
  .location-list .list .item{
    border-bottom:1px solid #ddd;
    padding:3vh 0;
  }
  .location-list .list .item .name{
    font-size:3vh;
    font-weight: bold;
    color:#000;
  }
  .location-list .list .item .desc{
    font-size:2.5vh;
    color:#aaa;
    font-weight: bold;
    margin-top:1vh;
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
  div[contenteditable=true] {
    color : #8e8e8e;
    font-size: 2vh;
    text-align: left;
    padding-top: 2vh;
    min-height:80vh;
    
  }
  [placeholder]:empty::before {
      content: attr(placeholder);
      
  }

</style>
