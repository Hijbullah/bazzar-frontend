<template>
    <div class="min-h-screen bg-gray-50 antialiased">
        <div class="sticky top-0 z-40">
            <app-header class="hidden md:block" />
            <app-mobile-header class="md:hidden" />
        </div>
        
        <main class="w-full">
            <Nuxt />
        </main> 

         <div class="md:hidden pb-12"></div>
        <lazy-app-mobile-footer class="md:hidden"/>
    </div>
</template>
