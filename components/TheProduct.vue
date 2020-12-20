<template>
    <div class="max-w-sm">
        <div class="flex justify-center items-center w-full h-64 overflow-hidden">
        <img class="object-cover object-center" :src="productImage" :alt="product.name">
        </div>
        <div class="h-16 overflow-hidden">
        <h3 class="text-center text-sm font-semibold hover:text-red-700">
            <nuxt-link :to="'/products/' + product.slug">
            {{ product.name }}
            </nuxt-link>
        </h3>
        </div>
        <p class="text-center font-semibold mb-2">Tk. {{ product.price }}</p>
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
