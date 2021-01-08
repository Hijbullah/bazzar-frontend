<template>
    <div>
        <h2 class="mb-5 text-lg text-gray-600 font-bold uppercase tracking-widest">My Orders</h2>
        <div class="space-y-8">
            <customer-order 
                v-for="order in orders" 
                :key="order.orderCode" 
                :order="order" 
            /> 
        </div>    
    </div>
</template>

<script>
export default {
    layout: 'customer',

    data() {
        return {
            orders: [],
        }
    },
    
    async fetch() {
        const { data } = await this.$axios.$get(`/get-orders/${this.$auth.user.id}`);
        this.orders = data;
    },

    fetchOnServer: false
}
</script>
