<template>
  <div v-if="loading" class="flex justify-center items-center h-64">
    <div class="text-lg">Loading coupon...</div>
  </div>
  <div v-else-if="error" class="flex justify-center items-center h-64">
    <div class="text-lg text-red-500">{{ error }}</div>
  </div>
  <CouponEditor v-else v-model="coupon" mode="edit" @save="handleUpdate" />
</template>

<script setup lang="ts">
import CouponEditor from '@/components/CouponEditor.vue'
import type { Tables, TablesUpdate } from '@/types/db'
import { ref, onMounted } from 'vue'
import getSupabaseClient from '@/composables/useSupabase'
import { useRoute, useRouter } from 'vue-router'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const supabase = getSupabaseClient()

const coupon = ref<Tables<'Coupons'>>({
  id: '',
  status: 'in_active',
  title: '',
  description: null,
  link: '',
  code: '',
  image_url: null,
  currency: 'PLN',
  price: 0,
  scheduled_for: null,
  created_at: '',
})

const loading = ref(true)
const error = ref('')

async function loadCoupon() {
  try {
    const couponId = route.params.id as string

    if (!couponId) {
      error.value = 'Coupon ID is required'
      return
    }

    const { data, error: fetchError } = await supabase
      .from('Coupons')
      .select('*')
      .eq('id', couponId)
      .single()

    if (fetchError) {
      error.value = `Failed to load coupon: ${fetchError.message}`
    } else if (data) {
      coupon.value = data
    } else {
      error.value = 'Coupon not found'
    }
  } catch (err) {
    error.value = 'An unexpected error occurred while loading the coupon'
  } finally {
    loading.value = false
  }
}

async function handleUpdate() {
  try {
    const couponData: TablesUpdate<'Coupons'> = {
      title: coupon.value.title,
      description: coupon.value.description,
      link: coupon.value.link,
      code: coupon.value.code,
      image_url: coupon.value.image_url,
      currency: coupon.value.currency,
      price: coupon.value.price,
      scheduled_for: coupon.value.scheduled_for,
      status: coupon.value.status,
    }

    const { error: updateError } = await supabase
      .from('Coupons')
      .update(couponData)
      .eq('id', coupon.value.id)

    if (updateError) {
      toast.add({
        title: 'Error updating coupon',
        description: updateError.message,
        color: 'error',
      })
    } else {
      toast.add({
        title: 'Coupon updated successfully',
        color: 'success',
      })
      router.push('/coupons')
    }
  } catch (error) {
    toast.add({
      title: 'Error updating coupon',
      description: 'An unexpected error occurred',
      color: 'error',
    })
  }
}

onMounted(loadCoupon)
</script>
