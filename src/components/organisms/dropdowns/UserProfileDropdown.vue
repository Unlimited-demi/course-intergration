<script setup>
import { ref } from "vue";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/atoms/dropdown-menu";
import { Button } from "@/components/atoms/button";
import { User, PlaySquare } from "lucide-vue-next";

const roles = [
  { id: "admin", label: "Administrator" },
  { id: "instructor", label: "Instructor" },
  { id: "learner", label: "Learner" },
];

const role = ref("admin");
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <slot v-if="$slots.trigger" name="trigger" />
      <Button v-else variant="outline">Switch Role</Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-[280px] mt-4">
      <div class="p-4 pb-2">
        <DropdownMenuLabel class="p-0">
          <h2 class="text-xl font-normal text-input-text">Switch role</h2>
        </DropdownMenuLabel>
      </div>

      <div class="p-4 pt-2">
        <RadioGroup v-model="role" class="gap-4">
          <div
            v-for="r in roles"
            :key="r.id"
            class="flex items-center space-x-3"
          >
            <RadioGroupItem
              :value="r.id"
              :id="r.id"
              class="h-5 w-5 border-2 border-gray-300 text-primary focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <label
              :for="r.id"
              class="text-base font-normal text-input-text cursor-pointer"
            >
              {{ r.label }}
            </label>
          </div>
        </RadioGroup>
      </div>

      <DropdownMenuSeparator />

      <div class="p-1">
        <DropdownMenuItem>
          <Button
            variant="ghost"
            class="w-full justify-start gap-3 px-3 font-normal text-input-text hover:text-gray-900"
          >
            <User class="h-4 w-4" />
            My Profile
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            class="w-full justify-start gap-3 px-3 font-normal text-input-text hover:text-gray-900"
          >
            <PlaySquare class="h-4 w-4" />
            Watch Demo
          </Button>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
