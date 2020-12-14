<template>
    <div class="bg-white antialiased min-h-screen">
        <div class="sticky top-0 z-40">
            <AppHeader />
        </div>
        <div class="flex">
            <div class="w-56 pt-3 fixed left-0 h-screen border-r border-gray-300">
                <app-sidebar />
            </div>
            <div class="ml-56 flex-1">
                <cart-content v-if="$store.getters['cart/showCartDetails']"></cart-content>
                <cart-button v-else></cart-button>
                
                <main class="w-full">
                    <Nuxt />
                </main>

                <!-- <AppFooter /> -->
            </div>
        </div>    
    </div>
</template>
