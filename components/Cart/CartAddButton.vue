<template>
    <div>
        <button @click.prevent="addToCart" class="block w-full py-2 text-red-600 text-sm font-semibold border border-red-600 rounded">Add To Cart</button>
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
