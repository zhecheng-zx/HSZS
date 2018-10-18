<template>
    <div class="content-block">
        <div class="title policy-title">
            <a href="#park-map" class="fc" data-toggle="tab">
           <img src="../../assets/images/location.png" alt="">园区地图
           </a>
            <a href="#park-list" data-toggle="tab">
           <img src="../../assets/images/yqlb.png" alt="">园区列表
           </a>
        </div>
        <div class="tab-content">
            <div class="tab-pane fade in active" id="park-map">
            <div class="radio-box">
                 <el-radio class="radio" v-model="industry" label="互联网+">互联网+</el-radio>
                 <el-radio class="radio" v-model="industry" label="高科技" >高科技</el-radio>
               </div>      
                <bd-map :city-info="city"></bd-map>
            </div>
            <div class="tab-pane fade" id="park-list">
                <ul class="type-box type-box-g">
                    <li>
                        <div class="head">
                            区域
                        </div>
                        <p class="type-list">
                            <span v-for="(item,index) in area" :class="{active:index==areaCode}" @click="select(index)">{{item}}</span>
                        </p>
                    </li>
                    <li>
                        <div class="head">
                            产业类型
                        </div>
                        <p class="type-list">
                            <span v-for="(item,index) in industryType" :class="{active:index==typeCode}" @click="select2(index)">{{item}}</span>
                        </p>
                    </li>
                    <!-- <li class="search">
                         <el-input
                              
                              icon="search"
                              v-model="input2"
                              :on-icon-click="search">
                        </el-input>
                     </li>      -->
                </ul>
                <ul class="park-l-menu">
                  <div class="text-center no-data" v-if="list.length==0" >
                   <img src="../../assets/images/noData.png" height="166" width="157" alt="">
                   </div>
                    <li v-for="(item,index) in list">
                        <img src="../../assets/images/park-picture.png" alt="" class="park-picture">
                        <div class="right-content">
                            <div>
                                <router-link class="article-title" :to="{path:'/supervision/focusPark/parkDetails',query:{query:item.gardenName,id:item.id,address:item.address}}">
                                    {{item.gardenName}}
                                </router-link>
                            </div>
                            <p class="article-content">
                                {{item.gardenIntroduce}}
                            </p>
                            <div class="sub-info">
                                <span>
                                 <img src="../../assets/images/location-h.png" alt="">
                                  地址：{{item.address}}
                                 </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="text-center" v-if="total!=0">
                    <el-pagination @current-change="change" :current-page="pageNumber" :page-size="pageSize" layout="prev, pager, next" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .radio-box{
        margin-top:12px;
    }
    .radio{
        display:inline-block;

        margin-left:24px;
        font-weight:normal;
    }
</style>
<script>
import bdMap from '../commonParts/bdMap.vue'
export default {
    components: {
        'bdMap': bdMap
    },
    data() {
        return {
            pageNumber: 1,
            pageSize: 8,
            total: 0,
            list: [],
            area: ["不限", "北京", "上海", "广州", "深圳", "杭州", "苏州", "南京", "天津", "青岛", "大连"],
            industryType: ["不限", "互联网+", "高科技"],
            areaCode: 0,
            typeCode: 1,
            input2: '',
            city: {
                name: '',
                park: []
            },
            industry:'互联网+'


        }
    },
    methods: {
        getList(data) {

            this.$ajax.post('/apis/area/findGardensList.json', { 'msg': data, pageNumber: this.pageNumber, pageSize: this.pageSize }).then(res => {
                if (res.data.data != null) {
                    this.list = res.data.data[0].content;
                    this.total = res.data.data[0].totalElements;
                }
            }).catch(err => console.log(err))
        },
        change(val) {
            this.pageNumber = val;
            this.getList([this.area[this.areaCode], this.industryType[this.typeCode]]);
        },
        parkList(data) {
            this.$ajax.get('/apis/area/findGardensByArea.json', { params: { area: data,industry:this.industry } }).then(res => {

                this.city.park = res.data.data;
                if(res.data.data.length==0){
                    this.$message('此产业类型暂无数据');
                }
            }).catch(err => console.log(err))
        },
        select(index) {
            this.pageNumber=1;
            this.areaCode = index;
            this.getList([this.area[this.areaCode], this.industryType[this.typeCode]]);
        },
        select2(index) {
            this.pageNumber=1;
            this.typeCode = index;
            this.getList([this.area[this.areaCode], this.industryType[this.typeCode]]);
        },
 
            
 

    },
    watch:{
         industry:function(val){
            this.parkList(this.$route.query.query);
            this.typeCode=this.industryType.indexOf(val);
            this.select2(this.typeCode);

         }
    },
    mounted(){
      $(".policy-title a").on("click", function() {
            $(this).addClass("fc").siblings().removeClass("fc");

        });
    },
    created() {
        this.city.name = this.$route.query.query;
        this.parkList(this.$route.query.query);
        let index = this.area.indexOf(this.city.name)
        this.select(index)
        this.industry = this.$route.query.typeName
    },
}
</script>