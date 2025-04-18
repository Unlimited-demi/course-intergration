<template>
    <div class="courses-container p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-medium">Courses</h1>
        <div class="flex space-x-4">
          <button 
            @click="exportCourses" 
            class="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <DownloadIcon class="h-4 w-4 mr-1" />
            Export
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
      
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-4 flex justify-between items-center">
          <div class="relative w-80">
            <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div class="flex items-center">
            <span class="text-sm text-gray-500 mr-2">All</span>
            <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            
            <div class="ml-4 relative">
              <input 
                type="text"
                :value="dateRange"
                readonly
                placeholder="Select date range"
                class="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                @click="toggleDatePicker"
              />
              <CalendarIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              <!-- Date picker would go here (simplified for this example) -->
              <div v-if="showDatePicker" class="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-md p-4 z-10">
                <div class="flex justify-between mb-4">
                  <button @click="selectDateRange('Oct 01 - Oct 10')" class="text-sm text-primary hover:underline">Oct 01 - Oct 10</button>
                  <button @click="selectDateRange('Oct 11 - Oct 20')" class="text-sm text-primary hover:underline">Oct 11 - Oct 20</button>
                </div>
                <button @click="closeDatePicker" class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sale
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lecture
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Time
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="course in filteredCourses" :key="course.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="course.thumbnail" alt="Course thumbnail" class="h-10 w-10 rounded-md mr-3" />
                    <div>
                      <div class="font-medium text-gray-900">{{ course.name }}</div>
                      <div class="text-xs text-gray-500">#{{ course.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="course.instructorAvatar" alt="Instructor avatar" class="h-8 w-8 rounded-full mr-2" />
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ course.instructor }}</div>
                      <div class="text-xs text-gray-500">User ID #{{ course.instructorId }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">₦{{ course.sale.toLocaleString() }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">₦{{ course.price.toLocaleString() }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ course.lectures }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ course.totalTime }} hours</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': course.status === 'Published',
                      'bg-blue-100 text-blue-800': course.status === 'Active',
                      'bg-red-100 text-red-800': course.status === 'Failed',
                      'bg-yellow-100 text-yellow-800': course.status === 'Loading'
                    }"
                  >
                    {{ course.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button class="text-gray-400 hover:text-gray-500">
                    <MoreVerticalIcon class="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div class="text-sm text-gray-500">
            Showing 1 to {{ filteredCourses.length }} of {{ totalCourses }} results
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronLeftIcon class="h-4 w-4" />
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-white bg-primary hover:bg-red-700 transition-colors">
              1
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              2
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              3
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              4
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              ...
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              52
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronRightIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { 
    SearchIcon, 
    CalendarIcon, 
    DownloadIcon, 
    PlusIcon, 
    MoreVerticalIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  } from 'lucide-vue-next';
  
  // Router
  const router = useRouter();
  
  // State variables
  const courses = ref([]);
  const searchQuery = ref('');
  const dateRange = ref('Oct 01 - Oct 10');
  const showDatePicker = ref(false);
  const loading = ref(true);
  
  // Computed properties
  const filteredCourses = computed(() => {
    if (!searchQuery.value) {
      return courses.value;
    }
    
    const query = searchQuery.value.toLowerCase();
    return courses.value.filter(course => 
      course.name.toLowerCase().includes(query) || 
      course.instructor.toLowerCase().includes(query)
    );
  });
  
  const totalCourses = computed(() => {
    return 52; // This would typically come from an API
  });
  
  // Methods
  const navigateToAddCourse = () => {
    router.push('/courses/add');
  };
  
  const exportCourses = () => {
    console.log('Exporting courses...');
    // This would typically trigger a download
  };
  
  const toggleDatePicker = () => {
    showDatePicker.value = !showDatePicker.value;
  };
  
  const closeDatePicker = () => {
    showDatePicker.value = false;
  };
  
  const selectDateRange = (range) => {
    dateRange.value = range;
  };
  
  const viewCourseDetails = (courseId) => {
    router.push(`/courses/${courseId}`);
  };
  
  // Fetch courses data
  const fetchCourses = async () => {
    try {
      loading.value = true;
      // In a real application, you would fetch this data from an API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      courses.value = [
        {
          id: '7976/1489',
          name: 'Design Principle',
          thumbnail: '/placeholder.svg?height=40&width=40',
          instructor: 'Favour John',
          instructorId: '81093/2442',
          instructorAvatar: '/placeholder.svg?height=32&width=32',
          sale: 25000,
          price: 50000,
          lectures: 14,
          totalTime: 230,
          status: 'Published'
        },
        {
          id: '3195/1441',
          name: 'Web Development',
          thumbnail: '/placeholder.svg?height=40&width=40',
          instructor: 'Uche Ogbonna',
          instructorId: '81093/2442',
          instructorAvatar: '/placeholder.svg?height=32&width=32',
          sale: 10000,
          price: 20000,
          lectures: 10,
          totalTime: 230,
          status: 'Active'
        },
        {
          id: '3195/1442',
          name: 'Cybersecurity',
          thumbnail: '/placeholder.svg?height=40&width=40',
          instructor: 'Favour John',
          instructorId: '81093/2442',
          instructorAvatar: '/placeholder.svg?height=32&width=32',
          sale: 10000,
          price: 20000,
          lectures: 7,
          totalTime: 230,
          status: 'Failed'
        },
        {
          id: '7976/1480',
          name: 'Design Principle',
          thumbnail: '/placeholder.svg?height=40&width=40',
          instructor: 'Ayomide Nissan',
          instructorId: '81093/2442',
          instructorAvatar: '/placeholder.svg?height=32&width=32',
          sale: 20000,
          price: 50000,
          lectures: 25,
          totalTime: 230,
          status: 'Published'
        },
        {
          id: '3195/1443',
          name: 'Ethical Hacking',
          thumbnail: '/placeholder.svg?height=40&width=40',
          instructor: 'Favour John',
          instructorId: '81093/2442',
          instructorAvatar: '/placeholder.svg?height=32&width=32',
          sale: 20000,
          price: 20000,
          lectures: 15,
          totalTime: 230,
          status: 'Published'
        },
        {
          id: '3195/1242',
          name: 'Cybersecurity',
          thumbnail: '/placeholder.svg?height=40&width=40',
          instructor: 'Samuel Okpara',
          instructorId: '81093/2442',
          instructorAvatar: '/placeholder.svg?height=32&width=32',
          sale: 10000,
          price: 30000,
          lectures: 20,
          totalTime: 230,
          status: 'Loading'
        },
        {
          id: '7976/1489',
          name: 'Design Principle',
          thumbnail: '/placeholder.svg?height=40&width=40',
          instructor: 'Favour John',
          instructorId: '81093/2442',
          instructorAvatar: '/placeholder.svg?height=32&width=32',
          sale: 10000,
          price: 20000,
          lectures: 30,
          totalTime: 230,
          status: 'Active'
        }
      ];
      
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Lifecycle hooks
  onMounted(() => {
    fetchCourses();
  });
  </script>