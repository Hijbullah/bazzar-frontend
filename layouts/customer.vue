<template>
    <div class="min-h-screen bg-gray-50 antialiased">
        <div class="sticky top-0 z-40">
            <AppHeaderWithoutSearch />
        </div>
        <main class="w-full flex py-8">
            <div class="w-48">
                <div class="px-6 pt-12 space-y-3">
                    <NuxtLink :to="{ name: 'customer-profile' }" class="block text-gray-900 text-lg font-semibold tracking-wide hover:text-teal-600">My Profile</NuxtLink>
                    <NuxtLink :to="{ name: 'customer-order' }" class="block text-gray-900 text-lg font-semibold tracking-wide hover:text-teal-600">My Orders</NuxtLink>
                </div>
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