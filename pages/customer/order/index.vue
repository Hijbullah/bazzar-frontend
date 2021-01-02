<template>
    <div class="mt-8 px-8">
        <h2 class="mb-6 text-xl font-bold uppercase tracking-wider">My Orders</h2>
        <div>
            <div class="overflow-hidden border-b border-gray-200">
                <table class="min-w-full border-t-2 border-l border-r divide-y-2 divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                                Order Placed At
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Details</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="order in orders" :key="order.order_code ">
                            <td class="px-6 py-2 whitespace-nowrap">
                                <span class="font-bold"># {{ order.order_code }}</span>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <span>{{ order.total }}</span>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {{ order.status }}
                                </span>
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {{ order.created_at }}
                            </td>
                            <td class="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                                <NuxtLink :to="`/customer/orders/${order.order_code}`" class="text-indigo-600 hover:text-indigo-900">Details</NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>      

       
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    
    async asyncData({ $auth, $axios }) {
        const orders = await $axios.$get(`/get-order-summery/${$auth.user.id}`);
        // console.log(orders);
        return { orders };
    }
}
</script>
