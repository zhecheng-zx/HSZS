<template>
    <div class="outflowDetails">
        <a href="#" @click="back()" class="back">返回</a>
        <div class="title text-center" v-if="article.title"><a :href="article.sourceLink" target="_blank"><span class="blue"></span>{{article.title}}</a></div>
        <div class="sub-info" v-if="article.title">
             <span v-show="article.bus[0] != '暂无'">
             <img src="../../assets/images/company.png" alt="">
             涉及公司：
              <a v-for="business in article.bus" :href="'/apis/oauth/getSearchList.json?name='+business" target="_blank">{{business}}
              </a>
             </span>
            <span>
             <img src="../../assets/images/time.png" alt="">
              发布时间：{{article.publishTime}}
             </span>

        </div>
        <div v-html="article.content" class="article-block">
            
        </div>
        <div class="sub-info" v-if="article.title">
            <span>
             <img src="../../assets/images/pencil.png" alt="">
              情报采集：{{article.source}}
             </span>
            <span>
             <img src="../../assets/images/internet.png" alt="">
              情报原址：{{article.sourceLink}}
             </span>
           
        </div>
    </div>
</template>
<style lang="less" scoped>
.outflowDetails {
    padding: 20px;
    background-color: #ffffff;
    .title {

        font-size: 18px;
    }
}

.back {
    display: block;
    margin-top: 10px;
    color: #00a5ff;
    font-size: 16px;
    float: right;
}
 .title a:hover{text-decoration:underline;}
</style>
<script>
export default {
    data() {
        return {
            article: {}
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
    },
    mounted() {
        this.$ajax.get('/apis/industry/getIndustrialPolicyDetailById.json', {
            params: {
                "id": this.$route.params.id
            }
        }).then(res => {
            this.article = res.data.data;
        }).catch(err => console.log(err))
    }
}
</script>