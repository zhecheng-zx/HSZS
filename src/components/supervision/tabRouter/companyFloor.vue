<template>
    <div class="floor">
         <bd-map :park-info="info"></bd-map>
        <div class="details-list">
        	<div class="title">列表详情</div>
        	<ul class="d-list-box">
        		<li class="d-list-item" v-for="(item,index) in companys">
        			<div class="circle">{{index+1}}</div>
        			<div class="info">
        				<p class="name">中科点击有限告诉北京分部</p>
        				<p class="address">地址：北京市海淀区华胜天成科研大厦二楼</p>
        			</div>
        		</li>
        	</ul>
        </div>
    </div>
</template>
<script>
     import bdMap from '../../commonParts/bdMap.vue'
    export default{
          components:{
              "bdMap":bdMap
          },
           data(){
           	 return{
           	 	companys:[
                    {

                    }
           	 	],
                info:{
                   name:'中关村软件园'
                 }
           	 }
           }
    }
</script>
<style lang="less" scoped>
	.floor{
		height:400px;
		margin-top:15px;
		background-color:#ffffff;
		position:relative;
		.details-list{
			width:400px;
			 position:absolute;
	         left:30px;
	         top:20px;
			.title{
				height:40px;
				line-height:40px;
				padding:0 20px;
				font-size:16px;
				background-color:#d7f1ff;
				 border-bottom:1px solid #62c7ff;
			}
		}
	}
   .d-list-box{
       
         background-color:#f5f9ff;

         li{
         	padding:15px 20px;
         	border-bottom:1px solid #f0f0f0;
         	.circle{
         		width:30px;
         		height:30px;
         		text-align:center;
         		line-height:30px;
         		vertical-align: middle;
         		border-radius:50%;
         		border:1px solid #62c7ff;
         		display:inline-block;
         		vertical-align: top;
         		margin-top:8px;
         		margin-right:10px;
         	}
         	.info{
                 display:inline-block;
                 .name{
                 	font-size:16px;
                   }
                 .address{
                 	margin-top:5px;
                 	color:#999999;
                 }
         	}
         }
   }
</style>