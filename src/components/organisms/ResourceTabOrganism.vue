<template>
    <div class="resources-tab">
      <div class="flex items-center justify-between mb-6">
        <SearchBarMolecule :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />
        <div class="flex items-center">
          <ButtonAtom variant="secondary" class="mr-4" @click="exportResources">
            <Download class="w-4 h-4 mr-2" />
            Export
          </ButtonAtom>
          <ButtonAtom variant="primary" @click="$emit('show-add-resource-modal')">
            <Plus class="w-4 h-4 mr-2" />
            Add Resources
          </ButtonAtom>
        </div>
      </div>
  
      <!-- Date filter -->
      <div class="flex justify-end mb-4">
        <DateFilterMolecule :date-filter="dateFilter" />
      </div>
  
      <!-- Resources Table -->
      <ResourceTableOrganism :filtered-resources="filteredResources" />
  
      <!-- Pagination -->
      <div class="flex items-center justify-between mt-6">
        <div class="text-sm text-gray-500">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, filteredResources.length) }} of
          {{ filteredResources.length }} results
        </div>
        <PaginationMolecule
          :current-page="currentPage"
          :total-pages="totalPages"
          :visible-pages="visiblePages"
          @prev-page="$emit('prev-page')"
          @next-page="$emit('next-page')"
          @go-to-page="$emit('go-to-page', $event)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import SearchBarMolecule from '../molecules/SearcBarMolecule.vue';
  import ButtonAtom from '../atoms/ButtonAtom.vue';
  import DateFilterMolecule from '../molecules/DataFilterMolecule.vue';
  import ResourceTableOrganism from './ResourceTableOrganism.vue';
  import PaginationMolecule from '../molecules/PaginationMolecule.vue';
  import { Download, Plus } from 'lucide-vue-next';
  
  defineProps({
    searchQuery: String,
    dateFilter: String,
    filteredResources: Array,
    currentPage: Number,
    totalPages: Number,
    visiblePages: Array,
    itemsPerPage: Number,
  });
  
  const emit = defineEmits([
    'show-add-resource-modal',
    'export-resources',
    'prev-page',
    'next-page',
    'go-to-page',
  ]);
  
  const exportResources = () => {
    emit('export-resources');
  };
  </script>