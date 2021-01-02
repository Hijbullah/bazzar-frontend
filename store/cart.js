export const state = () => ({
    products: [], //each product property: id,slug,name,salePrice,orginalPrice,discount,image,quantity
    delivery: 0,
    totalQuantity: 0,
    subTotal: 0,
    total: 0,
    showCart: false,
})

export const getters = {
    getCartContents: state => {
        return {
            products: state.products,
            subTotal: state.subTotal,
            delivery: state.delivery,
            totalQuantity: state.totalQuantity,
            total: state.total
        }
    },

    getProductFromCart: (state) => (id) => {
        return state.products.find(product => product.id === id)
    },
    cartTotalQuantity: state => state.totalQuantity,
    getTotal: state => state.total,
    subtotal: state => state.subTotal,
    showCart: state => state.showCart
}

export const mutations = {
    INIT_CART(state) {
        state.products = JSON.parse(localStorage.getItem('cart')) ?? [];
    },
    SET_CART_CONTENT(state) {
        state.subTotal = state.products.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        state.totalQuantity = state.products.length;
        state.total = state.subTotal - state.delivery;
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

    CLEAR_CART_CONTENT(state) {
        localStorage.removeItem('cart');
        state.products = [];
        state.delivery = 0;
        state.totalQuantity = 0;
        state.subTotal = 0;
        state.total = 0;
    },

   
    SHOW_CART(state) {
        state.showCart = true;
    },
    HIDE_CART(state) {
        state.showCart = false;
    }
}

export const actions = {
    initCart({ commit }) {
        commit('cart/INIT_CART');
        commit('cart/SET_CART_CONTENT');
    },

    addProductToCart({ commit }, product) {
        commit('ADD_PRODUCT_TO_CART', product);
        commit('SET_CART_CONTENT');
        commit('ADD_CART_TO_LOCAL_STORAGE');
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
    },
    clearCartContent({ commit }) {
        commit('CLEAR_CART_CONTENT');
        commit('HIDE_CART_DETAILS');
    }
}