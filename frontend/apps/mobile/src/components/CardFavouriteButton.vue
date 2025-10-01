<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  isFavourite: boolean
  numberFavourites: number
}>()

const emit = defineEmits<{
  (e: 'toggleFavourite'): void
}>()

function toggleFavourite() {
  emit('toggleFavourite')
}
</script>

<template>
  <button
    class="absolute top-6 right-6 rounded-full bg-white p-2 flex items-center gap-2 text-gray-500 cursor-pointer"
    @click="toggleFavourite"
  >
    <Icon class="w-6 h-6" icon="mdi:heart" v-if="isFavourite" />
    <Icon class="w-6 h-6" icon="mdi:heart-outline" v-else />
    <span>{{ numberFavourites }}</span>
  </button>
</template>
