<template>
  <div>
    <vuescroll class="user-bookmark">
      <div class="header flex align-items-center">
        <div class="backButton" style="font-size:5vw; margin-left:2vw;">
            <span @click="$router.go(-1)" class="icon-left-open"></span>
        </div>
         <div class="flex auto justify-content-center" style="margin-right:5vw">
          북마크
        </div>
      </div>
      <PostList :postList="postList"></PostList>
      <Footer v-bind:footerIndex="4"></Footer>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import PostList from '@/components/post/post_list.vue'
import Footer from '@/components/footer'
export default {
  components:{
    PostList,
    vuescroll,
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
        else{
          console.error("bookmark data type : " + typeof(bookmark[key]))
          console.error(bookmark[key])
        }
      }
    }
    console.log(this.$store.state.me.bookmark)
  }
}
</script>
<style scoped>
.user-bookmark{
  width:100%;
  height:100%;
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