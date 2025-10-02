import { onMounted, ref, watch } from 'vue'
import getSupabaseClient from './useSupabase'
import type { Database } from '@/types/db'
import { useStats } from '@/composables/useStats'

type Coupon = Database['public']['Tables']['Coupons']['Row']

export default function useLocalStorageFavourite() {
  const favourite = ref<string[]>([])
  const updatingCoupons = ref<Set<string>>(new Set())
  const localFavouriteCounts = ref<Map<string, number>>(new Map())
  const supabase = getSupabaseClient()

  watch(favourite, (newFavourite: string[]) => {
    localStorage.setItem('favourite', JSON.stringify(newFavourite))
  }, { deep: true })

  onMounted(() => {
    const storedFavourite = localStorage.getItem('favourite')
    if (storedFavourite) {
      favourite.value = JSON.parse(storedFavourite)
    }
  })

  function toggleFavourite(id: string) {
    if (favourite.value.includes(id)) {
      useStats(id, 'coupon_remove_from_favourite')
      favourite.value = favourite.value.filter((favId) => favId !== id)
    } else {
      useStats(id, 'coupon_add_to_favourite')
      favourite.value.push(id)
    }
  }

  function isFavourite(id: string) {
    return favourite.value.includes(id)
  }

  function isUpdatingFavourite(couponId: string) {
    return updatingCoupons.value.has(couponId)
  }

  function getFavouriteCount(coupon: Coupon) {
    // Return local count if we have it, otherwise return the original count
    return localFavouriteCounts.value.get(coupon.id) ?? coupon.favourite_count
  }

  function initializeFavouriteCount(coupon: Coupon) {
    // Initialize local count if not already set
    if (!localFavouriteCounts.value.has(coupon.id)) {
      localFavouriteCounts.value.set(coupon.id, coupon.favourite_count)
    }
  }

  async function handleToggleFavourite(coupon: Coupon) {
    updatingCoupons.value.add(coupon.id)
    
    // Initialize count if not already tracked
    initializeFavouriteCount(coupon)
    
    const wasAlreadyFavourite = isFavourite(coupon.id)
    const currentCount = localFavouriteCounts.value.get(coupon.id) ?? coupon.favourite_count
    
    // Optimistically update both favourite state and count
    toggleFavourite(coupon.id)
    const newCount = wasAlreadyFavourite ? currentCount - 1 : currentCount + 1
    localFavouriteCounts.value.set(coupon.id, Math.max(0, newCount)) // Ensure count doesn't go below 0
    
    try {
      // Create promises for both the API call and minimum delay
      const apiCall = supabase.rpc('update_favourite_count', {
        p_coupon_id: coupon.id,
        p_action: wasAlreadyFavourite ? 'decrement' : 'increment',
      })
      
      const minDelay = new Promise(resolve => setTimeout(resolve, 200))
      
      // Wait for both the API call and minimum delay to complete
      await Promise.all([apiCall, minDelay])
    } catch (error) {
      // Rollback both favourite state and count if the API call fails
      toggleFavourite(coupon.id)
      localFavouriteCounts.value.set(coupon.id, currentCount)
      console.error('Failed to update favourite count:', error)
    } finally {
      updatingCoupons.value.delete(coupon.id)
    }
  }

  return {
    favourite,
    isUpdatingFavourite,
    toggleFavourite,
    isFavourite,
    handleToggleFavourite,
    getFavouriteCount,
    initializeFavouriteCount,
  }
}