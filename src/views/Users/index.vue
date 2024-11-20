<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-5xl mx-auto mt-16">
    <h1 class="text-lg font-bold">Users</h1>
    <ul role="list" class="divide-y divide-gray-100 space-y-2 mt-8">
      <li v-for="user in loginStore.allUsers" :key="user.id" class="flex justify-between gap-x-6">
        <router-link :to="'/' + user.id"
          class="flex min-w-0 gap-x-4 w-full hover:bg-gray-50 hover:cursor-pointer border border-gray-100">
          <!-- <img class="size-32 flex-none rounded bg-gray-50"
            :src="`https://x8ki-letl-twmt.n7.xano.io/${user.image_data.path}`" alt="" /> -->
          <div class="min-w-0 flex-auto p-3">
            <p class="text-sm/6 font-semibold text-gray-900 capitalize">{{ user.name }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500"><span>{{ user.email
                }}</span>
            </p>

            <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(user.created_at).format('ll') }}</p>
            <div class="mt-1 truncate text-xs/5 text-gray-500 capitalize">
              {{ user.status }}
            </div>
            <!-- <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Writer: </span> <span>{{
              getWriterDetails(user.writer).name }}</span></p> -->
          </div>
          <p class="p-3 capitalize text-gray-400">{{ getUserType(user.user_type_id)
            }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import moment from 'moment';
import { userLoginStore } from '@/stores/login';

const loginStore = userLoginStore();

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