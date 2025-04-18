<template>
  <Card class="p-4 border rounded-lg">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-medium">{{ title }}</h3>
      <Button
        variant="ghost"
        size="icon"
        class="text-gray-400"
        @click="onClose"
      >
        <XIcon class="w-5 h-5" />
      </Button>
    </div>
    <p class="text-sm text-gray-600 mb-2">{{ description }}</p>
    <div class="flex items-center justify-between">
      <p class="text-sm text-primary">Deadline: {{ deadline }}</p>
      <Button
        class="px-4 py-2 bg-primary text-white text-sm rounded-3xl"
        @click="onUpdate"
      >
        {{ updateText }}
      </Button>
    </div>
  </Card>
</template>

<script setup>
import { XIcon } from "lucide-vue-next";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";

defineProps({
  title: String,
  description: String,
  deadline: String,
  updateText: String,
  onClose: Function,
  onUpdate: Function,
});
</script>
