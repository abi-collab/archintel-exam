<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Users</h1>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="comp in loginStore.companies" :key="comp.id" class="flex justify-between gap-x-6 py-5">
        <router-link :to="'/' + comp.id" class="flex min-w-0 gap-x-4 w-full hover:bg-gray-50 hover:cursor-pointer">
          <img class="size-32 flex-none rounded bg-gray-50"
            :src="`https://x8ki-letl-twmt.n7.xano.io/${comp.image_data.path}`" alt="" />
          <div class="min-w-0 flex-auto p-3">
            <p class="text-sm/6 font-semibold text-gray-900 capitalize">{{ comp.title }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(comp.created_at).format('ll') }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Writer: </span> <span>{{
              getWriterDetails(comp.writer).name }}</span></p>
            <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Editor: </span> <span>{{ comp._user_editor?.name
                }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import moment from 'moment';
import { userLoginStore } from '@/stores/login';

const loginStore = userLoginStore();

</script>