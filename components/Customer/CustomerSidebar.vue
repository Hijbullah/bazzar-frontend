<template>
    <div class="px-6 space-y-5">
        <div>
            <h3 class="mb-2 text-sm font-bold uppercase tracking-wide">My Account</h3>
            <div class="space-y-2">
                <NuxtLink :to="{ name: 'customer-profile' }" class="block ml-4 text-gray-900 text-sm font-medium tracking-wide hover:text-teal-600">My Profile</NuxtLink>
                <NuxtLink :to="{ name: 'customer-profile-edit' }" class="block ml-4 text-gray-900 text-sm font-medium tracking-wide hover:text-teal-600">Edit Profile</NuxtLink>
                <NuxtLink :to="{ name: 'customer-change-password' }" class="block ml-4 text-gray-900 text-sm font-medium tracking-wide hover:text-teal-600">Change Password</NuxtLink>
                <NuxtLink :to="{ name: 'customer-profile' }" class="block ml-4 text-gray-900 text-sm font-medium tracking-wide hover:text-teal-600">Address Book</NuxtLink>
            </div>
        </div>
        <div>
            <h3 class="mb-2 text-sm font-bold uppercase tracking-wide">My Orders</h3>
            <NuxtLink :to="{ name: 'customer-order' }" class="block ml-4 text-gray-900 text-sm font-medium tracking-wide hover:text-teal-600">My Orders</NuxtLink>
            <NuxtLink :to="{ name: 'customer-order' }" class="block ml-4 text-gray-900 text-sm font-medium tracking-wide hover:text-teal-600">My Cancellations</NuxtLink>
        </div>
    </div>
</template>
