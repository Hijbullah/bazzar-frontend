<template>
    <aside>
        <div class="pl-6 mt-4 space-y-4">
            <category-item 
                v-for="category in categories" 
                :key="category.id"
                :category="category"
                :depth="0"
            ></category-item>
        </div>
    </aside>
</template>

<script>
    import CategoryItem from './CategoryItem.vue';

    export default {
        components: {
            CategoryItem
        },
        computed: {
            categories() {
                return this.$store.getters.loadRootCategories;
            },
            childCategories() {
                return this.$store.getters.loadChildCategories;
            }
        },
        methods: {
            getChildCategories(id) {
                this.$store.commit('SET_CHILD_CATEGORIES', id);
                console.log(this.childCategories);
            }
        }
        // mounted() {
        //    console.log(this.rootCategories);
        // }
    }
</script>