<script setup>
import { ref } from "vue";
import { Bell } from "lucide-vue-next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Button } from "@/components/atoms/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { cn } from "@/helpers/utils";

const messages = [
  {
    id: "1",
    name: "Jennifer Houston",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    message: "Hi Favour, Nice 2 connect with you...",
    timestamp: "2 min ago",
    isNew: true,
  },
  {
    id: "2",
    name: "Salsabila Jeffery",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    message: "I will have to reach out to them",
    timestamp: "1 hour ago",
    isNew: true,
  },
  {
    id: "3",
    name: "Salsabila Jeffery",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    message: "How are you? Been a while",
    timestamp: "Yesterday",
    isNew: false,
  },
  {
    id: "4",
    name: "Salsabila Jeffery",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    message: "Can I take you out tomorrow?",
    timestamp: "Last week",
    isNew: false,
  },
  {
    id: "5",
    name: "Salsabila Jeffery",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    message: "Hurray!!!",
    timestamp: "Last week",
    isNew: false,
  },
];

const unreadCount = ref(2);

const handleMarkAllAsRead = () => {
  unreadCount.value = 0;
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot v-if="$slots.trigger" name="trigger" :unreadCount="unreadCount" />
      <Button v-else variant="outline" size="icon" class="relative">
        <Bell class="h-4 w-4" />
        <span
          v-if="unreadCount > 0"
          class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white"
        >
          {{ unreadCount }}
        </span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-[440px] mt-4">
      <div class="flex items-center justify-between px-4 py-3">
        <DropdownMenuLabel class="text-base font-normal text-input-text">
          {{ unreadCount }} New Messages
        </DropdownMenuLabel>
        <Button
          variant="link"
          class="text-primary hover:text-primary/90 hover:no-underline p-0 h-auto"
          @click="handleMarkAllAsRead"
        >
          Mark All As Read
        </Button>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuGroup class="max-h-[600px] overflow-auto">
        <DropdownMenuItem
          v-for="message in messages"
          :key="message.id"
          :class="[
            'px-4 py-3 focus:bg-gray-50',
            message.isNew ? 'bg-primary/10' : '',
          ]"
        >
          <div class="flex gap-3 w-full">
            <div class="relative">
              <Avatar class="block h-[45px] w-[45px]">
                <AvatarImage :src="message.avatar" :alt="message.name" />
                <AvatarFallback>{{ message.name[0] }}</AvatarFallback>
              </Avatar>
              <span
                v-if="message.isNew"
                class="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white"
              />
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <div class="flex justify-between gap-4">
                <div
                  :class="
                    cn('flex flex-col', {
                      'text-primary': message.isNew,
                    })
                  "
                >
                  <span class="font-semibold truncate">{{ message.name }}</span>
                  <span
                    :class="
                      cn({
                        'text-gray-600': !message.isNew,
                      })
                    "
                    >{{ message.message }}</span
                  >
                </div>
                <div>
                  <span
                    class="text-secondary-foreground text-sm whitespace-nowrap"
                    >{{ message.timestamp }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
