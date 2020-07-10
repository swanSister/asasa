<template>
  <div>
      <div class="header flex align-items-center">
        <div class="backButton" style="font-size:5vw; margin-left:2vw;">
            <span @click="$router.go(-1)" class="icon-left-open"></span>
        </div>
         <div class="flex auto justify-content-center" style="margin-right:5vw">
          북마크
        </div>
      </div>
      <vue-scroll class="user-bookmark">
        <PostList @sort="onSort" class="post-list" :postList="postList"></PostList>
      </vue-scroll>
    <Footer v-bind:footerIndex="4"></Footer>
  </div>
</template>

<script>

import PostList from '@/components/post/post_list.vue'
import Footer from '@/components/footer'
export default {
  components:{
    PostList,
    
    Footer,
  },
  props:{
    
  },
  data () {
    return {
      headerData:[],
      postList:[],
    }
  },
  methods:{
     onSort(sort){
      //sort 1: 최신순, 2: 추천순, 3:조회순
      if(sort==1){
         this.postList = this.postList.sort(function(a, b){
          return a.fields.createdAt._seconds > b.fields.createdAt._seconds ? -1 : a.fields.createdAt._seconds <= b.fields.createdAt._seconds ? 1 : 0;
        })
      }else if(sort==2){
         this.postList = this.postList.sort(function(a, b){
          return a.fields.like > b.fields.like ? -1 : a.fields.like <= b.fields.like ? 1 : 0;
        })
      }else if(sort==3){
         this.postList = this.postList.sort(function(a, b){
          return a.fields.view > b.fields.view ? -1 : a.fields.view <= b.fields.view? 1 : 0;
        })
      }
    
     console.log(this.postList)
    },
    async onClickHeader(item){
      console.log(item)
      this.getMessages(item.path)
    },
    
    
  },
  async mounted(){
    await this.$updateUserInfo()

    if(this.$store.state.me.bookmark){
      let bookmark = this.$store.state.me.bookmark
      console.log("###bookmark",bookmark)
      for(let key in bookmark){
        if(typeof(bookmark[key])=='object'){

        this.postList.push({'path':key,
        fields:bookmark[key]
        })
        }
      }
      this.postList = this.postList.sort(function(a, b){
        return a.fields.createdAt._seconds > b.fields.createdAt._seconds ? -1 : a.fields.createdAt._seconds <= b.fields.createdAt._seconds ? 1 : 0;
      })
    }
    console.log(this.$store.state.me.bookmark)
  }
}
</script>
<style scoped>
.user-bookmark{
  width:100%;
  height:calc(100% - 28vw) !important;
  overflow-y:auto;
}
.header{
  font-size:4vw;
  font-weight: bold;
  padding:4vw 0;
  background:white;
  color:#333;
}
</style>