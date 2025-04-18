<template>
    <div class="bg-white">
      <h3 class="text-lg font-semibold text-[#0F151F] mb-2">Course Content</h3>
      <p class="text-sm text-gray-500 mb-4">Lecture ({{ course.lectures }}), Total ({{ course.totalHours }} hours).</p>
      
      <div class="divide-y divide-gray-100">
        <div v-for="module in course.modules" :key="module.id" class="py-3">
          <!-- Module Header -->
          <div 
            @click="toggleModule(module.id)"
            class="flex items-center justify-between cursor-pointer"
          >
            <span class="text-[#0F151F] font-medium">{{ module.title }}</span>
            <button 
              class="w-5 h-5 rounded-full flex items-center justify-center"
              :class="{ 'bg-pink-50': module.expanded }"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                :stroke="module.expanded ? '#D50036' : '#9CA3AF'"
                stroke-width="2"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="transition-transform duration-200"
                :class="{ 'rotate-180': module.expanded }"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
  
          <!-- Module Content -->
          <div v-if="module.expanded" class="mt-3 space-y-3">
            <!-- Main Video -->
            <div 
              v-for="video in module.videos" 
              :key="video.id" 
              @click="selectVideo(video.id)" 
              :class="['cursor-pointer transition-colors duration-200', selectedVideo === video.id ? 'bg-blue-50' : '']"
            >
              <div class="flex items-center">
                <div class="w-5 h-5 rounded-full bg-[#D50036] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span class="ml-3 text-sm text-[#0F151F]">{{ video.title }}</span>
              </div>
  
              <!-- Sub Videos -->
              <div v-if="video.subVideos" class="ml-2.5 mt-3 relative">
                <!-- Vertical Timeline -->
                <div class="absolute left-[9px] top-0 bottom-0 w-[1px] bg-gray-200"></div>
  
                <div v-for="(subVideo, index) in video.subVideos" :key="subVideo.id" class="relative">
                  <!-- Main Sub Video Title -->
                  <div class="flex items-center mb-2 relative">
                    <!-- Horizontal Line -->
                    <div class="absolute left-0 top-1/2 w-2 h-[1px] bg-gray-200"></div>
                    
                    <div class="w-5 h-5 rounded-full border border-gray-200 bg-white flex items-center justify-center">
                      <div class="w-1.5 h-1.5 rounded-full bg-[#D50036]"></div>
                    </div>
                    <span class="ml-3 text-sm text-[#0F151F]">{{ subVideo.title }}</span>
                  </div>
  
                  <!-- Sub Video Duration -->
                  <div class="ml-8 mb-3 flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#D50036]"></div>
                    <span class="ml-2 text-xs text-gray-500">{{ subVideo.duration }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="mt-6 flex justify-center">
        <button class="px-6 py-2 border border-[#D50036] rounded-full text-[#D50036] text-sm">
          Load more courses
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedVideo = ref(null);
  const selectVideo = (videoId) => {
    selectedVideo.value = videoId;
  };
  
  const props = defineProps({
    course: {
      type: Object,
      required: true,
      default: () => ({
        lectures: 12,
        totalHours: 240,
        modules: [
          {
            id: 1,
            title: 'Module 1| Intro',
            expanded: true,
            videos: [
              { 
                id: 1, 
                title: '1 video | 20 mins'
              }
            ]
          },
          {
            id: 3,
            title: 'Module 3| Intro',
            expanded: true,
            videos: [
              { 
                id: 2, 
                title: '1 video | 20 mins',
                subVideos: [
                  {
                    id: 3,
                    title: 'Beginner Understanding',
                    duration: '1 video | 20 mins'
                  },
                  {
                    id: 4,
                    title: 'Beginner Understanding',
                    duration: '1 video | 20 mins'
                  },
                  {
                    id: 5,
                    title: 'UI/UX Overview',
                    duration: '1 video | 20 mins'
                  }
                ]
              }
            ]
          },
          {
            id: 9,
            title: '2. Understanding Colors',
            expanded: false,
            videos: [
              { 
                id: 6, 
                title: '1 video | 20 mins'
              }
            ]
          },
          {
            id: 11,
            title: '3. Grid System',
            expanded: false,
            videos: [
              { 
                id: 7, 
                title: '1 video | 20 mins'
              }
            ]
          },
          {
            id: 13,
            title: '4. Quiz and Exam',
            expanded: false,
            videos: [
              { 
                id: 8, 
                title: '10 mins'
              }
            ]
          }
        ]
      })
    }
  });
  
  const toggleModule = (moduleId) => {
    const moduleIndex = props.course.modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      props.course.modules[moduleIndex].expanded = !props.course.modules[moduleIndex].expanded;
    }
  };
  </script>