<script setup lang="ts">
import CouponCard from '@/components/CouponCard.vue'
import getSupabaseClient from '@/composables/useSupabase'
import type { Database } from '@/types/db'
import { onMounted, ref, computed } from 'vue'
import useLocalStorageFavourite from '@/composables/useLocalStorageFavourite'

// Types
type Coupon = Database['public']['Tables']['Coupons']['Row']

const supabase = getSupabaseClient()
const { isFavourite, favourite, handleToggleFavourite, isUpdatingFavourite, getFavouriteCount } =
  useLocalStorageFavourite()

// Data
const favouriteCoupons = ref<Coupon[]>([])
const isLoading = ref(false)

// Computed
const hasFavourites = computed(() => favourite.value.length > 0)

// Hooks
onMounted(async () => {
  await fetchFavouriteCoupons()
})

// Functions
async function fetchFavouriteCoupons() {
  if (favourite.value.length === 0) {
    favouriteCoupons.value = []
    return
  }

  isLoading.value = true

  try {
    const { data, error } = await supabase
      .from('Coupons')
      .select('*')
      .in('id', favourite.value)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching favourite coupons:', error)
    } else {
      favouriteCoupons.value = data || []
    }
  } catch (error) {
    console.error('Error fetching favourite coupons:', error)
  } finally {
    isLoading.value = false
  }
}

function toggleFavourite(coupon: Coupon) {
  handleToggleFavourite(coupon)
  // Remove from local list if unfavourited
  if (!isFavourite(coupon.id)) {
    favouriteCoupons.value = favouriteCoupons.value.filter((c) => c.id !== coupon.id)
  }
}
</script>

<template>
  <div class="h-[calc(100vh-116px-32px)] overflow-y-auto p-4">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!hasFavourites"
      class="flex flex-col items-center justify-center p-8 text-center"
    >
      <div class="text-6xl mb-4">💔</div>
      <h2 class="text-xl font-bold text-gray-700 mb-2">Brak ulubionych kuponów</h2>
      <p class="text-gray-500 mb-6">Dodaj kupony do ulubionych, aby zobaczyć je tutaj</p>
      <router-link
        to="/"
        class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Przeglądaj kupony
      </router-link>
    </div>

    <!-- Favourite coupons -->
    <div v-else>
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Ulubione kupony</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="coupon in favouriteCoupons" :key="coupon.id">
          <CouponCard
            class="h-full"
            :coupon="coupon"
            :isFavourite="isFavourite(coupon.id)"
            :isUpdatingFavourite="isUpdatingFavourite(coupon.id)"
            :favouriteCount="getFavouriteCount(coupon)"
            @toggleFavourite="toggleFavourite"
          />
        </div>
      </div>
    </div>
  </div>
</template>
