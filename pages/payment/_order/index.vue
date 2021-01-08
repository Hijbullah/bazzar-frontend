<template>
    <div class="md:w-3/4 lg:w-2/3 mx-auto">
        <div class="w-full py-6 md:py-10">
            <template v-if="$fetchState.pending">
                <div class="py-8 px-12 bg-white rounded shadow">
                    <content-placeholders>
                        <content-placeholders-heading />
                        <div class="my-8">
                            <content-placeholders-heading />
                        </div>
                        <content-placeholders-text :lines="5" />
                    </content-placeholders>
                </div>

            </template>

            <template v-else-if="$fetchState.error">
                <ErrorInline :error="$fetchState.error" />
            </template>
        
            <template v-else>
                <div class="px-12 py-8 md:bg-white md:rounded md:shadow">
                    <h2 class="text-teal-600 text-lg font-bold uppercase tracking-wider">Order Received</h2>
                    <p class="my-6 text-gray-500">Thank You! Your order has been received.</p>
                    <div class="flex flex-col md:flex-row md:justify-between pt-2 pb-5 space-y-6 md:space-y-0">
                        <div class="flex flex-col justify-center md:items-center">
                            <h4 class="text-gray-800 font-semibold tracking-wide">Order Code</h4>
                            <p class="mt-2 text-gray-500 text-sm font-medium">{{ order.orderCode }}</p>
                        </div>
                        <div class="flex flex-col justify-center md:items-center">
                            <h4 class="text-gray-800 font-semibold tracking-wide">Order Date</h4>
                            <p class="mt-2 text-gray-500 text-sm font-medium">{{ order.orderDate }}</p>
                        </div>
                        <div class="flex flex-col justify-center md:items-center">
                            <h4 class="text-gray-800 font-semibold tracking-wide">Total</h4>
                            <p class="mt-2 flex items-center text-gray-500 text-sm font-medium">
                                <svg class="w-4 h-4 mr-1 fill-current block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 4a1 1 0 000 2 1 1 0 011 1v1H7a1 1 0 000 2h1v3a3 3 0 106 0v-1a1 1 0 10-2 0v1a1 1 0 11-2 0v-3h3a1 1 0 100-2h-3V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                                </svg>
                                {{ order.total }}
                            </p>
                        </div>
                        <div class="flex flex-col justify-center md:items-center">
                            <h4 class="text-gray-800 font-semibold tracking-wide">Payment Method</h4>
                            <p class="mt-2 text-gray-500 text-sm font-medium">{{ paymentMethod }}</p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <NuxtLink class="btn-secondary mb-3 sm:mb-0 px-4 py-1 rounded-sm" :to="{ name: 'index' }">Back To Home</NuxtLink>
                        <NuxtLink class="btn-secondary md:ml-3 px-4 py-1 rounded-sm" :to="{ name: 'customer-order' }">Go To Orders</NuxtLink>
                    </div>
                </div>    
            </template>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'checkout',
    middleware: 'auth',
  
    data() {
        return {
            order: null,
        }
    },

    async fetch() {
        try {
            const order = await this.$axios.$get(`/get-order/${this.$route.params.order}`);
            this.order = order;
        } catch (error) {
            
            if (process.server) {
                this.$nuxt.context.res.statusCode = 404;
            }
            throw new Error('Sorry, Order Not Found!');
        }
    },

    computed: {
        paymentMethod() {
            return this.order.paymentMethod == 'cod' ? 'Cash On Delivery' : 'Bkash';
        }
    },

    fetchOnServer: false
}
</script>
