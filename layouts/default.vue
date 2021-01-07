<template>
    <div class="antialiased min-h-screen font-sans text-gray-800">
        <div class="sticky top-0 z-40">
            <app-header class="hidden md:block" />
            <app-mobile-header class="md:hidden" />
        </div>
        <div class="flex">
            <div style="height: calc(100% - 70px)" class="hidden md:block w-52 lg:w-64 fixed left-0 bottom-0 py-5 pr-3 border-r-2 border-gray-100 overflow-y-auto">
                <app-sidebar />
            </div>
            <div class="md:ml-52 lg:ml-64 flex-1">
                
                <cart-main />
                
                <main class="w-full">
                    <Nuxt />
                </main>
            </div>
        </div>  
        <div class="md:hidden pb-12"></div>

       
        <lazy-app-mobile-footer class="md:hidden"/>
      
       
    </div>
</template>
