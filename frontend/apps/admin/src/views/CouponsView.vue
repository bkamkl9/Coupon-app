<template>
  <div>
    <CouponsTable :coupons="coupons" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CouponsTable, { type Coupon } from '../components/CouponsTable.vue'

const coupons = ref<Coupon[]>([
  {
    id: 1,
    status: 'active',
    title: "Aliexpress code",
    description: "Get amazing deals on electronics, fashion, home goods and more with this exclusive Aliexpress coupon code. Valid for orders over $50 and includes free shipping worldwide.",
    image_url: "https://www.google.com",
    price: 15.00,
    code: "123456678",
    link: "https://www.aliexpress.com",
  },
  {
    id: 2,
    status: 'active',
    title: "Amazon Discount",
    description: "Save 10% on your entire Amazon order with this limited-time discount code. Perfect for books, electronics, household items and more. Minimum purchase required.",
    image_url: "https://www.amazon.com/logo.png",
    price: 10.00,
    code: "AMZ10OFF",
    link: "https://www.amazon.com",
  },
  {
    id: 3,
    status: 'inactive',
    title: "eBay Special",
    description: "Instant $5 savings on your next eBay purchase when you use this special promotional code. Great for collectibles, vintage items, electronics and everyday essentials.",
    image_url: "https://www.ebay.com/logo.png",
    price: 5.00,
    code: "EBAY5SAVE",
    link: "https://www.ebay.com",
  },
  {
    id: 4,
    status: 'scheduled',
    title: "Walmart Deal",
    description: "Enjoy 15% savings on groceries, clothing, electronics and home essentials at Walmart stores nationwide. Cannot be combined with other offers and excludes gift cards.",
    image_url: "https://www.walmart.com/logo.png",
    price: 15.00,
    code: "WALMART15",
    link: "https://www.walmart.com",
  },
  {
    id: 5,
    status: 'hidden',
    title: "Walmart Deal",
    description: "15% off at Walmart",
    image_url: "https://www.walmart.com/logo.png",
    price: 15.00,
    code: "WALMART15",
    link: "https://www.walmart.com",
  },
  {
    id: 6,
    status: 'active',
    title: "Amazon Discount",
    description: "10% off on Amazon orders",
    image_url: "https://www.amazon.com/logo.png",
    price: 10.00,
    code: "AMZ10OFF",
    link: "https://www.amazon.com",
  },
])
</script>
