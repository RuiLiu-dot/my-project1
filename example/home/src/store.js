import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 搜索数据
        search: '',
        // 数据
        // products: [{price: 10}, {price: 50}, {price: 100}, {price: 20}, {price: 30}]
        products: []
    },
    // 计算属性数据
    getters: {
        // 对商品求和
        price(state) {
            // 数组求和
            return state.products
                .reduce((res, item) => res + +item.price, 0)
                // 保留两位小数
                .toFixed(2)
        }
    },
    mutations: {
        // 更新搜索内容
        updateSearch(state, value) {
            // console.log(state, value)
            // 存储数据
            state.search = value;
        },
        // 加入购物车
        addProduct(state, data) {
            // console.log('add product')
            // 如果商品价格不合法，不能加入购物车
            if (isNaN(data.price, NaN)) {
                // 价格不合法
                alert('该商品没有价格，不能加入购物车！')
                return;
            }
            // 可以加入购物车
            state.products.push(data);
        },
        // 移除购物车
        removeProduct(state, data) {
            // console.log('remove product')
            // 获取商品在购物车中的位置
            let index = state.products.findIndex(item => item._id === data._id);
            // 如果存在该商品
            if (index >= 0) {
                // 移除购物车
                state.products.splice(index, 1);
            } else {
                // 该商品不存在
                alert('购物车中，不存在该商品');
            }
        }
    },
    actions: {

    }
})
