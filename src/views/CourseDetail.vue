<template>
  <div class="p-6 bg-[#F5F5F5] min-h-screen">
    <div class="flex items-center mb-6">
      <router-link to="/courses" class="text-[#D50036] mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </router-link>
      <h1 class="text-2xl font-semibold text-[#0F151F]">Course Review</h1>
      <div class="ml-auto flex gap-4">
        <button @click="cancel()" class="px-4 py-2 border border-[#E5E5E5] bg-white rounded-full text-[#0F151F] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x mr-2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Cancel
        </button>
        <button class="px-4 py-2 bg-[#0F151F] rounded-full text-white flex items-center"
        @click="navigateToAddCourse">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Course
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Section - Video Player and Tabs -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- Video Player -->
        <div class="m-6">
          <!-- Updated container to properly fill width -->
          <div class="w-full aspect-video rounded-lg overflow-hidden ml-6">
            <YoutubePlayer
              :src="testVideo"
              :options="{ 
                controls: true,
                modestbranding: 1,
                rel: 0,
                fs: 1,
                playsinline: 1,
               
              }"
              class="w-full h-full"
              :player-vars="{ 
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                rel: 0,
                fs: 1,
                playsinline: 1,
               
              }"
              :iframe-style="{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }"
            ></YoutubePlayer>
          </div>
        </div>

        <!-- Course Info -->
        <div class="p-6 ml-6">
          <h2 class="text-xl font-semibold text-[#0F151F] mb-4">{{ course.title }}</h2>
          <div class="flex items-center mb-6">
            <img :src="course.instructorImage" alt="Instructor" class="w-10 h-10 rounded-full mr-3" />
            <div>
              <div class="font-medium text-[#0F151F]">{{ course.instructor }}</div>
              <div class="text-sm text-gray-500">{{ course.company }}</div>
            </div>
            <button class="ml-auto flex items-center gap-2 px-4 py-1 border border-[#D50036] rounded-full text-[#D50036] text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="16" y1="11" x2="22" y2="11"></line>
              </svg>
              Follow
            </button>
          </div>

          <!-- Tabs -->
          <div class="border-b border-[#E5E5E5] mb-6">
            <div class="flex space-x-6">
              <button 
                @click="activeTab = 'overview'" 
                :class="{ 'text-[#D50036] border-b-2 border-[#D50036]': activeTab === 'overview', 'text-gray-500': activeTab !== 'overview' }"
                class="pb-2 font-medium"
              >
                Overview
              </button>
              <button 
                @click="activeTab = 'faq'" 
                :class="{ 'text-[#D50036] border-b-2 border-[#D50036]': activeTab === 'faq', 'text-gray-500': activeTab !== 'faq' }"
                class="pb-2 font-medium"
              >
                FAQ
              </button>
              <button 
                @click="activeTab = 'review'" 
                :class="{ 'text-[#D50036] border-b-2 border-[#D50036]': activeTab === 'review', 'text-gray-500': activeTab !== 'review' }"
                class="pb-2 font-medium"
              >
                Review
              </button>
            </div>
          </div>

          <!-- Tab Content -->
          <div>
            <Overview v-if="activeTab === 'overview'" :course="course" />
            <FAQ v-if="activeTab === 'faq'" :course="course" />
            <Review v-if="activeTab === 'review'" :course="course" />
          </div>
        </div>
      </div>

      <!-- Right Section - Course Content -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <CourseContent :course="course" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Overview from '@/components/organisms/Overview.vue';
import FAQ from '@/components/organisms/FAQ.vue';
import Review from '@/components/organisms/Review.vue';
import CourseContent from '@/components/organisms/CourseContent.vue';
import YoutubePlayer from 'vue3-youtube'

const router = useRouter();
const route = useRoute();
const videoPlayer = ref(null);
const activeTab = ref('overview');
const currentTime = ref('00:00');
const duration = ref('00:00');
const testVideo = "https://www.youtube.com/watch?v=aolI_Rz0ZqY"

// YouTube player configuration
const playerVars = {
  autoplay: 0,
  controls: 1,
  modestbranding: 1,
  rel: 0,
  fs: 1,
  playsinline: 1,
  origin: window.location.origin
};

const navigateToAddCourse = () => {
  router.push('/courses/add');
};

const cancel = () => {
  router.push('/courses');
}

const course = ref({
  id: 1,
  title: 'Introduction to UI/UX: Understanding the concept of Design',
  instructor: 'Favour John',
  instructorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  company: 'Microsoft',
  videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  description: `Are you eager to dive into the world of digital design but unsure where to begin? "Introduction to UI/UX Design" is the perfect starting point! Written with both beginners and aspiring designers in mind, this book offers a clear, engaging, and practical guide to the essentials of User Interface (UI) and User Experience (UX) design.`,
  lectures: 12,
  totalHours: 240,
  modules: [
    {
      id: 1,
      title: 'Module 1| Intro',
      expanded: true,
      videos: [
        { id: 1, title: '1 video | 20 mins' }
      ]
    },
    {
      id: 3,
      title: 'Module 3| Intro',
      expanded: true,
      videos: [
        { id: 2, title: '1 video | 20 mins' },
        { 
          id: 3, 
          title: 'Beginner Understanding',
          subVideos: [
            { id: 4, title: '1 video | 20 mins' }
          ]
        },
        { 
          id: 5, 
          title: 'Beginner Understanding',
          subVideos: [
            { id: 6, title: '1 video | 20 mins' }
          ]
        },
        { 
          id: 7, 
          title: 'UI/UX Overview',
          subVideos: [
            { id: 8, title: '1 video | 20 mins' }
          ]
        }
      ]
    },
    {
      id: 9,
      title: '2. Understanding Colors',
      expanded: false,
      videos: [
        { id: 10, title: '1 video | 20 mins' }
      ]
    },
    {
      id: 11,
      title: '3. Grid System',
      expanded: false,
      videos: [
        { id: 12, title: '1 video | 20 mins' }
      ]
    },
    {
      id: 13,
      title: '4. Quiz and Exam',
      expanded: false,
      videos: [
        { id: 14, title: '10 mins' }
      ]
    }
  ],
  faqs: [
    {
      id: 1,
      question: 'Do I need any prior design experience?',
      answer: 'No prior experience is required! This book starts with the basics and gradually builds your understanding of UI/UX design, making it easy to follow even if you\'re completely new to the subject.',
      expanded: true
    },
    {
      id: 2,
      question: 'Can this book help me start a career in UI/UX design?',
      answer: 'This book provides the tools and insights you need to kickstart your career in UI/UX design.',
      expanded: false
    },
    {
      id: 3,
      question: 'How long will it take to finish the book?',
      answer: 'The book is designed to be completed at your own pace. Most readers finish it in 2-4 weeks, spending a few hours each week.',
      expanded: false
    },
    {
      id: 4,
      question: 'Are there any hands-on exercises?',
      answer: 'Yes, the book includes practical exercises and case studies to help you apply what you\'ve learned.',
      expanded: false
    }
  ],
  reviews: [
    {
      id: 1,
      name: 'Arinze Shola',
      rating: 3,
      comment: 'It is well detailed and comes with practicals'
    }
  ],
  ratings: {
    average: 4.7,
    distribution: [
      { stars: 5, percentage: 80 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 }
    ]
  }
});

// Format time for video player
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Update video time
const updateTime = () => {
  if (videoPlayer.value) {
    currentTime.value = formatTime(videoPlayer.value.currentTime);
    duration.value = formatTime(videoPlayer.value.duration || 0);
  }
};

onMounted(() => {
  // Get course ID from route params
  const courseId = parseInt(route.params.id);
  
  // In a real app, you would fetch the course data based on the ID
  // For now, we're using the hardcoded data
  
  // Set up video player event listeners
  if (videoPlayer.value) {
    videoPlayer.value.addEventListener('timeupdate', updateTime);
    videoPlayer.value.addEventListener('loadedmetadata', updateTime);
  }
});
</script>

