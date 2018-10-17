<template>
    <div class="article-details">
    <div class="top">
        <a href="javascript:void(0);" class="blue" @click="back">返回</a>
        <a  :href="link1" class="pull-right btn btn-zs-o">PDF下载</a>
        <a   :href="link2" class="pull-right btn btn-zs">word下载</a>
        
     </div>   
      <h4 class="text-center" v-if="article.title">{{article.title}}
           
     

        </h4>
        <div class="sub-info" v-if="article.title">
            <span>
             <img src="../../assets/images/company.png" alt="">
              涉及公司：{{article.business}}
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
  .top{margin-bottom:40px;}
  .top a{margin-left:30px;}
</style>
<script>
export default {
    data() {
        return {
            article:{},
            link1:'',
            link2:''
           
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        
    },
    mounted() {
        
        this.$ajax.get('/apis/industry/getIndustrialPolicyDetailById.json', {
            params: {
                "id": this.$route.params.id
            }
        }).then(res => {
            this.article = res.data.data;
            this.link1="http://localhost:8092/apis/background/downloadCol.json?type=pdf&articleId="+this.article.id;
            this.link2="http://localhost:8092/apis/background/downloadCol.json?type=doc&articleId="+this.article.id;
        }).catch(err => console.log(err))
        
    },

}
</script>