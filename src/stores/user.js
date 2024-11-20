import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let isShoeConfirmLogoutModal = ref(false)
  return {
    // user,
    isShoeConfirmLogoutModal,
  }
})
