<template>
    <div class="w-full px-4 sm:px-8 md:px-8 py-5 sm:py-8 bg-gray-50">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-5">
            <template v-if="$fetchState.pending && !products.length">
                <content-placeholders
                    v-for="p in 20"
                    :key="p"
                    rounded
                >
                    <content-placeholders-img />
                    <content-placeholders-text :lines="3" />
                </content-placeholders>
            </template>

            <template v-else>
                <TheProduct 
                    v-for="(product, index) in products" 
                    :key="product.id"
                    :product="product" 
                    v-observe-visibility="
                        index === products.length - 1 ? lazyLoadProducts : false
                    "
                />
            </template>

            <template v-if="$fetchState.pending && products.length">
                    <content-placeholders
                        v-for="p in 20"
                        :key="p"
                        rounded
                    >
                    <content-placeholders-img />
                    <content-placeholders-text :lines="3" />
                    </content-placeholders>
            </template>
        </div>

        <!-- <div class="mt-8">
           
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
        </div> -->
        
    </div>
</template>


<script>
export default {
    data() {
        return {
            currentPage: 1,
            totalpage: 100,
            products: []
        }
    },

    async fetch() {
        const products = await this.$axios.$get(`/products/categories/${this.$route.params.category}?page=${this.currentPage}`);
        this.products = this.products.concat(products.data);
        this.totalpage = products.meta.last_page;
    },
   
    methods: {
        lazyLoadProducts(isVisible) {
            if (isVisible) {
                if (this.currentPage < this.totalpage) {
                    this.currentPage++
                    this.$fetch()
                }
            }
        }
    }
}
</script>
