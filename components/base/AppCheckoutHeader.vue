<template>
    <header>
       <div class="flex justify-between items-center px-8 py-4  bg-white shadow">
            <h1 class="text-3xl text-teal-600 leading-none font-bold">
                <NuxtLink to="/">Bazzar</NuxtLink>
            </h1>
           <div class="flex items-center space-x-8">
               <a href="#" class="font-semibold hover:text-teal-600">Offer</a>
               <a href="#" class="inline-flex items-center font-semibold hover:text-teal-600">
                    <span class="mr-1">
                        <svg class="w-4 h-4 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </span>
                    Need Help
                </a>
                <button v-if="login" @click.prevent="logout" class="hidden md:block w-32 lg:w-48 self-stretch bg-red-600 hover:bg-red-700 text-white font-bold focus:outline-none">Logout</button>
                <button v-else @click.prevent="goToLogin" class="btn-primary px-3 py-2 text-sm uppercase tracking-widest">Login</button>
           </div>
       </div>
    </header>
</template>

<script>
export default {
    computed: {
        login() {
            return this.$auth.loggedIn;
        },
        user() {
            return this.$auth.user;
        }
    },
    methods: {
        async logout() {
            await this.$auth.logout();
        },
        goToLogin() {
            this.$router.push('/auth/login');
        }
    }
}
</script>
