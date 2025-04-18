<template>
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-full max-w-2xl p-6 bg-white rounded-lg">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-medium">Add Resources</h2>
          <button @click="$emit('close-modal')" class="text-gray-500">
            <X class="w-5 h-5" />
          </button>
        </div>
  
        <form @submit.prevent="$emit('submit-resource')">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium">Description</label>
            <textarea
              v-model="newResource.description"
              rows="3"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036]"
              placeholder="Enter description"
            ></textarea>
          </div>
  
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium">Resource Name*</label>
            <InputAtom
              v-model="newResource.name"
              type="text"
              placeholder="Enter resource name"
              required
            />
          </div>
  
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium">Resource Category*</label>
            <div class="relative">
              <select
                v-model="newResource.category"
                class="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#D50036]"
                required
              >
                <option value="" disabled selected>Select</option>
                <option value="design">Design Principle</option>
                <option value="web">Web Development</option>
                <option value="cyber">Cybersecurity</option>
                <option value="data">Data Analytics</option>
              </select>
              <ChevronDown class="absolute w-5 h-5 text-gray-400 right-3 top-3" />
            </div>
          </div>
  
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium">Upload Video/Document</label>
            <div
              @dragover.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
              @drop.prevent="$emit('file-drop', $event)"
              :class="[
                'border-2 border-dashed rounded-md p-8 text-center',
                dragover ? 'border-[#D50036] bg-pink-50' : 'border-gray-300'
              ]"
            >
              <div v-if="!newResource.file">
                <Upload class="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p class="mb-1 text-sm text-[#D50036]">Click here to upload</p>
                <p class="text-xs text-gray-500">or drag and drop</p>
                <input
                  type="file"
                  ref="fileInput"
                  @change="$emit('file-change', $event)"
                  class="hidden"
                />
              </div>
              <div v-else class="flex items-center justify-between">
                <div class="flex items-center">
                  <FileText class="w-6 h-6 mr-3 text-[#D50036]" />
                  <span class="text-sm">{{ newResource.file.name }}</span>
                </div>
                <button
                  @click.prevent="$emit('clear-file')"
                  class="text-gray-500"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
  
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium">Instructor</label>
            <div class="relative">
              <select
                v-model="newResource.instructor"
                class="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#D50036]"
              >
                <option value="" disabled selected>Select Instructor</option>
                <option value="1">Femur John</option>
                <option value="2">Uche Oginma</option>
                <option value="3">Ayomide Nissan</option>
                <option value="4">Samuel Okpara</option>
              </select>
              <ChevronDown class="absolute w-5 h-5 text-gray-400 right-3 top-3" />
            </div>
          </div>
  
          <div class="flex justify-end mt-6">
            <ButtonAtom variant="secondary" class="mr-4" @click="$emit('close-modal')">
              Cancel
            </ButtonAtom>
            <ButtonAtom variant="primary" type="submit">
              Publish
            </ButtonAtom>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  import { ChevronDown, Upload, X, FileText } from 'lucide-vue-next';
  import InputAtom from '../../atoms/InputAtom.vue';
  import ButtonAtom from '../../atoms/ButtonAtom.vue';
  
  defineProps({
    newResource: {
      type: Object,
      required: true,
    },
    dragover: {
      type: Boolean,
      required: true,
    },
  });
  
  defineEmits(['close-modal', 'submit-resource', 'file-change', 'file-drop', 'clear-file']);
  </script>