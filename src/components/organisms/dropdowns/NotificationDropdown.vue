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


const notifications = [
  {
    id: "1",
    name: "Jennifer Uzoma",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    action: "Replied to your message",
    timestamp: "2 min ago",
    isNew: true,
  },
  {
    id: "2",
    name: "Maureen Chibuzor",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    action: "Sent an email message: Password Reset",
    timestamp: "1 hour ago",
    isNew: true,
  },
  {
    id: "3",
    name: "Purchase successful",
    avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj4KICA8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2NjY2MiPjwvcmVjdD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNnB4IiBmaWxsPSIjMzMzMzMzIj40MHg0MDwvdGV4dD4gICAKPC9zdmc+",
    action: "A Course purchase was successful",
    timestamp: "4 hours ago",
    isNew: true,
  },
  {
    id: "4",
    name: "Maureen Chibuzor",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    action: "Sent an email : Password Reset",
    timestamp: "Yesterday",
  },
  {
    id: "5",
    name: "Salsabila Jeffery",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    action: "Invited you to attend her event..",
    timestamp: "Last week",
  },
  {
    id: "6",
    name: "Salsabila Jeffery",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
    action: "Commented on your photo.",
    message: "Happy new month to my amazing fans. Cheers",
    timestamp: "Last week",
    commentImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin_Dashboard-Xp6JsnM2YmN3lqUWJxGkG1milgkS3V.png",
  },
];

const unreadCount = ref(3);

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
          {{ unreadCount }} New Notifications
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
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'px-4 py-3 focus:bg-gray-50',
            notification.isNew ? 'bg-primary/10' : '',
          ]"
        >
          <div class="flex gap-3 w-full">
            <div class="relative">
              <Avatar class="block h-[45px] w-[45px]">
                <AvatarImage
                  :src="notification.avatar"
                  :alt="notification.name"
                />
                <AvatarFallback>{{ notification.name[0] }}</AvatarFallback>
              </Avatar>
              <span
                v-if="notification.isNew"
                class="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white"
              />
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <div class="flex justify-between gap-4">
                <div
                  :class="
                    cn('flex flex-col', {
                      'text-primary': notification.isNew,
                    })
                  "
                >
                  <span class="font-semibold truncate">{{
                    notification.name
                  }}</span>
                  <span
                    :class="
                      cn({
                        'text-gray-600': !notification.isNew,
                      })
                    "
                    >{{ notification.action }}</span
                  >
                  <p v-if="notification.message" class="mt-1 text-primary">
                    "{{ notification.message }}"
                  </p>
                </div>
                <div>
                  <span
                    class="text-secondary-foreground text-sm whitespace-nowrap"
                    >{{ notification.timestamp }}</span
                  >

                  <div v-if="notification.commentImage" class="mt-2">
                    <img
                      :src="notification.commentImage || '/placeholder.svg'"
                      alt="Comment"
                      class="rounded-lg h-12 w-12 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
