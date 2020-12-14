export const state = () => ({
    user: {
        name: '',
        mobile: '',
        addresses: [
            // {
            //     name: '',
            //     mobile: '',
            //     area: '',
            //     address: ''
            // }
        ]  
    },
    categories: [],
    childCategories: []
})

export const getters = {
    getUserInfo: state => state.user,

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
    },
    SET_ADDRESS(state, address) {
        state.user.addresses.push(address);
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
    },
    
    addAddress({ commit }, address) {
        // console.log(address);
        commit('SET_ADDRESS', address);
    }
   
}
