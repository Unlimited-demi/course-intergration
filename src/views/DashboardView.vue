<template>
  <!-- Main content -->
  <main
    class="grid grid-cols-1 md:grid-cols-[1fr_331px] w-full gap-4 p-6 overflow-y-auto"
  >
    <!-- Dashboard Header -->
    <div
      class="flex bg-background rounded-lg items-center justify-between py-2 px-5 col-span-2"
    >
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
      </div>
      <QuickActionModal>
        <template #trigger>
          <Button
            variant="ghost"
            size="default"
            class="flex text-secondary-foreground"
          >
            <CirclePlus class="h-6 w-6 text-primary" />
            Quick Actions
          </Button>
        </template>
      </QuickActionModal>
    </div>

    <!-- Dashboard Stats Cards -->
    <div class="grid grid-cols-1 max-sm:col-span-2 gap-6">
      <DashboardStatsCard />

      <!-- Activity Graph & Recent Activities -->
      <div class="grid grid-cols-1 gap-4">
        <ActivityGraph />

        <RecentActivities />
      </div>
    </div>

    <!-- Training Progress & Upcoming Tasks -->
    <div class="flex flex-col gap-4">
      <TrainingProgress />
      <UpcomingTasks />
    </div>
  </main>
</template>

<script setup>
import { CirclePlus } from "lucide-vue-next";
import { Button } from "@/components/atoms/button";
import UpcomingTasks from "@/components/molecules/tasks/UpcomingTasks.vue";
import TrainingProgress from "@/components/organisms/charts/TrainingProgress.vue";
import RecentActivities from "@/components/molecules/tables/RecentActivities.vue";
import ActivityGraph from "@/components/organisms/charts/ActivityGraph.vue";
import DashboardStatsCard from "@/components/organisms/cards/DashboardStatsCard.vue";
import QuickActionModal from "@/components/organisms/modals/QuickActionModal.vue";
</script>
