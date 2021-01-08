<template>
    <div>
        <h2 class="mb-5 text-lg text-gray-600 font-bold uppercase tracking-widest">My Profile</h2>
        <div class="px-6 lg:px-8 py-12 bg-white rounded">
            <div class="flex items-center text-gray-600">
                <p class="font-semibold">Name:</p>
                <p class="ml-2">{{ $auth.user.name }}</p>
            </div>
            <div class="mt-3 flex items-center text-gray-600">
                <p class="font-semibold">Email:</p>
                <p class="ml-2">{{ $auth.user.email }}</p>
            </div>
            <div class="mt-3 flex items-center text-gray-600">
                <p class="font-semibold">Mobile:</p>
                <p class="ml-2">{{ $auth.user.phone }}</p>
            </div>
            <div class="mt-8">
                <NuxtLink :to="{ name: 'customer-profile-edit' }" class="btn-primary px-4 md:px-8 py-1 md:py-2 text-sm md:text-base rounded-sm">Edit My Profile</NuxtLink>
                <NuxtLink :to="{ name: 'customer-change-password' }" class="btn-primary mt-3 md:mt-0 md:ml-3 px-4 md:px-8 py-1 md:py-2 text-sm md:text-base rounded-sm">Change My Password</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'customer',
    
}
</script>
