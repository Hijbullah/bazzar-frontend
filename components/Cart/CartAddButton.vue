<template>
    <div class="flex justify-end">
        <button @click.prevent="addToCart" class="btn-secondary px-2 py-1 text-sm" >
            <span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </span>
            Cart
        </button>
    </div>
</template>

<script>
export default {
    props: {
        product: Object,
    },
    methods: {
        addToCart() {
            this.$store.dispatch('cart/addProductToCart', this.product);
        }
    }
}
</script>
