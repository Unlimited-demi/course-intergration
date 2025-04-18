<template>
    <div class="resources-onboarding-container">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-medium">Resources & Onboarding</h1>
      </div>
  
      <!-- Tab Navigation -->
      <TabNavigationMolecule
        :tabs="tabs"
        :active-tab="activeTab"
        @update:activeTab="activeTab = $event"
      />
  
      <!-- Resources Tab Content -->
      <ResourcesTabOrganism
        v-if="activeTab === 'resources'"
        :search-query="searchQuery"
        :date-filter="dateFilter"
        :filtered-resources="filteredResources"
        :current-page="currentPage"
        :total-pages="totalPages"
        :visible-pages="visiblePages"
        :items-per-page="itemsPerPage"
        @show-add-resource-modal="showAddResourceModal = true"
        @export-resources="exportResources"
        @prev-page="prevPage"
        @next-page="nextPage"
        @go-to-page="currentPage = $event"
      />
  
      <!-- Onboarding Tab Content -->
      <OnboardingTabOrganism
        v-if="activeTab === 'onboarding'"
        :current-video="currentVideo"
        :is-playing="isPlaying"
        :is-muted="isMuted"
        :current-time="currentTime"
        :duration="duration"
        :video-progress="videoProgress"
        :video-cards="videoCards"
        @toggle-play="togglePlay"
        @toggle-mute="toggleMute"
        @book-demo="bookDemo"
        @play-video="playVideo"
      />
  
      <!-- Add Resource Modal -->
      <AddResourceModal
        v-if="showAddResourceModal"
        :new-resource="newResource"
        :dragover="dragover"
        @close-modal="showAddResourceModal = false"
        @submit-resource="addResource"
        @file-change="onFileChange"
        @file-drop="onFileDrop"
        @clear-file="newResource.file = null"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import {
    FileText,
    Play,
  } from 'lucide-vue-next';
  import TabNavigationMolecule from '../components/molecules/TabNavigationMolecule.vue';
  import ResourcesTabOrganism from '../components/organisms/ResourceTabOrganism.vue';
  import OnboardingTabOrganism from '../components/organisms/OnboardingTabOrganism.vue';
  import AddResourceModal from '../components/organisms/modals/AddResourceModal.vue';
  
  // Atoms and Molecules are imported within Organisms and Modals
  
  // Active tab
  const activeTab = ref('resources');
  
  const tabs = ref([
    { name: 'resources', label: 'Resources', icon: FileText },
    { name: 'onboarding', label: 'Onboarding', icon: Play },
  ]);
  
  // Resources data (moved from original component)
  const resources = ref([ /* ... your resources data ... */
    {
      id: 1,
      name: 'Design Principle',
      fileType: 'PDF/PPTX',
      type: 'design',
      instructor: {
        name: 'Femur John',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 14,
      rating: 4.7
    },
    {
      id: 2,
      name: 'Web Development',
      fileType: 'PDF/PPTX',
      type: 'web',
      instructor: {
        name: 'Uche Oginma',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 10,
      rating: 4.7
    },
    {
      id: 3,
      name: 'Cybersecurity',
      fileType: 'PDF/PPTX',
      type: 'cyber',
      instructor: {
        name: 'Femur John',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 7,
      rating: 4.8
    },
    {
      id: 4,
      name: 'Design Principle',
      fileType: 'PDF/PPTX',
      type: 'design',
      instructor: {
        name: 'Ayomide Nissan',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 25,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Ethical Hacking',
      fileType: 'PDF/PPTX',
      type: 'cyber',
      instructor: {
        name: 'Femur John',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 15,
      rating: 4.5
    },
    {
      id: 6,
      name: 'Cybersecurity',
      fileType: 'PDF/PPTX',
      type: 'cyber',
      instructor: {
        name: 'Samuel Okpara',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 20,
      rating: 4.7
    },
    {
      id: 7,
      name: 'Design Principle',
      fileType: 'PDF/PPTX',
      type: 'design',
      instructor: {
        name: 'Femur John',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 30,
      rating: 4.7
    },
    {
      id: 8,
      name: 'Web Development',
      fileType: 'PDF/PPTX',
      type: 'web',
      instructor: {
        name: 'Naheem Kazim',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 12,
      rating: 4.7
    },
    {
      id: 9,
      name: 'Data Analytics 1.0',
      fileType: 'PDF/PPTX',
      type: 'data',
      instructor: {
        name: 'Uche Oginma',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 18,
      rating: 5.0
    },
    {
      id: 10,
      name: 'Cybersecurity',
      fileType: 'PDF/PPTX',
      type: 'cyber',
      instructor: {
        name: 'Femur John',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      date: 'Jul 01 2023/14:22',
      downloads: 23,
      rating: 4.5
    }
  ]);
  
  // Search and filtering
  const searchQuery = ref('');
  const dateFilter = ref('Oct 01 - Oct 10');
  
  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  
  // Computed properties for resources
  const filteredResources = computed(() => {
    let filtered = [...resources.value];
  
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        resource =>
          resource.name.toLowerCase().includes(query) ||
          resource.type.toLowerCase().includes(query)
      );
    }
  
    return filtered;
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredResources.value.length / itemsPerPage.value);
  });
  
  const visiblePages = computed(() => {
    const pages = [];
    const maxVisiblePages = 5;
  
    if (totalPages.value <= maxVisiblePages) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
  
      if (endPage > totalPages.value) {
        endPage = totalPages.value;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
  
    return pages;
  });
  
  // Pagination navigation
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  
  // Add Resource Modal
  const showAddResourceModal = ref(false);
  const newResource = ref({
    name: '',
    description: '',
    category: '',
    file: null,
    instructor: ''
  });
  const dragover = ref(false);
  const fileInput = ref(null);
  
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      newResource.value.file = file;
    }
  };
  
  const onFileDrop = (event) => {
    dragover.value = false;
    const file = event.dataTransfer.files[0];
    if (file) {
      newResource.value.file = file;
    }
  };
  
  const addResource = () => {
    // Here you would typically send the data to your backend
    console.log('Adding resource:', newResource.value);
  
    // Add the resource to the list (for demo purposes)
    const newId = resources.value.length + 1;
    resources.value.push({
      id: newId,
      name: newResource.value.name,
      fileType: newResource.value.file ? newResource.value.file.name.split('.').pop().toUpperCase() : 'PDF',
      type: newResource.value.category,
      instructor: {
        name: 'Femur John', // In a real app, you'd get this from the selected instructor
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + '/' +
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      downloads: 0,
      rating: 0
    });
  
    // Reset form and close modal
    newResource.value = {
      name: '',
      description: '',
      category: '',
      file: null,
      instructor: ''
    };
    showAddResourceModal.value = false;
  };
  
  const exportResources = () => {
    console.log('Exporting resources');
    // Implementation for exporting resources
  };
  
  // Video player functionality (moved to OnboardingTabOrganism and VideoPlayerOrganism)
  const isPlaying = ref(false);
  const isMuted = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const videoProgress = ref(0);
  
  const currentVideo = ref({
    src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Welcome to XYZ LMS'
  });
  
  const videoCards = ref([ /* ... your video cards data ... */
    {
      title: 'Getting Started with the Platform',
      duration: '3 mins 45 sec',
      thumbnail: 'https://picsum.photos/seed/video1/400/225'
    },
    {
      title: 'How to Create Your First Course',
      duration: '5 mins 12 sec',
      thumbnail: 'https://picsum.photos/seed/video2/400/225'
    },
    {
      title: 'Managing Students and Resources',
      duration: '4 mins 30 sec',
      thumbnail: 'https://picsum.photos/seed/video3/400/225'
    },
    {
      title: 'Advanced Platform Features',
      duration: '6 mins 15 sec',
      thumbnail: 'https://picsum.photos/seed/video4/400/225'
    },
    {
      title: 'Reporting and Analytics',
      duration: '3 mins 50 sec',
      thumbnail: 'https://picsum.photos/seed/video5/400/225'
    },
    {
      title: 'Customizing Your Dashboard',
      duration: '2 mins 40 sec',
      thumbnail: 'https://picsum.photos/seed/video6/400/225'
    }
  ]);
  
  const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
  };
  
  const toggleMute = () => {
    isMuted.value = !isMuted.value;
  };
  
  
  const playVideo = (video) => {
    currentVideo.value = {
      ...video,
      src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' // In a real app, this would be the actual video source
    };
    isPlaying.value = true;
  };
  
  const bookDemo = () => {
    console.log('Booking a demo');
    // Implementation for booking a demo
  };
  
  // No need for onMounted and watch for video events here, they are in VideoPlayerOrganism
  </script>
  
  <style scoped>
  .resources-onboarding-container {
    background-color: #FFFFFF;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  </style>