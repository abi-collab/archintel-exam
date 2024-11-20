import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  let isLoading = ref(false)
  return {
    isLoading,
  }
})
