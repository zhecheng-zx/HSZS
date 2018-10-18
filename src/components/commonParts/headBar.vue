<template>
	 <header>
         <div class="logo" style="font-size:20px;color:#fff;">
                    招商态势
         </div>
        <ul class="top-bar">
            <li >
                <router-link to="/intelligence" active-class="active">
                   招商情报
                </router-link>
            </li>
            <li>
                <router-link to="/supervision"  active-class="active">
                   园区监管
                </router-link>
            </li>
            <li>
                <router-link to="/merchants" active-class="active">
                   精准招商
                </router-link>
            </li>
           
        </ul>
        <span class="user">
         <!-- <router-link  to="/user" >
                <i class="icon-user"></i>个人中心
         </router-link> -->
         <a href="javascript:void(0);" @click="loginOut">退出</a>
        </span>
  </header>
</template>
<script>
	export default{
		data(){
			return{
 
			}
		},
        methods:{
         loginOut(){
            this.$ajax.get('/apis/logOut.do').then(res=>{
                this.$router.push('/');
                localStorage.clear();

            }).catch(err => console.log(err))
         },
        },
		mounted(){
                 
           
		},
	}
</script>