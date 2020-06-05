<template>
  <div class="flex none header justify-content-center align-items-center" style="padding:2vw;">
    <div class="flex auto justify-content-start">
      <div ref="xScroller" id="x-scroller" class="flex auto align-items-center justify-content-center">
        <span @click="onClickHeader(item, index)" class="category flex none" 
        v-for="(item, index) in headerData" :key="'headerDatas'+index"
        :class="{'current':index==current}">
          {{item.name}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    headerData:Array,
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
  background:#333;
  color:white;
}
#x-scroller{
  overflow-x:scroll;
  margin:0 4vw;
  flex-wrap: nowrap;
  height:14vw;
}
.category{
  padding:0 4vw;
  flex-wrap: nowrap;
}
.category.current{
  position:relative;
}
.category.current:after{
  position:absolute;
  left:calc(50% - .5vw);
  width:1vw;
  height:1vw;
  border-radius: 50%;
  background:white;
  
  top:100%;
  content:"";
}

</style>