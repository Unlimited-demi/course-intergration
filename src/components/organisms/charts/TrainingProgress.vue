<template>
  <Card class="p-6 rounded-2xl">
    <h2 class="text-base text-secondary-foreground font-medium mb-6">
      Training Progress Status
    </h2>
    <div class="relative w-48 h-48 mx-auto mb-6">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-3xl font-semibold">75%</div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-6">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-success" />
        <span class="text-sm text-secondary-foreground">Completed</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-warning" />
        <span class="text-sm text-secondary-foreground">In Progress</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-error" />
        <span class="text-sm text-secondary-foreground">Not Started</span>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Card } from "@/components/atoms/card"; // assuming you have this component
import { getCSSVariable } from "@/helpers/utils";

// Register chart.js elements
ChartJS.register(ArcElement);

// Get the color values using the function
const successColor = getCSSVariable("--success");
const warningColor = getCSSVariable("--warning");
const errorColor = getCSSVariable("--error");

// Define chart data with dynamically accessed colors
const chartData = {
  datasets: [
    {
      data: [45, 35, 20],
      backgroundColor: [
        `hsl(${successColor})`,
        `hsl(${warningColor})`,
        `hsl(${errorColor})`,
      ],
      borderWidth: 3,
      cutout: "75%",
    },
  ],
};
// Define chart options
const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  rotation: -90,
  circumference: 360,
  cutout: "80%",
  maintainAspectRatio: true,
  responsive: true,
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
