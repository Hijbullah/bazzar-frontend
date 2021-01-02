<template>
    <div class="flex">
        <template v-if="$fetchState.pending">
            <div class="w-1/3">
                <h2 class="mb-5 text-xl font-bold uppercase tracking-widest">My orders</h2>
                <content-placeholders>
                    <content-placeholders-heading />
                    <div class="my-8">
                        <content-placeholders-text :lines="5" />
                    </div>
                    <content-placeholders-heading />
                    <content-placeholders-text :lines="3" />
                </content-placeholders>
            </div>
            <div class="w-2/3 px-6 pt-10">
                <content-placeholders>
                    <content-placeholders-heading />
                    <content-placeholders-text :lines="8" />
                    <content-placeholders-heading />
                </content-placeholders>
            </div>
        </template>
        <template v-else>
            <template v-if="!orders.length">
                <div class="mr-8 w-full">
                    <ErrorInline :error="{message: 'No Order Found!'}" />
                </div>
            </template>

            <template v-else>
                <div class="w-1/3">
                    <h2 class="text-xl font-bold uppercase tracking-widest">My orders</h2>
                    <div class="h-96 mt-5 space-y-3 overflow-y-auto">
                        <div class="px-4 py-3 bg-white border rounded cursor-pointer"
                            v-for="order in orders" 
                            :key="order.order_code"
                            :class="selectedOrder.orderCode === order.orderCode ? 'border-teal-600' : 'border-gray-300'"
                            @click="selectOrder(order)"
                        >
                            <div class="flex justify-between items-center mb-5">
                                <p class="font-semibold">Order# {{ order.orderCode }}</p>
                                <p class="text-sm font-semibold uppercase tracking-wider">{{ order.orderStatus }}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <p class="text-sm text-gray-500">Order Date</p>
                                <p class="text-sm text-gray-500">{{ order.orderDate }}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <p class="text-sm text-gray-500 font-semibold">Total</p>
                                <p class="mt-2 text-sm text-gray-500 font-semibold">{{ order.orderSummery.totalPrice }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-2/3 px-6">
                    <h2 class="text-xl font-bold uppercase tracking-widest">Order Details</h2>
                    <div class="mt-5 bg-white">
                        <div class="flex items-center border border-gray-300">
                            <div class="w-1/2 px-4 py-3 border-r border-gray-300">
                                <h4 class="font-semibold mb-3">Delivery Address</h4>
                                <p class="text-gray-500">{{ selectedOrder.deliveryAddress.name }}</p>
                                <p class="text-gray-500">{{ selectedOrder.deliveryAddress.phone }}</p>
                                <p class="text-gray-500">{{ selectedOrder.deliveryAddress.city }}</p>
                                <p class="text-gray-500">{{ selectedOrder.deliveryAddress.address }}</p> 
                            </div>
                            <div class="w-1/2 px-4 py-3 space-y-3">
                                <div class="flex justify-between items-center text-gray-500">
                                    <h4>Sub Total</h4>
                                    <p>{{ selectedOrder.orderSummery.subTotal }}</p>
                                </div>
                                <div class="flex justify-between items-center text-gray-500">
                                    <h4>Delivery</h4>
                                    <p>{{ selectedOrder.orderSummery.delivery }}</p>
                                </div>
                                <div class="flex justify-between items-center font-semibold">
                                    <h4>Total</h4>
                                    <p>{{ selectedOrder.orderSummery.totalPrice }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="border border-t-0 border-gray-300">
                            <div class="flex items-center px-4 py-1 text-center border-b border-gray-300">
                                <p class="w-2/3 text-gray-600 font-semibold">Item</p>
                                <p class="w-1/3 text-gray-600 font-semibold">Qty</p>
                                <p class="w-1/3 text-gray-600 font-semibold">Price</p>
                            </div>
                            <div class="flex items-center px-4 py-3 text-center border-b border-gray-300"
                                v-for="product in selectedOrder.products" 
                                :key="product.id"
                            >
                                <h3 class="w-2/3 truncate">{{ product.name }}</h3>
                                <p class="w-1/3">{{ product.quantity }}</p>
                                <p class="w-1/3">{{ product.price }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    layout: 'customer',

    data() {
        return {
            orders: [],
            selectedOrder: null,
        }
    },
    
    async fetch() {
        const { data } = await this.$axios.$get(`/get-orders/${this.$auth.user.id}`);
        this.orders = data;
        this.selectedOrder = this.orders.length ? this.orders[0] : null;
    },

    methods: {
        selectOrder(order) {
            this.selectedOrder = order;
        }
    },

    fetchOnServer: false
}
</script>
