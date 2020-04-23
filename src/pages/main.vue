<template>
  <div>
    
     <vuescroll class="board-content">
       
      <Header></Header>
      <BoardHeader></BoardHeader>
      <BoardList></BoardList>
     </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import Header from '@/components/header'
import BoardHeader from '@/components/board/board_header.vue'
import BoardList from '@/components/board/board_list.vue'
export default {
  components:{
    Header,
    BoardHeader,
    BoardList,
    vuescroll,
  },
  props:{
  
  },
  data () {
    return {
    
    }
  },
  methods:{
  },
  mounted(){
      console.log("mouted main")
  }
}
</script>
<style scoped>
.board-content{
  width:100%;
  height:100%;
  overflow-y:auto;
}
</style>