<template>
    <div class="content-block">
        <ul class="type-box">
                    <li>
                        <div class="head">
                        <img src="../../../assets/images/wd.png" height="15" width="15" alt="">维度筛选
                         
                        </div >
                         <p class="type-list"> 
                          <span v-for="(item,index) in wd" :class="{active:index==wdCode}"  @click="select(item,index)">{{item}}</span>
                          </p>
                    </li>
                    <li>
                        <div class="head">
                        <img src="../../../assets/images/time.png" height="17" width="18" alt="">时间
                        
                        </div >
                         <p class="type-list"> 
                          <span v-for="(item,index) in time" :class="{active:index==timeCode}"  @click="selectTime(item,index)">{{item}}</span>
                          </p>
                    </li>  

         </ul>   
          <ul class="list-box" >
                 <li v-for="(item,index) in article">
                    <div >
                      <a class="article-title" href="javascript:void(0);">
                        {{item.title}}
                      </a>
                     <span class="article-time">{{item.time}}</span>
                    </div>
                    <p class="article-content">
                      {{item.content}}
                    </p>
                    <div class="sub-info">

                       <span>
                       <img src="../../../assets/images/laiyuan.png" alt="">
                        来源：{{item.ly}}
                       </span>
                       <span>
                       <img src="../../../assets/images/wd.png" alt="">
                        维度：{{item.wd}}
                       </span>
                       <span>
			             <img src="../../../assets/images/company.png" alt="">
			              涉及公司：中科点击
			             </span>
                     </div>
                 </li>
                 
              </ul>
    </div>
</template>
<script>
    export default{
       data(){
       	return{
       		wd:["正面","负面"],
       		wdCode:0,
       		time:["今天","昨天","近七天","近30天","自定义时间"],
       		timeCode:0,
       		checkedAll:false,
       		article:[
       		  {
       		  	title:'家乡在变好，发展机会越来越多——传统输出大省农民工回流趋势明显',
       		  	content:'新华社北京２月９日电题：家乡在变好，发展机会越来越多传统输出大省农民工回流趋势明显新华社记者正月十五前后，往常都是农民工集中外',
       		  	time:'2017-02-02',
                wd:'媒体报道',
                ly:'凤凰网'

       		  },
       		  {
       		  	title:'家乡在变好，发展机会越来越多——传统输出大省农民工回流趋势明显',
       		  	content:'新华社北京２月９日电题：家乡在变好，发展机会越来越多传统输出大省农民工回流趋势明显新华社记者正月十五前后，往常都是农民工集中外',
       		  	time:'2017-02-02',
                wd:'媒体报道',
                ly:'凤凰网'
       		  }
       		]

       	}
       },
       methods:{
       	selectWd(item,index){

       	},
       	selectTime(item,index){

       	}
       }
    }
</script>
<style lang="less" scoped>
 .type-box{
 	margin:0 -24px;
 	border:none;
 }	
 .list-box{
 	border-top:1px solid #e8ebf2;
 	margin:0 -24px;
 	.sub-info{
 		margin-top:15px;
 	}
 }
</style>