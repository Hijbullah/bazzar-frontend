<template>
    <div class="mt-4">
        <h2 class="mb-4 text-2xl font-semibold text-center">Checkout - Make Payment</h2>
        <div class="w-2/3 mx-auto border px-4 py-6">
            <div>
                <p class="font-semibold">Select a Payment Option</p>
                <div class="my-8 pl-8 space-y-3">
                    <div class="flex items-center">
                        <input id="cod" v-model="paymentMethod" value="cod" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                        <label for="cod" class="ml-3 block text-sm font-medium text-gray-700">
                            Cash On Delivery (COD)
                        </label>
                    </div>
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
                        <!-- <p v-if="errors && errors.phone" class="mt-2 text-sm text-red-500">{{ errors.phone[0] }}</p> -->
                    </div>
                </div>
            </div>
            <div class="ml-8">
                <button @click.prevent="makePayment" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Confirm Payment
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // asyncData({ $axios, params, error }) {
    //     return $axios.$get(`/orders/${params.order_id}`)
    //     .then(res => {
    //         console.log(res.data);
    //     })
    //     .catch(err => {
    //         error({ statusCode: 404, message: 'This page could not be found' })
    //     });
    // },
    data() {
        return {
            paymentMethod: 'cod',
            transactionId: null
        }
    },
    methods: {
        makePayment() {
            const data = {
                paymentMethod: this.paymentMethod,
                transactionId: this.transactionId ? this.transactionId : null
            };

            this.$axios.$post('/make-payment', data)
                .then(respone => {
                    console.log(respone);
                })
                .catch(error => {
                    console.log(error);
                });
        //     const respone = await this.$axios.$post('/make-payment', data);
        //     console.log(respone);
        }
    },
    watch: {
        paymentMethod(newVal) {
            if(newVal == 'cod') {
                this.transactionId = null;
            }
        }
    }
}
</script>
