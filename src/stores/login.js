import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const userLoginStore = defineStore(
  'login',
  () => {
    let login_data = ref({
      email: '',
      password: '',
    })

    let router = useRouter()
    let currentUser = ref()
    let authToken = ref('')
    let allUsers = ref([])

    //generated from other component
    let companies = ref([])

    // if (localStorage.getItem('user-token')) {
    //   authToken.value = localStorage.getItem('user-token')
    //   login()
    // }
    async function login() {
      try {
        const response = await axios.post(
          'https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/auth/login',
          login_data.value,
        )
        console.log('login response', response)

        if (response.data.authToken) {
          authToken.value = response.data.authToken
          localStorage.setItem('user-token', response.data.authToken)
          getAuthUserData(response.data.authToken)
          getAllUsers()
        }
      } catch (error) {
        console.log(error.response ? error.response.data : error.message)
        throw error
      }
    }

    async function getAuthUserData(token) {
      try {
        const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('auth user response', response)
        currentUser.value = response.data
        if (token) {
          router.push('/')
        }
      } catch (error) {
        console.log(error.response ? error.response.data : error.message)
        throw error
      }
    }

    let isAuthFromLocalStorage = computed(() => {
      return localStorage.getItem('user-token')
    })

    async function getAllUsers() {
      try {
        const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/user')
        console.log('Allll users response', response)
        allUsers.value = response.data
      } catch (error) {
        console.log(error.response ? error.response.data : error.message)
        throw error
      }
    }

    return {
      login_data,
      login,
      authToken,
      currentUser,
      isAuthFromLocalStorage,
      allUsers,
      companies,
    }
  },
  {
    persist: true, // Add this line to enable persistence
  },
)
