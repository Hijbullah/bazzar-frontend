<template>
    <div class="w-2/3 mx-auto">
        <div class="w-full py-10">
            <div class="px-12 py-8 bg-white rounded shadow">
                <h2 class="text-teal-600 text-lg font-bold uppercase tracking-wider">Order Received</h2>
                <p class="my-6 text-gray-500">Thank You! Your order has been received.</p>

                <div class="flex justify-between pt-2 pb-5">
                    <div>
                        <h4 class="text-gray-800 font-semibold tracking-wide">Order Number</h4>
                        <p class="mt-2 text-gray-500 text-sm font-medium">{{ order.order_code }}</p>
                    </div>
                    <div>
                        <h4 class="text-gray-800 font-semibold tracking-wide">Date</h4>
                        <p class="mt-2 text-gray-500 text-sm font-medium">{{ order.created_at }}</p>
                    </div>
                    <div>
                        <h4 class="text-gray-800 font-semibold tracking-wide">Total</h4>
                        <p class="mt-2 flex items-center text-gray-500 text-sm font-medium">
                            <svg class="w-4 h-4 mr-1 fill-current block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 4a1 1 0 000 2 1 1 0 011 1v1H7a1 1 0 000 2h1v3a3 3 0 106 0v-1a1 1 0 10-2 0v1a1 1 0 11-2 0v-3h3a1 1 0 100-2h-3V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                            </svg>
                            {{ order.total }}
                        </p>
                    </div>
                    <div>
                        <h4 class="text-gray-800 font-semibold tracking-wide">Payment Method</h4>
                        <p class="mt-2 text-gray-500 text-sm font-medium">Cash On Delivery</p>
                    </div>
                </div>
               
                <div class="flex mt-6">
                    <div class="w-2/3 pr-8">
                        <h2 class="mb-8 text-xl font-bold uppercase tracking-wider">Payment Options</h2>
                        <div class="my-8 pl-8 space-y-3">
                            <div class="flex items-center">
                                <input id="bkash" v-model="paymentMethod" value="bkash" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                                <label for="bkash" class="ml-3 block text-sm font-medium text-gray-700">
                                    Bkash
                                </label>
                            </div>
                        </div>
                        <div v-if="paymentMethod == 'bkash'" class="mx-8 my-8 p-6 bg-gray-200 rounded">
                            <p class="text-xl font-semibold">Bkash Merchant Number: 01858078583</p>
                            <p>Make payment to this number and Enter the transaction Id below: </p>
                            <div class="mt-6">
                                <input v-model="transactionId" type="text" id="phone" class="w-64 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Transaction ID">
                                <p v-if="errors && errors.transactionId" class="mt-2 text-sm text-red-500">{{ errors.transactionId[0] }}</p>
                            </div>
                            <div class="mt-5">
                                <button @click.prevent="makePayment">Make Payment</button>
                                <button class="ml-3" @click.prevent="paymentMethod = 'cod'">Cancel</button>
                            </div>
                        </div>
                        <div class="mt-2 pt-3 space-x-3 border-t-2">
                            <NuxtLink to="/customer/profile">Go to dashboard</NuxtLink>
                            <NuxtLink to="/">Return To Home</NuxtLink>
                            <NuxtLink :to="`/customer/orders/${order.order_code}`">Cancel Order</NuxtLink>
                        </div>
                    </div>
                    
                    <div class="w-1/3">
                        <h2 class="mb-8 text-xl font-bold uppercase tracking-wider">Order Summery</h2>
                        <div class="border-4 p-5">
                        
                            <div class="mt-6">
                                <div class="flex justify-between items-center pb-2 border-b-2">
                                    <div>Subtotal:</div>
                                    <div>{{ order.subtotal }}</div>
                                </div>
                            
                                <div class="flex justify-between items-center py-2 border-b-2">
                                    <div>Delivery:</div>
                                    <div>{{ order.delivery }}</div>
                                </div>
                            
                                <div class="flex justify-between items-center">
                                    <div>Total:</div>
                                    <div>{{ order.total }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'checkout',
    middleware: 'auth',
    // asyncData({ $axios, params, error }) {
    //     return $axios.$get(`/orders/${params.order_id}`)
    //     .then(res => {
    //         console.log(res.data);
    //     })
    //     .catch(err => {
    //         error({ statusCode: 404, message: 'This page could not be found' })
    //     });
    // },
    async asyncData({ params, $axios }) {
      const order = await $axios.$get(`/orders/${params.order}`);
      console.log(order);
      return { order }
    },
    data() {
        return {
            paymentMethod: 'cod',
            transactionId: null,
            errors: null,
        }
    },
    methods: {
        makePayment() {
            const data = {
                paymentMethod: this.paymentMethod,
                transactionId: this.transactionId,
            };

            this.$axios.$post(`/make-payment/${this.$route.params.order}`, data)
                .then(respone => {
                    console.log(respone);
                    this.$router.push('/customer/orders');
                })
                .catch(error => {
                    if(error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        //     const respone = await this.$axios.$post('/make-payment', data);
        //     console.log(respone);
        }, 

    },
    watch: {
        paymentMethod(newVal) {
            if(newVal == 'cod') {
                this.transactionId = null;
                this.errors = null;
            }
        }
    }
}
</script>
