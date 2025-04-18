<template>
    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed bottom-4 right-4 z-50 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <CheckCircleIcon
                v-if="type === 'success'"
                class="h-6 w-6 text-[#00B454]"
              />
              <ExclamationCircleIcon
                v-else-if="type === 'error'"
                class="h-6 w-6 text-[#E50303]"
              />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ title }}</p>
              <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
              <button
                @click="close"
                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D50036] focus:ring-offset-2"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';
  
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error'].includes(value),
    },
    duration: {
      type: Number,
      default: 5000,
    },
  });
  
  const show = ref(true);
  
  const close = () => {
    show.value = false;
  };
  
  onMounted(() => {
    setTimeout(() => {
      close();
    }, props.duration);
  });
  </script>