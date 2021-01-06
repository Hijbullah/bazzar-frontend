<template>
    <div class="bg-white shadow-sm md:shadow rounded-sm md:rounded-md overflow-hidden">
        <div class="w-full h-48 md:h-48">
            <img class="h-full w-full object-cover" :src="product.image" :alt="product.name">
        </div>

        <div class="px-2 sm:px-4 pb-4">
            <h3 class="mt-8 mb-4 text-gray-800 hover:text-teal-600 font-bold leading-none tracking-wide truncate">
                <nuxt-link :to="'/products/' + product.slug">{{ product.name }}</nuxt-link>
            </h3>
            <div class="flex justify-between items-center">
                <p class="flex items-center text-teal-600 text-sm font-semibold">
                    <span class="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    {{ product.price.salePrice }}
                </p>
                <p v-if="product.price.discount" class="flex items-center text-sm font-light line-through">
                    <span class="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    {{ product.price.originalPrice }}
                </p>
            </div>
            <div class="mt-6">
                <CartAddButton :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object,
    }
}
</script>
