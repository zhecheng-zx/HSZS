<template>
    <div class="recommend clearfix">
        <div class="left-box">
            <ul class="list-wrapper">
                <div class="bg" v-show="companys!=0">
                    <div class="rotate"></div>
                </div>
                <div class="center">
                    {{industry}}
                </div>
                <li v-for="(item,index) in companys" :class="['item'+index,{active:activeCode==index}]" @click="select(item,index)">
                    {{item.companyName}}
                </li>
            </ul>
        </div>
        <div class="info-panel">
            <!--  <a href="javascript:void(0);" class="blue pull-right" @click="$router.go(-1);">返回</a> -->
            <div class="info-box">
                <div class="title">{{details.company}}</div>
                <table>
                    <tr>
                        <td>法定代表人：</td>
                        <td>{{details.boss}}</td>
                    </tr>
                    <tr>
                        <td>注册资本：</td>
                        <td>{{details.registerCapital}}</td>
                    </tr>
                    <tr>
                        <td>成立日期：</td>
                        <td>{{details.createTime}}</td>
                    </tr>
                    <tr>
                        <td>行业领域：</td>
                        <td>{{details.industryType}}</td>
                    </tr>
                    <tr>
                        <td>企业地址：</td>
                        <td>{{details.registerAddress}}</td>
                    </tr>
                </table>
                <div class="text-center">
                    <a :href="'/apis/oauth/getSearchList.json?name='+details.company" target="_blank">
                        <button class="btn">
                            查看详情
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            companys: [],
            details: {},
            industry: '推荐',
            activeCode: 0
        }
    },
    methods: {
        getCompanys(data) {
            this.$ajax.post('/apis/indus/getCompanyInfoByIndustry.json').then(res => {
                this.companys=this.uniqueArray(res.data.data,'id');
                this.getInfo(this.companys[0].company);
            }).catch(err => console.log(err))
        },
        getInfo(data) {
            this.$ajax.post('/apis/comp/getCompanyInfoByCompany.json', { company: data }).then(res => {

                this.details = res.data.data;
            }).catch(err => console.log(err))
        },
        select(item, index) {
            this.activeCode = index;
            this.getInfo(item.company);
        },
        uniqueArray(array, key) {
            var result = [array[0]];
            for (var i = 1; i < array.length; i++) {
                var item = array[i];
                var repeat = false;
                for (var j = 0; j < result.length; j++) {
                    if (item[key] == result[j][key]) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    result.push(item);
                }
            }
            return result;
        },
    },
    mounted() {

        this.getCompanys();



    },

}
</script>
<style lang="less" scoped>
.recommend {
    background-color: #ffffff;
    min-height: 400px;
    padding: 20px;
    border: 1px solid #e8ebf2;
}

.left-box {
    width: 70%;
    float: left;
}

ul {
    width: 540px;
    height: 540px;
    margin: 0 auto;
    position: relative;
    li {

        position: absolute;
        width: 80px;
        height: 80px;
        background-color: #00a5ff;
        line-height: 80px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        transition: transform 0.5s;
        &.active {
            background-color: #ff4f4f;
            transform: scale(1.1);
        }
    }
    .bg {
        width: 100%;
        height: 100%;

        .rotate {
            width: 100%;
            height: 100%;

            background: url(../../../assets/images/rotate.png) center center no-repeat;
            background-size: cover;
            animation: rt 60s linear infinite;
        }
    }
    .center {

        width: 100px;
        height: 100px;
        background-color: #00cced;
        line-height: 100px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        font-size: 16px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
    }
}

@keyframes rt {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

.item0 {
    left: 77px;
    top: 10px;
}

.item1 {
    left: 382px;
    top: 10px;
}

.item2 {
    left: -30px;
    top: 155px;
}

.item3 {
    left: 203px;
    top: 57px;
}

.item4 {
    left: 400px;
    top: 210px;
}

.item5 {
    left: 85px;
    top: 322px;
}

.item6 {
    left: 32px;
    top: 410px;
}

.item7 {
    left: 477px;
    top: 297px;
}

.item8 {
    left: 278px;
    top: 391px;
}

.item9 {
    left: 395px;
    top: 441px;
}


.info-panel {

    width: 30%;
    float: right;
}

.info-box {
    width: 100%;
    margin: 0 auto;
    margin-top: 100px;
    border: 1px solid #e8ebf2;
    min-height: 300px;
    padding: 0 10px;
    .title {
        height: 40px;
        line-height: 40px;
        margin: 0 -10px;
        padding: 0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #00a5ff;
        font-size: 16px;
        border-bottom: 1px solid #e8ebf2;
    }
    table {
        width: 100%;
        margin: 20px 0;

        td {
            padding: 3px 0;
            &:first-child {
                width: 90px;
                vertical-align: top;
            }
        }
    }
    button {
        width: 150px;
        border-radius: 20px;
        background-color: #00a5ff;
        color: #fff;
    }
}
</style>