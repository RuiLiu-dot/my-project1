<!--tips: 使用混合复用模板：引入create组件 -->
<script>
import Create from '@v/user/Create';
export default {
    mixins: [Create],
    data(){
        return{
            title:'编辑用户',
            // submitUrl:'/admin/user/update'
        }

    },
    methods:{
        //在服务器端json中获取数据，并解构路由数据
        getData(){
            let {params}=this.$route;
            // this.$http
            //     .get()
            //     .then(({data})=>{
            //         // console.log(data)
            //         if(data.error === 0){
            //             this.data=data.data
            //         }else{
            //             this.$message.error(data.msg);
            //             this.$router.replace('/product/list/1')
            //         }
            //     })
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