<template>
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036]"
      @input="$emit('update:modelValue', inputValue)"
    >
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const inputValue = ref(props.modelValue);
  
  watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
  });
  </script>