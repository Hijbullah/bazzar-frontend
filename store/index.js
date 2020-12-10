export const state = () => ({
    categories: [],
    childCategories: []
})

export const getters = {
    loadRootCategories(state) {
        return state.categories.filter(item => !item.parent_id);
    },
    loadChildCategories(state) {
        return state.childCategories;
    }
}

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_CHILD_CATEGORIES(state, id) {
        state.childCategories = state.categories.filter(item => item.parent_id == id);
    }
}

export const actions = {
    async nuxtServerInit({ commit }) {
        const categories = await this.$axios.$get('/categories');
        commit('SET_CATEGORIES', categories);
    },

    nuxtClientInit({ commit }) {
        commit('cart/INIT_CART');
        commit('cart/SET_CART_CONTENT');
    }
   
}
