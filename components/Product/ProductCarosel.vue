<template>
    <client-only placeholder="loading">
        <div>
            <Tinybox
                v-model="index"
                :images="images"
                no-thumbs
            />
                 
            <carousel 
                :perPage="1"
                :navigationEnabled="false"
                :navigation-next-label="nextLabel"
                :navigation-prev-label="prevLabel"
                :paginationEnabled="false"
            >
                <slide 
                    class="group w-full h-72 sm:h-80 md:h-64 lg:h-80 cursor-pointer relative" 
                    v-for="(image, index) in images" :key="index"
                    @click.native.prevent="loadLightbox(index)" 
                >
                    <div class="absolute right-6 bottom-5">
                        <svg class="w-8 h-8 text-teal-600 opacity-25 group-hover:opacity-95" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                    </div>
                    <img class="w-full h-full object-cover" :src="image" :alt="productName">
                </slide>
            </carousel>
        </div>
    </client-only>
</template>

<script>
export default {
    props: {
        productName: String,
        images: Array,
    },
    data() {
        return {
            nextLabel: `
                <svg class="h-5 w-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            `,
            prevLabel: `
                <svg class="h-5 w-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
            `,
            index: null
        }
    },
    methods: {
        loadLightbox(index) {
            this.index = index;
        },
    }
}
</script>

<style scoped>
    /deep/ .VueCarousel-navigation-button:focus {
        outline: none;
    }
</style>