<template>
  <AddArticle />
  <div class="text-lg font-bold flex justify-between">
    <span>Articles</span>
    <button @click="articleStore.isShowAddArticlesModal = true">Add Article</button>
  </div>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="article in articles" :key="article.id" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <img class="size-12 flex-none rounded-full bg-gray-50" :src="article.image.url" alt="" />
        <div class="min-w-0 flex-auto">
          <p class="text-sm/6 font-semibold text-gray-900 uppercase">{{ article.title }}</p>
          <p class="mt-1 truncate text-xs/5 text-gray-500">{{ article.created_at }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()

import AddArticle from './components/AddArticle.vue';

let articles = ref([]);

onMounted(() => {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel')
    .then(response => {
      console.log(response.data);
      articles.value = response.data;
    });
});
</script>