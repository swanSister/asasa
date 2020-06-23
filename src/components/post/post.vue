<template>
  <div class="post">
    <div class="post-body" @click="goDetail">
      <div class="flex auto left">
        <div class="tag flex none align-items-center"><span>{{postData.fields.tag}}</span></div>
        <div class="title">{{postData.fields.title}}</div>
        <div class="content">
          {{postData.fields.text.length > 90 ?postData.fields.text.slice(0,90)+"..." :postData.fields.text}}
        </div>
        <div class="name">{{postData.fields.userId}} <span>· {{postData.fields.buildingName}}</span></div>
      </div>
      <div class="right" v-if="postData.fields.imgList.files && postData.fields.imgList.files.length>0">
        <img class="thumbnail" :src="postData.fields.imgList.files[0]">
      </div>
    </div>
    <div class="post-footer">
      <div class="left"> 
        <div class="flex none align-items-center"><!-- view-->
          <span class="icon-eye"></span>{{postData.fields.view}}
        </div>
        <div class="flex none align-items-center"><!-- like-->
          <span class="icon-thumbs-up-1"></span>{{postData.fields.like}}
        </div>
        <div class="flex none align-items-center"><!-- comment-->
          <span class="icon-comment"></span>{{postData.fields.commentCount}}
        </div>
      </div>
      <div class="right">
        <div>{{postData.fields.time}}</div>
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
  methods:{
    goDetail: function(){
      this.$router.push({name: 'postDetail', params: { path: this.postData.path }})
    },
  },
  mounted () {
    //  console.log("###postData", this.postData)
  }
}

</script>

<style scoped>
  .post{
    border-top:1px solid #ddd;
    background:white;
    display:flex;
    flex-direction:column;
    margin-bottom:2vw;
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
  .post-body .content{
    margin-bottom:2vw;
  }
  .post-body .name{
    font-size:3.5vw;
  }
  .post-body .name span{
    margin-left:2vw;
    color:tomato;
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
