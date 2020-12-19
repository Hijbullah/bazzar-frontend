<template>
    <div class="mt-4">
        <h2 class="mb-4 text-2xl font-semibold text-center">Checkout</h2>
        <div v-if="cartEmpty" class="py-8 px-5 flex justify-center items-center">
            cart is empty. Buy some products first
        </div>
        <div v-else>
            <div class="w-2/3 mx-auto border px-4 py-6">
                <h2 class="mb-8 text-xl font-bold uppercase tracking-wider">Delivery Address</h2>
                <div v-if="$fetchState.pending">
                    loading...
                </div>
                <div v-else>
                    <div  v-if="addresses.length > 0">
                        <div v-for="address in addresses" :key="address.id" class="flex justify-between items-center px-3 py-2 border ">
                            <p>
                                {{ address.city }} 
                                <span class="text-xs">({{ address.address }})</span>
                            </p>
                            <button>edit</button>
                        </div>
                        <div class="flex justify-center items-center mt-4">
                            <button>Add New</button>
                        </div>
                    </div>
                    <div v-else class="flex flex-col space-y-3">
                        <div class="flex flex-col space-y-3">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" v-model="address.name" id="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <p v-if="errors && errors.name" class="mt-2 text-sm text-red-500">{{ errors.name[0] }}</p>
                            </div>
                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input type="text" v-model="address.phone" id="phone" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <p v-if="errors && errors.phone" class="mt-2 text-sm text-red-500">{{ errors.phone[0] }}</p>
                            </div>
                            <div>
                                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" v-model="address.city" id="city" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <p v-if="errors && errors.city" class="mt-2 text-sm text-red-500">{{ errors.city[0] }}</p>
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
                                <p v-if="errors && errors.address" class="mt-2 text-sm text-red-500">{{ errors.address[0] }}</p>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-center">
                                <button @click.prevent="addNewAddress" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Confirm Address and Place Order
                                </button>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        
            <div class="mt-8 text-center">
                <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Place Order
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            addresses: [],
            // selectedAddress: null,

            address: {
                name: this.$auth.user.name,
                mobile: '',
                city: '',
                address: ''
            },
            errors: null,
        }
    },
    async fetch() {
        this.addresses = await this.$axios.$get(`/addresses/${this.$auth.user.id}`);
    },

    computed: {
        cartEmpty() {
            return this.$store.getters['cart/getTotal'] <= 0;
        }
        // user() {
        //     return this.$store.getters.getUserInfo;
        // }
    },
    methods: {
        addNewAddress() {
            this.$axios.post(`/addresses/${this.$auth.user.id}/create`, this.address)
                .then(response => {
                    this.errors = null,
                    this.addresses.push(response.data);
                    
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                });
            // console.log(res);
            // this.$store.dispatch('addAddress', this.address);
            // console.log(this.address)
        }
    }
}
</script>
