<script setup lang="ts">
import { registerPush } from '@/composables/usePushNotifications'
import { onMounted } from 'vue'

onMounted(() => {
  registerPush()
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
