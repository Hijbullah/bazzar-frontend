<template>
    <div>
        <div class="flex flex-col justify-center items-center mb-6">
            <h2 class="text-gray-700 text-lg font-bold uppercase tracking-widest">Reset Password</h2>
        </div>
       
        <form @submit.prevent="resetPassword" method="POST">
            <div class="mb-4">
                <input aria-label="Email address" type="email" v-model="form.email" class="appearance-none w-full px-3 py-2 text-gray-700 border-0 rounded ring-2 ring-gray-300 ring-opacity-50 tracking-wider focus:outline-none focus:ring-teal-600 placeholder-gray-600 placeholder-opacity-90" placeholder="Email address" />
                <div v-if="errors.email" class="text-red-500 text-xs mt-2">{{ errors.email[0] }}</div>
            </div>
            
            <div class="mb-4">
                <input aria-label="Password" v-model="form.password" type="password" class="appearance-none w-full px-3 py-2 text-gray-700 border-0 rounded ring-2 ring-gray-300 ring-opacity-50 tracking-wider focus:outline-none focus:ring-teal-600 placeholder-gray-600 placeholder-opacity-90" placeholder="Password" />
                <div v-if="errors.password" class="text-red-500 text-xs mt-2">{{ errors.password[0] }}</div>
            </div>
            <div>
                <input aria-label="Confirm Password" v-model="form.password_confirmation" type="password" class="appearance-none w-full px-3 py-2 text-gray-700 border-0 rounded ring-2 ring-gray-300 ring-opacity-50 tracking-wider focus:outline-none focus:ring-teal-600 placeholder-gray-600 placeholder-opacity-90" placeholder="Confirm Password" />
            </div>
          
            <div class="my-5">
                <button type="submit" class="w-full btn-primary justify-center px-2 py-2 uppercase tracking-wider">
                    Reset Password
                </button>
            </div>

            <div class="mt-5 flex items-center justify-between">
                <NuxtLink to="/" class="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-500 uppercase tracking-wide focus:outline-none transition ease-in-out duration-150">
                    <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back To Home
                </NuxtLink>
            </div>
        </form>
    </div>
</template>


<script>

    export default {
        layout: 'auth',
        middleware: 'auth',
        auth : 'guest',

        data() {
            return {
                form: {
                    token: this.$route.query.token,
                    email: this.$route.query.email,
                    password: '',
                    password_confirmation: ''
                },
                errors: {}
            }
        },

        methods: {
            async resetPassword () {
                try {
                    const response = await this.$axios.$post('/auth/reset-password', this.form);
                    this.$router.push(`/auth/login?msg=${response.message}`);
                } catch ({ response }) {
                    this.errors = response.data.errors;
                }
            }
        },
    }
</script>