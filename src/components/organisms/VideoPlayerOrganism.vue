<template>
    <div class="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
      <div class="absolute inset-0 flex items-center justify-center">
        <ButtonAtom
          v-if="!isPlaying"
          variant="primary"
          size="large"
          class="bg-opacity-80"
          @click="$emit('toggle-play')"
        >
          <Play class="w-8 h-8" />
        </ButtonAtom>
      </div>
      <video
        ref="videoPlayer"
        class="w-full h-full"
        :src="currentVideo.src"
        @play="$emit('update:isPlaying', true)"
        @pause="$emit('update:isPlaying', false)"
        @ended="$emit('update:isPlaying', false)"
      ></video>
  
      <!-- Video Controls -->
      <div class="absolute bottom-0 left-0 right-0 flex items-center p-4 bg-gradient-to-t from-black to-transparent">
        <ButtonAtom variant="text" @click="$emit('toggle-play')">
          <component :is="isPlaying ? 'Pause' : 'Play'" class="w-5 h-5" />
        </ButtonAtom>
        <ButtonAtom variant="text" class="mr-4">
          <SkipBack class="w-5 h-5" />
        </ButtonAtom>
        <ButtonAtom variant="text" class="mr-4">
          <SkipForward class="w-5 h-5" />
        </ButtonAtom>
        <ButtonAtom variant="text" @click="$emit('toggle-mute')">
          <component :is="isMuted ? 'VolumeX' : 'Volume2'" class="w-5 h-5" />
        </ButtonAtom>
  
        <!-- Progress Bar -->
        <div class="flex-1 mx-4">
          <div class="relative h-1 bg-gray-600 rounded-full">
            <div
              class="absolute top-0 left-0 h-full bg-[#D50036] rounded-full"
              :style="{ width: `${videoProgress}%` }"
            ></div>
          </div>
        </div>
  
        <div class="mr-4 text-sm text-white">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
  
        <ButtonAtom variant="text" class="mr-4">
          <span class="text-sm font-medium">HD</span>
        </ButtonAtom>
  
        <ButtonAtom variant="text">
          <Maximize class="w-5 h-5" />
        </ButtonAtom>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize } from 'lucide-vue-next';
  import ButtonAtom from '../atoms/ButtonAtom.vue';
  
  const props = defineProps({
    currentVideo: Object,
    isPlaying: Boolean,
    isMuted: Boolean,
    currentTime: Number,
    duration: Number,
    videoProgress: Number,
  });
  
  const emit = defineEmits(['toggle-play', 'toggle-mute', 'update:isPlaying']);
  
  const videoPlayer = ref(null);
  
  watch(() => props.isPlaying, (newValue) => {
    if (videoPlayer.value) {
      if (newValue) {
        videoPlayer.value.play();
      } else {
        videoPlayer.value.pause();
      }
    }
  });
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  </script>