<template>
    <header>
        <div class="flex justify-between items-center px-4 sm:px-8 md:px-12 py-3 bg-white shadow">
            <h1 class="text-3xl text-teal-600 leading-none font-bold">
                <NuxtLink :to="{ name: 'index' }">Bazzar</NuxtLink>
            </h1>
            
            <AppNavDropdown />
        </div>
    </header>
</template>

<script>
export default {
    computed: {
        loggedIn() {
            return this.$auth.loggedIn;
        },
    },
    methods: {
        async logout() {
            await this.$auth.logout();
        }
    }
}
</script>