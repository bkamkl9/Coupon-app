<script setup lang="ts">
import CouponCode from './CouponCode.vue'
import CouponButton from './CouponButton.vue'
import type { Database } from '@/types/db'

const props = defineProps<{
  coupon: Database['public']['Tables']['Coupons']['Row']
}>()
</script>

<template>
  <div class="bg-white rounded-lg p-4 flex flex-col gap-4">
    <div class="w-full h-48 bg-slate-200 rounded-lg" v-if="coupon.image_url">
      <img
        :src="coupon.image_url"
        alt="Coupon Image"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-bold">{{ coupon.title }}</h2>
      <p>Od {{ coupon.price }} {{ coupon.currency }} {{ coupon.description }}</p>
    </div>
    <div>
      <span class="text-sm text-slate-500">*Cena może się różnić</span>
      <div class="flex gap-4 mt-2">
        <CouponCode>{{ coupon.code }}</CouponCode>
      </div>
      <a :href="coupon.link" target="_blank" rel="noopener noreferrer">
        <CouponButton />
      </a>
      <span class="text-sm text-slate-500">Linki partnerskie • Ceny mogą się różnić</span>
    </div>
  </div>
</template>
