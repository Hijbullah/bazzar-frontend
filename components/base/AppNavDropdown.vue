<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative inline-block text-left">
        <div>
            <button v-if="loggedIn" @click.prevent="open = !open" type="button" class="btn-primary px-3 py-2 text-sm uppercase tracking-widest" id="options-menu" aria-haspopup="true" aria-expanded="true">
                {{ user.name }}
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            <button v-else @click.prevent="goToLogin" class="btn-primary px-3 py-2 text-sm uppercase tracking-widest">Login</button>

        </div>

       <transition
            name="account-nav-dropdown"
            enter-active-class="transition ease-out duration-100"
            enter-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div v-if="open" class="origin-top-right absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5">
                <div class="px-4 py-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" class="block px-4 py-2  text-gray-700 hover:text-teal-600 font-semibold" role="menuitem">My Profile</a>
                    <a href="#" class="block px-4 py-2 text-gray-700 hover:text-teal-600 font-semibold" role="menuitem">My Orders</a>               
                    <button @click.prevent="logout" type="submit" class="block w-full text-left px-4 py-2 font-semibold text-gray-700 hover:text-teal-600 focus:outline-none" role="menuitem">
                        Logout
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false
        }
    },
    computed: {
        loggedIn() {
            return this.$auth.loggedIn;
        },
        user() {
            return this.$auth.user;
        }
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.open = false;
        },
        goToLogin() {
            this.$router.push('/auth/login');
        },
        close(e) {
            if (! this.$el.contains(e.target)) {
                this.open = false
            }
        }
    },
    created() {
        if(process.client) {
            window.addEventListener('click', this.close)
        }
    },

    beforeDestroy() {
        if(process.client) {
            window.removeEventListener('click', this.close)
        }
    },
}
</script>
