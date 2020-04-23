
<template>
  <div class="board-list">
    <div class="sorting">
      <div>최신순 <span>아래화살표</span></div>
    </div>

    <Board v-for="(board, index) in boardLists" v-bind:boardData="board" :key="index+'board'"></Board>
  </div>
</template>

<script>

import Board from '@/components/board/board.vue'

export default {
  
  name: 'HelloWorld',
  components: {
    Board
  },
  data: function () {
    return {
      boardLists:[
        {
          tag:"사회・투자",
          name:"강남 현대아파트・AIEM08",
          title:"김정은 위중 정보, 정확하지 않을 수도 있다",
          text:"미국 CNN 방송은 20일(현지시간) 김정은 북한 국무위원장 관련 추가 보도를 통해 김 위원장이 심혈관 수술 후 위중한 상황에 있다는 정보가 정확하지 않을 수 있다고 했다.",
          view:3,
          time:'방금',
          thumbnail:'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        },
        {
          tag:"사회2",
          name:"강남 현대아파트 ・ AIEM08",
          title:"김정은 위중 정보, 정확하지 않을 수도 있다",
          text:"미국 CNN 방송은 20일(현지시간) 김정은 북한 국무위원장 관련 추가 보도를 통해 김 위원장이 심혈관 수술 후 위중한 상황에 있다는 정보가 정확하지 않을 수 있다고 했다.",
          view:3,
          time:'방금',
          thumbnail:'',
        },
        {
          tag:"사회3",
          name:"강남 현대아파트 ・ AIEM08",
          title:"김정은 위중 정보, 정확하지 않을 수도 있다",
          text:"미국 CNN 방송은 20일(현지시간) 김정은 북한 국무위원장 관련 추가 보도를 통해 김 위원장이 심혈관 수술 후 위중한 상황에 있다는 정보가 정확하지 않을 수 있다고 했다.",
          view:3,
          time:'방금',
          thumbnail:'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        },
      ]
    }
  }
}
</script>

<style scoped>
  .board-list{
    margin-top:2vh;
    width:100%;
  }
  .sorting{
    width:100%;
    display:flex;
    justify-content:flex-end;
    background:white;
  }
  .board-list{
    margin-bottom:10vh;
  }
</style>
