<template>
    <div>
        <div class="w-2/3 mx-auto">
            <div class="w-full mt-8">
                <div class="text-center">
                    <h2 class="mb-4 text-xl font-bold uppercase tracking-wider">Confirmation</h2>
                    <p>Your order is currently Confirmed as cash on delivery. You can also <span>pay now</span> by choosing only of the following payment options.</p>
                </div>
                <div class="flex mt-6">
                    <div class="w-2/3 pr-8">
                        <h2 class="mb-8 text-xl font-bold uppercase tracking-wider">Payment Options</h2>
                        <div class="my-8 pl-8 space-y-3">
                            <!-- <div class="flex items-center">
                                <input id="cod" v-model="paymentMethod" value="cod" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                                <label for="cod" class="ml-3 block text-sm font-medium text-gray-700">
                                    Cash On Delivery (COD)
                                </label>
                            </div> -->
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
                            <!-- <div class="flex justify-between items-center pb-2 border-b-2">
                                <p class="text-sm font-semibold">Qty</p>
                                <p class="text-sm font-semibold">Product</p>
                                <p class="text-sm font-semibold">Price</p>
                            </div>
                            <div v-for="item in cartContent.products" :key="item.id" class="flex justify-between items-center py-2 border-b-2">
                                <div>{{ item.quantity }}</div>
                                <div class="text-xs w-40">
                                    <span class="block">{{ item.name }}</span>
                                    <span class="block mt-2">Price: {{ item.price }}</span>
                                </div>
                                <div class="text-xs">{{ item.price * item.quantity }}</div>
                            </div>
                            -->
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
