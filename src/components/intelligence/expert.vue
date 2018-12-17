<template>
    <div>
        <label-list @labelInfo='labelInfo' :time-show='false'></label-list>
        <div class="content-block">
            <div class="title policy-title">
                <img src="../../assets/images/bj.png" alt="">百家论
            </div>
            <div class="row text-center" v-show="!lunT.length" >
                <img src="../../assets/images/noData.png" height="166" width="157" alt="">
            </div>
            <ul class="list-box balance" id="lunT">
                <li v-for="(item,index) in lunT">
                    <div>
                        <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">{{item.title}}</router-link>
                        <span class="article-time">{{item.time}}</span>
                    </div>
                    <p class="article-content">
                        {{item.summary}}
                    </p>
                    <div class="blue article-author">
                        <span class="glyphicon glyphicon-user"></span>{{item.author}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
@import '../../common/js/swiper/swiper-3.4.2.min.css';

</style>
<script>
import '../../common/js/swiper/swiper.js'
import labelList from './label.vue'
export default {
    components: {
        'labelList': labelList
    },
    data() {
        return {
            experts: [],
            pageNumber: 1,
            pageSize: 7,
            totalPages:0,
            params:[],
            lunT: [],
            report:[]

        }
    },
    methods: {
        labelInfo(data) {
            this.pageNumber=1;
            this.params=data;
            // this.getExpert(data);
            
            this.getArticle(data);

        },
        getExpertReport(){
                this.$ajax.get('/apis/expert/getExpertReport.json').then(res=>{
                    this.report=res.data.data.content;
                })
        },
        getExpert(data) {

            this.$ajax.post('/apis/expert/getSpecialist.json', {pageNumber: this.pageNumber,pageSize: this.pageSize,industry:data[0],industrylabel:data[1] }).then(res => {
                this.totalPages=res.data.data.totalPages;
                res.data.data.content.forEach(val => {
                    this.experts.push(val);
                });
                if(this.pageNumber==1){
                	setTimeout(()=>{
                		document.querySelector('.swiper-wrapper').style.transform="translate3d(0px,0px,0px)";
                		
                	},50);
                
                };
                setTimeout(()=>{
                	this.mySwiper.slideTo((this.pageNumber-1)*7);
                },50)
            }).catch(err => console.log(err))
        },

        getArticle(data) {
            this.$ajax.post('/apis/expert/findaExpertOpinion.json', { 'msg': data }).then(res => {
                this.lunT = res.data.data;
            }).catch(err => console.log(err))
        },
        select(item) {
            var item = JSON.stringify(item);
            this.$router.push({ path: '/intelligence/expertView/expertList', query: { query: item } });
        },
        loadMore() {
            this.pageNumber++;
            if(this.pageNumber>this.totalPages){
                this.$message('没有更多数据了！');
                return;
            }
            this.getExpert(this.params);
        },

    },
    mounted() {
       
        this.getExpertReport();
        this.$nextTick(() => {
                this.mySwiper = new Swiper('.swiper-container', {
                    initialSlide: 0,
                    slidesPerView: '4',
                    // spaceBetween : 58,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
                });
            });

        }
    }
</script>