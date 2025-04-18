<template>
  <SidebarProvider>
    <div class="flex w-full h-screen">
      <AppSidebar />
      <SidebarInset>
        <div class="flex-1 w-full flex flex-col bg-secondary">
          <!-- Header -->
          <Header />

          <!-- Main content -->
          <RouterView />
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>

<script setup>
import { SidebarProvider, SidebarInset } from "@/components/atoms/sidebar";
import AppSidebar from "@/layouts/AppSidebar.vue";
import Header from "@/components/molecules/Header.vue";
</script>
