<template>
	<div class="content-block">
		<div class="title policy-title">
           <img src="../../assets/images/change-b.png" alt="">信息变更预警
     </div>
     <!-- <div class="change-search">
         <el-input placeholder="变更搜索" v-model="searchVal">
		    <el-button slot="append" icon="search" @click="search"></el-button>
		  </el-input>
		 </div> -->
	  <div class="table-box"> 
        <table class="table-zs">
        	<thead>
        		<tr>
        			<th>所属单位</th>
        			<th>类型标签</th>
        			<th>更新属性</th>
        			<th>变更时间</th>
        			<th>操作</th>
        		</tr>
        	</thead>
        	<tbody>
            <tr v-for="(item,index) in list">
              <td>{{item.company}}</td>
              <td>{{item.tag}}</td>
              <td>{{item.changeItem}}</td>
              <td>{{item.changeTime}}</td>
              <td><a v-bind:class="{'blue':!item.dr,'huise':item.dr}" href="javascript:void(0);" @click="view(item.id)">查看详情</a></td>
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
<style lang="less" scoped>
	.change-search{
         padding:20px 35px;
         .el-input{
         	width:300px;
         }
	}
    .table-box{
    	margin:0 -24px;
    }
    .load-more{
    	margin-top:60px;
    }
    td a:visited{
       color:#999;
    }
</style>
<script> 
	export default{
		data(){
			return{
             pageNumber:1,
             pageSize:8,
             total:0,
             list:[],
			}
		},
		methods:{
             getList(){
              this.$ajax.post('/apis/warning/getInformationChangeList.json',{pageNumber:this.pageNumber,pageSize:this.pageSize}).then(res => {
                   this.total=res.data.data.totalElements;
                   this.list=res.data.data.content;
              }).catch(err => console.log(err))
            },
             view(Id){
                this.$ajax.get('/apis/warning/deleteWarning.json',{params:{id:Id}}).then(res=>{
                    this.$router.push({path:'/supervision/infoWarning/warningDetails/'+Id});
                })
                   
            },
           change(val){
             this.pageNumber=val;
             this.getList();
         },
		    
			
		},
        created(){
            this.getList();
        }
	}
</script>