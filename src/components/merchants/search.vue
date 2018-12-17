<template>

		<div class="content-block search">
			<div class="search-btn">
				<!-- <input type="text" placeholder="请输入公司名称"/> -->
                 <a href="http://link.qichacha.com/open/index.html#/search-company/ea201230d6a31e4088aecbee88b171d7/1c8e68698a15c88580568b5267eaa3e7/9474512928a1591b808fabbb34bfd7c2" target="_blank">
                    <button class="btn" >搜索</button>
                 </a>

			</div>
		</div>
<!-- 		<div class="search-box">
			<div class="search-type">
                <a href="#byArea" data-toggle="tab" class="fc">按区域查询</a><a href="#byIndustry" data-toggle="tab">按行业查询</a><a href="#byCompany" data-toggle="tab">最近注册企业</a><a href="#byHot" data-toggle="tab">热门律所</a>
            </div>
            <div class="tab-content type-details">
                <div class="tab-pane fade in active" id="byArea">
                    <div class="bace" v-for="(item,index) in area">
                            <a href="javascript:void(0);" 
                               >{{item.title}}</a>
                            
                            <a href="https://bj.tianyancha.com/search" v-for="(item,index) in item.data">
                              <span class="c6 mrten in-block">•</span>
                              {{item}}</a>
            
                    </div>
                </div>
                <div class="tab-pane fade" id="byIndustry">
                     <div class="bace" v-for="(item,index) in industry">
                            <a href="javascript:void(0);" 
                               >{{item.title}}</a>
                            
                            <a href="https://bj.tianyancha.com/search" v-for="(item,index) in item.data">
                              <span class="c6 mrten in-block">•</span>
                              {{item}}</a>
            
                    </div>
                </div>
            </div>
		</div> -->
	
</template>
<script>
    export default{
        data(){
            return{
                 area:[{title:"北京",data:["北京"]},{title:"天津",data:["天津"]}],
                 industry:[{title:"北京",data:["北京"]},{title:"天津",data:["天津"]}],
                 companys:[]
            }
        },
        methods:{
               getCompanys(){
                this.$ajax.get('/apis/oauth/getSearchTrack.json',{params:{pageSize:10,pageNumber:1}}).then(res => {
                       if(res.data.data.items!=null){
                          this.companys=res.data.data.items;
                       }
                     
                }).catch(err => console.log(err))
               },
                go(){
                   this.$ajax.get('').then(res => {
                       
                }).catch(err => console.log(err))
               },
        },

        mounted(){
                 this.getCompanys();

        },
    }
</script>
<style lang="less" scoped>
    .search{
    	height:409px;
      background-color:rgba(0,0,0,0.8);
    	background:url(../../assets/images/search-bg.png) center center no-repeat;
    	background-size:cover;
        position:relative;
        &>a{
            position:absolute;

            &:hover{
                  color:#00a5ff;
            }
           
        }
    	.search-btn{
    		
    		text-align:center;
    		margin-top:155px;
    		input{border-radius:3px 0 0 3px;padding-left:20px;width:582px;height:50px;line-height:50px;border:1px solid #ffffff;color:#999999;}
            // button{border-radius:0 3px 3px 0;margin-left:-15px;vertical-align:top;width:100px; height:50px;background-color:#00a5ff;color:#fff;font-size:16px;}
            button{border-radius:4px;vertical-align:top;width:200px; height:50px;background-color:#00a5ff;color:#fff;font-size:16px;}
    	}
    }
    .a2{left:24%;top:115px; color:#999;}
    .a1{left:45%;top:130px; color:#fff;font-size:16px;}
    .a4{left:34%;top:86px; color:#999;}
    .a3{left:60%;top:100px; color:#999;}
    .a5{left:22%;top:257px; color:#999;}
    .a6{left:67%;top:192px; color:#999;}
    .a7{right:66%;top:194px;color:#fff;font-size:16px;}
    .a8{left:46%;top:280px; color:#999;}
    .a9{left:55%;top:240px;color:#fff;font-size:16px;}
    .a10{left:35%;top:300px; color:#fff;font-size:16px;}
    .search-box{
        margin-top:15px;
        background-color:#ffffff;
       .search-type{
       width:100%;
       a{
         display:inline-block;
         width:25%;
         height:45px;
         line-height:45px;
         text-align:center;
          color:#333333;
         font-size:18px;
         border:1px solid #e6e6e6;
         &.fc{
            background-color:#00a5ff;
            color:#ffffff;
         }
         
           
        
       }
   }
    }
  .type-details{
    height:412px;
    overflow-y:auto;
    padding:30px;
        
           .bace{
            margin-bottom: 36px;
            min-width:42px;
            margin-right:10px;
            a{  
                width:100px;
                display:block;
                font-size:13px;
                padding-bottom: 13px;
                color:#333333;
                &:first-child{
                    font-size:15px;
                    color:#00a4ff;
                }
                span{
                    display:inline-block;
                    margin-right:10px;
                }
            }
   
      }
   
  }
    #byArea{
           height:1000px;
       }
</style>
