<template>
    <div class="p-6 bg-[#F5F5F5] min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-[#0F151F]">Courses</h1>
        <div class="flex gap-4">
          <button class="flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] rounded-full bg-white text-[#D50036]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
          <router-link to="/courses/add" class="flex items-center gap-2 px-4 py-2 bg-[#0F151F] text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Course
          </router-link>
        </div>
      </div>
  
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-6">
          <div class="relative w-80">
            <input
              type="text"
              placeholder="Search..."
              v-model="searchQuery"
              class="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036]"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">All</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down text-gray-500">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <div class="flex items-center ml-4 gap-2">
              <span class="text-sm text-gray-500">{{ dateRange }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar text-gray-500">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
        </div>
  
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#E5E5E5]">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Course Name</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Instructor</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Sale</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Lecture</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Time</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#E5E5E5]">
              <tr v-for="course in paginatedCourses" :key="course.id" class="hover:bg-gray-50 cursor-pointer" @click="viewCourse(course.id)">
                <td class="px-4 py-4">
                  <div class="flex items-center">
                    <img :src="course.image" alt="Course" class="w-10 h-10 rounded mr-3" />
                    <div>
                      <div class="font-medium text-[#0F151F]">{{ course.title }}</div>
                      <div class="text-xs text-gray-500">{{ course.code }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4">
                  <div class="flex items-center">
                    <img :src="course.instructorImage" alt="Instructor" class="w-8 h-8 rounded-full mr-2" />
                    <div>
                      <div class="font-medium text-[#0F151F]">{{ course.instructor }}</div>
                      <div class="text-xs text-gray-500">{{ course.instructorId }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-[#0F151F]">₦{{ course.salePrice.toLocaleString() }}</td>
                <td class="px-4 py-4 text-[#0F151F]">₦{{ course.price.toLocaleString() }}</td>
                <td class="px-4 py-4 text-[#0F151F]">{{ course.lectures }}</td>
                <td class="px-4 py-4 text-[#0F151F]">{{ course.totalTime }} hours</td>
                <td class="px-4 py-4">
                  <span 
                    :class="{
                      'px-2 py-1 text-xs font-medium rounded-full': true,
                      'bg-green-100 text-[#00B454]': course.status === 'Published' || course.status === 'Active',
                      'bg-red-100 text-[#E50303]': course.status === 'Failed',
                      'bg-yellow-100 text-[#F39D1C]': course.status === 'Loading'
                    }"
                  >
                    {{ course.status }}
                  </span>
                </td>
                <td class="px-4 py-4 relative" @click.stop>
                  <button @click="toggleDropdown(course.id, $event)" class="text-gray-500 hover:text-[#D50036]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-vertical">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                  <div v-if="activeDropdown === course.id" class="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-10" @click.stop>
                    <button @click="viewCourse(course.id)" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      View
                    </button>
                    <!-- more options can be added here -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="flex items-center justify-between mt-6">
          <div class="text-sm text-gray-500">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
            {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }} of {{ filteredCourses.length }} results
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="currentPage = Math.max(currentPage - 1, 1)"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E5E5] text-gray-500"
              :disabled="currentPage === 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <template v-for="page in totalPages" :key="page">
              <button 
                @click="currentPage = page"
                :class="page === currentPage ? 'bg-[#D50036] text-white' : 'border border-[#E5E5E5] text-gray-500'"
                class="w-8 h-8 flex items-center justify-center rounded-md"
              >
                {{ page }}
              </button>
            </template>
            <button 
              @click="currentPage = Math.min(currentPage + 1, totalPages)"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E5E5] text-gray-500"
              :disabled="currentPage === totalPages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import CoursesList from "../components/organisms/CoursesList.vue";
  
  const router = useRouter();
  const searchQuery = ref('');
  const dateRange = ref('Oct 01 - Oct 10');
  const courses = ref([]);
  const itemsPerPage = 10;
  const currentPage = ref(1);
  const activeDropdown = ref(null); // New reactive to track dropdown
  
  // Generate exactly 20 hard-coded courses
  const generateCourses = () => {
    const statuses = ['Published', 'Active', 'Failed', 'Loading'];
    const courseNames = [
      'Design Principle', 
      'Web Development', 
      'Cybersecurity', 
      'Ethical Hacking', 
      'Data Analytics 1.0'
    ];
    const instructors = [
      { name: 'Favour John', id: '#10873442', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { name: 'Uche Ogbonna', id: '#10873443', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'Ayomide Nissan', id: '#10873444', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
      { name: 'Samuel Okpara', id: '#10873445', image: 'https://randomuser.me/api/portraits/men/46.jpg' },
      { name: 'Naheem Kazim', id: '#10873446', image: 'https://randomuser.me/api/portraits/men/47.jpg' }
    ];
    
    const courseImages = [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/45.jpg',
      'https://randomuser.me/api/portraits/men/46.jpg',
      'https://randomuser.me/api/portraits/men/47.jpg'
    ];
    
    const generatedCourses = [];
    
    for (let i = 1; i <= 20; i++) {
      const courseIndex = Math.floor(Math.random() * courseNames.length);
      const instructorIndex = Math.floor(Math.random() * instructors.length);
      const statusIndex = Math.floor(Math.random() * statuses.length);
      const imageIndex = Math.floor(Math.random() * courseImages.length);
      
      const salePrice = Math.floor(Math.random() * 30000) + 10000;
      const price = salePrice + Math.floor(Math.random() * 30000) + 10000;
      
      generatedCourses.push({
        id: i,
        title: courseNames[courseIndex],
        code: `#${Math.floor(Math.random() * 1000)}/${Math.floor(Math.random() * 1000)}`,
        instructor: instructors[instructorIndex].name,
        instructorId: instructors[instructorIndex].id,
        instructorImage: instructors[instructorIndex].image,
        salePrice: salePrice,
        price: price,
        lectures: Math.floor(Math.random() * 30) + 5,
        totalTime: '2:30',
        status: statuses[statusIndex],
        image: courseImages[imageIndex]
      });
    }
    
    return generatedCourses;
  };
  
  // Filter courses based on search query
  const filteredCourses = computed(() => {
    if (!searchQuery.value) return courses.value;
    
    const query = searchQuery.value.toLowerCase();
    return courses.value.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.instructor.toLowerCase().includes(query)
    );
  });
  
  // Calculated pagination
  const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage));
  const paginatedCourses = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredCourses.value.slice(start, start + itemsPerPage);
  });
  
  // View course details
  const viewCourse = (courseId) => {
    router.push(`/courses/${courseId}`);
  };
  
  const toggleDropdown = (courseId, event) => {
    event.stopPropagation();
    activeDropdown.value = activeDropdown.value === courseId ? null : courseId;
  };
  
  onMounted(() => {
    // Generate random courses on component mount
    courses.value = generateCourses();
  });
  </script>