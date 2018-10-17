<template>
    <div class="companyBusiness">
        <div class="content-block">
        	<div class="c-b-title">企业业务<span class="count-circle">5</span></div>
        	<ul class="business-list clearfix">
        		<li class="business-list-item">
        			<img src="../../../assets/images/business.png" height="80" width="80" alt="">
        			<div class="name blue">小米直播</div>
        			<div class="type">文化娱乐</div>
        			<div class="Introduction">在线视频直播平台</div>
        		</li>
        		<li class="business-list-item">
        			<img src="../../../assets/images/business.png" height="80" width="80" alt="">
        			<div class="name blue">小米直播</div>
        			<div class="type">文化娱乐</div>
        			<div class="Introduction">在线视频直播平台</div>
        		</li>
        		<li class="business-list-item">
        			<img src="../../../assets/images/business.png" height="80" width="80" alt="">
        			<div class="name blue">小米直播</div>
        			<div class="type">文化娱乐</div>
        			<div class="Introduction">在线视频直播平台</div>
        		</li>
        		<li class="business-list-item">
        			<img src="../../../assets/images/business.png" height="80" width="80" alt="">
        			<div class="name blue">小米直播</div>
        			<div class="type">文化娱乐</div>
        			<div class="Introduction">在线视频直播平台</div>
        		</li>
        		<li class="business-list-item">
        			<img src="../../../assets/images/business.png" height="80" width="80" alt="">
        			<div class="name blue">小米直播</div>
        			<div class="type">文化娱乐</div>
        			<div class="Introduction">在线视频直播平台</div>
        		</li>
        		<li class="business-list-item">
        			<img src="../../../assets/images/business.png" height="80" width="80" alt="">
        			<div class="name blue">小米直播</div>
        			<div class="type">文化娱乐</div>
        			<div class="Introduction">在线视频直播平台</div>
        		</li>

        	</ul>
        </div>
        <div class="content-block">
        	<div class="c-b-title">投资事件<span class="count-circle">5</span></div>
        	<table class="table-zs">
        		<thead>
        			<tr>
        				<th>时间</th>
        				<th>轮次</th>
        				<th>金额</th>
        				<th>投资方</th>
        				<th>产品</th>
        				<th>地区</th>
        				<th>行业</th>
        				<th>业务</th>
        			</tr>
        		</thead>
        		<tbody>
        			<tr>
        				<td>2017-04-24</td>
        				<td>C轮</td>
        				<td>100万</td>
        				<td>小米科技、丰厚资本 京东金融、顺为资本</td>
        				<td><img src="../../../assets/images/mi.png" height="41" width="41" alt="">悦动圈</td>
        				<td>广<img src="" alt="">东</td>
        				<td>体育健身</td>
        				<td>跑步移动社交应用</td>
        			</tr>
        		</tbody>
        	</table>
        	<div class="text-center">
		        <el-pagination
				   @current-change="change"
				  layout="prev, pager, next"
				  :total="50">
				</el-pagination>
			</div>
        </div>
        <div class="content-block">
        	<div class="c-b-title">竞标信息<span class="count-circle">5</span></div>
        	<table class="table-zs">
        		<thead>
        			<tr>
        				<th>产品</th>
        				<th>地区</th>
        				<th>轮次</th>
        				<th>行业</th>
        				<th>业务</th>
        				<th>时间</th>
        				<th>估值</th>
        			
        			</tr>
        		</thead>
        		<tbody>
        			<tr>
        			    <td><img src="../../../assets/images/mi.png" height="41" width="41" alt="">悦动圈</td>
        			    <td>广东</td>
        			    <td>C轮</td>
        			    <td>体育健身</td>
        			    <td>跑步移动社交应用</td>
        				<td>2017-04-24</td>
        				<td>100万</td>
        			</tr>
        		</tbody>
        	</table>
        	<div class="text-center">
		        <el-pagination
				   @current-change="change2"
				  layout="prev, pager, next"
				  :total="50">
				</el-pagination>
			</div>
        </div>
    </div>
</template>
<script>
    export default{
          data(){
          	return{

          	}
          },
          methods:{
          	change(){

          	},
          	change2(){

          	},
          },
    }
</script>
<style lang="less" scoped>
    .c-b-title{
    	font-size:16px;
    	color:#000000;

    }
	.count-circle{
		display:inline-block;
		width:20px;
		height:20px;
		lin-height:20px;
		font-size:14px;
		text-align: center;
		border-radius:50%;
		color:#ffffff;
		background-color:#00aaff;
		margin-left:5px;
	}
	.business-list-item{
		float:left;

		width:20%;
		overflow: hidden;
		margin:20px 0;
		&>div{
			padding-left:10px;
			 overflow: hidden;
			  white-space: nowrap;
			  text-overflow: ellipsis;
			  margin-top:3px;
		}
		img{
			float:left;
		}
		.name{
			font-size:16px;
		}
		.Introduction{
			color:#999999;
			 
		}
	}
	.table-zs{
		margin:20px 0;
		border:1px solid #e8ebf2;
	}
	.el-pagination{
		display:inline-block;
		
		
	}
</style>