<script setup>
import { ref } from "vue";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDownIcon,
  MenuIcon,
} from "lucide-vue-next";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { useSidebar } from "@/components/atoms/sidebar";
import NotificationDropdown from "../organisms/dropdowns/NotificationDropdown.vue";
import MessagesDropdown from "../organisms/dropdowns/MessagesDropdown.vue";
import UserProfileDropdown from "../organisms/dropdowns/UserProfileDropdown.vue";

const searchQuery = ref("");

const { toggleSidebar } = useSidebar();
</script>
<template>
  <header
    class="h-16 border-b bg-background gap-4 flex items-center justify-between px-6"
  >
    <div class="flex items-center flex-1 max-w-xl">
      <Button
        variant="ghost"
        size="icon"
        class="md:hidden mr-2"
        @click="toggleSidebar"
      >
        <MenuIcon class="h-4 w-4" />
      </Button>
      <div class="relative flex-1">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
        />
        <Input
          v-model="searchQuery"
          placeholder="Search for anything..."
          class="pl-10 bg-secondary border-none"
        />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <!-- Message Button -->
      <MessagesDropdown>
        <template #trigger="{ unreadCount }">
          <Button
            variant="ghost"
            size="icon"
            class="relative p-1.5 bg-primary/10 text-primary rounded-full"
          >
            <MessageSquare class="h-5 w-5" />
            <span
              v-if="Boolean(unreadCount)"
              class="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center"
            >
              {{ unreadCount }}
            </span>
          </Button>
        </template>
      </MessagesDropdown>

      <!-- Notification Button -->
      <NotificationDropdown>
        <template #trigger="{ unreadCount }">
          <Button
            variant="ghost"
            size="icon"
            class="relative p-1.5 bg-primary/10 text-primary rounded-full"
          >
            <Bell class="h-5 w-5" />
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center"
            >
              {{ unreadCount }}
            </span>
          </Button>
        </template>
      </NotificationDropdown>
    </div>

    <UserProfileDropdown>
      <template #trigger>
        <!-- Profile Section -->
        <Button variant="ghost" class="flex items-center gap-3">
          <img
            src="https://s3-alpha-sig.figma.com/img/b308/0c9c/5beb28d56f5510e2728f1194317d4554?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c-fyBH6nb3o38uOl5BJxMmg5jJ87rr1MgNFMSfCeaNdAQIzlZxaEh7IKeYgz9zJGxZuzIpO6pC0XVY~MV9-gWmWbe9eUlBGzrTYMtq9RfYLPam~n5L3FGr72sJagAjSXwZU7S6EJSo0JO3CQjQBQ70SdAJhwICB6nhfXUMZWH4aCAYGNv1OtUm4XtQckbLtcPqnworAfjUmt~DU8PIEN64UtIigYs8wJnHj1FxbbmTLYX0~IbVLwVpuDLDMleDCoe5pEHHsmE2VvJUp4U3yh4AGvHyjMr1S8PdprJTWVw~3eK6yFUaujqWsTanmmabFHYpALZsJIbXi6DoKszNTvfA__&height=40&width=40"
            alt="Profile"
            width="32"
            height="32"
            class="rounded-full"
          />
          <div>
            <div class="font-medium">Favour Chukwukere</div>
            <div class="text-sm text-muted-foreground">Administrator</div>
          </div>
          <ChevronDownIcon class="w-5 h-5 ml-2 text-gray-400" />
        </Button>
      </template>
    </UserProfileDropdown>
  </header>
</template>
<style scoped></style>
