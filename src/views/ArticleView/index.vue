<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-7xl mx-auto min-h-screen">
    <div class="py-12 flex">
      <router-link to="/" class="border-2 rounded p-2 flex justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clip-rule="evenodd" />
        </svg>
        <span>Article List</span></router-link>
    </div>
    <article class="prose lg:prose-xl">
      <h1 class="text-center text-xl">{{ article.title }}</h1>
      <div class="text-center">
        <small class="text-center">{{ getWriterDetails(article.writer)?.name }}</small>
      </div>
      <div class="grid mt-12 mb-4">
        <div>Created: {{ moment(article.created_at).format('ll') }}</div>
        <div>Editor: {{ article._user_editor?.name }}</div>
      </div>
      <div class="bg-[#B38339] w-full"
        :style="`background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('https://x8ki-letl-twmt.n7.xano.io/${article.image_data?.path}'); background-position: center; background-attachment: fixed; background-size: cover;`">
        <div class="max-w-7xl mx-auto grid place-items-center h-[250px]">
        </div>
      </div>
      <p class="py-8" v-html="article?.content"></p>
      <p>{{ }}</p>
    </article>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import moment from 'moment';
import { userLoginStore } from '@/stores/login';
const loginStore = userLoginStore();

const route = useRoute();
let article = ref({});

async function getArticleData() {
  try {
    const response = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/article_archintel/${route.params.id}`)
    console.log('article response', response)
    article.value = response.data
  } catch (error) {
    console.log(error.response ? error.response.data : error.message)
    throw error
  }
}

onMounted(() => {
  getArticleData()
});

function getWriterDetails(id) {
  return loginStore.allUsers.find(user => user.id === id)
}

</script>