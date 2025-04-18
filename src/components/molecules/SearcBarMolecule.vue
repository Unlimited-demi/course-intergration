<template>
    <div class="relative w-64">
      <InputAtom
        v-model="searchQueryLocal"
        type="text"
        placeholder="Search..."
        class="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 rounded-md focus:outline-none"
        @update:modelValue="$emit('update:searchQuery', searchQueryLocal)"
      />
      <Search class="absolute w-4 h-4 text-gray-400 left-3 top-2.5" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { Search } from 'lucide-vue-next';
  import InputAtom from '../atoms/InputAtom.vue';
  
  const props = defineProps({
    searchQuery: String,
  });
  const emit = defineEmits(['update:searchQuery']);
  
  const searchQueryLocal = ref(props.searchQuery);
  
  watch(() => props.searchQuery, (newValue) => {
    searchQueryLocal.value = newValue;
  });
  </script>