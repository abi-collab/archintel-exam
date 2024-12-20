import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useLoadingStore } from './loading'

export const useCompanyStore = defineStore('company', () => {
  const LoadingStore = useLoadingStore()
  //Companies
  let isShowAddCompanyModal = ref(false)
  let uploadedFile = ref()
  let allCompanies = ref([])
  let addCompanyForm = ref({
    id: 0,
    name: '',
    logo: '',
    status: 0,
  })

  let isEditMode = ref(false)

  // Actions
  // Save uploaded file and return image data

  async function getAllCompanies() {
    try {
      const response = await axios.get(
        'https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/companies_archintel',
      )
      console.log('companies in store', response.data)
      allCompanies.value = response.data
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
    }
  }

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
          addCompanyForm.value.logo = response.data
          saveCompany()
          console.log('upload response', response)
          return response
        })
      // addCompanyForm.value.image_data = response.data
      // console.log(response)
      return response
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
      throw error
    }
  }

  async function saveCompany() {
    let url = 'https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/companies_archintel'
    if (isEditMode.value) {
      url = `https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/companies_archintel/${addCompanyForm.value.id}`
      // addCompanyForm.value.companies_archintel_id = addCompanyForm.value.id
      // addCompanyForm.value = {
      //   companies_archintel_id: addCompanyForm.value.id,
      //   name: addCompanyForm.value.name,
      //   status: addCompanyForm.value.status,
      // }
    }
    try {
      if (isEditMode.value) {
        const response = await axios.patch(url, addCompanyForm.value)
        console.log('update company response', response)
        getAllCompanies()
        LoadingStore.isLoading = false
        isShowAddCompanyModal.value = false
      } else {
        const response = await axios.post(url, addCompanyForm.value)
        console.log('add company response', response)
        getAllCompanies()
        LoadingStore.isLoading = false
        isShowAddCompanyModal.value = false
      }
      // const response = await axios
      //   .post(url, addCompanyForm.value, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   })
      //   .then((response) => {
      //     console.log('add company response', response)
      //     getAllCompanies()
      //     LoadingStore.isLoading = false
      //     isShowAddCompanyModal.value = false
      //     addCompanyForm.value = {
      //       name: '',
      //       logo: '',
      //       status: 0,
      //     }
      //     return response
      //   })
      // console.log(response)
      // return response
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
      throw error
    }
  }

  onMounted(() => {
    getAllCompanies()
  })

  return {
    isShowAddCompanyModal,
    save_Upload_File_And_Return_Image_Data,
    uploadedFile,
    addCompanyForm,
    allCompanies,
    isEditMode,
    saveCompany,
  }
})
