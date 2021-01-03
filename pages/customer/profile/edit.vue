<template>
    <div>
        <h2 class="mb-5 text-lg text-gray-600 font-bold uppercase tracking-widest">Edit My Profile</h2>
        <div class="px-8 py-12 bg-white rounded">
            <div class="w-1/2 mb-5">
                <label class="block text-gray-600 mb-2" for="name">Name</label>
                <input v-model="form.name" aria-label="name" type="text" id="name" class="input-primary" placeholder="Name" />
                <div v-if="errors && errors.name" class="text-red-500 text-sm mt-2">{{ errors.name[0] }}</div>
            </div>
            <div class="w-1/2 mb-5">
                <label class="block text-gray-600 mb-2" for="email">Email</label>
                <input :value="$auth.user.email" aria-label="email" type="email" disabled id="email" class="input-primary cursor-not-allowed" placeholder="Email Number" />
            </div>
            <div class="w-1/2 mb-5">
                <label class="block text-gray-600 mb-2" for="phone">Mobile Number</label>
                <input v-model="form.phone" aria-label="phone" type="text" id="phone" class="input-primary" placeholder="Mobile Number" />
                <div v-if="errors && errors.phone" class="text-red-500 text-sm mt-2">{{ errors.phone[0] }}</div>
            </div>
           
            <div class="mt-8">
                <button @click.prevent="updateProfile" class="btn-primary px-8 py-2 rounded-sm">Update Profile</button>
                <NuxtLink :to="{ name: 'customer-profile' }" class="btn-secondary ml-3 px-8 py-2 rounded-sm">Cancel</NuxtLink>
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
                name: this.$auth.user.name,
                phone: this.$auth.user.phone
            },
            errors: null
        }
    },
    methods: {
        async updateProfile() {
            try {
                const response = await this.$axios.$put(`/update-profile/${this.$auth.user.id}`, this.form);
                this.$auth.setUser(response.user)
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
