<template>
  <div class="flex none header justify-content-center align-items-center" style="padding:2vw;">
    <div class="flex auto justify-content-start">
      <div class="flex auto align-items-center justify-content-center header-content">
        <div class="flex none justify-content-start align-items-center x-scroller"> 
          <span @click="onClickHeader(item, index)" class="category flex none align-items-center" 
          v-for="(item, index) in headerData" :key="'headerDatas'+index">
          <div v-if="item.topicId==currentTopicId" class="current"></div>
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    headerData:Array,
    currentTopicId:String
  },
  data () {
    return {
      current:0,
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
  min-height:14vw;
  max-height:14vw;
  background:rgb(21, 134, 204) ;
  color:white;
}
.header-content{
  width:100vw;
  margin:0 4vw;
  height:14vw;
}
.x-scroller{
  max-width: 90%;
  height:100%;
  overflow:auto;
}
.x-scroller::-webkit-scrollbar {display: none;}
.category{
  padding:0 4vw;
  flex-wrap: nowrap;
  font-size:5vw;
  position:relative;
  height:100%;
  overflow: visible;
}
.category .current{
  position:absolute;
  left:50%;
  top:70%;
  background:white;
  width:1vw;
  height: 1vw;
  border-radius: .5vw;
}


</style>