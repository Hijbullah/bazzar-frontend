<template>
    <div class="sm:pl-16 sm:pr-8">
        <h2 class="mt-8 text-2xl sm:text-3xl text-gray-900 font-medium leading-tight">{{ product.name }}</h2>

        <div class="flex items-center mt-8 mb-6">
            <p class="flex items-center text-lg font-semibold text-teal-600">
                <span class="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                {{ product.price.salePrice }}
            </p>
            <p v-if="product.price.discount" class="flex items-center ml-4 text-gray-500 text-sm font-medium line-through">
                <span class="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                {{ product.price.originalPrice }}
            </p>
        </div>

        <div class="text-sm text-gray-700 leading-relaxed">
            {{ product.short_description }}
        </div>

        <div class="mt-8">
            <CartAddButtonForProduct :product="product" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>
