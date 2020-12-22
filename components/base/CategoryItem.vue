<template>
    <div>
        <div>
            <div @click="toogleChild(category.slug)" class="flex justify-between pr-2 cursor-pointer hover:text-teal-600 font-medium tracking-wide" :class="showChild ? 'text-teal-600' : ''">
                <p>{{ category.name }}</p> 

                <div v-if="category.children.length > 0"> 
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="!showChild" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </div>
            </div>

            <div v-if="category.children.length > 0">
                <div v-if="showChild" class="pl-6 pt-4 space-y-4 border-l-2 border-gray-200">
                    <category-item 
                        v-for="category in category.children" 
                        :key="category.id" 
                        :category="category"
                        :depth="depth + 1"
                    ></category-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'category-item',
    props: {
        category: Object,
        depth: Number,
    },
    data() {
        return {
            showChild: false,
            selectedCategory: null,
        }
    },
    methods: {
        toogleChild(category) {
            this.showChild = !this.showChild;
            this.$router.push(`/${category}`);
        }
    },
    watch: {
        // showChild(newVal, OldVal) {
        //     if(this.isRoot) {
        //         this.showChild = false;
        //     }
        // }
    }
}
</script>
