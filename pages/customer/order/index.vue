<template>
    <div>
        <h2 class="mb-5 text-lg text-gray-600 font-bold uppercase tracking-widest">My Orders</h2>
        <div class="space-y-8">
            <div class="bg-white" 
                v-for="order in orders" :key="order.orderCode"
            >
                <div class="flex justify-between items-center px-3 py-2 border border-gray-300">
                    <div>
                        <p class="text-sm font-semibold">Order# <span class="text-teal-600">{{ order.orderCode }}</span></p>
                        <p class="mt-1 text-sm text-gray-500">Order placed on <span>{{ order.orderDate }}</span></p>
                    </div>
                    <div>
                        <p class="font-semibold text-sm uppercase tracking-wider">{{ order.orderStatus }}</p>
                    </div>
                </div>
                
                <div class="flex items-center border border-t-0 border-gray-300">
                    <div class="w-1/2 px-4 py-3 text-sm border-r border-gray-300">
                        <h4 class="font-semibold mb-3">Delivery Address</h4>
                        <p class="text-gray-500">{{ order.deliveryAddress.name }}</p>
                        <p class="text-gray-500">{{ order.deliveryAddress.phone }}</p>
                        <p class="text-gray-500">{{ order.deliveryAddress.city }}</p>
                        <p class="text-gray-500">{{ order.deliveryAddress.address }}</p> 
                    </div>
                    <div class="w-1/2 px-4 py-3 space-y-3 text-sm">
                        <div class="flex justify-between items-center text-gray-500">
                            <h4>Sub Total</h4>
                            <p>{{ order.orderSummery.subTotal }}</p>
                        </div>
                        <div class="flex justify-between items-center text-gray-500">
                            <h4>Delivery</h4>
                            <p>{{ order.orderSummery.delivery }}</p>
                        </div>
                        <div class="flex justify-between items-center font-semibold">
                            <h4>Total</h4>
                            <p>{{ order.orderSummery.totalPrice }}</p>
                        </div>
                    </div>
                </div>
                <div class="border border-t-0 border-b-0 border-gray-300 text-sm">
                    <div class="flex justify-between items-center px-4 py-3 border-b border-gray-300"
                        v-for="product in order.products" 
                        :key="product.id"
                    >
                        <div class="w-1/2 flex items-center">
                            <div class="w-16 h-16 overflow-hidden">
                                <img class="w-full h-full object-cover" :src="product.image" :alt="product.name">
                            </div>
                            <p class="ml-6 flex-1">{{ product.name }}</p>
                        </div>
                        <p>Qty: {{ product.quantity }}</p>
                        <p>{{ product.price }}</p>
                    </div>
                </div>
            </div>
            
        </div>    
    </div>
</template>

<script>
export default {
    layout: 'customer',

    data() {
        return {
            orders: [],
        }
    },
    
    async fetch() {
        const { data } = await this.$axios.$get(`/get-orders/${this.$auth.user.id}`);
        this.orders = data;
    },

    fetchOnServer: false
}
</script>
