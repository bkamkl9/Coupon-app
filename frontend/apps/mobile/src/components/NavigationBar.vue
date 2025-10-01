<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

function isActive(path: string) {
  return useRoute().path === path
}
</script>

<template>
  <nav class="bg-white w-full h-16 flex items-center justify-center">
    <ul class="flex items-center justify-around w-full user-select-none">
      <router-link to="/">
        <li class="flex flex-col items-center">
          <Icon
            class="w-6 h-6"
            icon="mdi:home"
            color-active="var(--color-active-500)"
            :style="{
              color: isActive('/') ? 'var(--color-active-500)' : 'var(--color-secondary-500)',
            }"
          />
          <span
            class="font-bold"
            :class="{ 'text-active-500': isActive('/'), 'text-secondary-500': !isActive('/') }"
            >Głowna</span
          >
        </li>
      </router-link>
      <router-link to="/favourite">
        <li class="flex flex-col items-center">
          <Icon
            class="w-6 h-6"
            icon="mdi:heart"
            :style="{
              color: isActive('/favourite')
                ? 'var(--color-active-500)'
                : 'var(--color-secondary-500)',
            }"
          />
          <span
            class="font-bold"
            :class="{
              'text-active-500': isActive('/favourite'),
              'text-secondary-500': !isActive('/favourite'),
            }"
            >Ulubione</span
          >
        </li>
      </router-link>
    </ul>
  </nav>
</template>
