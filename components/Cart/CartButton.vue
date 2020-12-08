<template>
    <div class="fixed right-0 top-1/2">
        <div @click="showCartDetails" class="flex flex-col justify-center items-center p-1 bg-gray-400 opacity-90 cursor-pointer">
            <svg class="w-6 h-6 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <div class="mt-1 flex items-center text-yellow-300">
                <span class="block text-xs font-semibold tracking-wider uppercase">{{ cartQuantity }}</span>
                <span class="block text-xs font-semibold tracking-wider uppercase ml-1">Items</span>
            </div>
            <div class="flex justify-between items-center mt-1">
                <p class="text-white">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </p>
                <p class="text-sm text-white ml-1">{{ cartTotal }}</p>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    computed: {
        cartQuantity() {
            return this.$store.getters['cart/cartTotalQuantity'];
        },
        cartTotal() {
            return this.$store.getters['cart/getTotal'];
        }
    },
    methods: {
        showCartDetails() {
            this.$store.commit('cart/SHOW_CART_DETAILS')
        }
    }
}
</script>
