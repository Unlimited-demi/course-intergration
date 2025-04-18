<template>
    <div class="flex border-b mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="$emit('update:activeTab', tab.name)"
        :class="[
          'px-6 py-3 font-medium text-sm flex items-center',
          activeTab === tab.name
            ? 'text-[#D50036] border-b-2 border-[#D50036]'
            : 'text-gray-500'
        ]"
      >
        <component :is="tab.icon" class="w-4 h-4 mr-2" />
        {{ tab.label }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineProps({
    tabs: {
      type: Array,
      required: true,
      // Example: [{ name: 'resources', label: 'Resources', icon: 'FileText' }]
    },
    activeTab: {
      type: String,
      required: true,
    },
  });
  
  defineEmits(['update:activeTab']);
  </script>