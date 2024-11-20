<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-7xl mx-auto min-h-screen pt-24">
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