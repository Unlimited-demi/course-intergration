<template>
    <div class="course-detail-container p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-medium">Course Review</h1>
        <div class="flex space-x-4">
          <button 
            @click="navigateBack" 
            class="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <XIcon class="h-4 w-4 mr-1" />
            Cancel
          </button>
          <button 
            @click="navigateToAddCourse" 
            class="flex items-center px-4 py-2 bg-primary-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <PlusIcon class="h-4 w-4 mr-1" />
            Add Course
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left column - Video player and tabs -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <!-- Video player -->
            <div class="relative aspect-video bg-black">
              <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
              <div v-else class="video-player-container relative">
                <video 
                  ref="videoPlayer"
                  class="w-full h-full"
                  poster=""
                  controls
                >
                  <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                
                <div class="absolute bottom-4 left-4 flex items-center text-white text-sm">
                  <span>{{ currentTime }}</span>
                </div>
                
                <div class="absolute bottom-4 right-4 flex items-center text-white text-sm">
                  <span>{{ duration }}</span>
                </div>
              </div>
            </div>
            
            <!-- Course title and instructor -->
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-medium">{{ course.title }}</h2>
              <div class="flex items-center mt-2">
                <img :src="course.instructorAvatar" alt="Instructor avatar" class="h-8 w-8 rounded-full mr-2" />
                <span class="text-sm font-medium">{{ course.instructor }}</span>
                <span class="mx-2 text-gray-400">|</span>
                <span class="text-sm text-gray-500">{{ course.company }}</span>
                
                <button class="ml-auto flex items-center text-primary text-sm font-medium">
                  <UserPlusIcon class="h-4 w-4 mr-1" />
                  Follow
                </button>
              </div>
            </div>
            
            <!-- Tabs -->
            <div class="border-b border-gray-200">
              <nav class="flex">
                <button 
                  @click="activeTab = 'overview'"
                  class="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
                  :class="activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'"
                >
                  Overview
                </button>
                <button 
                  @click="activeTab = 'faq'"
                  class="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
                  :class="activeTab === 'faq' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'"
                >
                  FAQ
                </button>
                <button 
                  @click="activeTab = 'review'"
                  class="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
                  :class="activeTab === 'review' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'"
                >
                  Review
                </button>
              </nav>
            </div>
            
            <!-- Tab content -->
            <div class="p-4">
              <Overview v-if="activeTab === 'overview'" :courseId="courseId" />
              <FAQ v-if="activeTab === 'faq'" :courseId="courseId" />
              <Review v-if="activeTab === 'review'" :courseId="courseId" />
            </div>
          </div>
        </div>
        
        <!-- Right column - Course content -->
        <div class="lg:col-span-1">
          <CourseContent :courseId="courseId" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { XIcon, PlusIcon, UserPlusIcon } from 'lucide-vue-next';
  import Overview from '../components/organisms/Overview.vue';
  import FAQ from '../components/organisms/Faq.vue';
  import Review from '../components/organisms/Review.vue';
  import CourseContent from '../components/organisms/CourseContent.vue';
  
  // Router
  const router = useRouter();
  const route = useRoute();
  
  // Props
  const courseId = computed(() => route.params.id || '1');
  
  // State variables
  const loading = ref(true);
  const activeTab = ref('overview');
  const videoPlayer = ref(null);
  const currentTime = ref('00:00');
  const duration = ref('00:00');
  const course = ref({
    title: 'Introduction to UI/UX: Understanding the concept of Design',
    instructor: 'Favour John',
    company: 'Microsoft',
    instructorAvatar: '/placeholder.svg?height=32&width=32'
  });
  
  // Methods
  const navigateBack = () => {
    router.push('/courses');
  };
  
  const navigateToAddCourse = () => {
    router.push('/courses/add');
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const updateVideoTime = () => {
    if (videoPlayer.value) {
      currentTime.value = formatTime(videoPlayer.value.currentTime);
      duration.value = formatTime(videoPlayer.value.duration);
    }
  };
  
  // Fetch course data
  const fetchCourseData = async () => {
    try {
      loading.value = true;
      // In a real application, you would fetch this data from an API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Course data would be fetched here
      
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Lifecycle hooks
  onMounted(() => {
    fetchCourseData();
    
    if (videoPlayer.value) {
      videoPlayer.value.addEventListener('timeupdate', updateVideoTime);
      videoPlayer.value.addEventListener('loadedmetadata', updateVideoTime);
    }
  });
  
  watch(videoPlayer, (newVal) => {
    if (newVal) {
      newVal.addEventListener('timeupdate', updateVideoTime);
      newVal.addEventListener('loadedmetadata', updateVideoTime);
    }
  });
  </script>