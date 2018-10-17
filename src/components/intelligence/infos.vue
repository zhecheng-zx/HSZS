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
                <div id="park-map-box">
                </div>
                <div class="park-movement" v-if="dynamic.length!=0">
                    <div class="p-title">关注园区动态</div>
                    <ul class="p-content">
                        <li v-for="(item,index) in dynamic">
                            <router-link class="article-title" :to="{ path:'/intelligence/article/'+item.id}">{{item.title}}</router-link>
                            <p class="p-c-content">{{item.summary}}</p>
                        </li>
                    </ul>
                    <div class="text-center loadMore">
                        <router-link to="/intelligence/parkInfo/dynamic" class="blue ">查看更多</router-link>
                    </div>
                </div>
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
                        <img :src="item.gardenPicture" alt="" width="145" heigt="115" class="park-picture">
                        <div class="right-content">
                            <div>
                                <router-link class="article-title" :to="{path:'/intelligence/focusPark/parkDetails',query:{query:item.gardenName,id:item.id,address:item.address}}">
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
.article-title {
    width: 100%;
}

</style>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china.js';
export default {
    data() {
        return {
            pageNumber: 1,
            pageSize: 8,
            total: 0,
            dynamic: [],
            list: [],
            area: ["不限", "北京", "上海", "广州", "深圳", "杭州", "苏州", "南京", "天津", "青岛", "大连"],
            industryType: ["不限", "互联网+", "高科技"],
            areaCode: 0,
            typeCode: 0,
            input2: ''
        }
    },
    methods: {
        mapData() {
            this.$ajax.get('/apis/area/findIndustryCountByArea.json').then(res => {
                this.parkMap(res.data.data[0],res.data.data[1],res.data.data[2],res.data.data[3],res.data.data[4],res.data.data[5]);

            }).catch(err => console.log(err))
        },
        getDynamic() {
            this.$ajax.post('/apis/area/findGardensCondition.json', { pageNumber: 1 }).then(res => {
                this.dynamic = res.data.data[0].content.slice(0, 3)
                this.dynamic.forEach(val => {
                    val.summary = val.summary.slice(0, 40) + "..."
                })
            }).catch(err => console.log(err))
        },
        change(val) {
            this.pageNumber = val;
            this.getList([this.area[this.areaCode], this.industryType[this.typeCode]]);
        },
        getList(data) {

            this.$ajax.post('/apis/area/findGardensList.json', { 'msg': data, pageNumber: this.pageNumber, pageSize: this.pageSize }).then(res => {
                if (res.data.data != null) {
                    this.list = res.data.data[0].content;
                    this.total = res.data.data[0].totalElements;
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
        search() {

        },
        parkMap(data1, data2, data3, data4, data5, data6) {
            let vm = this;
            var geoCoordMap = {
                "海门": [121.15, 31.89],
                "鄂尔多斯": [109.781327, 39.608266],
                "招远": [120.38, 37.35],
                "舟山": [122.207216, 29.985295],
                "齐齐哈尔": [123.97, 47.33],
                "盐城": [120.13, 33.38],
                "赤峰": [118.87, 42.28],
                "青岛": [120.33, 36.07],
                "乳山": [121.52, 36.89],
                "金昌": [102.188043, 38.520089],
                "泉州": [118.58, 24.93],
                "莱西": [120.53, 36.86],
                "日照": [119.46, 35.42],
                "胶南": [119.97, 35.88],
                "南通": [121.05, 32.08],
                "拉萨": [91.11, 29.97],
                "云浮": [112.02, 22.93],
                "梅州": [116.1, 24.55],
                "文登": [122.05, 37.2],
                "上海": [121.48, 31.22],
                "攀枝花": [101.718637, 26.582347],
                "威海": [122.1, 37.5],
                "承德": [117.93, 40.97],
                "厦门": [118.1, 24.46],
                "汕尾": [115.375279, 22.786211],
                "潮州": [116.63, 23.68],
                "丹东": [124.37, 40.13],
                "太仓": [121.1, 31.45],
                "曲靖": [103.79, 25.51],
                "烟台": [121.39, 37.52],
                "福州": [119.3, 26.08],
                "瓦房店": [121.979603, 39.627114],
                "即墨": [120.45, 36.38],
                "抚顺": [123.97, 41.97],
                "玉溪": [102.52, 24.35],
                "张家口": [114.87, 40.82],
                "阳泉": [113.57, 37.85],
                "莱州": [119.942327, 37.177017],
                "湖州": [120.1, 30.86],
                "汕头": [116.69, 23.39],
                "昆山": [120.95, 31.39],
                "宁波": [121.56, 29.86],
                "湛江": [110.359377, 21.270708],
                "揭阳": [116.35, 23.55],
                "荣成": [122.41, 37.16],
                "连云港": [119.16, 34.59],
                "葫芦岛": [120.836932, 40.711052],
                "常熟": [120.74, 31.64],
                "东莞": [113.75, 23.04],
                "河源": [114.68, 23.73],
                "淮安": [119.15, 33.5],
                "泰州": [119.9, 32.49],
                "南宁": [108.33, 22.84],
                "营口": [122.18, 40.65],
                "惠州": [114.4, 23.09],
                "江阴": [120.26, 31.91],
                "蓬莱": [120.75, 37.8],
                "韶关": [113.62, 24.84],
                "嘉峪关": [98.289152, 39.77313],
                "广州": [113.23, 23.16],
                "延安": [109.47, 36.6],
                "太原": [112.53, 37.87],
                "清远": [113.01, 23.7],
                "中山": [113.38, 22.52],
                "昆明": [102.73, 25.04],
                "寿光": [118.73, 36.86],
                "盘锦": [122.070714, 41.119997],
                "长治": [113.08, 36.18],
                "深圳": [114.07, 22.62],
                "珠海": [113.52, 22.3],
                "宿迁": [118.3, 33.96],
                "咸阳": [108.72, 34.36],
                "铜川": [109.11, 35.09],
                "平度": [119.97, 36.77],
                "佛山": [113.11, 23.05],
                "海口": [110.35, 20.02],
                "江门": [113.06, 22.61],
                "章丘": [117.53, 36.72],
                "肇庆": [112.44, 23.05],
                "大连": [121.62, 38.92],
                "临汾": [111.5, 36.08],
                "吴江": [120.63, 31.16],
                "石嘴山": [106.39, 39.04],
                "沈阳": [123.38, 41.8],
                "苏州": [120.62, 31.32],
                "茂名": [110.88, 21.68],
                "嘉兴": [120.76, 30.77],
                "长春": [125.35, 43.88],
                "胶州": [120.03336, 36.264622],
                "银川": [106.27, 38.47],
                "张家港": [120.555821, 31.875428],
                "三门峡": [111.19, 34.76],
                "锦州": [121.15, 41.13],
                "南昌": [115.89, 28.68],
                "柳州": [109.4, 24.33],
                "三亚": [109.511909, 18.252847],
                "自贡": [104.778442, 29.33903],
                "吉林": [126.57, 43.87],
                "阳江": [111.95, 21.85],
                "泸州": [105.39, 28.91],
                "西宁": [101.74, 36.56],
                "宜宾": [104.56, 29.77],
                "呼和浩特": [111.65, 40.82],
                "成都": [104.06, 30.67],
                "大同": [113.3, 40.12],
                "镇江": [119.44, 32.2],
                "桂林": [110.28, 25.29],
                "张家界": [110.479191, 29.117096],
                "宜兴": [119.82, 31.36],
                "北海": [109.12, 21.49],
                "西安": [108.95, 34.27],
                "金坛": [119.56, 31.74],
                "东营": [118.49, 37.46],
                "牡丹江": [129.58, 44.6],
                "遵义": [106.9, 27.7],
                "绍兴": [120.58, 30.01],
                "扬州": [119.42, 32.39],
                "常州": [119.95, 31.79],
                "潍坊": [119.1, 36.62],
                "重庆": [106.54, 29.59],
                "台州": [121.420757, 28.656386],
                "南京": [118.78, 32.04],
                "滨州": [118.03, 37.36],
                "贵阳": [106.71, 26.57],
                "无锡": [120.29, 31.59],
                "本溪": [123.73, 41.3],
                "克拉玛依": [84.77, 45.59],
                "渭南": [109.5, 34.52],
                "马鞍山": [118.48, 31.56],
                "宝鸡": [107.15, 34.38],
                "焦作": [113.21, 35.24],
                "句容": [119.16, 31.95],
                "北京": [116.46, 39.92],
                "徐州": [117.2, 34.26],
                "衡水": [115.72, 37.72],
                "包头": [110, 40.58],
                "绵阳": [104.73, 31.48],
                "乌鲁木齐": [87.68, 43.77],
                "枣庄": [117.57, 34.86],
                "杭州": [120.19, 30.26],
                "淄博": [118.05, 36.78],
                "鞍山": [122.85, 41.12],
                "溧阳": [119.48, 31.43],
                "库尔勒": [86.06, 41.68],
                "安阳": [114.35, 36.1],
                "开封": [114.35, 34.79],
                "济南": [117, 36.65],
                "德阳": [104.37, 31.13],
                "温州": [120.65, 28.01],
                "九江": [115.97, 29.71],
                "邯郸": [114.47, 36.6],
                "临安": [119.72, 30.23],
                "兰州": [103.73, 36.03],
                "沧州": [116.83, 38.33],
                "临沂": [118.35, 35.05],
                "南充": [106.110698, 30.837793],
                "天津": [117.2, 39.13],
                "富阳": [119.95, 30.07],
                "泰安": [117.13, 36.18],
                "诸暨": [120.23, 29.71],
                "郑州": [113.65, 34.76],
                "哈尔滨": [126.63, 45.75],
                "聊城": [115.97, 36.45],
                "芜湖": [118.38, 31.33],
                "唐山": [118.02, 39.63],
                "平顶山": [113.29, 33.75],
                "邢台": [114.48, 37.05],
                "德州": [116.29, 37.45],
                "济宁": [116.59, 35.38],
                "荆州": [112.239741, 30.335165],
                "宜昌": [111.3, 30.7],
                "义乌": [120.06, 29.32],
                "丽水": [119.92, 28.45],
                "洛阳": [112.44, 34.7],
                "秦皇岛": [119.57, 39.95],
                "株洲": [113.16, 27.83],
                "石家庄": [114.48, 38.03],
                "莱芜": [117.67, 36.19],
                "常德": [111.69, 29.05],
                "保定": [115.48, 38.85],
                "湘潭": [112.91, 27.87],
                "金华": [119.64, 29.12],
                "岳阳": [113.09, 29.37],
                "长沙": [113, 28.21],
                "衢州": [118.88, 28.97],
                "廊坊": [116.7, 39.53],
                "菏泽": [115.480656, 35.23375],
                "合肥": [117.27, 31.86],
                "武汉": [114.31, 30.52],
                "大庆": [125.03, 46.58]
            };

            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                            count:data[i].count,
                            industry:data[i].industry
                        });
                    }
                }
                return res;
            };
            let park = echarts.init(document.getElementById('park-map-box'));
            let option = {
                backgroundColor: '#404a59',
                title: {


                    x: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                color: [
                    '#589196', '#c5ab39', '#be7849', '#b74a57', '#5584ff', 'rgba(119,162,137,1)'
                ],
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {

                        return params.name;
                    }
                },
                legend: {
                    orient: 'vertical',
                    y: 'center',
                    x: 'right',
                    data: ['互联网+', "高科技"],
                    textStyle: {
                        color: '#fff'
                    },
                    selected:{
                        '互联网+':true,
                        '高科技':false,
                        '文化创意':false,
                        '精英配套':false,
                        '其他':false,
                        '港口物流':false,

                    }
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: 6,
                    splitNumber: 6,
                    inRange: {
                        color: ['#589196', '#c5ab39', '#be7849', '#b74a57', '#5584ff', 'rgba(119,162,137,1)']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series: [{
                        name: '互联网+',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data1),
                        symbolSize: 12,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    }, {
                        name: '高科技',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data2),
                        symbolSize: 12,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                     }, 
                    //{
                    //     name: '文化创意',
                    //     type: 'scatter',
                    //     coordinateSystem: 'geo',
                    //     data: convertData(data3),
                    //     symbolSize: 12,
                    //     label: {
                    //         normal: {
                    //             show: false
                    //         },
                    //         emphasis: {
                    //             show: false
                    //         }
                    //     },
                    //     itemStyle: {
                    //         emphasis: {
                    //             borderColor: '#fff',
                    //             borderWidth: 1
                    //         }
                    //     }
                    // }, {
                    //     name: '精英配套',
                    //     type: 'scatter',
                    //     coordinateSystem: 'geo',
                    //     data: convertData(data4),
                    //     symbolSize: 12,
                    //     label: {
                    //         normal: {
                    //             show: false
                    //         },
                    //         emphasis: {
                    //             show: false
                    //         }
                    //     },
                    //     itemStyle: {
                    //         emphasis: {
                    //             borderColor: '#fff',
                    //             borderWidth: 1
                    //         }
                    //     }
                    // },
                    // {
                    //     name: '其他',
                    //     type: 'scatter',
                    //     coordinateSystem: 'geo',
                    //     data: convertData(data5),
                    //     symbolSize: 12,
                    //     label: {
                    //         normal: {
                    //             show: false
                    //         },
                    //         emphasis: {
                    //             show: false
                    //         }
                    //     },
                    //     itemStyle: {
                    //         emphasis: {
                    //             borderColor: '#fff',
                    //             borderWidth: 1
                    //         }
                    //     }
                    // },
                    // {
                    //     name: '港口物流',
                    //     type: 'scatter',
                    //     coordinateSystem: 'geo',
                    //     data: convertData(data6),
                    //     symbolSize: 12,
                    //     label: {
                    //         normal: {
                    //             show: false
                    //         },
                    //         emphasis: {
                    //             show: false
                    //         }
                    //     },
                    //     itemStyle: {
                    //         emphasis: {
                    //             borderColor: '#fff',
                    //             borderWidth: 1
                    //         }
                    //     }
                    // },
                    {
                    name: '主要城市',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data:convertData([{name: "北京", value: 2},{name: "上海", value: 2},{name: "上海", value: 2},{name: "广州", value: 2},{name: "深圳", value: 2},{name: "杭州", value: 2},{name: "苏州", value: 2},{name: "南京", value: 2},{name: "天津", value: 2},{name: "青岛", value: 2},{name: "大连", value: 2}]),
                    symbolSize: 25,
                
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 8
                }

                ]
            }
            var typeName = '互联网+';
            park.setOption(option);
            park.on('click', function(params) {
                if(vm.area.indexOf(params.name)!=-1){
                vm.$router.push({ path: '/intelligence/parkInfo/cityPark', query: { query: params.name,typeName:typeName} });
                }
            });
            park.on('legendselectchanged', function (params) {
                typeName = params.name

                let pro=Object.keys(option.legend.selected);
                   pro.forEach((val)=>{
                     option.legend.selected[val]=false;
                   });
                   option.legend.selected[params.name]=true;
                    park.setOption(option);
               });

        },
    },
    mounted() {
        $(".policy-title a").on("click", function() {
            $(this).addClass("fc").siblings().removeClass("fc");

        });

        // this.parkMap([{ name: "武汉", value: 0 }], [{ name: "南京", value: 2 }], [], [{ name: "上海", value: 4 }], [{ name: "广州", value: 5 }], [{ name: "深圳", value: 6 },{ name: "天津", value: 6 }]);
        this.mapData();
        this.getDynamic();
         
        this.select(0);
    },
}
</script>