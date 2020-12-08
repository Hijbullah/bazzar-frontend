<template>
    <div>
        <div>
            <div @click="toogleChild(category.slug)" class="flex justify-between pr-2 cursor-pointer hover:bg-gray-300">
                <p>{{ category.name }}</p> 

                <div v-if="category.children.length > 0"> 
                    {{ showChild ? 'v' : '>' }} 
                </div>
            </div>

            <div v-if="category.children.length > 0">
                <div v-if="showChild" class="pl-4 pt-1 space-y-1 border-l border-gray-500">
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
