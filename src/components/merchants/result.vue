<template>
  <div>
		<ul class="type-box" >
                <li>
                <div class="head"><img src="../../assets/images/cy.png" alt="">行业</div>
                   <p class="type-list"> 
                    <span v-for="(item,index) in typeOne" :class="{active:index==oneCode}" 
                    @click="selectOne(index)">{{item}}</span>
                    </p>
                   
                </li>
                 <li>
                 <div class="head">
                 <img src="../../assets/images/gm.png" alt="">规模
                 </div >
                   <p class="type-list"> 
                    <span v-for="(item,index) in typeTwo" :class="{active:index==twoCode}" @click="selectTwo(index)">{{item}}</span>
                    </p>
                </li>   
                 <li>
                 <div class="head">
                 <img src="../../assets/images/time.png" alt="">成立时间
                 </div>
                   <p class="type-list"> 
                    <span v-for="(item,index) in time" :class="{active:index==timeCode}" 
                    @click="selectTime(index)">{{item}}</span>
                    </p>
                </li> 
                </ul>
                <div class="sub-search">
                	   <el-input
                              
                              icon="search"

                              v-model="input2"
                              :on-icon-click="search">
                        </el-input>
                </div>
                <ul class="company-wrapper">
                    <router-link to="/merchants/merchantsDetail">
                        <li  v-for="(item,index) in company" >
                            <div class="company-box text-center">
                                <img src="" alt="" width="90" height="95">
                                <div class="name blue">{{item.name}}</div>
                                <p>经营范围：{{item.jj}}</p>
                                <p>成立时间：{{item.time}}</p>
                                <p>总部地点：{{item.location}}</p>
                            </div>
                            <div class="bg" @click="select(item)">
                                <img src="../../assets/images/view.png" height="45" width="43" alt="">
                                <h4>查看详情</h4>
                            </div>
                        </li>
                    </router-link>
                </ul>
	</div>
</template>
<style lang="less" scoped>
     .sub-search{
     	height:55px;
     	line-height:55px;
     	background-color:#fafafa;
     	border-left:1px solid #e8ebf2;
     	border-right:1px solid #e8ebf2;
     	padding:0 24px;
     	.el-input{
     		width:260px;
     	}
     	
     }
     .company-wrapper{
     	padding:20px 24px;
     	background-color:#ffffff;
     	border:1px solid #e8ebf2;
     	
     
		 
     	li{
            position:relative;
     		width:24%;
     		margin-left:1.33%;
     		height:295px;
     		padding:20px 0;
     		display:inline-block;
     		box-shadow:0 0 10px #e8ebf2;
     		margin-bottom:20px;
     		cursor:pointer;
        &:nth-child(4n+1){
        	margin-left:0;
        }
     	.company-box{
     		
     		width:240px;
     		margin:0 auto;
     		p{
     			margin-top:10px;
     			text-align:left;
     			color:#808080;
     		}
     		.name{
     			font-size:16px;
     			margin:20px 0;
     			text-align:center;
     			overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
     		}
     	}
     	}
     }
    .company-wrapper .bg{
    	position:absolute;
    	bottom:0;
    	left:0;
    	width:100%;
    	height:0px;
    	overflow: hidden;
    	color:#ffffff;
    	text-align:center;
    	
    	background-color:rgba(0,0,0,.7);
    	transition:all 0.5s;
    }
    .company-wrapper li:hover .bg{
    	height:295px;
    	padding-top:100px;
    }
     @media (max-width: 1366px) {
     	.company-wrapper li .company-box{width:230px;}
     }
	
</style>
<script>
	export default{
		data(){
			return{
				typeOne:["互联网","新能源"],
				typeTwo:['1-50人','50-100人'],
				time:['1-5年','5-10年','10-20年','20年以上'],
				oneCode:0,
				twoCode:0,
				timeCode:0,
				input2:"",
				company:[
				    {
				    	name:"中科点击（北京）科技有限公司",
				    	jj:"经营范围：互联网信息采集与数据挖掘、 搜索引擎核心技术",
				    	time:'2012',
				    	location:'北京'

				    },
				    {
				    	name:"中科点击（北京）科技有限公司",
				    	jj:"经营范围：互联网信息采集与数据挖掘、 搜索引擎核心技术",
				    	time:'2012',
				    	location:'北京'

				    },
				    {
				    	name:"中科点击（北京）科技有限公司",
				    	jj:"经营范围：互联网信息采集与数据挖掘、 搜索引擎核心技术",
				    	time:'2012',
				    	location:'北京'

				    },
				     {
				    	name:"中科点击（北京）科技有限公司",
				    	jj:"经营范围：互联网信息采集与数据挖掘、 搜索引擎核心技术",
				    	time:'2012',
				    	location:'北京'

				    }
				]
			}
		},
		methods:{
			selectOne(index){
				this.oneCode=index;
			},	
			selectTwo(index){
				this.twoCode=index;
			},	
			selectTime(index){
				this.timeCode=index;
			},	
			search(){

			},
			select(item){
               console.log(item);
			},
		},
	}
</script>