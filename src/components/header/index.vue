<template>
  <div class="flex none header justify-content-center align-items-center" style="padding:2vw;">
    <div class="flex auto justify-content-start">
      <div ref="xScroller" id="x-scroller" class="flex auto align-items-center justify-content-center">
        <span class="category flex none" v-for="(category, index) in categories" :key="'category'+index">
          {{category.name}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
 
  },
  data () {
    return {
      categories:[
        {name:'토픽'}
      ]
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
    }

  },
  mounted(){
    console.log("mounted header")
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
</style>