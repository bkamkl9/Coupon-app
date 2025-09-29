<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
</script>

<template>
  <div class="min-h-screen">
    <HeaderBar />
    <main class="flex-1 bg-red-100 p-4 overflow-y-auto [height:calc(100vh-116px)]">
      <router-view />
    </main>
    <NavigationBar />
  </div>
</template>
