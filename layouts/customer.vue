<template>
    <div class="min-h-screen bg-gray-50 antialiased">
        <div class="sticky top-0 z-40">
            <AppHeaderWithoutSearch />
        </div>
        <main class="w-full flex px-12 py-8">
            <div class="w-56 mt-12">
               <customer-sidebar />
            </div>
            <div class="flex-1">
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