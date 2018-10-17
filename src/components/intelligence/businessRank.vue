<template>
    <div>
        <label-list @labelInfo='labelInfo' :time-list="time" :time-show="true"></label-list>
        <div class="content-block">
            <div class="title policy-title">
                <img src="../../assets/images/rank.png" alt="">企业排行
            </div>
            <div class="row text-center" v-show="!article.length" >
                <img src="../../assets/images/noData.png" height="166" width="157" alt="">
            </div>
            <ul class="list-box balance" id="rank">
                <li v-for="(item,index) in article">
                    <div>
                        <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">
                            {{item.title}}
                        </router-link>
                    </div>
                    <p class="article-content">
                        {{item.summary}}
                    </p>
                    <div class="sub-info">
                        <span>
                       <img src="../../assets/images/laiyuan.png" alt="">
                        {{item.vector}}
                       </span>
                        <span v-if="item.publishTime">
                       <img src="../../assets/images/time.png" alt="">
                        {{item.publishTime}}
                       </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import labelList from './label.vue'
import axios from "axios"
export default {
    components: {
        'labelList': labelList
    },
    data() {
        return {
            article: [],
            time: [],
            labels: [],
        }
    },
    methods: {
        labelInfo(data) {
            this.getList(data);
        },
        getList(data) {
            this.$ajax.post('/apis/business/findCompaniesDesc.json', { 'msg': data }).then(res => {
                this.article = res.data.data;
            }).catch(err => console.log(err))


        }
    },
    created() {
              let da= new Date();
              let nowdata = da.getFullYear();
              this.time=[nowdata,nowdata-1,nowdata-2,nowdata-3]   
    },
}
</script>