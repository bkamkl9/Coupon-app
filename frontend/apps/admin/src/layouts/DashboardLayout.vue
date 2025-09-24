  <template>
    <UDashboardGroup>
      <UDashboardSidebar>
        <template #header>
          <h1 class="font-bold ml-4">Admin panel</h1>
        </template>
        <template #default="{ collapsed }">
          <UNavigationMenu :collapsed="collapsed" :items="navigationItems" orientation="vertical" />
        </template>
      </UDashboardSidebar>
      <UDashboardPanel>
        <template #header>
          <UDashboardNavbar title="Dashboard" toggle-side="right" />
        </template>
        <template #body>
          <RouterView />
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'



const navigationItems: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/dashboard'
  },
  {
    label: 'Coupons',
    icon: 'i-heroicons-ticket',
    to: '/coupons'
  },
  {
    label: 'Users',
    icon: 'i-heroicons-users',
    to: '/users'
  },
  {
    label: 'Statistics',
    icon: 'i-heroicons-chart-bar',
    to: '/stats'
  }
]
</script>
