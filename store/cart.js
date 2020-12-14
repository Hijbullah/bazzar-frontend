export const state = () => ({
    products: [],
    shipping: 0,
    totalQuantity: 0,
    subTotal: 0,
    total: 0,
    showCartDetail: false,
})

export const getters = {
    getCartContents: state => {
        return {
            products: state.products,
            subTotal: state.subTotal,
            shipping: state.shipping,
            totalQuantity: state.totalQuantity,
            total: state.total
        }
    },
    
    cartTotalQuantity: state => state.totalQuantity,
    getTotal: state => state.total,
    subtotal: state => state.subTotal,
    showCartDetails: state => state.showCartDetail,
}

export const mutations = {
    INIT_CART(state) {
        state.products = JSON.parse(localStorage.getItem('cart')) ?? [];
    },
    SET_CART_CONTENT(state) {
        state.subTotal = state.products.reduce((sum, item) => {
            return  sum + item.price * item.quantity;
        }, 0);

        state.totalQuantity = state.products.length;
        state.total = state.subTotal - state.shipping;
    },

    ADD_CART_TO_LOCAL_STORAGE(state) {
        localStorage.setItem('cart', JSON.stringify(state.products));
    },

    ADD_PRODUCT_TO_CART(state, product){
        const existingProduct = state.products.find(item => item.id == product.id);
        if(existingProduct) {
            existingProduct.quantity += 1;
        }else{
            state.products.push(product);
        }
    },
    INCREASE_ITEM_QTY(state, id) {
        state.products.find(item => item.id == id).quantity += 1;
    },
    DECREASE_ITEM_QTY(state, id) {
        let item = state.products.find(item => item.id == id);
        if(item.quantity > 1) {
            item.quantity -= 1;
        }else{
            state.products.splice(state.products.findIndex(item => item.id == id), 1);
        }
    },
    REMOVE_ITEM(state, id) {
        state.products.splice(state.products.findIndex(item => item.id == id), 1);
    },

   
    SHOW_CART_DETAILS(state) {
        state.showCartDetail = true;
    },
    HIDE_CART_DETAILS(state) {
        state.showCartDetail = false;
    }
}

export const actions = {
    initCart({ commit }) {
        commit('cart/INIT_CART');
        commit('cart/SET_CART_CONTENT');
    },

    async addProductToCart({ commit }, product) {
        commit('ADD_PRODUCT_TO_CART', product);
        commit('SET_CART_CONTENT');
        commit('ADD_CART_TO_LOCAL_STORAGE');
        // commit('SHOW_CART_DETAILS');
    },
    increaseItemQty({ commit } ,id) {
        commit('INCREASE_ITEM_QTY', id);
        commit('SET_CART_CONTENT');
        commit('ADD_CART_TO_LOCAL_STORAGE');
    },
    decreaseItemQty({ commit } ,id) {
        commit('DECREASE_ITEM_QTY', id);
        commit('SET_CART_CONTENT');
        commit('ADD_CART_TO_LOCAL_STORAGE');
    },
    removeItem({ commit }, id) {
        commit('REMOVE_ITEM', id);
        commit('SET_CART_CONTENT');
        commit('ADD_CART_TO_LOCAL_STORAGE');
    }

    // async destroy ({ dispatch }, productId) {
    //     let response = await this.$axios.$delete(`cart/${productId}`)

    //     dispatch('getCart')
    // },

    // async update ({ dispatch }, { productId, quantity }) {
    //     let response = await this.$axios.$patch(`cart/${productId}`, {
    //     quantity
    //     })

    //     dispatch('getCart')
    // },

    // async store ({ dispatch }, products) {
    //     let response = await this.$axios.$post('cart', {
    //     products
    //     })

    //     dispatch('getCart')
    // },

    // async setShipping ({ commit }, shipping) {
    //     commit('SET_SHIPPING', shipping)
    // }
}