<template>
    <client-only>
        <transition
            name="cart-slideover"
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
        >
            <div v-if="isOpen" class="fixed inset-y-0 right-0 w-screen max-w-md z-50 shadow-2xl">
                <div class="h-full flex flex-col bg-white">
                    <div class="flex justify-between items-center px-4 sm:px-6 py-4 border-b shadow-sm">
                        <div class="flex items-center">
                            <p class="text-teal-600">
                                <svg class="h-6 w-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </p>
                            <p class="mx-1 text-teal-500 font-bold uppercase tracking-wide">{{ cartContent.totalQuantity }}</p>
                            <p class="text-teal-500 text-sm font-bold uppercase tracking-wide">Items</p>
                        </div>
                        <button @click="hideCartDetails" class="rounded-md text-gray-300 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                            <span class="sr-only">Close panel</span>
                            <svg class="h-6 w-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="pt-4 relative flex-1 px-4 sm:px-6 space-y-4 overflow-y-auto">
                        <div v-if="cartContent.products.length > 0">
                            <div v-for="item in cartContent.products" :key="item.id" class="flex justify-between items-center py-3 border-b">
                                <div class="flex flex-col items-center justify-center px-1 py-2 bg-gray-100 rounded-full">
                                    <button @click.prevent="increaseQty(item.id)" class="inline-flex items-center text-gray-500 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>

                                    <p class="py-1 text-gray-500 font-semibold">{{ item.quantity }}</p>

                                    <button @click.prevent="decreaseQty(item.id)" class="inline-flex items-center text-gray-500 focus:outline-none">
                                        <svg class="h-5 w-5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="w-1/3">
                                    <p class="text-gray-700 font-semibold truncate">{{ item.name }}</p>

                                    <p class="flex items-center mt-1 text-sm text-teal-600 font-medium">
                                        <span class="mr-1">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </span>
                                        {{ item.price }}
                                    </p>
                                </div>

                                <div>
                                    <p class="flex items-center text-sm text-gray-700 font-semibold">
                                        <span class="mr-1">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </span>
                                    {{ item.price * item.quantity }}
                                    </p>
                                </div>
                                <button @click.prevent="removeCartItem(item.id)" class="rounded-md text-gray-300 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <span class="sr-only">Remove Item</span>
                                    <svg class="h-4 w-4 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div v-else class="w-full h-full flex flex-col items-center justify-center">
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="231.91" height="292">
                                    <defs><linearGradient id="a" x1="1" y1=".439" x2=".369" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#029477"/><stop offset="1" stop-color="#009e7f"/></linearGradient></defs><g data-name="no cart in bag 2" transform="translate(-1388 -351)"><ellipse data-name="Ellipse 2873" cx="115.955" cy="27.366" rx="115.955" ry="27.366" transform="translate(1388 588.268)" fill="#ddd" opacity=".25"/><path data-name="Path 18691" d="M1432.632 381h140.736A29.828 29.828 0 011603 411.021v179.958A29.828 29.828 0 011573.368 621h-140.736A29.828 29.828 0 011403 590.979V411.021A29.828 29.828 0 011432.632 381z" fill="#009e7f"/><path data-name="Rectangle 1852" d="M1433 381h140a30 30 0 0130 30 30 30 0 01-30 30h-157.143A12.857 12.857 0 011403 428.143V411a30 30 0 0130-30z" fill="#006854"/><path data-name="Rectangle 1853" d="M1445 381h116a42 42 0 0142 42 18 18 0 01-18 18h-164a18 18 0 01-18-18 42 42 0 0142-42z" fill="#006854"/><path data-name="Path 18685" d="M1503 411a30 30 0 1130-30 30.034 30.034 0 01-30 30zm0-53.294A23.3 23.3 0 101526.59 381a23.471 23.471 0 00-23.59-23.294z" fill="#006854"/><path data-name="Path 18686" d="M1504.103 470.865a30 30 0 1130-30 30.034 30.034 0 01-30 30zm0-53.294a23.3 23.3 0 1023.59 23.294 23.471 23.471 0 00-23.59-23.294z" fill="#009e7f"/><circle data-name="Ellipse 2874" cx="28.689" cy="28.689" r="28.689" transform="translate(1473.823 511.046)" fill="#006854"/><circle data-name="Ellipse 2875" cx="15.046" cy="15.046" r="15.046" transform="rotate(-45 1402.019 -1514.282)" fill="#009e7f"/><path data-name="Path 18687" d="M1460.289 495.567a71.755 71.755 0 0112.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.392 78.392 0 00-13.73 15c-2.56 3.644 3.424 7.1 5.962 3.485z" fill="#006854"/><path data-name="Path 18688" d="M1473.479 492.082a78.419 78.419 0 00-13.73-15c-3.38-2.843-8.289 2.017-4.882 4.882a71.785 71.785 0 0112.65 13.6c2.535 3.609 8.525.162 5.962-3.485z" fill="#006854"/><path data-name="Path 18689" d="M1553.582 492.082a78.417 78.417 0 00-13.73-15c-3.38-2.843-8.289 2.017-4.882 4.882a71.768 71.768 0 0112.65 13.6c2.535 3.609 8.525.162 5.962-3.485z" fill="#006854"/><path data-name="Path 18690" d="M1540.393 495.567a71.77 71.77 0 0112.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.407 78.407 0 00-13.73 15c-2.56 3.644 3.424 7.1 5.962 3.485z" fill="#006854"/><path data-name="Path 18692" d="M301.243 287.464a19.115 19.115 0 018.071 9.077 19.637 19.637 0 011.6 7.88v26.085a19.349 19.349 0 01-9.672 16.957c-10.048-6.858-16.544-17.742-16.544-30s6.502-23.141 16.545-29.999z" transform="translate(1292.301 101.536)" fill="url(#a)"/><path data-name="Path 18693" d="M294.371 287.464a19.115 19.115 0 00-8.071 9.077 19.637 19.637 0 00-1.6 7.88v26.085a19.349 19.349 0 009.672 16.957c10.048-6.858 16.544-17.742 16.544-30s-6.497-23.141-16.545-29.999z" transform="translate(1118.301 101.536)" fill="url(#a)"/></g>
                                </svg>
                            </p>
                            <p class="mt-6 text-sm font-bold text-gray-500">No Products found</p>
                        </div>
                    </div>
                    <div class="px-6 py-6">
                        <button 
                            :disabled="cartContent.products.length < 1"
                            class="w-full btn-primary justify-between pl-4 pr-2 py-1 rounded-full"
                        >
                            <p>Checkout</p>
                            <p class="flex items-center px-4 py-1 font-bold bg-white text-gray-800 rounded-full">
                                <span class="mr-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </span>
                                {{ cartContent.total }}
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </client-only>
</template>

<script>
export default {
    computed: {
        isOpen() {
            return this.$store.getters['cart/showCart'];
        },
        cartContent() {
            return this.$store.getters['cart/getCartContents'];
        } 
    },
    methods: {
        hideCartDetails() {
            this.$store.commit('cart/HIDE_CART');
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
