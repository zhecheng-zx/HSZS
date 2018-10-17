<template>
    <div>
        <label-list @labelInfo='labelInfo' :time-show='false'></label-list>
        <div class="content-block">
            <div class="title policy-title">
                <img src="../../assets/images/policy.png" alt="">政策解读
                <div class="pull-right area">
                    地域
                    <el-select v-model="area" @change='areaChange'>
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row text-center" v-show="explanation.length==0" >
                <img src="../../assets/images/noData.png" height="166" width="157" alt="">
               </div>
            <ul class="area-policy clearfix" v-show="explanation.length!=0">
               
                <li class="col-xs-6" v-for="(item,index) in explanation">
                    <div>
                        <router-link :to="{ path:'/intelligence/article/'+item.id}">{{item.title}}</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block">
            <div class="title policy-title">
                <a href="#lunT" class="fc" data-toggle="tab">
                       <img src="../../assets/images/chat.png" alt="">高峰论坛
                       </a>
                <a href="#keY" data-toggle="tab">
                       <img src="../../assets/images/yanjiu.png" alt="">科学研究
                       </a>
            </div>
            <div class="tab-content">
                <ul class="tab-pane fade in active list-box balance" id="lunT">
                    <div class="row text-center" v-show="!lunT.length" >
                        <img src="../../assets/images/noData.png" height="166" width="157" alt="">
                    </div>
                    <li v-for="(item,index) in lunT">
                        <div>
                            <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">
                                <span class="blue m-left">【{{item.area}}】</span> {{item.title}}
                            </router-link>
                            <span class="article-time">{{item.publishTime}}</span>
                        </div>
                        <p class="article-content">
                            {{item.summary}}
                        </p>
                        <div class="sub-info" v-show="item.bus[0] != '暂无'">
                            <img src="../../assets/images/company.png" alt="">
                            涉及公司：
                            <span  v-for="business in item.bus"  >
                                <a  :href="'/apis/oauth/getSearchList.json?name='+business" target="_blank">{{business}}</a>
                            </span>
                        </div>
                    </li>
                </ul>
                <ul class="tab-pane fade list-box balance" id="keY">
                     <div class="row text-center" v-show="!keY.length" >
                        <img src="../../assets/images/noData.png" height="166" width="157" alt="">
                    </div>
                    <li v-for="(item,index) in keY">
                        <div>
                            <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">
                                <span class="blue m-left">【{{item.area}}】</span> {{item.title}}
                            </router-link>
                            <span class="article-time">{{item.publishTime}}</span>
                        </div>
                        <p class="article-content">
                            {{item.summary}}
                        </p>
                        <div class="sub-info" v-show="item.bus[0] != '暂无'">
                            <img src="../../assets/images/company.png" alt="">
                            涉及公司：
                            <span  v-for="business in item.bus"  >
                                  <a :href="'/apis/oauth/getSearchList.json?name='+business" target="_blank">{{business}}</a>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
import labelList from './label.vue'
export default {
    components: {
        'labelList': labelList
    },
    data() {
        return {
            explanation: [
                { content: '22222222222' }
            ],
            lunT: [],
            keY: [],
            params: [],
            options: [{ value: '全国' }, { value: '北京' }, { value: '上海' }, { value: '广州' }, { value: '深圳' }, { value: '杭州' }, { value: '苏州' }, { value: '南京' }, { value: '天津' }, { value: '青岛' }, { value: '大连' }],
            area: '全国'

        }
    },
    methods: {
        labelInfo(data) {
            this.getList(data);
            this.params = data.slice(0);
            this.params.push(this.area);
            this.getPolicy(this.params);

        },
        getPolicy(data) {
            this.$ajax.post('/apis/industry/getIndustrialList.json', {
                "msg": data
            }).then(res => {

                this.explanation = res.data.data[0].policy.content;

            }).catch(err => console.log(err))
        },
        getList(data) {
            this.$ajax.post('/apis/industry/getIndustrialPolicyList.json', {
                "msg": data
            }).then(res => {
                this.lunT = res.data.data[0].forum.content;
                this.keY = res.data.data[0].research.content;


            }).catch(err => console.log(err))
        },
        areaChange() {
            this.params.splice(2, 1, this.area);
            localStorage.setItem("area", this.area);
            this.getPolicy(this.params);

        },

    },
    mounted() {
        $(".policy-title a").on("click", function() {
            $(this).addClass("fc").siblings().removeClass("fc");
        });
        if(localStorage.getItem("area")){
            this.area=localStorage.getItem("area");
        }
    },
}
</script>