<template>
    <client-only>
        <div class="w-2/3 mx-auto">
            <div class="w-full flex py-8">
                <div class="w-2/3">
                    <template v-if="$fetchState.pending">
                        <div class="bg-white px-5 py-6 rounded shadow">
                            <content-placeholders>
                                <content-placeholders-heading />
                                <content-placeholders-text :lines="4" />
                            </content-placeholders>
                        </div>
                        <div class="mt-8 bg-white px-5 py-6 rounded shadow">
                             <content-placeholders>
                                <content-placeholders-heading />
                                <content-placeholders-text :lines="4" />
                            </content-placeholders>
                        </div>
                    </template>
                    <template v-else>
                        <div class="px-5 py-6 bg-white rounded shadow">
                            <div class="flex justify-between items-center py-2">
                                <h2 class="text-lg text-teal-600 font-semibold uppercase tracking-wider">Delivery Address</h2>
                                <button @click.prevent="openAddressModal" class="text-sm font-semibold text-gray-800 hover:text-teal-600 focus:outline-none">Add New Address</button>
                            </div>
                            <div class="flex flex-col mt-3">
                                <div 
                                    v-for="address in addresses" :key="address.id"
                                    class="group relative flex justify-between items-center mb-2 px-5 py-3 border rounded cursor-pointer"
                                    :class="selectedAddress.id == address.id ? 'border-teal-600' : 'border-gray-400'"
                                    @click.prevent="selectAddress(address)"
                                >
                                    <span 
                                        class="absolute top-0 left-0 text-teal-600"
                                        v-if="selectedAddress.id == address.id"
                                    >
                                        <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p class="text-sm font-semibold text-gray-800">{{ address.city }} </p>
                                        <p class="text-xs text-gray-500">{{ address.address }} </p>
                                    </div>
                                    <div class="opacity-0 group-hover:opacity-100">
                                        <button @click.stop.prevent="editAddress(address)" class="text-gray-500 hover:text-teal-600 focus:outline-none">
                                            <svg class="h-5 w-5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button @click.stop.prevent="deleteAddress(address.id)" class="text-gray-500 hover:text-red-600 focus:outline-none">
                                            <svg class="h-5 w-5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ModalAddress
                                @add-address="addedAddress"
                                @update-address="updatedAddress"
                            />
                        </div>

                        <div class="mt-8 px-5 py-6 bg-white rounded shadow">
                            <div class="py-2">
                                <h2 class="text-lg text-teal-600 font-semibold uppercase tracking-wider">Payment Option</h2>
                                <p class="text-sm text-gray-500">Select a Payment Option. Payment process will begain in the next page.</p>
                            </div>
                            <div class="flex flex-col mt-3 space-y-2">
                                <div 
                                    class="relative px-6 py-2 border rounded cursor-pointer"
                                    :class="selectedPaymentOption == option.code ? 'border-teal-600' : 'border-gray-400'"
                                    v-for="option in paymentOptions" 
                                    :key="option.code" 
                                    @click.prevent="selectedPaymentOption = option.code"
                                >
                                    <p class="text-gray-800 text-sm font-semibold tracking-wide">{{ option.name }}</p>
                                    <span 
                                        class="absolute top-0 left-0 text-teal-600"
                                        v-if="selectedPaymentOption == option.code"
                                    >
                                        <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-8 text-center">
                            <button @click.prevent="placeOrder" class="btn-primary px-5 py-2 uppercase tracking-wider">
                                Confirm and Place Order
                            </button>
                        </div>
                    </template>
                </div>
                <div class="w-1/3 ml-8">
                    <template v-if="$fetchState.pending">
                        <div>
                            <content-placeholders>
                                <content-placeholders-heading />
                                <content-placeholders-text :lines="5" />
                                <content-placeholders-heading />
                            </content-placeholders>
                        </div>
                    </template>
                    <template v-else>
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
                    </template>
                </div>
            </div>
        </div>
   </client-only>
</template>

<script>
export default {
    name: 'checkout',
    layout: 'checkout',
    middleware: 'auth',
  
    data() {
        return {
            paymentOptions: [
                {
                    code: 'cod',
                    name: 'Cash On Delivery'
                }
            ],
            addresses: [],
            selectedAddress: null,
            selectedPaymentOption: 'cod'
        }
    },

    async fetch() {
        const addresses = await this.$axios.$get(`/addresses/${this.$auth.user.id}`);
        this.addresses = addresses.data;
        this.selectedAddress = this.addresses.length ? this.addresses[0] : null;
    },

    computed: {
        cartContent() {
            return this.$store.getters['cart/getCartContents'];
        }
    },
    
    methods: {
        openAddressModal () {
            this.$modal.show('modal-address');
        },
        selectAddress(id) {
            this.selectedAddress = id;
        },
        addedAddress(address) {
            this.addresses.push(address);
            this.selectedAddress = address;
        },
        editAddress(address) {
            this.$modal.show('modal-address', { address: address });
        },
        updatedAddress(updatedAddress) {
            let address = this.addresses.find(address => address.id == updatedAddress.id);
            address.name = updatedAddress.name;
            address.phone = updatedAddress.phone;
            address.city = updatedAddress.city;
            address.address = updatedAddress.address;

            this.selectedAddress = address;
        },
        async deleteAddress(id) {
            try {
                const response = await this.$axios.delete(`/delete-address/${id}`);
                this.addresses = this.addresses.filter(address => address.id != id);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },

        async placeOrder() {
            try {
                const response = await this.$axios.post('/place-order', {
                    user: this.$auth.user.id,
                    address: this.selectedAddress,
                    order: this.cartContent,
                    paymentMethod: this.selectedPaymentOption
                });

                this.$store.dispatch('cart/clearCartContent');
                this.$router.push({ name: 'payment-order', params: { order: response.data.order_code }});
            } catch ({ response }) {
                console.log(response);
            }
        },
    },

    fetchOnServer: false
   
}
</script>
