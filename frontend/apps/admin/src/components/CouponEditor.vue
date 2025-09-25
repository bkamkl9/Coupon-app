<template>
  <div class="max-w-4xl">
    <div class="mx-auto flex gap-7">
      <UForm
        class="flex flex-col gap-4 flex-3 py-2"
        :state="formData"
        @submit="handleSubmit"
        :schema="schema"
      >
        <div class="flex gap-4">
          <UFormField label="Title" name="title" class="flex-4">
            <UInput class="w-full" v-model="formData.title" placeholder="Enter coupon title" />
          </UFormField>
          <UFormField label="Status" name="status" class="flex-1">
            <USelect
              class="w-full"
              v-model="formData.status"
              :items="statusOptions"
              placeholder="Enter coupon status"
            />
          </UFormField>
        </div>
        <UFormField label="Scheduled for" name="scheduled_for" class="flex-4">
          <UInput
            v-if="formData.status === 'scheduled'"
            class="w-full"
            v-model="formData.scheduled_for"
            placeholder="Enter coupon scheduled for"
            type="datetime-local"
          />
        </UFormField>
        <UFormField label="Description" name="description">
          <UTextarea
            class="w-full"
            v-model="formData.description"
            placeholder="Enter coupon description"
            autosize
            :rows="3"
          />
        </UFormField>
        <UFormField label="Link" name="link">
          <UInput class="w-full" v-model="formData.link" placeholder="Enter coupon link" />
        </UFormField>
        <UFormField label="Code" name="code">
          <UInput class="w-full" v-model="formData.code" placeholder="Enter coupon code" />
        </UFormField>
        <UFormField label="Image URL" name="image_url">
          <UInput
            class="w-full"
            v-model="formData.image_url"
            placeholder="Enter coupon image URL"
          />
        </UFormField>
        <div class="flex gap-4">
          <UFormField label="Price" name="price" class="flex-2">
            <UInputNumber
              class="w-full"
              v-model="priceComputed"
              placeholder="Enter coupon price"
              orientation="vertical"
              :step="0.01"
              :min="0.01"
              :format-options="{
                style: 'currency',
                currency: formData.currency,
                currencyDisplay: 'code',
                currencySign: 'accounting',
              }"
            />
          </UFormField>
          <UFormField label="Currency" name="currency" class="flex-1">
            <USelect
              class="w-full"
              v-model="formData.currency"
              :items="currencyOptions"
              placeholder="Enter coupon currency"
            />
          </UFormField>
        </div>
        <UButton class="mt-4 w-min whitespace-nowrap" size="xl" color="primary" type="submit">
          {{ mode === 'edit' ? 'Save Coupon' : 'Create Coupon' }}
        </UButton>
      </UForm>
      <div class="flex-1 border-l-slate-800 border-l pl-6 py-2" v-if="formData.image_url">
        <img
          :src="formData.image_url"
          alt="Coupon Image"
          class="w-full object-cover rounded-md border border-slate-700 bg-slate-800"
          style="aspect-ratio: 16 / 9"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { Tables } from '@/types/db'
import type { SelectItem } from '@nuxt/ui'
import { z } from 'zod'

const { mode = 'edit' } = defineProps<{
  mode?: 'edit' | 'create'
}>()

const emit = defineEmits<{
  (e: 'save'): void
}>()

const schema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    link: z.string().min(1),
    code: z.string().min(1),
    image_url: z.string().optional().nullable(),
    currency: z.string().min(1),
    price: z.number().min(0),
    scheduled_for: z.string().optional().nullable(),
    status: z.string().min(1),
    id: z.string().optional(),
  })
  .refine(
    (data) => {
      // If status is 'scheduled', scheduled_for must be a future datetime
      if (data.status === 'scheduled') {
        if (!data.scheduled_for) {
          return false // scheduled_for is required when status is scheduled
        }
        const scheduledDate = new Date(data.scheduled_for)
        const now = new Date()
        return scheduledDate > now // Must be in the future
      }
      return true // Valid for all other statuses
    },
    {
      message: "When status is 'scheduled', scheduled_for must be a valid future date and time",
      path: ['scheduled_for'], // Error will be shown on the scheduled_for field
    },
  )

const currencyOptions: SelectItem[] = [
  { label: 'United States Dollar', value: 'USD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'British Pound', value: 'GBP' },
  { label: 'Japanese Yen', value: 'JPY' },
  { label: 'Polish Zloty', value: 'PLN' },
]

const statusOptions: SelectItem[] = [
  { label: 'Active', value: 'active' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Active', value: 'in_active' },
]

const formData = defineModel<Tables<'Coupons'>>({
  required: true,
})

watch(
  () => formData.value.status,
  (newStatus) => {
    if (newStatus !== 'scheduled') {
      formData.value.scheduled_for = null
    }
  },
)

const priceComputed = computed({
  get: () => Number((formData.value.price / 100).toFixed(2)),
  set: (value) => {
    formData.value.price = Math.round(value * 100)
  },
})

function handleSubmit() {
  emit('save')
}
</script>
