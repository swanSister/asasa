<template>
  <div class="post">
    <div class="post-body" @click="goDetail">
      <div class="flex auto left" :style="{
        width:postData.thumbnailUrl ? '50%' : '100%'
      }">
        <!-- <div class="tag flex none align-items-center"><span>{{postData.tag}}</span></div> -->
        <div class="topic-name" v-if="postData.isSearchResult">[{{postData.topicName}}]</div>
        <div class="title">
          <div>{{postData.title}}</div>
        </div>
        <div class="content">
          <div>
            {{postData.text}}
          </div>
        </div>
        <div class="name">{{postData.writerId}} <span>- {{$getBuildingName(postData.writer)}}</span></div>
      </div>
      <div class="right" v-if="postData.thumbnailUrl">
        <img class="thumbnail" :src="postData.thumbnailUrl">
      </div>
    </div>
    <div class="post-footer" v-if="!postData.isSearchResult">
      <div class="left">
        <div class="flex none align-items-center"><!-- view-->
          <span class="icon icon-eye"></span>{{postData.viewCount}}
        </div>
        <div :class="{'red':isLiking()}" class="flex none align-items-center" @click="isLiking() ? unLike() : setLike()"><!-- like-->
          <span class="icon icon-thumbs-up-alt"></span>{{postData.likeCount ? postData.likeCount : '좋아요'}}
        </div>
        <div class="flex none align-items-center"><!-- comment-->
          <span class="icon icon-comment"></span>{{postData.commentCount ? postData.commentCount : '댓글'}}
        </div>
      </div>
      <div class="right flex align-items-center">
        <div class="time">{{$getTime(postData.createdAt)}}</div>
        <div class="bookmark" :class="{'red':isBookmarking()}" @click="isBookmarking() ? unBookmark() : setBookmark()"><!-- bookmark-->
          <span class="icon-bookmark"></span>
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
    isLiking(){
      let likeList = this.$store.state.likeList
      let found = likeList.find(item => item.postId == this.postData.postId)
      return found ? true : false
    },
    async setLike(){
      let res = await this.$api.setLike({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('likeList',res.data.data)
        this.postData.likeCount +=1
      }
    },
    async unLike(){
      let res = await this.$api.unLike({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('likeList',res.data.data)
        this.postData.likeCount >0 ? this.postData.likeCount -- : null 
      }
    },
    isBookmarking(){
      let bookmarkList = this.$store.state.bookmarkList
      let found = bookmarkList.find(item => item.postId == this.postData.postId)
      return found ? true : false
    },
    async setBookmark(){
      let res = await this.$api.setBookmark({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('bookmarkList',res.data.data)
      }
    },
    async unBookmark(){
      let res = await this.$api.unBookmark({//return user's like list
        postId: this.postData.postId,
        userId: this.$store.state.me.userId,
      })
      if(res.status == 200){
        this.$store.commit('bookmarkList',res.data.data)
      }
    },

    goDetail: function(){
      this.$router.push({name: 'postDetail', query: { postId: this.postData.postId }})
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
    padding:2vw 5vw;
    align-items:center;
  }
  .post-body > .left{
    display:flex;
    justify-content:flex-start;
    flex-direction:column;
    margin-right:4vw;
    width:100%;
  }
  .post-body > .right{
    justify-content:flex-end;
  }
  .post-body > .right img{
    width:20vw;
    height:20vw;
  }
  .post-body > .right .icon-bookmark{
    font-size:4vw;
  }
  .post-body .tag span{
    background:#aaa;
    color:white;
    font-weight: bold;
    border-radius:3vw;
    font-size:3.5vw;
    padding:.5vh 4vw;
  }
  .post-body .title{
    display:block;
    white-space: nowrap;
    margin-bottom:2vw;
    margin-top:4vw;
    font-size:5vw;
    color:#000;
  }
  .post-body .title div{
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
  .post-body .topic-name{
    color:rgb(21, 134, 204) ;
    font-size:4.5vw;
    font-weight: bold;
  }
  .post-body .text{
    margin-bottom:3vw;
  }
  .post-body .content{
    margin-bottom:2vw;
    white-space: nowrap;
    display:block;
  }
  .post-body .content div{
    text-overflow: ellipsis;
    display:block;
    overflow:hidden;
  }
  .post-body .name{
    font-size:4.5vw;
    margin-top:4vw;
  }
  .post-body .name span{
    margin-left:2vw;
    color:rgb(21, 134, 204);
  }
  .post-footer{
    padding:2vw 4vw;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .post-footer > .left{
    width:60%;
    justify-content:flex-start;
  }
  .post-footer > .left .icon{
    margin-right:2vw;

  }
  .post-footer > .left > div{
    margin-right:8vw;
    font-size:3.5vw;
  }
  .post-footer > .right{
    width:40%;
    justify-content:flex-end;
  }
  .post-footer > .right .time{
    margin-right:4vw;
    font-size: 3.5vw;
  }
  .post-footer > .left > div.red, .post-footer > .right .red{
    color:rgb(21, 134, 204) ;
  }
</style>
