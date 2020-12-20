<template>
    <div class="min-h-screen flex py-10 container mx-auto">
        <div class="w-1/3">
            <img class="w-64 object-cover" :src="product.images[0]" :alt="product.name">
        </div>
        <div class="w-2/3">
            <h2 class="text-2xl font-bold">{{ product.name }}</h2>
            <p class="my-4 font-semibold">Price: {{ product.price }}</p>
            <div>
                <button class="block px-8 py-1 text-sm font-semibold uppercase text-red-600 border border-red-600 rounded">Add to Cart</button>
            </div>
            <div class="mt-4">
                {{ product.short_description }}
            </div>
            <div class="mt-4">
                <div v-html="product.description"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ $axios, params }){
        const product = await $axios.$get(`/products/${params.slug}`);
        return { product: product.data };
    }
}
</script>

<style>

</style>