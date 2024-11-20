<template>
  <TransitionRoot as="template" :show="articleStore.isShowAddArticlesModal">
    <Dialog class="relative z-10" @close="articleStore.isShowAddArticlesModal = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-3/4 sm:max-w-7xl sm:p-6">
              <div>
                <DialogTitle class="text-lg font-semibold text-gray-900">Add Article</DialogTitle>
                <form @submit.prevent="saveForm" class="mt-6 space-y-6" action="#" method="POST">
                  <div>
                    <label for="location" class="block text-sm/6 font-medium text-gray-900">Related Company</label>
                    <select id="company" name="company" v-model="articleStore.addArticleForm.related_company"
                      placeholder="Select Company"
                      class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
                      <option v-for="i in companies" :key="i.id" :value="i.id"
                        :selected="i.id === articleStore.addArticleForm.related_company">{{ i.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="title" class="block text-sm font-semibold text-gray-700">Title</label>
                    <div class="mt-1">
                      <input type="text" name="title" id="title" autocomplete="title" required
                        v-model="articleStore.addArticleForm.title"
                        class="block w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-md shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                        placeholder="Enter title" />
                    </div>
                  </div>
                  <div>
                    <label for="image" class="block text-sm font-semibold text-gray-700">Image</label>
                    <div class="mt-1">
                      <UploadFile />
                    </div>
                  </div>
                  <div>
                    <label for="description" class="block text-sm font-semibold text-gray-700">Date</label>
                    <div class="mt-1">
                      <vue-tailwind-datepicker v-model="articleStore.addArticleForm.date" as-single />
                    </div>
                  </div>
                  <div>
                    <label for="description" class="block text-sm font-semibold text-gray-700">Content</label>
                    <div class="mt-1">
                      <Editor api-key="k4s1q5z3mkag5m0nb75cj32ejg582uj966apl31c7zzp0epo" :init="{
                        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons table',
                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table',
                        menubar: 'file edit view insert format tools table',
                      }" class="overflow-y-auto h-screen/2 p-2 border-2 rounded-md"
                        v-model="articleStore.addArticleForm.content" :disabled="false" />
                    </div>
                  </div>
                  <div>
                    <label for="status" class="block text-sm/6 font-medium text-gray-900">Status</label>
                    <select id="status" name="status" v-model="articleStore.addArticleForm.status_id"
                      class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
                      <option v-for="i in status" :key="i.id" :value="i.id">{{ i.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="editor" class="block text-sm/6 font-medium text-gray-900">Editor</label>
                    <select id="editor" name="editor" v-model="articleStore.addArticleForm.editor_id"
                      class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
                      <option v-for="i in users" :key="i.id" :value="i.id">{{ i.name }}</option>
                    </select>
                  </div>
                  <div>
                    <button type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                      Article</button>
                  </div>
                </form>
                {{ articleStore.addArticleForm }}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Editor from '@tinymce/tinymce-vue';
import UploadFile from '@/components/Upload/index.vue';

import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()

let companies = ref([]);
let status = ref([]);
let users = ref([]);

onMounted(() => {
  getAllCompanies()
  getAllStatus()
  getAllUsers()

});

function getAllCompanies() {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/companies_archintel')
    .then(response => {
      // console.log(response.data);
      companies.value = response.data;
    });
}

function getAllStatus() {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/status')
    .then(response => {
      // console.log(response.data);
      status.value = response.data;
    });
}

function getAllUsers() {
  axios.get('https://x8ki-letl-twmt.n7.xano.io/api:5GzsPbbs/user')
    .then(response => {
      console.log('suers all', response.data);
      users.value = response.data;
    });
}

function saveForm() {
  articleStore.save_Upload_File_And_Return_Image_Data();
}
</script>