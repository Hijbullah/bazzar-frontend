<template>
    <div class="py-4 px-8">
        <div class="mb-4">
            <NuxtLink to="/customer/orders" class="text-indigo-500">Back To Orders</NuxtLink>
        </div>
        <div class="w-full">
            <div class="flex">
                <div class="w-1/2">
                    <h2 class="mb-6 text-xl font-bold uppercase tracking-wider">Order Summery</h2>
                    <div>
                        <h3 class="mb-1 font-bold">Order #{{ order.order_code }}</h3>
                        <p class="mb-1">Order Status: {{ order.status }}</p>
                        <p class="mb-1">Payment Method: {{ order.payment_method }}</p>
                        <p class="mb-4">Total Order Value: {{ order.total }}</p>
                    </div>
                </div>
                <div class="w-1/2 pl-12">
                    <h2 class="mb-6 text-xl font-bold uppercase tracking-wider">Delivery Information</h2>
                    <div>
                        <p>{{ order.delivery_name }}</p>
                        <p>{{ order.delivery_phone }}</p>
                        <div>
                            <p>{{ order.delivery_city }}</p>
                            <p>{{ order.delivery_address }}</p>
                        </div>
                    </div>
                </div>
            </div>
           
            <div class="mt-8">
                <h2 class="mb-6 text-xl font-bold uppercase tracking-wider">Products in order</h2>
                <div class="border-1">
                    <div class="flex justify-between items-center pb-2 border-b-2">
                        <p class="text-sm font-semibold">Qty</p>
                        <p class="text-sm font-semibold">Product</p>
                        <p class="text-sm font-semibold">Price</p>
                    </div>
                    <div v-for="product in order.products" :key="product.id" class="flex justify-between items-center py-2 border-b-2">
                        <div>{{ product.pivot.quantity }}</div>
                        <div class="text-xs w-2/3">
                            <span class="block">{{ product.name }}</span>
                            <span class="block mt-2">Price: {{ product.price_show }}</span>
                        </div>
                        <div class="text-xs">{{ product.price_show * product.pivot.quantity }}</div>
                    </div>
                    <div>
                        <div class="flex justify-between items-center py-2 border-b-2">
                            <div>Subtotal:</div>
                            <div>{{ order.subtotal }}</div>
                        </div>
                    
                        <div class="flex justify-between items-center py-2 border-b-2">
                            <div>Delivery:</div>
                            <div>{{ order.delivery }}</div>
                        </div>
                    
                        <div class="flex justify-between items-center">
                            <div>Total:</div>
                            <div>{{ order.total }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <button class="inline-flex items-center px-3 py-2 border-2 border-indigo-500">Cancel this Order</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ params, $axios }) {
        const order = await $axios.$get(`/get-order-details/${params.order}`);
        return { order };
    }
}
</script>

