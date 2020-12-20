<template>
    <client-only>
        <div class="w-2/3 mx-auto">
            <div class="w-full flex mt-8">
                <div class="w-2/3 pr-8">
                    <h2 class="mb-8 text-xl font-bold uppercase tracking-wider">Delivery Address</h2>
                    <div class="flex flex-col space-y-3">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" v-model="address.name" id="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            <p v-if="errors && errors.name" class="mt-2 text-sm text-red-500">{{ errors.name }}</p>
                        </div>
                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input type="text" v-model="address.phone" id="phone" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            <p v-if="errors && errors.phone" class="mt-2 text-sm text-red-500">{{ errors.phone }}</p>
                        </div>
                        <div>
                            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                            <input type="text" v-model="address.city" id="city" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            <p v-if="errors && errors.city" class="mt-2 text-sm text-red-500">{{ errors.city }}</p>
                        </div>
                        <div>
                            <label for="address" class="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <div class="mt-1">
                                <textarea id="address" v-model="address.address" rows="4" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                            </div>
                            <p class="mt-2 text-sm text-gray-500">
                                e.g House No 73, Road 14, Block F, Bashundhara R/A, Dhaka - 1216
                            </p>
                            <p v-if="errors && errors.address" class="mt-2 text-sm text-red-500">{{ errors.address }}</p>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-center">
                            <button @click.prevent="placeOrder" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Confirm Address and Place Order
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-1/3">
                    <h2 class="mb-8 text-xl font-bold uppercase tracking-wider">Order Summery</h2>
                    <div class="border-4 p-5">
                        <div class="flex justify-between items-center pb-2 border-b-2">
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
                        <div class="mt-6">
                            <div class="flex justify-between items-center pb-2 border-b-2">
                                <div>Subtotal:</div>
                                <div>{{ cartContent.subTotal }}</div>
                            </div>
                        
                            <div class="flex justify-between items-center py-2 border-b-2">
                                <div>Delivery:</div>
                                <div>{{ cartContent.delivery }}</div>
                            </div>
                        
                            <div class="flex justify-between items-center">
                                <div>Total:</div>
                                <div>{{ cartContent.total }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </client-only>
</template>

<script>
export default {
    layout: 'checkout',
    middleware: 'auth',
    
    data() {
        return {
            address: {
                name: this.$auth.user.name,
                phone: '',
                city: '',
                address: ''
            },
            errors: null,
        }
    },
    computed: {
         cartContent() {
            return this.$store.getters['cart/getCartContents'];
        },
        cartEmpty() {
            return this.$store.getters['cart/getTotal'] <= 0;
        }
    },
    methods: {
        async placeOrder() {
            try {
                const response = await this.$axios.post('/place-order/', {
                    user: this.$auth.user.id,
                    address: this.address,
                    order: this.cartContent,
                });
                this.errors = null;
                this.$router.push(`/checkout/payment/${response.data}`);
            } catch (error) {

                const errors = error.response.data.errors;

                if(error.response.status === 422) {
                    this.errors = {
                        name: errors['address.name'] ? errors['address.name'][0] : null,
                        phone: errors['address.phone'] ? errors['address.phone'][0] : null,
                        city: errors['address.city'] ? errors['address.city'][0] : null,
                        address: errors['address.address'] ? errors['address.address'][0] : null
                    };
                }

                console.log(error.response);
            }
        }
    }
}
</script>
