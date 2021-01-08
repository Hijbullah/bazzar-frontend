<template>
    <div class="min-h-screen bg-gray-50 antialiased">
        <div class="sticky top-0 z-40">
            <app-header class="hidden md:block" />
            <app-mobile-header class="md:hidden" />
        </div>
        <main class="w-full md:flex px-6 lg:px-12 py-8">
            <div class="hidden md:block w-56 mt-12">
               <customer-sidebar />
            </div>
            <div class="md:flex-1">
                <Nuxt />
            </div>
        </main> 
    </div>
</template>

<script>
export default {
    middleware: 'auth',
}
</script>