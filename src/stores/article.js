import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useArticleStore = defineStore('article', () => {
  //Articles
  let isShowAddArticlesModal = ref(false)
  let uploadedFile = ref()

  let addArticleForm = ref({
    related_company: '',
    title: '',
    content: '',
    date: '',
    image_data: '',
  })

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

  async function saveArticle() {
    try {
      const response = await axios
        .post(
          'https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel',
          addArticleForm.value,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((response) => {
          console.log('add article response', response)
          return response
        })
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
      throw error
    }
  }

  return {
    //States
    isShowAddArticlesModal,
    uploadedFile,
    addArticleForm,

    //Retun Actions
    save_Upload_File_And_Return_Image_Data,
  }
})
