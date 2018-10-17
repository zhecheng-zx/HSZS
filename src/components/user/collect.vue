<template>
	<div class="content-block">
        <div class="title policy-title">
            <a href="javascript:void(0);" @click="select" :class="{fc:0==code}">
           <img src="../../assets/images/zj.png" alt="">专家
           </a>
            <a href="javascript:void(0);" @click="select" :class="{fc:1==code}">
           <img src="../../assets/images/policy.png" alt="">政策
           </a>
           <a href="javascript:void(0);" @click="select" :class="{fc:2==code}">
           <img src="../../assets/images/good.png" alt="">企业报告
           </a>
        </div>
            <div class="table-box">
             <div class="text-center" v-show="!list.length!=0" >
                <img src="../../assets/images/noData.png" height="166" width="157" alt="">
            </div>
              <table class="table-zs" v-show="list.length!=0">
              	 <thead>
              	 	<tr>
              	 		<th v-for="item in head">{{item}}</th>
              	 	</tr>
              	 </thead>
              	 <tbody>
              	 	<tr v-if="head.length==7" v-for="(item,index) in list">
              	 		<td>{{index+1}}</td>
              	 		<td><router-link :to="{path:'/user/down/collectArticle/'+item.articleId}">{{item.title}}</router-link></td>
              	 		<td>{{item.industry}}</td>
              	 		<td>{{item.author}}</td>
              	 		<td>{{item.publishTime}}</td>
                    <td>{{item.lanmu}}</td>
                    <td><a href="javascript:void(0);" class="blue" @click="remove(item.articleId)">删除</a></td>
              	 	</tr>
                  <tr v-if="head.length!=7&&list.length!=0" v-for="(item,index) in list">
                    <td></td>
                    <td><router-link to="/user/down/collectArticle/"></router-link></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><a href="javascript:void(0);" class="blue" @click="remove"></a></td>
                  </tr>
              	 </tbody>
              </table>
               <div class="text-center" v-if="total!=0">
              <el-pagination @current-change="change" :page-size="pageSize" layout="prev, pager, next" :total="total">
              </el-pagination>
              </div>
        </div>  
	</div>
</template>
<style scoped>
	.el-pagination {
    display: inline-block;

    margin-top: 60px
}
</style>
<script>
	export default{
		data(){
			return{
               list:[],
               pageSize:10,
               total:0,
               pageNumber:1,
               type:'专家',
               head:['编号','文章标题',"产业","作者","发表时间","栏目","操作"],
               code:0
        
			}
		},
		methods:{
			change(val){

			},
			select(e){
				this.pageNumber=1;
				this.type=e.currentTarget.innerText;
				if(e.currentTarget.innerText==="政策"){
                     this.code=1;
                     this.head=['编号','文章标题',"产业","作者","发表时间","栏目","操作"];
				}else if(e.currentTarget.innerText==="企业报告"){
					this.code=2;
					this.head=['编号','企业名称',"产业","发表时间","企业类型","操作"];
				}else{
					this.code=0;
					this.head=['编号','文章标题',"产业","作者","发表时间","栏目","操作"];
				};
         this.getList();       
			},
			getList(){
                 this.$ajax.post('/apis/background/getPersonCollection.json',{query:this.type,pageNumber:this.pageNumber,pageSize:this.pageSize}).then(res => {
                       this.total=res.data.data[0].totalPages;
                       this.list=res.data.data[0].content;

                 }).catch(err => console.log(err))
			},
      remove(data){
          this.$ajax.get('/apis/expert/cancelCollectExpertOpinion.json', { params: {id:data}}).then(res => {
                  this.getList(); 
            }).catch(err => console.log(err))
      },

		},
		 mounted() {
		       this.getList();
        
      },
	}
</script>