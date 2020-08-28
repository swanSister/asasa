<template>

  <div class="flex auto align-items-center header justify-content-center">
    <vue-scroll ref="vs" :ops = "ops" class="header-scroll">
      <div class="header-content flex align-items-center">
        <span @click="onClickHeader(item, index)" class="category flex none align-items-center" 
        v-for="(item, index) in headerData" :key="'headerDatas'+index" :id="item.topicId">
        <div v-if="item.topicId==currentTopicId" class="current"></div>
          {{item.name}}
        </span>
      </div>
    </vue-scroll>

  </div>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

export default {
  props:{
    headerData:Array,
    currentTopicId:String
  },
  watch:{
    currentTopicId: function(){
      if(!this.currentTopicId) return
      let offset = $("#"+this.currentTopicId).position()
      let width =  $("#"+this.currentTopicId).width()
      if(!this.$refs["vs"] || !offset || !offset.left) return
      let elCenter = offset.left + width/2
      let targetScrollLeft = elCenter - this.$refs["vs"].scroller.__clientWidth/2
      if(targetScrollLeft<0) targetScrollLeft = 1
      this.$refs["vs"].scrollTo(
        {x:targetScrollLeft}, 300, "easeInQuad"
      )
    }
  },
  data () {
    return {
      current:0,
      ops : {
      vuescroll: {
        mode: 'slide',
      },
      bar: {
        disable: true
      },
      scrollPanel: {
      initialScrollY: false,
      initialScrollX: false,
      scrollingX: true,
      scrollingY: false,
      },
    },
    }
  },
  methods:{
    backHandler(){
      console.log("history length : " + window.history.length)
      if(window.history.length>2){
        this.$router.go(-1)
      }else{
         this.$router.push('main')
      }
    },
    onClickHeader(item, index){
      this.current = index
      this.$emit('onclick',item)
    }
  },
  mounted(){
    console.log("aaa")
    console.log(this.headerData)
  }
}
</script>
<style scoped>
.header{
  min-height:18vw;
  max-height:18vw;
  background:rgb(21, 134, 204) ;
  color:white;
}
.header-scroll{
  width:80vw !important;
}
.header-content{
  width:80vw;
  min-height:18vw;
  max-height:18vw;
  text-align:center;
  white-space: nowrap;
}
.category{
  padding:0 4%;
  flex-wrap: nowrap;
  font-size:5.5vw;
  position:relative;
  height:100%;
  overflow: visible;
  margin:0 auto;
}
.category .current{
  position:absolute;
  left:50%;
  top:100%;
  background:white;
  width:1vw;
  height: 1vw;
  border-radius: .5vw;
}


</style>