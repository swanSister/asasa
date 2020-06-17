<template>
  <div>
    <vuescroll class="user-content">
      ALARM
      <Footer v-bind:footerIndex="3"></Footer>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import Footer from '@/components/footer'
export default {
  components:{
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
    
  },
  async mounted(){
    
  }
}
</script>
<style scoped>
.user-content{
  width:100%;
  height:100%;
  overflow-y:auto;
}
</style>