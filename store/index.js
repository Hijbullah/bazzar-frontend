export const state = () => ({
    categories: [],
    selectedCategories: []
})

export const getters = {
    isSidebarOpen: state => state.isSidebarOpen,
    getCategories: state => state.categories,
    getSelectedCategories: state => state.selectedCategories,
}

export const mutations = {
    OPEN_SIDEBAR(state) {
        state.isSidebarOpen = true;
    },
    HIDE_SIDEBAR(state) {
        state.isSidebarOpen = false;
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_SELECTED_CATEGORIES(state, category) {
       state.selectedCategories = category.categoryParentsPath;
    }
}

export const actions = {
    async nuxtServerInit({ commit }) {
        const { data } = await this.$axios.$get('/get-categories');
        commit('SET_CATEGORIES', data);
    },
    nuxtClientInit({ commit }) {
        commit('cart/INIT_CART');
        commit('cart/SET_CART_CONTENT');
    }
}
