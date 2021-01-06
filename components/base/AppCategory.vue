<template>
    <div>
        <div @click="selectCategory(category)" class="flex justify-between pr-2 cursor-pointer hover:text-teal-600 font-medium tracking-wide" :class="selectedCategories.includes(category.id) ? 'text-teal-600' : ''">
            <p>{{ category.name }}</p> 

            <div v-if="category.children"> 
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!(showChildren && selectedCategories.includes(category.id))" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>
        </div>

        <div v-show="category.children">
            <div v-show="showChildren && selectedCategories.includes(category.id)" class="pl-6 pt-4 space-y-4 border-l-2 border-gray-200">
                <LazyAppCategory 
                    v-for="category in category.children" 
                    :key="category.id" 
                    :category="category"
                    :depth="depth + 1"
                ></LazyAppCategory>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppCategory',
    props: {
        category: Object,
        depth: Number,
    },
    data() {
        return {
            showChildren: false,
            selectedCategory: null,
        }
    },
    computed: {
        selectedCategories() {
            return this.$store.getters.getSelectedCategories;
        }
    },
    methods: {
        selectCategory() {
            this.$store.commit('SET_SELECTED_CATEGORIES', this.category)
            this.checksHasChildren();
            this.$router.push({name: 'category', params: {category: this.category.slug}});
        },
        checksHasChildren() {
            if(this.category.children) {
                this.showChildren = true;
            }else {
                this.showChildren = false;
            }
        }
    },
}
</script>
