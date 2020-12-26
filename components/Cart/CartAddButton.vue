<template>
    <clientOnly>
        <div class="flex justify-end">
            <button v-if="!productInCart" @click.prevent="addToCart" class="btn-secondary text-sm px-2 py-1" >
                <span class="mr-1">
                    <svg class="w-4 h-4 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                </span>
                Cart
            </button>

            <div v-else class="w-full flex justify-between items-center px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-2xl">
                <button @click.prevent="decreaseQty" class="inline-flex items-center px-1 focus:outline-none">
                    <svg class="h-5 w-5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                    </svg>
                </button>
                <span class="block px-3">{{ productInCart.quantity }}</span>
                <button @click.prevent="increaseQty" class="inline-flex items-center px-1 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
        
            </div>
            
        </div>
    </clientOnly>
    
</template>

<script>
export default {
    props: {
        product: Object,
    },
    computed: {
        productInCart() {
            return this.$store.getters['cart/getProductFromCart'](this.product.id);
        }
    },
    methods: {
        addToCart() {
            this.$store.dispatch('cart/addProductToCart', this.product);
        },
        decreaseQty() {
            // console.log(this.getProductFromCart);
            this.$store.dispatch('cart/decreaseItemQty', this.product.id);
        },
        increaseQty() {
            this.$store.dispatch('cart/increaseItemQty', this.product.id);
        }
    },
}
</script>
