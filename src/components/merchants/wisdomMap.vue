<template>
    <div class="wisdomMap">
          <el-row>
           <el-col :span="16">
            <div class="tree">
                <ul>
                    <li  v-for="(item,index) in list">
                        <span data="1" class="title">{{item.name}}</span> 
                        <ul class="branch">
                            <li v-for="(item1,index1) in item.children">
                                <span data="2"><i ></i>{{item1.name}}</span> 
                                <ul  >
                                    <li v-for="(item2,index2) in item1.children">
                                        <span data="3"><i ></i> {{item2.name}}</span> 
                                        <ul>
                                            <li v-for="(item3,index3) in item2.children">
                                                <span data="4"><i ></i> {{item3.name}}</span> 
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
            
            </el-col>
            <el-col :span="8">
                <div class="company-list" v-if="company.length!=0">
                    <div class="title">{{activeLabel}}</div>
                    <ul >
                       <li v-for="(item,index) in company">
                            <a  :href="'/apis/oauth/getSearchList.json?name='+item.business" target="_blank" >{{item.business}}</a>

                       </li>
                    </ul>
               </div>
             
             </el-col>
       </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
             list:[],
             activeLabel:'',
             param:[],
             company:[]
        }
    },
    methods:{
        getTree(){
            let vm=this;
             this.$ajax.post('/apis/getIndicator.json').then(res=>{
                 this.list=res.data.data;
       this.$nextTick(()=>{
        
        $(function() {

            $('.tree li:has(ul)').addClass('parent_li').find(' > span i').addClass('glyphicon glyphicon-minus-sign')

            $('.tree li.parent_li > span').on('click', function(e) {

                var childrenren = $(this).parent('li.parent_li').find(' > ul > li');

                if (childrenren.is(":visible")) {

                    childrenren.hide('fast');

                    $(this).find(' > i').addClass('glyphicon glyphicon-plus-sign').removeClass('glyphicon glyphicon-minus-sign');

                } else {

                    childrenren.show('fast');

                    $(this).find(' > i').addClass('glyphicon glyphicon-minus-sign').removeClass('glyphicon glyphicon-plus-sign');

                }

                e.stopPropagation();

            });

            $('.tree span').on('click',function(e){

				 vm.activeLabel=$(this).text().trim();
				 let firstLabel=$(this).parents('.branch').prev().text().trim();
				 let n=$(this).attr("data");
				 console.log(n);
				 console.log("aa");
				 switch(n)
						{
						case '1':
						vm.param=[vm.activeLabel];
						vm.getList();
						  break;
						case '2':
						
						 vm.param=[firstLabel,vm.activeLabel];
						 vm.getList();
						  break;
						 case '3':
						var cs2=$(this).parent('li').parent("ul").prev().text().trim();
						 vm.param=[firstLabel,cs2,vm.activeLabel];
						 vm.getList();
						  break; 
						
						 case '4':
						var cs2=$(this).parent('li').parent("ul").prev().text().trim();
						var  label2=$(this).parent('li').parent("ul").parent('li').parent("ul").prev().text().trim();
						 vm.param=[firstLabel,label2,cs2,vm.activeLabel];
						 vm.getList();
						  break; 
						}
				
            });
             $('.tree>ul>li>span').click();

           

        });

       });
             }).catch(err=> console.log(err))
        },
        getList(){
             this.$ajax.post('/apis/getBusinessByIndicator.json',{msg:this.param}).then(res=>{
                 this.company=res.data.data;
             }).catch(err=> console.log(err))
         },
    },
    created(){
       this.getTree();
    },
    mounted() {
        
        

    },
}
</script>
<style scoped>
.wisdomMap{
    background-color:#fff;
    border: 1px solid #e8ebf2;  
    min-height:400px;
}
.tree {
   
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color:#fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05)
}
 .tree  ul{padding-left:80px;}
.tree li {
    list-style-type: none;
    margin: 0;
    padding: 10px 5px 0 5px;
    position: relative
}

.tree li::before,
.tree li::after {
    content: '';
    left: -20px;
    position: absolute;
    right: auto
}

.tree li::before {
    border-left: 1px solid #e6e6e6;
    bottom: 50px;
    height: 100%;
    top: 0;
    width: 1px
}

.tree li::after {
    border-top: 1px solid #e6e6e6;
    height: 20px;
    top: 25px;
    width: 25px
}

.tree li span {
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border: 1px solid #00a5ff;
    border-radius: 5px;
    display: inline-block;
    padding: 3px 24px;
    width:180px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    position: relative;
}
.tree i{
    color:#00a5ff;
    position:absolute;
    left:10px;
    top:5px;
    font-style:normal;
}
.tree .title {
    
    background-color:#e7f7ff;
}

.tree>ul>li::before,
.tree>ul>li::after {
    border: 0
}

.tree li:last-children::before {
    height: 30px
}

.tree span:hover
 {
   color:#00a5ff;
}
.company-list{
    width:300px;
    margin:0 auto;
    margin-top:100px;
   
    border: 1px solid #e8ebf2;  
}
.company-list .title{
    font-size: 16px;
    height:40px;
    padding:0 10px;
    line-height:40px;
    background-color:#e7f7ff;
}
.company-list ul{
    max-height:400px;
    overflow-y: auto;
}
.company-list ul li{
    border-top:1px solid #e8ebf2;
    padding:10px;
}

</style>