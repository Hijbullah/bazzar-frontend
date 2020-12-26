<template>
    <div class="bg-white rounded-lg shadow px-8 py-6">
        <div v-if="message">
            <p>{{ message }}</p>
        </div>

        <div class="flex flex-col justify-center items-center mb-10">
            <h2 class="text-gray-700 text-lg font-bold uppercase tracking-widest">Forget Password</h2>
            <p class="mt-2 text-gray-500">We'll send you an email with reset link</p>
        </div>
       
        <form @submit.prevent="sendResetLink" method="POST">
            <div class="mb-5">
                <input aria-label="Email address" name="email" type="email" v-model="email" class="appearance-none w-full px-3 py-2 text-gray-700 border-0 rounded ring-2 ring-gray-300 ring-opacity-50 tracking-wider focus:outline-none focus:ring-teal-600 placeholder-gray-600 placeholder-opacity-90" placeholder="Email address" />
                <div v-if="errors.email" class="text-red-500 text-sm mt-2">{{ errors.email[0] }}</div>
            </div>
            
            <div class="my-8">
                <button type="submit" class="w-full btn-primary justify-center px-2 py-2 uppercase tracking-wider">
                    Reset Password
                </button>
            </div>

            <div class="mt-5 flex items-center justify-between">
                <NuxtLink to="/auth/login" class="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-500 uppercase tracking-wide focus:outline-none transition ease-in-out duration-150">
                    <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back To login
                </NuxtLink>     
            </div>
        </form>
    </div>
</template>


<script>

    export default {
        layout: 'auth',
        middleware: 'auth',
        auth: 'guest',

        data() {
            return {
                email: '',
                message: '',
                errors: {}
            }
        },

        methods: {
            async sendResetLink () {
                try {
                    const response = await this.$axios.$post('/auth/forget-password', {email: this.email});
                    this.message = response.message;
                } catch ({ response }) {
                    this.errors = response.data.errors;
                }
            }
        },
    }
</script>