<template>
<div class="ickt-search">
    <!-- <h2 @click="demo">search component -- {{value}}</h2> -->
    <!-- <input type="text" :value="value" @input="e => this.$emit('input', e.target.value)"> -->
    <!-- v-model指令只能在组件内部实现数据双向绑定，不能跨组件 -->
    <!-- <input type="text" v-model="value"> -->
    <input type="text" :placeholder="placeholder" @keyup.enter="showSearch">
</div>
</template>
<style scoped lang="scss">
.ickt-search {
    display: flex;
    background: #fff;
    padding: 10px 20px;
    input {
        padding: 8px 20px;
        font-size: 12px;
        flex: 1;
        border: none;
        outline: none;
        background: #efefef;
        border-radius: 15px;
    }
}
</style>
<script>
export default {
    // 接收数据
    props: {
        placeholder: String,
        // 搜索方法
        search: {
            // 默认值
            default() {
                return () => {}
            }
        }
    },
    // 方法
    methods: {
        // 展示搜索结果
        showSearch(e) {
            // 获取内容
            this.search(e.target.value)
            // 清空输入框
            e.target.value = '';
        }
    }
    // // 接收数据
    // props: ['value'],
    // // 方法
    // methods: {
    //     demo() {
    //         // 父组件发送消息
    //         this.$emit('input', 'ickt')
    //     }
    // }
}
</script>