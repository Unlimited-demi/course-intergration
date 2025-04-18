<template>
  <Sidebar collapsible="icon" class="bg-background">
    <!-- Sidebar Header (Logo) -->
    <SidebarHeader class="relative">
      <div class="py-4 border-b">
        <Logo />
      </div>
      <button
        @click="toggleSidebar"
        class="rounded-full absolute bg-background border border-border top-7 -right-4"
      >
        <component
          :is="open ? ChevronLeft : ChevronRight"
          :size="32"
          class="text-primary"
        />
      </button>
    </SidebarHeader>

    <!-- Sidebar Content (Navigation) -->
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="(item, index) in navigation" :key="index">
            <SidebarMenuButton
              :as="RouterLink"
              :to="item.href"
              :is-active="isActive(item.href)"
              :class="
                cn('rounded-full py-5', {
                  'bg-primary/10 text-primary': isActive(item.href),
                  'text-secondary-foreground hover:bg-gray-50': !isActive(
                    item.href
                  ),
                })
              "
            >
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <!-- Sidebar Footer (Premium Section and Logout) -->
    <SidebarFooter>
      <!-- Premium Section -->
      <div
        v-if="!isCollapsed"
        class="p-4 my-4 bg-slate-50/40 shadow-md rounded-lg"
      >
        <div class="flex justify-center mb-3">
          <LockIcon class="w-6 h-6 text-gray-500" />
        </div>
        <h3 class="text-sm font-medium text-center mb-2">
          Unlock Premium Resources & Features
        </h3>
        <button
          class="w-full px-4 py-2 text-sm text-white bg-primary rounded-3xl hover:bg-red-700"
        >
          Upgrade
        </button>
      </div>

      <!-- Logout -->
      <Button
        variant="ghost"
        :size="isCollapsed ? 'icon' : 'default'"
        :class="
          cn('flex gap-4 text-sm text-primary', {
            'justify-start bg-border': !isCollapsed,
          })
        "
      >
        <LogOutIcon class="w-5 h-5" />
        <template v-if="!isCollapsed"> Logout </template>
      </Button>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup>
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  useSidebar,
} from "@/components/atoms/sidebar";
import Logo from "@/components/atoms/Logo.vue";
import {
  BellIcon,
  BookOpenIcon,
  ChevronLeft,
  ChevronRight,
  GiftIcon,
  GraduationCapIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  LockIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  MonitorIcon,
  Settings2Icon,
  SettingsIcon,
  UsersIcon,
} from "lucide-vue-next";
import { RouterLink, useRoute } from "vue-router";
import { cn } from "@/helpers/utils";
import Button from "@/components/atoms/button/Button.vue";
import { computed } from "vue";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboardIcon },
  { name: "User Management", href: "/user-management", icon: UsersIcon },
  { name: "Courses", href: "/courses", icon: BookOpenIcon },
  {
    name: "Resources & Onboarding",
    href: "/resources-onboarding",
    icon: GraduationCapIcon,
  },
  { name: "Classroom", href: "/classroom", icon: MonitorIcon },
  {
    name: "Discussion Forum",
    href: "/discussion-forum",
    icon: MessageSquareIcon,
  },
  { name: "Messages", href: "/messages", icon: MailIcon },
  { name: "Rewards", href: "/rewards", icon: GiftIcon },
  { name: "Integration", href: "/integration", icon: Settings2Icon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
  { name: "Support", href: "/support", icon: HelpCircleIcon },
];

const route = useRoute();

const isActive = (path = "") => route.path === path;

const { toggleSidebar, open, state } = useSidebar();
const isCollapsed = computed(() => state.value == "collapsed");

</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>
