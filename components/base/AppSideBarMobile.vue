<template>
    <div class="inline-flex">
         <button @click.prevent="isSidebarOpen = true" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-8 h-8 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
        </button>

        <transition
            name="cart-slideover"
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="-translate-x-full"
        >
            <div v-show="isSidebarOpen" class="fixed inset-y-0 left-0 w-screen max-w-xs z-50 shadow-2xl">
                <div class="h-full flex flex-col bg-white">
                    <div class="flex justify-between items-center px-4 sm:px-6 py-4 bg-teal-600 shadow-sm">
                        <div class="flex items-center bg-teal-600">
                            <h2 class="text-xl text-white font-bold uppercase tracking-widest leading-none">Bazzar</h2>
                        </div>
                        <button @click.prevent="isSidebarOpen = false" class="rounded-md text-gray-300 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                            <span class="sr-only">Close panel</span>
                            <svg class="h-6 w-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="pt-4 relative flex-1 px-4 sm:px-6 space-y-4 overflow-y-auto">
                        <LazyAppCategory 
                            v-for="category in categories" 
                            :key="category.id"
                            :category="category"
                            :depth="0"
                        />
                    </div>
                    <div class="px-6 py-6">
                        footer
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSidebarOpen: false
        }
    },
   
    computed: {
        categories() {
            return this.$store.getters.getCategories;
        }
    },
       
    methods: {
        close(e) {
            if (! this.$el.contains(e.target)) {
                this.isSidebarOpen = false;
            }
        }
    },
    watch: {
        // isSidebarOpen: {
        //     immediate: true,
        //     handler(isSidebarOpen) {
        //         if (process.client) {
        //             if (isSidebarOpen) document.body.style.setProperty("overflow", "hidden");
        //             else document.body.style.removeProperty("overflow");
        //         }
        //     }
        // }
        $route(){
            this.isSidebarOpen = false;
        }
    },
    created() {
        if(process.client) {
            window.addEventListener('click', this.close)
        }
    },

    beforeDestroy() {
        if(process.client) {
            window.removeEventListener('click', this.close)
        }
    },

}
</script>
