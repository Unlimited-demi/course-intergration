<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Configure {{ integration.name }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <!-- Basic form fields for configuration -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
        <input type="text" placeholder="Enter API Key" class="w-full border border-gray-300 rounded p-2 mb-4"/>
        <!-- ...additional configuration fields as needed... -->
      </div>
      <div class="flex justify-end">
        <button @click="$emit('close')" class="px-4 py-2 bg-[#D50036] text-white rounded hover:bg-[#b5002b]">Save</button>
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
