<template>
  <!-- Upcoming Tasks Section -->
  <Card class="p-6 rounded-xl shadow-sm">
    <h2 class="text-lg font-semibold mb-6">Upcoming Tasks</h2>
    <div class="space-y-4">
      <!-- Loop through tasks array -->
      <TaskItem
        v-for="(task, index) in tasks"
        :key="index"
        :title="task.title"
        :description="task.description"
        :deadline="task.deadline"
        :updateText="task.updateText"
        :onClose="() => handleClose(index)"
        :onUpdate="() => handleUpdate(index)"
      />
    </div>
  </Card>
</template>

<script setup>
import { ref } from "vue";
import TaskItem from "./TaskItem.vue"; // Import the TaskItem component
import Card from "@/components/atoms/card/Card.vue";

// Array of task objects
const tasks = ref([
  {
    title: "Training Updates",
    description: "Update Training 01 in 'Design Principle'",
    deadline: "Nov 15",
    updateText: "Update Training",
  },
  {
    title: "Complaints",
    description: "Update Email Complaint",
    deadline: "Oct 05",
    updateText: "Update Email",
  },
]);

// Define methods to handle closing tasks
const handleClose = (index = -1) => {
  // Remove the task from the array based on its index
  tasks.value.splice(index, 1);
  console.log(`Task at index ${index} closed and removed`);
};

const handleUpdate = (index = -1) => {
  // Remove the task from the array based on its index
  console.log(`Task at index ${index} updated`);
};
</script>
