<template>
  <Card class="p-6 flex flex-col gap-4">
    <!-- Header with Select dropdown -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-poppins font-medium">Activities</h2>
      <Select v-model="selectedPeriod" class="w-[120px]">
        <SelectTrigger class="w-[120px]">
          <SelectValue :placeholder="selectedPeriod" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="year">Year</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Date Range Inputs -->
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">From</span>
        <Input
          type="date"
          v-model="startDate"
          class="w-auto bg-primary/10 border-0"
        />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">To</span>
        <Input
          type="date"
          v-model="endDate"
          class="w-auto bg-primary/10 border-0"
        />
      </div>
    </div>

    <!-- Line Chart -->
    <div class="h-[300px] w-full">
      <canvas ref="chartRef"></canvas>
    </div>
  </Card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Input } from "@/components/atoms/input";
import { Card } from "@/components/atoms/card";

// Define refs for date and selected period
const selectedPeriod = ref("week");
const startDate = ref("2024-08-30");
const endDate = ref("2024-09-10");
const chartRef = ref(null); // Ref for the chart canvas

// Data for the chart
const labels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const data = {
  labels,
  datasets: [
    {
      label: "Logins",
      data: [2, 4, 8, 11, 7, 4, 3, 4, 5, 6, 4, 3],
      borderColor: "#e7022e",
      backgroundColor: "rgba(231, 2, 46, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Training Completions",
      data: [1, 3, 5, 4, 3, 7, 9.5, 7, 5, 4, 3, 2],
      borderColor: "#292d32",
      backgroundColor: "rgba(41, 45, 50, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

// Chart.js options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: {
        boxWidth: 8,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          return label;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 12,
      ticks: {
        stepSize: 2,
      },
      grid: {
        color: "#f0f0f0",
        drawTicks: false,
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
      hoverRadius: 6,
    },
  },
};

// Initialize chart after component mounts
onMounted(() => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: "line",
      data,
      options,
    });
  }
});

// Watch for changes in the period, start date, or end date (could trigger chart updates if needed)
watch([selectedPeriod, startDate, endDate], () => {
  // Logic to handle changes (e.g., update chart data or fetch new data)
  console.log("Updated Period, Start Date, or End Date");
});
</script>

<style scoped>
/* Add any necessary custom styles for the component */
</style>
