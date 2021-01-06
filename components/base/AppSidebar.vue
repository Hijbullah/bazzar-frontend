<template>
    <aside>
        <div class="pl-6 mt-4 space-y-4">
            <LazyAppCategory 
                v-for="category in categories" 
                :key="category.id"
                :category="category"
                :depth="0"
            />
        </div>
    </aside>
</template>

<script>
    export default {
        computed: {
            categories() {
                return this.$store.getters.getCategories;
            }
        }
    }
</script>