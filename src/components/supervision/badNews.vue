<template>
    <div class="content-block">
        <div class="title policy-title">
            <img src="../../assets/images/bad-b.png" alt="">企业负面
        </div>
        <ul class="list-box">
            <li v-for="(item,index) in article">
                <div>
                     <a :href="item.sourceLink" target="_blank"><span class="blue" >【{{item.business}}】</span>{{item.title}}</a>
                   <!--  <router-link class="article-title" :to="{path:'/supervision/articleList/'+item.id}">
                        <span class="blue">【{{item.business}}】</span>{{item.title}}
                    </router-link> -->
                    <span class="article-time">{{item.publishTime}}</span>
                </div>
                <p class="article-content">
                    {{item.summary}}
                </p>
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

.el-pagination {
    display: inline-block;

    margin-top: 60px
}

.article-title {
    margin-left: -8px;
}
</style>
<script>
export default {
    data() {
        return {
            article: [],
            pageNumber: 0,
            pageSize: 10,
            total: 0
        }
    },

    methods: {
        getArticle() {
            this.$ajax.post('/apis/business/getBehaviours.json', { 'msg': ['negative'], pageNumber: this.pageNumber }).then(res => {
                this.total = res.data.data.totalNumber;
                this.article = res.data.data.page;
            }).catch(err => console.log(err))

        },
        change(val) {
            this.pageNumber = val - 1;
            this.getArticle()
        },
    },
    created() {
        this.getArticle();
    },
}
</script>