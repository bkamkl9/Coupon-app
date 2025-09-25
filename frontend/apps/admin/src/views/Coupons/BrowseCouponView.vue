<template>
  <CouponsTable :coupons="coupons" :loading="loading" />
  <UPagination
    class="mt-4"
    v-model:page="currentPage"
    :total="totalPages"
    :items-per-page="PAGE_SIZE"
    show-edges
    v-if="loading === false && totalPages > 1"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Tables } from '@/types/db'
import CouponsTable from '../../components/CouponsTable.vue'
import getSupabaseClient from '@/composables/useSupabase'

const PAGE_SIZE = 16

const supabase = getSupabaseClient()
const coupons = ref<Tables<'Coupons'>[]>([])
const loading = ref(true)
const currentPage = ref(1)
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
    .limit(PAGE_SIZE)
    .range((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE - 1)

  if (errorData || CountData === null) {
    loading.value = false
  } else {
    coupons.value = couponsData
    totalPages.value = CountData
    loading.value = false
  }
}

const {
  data: couponsData,
  count: CountData,
  error: errorData,
} = await supabase.from('Coupons').select('*', { count: 'exact' }).limit(PAGE_SIZE)

if (errorData || CountData === null) {
  loading.value = false
} else {
  coupons.value = couponsData
  totalPages.value = CountData
  loading.value = false
}

watch(currentPage, fetchCoupons)
</script>
