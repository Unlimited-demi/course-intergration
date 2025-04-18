<template>
    <div class="space-y-4">
      <div 
        v-for="faq in course.faqs" 
        :key="faq.id" 
        class="border border-[#E5E5E5] rounded-lg overflow-hidden"
      >
        <div 
          @click="toggleFAQ(faq.id)"
          class="flex items-center justify-between p-4 cursor-pointer"
        >
          <h4 class="font-medium text-[#0F151F]">{{ faq.question }}</h4>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="lucide lucide-chevron-down transition-transform duration-200"
            :class="{ 'transform rotate-180': faq.expanded }"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        
        <div v-if="faq.expanded" class="p-4 pt-0 border-t border-[#E5E5E5]">
          <p class="text-gray-700">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    course: {
      type: Object,
      required: true
    }
  });
  
  const toggleFAQ = (faqId) => {
    const faqIndex = props.course.faqs.findIndex(f => f.id === faqId);
    if (faqIndex !== -1) {
      props.course.faqs[faqIndex].expanded = !props.course.faqs[faqIndex].expanded;
    }
  };
  </script>