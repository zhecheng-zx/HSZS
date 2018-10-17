<template>
	<ul class="industryType">
			<li class="type-item text-center" >
				<img src="../../../assets/images/jinrong.png" alt="">
				<p class="type-name ">金融</p>
			</li>

			<li class="type-item text-center" >
				<img src="../../../assets/images/qiche.png" alt="">
				<p class="type-name ">汽车</p>
			</li>
			<li class="type-item text-center" >
				<img src="../../../assets/images/bigdata.png" alt="">
				<p class="type-name ">大数据</p>
			</li>
			<li class="type-item text-center" >
				<img src="../../../assets/images/yiliao.png" alt="">
				<p class="type-name ">医疗健康</p>
			</li>
			<li class="type-item text-center" >
				<img src="../../../assets/images/zhineng.png" alt="">
				<p class="type-name ">人工智能</p>
			</li>
			<li class="type-item text-center" >
				<img src="../../../assets/images/wuliu.png" alt="">
				<p class="type-name ">物流</p>
			</li>
			<li class="type-item text-center" >
				<img src="../../../assets/images/shangwu.png" alt="">
				<p class="type-name ">电子商务</p>
			</li>
		    <li class="type-item text-center">
			<img src="../../../assets/images/add1.png"  alt="">
			<p class="type-name ">更多</p>
		   </li>
	</ul>
</template>
<style lang="less" scoped>
	.industryType{
		font-size: 0;
		padding:30px 35px;
		border:1px solid #e8ebf2;
		background-color:#ffffff;
		.type-item{
			   display:inline-block;
               width:24%;
     		   margin-left:1.33%;   
     		   box-shadow: 0 0 10px #e8ebf2;
     		   cursor:pointer;
     		   margin-bottom:60px;
               &:nth-child(4n+1){
               	margin-left:0;
               }
     		   &:hover{
     		   	box-shadow: 0 0 25px #999;
     		   }
     		   img{
     		   	width:100%;
     		   }
     		   .type-name{
     		   	border-top:1px solid #e8ebf2;
				font-size:16px;
				height:45px;
				line-height:40px;
		         }
		         .add{
		         	width:auto;
		         }
		}
		

	}
</style>
<script>
	export default{
        data(){
        	return{
               
               activeType:''
        	}
        },
        mounted(){
        	let vm=this;
               $(".industryType li").on("click",function(){
               	  vm.activeType=$(this).find("p").text();
               	  if(vm.activeType!=="更多"){
               	  vm.$router.push({path:'/merchants/intelligent/recommendCompanys',query:{query:vm.activeType}});
               	  };
               	  if(vm.activeType=="更多"){
                      alert("暂无更多,敬请期待")
               	  }
               })


        },
	}
</script>