<template>
    <div>
      <div class="mb-8">
        <h3 class="text-lg font-medium text-[#0F151F] mb-4">Average Review</h3>
        <div class="flex items-center mb-4">
          <div class="text-3xl font-bold text-[#0F151F] mr-4">{{ course.ratings.average }}</div>
          <div class="flex">
            <template v-for="i in 5" :key="i">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="#FFD700" 
                stroke="#FFD700" 
                stroke-width="1" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </template>
          </div>
          <div class="ml-2 text-sm text-gray-500">Rating</div>
        </div>
        
        <div class="space-y-2">
          <div v-for="rating in course.ratings.distribution" :key="rating.stars" class="flex items-center">
            <div class="w-8 text-sm text-gray-500">{{ rating.stars }}</div>
            <div class="flex-1 mx-2 bg-gray-200 rounded-full h-2">
              <div 
                class="bg-[#D50036] h-2 rounded-full" 
                :style="{ width: `${rating.percentage}%` }"
              ></div>
            </div>
            <div class="w-8 text-sm text-gray-500">{{ rating.percentage }}%</div>
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <div v-for="review in course.reviews" :key="review.id" class="pb-6 border-b border-[#E5E5E5]">
          <div class="flex items-center mb-2">
            <img 
              :src="`https://randomuser.me/api/portraits/men/${review.id + 30}.jpg`" 
              alt="Reviewer" 
              class="w-10 h-10 rounded-full mr-3" 
            />
            <div>
              <div class="font-medium text-[#0F151F]">{{ review.name }}</div>
              <div class="flex">
                <template v-for="i in 5" :key="i">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    :fill="i <= review.rating ? '#FFD700' : 'none'" 
                    :stroke="i <= review.rating ? '#FFD700' : '#C4C4C4'" 
                    stroke-width="1" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </template>
              </div>
            </div>
          </div>
          <p class="text-gray-700">{{ review.comment }}</p>
        </div>
      </div>
      
      <div class="mt-6">
        <div class="border border-[#E5E5E5] rounded-lg p-4">
          <textarea 
            v-model="replyText" 
            placeholder="Reply Arinze here..." 
            class="w-full h-24 p-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036] resize-none"
          ></textarea>
          <div class="mt-2 flex justify-end">
            <button 
              @click="submitReply" 
              class="px-6 py-2 bg-[#D50036] text-white rounded-md"
            >
              Submit
            </button>
          </div>
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
  
  const replyText = ref('');
  
  const submitReply = () => {
    if (replyText.value.trim()) {
      // In a real app, you would send this to an API
      console.log('Submitting reply:', replyText.value);
      replyText.value = '';
      // Show success notification
      alert('Reply submitted successfully!');
    }
  };
  </script>