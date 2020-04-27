
<template>
  <div class="post">
    <div class="post-body" @click="$router.push('postDetail')">
      <div class="left">
        <div class="tag flex none align-items-center"><span>{{postData.tag}}</span></div>
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
        <div class="flex none align-items-center"><!-- view-->
          <span class="icon-eye"></span>{{postData.view}}
        </div>
        <div class="flex none align-items-center"><!-- like-->
          <span class="icon-thumbs-up-1"></span>{{postData.like}}
        </div>
        <div class="flex none align-items-center"><!-- comment-->
          <span class="icon-comment"></span>{{postData.commentCount}}
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
    margin-bottom:3vw;
    color:#aaa;
  }
  .post *{
    display:flex;
    text-align:left;
  }
  .post-body{
    padding:2vh 4vw;
    align-items:center;
  }
  .post-body > .left{
    display:flex;
    justify-content:flex-start;
    flex-direction:column;
    margin-right:4vw;
  }
  .post-body > .right{
    justify-content:flex-end;
  }
  .post-body > .right img{
    width:20vw;
    height:20vw;
  }
  .post-body .tag span{
    background:#aaa;
    color:white;
    font-weight: bold;
    border-radius:3vw;
    font-size:3vw;
    padding:.5vh 4vw;
  }
  .post-body .title{
    margin-top:4vw;
    margin-bottom:2vw;
    font-size:4.5vw;
    color:#000;
  }
  .post-body .text{
    margin-bottom:3vw;
  }
  .post-footer{
    padding:1.5vw 4vw;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .post-footer > .left{
    width:60%;
    justify-content:flex-start;
  }
  .post-footer > .left > div{
    margin-right:6vw;
  }
  .post-footer > .right{
    width:40%;
    justify-content:flex-end;
  }
</style>
