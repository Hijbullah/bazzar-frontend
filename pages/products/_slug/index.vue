<template>
    <div class="px-8 py-6">
        <div class="flex items-center">
            <div class="w-1/3">
               <ProductCarosel :productName="product.name" :images="product.images" />
            </div>
            <div class="w-2/3">
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
