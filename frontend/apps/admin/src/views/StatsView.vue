<template>
  <div class="space-y-6">
    <!-- General Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-chart-bar" class="text-blue-500" />
            <h3 class="text-lg font-semibold">Total Events</h3>
          </div>
        </template>
        <div class="text-3xl font-bold text-blue-600">{{ totalNumberOfEvents }}</div>
        <p class="text-sm text-gray-600">All time events</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-tag" class="text-green-500" />
            <h3 class="text-lg font-semibold">Active Coupons</h3>
          </div>
        </template>
        <div class="text-3xl font-bold text-green-600">{{ totalNumberOfActiveCoupons }}</div>
        <p class="text-sm text-gray-600">Currently active</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-heart" class="text-red-500" />
            <h3 class="text-lg font-semibold">Total Favorites</h3>
          </div>
        </template>
        <div class="text-3xl font-bold text-red-600">{{ totalNumberOfFavorites }}</div>
        <p class="text-sm text-gray-600">All time favorites</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-calendar" class="text-purple-500" />
            <h3 class="text-lg font-semibold">Events last 24h</h3>
          </div>
        </template>
        <div class="text-3xl font-bold text-purple-600">{{ totalNumberOfEventsToday }}</div>
        <p class="text-sm text-gray-600">Events in last 24h</p>
      </UCard>
    </div>

    <!-- Per-Coupon Stats -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-table-cells" class="text-orange-500" />
            <h3 class="text-lg font-semibold">Coupon Statistics</h3>
          </div>
          <div class="flex items-center gap-2">
            <UInput
              v-model="search"
              placeholder="Search by coupon title..."
              icon="i-heroicons-magnifying-glass"
              class="w-64"
            />
          </div>
        </div>
      </template>

      <div class="text-center py-8 text-gray-500 flex flex-col items-center justify-center" v-if="coupons.length === 0">
        <UIcon name="i-heroicons-chart-bar-square" class="text-4xl text-gray-300 mb-2" />
        <p>No statistics available</p>
        <p class="text-sm">Events will appear here when users interact with coupons</p>
      </div>
      <UTable :data="coupons" :columns="columns" class="border border-slate-700 rounded-md">
        
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import getSupabaseClient from '@/composables/useSupabase'
import { ref, onMounted, h, watch } from 'vue'
import type { Tables } from '@/types/db'
import { resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const supabase = getSupabaseClient()

type CouponsWithStats = Tables<'Coupons'> & { stats: Tables<'Stats'>[] }

// Consts
const UBadge = resolveComponent('UBadge')
const columns: TableColumn<CouponsWithStats>[] = [
  {
    accessorKey: 'image_url',
    header: 'Thumbnail',
    cell: ({ row }) => {
      const image_url = row.getValue('image_url') as string
      return h('img', { src: image_url, class: 'w-20 h-10 rounded-sm object-cover cursor-pointer' })
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'favourite_count',
    header: 'Favourite Count',
    cell: ({ row }) => { 
      return h(UBadge, { color: 'neutral' }, row.original.favourite_count)
    },
  },
  {
    header: 'Total clicks',
    cell: ({ row }) => {
      const totalClicks = row.original.stats.reduce((acc, stat) => acc + (stat.event_type === 'coupon_click' ? 1 : 0), 0)
      return h(UBadge, { color: 'neutral' }, totalClicks)
    },
  }
]

// Data
const search = ref('')
const totalNumberOfEvents = ref(0)
const totalNumberOfActiveCoupons = ref(0)
const totalNumberOfFavorites = ref(0)
const totalNumberOfEventsToday = ref(0)
const coupons = ref<CouponsWithStats[]>([])

// Methods

async function fetchTotalNumberOfEvents() {
  const { count, error, data } = await supabase.from('Stats').select('', { count: 'exact', head: true })
  if (error || count === null) return
  totalNumberOfEvents.value = count
}

async function fetchTotalNumberOfActiveCoupons() {
  const { count, error, data } = await supabase.from('Coupons').select('', { count: 'exact', head: true }).eq('status', 'active')
  if (error || count === null) return
  totalNumberOfActiveCoupons.value = count
}

async function fetchTotalNumberOfFavorites() {
  // Optimized: Let the database do the aggregation
  const { data, error } = await supabase
    .from('Coupons')
    .select('favourite_count.sum()').single()
  
    if (error || data === null) return

    totalNumberOfFavorites.value = data.sum
}

async function fetchTotalNumberOfEventsToday() {
  const now = new Date()
  const time24hAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
  const timeNow = now.toISOString()
  const { count, error, data } = await supabase
    .from('Stats')
    .select('', { count: 'exact', head: true })
    .gte('time', time24hAgo)
    .lte('time', timeNow)
  if (error || count === null) return
  totalNumberOfEventsToday.value = count
}

async function fetchCoupons(search: string) {
  const { data: couponsData} = await supabase.from('Coupons').select('*, stats:Stats(*)').limit(7).ilike('title', `%${search}%`)
  if (couponsData === null) return
  coupons.value = couponsData as CouponsWithStats[]
}

watch(search, () => fetchCoupons(search.value))

// Hooks
onMounted(() => {
  fetchTotalNumberOfEvents()
  fetchTotalNumberOfActiveCoupons()
  fetchTotalNumberOfFavorites()
  fetchTotalNumberOfEventsToday()
  fetchCoupons('')
})
</script>
