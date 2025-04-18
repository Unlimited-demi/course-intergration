<template>
  <div class="p-6">
    <h1 class="text-xl font-medium mb-6">Add New Course</h1>
    <div class="course-form bg-white p-6 rounded-lg">
      <div class="flex items-center mb-6">
        <router-link to="/courses" class="text-[#D50036] mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </router-link>
        <h1 class="text-2xl font-semibold text-[#0F151F]">Add Course</h1>
        <div class="ml-auto flex gap-4">
          <button class="px-4 py-2 border border-[#E5E5E5] bg-white rounded-full text-[#0F151F] flex items-center"
           @click="cancel()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x mr-2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Cancel
          </button>
          <button class="px-4 py-2 bg-[#0F151F] rounded-full text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus mr-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Course
          </button>
        </div>
      </div>
  
      <div class="bg-white rounded-lg shadow-sm p-6">
        <form @submit.prevent="submitForm">
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-[#0F151F] mb-6">Course</h2>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Course Name*</label>
              <input 
                v-model="form.name" 
                type="text" 
                placeholder="Enter course name" 
                class="w-full px-4 py-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036]"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Course Description*</label>
              <textarea 
                v-model="form.description" 
                placeholder="Describe course..." 
                class="w-full px-4 py-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036] h-32 resize-none"
                required
              ></textarea>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Upload Course Video</label>
              <div 
                @click="triggerFileInput"
                class="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video mb-2">
                  <path d="m22 8-6 4 6 4V8Z"></path>
                  <rect x="2" y="6" width="14" height="12" rx="2" ry="2"></rect>
                </svg>
                <p class="text-[#D50036] font-medium">Click here</p>
                <p class="text-sm text-gray-500">to upload or drag and drop</p>
                <input 
                  ref="fileInput" 
                  type="file" 
                  accept="video/*" 
                  class="hidden" 
                  @change="handleFileUpload"
                />
              </div>
              <div v-if="form.videoFile" class="mt-2 text-sm text-gray-600">
                Selected file: {{ form.videoFile.name }}
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-[#0F151F] mb-6">Category</h2>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Course Category*</label>
              <div class="relative">
                <select 
                  v-model="form.category" 
                  class="w-full px-4 py-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036] appearance-none"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="business">Business</option>
                  <option value="it">IT & Software</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Sub Category*</label>
              <div class="relative">
                <select 
                  v-model="form.subCategory" 
                  class="w-full px-4 py-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036] appearance-none"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="active">Active</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-[#0F151F] mb-6">Instructor</h2>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Instructor</label>
              <div class="relative">
                <select 
                  v-model="form.instructor" 
                  class="w-full px-4 py-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036] appearance-none"
                >
                  <option value="" disabled>Select</option>
                  <option value="favour">Favour John</option>
                  <option value="uche">Uche Ogbonna</option>
                  <option value="ayomide">Ayomide Nissan</option>
                  <option value="samuel">Samuel Okpara</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Course Price*</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                <input 
                  v-model="form.price" 
                  type="number" 
                  min="0" 
                  class="w-full pl-8 pr-4 py-2 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D50036]"
                  required
                />
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button 
              type="button" 
              @click="$router.push('/courses')"
              class="px-6 py-2 border border-[#E5E5E5] rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-6 py-2 bg-[#D50036] text-white rounded-md"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const fileInput = ref(null);
  
  const form = ref({
    name: '',
    description: '',
    videoFile: null,
    category: '',
    subCategory: '',
    instructor: '',
    price: ''
  });
  
const cancel = () => {
    router.push('/courses');
  };

  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      form.value.videoFile = file;
    }
  };
  
  const submitForm = () => {
    // In a real app, you would send this data to an API
    console.log('Form submitted:', form.value);
    
    // Show success notification
    alert('Course added successfully!');
    
    // Redirect to courses list
    router.push('/courses');
  };
</script>