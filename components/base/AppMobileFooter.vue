<template>
    <div class="fixed bottom-0 inset-x-0 bg-white shadow-inner">
        <div class="flex justify-between items-center px-4 sm:px-8 py-2">
            <NuxtLink :to="{ name: 'customer-profile' }" class=" inline-flex items-center text-teal-600 focus:outline-none">
                <svg class="w-8 h-8 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </NuxtLink>
            <NuxtLink :to="{ name: 'index' }" class="inline-flex items-center text-teal-600 focus:outline-none">
                <svg class="w-8 h-8 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </NuxtLink>
            <button @click.prevent="showCartContent" class="relative inline-flex items-center text-teal-600 focus:outline-none">
                <span class="absolute -top-1 -right-2 inline-flex items-center px-2 py-1 bg-teal-600 text-xs text-white font-semibold rounded-full">{{ cartQuantity }}</span>
                <svg class="w-8 h-8 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        cartQuantity() {
            return this.$store.getters['cart/cartTotalQuantity'];
        }
    },
    methods: {
        showCartContent() {
            this.$store.commit('cart/SHOW_CART');
        }
    }
}
</script>

<style>

</style>