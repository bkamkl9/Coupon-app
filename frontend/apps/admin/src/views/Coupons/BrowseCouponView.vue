<template>
  <CouponsTable :coupons="coupons" :loading="loading" @delete="deleteCoupon" @toggleVisibility="toggleVisibility"
    @edit="editCoupon" @onOverdue="onOverdue" />
  <UPagination class="mt-4" v-model:page="currentPage" :total="totalItems" :page-count="totalPages"
    :items-per-page="PAGE_SIZE" show-edges v-if="loading === false && totalPages > 1" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Tables } from '@/types/db'
import CouponsTable from '../../components/CouponsTable.vue'
import getSupabaseClient from '@/composables/useSupabase'
import { useRouter } from 'vue-router'

const PAGE_SIZE = 14

const router = useRouter()

const supabase = getSupabaseClient()
const coupons = ref<Tables<'Coupons'>[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalItems = ref(0)
const totalPages = ref(0)

async function fetchCoupons() {
  loading.value = true
  coupons.value = []

  const {
    data: couponsData,
    count: CountData,
    error: errorData,
  } = await supabase
    .from('Coupons')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE - 1)

  if (errorData || CountData === null) {
    loading.value = false
  } else {
    coupons.value = couponsData
    totalItems.value = CountData
    totalPages.value = Math.ceil(CountData / PAGE_SIZE)
    loading.value = false
  }
}

async function deleteCoupon(coupon: Tables<'Coupons'>) {
  const { error } = await supabase.from('Coupons').delete().eq('id', coupon.id)

  if (!error) {
    // Calculate new total after deletion
    const newTotal = totalItems.value - 1
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE)

    // If current page exceeds new total pages, go to last valid page
    if (currentPage.value > newTotalPages && newTotalPages > 0) {
      currentPage.value = newTotalPages
    }

    await fetchCoupons()
  }
}

async function onOverdue(coupon: Tables<'Coupons'>) {
  const idx = coupons.value.findIndex((c) => c.id === coupon.id)
  if (idx !== -1) {
    coupons.value[idx] = { ...coupons.value[idx], status: 'active' }
  }
}

async function toggleVisibility(coupon: Tables<'Coupons'>) {
  const { error } = await supabase
    .from('Coupons')
    .update({ status: coupon.status === 'active' ? 'in_active' : 'active', scheduled_for: null })
    .eq('id', coupon.id)

  if (!error) {
    const newStatus = coupon.status === 'active' ? 'in_active' : 'active'
    const idx = coupons.value.findIndex((c) => c.id === coupon.id)
    if (idx !== -1) {
      coupons.value[idx] = { ...coupons.value[idx], status: newStatus, scheduled_for: null, }
    }
  }
}

async function editCoupon(coupon: Tables<'Coupons'>) {
  router.push(`/coupons/edit/${coupon.id}`)
}

// Initial data load
const {
  data: couponsData,
  count: CountData,
  error: errorData,
} = await supabase
  .from('Coupons')
  .select('*', { count: 'exact' })
  .order('created_at', { ascending: false })
  .limit(PAGE_SIZE)

if (errorData || CountData === null) {
  loading.value = false
} else {
  coupons.value = couponsData
  totalItems.value = CountData
  totalPages.value = Math.ceil(CountData / PAGE_SIZE)
  loading.value = false
}

watch(currentPage, fetchCoupons)
</script>
