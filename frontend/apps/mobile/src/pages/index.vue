<script setup lang="ts">
import CouponCard from '@/components/CouponCard.vue'
import getSupabaseClient from '@/composables/useSupabase'
import type { Database } from '@/types/db'
import { onMounted, ref, nextTick, onUnmounted } from 'vue'

// Types
type Coupon = Database['public']['Tables']['Coupons']['Row']

// Constants
const PAGE_SIZE = 11

const supabase = getSupabaseClient()

// Data
const coupons = ref<Coupon[]>([])
const currentPage = ref(0)
const isLoading = ref(false)
const hasMoreData = ref(true)
let observer: IntersectionObserver | null = null

// Hooks
onMounted(async () => {
  await fetchCoupons()
  await nextTick()
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

function setupIntersectionObserver() {
  const sentinel = document.querySelector('#load-more-sentinel')
  if (!sentinel) return

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !isLoading.value && hasMoreData.value) {
        fetchCoupons()
      }
    },
    {
      rootMargin: '200px',
      threshold: 0.1,
    },
  )

  observer.observe(sentinel)
}

async function fetchCoupons() {
  if (isLoading.value || !hasMoreData.value) return

  isLoading.value = true

  const { data, error } = await supabase
    .from('Coupons')
    .select('*')
    .order('created_at', { ascending: false })
    .range(currentPage.value * PAGE_SIZE, (currentPage.value + 1) * PAGE_SIZE - 1)

  if (error) {
    console.error(error)
  } else {
    coupons.value = [...coupons.value, ...data]
    currentPage.value++

    // Check if we've reached the end of data
    if (!data || data.length < PAGE_SIZE) {
      hasMoreData.value = false
    }
  }

  isLoading.value = false
}
</script>

<template>
  <div class="h-[calc(100vh-116px-32px)] overflow-y-auto" id="coupon-container">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CouponCard v-for="coupon in coupons" :key="coupon.id" :coupon="coupon" />
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="flex justify-center items-center p-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>

    <!-- End of data message -->
    <div v-else-if="!hasMoreData && coupons.length > 0" class="text-center p-4 text-gray-500">
      To wszystko, co mamy
    </div>

    <!-- Empty state -->
    <div v-else-if="!hasMoreData && coupons.length === 0" class="text-center p-4 text-gray-500">
      Brak dostępnych kuponów
    </div>

    <!-- Sentinel element for intersection observer -->
    <div id="load-more-sentinel" class="h-1"></div>
  </div>
</template>
