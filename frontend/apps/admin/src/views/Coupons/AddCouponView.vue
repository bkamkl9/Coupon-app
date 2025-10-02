<template>
  <CouponEditor v-model="coupon" mode="create" @save="handleCreate" />
</template>

<script setup lang="ts">
import CouponEditor from '@/components/CouponEditor.vue'
import type { Tables, TablesInsert } from '@/types/db'
import { ref } from 'vue'
import getSupabaseClient from '@/composables/useSupabase'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const supabase = getSupabaseClient()

const coupon = ref<Tables<'Coupons'>>({
  id: crypto.randomUUID(),
  status: 'in_active',
  title: '',
  description: null,
  link: '',
  code: '',
  image_url: null,
  currency: 'PLN',
  price: 0,
  scheduled_for: null,
  created_at: new Date().toISOString(),
  favourite_count: 0,
})

async function handleCreate() {
  try {
    const couponData: TablesInsert<'Coupons'> = {
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

    const { error } = await supabase.from('Coupons').insert(couponData)

    if (error) {
      toast.add({
        title: 'Error creating coupon',
        description: error.message,
        color: 'error',
      })
    } else {
      toast.add({
        title: 'Coupon created successfully',
        color: 'success',
      })
      router.push('/coupons')
    }
  } catch (error) {
    toast.add({
      title: 'Error creating coupon',
      description: 'An unexpected error occurred',
      color: 'error',
    })
  }
}
</script>
