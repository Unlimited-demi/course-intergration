<template>
    <tr class="border-b hover:bg-gray-50">
      <td class="px-4 py-4">
        <div class="flex items-center">
          <div
            class="flex items-center justify-center w-8 h-8 mr-3 text-white rounded"
            :class="getResourceIconBg(resource.type)"
          >
            <component :is="getResourceIcon(resource.type)" class="w-4 h-4" />
          </div>
          <div>
            <div class="font-medium">{{ resource.name }}</div>
            <div class="text-xs text-gray-500">{{ resource.fileType }}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-4">
        <div class="flex items-center">
          <img
            :src="resource.instructor.avatar"
            alt="Instructor avatar"
            class="w-8 h-8 mr-2 rounded-full"
          />
          <div>
            <div class="font-medium">{{ resource.instructor.name }}</div>
            <div class="text-xs text-gray-500">{{ resource.date }}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-4">{{ resource.downloads }}</td>
      <td class="px-4 py-4">
        <div class="flex items-center">
          <div class="flex">
            <Star
              v-for="i in 5"
              :key="i"
              :class="[
                'w-4 h-4',
                i <= Math.floor(resource.rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              ]"
            />
          </div>
          <span class="ml-2 font-medium">{{ resource.rating }}</span>
        </div>
      </td>
      <td class="px-4 py-4">
        <button class="text-gray-500">
          <MoreVertical class="w-5 h-5" />
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { Star, MoreVertical, FileImage, File, BookOpen, FileText } from 'lucide-vue-next';
  
  const props = defineProps({
    resource: {
      type: Object,
      required: true,
    },
  });
  
  const getResourceIcon = (type) => {
    switch (type) {
      case 'design':
        return FileImage;
      case 'web':
        return File;
      case 'cyber':
        return File;
      case 'data':
        return BookOpen;
      default:
        return FileText;
    }
  };
  
  const getResourceIconBg = (type) => {
    switch (type) {
      case 'design':
        return 'bg-[#F39D1C]';
      case 'web':
        return 'bg-[#00B454]';
      case 'cyber':
        return 'bg-[#D50036]';
      case 'data':
        return 'bg-[#4B5054]';
      default:
        return 'bg-gray-500';
    }
  };
  </script>