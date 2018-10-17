<template>
    <div>
        <ul class="type-box" >
            <li>
                <div class="head"><img src="../../../assets/images/bq.png" height="15" width="15" alt="">企业标签</div>
                <p class="type-list">
                    <span v-for="(item,index) in label" :class="{active:index==labelCode}" @click="select1(index)">{{item}}</span>
                </p>
            </li>
            <li>
                <div class="head"><img src="../../../assets/images/state.png" height="12" width="23" style="margin-left:-8px;" alt="">状态</div>
                <p class="type-list">
                    <span v-for="(item,index) in state" :class="{active:index==stateCode}" @click="select2(index)">{{item}}</span>
                </p>
            </li>
            <li >
                <div class="head">
                    <img src="../../../assets/images/time.png" alt="">时间
                </div>
                <p class="type-list">
                    <span v-for="(item,index) in time" :class="{active:index==timeCode}" @click="select3(index)">{{item}}</span>
                </p>
            </li>
           
        </ul>
         <div class="search" >
                         <el-input
                              icon="search"
                              v-model="keyWord"
                              :on-icon-click="search">
                        </el-input>
         </div> 
         <div class="table-box">
         <table class="table-zs" v-show="list.length">
         	<thead>
         		<tr>
         			<th>企业名</th>
         			<th>子企业</th>
         			<th>产业领域</th>
         			<th>所属地区</th>
         			<th>负责人</th>
         			<th>状态</th>
         		</tr>
         	</thead>
           <tbody v-for="(item,index) in list">
                    <tr v-for="(item1,index1) in item.children">
                        <td :rowspan="item.children.length" class="first" v-if="0==index1">{{item.name}}</td>
                        <td>
                            <router-link :to="'/user/requires/requireDetails/'+item1.id">{{item1.name}}</router-link>
                        </td>
                        <td>{{item1.label}}</td>
                        <td>{{item1.area}}</td>
                        <td>{{item1.responsiblePerson}}</td>
                        <td>{{item1.investmentStatus}}</td>
                    </tr>
                   
                </tbody>

         </table>
         
         </div>  
         <div v-show="!list.length" class="text-center">
              <img src="../../../assets/images/noData.png" height="166" width="157" alt="">
         </div>
    </div>
</template>
<script>
export default {
       data(){
       	 return{
       	 	label:[],
       	 	state:['全部',"已入住","未入住"],
       	 	time:['全部', '近一周','近三个月', '近六个月', '近一年'],
            labelCode:0,
            stateCode:0,
            timeCode:0,
            keyWord:'',
            count:2,
            list:[],
       	 }
       },
       methods:{
       	 select1(index){
			     this.labelCode = index
             this.update()
       	 },
       	  select2(index){
              this.stateCode = index
              this.update()
       	 },
       	  select3(index){
              this.timeCode = index
              this.update()
       	 },
       	 search(){
            this.update();
       	 },
       getLabel(){
           this.$ajax.get('/apis/label/getLabel.json').then(res => {
              this.label=['全部'];
              if(res.data.data){
                 res.data.data.forEach(val=>{
                this.label.push(val.label)
              });
              }
             
              this.update();
           })
       },
	     update(){
       	     var msgs = [this.label[this.labelCode],this.state[this.stateCode],this.time[this.timeCode]]
             this.$ajax.post('/apis/pool/getCompanyList.json', {msg:msgs,search:this.keyWord}).then((res) => {
                 this.list=res.data.data.list;
             }).catch(err => console.log(err))
		     }
       },
		mounted(){
        this.getLabel();
			  
		}
}
</script>
<style lang="less" scoped>
.type-box {
    margin: 0 -24px;
    background-color: #fafafa;
    padding-bottom:10px;
    border:none; 
    border-bottom:1px solid #e8ebf2;
}
	.search{
		padding:10px 0;
		.el-input{
			width:240px;
			
		}

	}
	.el-input__inner{border-radius: 30px;}
	.table-box{
		margin-top:0;

	}
	.first{border-right:1px solid #e8ebf2;}

    .noMsg{
        padding: 100px;
        text-align: center;
    }
</style>