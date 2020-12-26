<template>
    <div class="bg-white rounded-lg shadow px-8 py-6">
        <div v-if="message">
            <p>{{ message }}</p>
        </div>

        <div class="flex flex-col justify-center items-center mb-10">
            <h2 class="text-gray-700 text-lg font-bold uppercase tracking-widest">Welcome</h2>
            <p class="mt-2 text-gray-500">Login with Email and Password</p>
        </div>
       
        <form @submit.prevent="submit" method="POST">
            <div class="mb-5">
                <input aria-label="Email address" name="email" type="email" v-model="form.email" class="appearance-none w-full px-3 py-2 text-gray-700 border-0 rounded ring-2 ring-gray-300 ring-opacity-50 tracking-wider focus:outline-none focus:ring-teal-600 placeholder-gray-600 placeholder-opacity-90" placeholder="Email address" />
                <div v-if="errors.email" class="text-red-500 text-sm mt-2">{{ errors.email[0] }}</div>
            </div>
            
            <div>
                <input aria-label="Password" name="password"  v-model="form.password" type="password" class="appearance-none w-full px-3 py-2 text-gray-700 border-0 rounded ring-2 ring-gray-300 ring-opacity-50 tracking-wider focus:outline-none focus:ring-teal-600 placeholder-gray-600 placeholder-opacity-90" placeholder="Password" />
                <div v-if="errors.password" class="text-red-500 text-sm mt-2">{{ errors.password[0] }}</div>
            </div>
          
            <div class="my-6">
                <button type="submit" class="w-full btn-primary justify-center px-2 py-2 uppercase tracking-wider">
                    Sign in
                </button>
            </div>

            <div class="text-gray-600 tracking-wide">
                Don't have an account? 
                <NuxtLink to="/auth/register" class="font-medium text-teal-600 hover:text-teal-500 focus:outline-none transition ease-in-out duration-150">
                    Register
                </NuxtLink>
            </div>
            <div class="mt-5 flex items-center justify-between">
                <NuxtLink to="/" class="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-500 uppercase tracking-wide focus:outline-none transition ease-in-out duration-150">
                    <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back To Home
                </NuxtLink>
          
                <NuxtLink to="/auth/password/forget" class="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-teal-600 tracking-wide focus:outline-none transition ease-in-out duration-150">
                    Forgot your password?
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
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                errors: {}
            }
        },

        methods: {
            async submit () {
                try {
                    await this.$axios.$post('/auth/register', this.form);
                    await this.$auth.loginWith('laravelJWT', { data: this.form});
                } catch ({ response }) {
                    this.errors = response.data.errors;
                }
            }
        },
    }
</script>