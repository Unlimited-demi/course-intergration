<template>
  <!-- Dashboard Stats Cards -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
    <Card v-for="(card, index) in cards" :key="index" class="p-6">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-primary/10 rounded-lg">
          <component :is="card.icon" class="h-6 w-6 text-primary" />
        </div>
        <div class="text-secondary-foreground text-center">
          <div class="text-sm font-medium mb-1">
            {{ card.title }}
          </div>
          <div class="text-2xl font-extrabold">{{ card.value }}</div>
          <div v-if="card.subtext" class="text-sm text-input-text mt-1">
            {{ card.subtext }}
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Users, BookOpen, Layers } from "lucide-vue-next";
import { Card } from "@/components/atoms/card"; // Adjust the path based on your components

// Dashboard Cards data
const cards = ref([
  {
    title: "Total Users",
    value: 95,
    subtext: "User Requests: 5",
    icon: Users,
  },
  {
    title: "Total Courses",
    value: 50,
    icon: BookOpen,
  },
  {
    title: "Courses Assigned",
    value: 50,
    subtext: "Course Request: 1",
    icon: Layers,
  },
]);
</script>

<style scoped>
/* Add any necessary custom styling here */
</style>
