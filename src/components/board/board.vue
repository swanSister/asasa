
<template>
  <div class="board">
    <div class="board-body">
      <div class="left">
        <div class="tag"><span>{{boardData.tag}}</span></div>
        <div class="title">{{boardData.title}}</div>
        <div class="content">{{boardData.text}}</div>
        <div class="content">{{boardData.text}}</div>
      </div>
      <div class="right" v-if="boardData.thumbnail">
        <img class="thumbnail" :src="boardData.thumbnail">
      </div>
    </div>
    <div class="board-footer">
      <div class="left"> 
        <div><!-- view-->
          <span></span>{{boardData.view}}
        </div>
        <div><!-- like-->
          <span></span>좋아요
        </div>
        <div><!-- comment-->
          <span></span>댓글
        </div>
      </div>
      <div class="right">
        <div>{{boardData.time}}</div>
        <div><!-- bookmark-->
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board',
  props: {
    boardData:{},

  },
  data: function () {
    return {
      
    }
  },
  mounted: function () {
    console.log(this.boardData)
  }
}

</script>

<style scoped>
  .board{
    border-top:1px solid #ddd;
    background:white;
    display:flex;
    flex-direction:column;
    font-size:2vh;
    margin-bottom:2vh;
    color:#aaa;
  }
  .board *{
    display:flex;
    text-align:left;
  }
  .board-body{
    padding:1vh 2vh;
    align-items:center;
  }
  .board-body > .left{
    display:flex;
    justify-content:flex-start;
    flex-direction:column;
    margin-right:2vh;
  }
  .board-body > .right{
    justify-content:flex-end;
  }
  .board-body > .right img{
    width:6vh;
    height:6vh;
  }
  .board-body .tag span{
    background:#ddd;
    border-radius:2vh;
    font-size:1vh;
    padding:.5vh 2vh;
    margin:1vh 0 .5vh 0;
  }
  .board-body .title{
    margin-top:2vh;
    margin-bottom:1vh;
    font-size:2.5vh;
    color:#000;
  }
  .board-body .text{
    margin-bottom:2vh;
  }

  .board-footer{
    padding:1vh 2vh;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .board-footer > .left{
    width:60%;
    justify-content:flex-start;
  }
  .board-footer > .right{
    width:40%;
    justify-content:flex-end;
  }
</style>
