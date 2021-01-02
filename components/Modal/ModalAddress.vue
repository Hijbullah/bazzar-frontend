<template>
    <modal 
        name="modal-address"
        :clickToClose="false"
        :adaptive="true"
        height="auto"
        :width="400"
        :scrollable="true"
        @before-open="setAddress"
        @before-close="resetAddress"
    >

        <div class="inline-flex items-center mt-4 mr-4 p-2 bg-teal-600 rounded-full" slot="top-right">
            <button class="text-gray-300 hover:text-gray-100 focus:outline-none" @click="$modal.hide('modal-address')">
                <svg class="w-6 h-5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div class="px-6 py-5 bg-gray-50">
            <h2 class="mb-5 font-semibold text-teal-600 uppercase tracking-wider">
                {{ editable ? 'Edit' : 'Add New' }} Address
            </h2>
            <div class="flex flex-col">
                <div class="mb-5">
                    <input type="text" v-model="address.name" id="name" class="input-primary" placeholder="Name">
                    <p v-if="errors && errors.name" class="mt-2 text-sm text-red-500">{{ errors.name[0] }}</p>
                </div>

                <div class="mb-5">
                    <input type="text" v-model="address.phone" id="phone" class="input-primary" placeholder="Phone Number">
                    <p v-if="errors && errors.phone" class="mt-2 text-sm text-red-500">{{ errors.phone[0] }}</p>
                </div>

                <div class="mb-5">
                    <input type="text" v-model="address.city" id="city" class="input-primary" placeholder="City">
                    <p v-if="errors && errors.city" class="mt-2 text-sm text-red-500">{{ errors.city[0] }}</p>
                </div>
                <div class="mb-5">
                    <textarea id="address" v-model="address.address" rows="4" class="input-primary" placeholder="Address"></textarea>
                    
                    <p class="mt-2 text-sm text-gray-400">
                        e.g House No 73, Road 14, Block F, Bashundhara R/A, Dhaka - 1216
                    </p>
                    <p v-if="errors && errors.address" class="mt-2 text-sm text-red-500">{{ errors.address[0] }}</p>
                </div>
            
                <button @click.prevent="saveAddress" class="btn-primary justify-center px-4 py-2">
                    {{ editable ? 'Edit Address' : 'Save Address' }}
                </button>
                
            </div>
        </div>
        
    </modal>
</template>

<script>
export default {
    name: 'ModalAddress',
    data(){
        return {
            editable: false,
            editableAddressId: null,
            address: {
                name: this.$auth.user.name,
                phone: '',
                city: '',
                address: ''
            },
            errors: null,
        }
    },
    methods: {
        async saveAddress() {
            try {
                const path = this.editable ? `/edit-address/${this.editableAddressId}` : `/save-address/${this.$auth.user.id}`;
                const { data } = await this.$axios.post(path, this.address);

                if(this.editable) {
                    this.$emit('update-address', data.data);
                }else {
                    this.$emit('add-address', data.data);
                }
               
                this.$modal.hide('modal-address');
            } catch (error) {
                if(error.response.status === 422) {
                    this.errors = error.response.data.errors;
                }
            }
        },
        setAddress(event) {
            if(event.params) {
                this.editable = true;
                this.editableAddressId = event.params.address.id;

                this.address.name = event.params.address.name;
                this.address.phone = event.params.address.phone;
                this.address.city = event.params.address.city;
                this.address.address = event.params.address.address;
            }
        },
        resetAddress() {
            this.errors = null;

            if(this.editable) {
                this.editable = false;
                this.editableAddressId = null;

                this.address.name = this.$auth.user.name;
                this.address.phone = '';
                this.address.city = '';
                this.address.address = '';
            }
        }
    }
}
</script>