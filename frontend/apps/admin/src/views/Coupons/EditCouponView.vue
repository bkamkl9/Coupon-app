<template>
  <CouponEditor v-model="coupon" @save="handleSave" />
</template>

<script setup lang="ts">
import CouponEditor from '@/components/CouponEditor.vue'
import type { Tables } from '@/types/db'
import { ref } from 'vue'

const toast = useToast()

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
})

function handleSave() {
  console.log('handleSave')
  toast.add({
    title: 'Coupon saved',
    color: 'success',
  })
}
</script>
