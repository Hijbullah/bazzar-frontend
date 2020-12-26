<template>
    <div class="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-6 z-50">
            <div>
                <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Register 
                </h2>
            </div>
            <form @submit.prevent="submit" class="mt-8" action="#" method="POST">

                <div>
                    <div class="mb-3">
                        <input aria-label="Name" name="name" type="text" v-model="form.name" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Name" />
                        <div v-if="errors.name" class="text-red-400 text-xs mb-4 mt-2">{{ errors.name[0] }}</div>
                    </div>
                    <div class="mb-3">
                        <input aria-label="Email address" name="email" type="email" v-model="form.email" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                        <div v-if="errors.email" class="text-red-400 text-xs mb-4 mt-2">{{ errors.email[0] }}</div>
                    </div>
                    <div class="mb-3">
                        <input aria-label="Password" name="password"  v-model="form.password" type="password" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
                        <div v-if="errors.password" class="text-red-400 text-xs mb-4 mt-2">{{ errors.password[0] }}</div>
                    </div>

                    <div>
                        <input aria-label="Confirm Password" name="password"  v-model="form.password_confirmation" type="password" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Confirm Password" />
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-between">
                    <div class="text-sm leading-5">
                        <NuxtLink to="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                            Already registered? login
                        </NuxtLink>
                    </div>
                </div>

                <div class="mt-6">
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Register
                    </button>
                </div>
            </form>
        </div>
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