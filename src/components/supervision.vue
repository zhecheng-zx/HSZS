<template>
	<div>
	  	<head-bar></head-bar>
	    <div class="wrapper">
           <div class="left-bar">
		         <ul class="left-nav">
					  <li> <router-link to="/supervision/parkInfo" style="padding-left:20px;"> 
                     <i class="icon-left6"></i>园区情报</router-link>
					<ol>
						<li>
							<router-link to="/supervision/parkInfo" active-class="active"> <i class="icon-left7"></i>园区概览</router-link>
						</li>
						<li>
							<router-link to="/supervision/focusPark" active-class="active"> <i class="icon-left8"></i>关注园区</router-link>
						</li>
					</ol>
            	</li>
		            <!-- <li>
		                <router-link to="/supervision/parkMap" active-class="active" >
		                <img src="../assets/images/supervision.png" style="margin-right:6px;" alt="">
		                园区监管</router-link>
		            </li>  
			     	<li>
		                <router-link to="/supervision/parkCompanys" active-class="active" >
		                <img src="../assets/images/n5.png" style="margin-right:9px;" alt="">
		                园区企业</router-link>
		            </li>  
		            <li>
		               <router-link to="/supervision/goodNews" > 
		                 <img src="../assets/images/n6.png" height="16" width="18" alt="">企业动态</router-link>
                         <ol>
                         	<li>
                         	<router-link to="/supervision/goodNews" active-class="active" > 
                         	<img src="../assets/images/good-w.png" height="16" width="18"  alt="">
		                    企业捷报</router-link>
		                    </li>
		                    <li>
                         	<router-link to="/supervision/badNews" active-class="active" > 
                         	<img src="../assets/images/bad-w.png" height="14" width="15"  alt="">
		                    企业负面</router-link>
		                    </li>
                         </ol>
		                  
		            </li>   
		            <li>
		                <router-link to="/supervision/outflow" >  
		                <img src="../assets/images/n7.png" height="19" width="18" style="margin-right:12px;" alt="">园区预警</router-link>
		                 <ol>
                         	<li>
                         	<router-link to="/supervision/outflow" active-class="active" > 
                         	<img src="../assets/images/outflow.png" height="15" width="15"  alt="">
		                    企业疑似外流</router-link>
		                    </li>
		                    <li>
                         	<router-link to="/supervision/infoWarning" active-class="active" > 
                         	<img src="../assets/images/change.png" height="18" width="17"alt="">
		                    信息变更预警</router-link>
		                    </li>
                         </ol>
		            </li> -->
		            
		       </ul>
		
	      </div>
	       <div class="home">
            <div class="main-content">
		     <router-view></router-view>
		     </div>
              <footer>
                <!-- Copyright©2008-2016 中科点击（北京）科技有限公司-版权所有  京ICP备11012241-3号 -->
            </footer>
		    </div> 
		</div>
	</div>
</template>
<style scoped>
	.left-nav{
		padding-top:15px;
	}
</style>
<script>
  import headBar from './commonParts/headBar.vue'
   export default{
   	    components:{
           'headBar': headBar
   	    },
   	    data(){
   	    	return{
                isShow : true
   	    	}
   	    },
   	    mounted(){
               $(function(){

			    var min_height=$(window).height()-212+"px";

				$(".main-content").css({"min-height":min_height}); 
				$(window).resize(function(){
					    var min_height=$(window).height()-212+"px";

				$(".main-content").css({"min-height":min_height}); 
			   });
   				});
   	    },
       watch:{
           '$route'(to, from,name) {
               if(to.name=="articleList"){
                   this.isShow=false;
               }else{
                   this.isShow=true;
               };
           }
       },
   }
</script>