<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-5xl mx-auto mt-16">
    <div class="flex justify-between">
      <h1 class="text-lg font-bold">Companies</h1>
      <button class="border rounded py-2 px-4 text-sm bg-blue-500 text-white" @click="addCompany">Add Company</button>
    </div>
    <ul role="list" class="divide-y divide-gray-100 space-y-2 mt-4">
      <li v-for="comp in companyStore.allCompanies" :key="comp.id"
        class="flex justify-between gap-x-6 py-3 px-5 hover:bg-gray-50 group">
        <div class="flex min-w-0 gap-x-4 w-full hover:cursor-pointer">
          <div>
            <img class="size-16 flex-none rounded-full bg-gray-50"
              :src="'https://x8ki-letl-twmt.n7.xano.io/' + comp.logo?.path" :alt="comp.name" />
          </div>
          <div class="min-w-0 flex-auto p-3">
            <p class="text-sm/6 font-semibold text-gray-900 capitalize">{{ comp.name }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(comp.created_at).format('ll') }}</p>
            <p class="mt-1 truncate text-sm text-gray-500">{{ returnLocalStatus(comp.status) }}</p>
          </div>
        </div>
        <button class="hidden group-hover:block p-3 capitalize text-gray-400 border hover:bg-gray-200"
          @click="editCompany(comp)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import moment from 'moment';
import { useCompanyStore } from '@/stores/company';

const companyStore = useCompanyStore();

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

function editCompany(data) {
  companyStore.isShowAddCompanyModal = true;
  companyStore.isEditMode = true;

  companyStore.addCompanyForm = {
    id: data.id,
    name: data.name,
    status: data.status,
    logo: data.logo
  }
}

function addCompany() {
  companyStore.isShowAddCompanyModal = true;
  companyStore.isEditMode = false;
  companyStore.addCompanyForm = {
    id: 0,
    name: '',
    status: 1,
    logo: ''
  }
}

</script>