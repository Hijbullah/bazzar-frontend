<template>
    <modal 
        name="modal-address"
        :clickToClose="false"
        >
         <div slot="top-right">
            <button @click="$modal.hide('modal-address')">
                ❌
            </button>
        </div>
        This is my first modal
    </modal>
</template>

<script>
export default {
    name: 'ModalAddress',
    methods: {
        // show () {
        //     this.$modal.show('modal-address');
        // },
        // hide () {
        //     this.$modal.hide('modal-address');
        // }
    },
}
</script>