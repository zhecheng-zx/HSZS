<template>
	<div>
	  	<head-bar></head-bar>
	    <div class="wrapper">
           <left-bar ></left-bar>
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
<script>
  import headBar from './commonParts/headBar.vue'
  import leftBar from './intelligence/leftBar.vue'
	export default{
		components:{
             'headBar':headBar,
             'leftBar':leftBar
		},
		data(){
             return{
                   
             }
		},
		watch:{
			   '$route'(to, from,name) {
                        if(to.name=="article"){
                            this.barShow=false;
                        }else{
                        	this.barShow=true;
                        };
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
	}
</script>