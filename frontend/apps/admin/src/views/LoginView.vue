<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authMachine } from '@/machines/authMachine'

const router = useRouter()
const password = ref('')
const email = ref('')

// Simple reactive state access
const loading = computed(() => authMachine.reactive.loading)
const error = computed(() => authMachine.reactive.error)

async function handleLogin() {
  if (!email.value || !password.value) return

  const result = await authMachine.IDLE.signIn(email.value, password.value)

  if (result.success) {
    router.push('/dashboard')
  }
}

function clearError() {
  authMachine.global.clearError()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p class="text-gray-600">Sign in to admin panel</p>
      </div>

      <!-- Error Alert -->
      <UAlert
        v-if="error"
        icon="i-heroicons-exclamation-triangle"
        color="error"
        variant="soft"
        :title="error"
        :close-button="{
          icon: 'i-heroicons-x-mark-20-solid',
          color: 'gray',
          variant: 'link',
          padded: false,
        }"
        @close="clearError"
        class="mb-4"
      />

      <!-- Login Form -->
      <UCard class="mt-8">
        <template #header>
          <h2 class="text-xl font-semibold">Welcome back</h2>
        </template>

        <div class="space-y-6">
          <!-- Email Field -->
          <UFormGroup label="Email address" required>
            <UInput
              type="email"
              placeholder="Enter your email"
              icon="i-heroicons-envelope"
              size="lg"
              class="w-full mb-4"
              v-model="email"
              :disabled="loading"
            />
          </UFormGroup>

          <!-- Password Field -->
          <UFormGroup label="Password" required>
            <UInput
              type="password"
              placeholder="Enter your password"
              icon="i-heroicons-lock-closed"
              size="lg"
              class="w-full"
              v-model="password"
              :disabled="loading"
              @keyup.enter="handleLogin"
            />
          </UFormGroup>

          <!-- Submit Button -->
          <UButton
            color="primary"
            size="lg"
            block
            class="mt-6"
            @click="handleLogin"
            :loading="loading"
            :disabled="!email || !password"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
