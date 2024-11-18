import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let user = ref(1)
  return {
    user,
  }
})
