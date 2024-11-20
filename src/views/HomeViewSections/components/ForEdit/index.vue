<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="article in articleStore.forEdit_articles" :key="article?.id"
        class="flex justify-between gap-x-6 py-5 group">
        <router-link :to="'/' + article?.id" class="flex min-w-0 gap-x-4 w-full hover:bg-gray-50 hover:cursor-pointer">
          <img class="size-32 flex-none rounded bg-gray-50"
            :src="`https://x8ki-letl-twmt.n7.xano.io/${article.image_data?.path}`" alt="" />
          <div class="min-w-0 flex-auto p-3">
            <p class="text-sm/6 font-semibold text-gray-900 capitalize">{{ article?.title }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">{{ moment(article?.created_at).format('ll') }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Writer: </span> <span>{{
              getWriterDetails(article.writer)?.name }}</span></p>
            <p class="mt-1 truncate text-xs/5 text-gray-500"><span>Editor: </span> <span>{{ article._user_editor?.name
                }}</span>
            </p>
          </div>
        </router-link>
        <button class="hidden group-hover:block p-3 capitalize text-gray-400 border hover:bg-gray-200"
          @click="editArticle(article)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import moment from 'moment';
import { userLoginStore } from '@/stores/login';
import { useArticleStore } from '@/stores/article';


const articleStore = useArticleStore();
const loginStore = userLoginStore();

function getWriterDetails(writer_id) {
  return loginStore.allUsers.find(user => user.id === writer_id)
}

function editArticle(data) {
  articleStore.isShowAddArticlesModal = true;
  articleStore.isEditMode = true;

  articleStore.addArticleForm = {
    id: data.id,
    related_company: data.related_company,
    title: data.title,
    content: data.content,
    date: data.date,
    image_data: data.image_data,
    status_id: data.status_id,
    editor: data.editor,
    writer: loginStore.currentUser?.id || 0,
  }
}


</script>