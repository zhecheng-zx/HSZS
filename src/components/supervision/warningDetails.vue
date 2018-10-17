<template>
	<div class="content-block">
		<div class="title policy-title">
           <img src="../../assets/images/yanz.png" alt="">预警详情
			<a href="#" @click="back()" class="back">返回</a>
        </div>
         
        <div class="details">
        	<table class="table-zs">
	        	  <tbody>
	        		 <tr>
	        		 	<td>名称</td>
	        		 	<td>{{info.company}}</td>
	        		 </tr>
	        		 <tr>
	        		 	<td>类型标签</td>
	        		 	<td>{{info.tag}}</td>
	        		 	
	        		 </tr>
	        		 <tr>
	        		 	<td>所属单位</td>
	        		 	<td>{{info.park}}</td>
	        		 </tr>
	        		 <tr>
	        		 	<td>更新属性</td>
	        		 	<td>{{info.changeItem}}</td>
	        		 </tr>
	        		 <tr>
	        		 	<td>更新前</td>
	        		 	<td>{{info.contentBefore}}</td>
	        		 </tr>
	        		 <tr>
	        		 	<td>更新后</td>
	        		 	<td>{{info.contentAfter}}</td>
	        		 </tr>
	        		 <tr>
	        		 	<td>更新时间</td>
	        		 	<td>{{info.changeTime}}</td>
	        		 </tr>
	        		
	        		</tbody> 
	        	</table>
        </div>
          <div class="details-btn">
          <a :href="'/apis/oauth/getSearchList.json?name='+info.company" target="_blank">
          <el-button type="primary">查看企业详情</el-button>
          </a>
          </div>
	</div>
</template>
<style lang="less" scoped>
	.details{
		width:940px;
		margin:0 auto;
		margin-top:20px;
		border:1px solid #e8ebf2;
	}
	.details-btn{
		margin-top:60px;
		text-align:center;
	}
	tr td{width:50%;}
	.back {
		display: block;
		margin-top: 10px;
		color: #00a5ff;
		font-size: 16px;
		float: right;
	}
	.back:hover{
		color: #00a5ff;
	}
</style>
<script> 
	export default{
		data(){
			return{
              info:{
              	company:'',
              	tag:'',
              	park:'',
              	changeItem:'',
              	changeBefore:'',
              	changeAfter:'',
              	changeTime:''
              }
           }   
		},
		methods:{
            back() {
                this.$router.go(-1)
            },
		},
		mounted(){

			 this.$ajax.get('/apis/warning/getInformationChangeById.json',{params:{id:this.$route.params.id}}).then(res=>{
                        this.info=res.data.data;
                    }).catch(err=>{console.log(err)})
		}
	}
</script>