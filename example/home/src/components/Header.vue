<template>
<div class="ickt-header">
    <div class="left">
        <slot name="left"></slot>
    </div>
    <div class="title">
        <h1 v-if="title">{{title}}</h1>
        <slot v-else></slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
    </div>
</div>
</template>
<style scoped lang="scss">
// 引入样式库
@import '../base.scss';
.ickt-header {
    background: $navColor;
    color: #fff;
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    .left,
    .right {
        width: 60px;
    }
    .title {
        flex: 1;
        h1 {
            font-size: 24px;
            font-weight: normal;
            text-indent: -0.5em;
        }
    }
    .arrow {
        position: relative;
        &:before,
        &:after {
            @include arrow(10px, #fff, right);
            content: '';
            position: absolute;
            top: 15px;
            left: 10px;
        }
        &:after {
            left: 13px;
            border-right-color: $navColor;
        }
    }
}
</style>
<script>
export default {
    // 接收属性
    props: ['title']
}
</script>