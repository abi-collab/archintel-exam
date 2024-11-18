<template>
  <AddArticle />
  <div class="text-lg flex justify-between mb-12">
    <span>All Articles</span>
    <button class="border rounded py-2 px-4 text-sm bg-blue-500 text-white"
      @click="articleStore.isShowAddArticlesModal = true">Add
      Article</button>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div>
      <h3 class="font-bold">For Edit</h3>
      <ul role="list" class="divide-y divide-gray-100">
        <li v-for="article in for_edit_articles" :key="article.id" class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <!-- <img class="size-12 flex-none rounded-full bg-gray-50" :src="article.image?.url" alt="" /> -->
            <img class="size-32 flex-none rounded bg-gray-50"
              :src="`https://x8ki-letl-twmt.n7.xano.io/${article.image_data.path}`" alt="" />
            <div class="min-w-0 flex-auto">
              <p class="text-sm/6 font-semibold text-gray-900 uppercase">{{ article.title }}</p>
              <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(article.created_at).format('ll') }}</p>
              <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Writer: </span> <span>#</span></p>
              <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Editor: </span> <span>{{ article._user_editor?.name
                  }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <h3 class="font-bold">Published</h3>
      <ul role="list" class="divide-y divide-gray-100">
        <li v-for="article in published_articles" :key="article.id" class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <!-- <img class="size-12 flex-none rounded-full bg-gray-50" :src="article.image?.url" alt="" /> -->
            <img class="size-32 flex-none rounded bg-gray-50"
              :src="`https://x8ki-letl-twmt.n7.xano.io/${article.image_data.path}`" alt="" />
            <div class="min-w-0 flex-auto">
              <p class="text-sm/6 font-semibold text-gray-900 uppercase">{{ article.title }}</p>
              <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(article.created_at).format('ll') }}</p>
              <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Writer: </span> <span>#</span></p>
              <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Editor: </span> <span>{{ article._user_editor?.name
                  }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>


</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import moment from 'moment';
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()

import AddArticle from './components/AddArticle.vue';

let for_edit_articles = ref([]);
let published_articles = ref([]);

onMounted(() => {
  // axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel?status_id=1')
  //   .then(response => {
  //     console.log(response.data);
  //     for_edit_articles.value = response.data;
  //   });
  getAllForEditArticles()
  getAllPublishedArticles()
});

function getAllForEditArticles() {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel?status_id=1')
    .then(response => {
      console.log(response.data);
      for_edit_articles.value = response.data;
    });
}

function getAllPublishedArticles() {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel?status_id=2')
    .then(response => {
      console.log(response.data);
      published_articles.value = response.data;
    });
} 
</script>