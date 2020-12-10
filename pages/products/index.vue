<template>
<div class="px-4 py-8">
    <div class=" grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12">
        <div v-for="product in products" :key="product.id">
            <TheProduct :product="product" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    async asyncData({ $axios }) {
        const products = await $axios.$get('https://fakestoreapi.com/products');
        return { products };
    }
}
</script>

<style>

</style>