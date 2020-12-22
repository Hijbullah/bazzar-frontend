<template>
    <div class="bg-white shadow rounded-md overflow-hidden">
        <div class="w-full h-48">
            <img class="h-full w-full object-cover" :src="productImage" :alt="product.name">
        </div>

        <div class="px-4 py-5">
            <h3 class=" h-12 overflow-ellipsis overflow-hidden font-medium leading-snug tracking-wide hover:text-teal-600">
                <nuxt-link :to="'/products/' + product.slug">
                {{ product.name }}
                </nuxt-link>
            </h3>
            <div class="flex justify-between items-center py-3">
                <p class="flex items-center font-medium">
                    <span class="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    {{ product.price }}
                </p>
                <p class="flex items-center text-sm font-light line-through">
                    <span class="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    {{ product.price }}
                </p>
            </div>
            <div class="mt-3">
                <cart-add-button 
                    :product="{
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        quantity: 1
                    }"
                ></cart-add-button>
            </div>
        </div>
    </div>
</template>

<script>

import CartAddButton from './Cart/CartAddButton.vue'

export default {
    components: { CartAddButton },
    props: ['product'],
    computed: {
        productImage() {
            return this.product.images[Math.floor(Math.random() * this.product.images.length)];
        }
    }
}
</script>
