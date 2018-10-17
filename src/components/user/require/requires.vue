<template>
	<div class="content-block">
		<div class="title policy-title" v-if="isShow">
            <router-link to="/user/requires/requireList" active-class="fc">
           <img src="../../../assets/images/xq.png" height="23" width="25" alt="">需求池
           </router-link>
            <router-link to="/user/requires/myrequire" active-class="fc">
           <img src="../../../assets/images/mxq.png" height="16" width="22" alt="">我的需求池
           </router-link>
          
        </div>
        <router-view></router-view>	
	</div>
</template>
<script>
  export default{

      data(){
        return{
          isShow:true
        }
      },
      watch:{
         '$route' (to ,from){
            console.log(to);
             if(to.path=="/user/requires/requireDetails"){
                this.isShow=false;
             }else{
              this.isShow=true;
             }
         }
      },
  }
</script>
