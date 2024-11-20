<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-5xl mx-auto p-24">
    <h1>Companies</h1>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="comp in companies" :key="comp.id" class="flex justify-between gap-x-6 py-5 hover:bg-gray-50">
        <router-link :to="'/' + comp.id" class="flex min-w-0 gap-x-4 w-full hover:cursor-pointer">
          <div class="border">
            <img class="size-32 flex-none rounded-full bg-gray-50" src="" alt="" />
          </div>
          <div class="min-w-0 flex-auto p-3">
            <p class="text-sm/6 font-semibold text-gray-900 capitalize">{{ comp.name }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(comp.created_at).format('ll') }}</p>
            <p class="mt-1 truncate text-sm text-gray-500">{{ returnLocalStatus(comp.status) }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import moment from 'moment';
import axios from 'axios';

let companies = ref([]);

onMounted(() => {
  getAllCompanies()
});

function getAllCompanies() {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/companies_archintel')
    .then(response => {
      companies.value = response.data;
    });
}

function returnLocalStatus(status) {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Inactive';
    case 3:
      return 'Pending';
    default:
      return 'Unknown';
  }
}

</script>