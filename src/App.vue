<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
// import HelloWorld from './components/HelloWorld.vue'
import ConfirmLogout from './components/ModalDialogs/ConfirmLogout.vue';
import AddCompanyModal from '@/views/Companies/components/AddCompany.vue'
import Loading from '@/components/Loading/loads.vue'
import { userLoginStore } from './stores/login';
const useUserLoginStore = userLoginStore();

</script>

<template>
  <Loading />
  <ConfirmLogout />
  <AddCompanyModal />
  <Navbar v-if="useUserLoginStore.authToken" />
  <RouterView />
</template>

<style scoped></style>
