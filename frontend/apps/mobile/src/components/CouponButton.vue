<script setup lang="ts">
import { useStats } from '@/composables/useStats'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{ link: string, coupon_id: string }>()
const isLinkLoading = ref(false)

async function handleButtonClick() {
  isLinkLoading.value = true
  const { error } = await useStats(props.coupon_id, 'coupon_click')
  if (error) {
    console.error('Error tracking coupon click:', error)
  }
  const link = document.createElement('a')
  link.href = props.link
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.click()
  isLinkLoading.value = false
}
</script>

<template>
  <button
    class="bg-[linear-gradient(90deg,_#fb923c,_#f97316)] text-white px-4 py-2 rounded-lg font-medium w-full mt-3 mb-1 flex items-center justify-center gap-2"
    @click="handleButtonClick"
  >
    <Icon class="w-6 h-6 animate-spin" icon="mdi:loading" v-if="isLinkLoading" />
    <span v-else>Przejdź do okazji</span>
  </button>
</template>
