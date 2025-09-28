<template>
  <span class="font-mono">
    {{ countdown }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Props & Emits
const props = defineProps<{ time: Date }>()

// State
let interval: NodeJS.Timeout
const countdown = ref('')

// Hooks
onMounted(() => { 
  countdown.value = calculateCountdown()

  interval = setInterval(() => {
    countdown.value = calculateCountdown()
  }, 1000)
})

// Methods
function calculateCountdown() {
  const timeDiff = props.time.getTime() - new Date().getTime()
  
  if (timeDiff <= 0) {
    clearInterval(interval)
    return "--"
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}
</script>
