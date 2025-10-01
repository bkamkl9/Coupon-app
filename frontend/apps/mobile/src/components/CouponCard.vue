<script setup lang="ts">
import CouponCode from './CouponCode.vue'
import CardFavouriteButton from './CardFavouriteButton.vue'
import CouponButton from './CouponButton.vue'
import type { Database } from '@/types/db'

type Coupon = Database['public']['Tables']['Coupons']['Row']
const props = defineProps<{
  coupon: Coupon
  isUpdatingFavourite: boolean
  isFavourite: boolean
  favouriteCount: number
}>()
const emit = defineEmits<{ (e: 'toggleFavourite', coupon: Coupon): void }>()
</script>

<template>
  <div class="bg-white rounded-lg p-4 flex flex-col justify-between gap-4 relative">
    <CardFavouriteButton
      :isFavourite="props.isFavourite"
      :numberFavourites="props.favouriteCount"
      @toggleFavourite="emit('toggleFavourite', props.coupon)"
      :isUpdatingFavourite="props.isUpdatingFavourite"
    />
    <div class="w-full h-48 bg-slate-200 rounded-lg" v-if="props.coupon.image_url">
      <img
        :src="props.coupon.image_url"
        alt="Coupon Image"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-bold">{{ props.coupon.title }}</h2>
      <p>Od {{ props.coupon.price }} {{ props.coupon.currency }} {{ props.coupon.description }}</p>
    </div>
    <div>
      <span class="text-sm text-slate-500">*Cena może się różnić</span>
      <div class="flex gap-4 mt-2">
        <CouponCode>{{ props.coupon.code }}</CouponCode>
      </div>
      <a :href="props.coupon.link" target="_blank" rel="noopener noreferrer">
        <CouponButton />
      </a>
      <span class="text-sm text-slate-500">Linki partnerskie • Ceny mogą się różnić</span>
    </div>
  </div>
</template>
