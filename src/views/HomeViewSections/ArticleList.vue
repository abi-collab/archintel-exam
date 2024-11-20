<template>
  <AddArticle />
  <div class="max-w-5xl mx-auto">
    <div class="text-lg flex justify-end mb-12">
      <!-- <span>All Articles</span> -->
      <button class="border rounded py-2 px-4 text-sm bg-blue-500 text-white" @click="Add()">Add
        Article</button>
    </div>

    <div class="flex justify-center gap-8">
      <button @click="toggleComponent(false)" :class="{ 'border-b-2 border-b-blue-500': !isEdit, '': isEdit }">
        Published
      </button>
      <button @click="toggleComponent(true)" :class="{ 'border-b-2 border-b-blue-500': isEdit, '': !isEdit }">
        For Edit
      </button>
    </div>
    <!-- <div>
    <component :is="getRightComponent"></component>
  </div> -->
    <ForEdit v-show="isEdit" />
    <Published v-show="!isEdit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()

import AddArticle from './components/AddArticle.vue';

import ForEdit from './components/ForEdit/index.vue';
import Published from './components/Published/index.vue';

let isEdit = ref(false);
function toggleComponent(editMode) {
  isEdit.value = editMode
}

function Add() {
  articleStore.isShowAddArticlesModal = true;
  articleStore.addArticleForm = {
    title: '',
    content: '',
    user_id: '',
    status: '',
    image: ''
  }
}
</script>