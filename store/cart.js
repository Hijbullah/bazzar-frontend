import queryString from 'query-string'

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
    SET_CART_CONTENT(state) {
        state.subTotal = state.products.reduce((sum, item) => {
            return  sum + item.price * item.quantity;
        }, 0);

        state.totalQuantity = state.products.length;
        state.total = state.subTotal - state.shipping;
    },

    // SET_CART_PRODUCTS (state, products) {
    //     state.products = products
    // },

    // SET_TOTAL_QUANTITY(state, quantity) {
    //     state.totalQuantity = quantity;
    // },

    // SET_SUBTOTAL (state, subtotal) {
    //     state.subtotal = subtotal
    // },

    // SET_TOTAL (state, total) {
    //     state.total = total
    // },

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
    // async getCart ({ commit, state }) {
    //     let query = {}

    //     if (state.shipping) {
    //     query.shipping_method_id = state.shipping.id
    //     }

    //     let response = await this.$axios.$get(`cart?${queryString.stringify(query)}`)

    //     commit('SET_PRODUCTS', response.data.products)
    //     commit('SET_EMPTY', response.meta.empty)
    //     commit('SET_SUBTOTAL', response.meta.subtotal)
    //     commit('SET_TOTAL', response.meta.total)
    //     commit('SET_CHANGED', response.meta.changed)

    //     return response
    // },

    addProductToCart({ commit }, product) {
        commit('ADD_PRODUCT_TO_CART', product);
        commit('SET_CART_CONTENT');
        // commit('SHOW_CART_DETAILS');
    },
    increaseItemQty({ commit } ,id) {
        commit('INCREASE_ITEM_QTY', id);
        commit('SET_CART_CONTENT');
    },
    decreaseItemQty({ commit } ,id) {
        commit('DECREASE_ITEM_QTY', id);
        commit('SET_CART_CONTENT');
    },
    removeItem({ commit }, id) {
        commit('REMOVE_ITEM', id);
        commit('SET_CART_CONTENT');
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