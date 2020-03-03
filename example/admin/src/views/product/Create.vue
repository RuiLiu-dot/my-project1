<template>
<div class="page-product-create">
    <h1 class="page-title">{{title}}</h1>
    <!-- 一、设置内容：1 placeholder, 2 label, 3 label-width -->
    
    <el-form label-width="200px" :model="data" :rules="rules" ref="product">
        <el-form-item label="商品名称" prop="title">
            <el-input placeholder="请输入商品名称" v-model="data.title"></el-input>
        </el-form-item>

        <el-form-item label="商品描述" prop="description">
            <!-- 多行文本框 -->
            <el-input placeholder="请输入商品描述" v-model="data.description" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
            <el-input placeholder="请输入商品价格" v-model="data.price" type="number"></el-input>
        </el-form-item>

        <el-form-item label="商品原价" prop="originPrice">
            <el-input placeholder="请输入商品原价" v-model="data.originPrice" type="number"></el-input>
        </el-form-item>
         
         <!-- rate组件：评分 -->
        <el-form-item label="商品评分" prop="evaluate">
            <el-rate allow-half show-score v-model="data.evaluate"></el-rate>
        </el-form-item>
        <!-- 下拉框  商品分类-->
        <el-form-item label="商品分类" prop="type">
            <el-select placeholder="请选择商品分类" v-model="data.type">
                <!-- 设置循环遍历不同类型商品 -->
                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="商品销量" prop="sales">
            <el-input placeholder="请输入商品销量" v-model="data.sales" type="number"></el-input>
        </el-form-item>

        <el-form-item label="商品店名" prop="storeName">
            <el-input placeholder="请输入商品店名" v-model="data.storeName"></el-input>
        </el-form-item>

        <el-form-item label="商品地址" prop="storeAddress">
            <el-input placeholder="请输入商品地址" v-model="data.storeAddress"></el-input>
        </el-form-item>

        <el-form-item label="商品分店" prop="storeNum">
            <el-input placeholder="请输入商品分店" v-model="data.storeNum" type="number"></el-input>
        </el-form-item>

        <el-form-item label="商品图片" prop="img">
            <!-- 定义两个变量方法 -->
            <el-upload action="/admin/product/upload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :show-file-list="false"
            >
                <el-button type="primary">上传</el-button>
                <span slot="tip" class="ickt-upload-tip">请选择商品的图片</span>
            </el-upload>

            <img v-if="data.img" :src="data.img" alt="" class="ickt-upload-img">
        </el-form-item>


        <el-form-item label="商品内容" prop="content">
            <!-- 富文本编辑 -->
            <quill-editor v-model="data.content"></quill-editor>
        </el-form-item>

        <el-form-item>
            <el-button type="success" @click="submitData">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<style lang="scss">
 .ickt-upload-tip {
        margin-left: 10px;
        color: #dad2d2;
    }
.ickt-upload-img {
        margin-top: 20px;
        max-height: 200px;
    }
// .el-button{
//     font-size: 14px;
  
// }
// .el-rate{
//     color:#67c23a;
// }
</style>
 <!--二、 表单校验: 1 v-model, 2 model, 3 prop, 4 rules -->
 <script>
 import {types} from '@t/allTypes';
 export default {
    data() {
        let rules = {};
        // 设置规则,让所有的校验规则都是相同的 ,将所有的prop放在数组里，并遍历每一个要校验的prop
        ['img', 'title', 'description', 'sales', 'price', 'originPrice', 'type', 'evaluate', 'storeName', 'storeAddress', 'storeNum', 'content'].forEach(key=>{
            rules[key] =[{trigger: 'blur', required: true, message: '请输入内容'}]
        })
        return {    
            types,// 分类数据
            data: {},
            rules,//规则校验
            title: '创建商品',
            submitUrl: '/admin/product/create'
        }
    },
    computed: {
        dealData() {  
            ['sales', 'price', 'originPrice', 'evaluate', 'storeNum'].forEach(key => {
                this.data[key] = + this.data[key];  //更改原来数据中的属性值为数字类型
            })
            return this.data;
        }
    },
    methods: {
 
        uploadSuccess({ error, data, msg }) {
            // console.log('success', e)  //先验证是否方法成功
            if (error === 0) {
                this.$set(this.data, 'img', data)
                // console.log(this.data) //防止数据丢失
            } else {
              
                this.$message.error(msg);
            }
        },
        uploadError(e) {
            // console.log('fail', e)
            this.$message.error('上传失败');
        },
        submitData() {
            this.$refs.product
                .validate(valid => {
                    if (valid) {
                        //提交数据时 发送请求，提交数据 ，需要在服务器端定义请求接口
                        this.$http
                            .post(this.submitUrl, this.dealData)
                            .then(({ data }) => {
                                if (data.error=== 0) {
                                    //如果提交成功，进入列表页(切换方法)
                                    this.$router.replace('/product/list/1');
                                } else {
                                    this.$message.error(data.msg);
                                }
                          })
                    }
                })
        }
    }
}
 </script>s


  <!--三、 表单提交: 1 绑定事件, 2 ref, 3 this.$refs -->