import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', () => {
  //Articles
  let isShowAddArticlesModal = ref(false)

  return {
    isShowAddArticlesModal,
  }
})
