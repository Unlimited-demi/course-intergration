<template>
    <div class="overflow-hidden bg-white border rounded-lg shadow-sm">
      <div class="relative aspect-video bg-gray-200">
        <img :src="video.thumbnail" alt="Video thumbnail" class="object-cover w-full h-full" />
        <div class="absolute inset-0 flex items-center justify-center">
          <button
            @click="$emit('play-video', video)"
            class="flex items-center justify-center w-12 h-12 text-white bg-[#D50036] bg-opacity-80 rounded-full"
          >
            <Play class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="p-4">
        <h3 class="mb-1 font-medium">{{ video.title }}</h3>
        <p class="text-sm text-gray-500">{{ video.duration }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import { Play } from 'lucide-vue-next';
  
  defineProps({
    video: {
      type: Object,
      required: true,
    },
  });
  
  defineEmits(['play-video']);
  </script>