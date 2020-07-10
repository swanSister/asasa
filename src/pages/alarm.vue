<template>
  <div>
    <vue-scroll class="user-content">
      ALARM
      <Footer v-bind:footerIndex="3"></Footer>
    </vue-scroll>
  </div>
</template>

<script>

import Footer from '@/components/footer'
export default {
  components:{
    
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