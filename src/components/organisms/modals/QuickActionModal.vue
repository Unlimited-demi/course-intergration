<script setup>
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { X, UserPlus, BookOpen, Users, FileUp } from "lucide-vue-next";

const actions = [
  {
    title: "Add user",
    icon: UserPlus,
  },
  {
    title: "Add course",
    icon: BookOpen,
  },
  {
    title: "Add group",
    icon: Users,
  },
  {
    title: "Import-Export",
    icon: FileUp,
  },
];
</script>

<template>
  <Dialog>
    <DialogTrigger asChild>
      <slot v-if="$slots.trigger" name="trigger" />
      <Button v-else variant="outline">Quick Actions</Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[600px] p-8">
      <DialogHeader class="flex flex-row items-center justify-between p-0 mb-8">
        <DialogTitle class="text-[32px] font-normal text-input-text"
          >Quick Actions</DialogTitle
        >
      </DialogHeader>

      <div class="grid grid-cols-2 gap-6">
        <!-- Dynamically generate buttons for each action -->
        <Button
          v-for="action in actions"
          :key="action.title"
          variant="ghost"
          class="py-10 min-h-[130px] flex-col gap-4 bg-primary/10 rounded-2xl"
        >
          <component
            :is="action.icon"
            :size="24"
            class="h-8 w-8 text-primary"
          />
          <span class="text-lg text-secondary-foreground font-medium">{{
            action.title
          }}</span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
