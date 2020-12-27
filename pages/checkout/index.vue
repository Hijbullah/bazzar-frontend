<template>
    <client-only>
        <div class="w-2/3 mx-auto">
            <div class="w-full flex py-16">
                <div class="w-2/3">
                    <div class="bg-white px-5 py-6 rounded shadow">
                        <h2 class="mb-8 text-center text-xl text-teal-600 font-semibold uppercase tracking-wider">Delivery Address</h2>
                        <div class="flex flex-col">
                            <div class="mb-5">
                                <input type="text" v-model="address.name" id="name" class="input-primary" placeholder="Name">
                                <p v-if="errors && errors.name" class="mt-2 text-sm text-red-500">{{ errors.name }}</p>
                            </div>

                            <div class="mb-5">
                                <input type="text" v-model="address.phone" id="phone" class="input-primary" placeholder="Phone Number">
                                <p v-if="errors && errors.phone" class="mt-2 text-sm text-red-500">{{ errors.phone }}</p>
                            </div>

                            <div class="mb-5">
                                <input type="text" v-model="address.city" id="city" class="input-primary" placeholder="City">
                                <p v-if="errors && errors.city" class="mt-2 text-sm text-red-500">{{ errors.city }}</p>
                            </div>
                            <div class="mb-5">
                                <textarea id="address" v-model="address.address" rows="4" class="input-primary" placeholder="Address"></textarea>
                                
                                <p class="mt-2 text-sm text-gray-400">
                                    e.g House No 73, Road 14, Block F, Bashundhara R/A, Dhaka - 1216
                                </p>
                                <p v-if="errors && errors.address" class="mt-2 text-sm text-red-500">{{ errors.address }}</p>
                            </div>
                        
                            <button @click.prevent="placeOrder" class="btn-primary justify-center px-4 py-2">
                                Confirm Address and Place Order
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div class="w-1/3 ml-8">
                    <h2 class="text-center text-teal-600 font-semibold uppercase tracking-wider">Your Order</h2>
                    <div class="mt-8">
                        <div class="max-h-96 px-3 pb-2 overflow-y-auto border-b">
                            <div v-for="item in cartContent.products" :key="item.id" class="flex justify-between items-center mb-4">
                                <div class="text-gray-500">{{ item.quantity }}</div>
                                <div class="w-1/2">
                                    <p class="text-gray-500 truncate">{{ item.name }}</p>
                                    <p class="mt-1 text-xs text-gray-500">Price: {{ item.price }}</p>
                                </div>
                                <div class="text-gray-500 font-medium">{{ item.price * item.quantity }}</div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div class="flex justify-between items-center">
                                <p class="text-gray-500">Subtotal:</p>
                                <p class="text-gray-500">{{ cartContent.subTotal }}</p>
                            </div>
                        
                            <div class="flex justify-between items-center">
                                <p class="text-gray-500">Delivery:</p>
                                <p class="text-gray-500">{{ cartContent.delivery }}</p>
                            </div>
                        
                            <div class="flex justify-between items-center mt-5">
                                <p class="text-gray-800 font-semibold">Total:</p>
                                <p class="text-gray-800 font-semibold">{{ cartContent.total }}</p>
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
                this.$store.dispatch('cart/clearCartContent');
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
