<script setup>
import { Input } from '@/components/atoms/input';
import { cn } from '@/helpers/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <Input
    data-sidebar="input"
    :class="
      cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        props.class,
      )
    "
  >
    <slot />
  </Input>
</template>
