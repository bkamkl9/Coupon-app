<template>
    <UTable :data="props.coupons" :columns="columns" class="border border-slate-700 rounded-md" />
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

export type Coupon = {
    id: number
    status: 'active' | 'inactive' | 'scheduled' | 'hidden'
    title: string
    description: string
    image_url: string
    price: number
    code: string
    link: string
}

interface Props {
    coupons: Coupon[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
    edit: [id: number]
    toggleVisibility: [id: number]
    delete: [id: number]
}>()

const columns: TableColumn<Coupon>[] = [
    {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => `#${row.getValue('id')}`
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as 'active' | 'inactive' | 'scheduled' | 'hidden'
            const statusConfig = {
                active: { color: 'success' as const, text: 'Active' },
                inactive: { color: 'error' as const, text: 'Inactive' },
                scheduled: { color: 'warning' as const, text: 'Scheduled' },
                hidden: { color: 'neutral' as const, text: 'Hidden' }
            }

            const config = statusConfig[status]
            return h(UBadge, { class: 'capitalize', variant: 'subtle', color: config.color }, () => config.text)
        }
    },
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => {
            return h('div', { class: 'font-medium' }, row.getValue('title'))
        }
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.getValue('description') as string
            const truncated = description.length > 50 ? description.substring(0, 50) + '...' : description
            return h('div', { class: 'text-gray-600 text-sm' }, truncated)
        }
    },
    {
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => {
            return h('div', { class: 'font-mono bg-slate-800 px-2 py-1 rounded text-sm' }, row.getValue('code'))
        }
    },
    {
        accessorKey: 'price',
        header: () => h('div', { class: 'text-right' }, 'Price'),
        cell: ({ row }) => {
            const price = Number.parseFloat(row.getValue('price'))

            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(price)

            return h('div', { class: 'text-right font-medium' }, formatted)
        }
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const couponId = row.getValue('id') as number

            return h('div', { class: 'flex gap-2' }, [
                h(UButton, {
                    class: 'cursor-pointer',
                    size: 'xs',
                    variant: 'ghost',
                    color: 'blue',
                    icon: 'i-heroicons-pencil-square',
                    onClick: () => emit('edit', couponId)
                }),
                h(UButton, {
                    class: 'cursor-pointer',
                    size: 'xs',
                    variant: 'ghost',
                    color: 'yellow',
                    icon: row.getValue('status') === 'hidden' ? 'i-heroicons-eye' : 'i-heroicons-eye-slash',
                    onClick: () => emit('toggleVisibility', couponId)
                }),
                h(UButton, {
                    class: 'cursor-pointer',
                    size: 'xs',
                    variant: 'ghost',
                    color: 'red',
                    icon: 'i-heroicons-trash',
                    onClick: () => emit('delete', couponId)
                })
            ])
        }
    }
]
</script>
