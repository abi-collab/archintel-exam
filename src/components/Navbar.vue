<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center mb-1">
            <router-link to="/" class="font-bold tracking-tight capitalize">arChiNteL</router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/"
              :class="[route.name === 'home' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900 mb-2']">Dashboard</router-link>
            <router-link to="/companies"
              :class="[route.name === 'companies' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900 mb-2']">Companies</router-link>
            <router-link to="/users"
              :class="[route.name === 'users' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900 mb-2']">Users</router-link>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img class="size-8 rounded-full" :src="portrait" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem as="div" v-slot="{ active }"
                  :class="[active ? 'bg-gray-100 outline-none' : '', 'block py-2 text-sm text-gray-900 w-full text-left']">
                <p class="block px-4 pt-2 text-base text-gray-900">{{
                  getUserType(useUserLoginStore.currentUser.user_type_id) }}</p>
                </MenuItem>
                <MenuItem as="div">
                <div class="px-4 py-2 grid">
                  <p>{{ useUserLoginStore.currentUser?.name }}</p>
                  <small>{{ useUserLoginStore.currentUser.email }}</small>
                </div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button @click="userStore.isShoeConfirmLogoutModal = true"
                  :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left']">Sign
                  out</button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import portrait from '@/assets/images/portrait.jpg'
import { useRoute } from 'vue-router'
//import user store
import { userLoginStore } from '@/stores/login';
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const useUserLoginStore = userLoginStore()

const route = useRoute()

function getUserType(userType) {
  switch (userType) {
    case 3:
      return 'Admin';
    case 1:
      return 'Writer';
    case 2:
      return 'Editor';
    default:
      return 'Unknown';
  }
}

</script>