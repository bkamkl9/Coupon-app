<template>
  <UTable :data="props.coupons" :columns="columns" class="border border-slate-700 rounded-md" />
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { TableRow } from '@nuxt/ui/components/Table.vue.d.ts'
import type { Tables } from '@/types/db'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy: ', err)
    return false
  }
}

interface Props {
  coupons: Tables<'Coupons'>[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [coupon: Tables<'Coupons'>]
  toggleVisibility: [coupon: Tables<'Coupons'>]
  delete: [coupon: Tables<'Coupons'>]
}>()

function getRowItems(row: TableRow<Tables<'Coupons'>>) {
  const couponId = row.original.id
  const status = row.original.status
  const code = row.original.code

  return [
    {
      type: 'label',
      label: 'Actions',
    },
    {
      label: 'Copy coupon code',
      icon: 'i-heroicons-clipboard-document',
      async onSelect() {
        const success = await copyToClipboard(code)
        if (success) {
          toast.add({
            title: 'Coupon code copied to clipboard!',
            color: 'success',
            icon: 'i-heroicons-check-circle',
          })
        } else {
          toast.add({
            title: 'Failed to copy coupon code',
            color: 'error',
            icon: 'i-heroicons-x-circle',
          })
        }
      },
    },
    {
      label: 'Copy coupon ID',
      icon: 'i-heroicons-hashtag',
      async onSelect() {
        const success = await copyToClipboard(couponId.toString())
        if (success) {
          toast.add({
            title: 'Coupon ID copied to clipboard!',
            color: 'success',
            icon: 'i-heroicons-check-circle',
          })
        } else {
          toast.add({
            title: 'Failed to copy coupon ID',
            color: 'error',
            icon: 'i-heroicons-x-circle',
          })
        }
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Edit coupon',
      icon: 'i-heroicons-pencil-square',
      onSelect() {
        emit('edit', row.original)
      },
    },
    {
      label: status === 'active' ? 'Deactivate coupon' : 'Activate coupon',
      icon: status === 'active' ? 'i-heroicons-eye-slash' : 'i-heroicons-eye',
      onSelect() {
        emit('toggleVisibility', row.original)
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Delete coupon',
      icon: 'i-heroicons-trash',
      onSelect() {
        emit('delete', row.original)
      },
    },
  ]
}

const columns: TableColumn<Tables<'Coupons'>>[] = [
  {
    accessorKey: 'id',
    header: 'Unique ID',
    cell: ({ row }) => `${row.getValue('id')}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as 'active' | 'in_active' | 'scheduled'
      const statusConfig = {
        active: { color: 'success' as const, text: 'Active' },
        in_active: { color: 'error' as const, text: 'Inactive' },
        scheduled: { color: 'warning' as const, text: 'Scheduled' },
      }

      const config = statusConfig[status]
      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color: config.color },
        () => config.text,
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.getValue('title') as string
      const truncated = title.length > 20 ? title.substring(0, 20) + '...' : title
      return h('div', { class: 'font-medium' }, truncated)
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string
      const truncated = description.length > 10 ? description.substring(0, 10) + '...' : description
      return h('div', { class: 'text-gray-600 text-sm' }, truncated)
    },
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const link = row.getValue('link') as string
      const truncated = link.length > 10 ? link.substring(0, 10) + '...' : link
      return h('div', { class: 'text-gray-600 text-sm' }, truncated)
    },
  },
  {
    accessorKey: 'image_url',
    header: 'Image',
    cell: ({ row }) => {
      const image_url = row.getValue('image_url') as string
      const truncated = image_url.length > 10 ? image_url.substring(0, 10) + '...' : image_url
      return h('div', { class: 'text-gray-600 text-sm' }, truncated)
    },
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'font-mono bg-slate-800 px-2 py-1 rounded text-sm' },
        row.getValue('code'),
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: 'text-right' }, 'Price'),
    cell: ({ row }) => {
      const price = Number.parseInt(row.getValue('price')) / 100
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: row.original.currency,
      }).format(price)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Actions'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-heroicons-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              size: 'xs',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      )
    },
  },
]
</script>
