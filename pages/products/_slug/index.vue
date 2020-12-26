<template>
    <div class="px-8 py-6">
        <div class="flex">
            <div class="w-1/3">
                <div class="flex justify-center">
                    <img class="w-full object-cover" :src="product.images[0]" :alt="product.name">
                </div>
                <div class="flex justify-center mt-8 space-x-3">
                    <img class="w-16 h-16 object-cover" v-for="(image, index) in product.images" :key="index" :src="image" :alt="product.name">
                </div>
            </div>
            <div class="w-2/3 border-l pl-12 pr-8">
                <h2 class="text-3xl text-gray-800 font-semibold leading-none">{{ product.name }}</h2>
                <div class="flex items-center mt-6 mb-8">
                    <p class="flex items-center font-semibold text-teal-600">
                        <span class="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        {{ product.price }}
                    </p>
                    <p class="flex items-center ml-4 text-gray-500 text-sm font-medium line-through">
                        <span class="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        {{ product.price }}
                    </p>
                </div>
                
                <div class="text-gray-800">
                    {{ product.short_description }}
                </div>

                <div class="mt-12">
                    <client-only>
                        <button v-if="!productInCart" @click.prevent="addToCart" class="btn-primary px-5 py-2 text-sm" >
                            <span class="mr-1">
                                <svg class="w-4 h-4 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </span>
                            Add To Cart
                        </button>

                        <div v-else class="inline-flex justify-between items-center px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg">
                            <button @click.prevent="decreaseQty" class="inline-flex items-center px-1 focus:outline-none">
                                <svg class="h-5 w-5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                                </svg>
                            </button>
                            <span class="w-12 inline-flex justify-center items-center px-3">{{ productInCart.quantity }}</span>
                            <button @click.prevent="increaseQty" class="inline-flex items-center px-1 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </client-only>
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
    },
    computed: {
        productInCart() {
            return this.$store.getters['cart/getProductFromCart'](this.product.id);
        }
    },
    methods: {
        addToCart() {
            this.$store.dispatch('cart/addProductToCart', {
                id: this.product.id,
                name: this.product.name,
                slug: this.product.slug,
                price: this.product.price,
                quantity: 1
            });
        },
        decreaseQty() {
            this.$store.dispatch('cart/decreaseItemQty', this.product.id);
        },
        increaseQty() {
            this.$store.dispatch('cart/increaseItemQty', this.product.id);
        }
    },
}
</script>
