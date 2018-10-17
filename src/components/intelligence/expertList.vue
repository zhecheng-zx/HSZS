<template>
	<div class="expert-wz">
		                 
                      <div class="expert-info clearfix">
                       <img src="../../assets/images/people.png" alt="" width="85" height="85">
                       <div>{{personInfo.name}}</div>
                       <p class="blue">{{personInfo.professionalTitle}}</p>

                      </div>
                       
                          <ul class="list-box">
                             <li v-for="(item,index) in article">
                                <div >
                                  <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">
                                   <span class="blue">【{{item.dimension}}】</span>
                                   {{item.title}}</router-link> 
                                  <span class="article-time">{{item.publishDate}}</span>
                                </div>
                                <p class="article-content">
                                  {{item.summary}}
                                </p>
                                 <div class="sub-info">
                                      <span>
                                        <img src="../../assets/images/company.png" alt="">
                                        涉及公司：
                                         <a v-for="business in item.bus" :href="'/apis/oauth/getSearchList.json?name='+business" target="_blank">{{business}}
                                         </a>
                                     </span>
                                 </div>
                             </li>
  
                          </ul>
                        
                         <div class="text-center loadMore"><a href="javascript:void(0);" class="blue " @click="viewMore">{{state}}</a></div>
                      
                
	</div>
</template>
<style scoped>
  .expert-wz{
    background-color:#ffffff;
    
  }
  .article-title{
    margin-left:-8px;
  }
</style>
<script>
	export default{
		data(){
			return{
          pageNumber:1,
          pageSize:8,
          totalPages:0,
          personInfo:{},
          article:[],
          number:0,
          author:'',
          state:'查看更多'

			}
		},
		methods:{
      getList(data){
        this.$ajax.post('/apis/expert/findExpertOpinionByAuthor.json',{'author':data,pageNumber:this.pageNumber,pageSize:this.pageSize}).then(res => {
              this.totalPages=res.data.data[0].totalPages;
              let list=res.data.data[0].content;
              for(let y in list){
                this.article.push(list[y]);
              }
        }).catch(err => console.log(err));

      },
      viewMore(){
        this.pageNumber++;
         if(this.pageNumber>this.totalPages){
           this.state="已无更多数据";
           return;
         }
        this.getList(this.personInfo.name);
      },

		},
		mounted(){
        this.personInfo=JSON.parse(this.$route.query.query);
       
        this.getList(this.personInfo.name);
      },
         
	}
</script>