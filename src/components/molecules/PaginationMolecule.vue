<template>
    <div class="flex">
      <ButtonAtom
        variant="text"
        :disabled="currentPage === 1"
        @click="$emit('prev-page')"
        :class="currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'"
        class="flex items-center justify-center w-8 h-8 mr-2 rounded-md"
      >
        <ChevronLeft class="w-4 h-4" />
      </ButtonAtom>
      <ButtonAtom
        v-for="page in visiblePages"
        :key="page"
        variant="text"
        @click="$emit('go-to-page', page)"
        :class="currentPage === page ? 'text-white bg-[#D50036]' : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'"
        class="flex items-center justify-center w-8 h-8 mx-1 text-sm rounded-md"
      >
        {{ page }}
      </ButtonAtom>
      <ButtonAtom
        variant="text"
        :disabled="currentPage === totalPages"
        @click="$emit('next-page')"
        :class="currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'"
        class="flex items-center justify-center w-8 h-8 ml-2 rounded-md"
      >
        <ChevronRight class="w-4 h-4" />
      </ButtonAtom>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
  import ButtonAtom from '../atoms/ButtonAtom.vue';
  
  defineProps({
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    visiblePages: {
      type: Array,
      required: true,
    },
  });
  
  defineEmits(['prev-page', 'next-page', 'go-to-page']);
  </script>