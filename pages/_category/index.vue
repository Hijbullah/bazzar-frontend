<template>
    <div class="w-full px-8 py-8 bg-gray-50">
        <div class="grid grid-cols-4 gap-x-5 gap-y-5">
            <TheProduct 
                v-for="product in products" 
                :key="product.id"
                :product="product" 
            />
        </div>
          
            <!-- <div v-if="this.page_count>1"> -->
                <!-- <paginate
                    v-model="page"
                    :page-count="this.page_count"
                    :page-range="3"
                    :margin-pages="1"
                    :click-handler="getproduct"
                    :prev-text="'<'"
                    :next-text="'>'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    :prev-link-class="'prev'"
                    :next-link-class="'next'">
                </paginate> -->
            <!-- </div>  -->
            
        <!-- </div>
        <div v-else>
            <p>No products found(s)</p>
        </div> -->

        <div class="mt-8">
           
            <paginate
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="1"
                :click-handler="getProduct"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'flex item-center'"
                :page-link-class="'px-2 py-1 text-dark-800'"
                >
            </paginate>
        </div>
        
    </div>
</template>


<script>
export default {
    watchQuery: ['page'],

    async asyncData({$axios, route}) {
        let products = await $axios.$get(`/products/categories/${route.params.category}?page=${route.query.page}`);
        // console.log(products);

        return { 
            products: products.data,
            pageCount: products.meta.last_page
        };
    },
    // data() {
    //     return {
    //         products: []
    //     }
    // },
    // async fetch() {
    //     const products = await this.$axios.$get(`/products/categories/${this.$route.params.category}`);
    //     this.products = products.data;
    // },
    methods: {
        getProduct(pageNum) {
            this.$router.push(`/${this.$route.params.category}?page=${pageNum}`);
        }
    }
}
</script>
