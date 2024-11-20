<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="article in published_articles" :key="article.id" class="flex justify-between gap-x-6 py-5">
        <router-link :to="'/' + article.id" class="flex min-w-0 gap-x-4 w-full hover:bg-gray-50 hover:cursor-pointer">
          <img class="size-32 flex-none rounded bg-gray-50"
            :src="`https://x8ki-letl-twmt.n7.xano.io/${article.image_data.path}`" alt="" />
          <div class="min-w-0 flex-auto p-3">
            <p class="text-sm/6 font-semibold text-gray-900 capitalize">{{ article.title }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(article.created_at).format('ll') }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Writer: </span> <span>{{
              getWriterDetails(article.writer).name }}</span></p>
            <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Editor: </span> <span>{{ article._user_editor?.name
                }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import moment from 'moment';
import { userLoginStore } from '@/stores/login';

const loginStore = userLoginStore();
let published_articles = ref([]);

onMounted(() => {
  getAllPublishedArticles()
});
function getAllPublishedArticles() {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel?status_id=2')
    .then(response => {
      console.log(response.data);
      published_articles.value = response.data;
    });
}

function getWriterDetails(writer_id) {
  return loginStore.allUsers.find(user => user.id === writer_id)
}
</script>