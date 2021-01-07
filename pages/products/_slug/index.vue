<template>
    <div class="px-4 sm:px-8 md:px-6 lg:px-8 py-4 sm:py-6">
        <div class="md:flex md:items-center">
            <div class="w-full md:w-1/3">
               <ProductCarosel :productName="product.name" :images="product.images" />
            </div>
            <div class="w-full md:w-2/3">
                <ProductDescription :product="product" />
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
