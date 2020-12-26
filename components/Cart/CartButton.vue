<template>
    <client-only>
        <transition
            name="cart-button"
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
        >
            <div 
                v-show="!showCart" 
                class="fixed right-0 top-1/2"
            >
                <div 
                    @click.prevent="showCartContent"
                    class="px-2 py-3 bg-gradient-to-r from-teal-700 to-teal-500 rounded-l-md shadow-lg cursor-pointer"
                >
                    <div class="flex justify-center items-center">
                        <p class="text-white">
                            <svg class="w-4 h-4 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </p>
                        <p class="mx-1 text-white text-sm font-medium uppercase tracking-wide">{{ cartQuantity }}</p>
                        <p class="text-white text-xs font-medium uppercase tracking-wide">Items</p>
                    </div>
                    <div class="flex justify-center items-center mt-3 px-2 py-1 bg-white rounded">
                        <p class="text-gray-800">
                            <svg class="w-3 h-3 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </p>
                        <p class="ml-1 text-gray-800 font-semibold">{{ cartTotal }}</p>
                    </div>
                
                </div>
            </div>
        </transition>
    </client-only>
</template>

<script>
export default {
    computed: {
        cartQuantity() {
            return this.$store.getters['cart/cartTotalQuantity'];
        },
        cartTotal() {
            return this.$store.getters['cart/getTotal'];
        }, 
        showCart() {
            return this.$store.getters['cart/showCart'];
        }
    },
    methods: {
        showCartContent() {
            this.$store.commit('cart/SHOW_CART');
        }
    }
}
</script>
