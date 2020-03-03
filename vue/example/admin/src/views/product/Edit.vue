<!--tips: 使用混合复用模板：引入create组件 -->
<script>
import Create from '@v/product/Create';
export default {
    mixins: [Create],
    data(){
        return{
            title:'编辑商品',
            submitUrl:'/admin/product/update'
        }

    },
    methods:{
        //在服务器端json中获取数据，并解构路由数据
        getData(){
            let {params}=this.$route;
            this.$http
                .get('admin/product/detail',{params})
                .then(({data})=>{
                    // console.log(data)
                    if(data.error === 0){
                        this.data=data.data
                    }else{
                        this.$message.error(data.msg);
                        this.$router.replace('/product/list/1')
                    }
                })
        }
    },
    created(){
        this.getData();
    },
    watch:{
        $route(){
            this.getData();
        }
    }
}
</script>
