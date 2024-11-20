import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useLoadingStore } from './loading'

export const useUserStore = defineStore('user', () => {
  let isShoeConfirmLogoutModal = ref(false)
  const LoadingStore = useLoadingStore()
  //Companies
  let isShowAddUserModal = ref(false)
  let allUsers = ref([])
  let addUserForm = ref({
    id: 0,
    name: '',
    email: null,
    password: null,
    // role: 0,
    // magic_link: null,
    user_type_id: 0,
    status: '',
  })

  let isEditMode = ref(false)

  // Actions
  // Save uploaded file and return image data

  async function getAllUsers() {
    try {
      const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/user')
      console.log('users in store', response.data)
      allUsers.value = response.data
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
    }
  }

  async function saveUser() {
    let url = 'https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/user'
    if (isEditMode.value) {
      url = `https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/user/${addUserForm.value.id}`
    }
    try {
      if (isEditMode.value) {
        const response = await axios.post(url, addUserForm.value)
        console.log('update user response', response)
        getAllUsers()
        LoadingStore.isLoading = false
        isShowAddUserModal.value = false
      } else {
        const response = await axios.post(url, addUserForm.value)
        console.log('add user response', response)
        getAllUsers()
        LoadingStore.isLoading = false
        isShowAddUserModal.value = false
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message)
      throw error
    }
  }

  onMounted(() => {
    getAllUsers()
  })

  return {
    isShowAddUserModal,
    addUserForm,
    allUsers,
    isEditMode,
    saveUser,

    isShoeConfirmLogoutModal,
  }
})
