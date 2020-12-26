<template>
    <div class="antialiased min-h-screen font-sans text-gray-800">
        <div class="sticky top-0 z-40">
            <AppHeader />
        </div>
        <div class="flex">
            <div class=" w-64 h-screen py-3 fixed left-0 border-r-2 border-gray-100 overflow-y-auto">
                <app-sidebar />
            </div>
            <div class="ml-64 flex-1">
                
                <cart-main />
                
                <main class="w-full">
                    <Nuxt />
                </main>

                <!-- <AppFooter /> -->
            </div>
        </div>    
    </div>
</template>
