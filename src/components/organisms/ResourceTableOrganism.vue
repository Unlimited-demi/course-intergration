<template>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th class="px-4 py-3 text-sm font-medium">Name</th>
            <th class="px-4 py-3 text-sm font-medium">Instructor</th>
            <th class="px-4 py-3 text-sm font-medium">Downloads</th>
            <th class="px-4 py-3 text-sm font-medium">Rating</th>
            <th class="px-4 py-3 text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          <ResourceTableRowMolecule
            v-for="resource in filteredResources"
            :key="resource.id"
            :resource="resource"
          />
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import ResourceTableRowMolecule from '../molecules/ResourcesTableRowMolecule.vue';
  
  defineProps({
    filteredResources: {
      type: Array,
      required: true,
    },
  });
  </script>