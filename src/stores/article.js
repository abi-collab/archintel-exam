import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { userLoginStore } from './login'
import { useLoadingStore } from '@/stores/loading'

export const useArticleStore = defineStore('article', () => {
  //Articles
  let isShowAddArticlesModal = ref(false)
  let uploadedFile = ref()

  const useUserLoginStore = userLoginStore()
  const LoadingStore = useLoadingStore()

  let isEditMode = ref(false)

  let addArticleForm = ref({
    id: 0,
    related_Article: 1,
    title: '',
    content: '',
    date: '',
    image_data: '',
    status_id: 0,
    editor_id: 0,
    writer_id: useUserLoginStore.currentUser?.id || 0,
  })

  let published_articles = ref([])
  let forEdit_articles = ref([])

  // Actions
  // Save uploaded file and return image data
  async function save_Upload_File_And_Return_Image_Data() {
    try {
      const formData = new FormData()
      formData.append('content', uploadedFile.value)
      const response = await axios
        .post('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          addArticleForm.value.image_data = response.data
          saveArticle()
          console.log('upload response', response)
          return response
        })
      // addArticleForm.value.image_data = response.data
      // console.log(response)
      return response
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
      throw error
    }
  }

  function getAllPublishedArticles() {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel?status_id=2')
      .then((response) => {
        console.log('published articles in store', response.data)
        published_articles.value = response.data
      })
  }

  function getAllForEditArticles() {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel?status_id=1')
      .then((response) => {
        console.log('for Edit articles in store', response.data)
        forEdit_articles.value = response.data
      })
  }

  async function saveArticle() {
    let url = 'https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel'
    if (isEditMode.value) {
      url = `https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel/${addArticleForm.value.id}`
    }
    try {
      if (isEditMode.value) {
        const response = await axios.patch(url, addArticleForm.value)
        console.log('update Article response', response)
        getAllPublishedArticles()
        getAllForEditArticles()
        LoadingStore.isLoading = false
        isShowAddArticlesModal.value = false
      } else {
        const response = await axios.post(url, addArticleForm.value)
        console.log('add Article response', response)
        getAllPublishedArticles()
        getAllForEditArticles()
        LoadingStore.isLoading = false
        isShowAddArticlesModal.value = false
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
      throw error
    }
  }

  onMounted(() => {
    getAllPublishedArticles()
    getAllForEditArticles()
  })

  return {
    //States
    isShowAddArticlesModal,
    uploadedFile,
    addArticleForm,

    //Retun Actions
    save_Upload_File_And_Return_Image_Data,
    published_articles,
    forEdit_articles,
  }
})
