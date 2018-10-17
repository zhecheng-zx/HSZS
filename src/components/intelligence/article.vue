<template>
    <div class="article-details">
        <a href="javascript:void(0);" class="blue" @click="back">返回</a>
        <h4 class="text-center" v-if="article.title" ><a :href="article.sourceLink" target="_blank">{{article.title}}</a>
        <span v-if="isShow">
        <button class=" btn btn-zs" @click="collect" v-if="isCollect">收藏</button>
        <button class=" btn btn-zs"  v-if="!isCollect" @click="cancel">取消收藏</button>
        </span>
        </h4>
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
        <div v-html="article.content" class="article-block"></div>
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
<style scoped>
    h4{position:relative;padding:0 90px;}
    h4 span{position:absolute;right:0;top:0;}
    h4 a:hover{text-decoration:underline;}
</style>
<script>
export default {
    data() {
        return {
            article: {},
            isShow: false,
            isCollect: true
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        collect() {
            this.$ajax.get('/apis/expert/collectExpertOpinion.json', { params: { id: this.article.id } }).then(res => {
                if (res.data.data.state == "success") {
                    this.isCollect = false;

                };

            }).catch(err => console.log(err))
        },
        cancel() {
            this.$ajax.get('/apis/expert/cancelCollectExpertOpinion.json', { params: { id: this.article.id } }).then(res => {

                this.isCollect = true;


            }).catch(err => console.log(err))
        },
    },
    mounted() {

        this.$ajax.get('/apis/industry/getIndustrialPolicyDetailById.json', {
            params: {
                "id": this.$route.params.id
            }
        }).then(res => {
            this.article = res.data.data;
            if (res.data.data.dimension == "专家论" || res.data.data.dimension == "政策解读") {
                this.isShow = true;
            };
            if (res.data.data.isCollect == "true") {
                this.isCollect = false;
            } else {
                this.isCollect = true;
            }
        }).catch(err => console.log(err))
    }

}
</script>