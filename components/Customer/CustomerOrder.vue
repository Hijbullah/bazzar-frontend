<template>
     <div class="bg-white">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center px-3 py-2 border border-gray-300">
            <div>
                <p class="text-sm font-semibold">Order# <span class="text-teal-600">{{ order.orderCode }}</span></p>
                <p class="mt-1 text-sm text-gray-500">Order placed on <span>{{ order.orderDate }}</span></p>
            </div>
            <div class="mt-2 sm:mt-0">
                <p class="font-semibold text-sm uppercase tracking-wider">{{ order.orderStatus }}</p>
            </div>
            <button @click.prevent="toggleDetail" class="inline-flex items-center mt-2 sm:mt-0 text-teal-600 text-sm font-semibold focus:outline-none">
                {{ showDetail ? 'Hide' : 'Details' }}
            </button>
        </div>
        <lazy-customer-order-details v-if="showDetail" :order="order" />
    </div>
</template>

<script>
export default {
    props: {
        order: Object
    },
    data() {
        return {
            showDetail: false
        }
    },
    methods: {
        toggleDetail() {
            this.showDetail = !this.showDetail;
        }
    }
}
</script>
