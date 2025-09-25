<template>
  <UDashboardGroup>
    <UDashboardSidebar>
      <template #header>
        <h1 class="font-bold ml-4">Admin panel</h1>
      </template>
      <template #default="{ collapsed }">
        <UNavigationMenu :collapsed="collapsed" :items="navigationItems" orientation="vertical" />
      </template>
      <template #footer>
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          class="w-full cursor-pointer"
          @click="logout"
        >
          <UAvatar src="https://github.com/benjamincanac.png" />
          <div class="flex flex-col text-left overflow-hidden">
            <span class="ml-2 font-bold text-red-300">Logout</span>
            <span class="ml-2">{{ user?.email || 'User' }}</span>
          </div>
        </UButton>
      </template>
    </UDashboardSidebar>
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar :title="currentPageTitle" toggle-side="right" />
        <UDashboardToolbar v-if="shouldShowToolbar">
          <template #left>
            <UButton
              v-for="action in toolbarActions"
              :key="action.action"
              :icon="action.icon"
              :label="action.label"
              :to="action.to"
              variant="ghost"
              color="neutral"
              size="sm"
            />
          </template>
        </UDashboardToolbar>
      </template>
      <template #body>
        <Suspense>
          <RouterView />
          <template #fallback> Loading... </template>
        </Suspense>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { NavigationMenuItem } from '@nuxt/ui'
import { authMachine } from '@/machines/authMachine'

interface ToolbarAction {
  label: string
  icon: string
  action: string
  to?: string
}

interface RouteMeta {
  showToolbar?: boolean
  title?: string
  toolbarActions?: ToolbarAction[]
}

const route = useRoute()
const router = useRouter()

// Simple reactive state access
const user = computed(() => authMachine.reactive.user)

const navigationItems: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/dashboard',
  },
  {
    label: 'Coupons',
    icon: 'i-heroicons-ticket',
    to: '/coupons',
  },
  {
    label: 'Users',
    icon: 'i-heroicons-users',
    to: '/users',
  },
  {
    label: 'Statistics',
    icon: 'i-heroicons-chart-bar',
    to: '/stats',
  },
]

// Computed properties based on route metadata
const shouldShowToolbar = computed(() => {
  return route.meta?.showToolbar === true
})

const currentPageTitle = computed(() => {
  return (route.meta?.title as string) || (route.name as string) || 'Dashboard'
})

const toolbarActions = computed((): ToolbarAction[] => {
  const meta = route.meta as RouteMeta
  return meta?.toolbarActions || []
})

const logout = async () => {
  const result = await authMachine.AUTHENTICATED.signOut()

  if (result.success) {
    router.push('/login')
  }
}
</script>
