<template>
    <div class="container mx-auto py-24">
        <div v-if="products.length > 0" class=" grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12">
            <div v-for="product in products" :key="product.id">
                <TheProduct :product="product" />
            </div>
        </div>
        <div v-else>
            <p>No products found(s)</p>
        </div>
    </div>
</template>


<script>
export default {
    async asyncData({$axios, params}) {
        let products = await $axios.$get(`/categories/${params.category}`);
        return { products };
    }
}
</script>
