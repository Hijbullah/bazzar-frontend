<template>
    <div class="h-screen w-72 fixed right-0 px-3 py-2 text-white bg-gray-700">
        <div>
            <div class="flex justify-between items-center">
                <p>{{ cartContent.totalQuantity }} items</p>
                <button @click.prevent="hideCartDetails">Close</button>
            </div>
        </div>
        <div class="mt-5">
            <div v-for="item in cartContent.products" :key="item.id" class="flex justify-between items-center py-2 border-b-2">
                <div class="pr-1">
                    <div @click.prevent="increaseQty(item.id)" class="cursor-pointer">^</div>
                    {{ item.quantity }}
                    <div @click.prevent="decreaseQty(item.id)" class="cursor-pointer">v</div>
                </div>
                <div class="text-xs w-40">{{ item.name }}</div>
                <div class="text-xs ml-2">{{ item.price * item.quantity }}</div>
                <button @click.prevent="removeCartItem(item.id)" class="text-red-400">X</button>
            </div>
            <div class="mt-8">
                <div class="flex justify-between items-center">
                    <div>Subtotal:</div>
                    <div>{{ cartContent.subTotal }}</div>
                </div>
                <hr>
                <div class="flex justify-between items-center">
                    <div>Shipping:</div>
                    <div>{{ cartContent.shipping }}</div>
                </div>
                <hr>
                <div class="flex justify-between items-center">
                    <div>Total:</div>
                    <div>{{ cartContent.total }}</div>
                </div>
            </div>
        </div>
        <div class="mt-5 text-center">
            <NuxtLink to="/checkout">Checkout</NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        cartContent() {
            return this.$store.getters['cart/getCartContents'];
        }
    },
    methods: {
        hideCartDetails() {
            this.$store.commit('cart/HIDE_CART_DETAILS')
        },
        removeCartItem(id) {
            this.$store.dispatch('cart/removeItem', id);
        },
        increaseQty(id) {
            this.$store.dispatch('cart/increaseItemQty', id);
        },
        decreaseQty(id) {
            this.$store.dispatch('cart/decreaseItemQty', id);
        }
    }
}
</script>
