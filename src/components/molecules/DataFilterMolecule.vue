<template>
    <div class="flex items-center">
      <span class="mr-2 text-sm text-gray-500">All</span>
      <ChevronDown class="w-4 h-4 text-gray-500" />
    </div>
    <div class="flex items-center ml-4">
      <span class="mr-2 text-sm text-gray-500">{{ dateFilter }}</span>
      <ChevronDown class="w-4 h-4 text-gray-500" />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { ChevronDown } from 'lucide-vue-next';
  
  defineProps({
    dateFilter: {
      type: String,
      default: 'Oct 01 - Oct 10',
    },
  });
  </script>