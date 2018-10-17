<template>
    <div class="content-block">
        <div class="title policy-title">
            <img src="../../assets/images/bad.png" alt="">关注园区动态
        </div>
        <ul class="list-box">
            <li v-for="(item,index) in article">
                <div>
                    <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">
                        <span class="blue m-left">【{{item.park}}】</span>{{item.title}}
                    </router-link>
                    <span class="article-time">{{item.time}}</span>
                </div>
                <p class="article-content">
                    {{item.content}}
                </p>
                <div class="sub-info" v-show="item.bus[0] != '暂无'">
                    <span>
                        <img src="../../assets/images/company.png" alt="">
                        涉及公司：
                         <a v-for="business in item.bus" :href="'/apis/oauth/getSearchList.json?name='+business" target="_blank">{{business}}
                        </a>
                     </span>
                </div>
            </li>
        </ul>
        <div class="text-center" v-if="total!=0">
            <el-pagination @current-change="change" :page-size="pageSize" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<style scoped>
.list-box {
    margin: 0 -24px;
}
</style>
<script>
export default {
    data() {
        return {
            article: [],
            pageNumber: 1,
            pageSize: 8,
            total: 0
        }
    },
    methods: {
        getList() {
            this.$ajax.post('/apis/area/findGardensCondition.json', { pageNumber: this.pageNumber, pageSize: this.pageSize }).then(res => {
                if (res.data.data != null) {
                    this.article = res.data.data[0].content;
                    this.total = res.data.data[0].totalElements;

                }
            }).catch(err => console.log(err))
        },
        change(val) {
            this.pageNumber = val;
            this.getList();
        },
    },
    mounted() {
        this.getList();
    }
}
</script>