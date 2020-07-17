
<template>
  <div class="chat-list">
    <Chat v-for="(chat, index) in chatList" :chatData="chat" :key="index+'chat'"></Chat>
  </div>
</template>

<script>

import Chat from '@/components/chat/chat.vue'

export default {
  components: {
    Chat
  },
  props:{
    chatList:Array
  },
  data: function () {
    return {
    
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
