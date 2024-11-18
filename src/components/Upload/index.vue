<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <input type="file" name="image" id="image" autocomplete="image" required accept="image/*" @change="handleFileUpload"
      class="block w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-md shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
      placeholder="Upload image" />
  </div>
</template>

<script setup>
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()

function handleFileUpload(event) {
  const file = event.target.files[0];
  console.log(file);
  articleStore.uploadedFile = file;
}
</script>