<template>
    <div>
        <label-list @labelInfo='labelInfo' :time-show='true'></label-list>
        <div class="content-block">
            <p class="title"><img src="../../assets/images/media.png" alt="">媒体聚焦</p>
            <div class="row text-center" v-show="!showMedia" >
                <img src="../../assets/images/noData.png" height="166" width="157" alt="">
            </div>
            <div class="row" v-show="showMedia">
               
                <div class="col-xs-6" >
                    
                    <div id="media-pie">
                    </div>
                </div>
                <div class="col-xs-6" >
                    <div class="tody-headlines">
                        <div class="list-title">{{activedMedia}}</div>
                        <ul class="list-box" id="tody-headlines">
                            <li v-for="(item,index) in media">
                                <h4>
                                   <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">{{item.title}}</router-link>
                                   <span class="article-time">{{item.publishTime}}</span>
                               </h4>
                                <p class="article-content">
                                    {{item.summary}}
                                </p>
                                <div class="sub-info"  v-show="item.bus[0] != '暂无'">
                                    <img src="../../assets/images/company.png" alt="">
                                    涉及公司：
                                    <span v-for="business in item.bus" >
                                        <a :href="'/apis/oauth/getSearchList.json?name='+business" target="_blank">{{business}}</a>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-block">
            <p class="title"><img src="../../assets/images/key.png" alt="">关键词云</p>
             <div class="row text-center" v-show="!showKey" >
                <img src="../../assets/images/noData.png" height="166" width="157" alt="">
            </div>
            <div class="row" v-show="showKey">
                
                <div class="col-xs-6">
                    <div id="key-yun" ref="mychart"></div>
                    </div>
                    <div class="col-xs-6">
                        <div class="tody-headlines">
                            <div class="list-title">{{activeWord}}</div>
                            <ul class="list-box" id="key-info">
                                <li v-for="(item,index) in keyInfo">
                                    <h4>
                                          <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">{{item.title}}</router-link> 
                                          <span class="article-time">{{item.publishTime}}</span>
                                          </h4>
                                    <p class="article-content">
                                        {{item.summary}}
                                    </p>
                                    <div class="sub-info" v-show="item.bus[0] != '暂无'">
                                        <img src="../../assets/images/company.png" alt="">
                                        涉及公司：
                                        <span v-for="business in item.bus">
                                            <a :href="'/apis/oauth/getSearchList.json?name='+business" target="_blank">{{business}}</a>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import echarts from 'echarts'
import wordcloud from 'echarts-wordcloud'

import labelList from './label.vue'
export default {
    components: {
        'labelList': labelList
    },
    data() {
        return {
            mediaData: [],
            wordData: [],
            media: [],
            keyInfo: [],
            activedMedia: '',
            activeWord: '',
            mediasParams: [],
            WordParams: [],
            mediapie: '',
            yun: '',
            showMedia: true,
            showKey: true,
        }
    },
    methods: {



        labelInfo(data) {

            this.getMedia(data);

            this.getKey(data);

        },
        getMedia(val) {
            
            this.$ajax.post('/apis/Headlines/getClondChartList.json', { 'msg': val }).then(res => {
                if (res.data.data.length != 0) {
                    
                    this.showMedia = true;
                    this.mediaData = res.data.data;
                    
                    this.mediaFocus(this.mediaData);
                    this.activedMedia = res.data.data[0].name;
                    this.mediasParams = [];
                    val.forEach(value => {
                        this.mediasParams.push(value)
                    })


                    this.mediasParams.push(this.activedMedia);



                    this.mediaList(this.mediasParams);

                } else {
                    this.showMedia = false;
                }
            }).catch(err => console.log(err))
        },
        mediaList(val) {

            this.$ajax.post('/apis/Headlines/getArticleByVectorList.json', { 'msg': val }).then(res => {
                this.media = res.data.data.content;

            }).catch(err => console.log(err))
        },
        getKey(vals) {

            this.$ajax.post('/apis/Headlines/getWordClond.json', { 'msg': vals }).then(res => {
                if (res.data.data.length != 0) {
                    this.showKey = true;
                    this.wordData = res.data.data[0];
                    this.keyCloud(this.wordData);
                    this.activeWord = this.wordData[0].name;
                    this.WordParams = [];


                    vals.forEach(value => {
                        this.WordParams.push(value)
                    })


                    this.WordParams.push(this.activeWord);



                    this.keyList(this.WordParams);
                } else {
                    this.showKey = false;
                }
            }).catch(err => console.log(err))
        },
        keyList(vals) {
            let vm = this;
            this.$ajax.post('/apis/Headlines/getArticleByKeyWordList.json', { msg: vals }).then(res => {

                this.keyInfo = res.data.data.content;
                // for(var i=0;i<this.keyInfo.length;i++){
                //     if(this.keyInfo[i].bus[0] == '暂无'){
                //         //判断文章列表是否呈现涉及公司，但暂无时，不显示
                //         this.keyInfo[i].bus.isShow = false;
                //     }else{
                //         this.keyInfo[i].bus.isShow = true;
                //     }
                // }

            }).catch(err => console.log(err))
        },
        mediaFocus(data) {
            let vm = this;
            let option = {
                tooltip: {
                },
                legend: {
                },
                series: [{
                    name: '媒体聚焦',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['45%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            lineStyle: {
                                color: "#55bdff"
                            },
                            smooth:0.2,
                            length: 5
                            
                        }
                    },
                    color: ['#55bdff', '#f8427f', '#5584ff', '#22b3ca','#5d71f1'],
                    data: [

                    ]
                }]
            };
            option.series[0].data = data;
            vm.mediapie.setOption(option);
        },
        keyCloud(datas) {
            let vm = this;
            let option = {
                title: {
                },
                tooltip: {},
                series: [{
                    type: 'wordCloud',
                    gridSize: 20,
                    sizeRange: [12, 50],
                    rotationRange: [0, 0],
                    shape: 'circle',
                    textStyle: {
                        normal: {
                            color: function() {
                                return 'rgba(' + [239,7,7,Math.random().toString().slice(0,4)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: []
                }]
            };
            option.series[0].data = datas;
            vm.yun.setOption(option);

        },
    },
    mounted() {
        let vm = this;
        //媒体
        this.mediapie = echarts.init(document.getElementById('media-pie'));
        this.mediapie.on('click', function(params) {

            vm.activedMedia = params.name;

            vm.mediasParams.splice(3, 1, vm.activedMedia);

            vm.mediaList(vm.mediasParams);
        });
        //词云
        let dom = this.$refs.mychart;
        this.yun = echarts.init(dom);
        this.yun.on('click', function(params) {

            vm.activeWord = params.name;
            vm.WordParams.splice(3, 1, vm.activeWord);
            vm.keyList(vm.WordParams);
        });


    },
}
</script>