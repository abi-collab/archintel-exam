import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let user = ref(1)
  let isShoeConfirmLogoutModal = ref(false)
  return {
    user,
    isShoeConfirmLogoutModal,
  }
})
