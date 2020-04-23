
<template>
  <div class="post">
    <div class="post-body" @click="$router.push('postDetail')">
      <div class="left">
        <div class="tag"><span>{{postData.tag}}</span></div>
        <div class="title">{{postData.title}}</div>
        <div class="content">{{postData.text}}</div>
        <div class="content">{{postData.text}}</div>
      </div>
      <div class="right" v-if="postData.thumbnail">
        <img class="thumbnail" :src="postData.thumbnail">
      </div>
    </div>
    <div class="post-footer">
      <div class="left"> 
        <div><!-- view-->
          <span></span>{{postData.view}}
        </div>
        <div><!-- like-->
          <span></span>좋아요
        </div>
        <div><!-- comment-->
          <span></span>댓글
        </div>
      </div>
      <div class="right">
        <div>{{postData.time}}</div>
        <div><!-- bookmark-->
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: {
    postData:{},

  },
  data: function () {
    return {
      
    }
  },
  mounted: function () {
    console.log(this.postData)
  }
}

</script>

<style scoped>
  .post{
    border-top:1px solid #ddd;
    background:white;
    display:flex;
    flex-direction:column;
    font-size:2vh;
    margin-bottom:2vh;
    color:#aaa;
  }
  .post *{
    display:flex;
    text-align:left;
  }
  .post-body{
    padding:1vh 2vh;
    align-items:center;
  }
  .post-body > .left{
    display:flex;
    justify-content:flex-start;
    flex-direction:column;
    margin-right:2vh;
  }
  .post-body > .right{
    justify-content:flex-end;
  }
  .post-body > .right img{
    width:6vh;
    height:6vh;
  }
  .post-body .tag span{
    background:#ddd;
    border-radius:2vh;
    font-size:1vh;
    padding:.5vh 2vh;
    margin:1vh 0 .5vh 0;
  }
  .post-body .title{
    margin-top:2vh;
    margin-bottom:1vh;
    font-size:2.5vh;
    color:#000;
  }
  .post-body .text{
    margin-bottom:2vh;
  }

  .post-footer{
    padding:1vh 2vh;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .post-footer > .left{
    width:60%;
    justify-content:flex-start;
  }
  .post-footer > .right{
    width:40%;
    justify-content:flex-end;
  }
</style>
