<template>
    <div class="onboarding-tab">
      <!-- Video Player -->
      <VideoPlayerOrganism
        :current-video="currentVideo"
        :is-playing="isPlaying"
        :is-muted="isMuted"
        :current-time="currentTime"
        :duration="duration"
        :video-progress="videoProgress"
        @toggle-play="$emit('toggle-play')"
        @toggle-mute="$emit('toggle-mute')"
      />
  
      <!-- Video Info and Demo Button -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center p-4 bg-pink-50 rounded-lg">
          <ButtonAtom variant="primary" class="mr-4">
            <Play class="w-5 h-5" />
          </ButtonAtom>
          <div>
            <div class="font-medium">Welcome to XYZ LMS</div>
            <div class="text-sm text-gray-500">Video 4mins 9sec</div>
          </div>
        </div>
  
        <ButtonAtom variant="primary" @click="$emit('book-demo')">
          Book a demo
        </ButtonAtom>
      </div>
  
      <!-- Video Cards -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <VideoCardMolecule
          v-for="(video, index) in videoCards"
          :key="index"
          :video="video"
          @play-video="$emit('play-video', $event)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import VideoPlayerOrganism from './VideoPlayerOrganism.vue';
  import VideoCardMolecule from '../molecules/VideoCardMolecule.vue';
  import ButtonAtom from '../atoms/ButtonAtom.vue';
  import { Play } from 'lucide-vue-next';
  
  defineProps({
    currentVideo: Object,
    isPlaying: Boolean,
    isMuted: Boolean,
    currentTime: Number,
    duration: Number,
    videoProgress: Number,
    videoCards: Array,
  });
  
  defineEmits(['toggle-play', 'toggle-mute', 'book-demo', 'play-video']);
  </script>