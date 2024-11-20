<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
// import HelloWorld from './components/HelloWorld.vue'
import ConfirmLogout from './components/ModalDialogs/ConfirmLogout.vue';
import { userLoginStore } from './stores/login';
const useUserLoginStore = userLoginStore();

</script>

<template>
  <ConfirmLogout />
  <Navbar v-if="useUserLoginStore.authToken" />
  <RouterView />
</template>

<style scoped></style>
