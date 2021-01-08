<template>
    <div>
        <h2 class="mb-5 text-lg text-gray-600 font-bold uppercase tracking-widest">Change My Password</h2>
        <div class="px-8 py-12 bg-white rounded">
            <div class="w-full md:w-2/3 mb-5">
                <label class="block text-gray-600 mb-2" for="current_password">Current password</label>
                <input v-model="form.current_password" aria-label="current_password" type="password" id="current_password" class="input-primary" placeholder="Current Password" />
                <div v-if="errors && errors.current_password" class="text-red-500 text-sm mt-2">{{ errors.current_password[0] }}</div>
            </div>
            <div class="w-full md:w-2/3 mb-5">
                <label class="block text-gray-600 mb-2" for="new_password">New Password</label>
                <input v-model="form.new_password" aria-label="new_password" type="password" id="new_password" class="input-primary" placeholder="New Password" />
                <div v-if="errors && errors.new_password" class="text-red-500 text-sm mt-2">{{ errors.new_password[0] }}</div>

            </div>
            <div class="w-full md:w-2/3 mb-5">
                <label class="block text-gray-600 mb-2" for="password_confirmation">Confirm New Password</label>
                <input v-model="form.new_password_confirmation" aria-label="password_confirmation" type="password" id="password" class="input-primary" placeholder="Confirm New Pssword" />
            </div>
           
            <div class="mt-8">
                <button @click.prevent="changePassword" class="btn-primary px-4 md:px-8 py-1 md:py-2 text-sm md:text-base rounded-sm">Change Password</button>
                <NuxtLink :to="{ name: 'customer-profile' }" class="btn-secondary mt-3 sm:mt-0 sm:ml-3 px-4 md:px-8 py-1 md:py-2 text-sm md:text-base rounded-sm">Cancel</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'customer',
    
    data() {
        return {
            form: {
                current_password: '',
                new_password: '',
                new_password_confirmation: ''
            },
            errors: null
        }
    },
    methods: {
        async changePassword() {
            try {
                const response = await this.$axios.$put(`/change-password/${this.$auth.user.id}`, this.form);
                this.errors = null;
                this.$router.push({ name: 'customer-profile' });
            } catch ({ response }) {
                if(response.status == 422) {
                    this.errors = response.data.errors;
                }
            }
        }
    }
}
</script>
