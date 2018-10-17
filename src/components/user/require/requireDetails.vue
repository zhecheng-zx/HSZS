<template>
	<div class="content-block">
	 <a href="javascript:void(0);" class="blue" @click="$router.go(-1)">返回</a>
		<div class="require">
			<table class="table-zs">
				<tbody>
					<tr>
						<td>企业名</td>
						<td>{{company.name}}</td>
					</tr>
					<tr>
						<td>所属企业</td>
						<td>{{company.fatherName}}</td>
					</tr>
					<tr>
						<td>企业标签</td>
						<td>{{company.label}}</td>
					</tr>
					<tr>
						<td>企业关系</td>
						<td>{{company.relation}}</td>
					</tr>
					<tr>
						<td>企业关系备注</td>
						<td>{{company.relationRemark}}</td>
					</tr>
					<tr>
						<td>企业状态</td>
						<td>{{company.companyStatus}}</td>
					</tr>

					<tr>
						<td>负责人</td>
						<td>{{company.responsiblePerson}}</td>
					</tr>
					<tr>
						<td>招商状态</td>
						<td>{{company.investmentStatus}}</td>
					</tr>
					<tr>
						<td>招商备注</td>
						<td>{{company.investmentRemark}}</td>
					</tr>

				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
             return{
                  company:{}
             }
		},
		mounted(){
			this.$ajax.get('/apis/pool/findPoolCompanyById.json',{params:{id:this.$route.params.id}}).then(res=>{
                    this.company=res.data.data;
			})
		}
        
	}
</script>
<style scoped>
	.require{
		width:740px;
		margin:0 auto;
		margin-top:20px;
		border:1px solid #e8ebf2;
	}
.require tr td{
		width:50%;
		text-align:left;
		
	}
.require tr td:first-child{
	padding-left:150px;
}
</style>