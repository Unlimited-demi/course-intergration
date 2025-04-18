<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ integration.name }} Details</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <!-- Basic integration details -->
      <div class="mb-4">
        <p class="text-sm text-gray-700">{{ integration.description }}</p>
        <!-- Possible additional details -->
      </div>
      <div class="flex justify-end">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Close</button>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  integration: {
    type: Object,
    required: true
  }
});
</script>
