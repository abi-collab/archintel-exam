<template>
  <TransitionRoot as="template" :show="companyStore.isShowAddCompanyModal">
    <Dialog class="relative z-10" @close="companyStore.isShowAddCompanyModal = false">
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
                <DialogTitle class="text-lg font-semibold text-gray-900">Add Company</DialogTitle>
                <form @submit.prevent="saveForm" class="mt-6 space-y-6" action="#" method="POST">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700">Name</label>
                    <div class="mt-1">
                      <input type="text" name="name" id="name" autocomplete="title" required
                        v-model="companyStore.addCompanyForm.name"
                        class="block w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-md shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                        placeholder="Enter title" />
                    </div>
                  </div>
                  <div>
                    <label for="status" class="block text-sm/6 font-medium text-gray-900">Status</label>
                    <select id="status" name="status" placeholder="Select Company"
                      v-model="companyStore.addCompanyForm.status"
                      class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
                      <option selected value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label for="image" class="block text-sm font-semibold text-gray-700">Logo</label>
                    <div class="mt-1">
                      <UploadFile />
                    </div>
                  </div>
                  <div>
                    <button type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                      Company</button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import UploadFile from '@/components/Upload/UploadCompanyLogo.vue';
import { useLoadingStore } from '@/stores/loading'

import { useCompanyStore } from '@/stores/company'
const companyStore = useCompanyStore()

const loadingStore = useLoadingStore()

function saveForm() {
  loadingStore.isLoading = true;
  companyStore.isShowAddCompanyModal = false;
  companyStore.save_Upload_File_And_Return_Image_Data();
}
</script>