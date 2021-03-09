<template>
    <div class="px-4 sm:px-8 md:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50">
        <div class="md:flex md:items-center">
            <div class="w-full md:w-1/3">
               <ProductCarosel :productName="product.name" :images="product.images" />
            </div>
            <div class="w-full md:w-2/3">
                <ProductDescription :product="product" />
            </div>
        </div>
       <div class="mt-8">
            <div class="bg-white shadow-sm">
                <h4 class="px-6 py-3 text-lg font-semibold text-gray-700 border-b border-gray-300 tracking-wide">Product Details of {{ product.name }}</h4>
                <div class="px-6 py-7" v-html="product.description">
                </div>
            </div>

            <div class="mt-6 bg-white shadow-sm">
                <h4 class="px-6 py-3 text-lg font-semibold text-gray-700 border-b border-gray-300 tracking-wide">Ratings & Reviews </h4>
                <div class="px-6 py-5">
                    <div v-if="product.reviews.length">
                        <div class="py-3" v-for="review in product.reviews" :key="review.id">
                            <div>
                                <client-only>
                                    <star-rating 
                                        active-color="#14B8A6"
                                        :text-class="'text-teal-600 font-semibold'"
                                        :rating="review.rating" 
                                        :read-only="true" 
                                        :star-size="15"
                                        :show-rating="false"
                                        :increment="1"
                                    ></star-rating>
                                </client-only>
                                <div class="flex items-center">
                                    <p class="text-xs text-gray-500 font-semibold">by {{ review.user.name }},</p>
                                    <p class="ml-2 text-xs text-gray-500">{{ review.createdAt }}</p>
                                </div>
                                <p class="mt-2 text-gray-800">{{ review.text }}</p>
                            </div>
                        
                        </div>
                    </div>
                    <div v-else class="flex flex-col justify-center items-center py-6">
                        <span class="text-gray-400">
                            <svg class="w-12 h-12 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <p class="mt-2 text-gray-500 text-sm">The Product has no reviews</p>
                    </div>
                </div>
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
