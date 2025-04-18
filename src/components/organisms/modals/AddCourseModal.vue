<template>
    <div class="add-course-container">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-medium">Add Course</h1>
        <div class="flex space-x-4">
          <button 
            @click="cancel" 
            class="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <XIcon class="h-4 w-4 mr-1" />
            Cancel
          </button>
          <button 
            @click="addCourse" 
            class="flex items-center px-4 py-2 bg-primary-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <PlusIcon class="h-4 w-4 mr-1" />
            Add Course
          </button>
        </div>
      </div>
      
      <div class="course-form bg-white p-6 rounded-lg">
        <div class="mb-6">
          <h2 class="text-lg font-medium mb-4">Course</h2>
          
          <div class="mb-4">
            <label for="courseName" class="block text-sm font-medium mb-1">Course Name<span class="text-red-500">*</span></label>
            <input 
              id="courseName"
              v-model="form.name"
              type="text"
              placeholder="Enter course name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
          </div>
          
          <div class="mb-4">
            <label for="courseDescription" class="block text-sm font-medium mb-1">Course Description<span class="text-red-500">*</span></label>
            <textarea 
              id="courseDescription"
              v-model="form.description"
              placeholder="Describe course..."
              rows="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Upload Course Video</label>
            <div 
              class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              @click="triggerFileInput"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
              :class="{ 'border-primary bg-red-50': isDragging }"
            >
              <input 
                ref="fileInput"
                type="file"
                accept="video/*"
                class="hidden"
                @change="onFileChange"
              />
              <div class="flex justify-center mb-2">
                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <VideoIcon class="h-5 w-5 text-primary" />
                </div>
              </div>
              <p class="text-primary font-medium">Click here</p>
              <p class="text-sm text-gray-500">to upload or drag and drop</p>
            </div>
            <p v-if="form.video" class="mt-2 text-sm text-gray-600">Selected: {{ form.video.name }}</p>
            <p v-if="errors.video" class="mt-1 text-sm text-red-500">{{ errors.video }}</p>
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-lg font-medium mb-4">Category</h2>
          
          <div class="mb-4">
            <label for="courseCategory" class="block text-sm font-medium mb-1">Course Category<span class="text-red-500">*</span></label>
            <div class="relative">
              <select 
                id="courseCategory"
                v-model="form.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                :class="{ 'border-red-500': errors.category }"
              >
                <option value="" disabled>Select</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <p v-if="errors.category" class="mt-1 text-sm text-red-500">{{ errors.category }}</p>
          </div>
          
          <div class="mb-4">
            <label for="subCategory" class="block text-sm font-medium mb-1">Sub Category<span class="text-red-500">*</span></label>
            <div class="relative">
              <select 
                id="subCategory"
                v-model="form.subCategory"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                :class="{ 'border-red-500': errors.subCategory }"
              >
                <option value="" disabled>Active</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <p v-if="errors.subCategory" class="mt-1 text-sm text-red-500">{{ errors.subCategory }}</p>
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-lg font-medium mb-4">Instructor</h2>
          
          <div class="mb-4">
            <label for="instructor" class="block text-sm font-medium mb-1">Select Instructor</label>
            <div class="relative">
              <select 
                id="instructor"
                v-model="form.instructor"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                :class="{ 'border-red-500': errors.instructor }"
              >
                <option value="" disabled>Select</option>
                <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">
                  {{ instructor.name }}
                </option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <p v-if="errors.instructor" class="mt-1 text-sm text-red-500">{{ errors.instructor }}</p>
          </div>
          
          <div class="mb-4">
            <label for="coursePrice" class="block text-sm font-medium mb-1">Course Price<span class="text-red-500">*</span></label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
              <input 
                id="coursePrice"
                v-model="form.price"
                type="number"
                placeholder="0"
                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': errors.price }"
              />
            </div>
            <p v-if="errors.price" class="mt-1 text-sm text-red-500">{{ errors.price }}</p>
          </div>
        </div>
        
        <div class="flex justify-end space-x-4 mt-8">
          <button 
            @click="cancel" 
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="publishCourse" 
            class="px-6 py-2 bg-primary text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { XIcon, PlusIcon, VideoIcon, ChevronDownIcon } from 'lucide-vue-next';
  
  // Router
  const router = useRouter();
  
  // State variables
  const fileInput = ref(null);
  const isDragging = ref(false);
  const form = reactive({
    name: '',
    description: '',
    video: null,
    category: '',
    subCategory: 'active',
    instructor: '',
    price: ''
  });
  const errors = reactive({
    name: '',
    description: '',
    video: '',
    category: '',
    subCategory: '',
    instructor: '',
    price: ''
  });
  
  // Mock data
  const categories = [
    { id: 1, name: 'Design' },
    { id: 2, name: 'Development' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Business' }
  ];
  
  const instructors = [
    { id: 1, name: 'Favour John' },
    { id: 2, name: 'Uche Ogbonna' },
    { id: 3, name: 'Ayomide Nissan' },
    { id: 4, name: 'Samuel Okpara' }
  ];
  
  // Methods
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  const onDragOver = () => {
    isDragging.value = true;
  };
  
  const onDragLeave = () => {
    isDragging.value = false;
  };
  
  const onDrop = (event) => {
    isDragging.value = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      form.video = files[0];
    }
  };
  
  const onFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      form.video = files[0];
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
    
    // Validate required fields
    if (!form.name.trim()) {
      errors.name = 'Course name is required';
      isValid = false;
    }
    
    if (!form.description.trim()) {
      errors.description = 'Course description is required';
      isValid = false;
    }
    
    if (!form.category) {
      errors.category = 'Category is required';
      isValid = false;
    }
    
    if (!form.subCategory) {
      errors.subCategory = 'Sub category is required';
      isValid = false;
    }
    
    if (!form.price) {
      errors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(form.price) || Number(form.price) < 0) {
      errors.price = 'Price must be a valid number';
      isValid = false;
    }
    
    return isValid;
  };
  
  const cancel = () => {
    router.push('/courses');
  };
  
  const addCourse = () => {
    // This would typically navigate to a different form or expand the current one
    console.log('Add course button clicked');
  };
  
  const publishCourse = () => {
    if (!validateForm()) {
      return;
    }
    
    // In a real application, you would send this data to an API
    console.log('Publishing course:', form);
    
    // Navigate back to courses page after successful submission
    router.push('/courses');
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>