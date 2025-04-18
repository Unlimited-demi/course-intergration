<template>
    <button :class="buttonClasses" @click="$emit('click')">
      <slot />
    </button>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary', // primary, secondary, text
    },
    size: {
      type: String,
      default: 'medium', // small, medium, large
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  
  defineEmits(['click']);
  
  const buttonClasses = computed(() => {
    let classes = ['font-medium rounded-md'];
  
    // Size classes
    if (props.size === 'small') {
      classes.push('px-3 py-1 text-sm');
    } else if (props.size === 'large') {
      classes.push('px-6 py-3 text-lg');
    } else { // medium
      classes.push('px-4 py-2 text-sm');
    }
  
    // Variant classes
    if (props.variant === 'primary') {
      classes.push('text-white bg-[#D50036] hover:bg-[#C00030]');
    } else if (props.variant === 'secondary') {
      classes.push('text-[#D50036] bg-white border border-[#D50036] hover:bg-gray-50');
    } else if (props.variant === 'text') {
      classes.push('text-gray-500 hover:text-gray-700');
    }
  
    if (props.disabled) {
      classes.push('opacity-50 cursor-not-allowed');
    }
  
    return classes.join(' ');
  });
  </script>