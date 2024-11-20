<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
// import HelloWorld from './components/HelloWorld.vue'
import ConfirmLogout from './components/ModalDialogs/ConfirmLogout.vue';
import AddCompanyModal from '@/views/Companies/components/AddCompany.vue'
import AddUser from './views/Users/components/AddUser.vue';
import Loading from '@/components/Loading/loads.vue'
import { userLoginStore } from './stores/login';
const useUserLoginStore = userLoginStore();

</script>

<template>
  <Loading />
  <ConfirmLogout />

  <AddCompanyModal />
  <AddUser />

  <Navbar v-if="useUserLoginStore.authToken" />
  <div class="px-8">
    <RouterView />
  </div>

</template>

<style scoped></style>
