<template>
    <div>
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
            <div class="mt-5">
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

        data() {
            return {
                message: this.$route.query.msg,
                form: {
                    email: '',
                    password: '',
                },
                errors: {}
            }
        },

        methods: {
            async submit () {
                try {
                    await this.$auth.loginWith('laravelJWT', { data: this.form});
                } catch ({ response }) {
                    this.errors = response.data.errors;
                }
            }
        },
    }
</script>