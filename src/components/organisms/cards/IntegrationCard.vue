<template>
    <div class="border border-[#E5E5E5] rounded-lg overflow-hidden h-full">
      <div class="p-6 flex flex-col h-full">
        <!-- Icon -->
        <div 
          class="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
          :style="{ backgroundColor: integration.iconBg }"
        >
          <!-- For letter icons -->
          <span v-if="integration.icon.length === 1" class="text-white font-bold">
            {{ integration.icon }}
          </span>
          
          <!-- For SVG icons -->
          <template v-else>
            <svg v-if="integration.icon === 'api'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            
            <svg v-else-if="integration.icon === 'mailchimp'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm2 9h-4v-1h4v1zm0-3H8V9h6v3z" />
            </svg>
            
            <svg v-else-if="integration.icon === 'excel'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" />
              <path d="M7 7h4v4H7zm0 6h4v4H7zm6-6h4v4h-4zm0 6h4v4h-4z" />
            </svg>
            
            <svg v-else-if="integration.icon === 'salesforce'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </template>
        </div>
        
        <!-- Name and Description -->
        <h3 class="text-lg font-semibold mb-1">{{ integration.name }}</h3>
        <p class="text-sm text-[#4B5054] mb-4 flex-grow">
          {{ integration.description }}
        </p>
        
        <!-- Action Buttons -->
        <div class="flex items-center space-x-4 mt-auto">
          <button 
            @click="$emit('toggle-connection', integration.id)"
            :class="[
              'flex items-center px-3 py-1.5 rounded-full text-sm transition-colors hover:bg-gray-300',
              integration.connected 
                ? 'bg-[#D50036] text-white' 
                : 'border border-[#E5E5E5] text-[#4B5054]'
            ]"
          >
            {{ integration.connected ? 'Connected' : 'Connect' }}
            <svg 
              v-if="integration.connected"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg 
              v-else
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
            </svg>
          </button>
          <button 
            @click="$emit('configure-integration', integration.id)"
            class="flex items-center px-3 py-1.5 rounded-full text-sm text-[#4B5054] transition-colors hover:bg-[#F0F0F0]"
            title="Configure integration details"
          >
            Configure
          </button>
          <button 
            @click="$emit('show-details', integration.id)"
            class="flex items-center text-sm text-[#4B5054] transition-colors hover:text-[#D50036]"
          >
            Integration details
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
  
  defineEmits(['toggle-connection', 'configure-integration', 'show-details']);
  </script>