<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-5xl mx-auto mt-16">
    <div class="flex justify-between">
      <h1 class="text-lg font-bold">Users</h1>
      <button class="border rounded py-2 px-4 text-sm bg-blue-500 text-white" @click="addUser">Add User</button>
    </div>
    <ul role="list" class="divide-y divide-gray-100 space-y-2 mt-8">
      <li v-for="user in userStore.allUsers" :key="user.id"
        class="flex justify-between gap-x-6 hover:bg-gray-50 group hover:cursor-pointer">
        <div class="min-w-0 flex-auto p-3">
          <p class="text-sm/6 font-semibold text-gray-900 capitalize">{{ user.name }}</p>
          <div>
            <p class="capitalize text-gray-400">{{ getUserType(user.user_type_id)
              }}</p>
          </div>
          <p class="mt-1 truncate text-xs/5 text-gray-500"><span>{{ user.email
              }}</span>
          </p>
          <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(user.created_at).format('ll') }}</p>
          <div class="mt-1 truncate text-xs/5 text-gray-500 capitalize">
            {{ user.status }}
          </div>
        </div>
        <button class="hidden group-hover:block p-3 capitalize text-gray-400 border hover:bg-gray-200"
          @click="editUser(user)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import moment from 'moment';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

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

function editUser(data) {
  userStore.isShowAddUserModal = true;
  userStore.isEditMode = true;

  userStore.addUserForm = {
    id: data.id,
    name: data.name,
    status: data.status,
    email: data.email,
    password: data.password
  }
}

function addUser() {
  userStore.isShowAddUserModal = true;
  userStore.isEditMode = false;
  userStore.addUserForm = {
    id: 0,
    name: '',
    status: 1,
    email: '',
    password: ''
  }
}

</script>