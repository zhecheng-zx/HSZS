<template>
	<div class="content-block">
		<div class="title policy-title">
           <img src="../../assets/images/outflow-b.png" alt="">企业疑似外流
        </div>
        <div class="table-box" v-if="list.length!=0">
        	<table class="table-zs">
        	<thead>
        		<tr>
        			<th>企业名称</th>
        			<th>相关情报</th>
        			
        			<th>预警时间</th>
        			<th>操作</th>
        		</tr>
        	</thead>
        	<tbody>
        		<tr v-for="(item,index) in list">
        			<td>{{item.business}}</td>
        			<td>{{item.title}}</td>
        		
        			<td>{{item.publishTime}}</td>
        			<td><!-- <a v-bind:class="{'blue':item.hasWarn,'huise':!item.hasWarn}" href="javascript:void(0);" @click="view(item.id)">查看详情</a> --> 
                        <a v-bind:class="{'blue':item.hasWarn,'huise':!item.hasWarn}" :href="item.sourceLink" target="_blank">查看详情</a></td>
        		</tr>
        		</tbody>
        </table>	
         <div class="text-center" v-if="total!=0">
            <el-pagination @current-change="change" :page-size="pageSize" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
        </div>
        <div class="text-center no-data" v-if="list.length==0" >
                   <img src="../../assets/images/noData.png" height="166" width="157" alt="">
           </div>

	</div>
</template>
<style scoped>
	.table-box{
		margin:0 -24px 0 -24px ;

	}
   
	 .load-more{
    	margin-top:60px;
    }
    .table-zs tbody tr td{
    	max-width:300px;
    }
     td a:visited{
       color:#999;
    }
    .el-pagination {
    display: inline-block;

    margin-top: 60px
}
</style>
<script> 
	export default{
		data(){
			return{
                 pageNumber:1,
                 pageSize:8,
                 total:0,
                 list:[]
                 
			}
		},
		methods:{
            getList(){
              this.$ajax.post('/apis/warning/getBusinessOutflowList.json',{pageNumber:this.pageNumber,pageSize:this.pageSize}).then(res => {
                   this.total=res.data.data.totalElements;
                   this.list=res.data.data.content;
                   console.log(this.list)
              }).catch(err => console.log(err))
            },
            view(Id){
                this.$ajax.get('/apis/warning/deleteWarning.json',{params:{id:Id}}).then(res=>{
                    console.log(res)
                    this.$router.push({path:'/supervision/articleList/'+Id});
                })
                   
            },
			change(val){
             this.pageNumber=val;   
             this.getList();
         },
		},
        created(){
            this.getList();
        },
	}
</script>