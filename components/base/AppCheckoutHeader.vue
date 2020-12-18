<template>
    <header>
        <div class="bg-yellow-300">
            <div class="w-2/3 mx-auto py-4 flex justify-between items-center">
                <h1 class="text-gray-800 text-3xl font-semibold">eBazar</h1>
                <button @click="returnBack" class="text-gray-800 hover:text-gray-700 font-bold focus:outline-none">Return Back</button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        returnBack() {
            this.$router.push('/auth/login');
        }
    }
}
</script>
