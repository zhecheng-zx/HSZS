<template>
    <div>
        <ul class="type-box">
            <li>
                <div class="head"><img src="../../assets/images/cy.png" alt="">产业</div>
                <p class="type-list">
                    <span v-for="(item,index) in typeOne" :class="{active:index==oneCode}" @click="selectOne(index)">{{item}}</span>
                </p>
                <!-- <a href="javascript:void(0);" class="pull-right" @click="set"> <span class="glyphicon glyphicon-cog"></span> 设置</a> -->
            </li>
            <li>
                <div class="head">
                    <img src="../../assets/images/bq.png" alt="">产业标签
                </div>
                <p class="type-list">
                    <span v-for="(item,index) in typeTwo[oneCode]" :class="{active:index==twoCode}" @click="selectTwo(index)">{{item}}</span>
                </p>
            </li>
            <li v-if="showTime">
                <div class="head">
                    <img src="../../assets/images/time.png" alt="">时间
                </div>
                <p class="type-list">
                    <span v-for="(item,index) in time" :class="{active:index==timeCode}" @click="selectTime(index)">{{item}}</span>
                </p>
            </li>
        </ul>
        <el-dialog :visible.sync="dialogVisible" size="large" :show-close="showClose" :close-on-click-modal="showClose" :close-on-press-escape="showClose">
           <h5 class="text-center" slot="title">请选择您想关注的产业情报</h5>
            <div class="label-box">
                <p class="label-title">互联网+:</p>
                <el-checkbox-group v-model="checkList1">
                    <el-checkbox v-for="label in label1" :label="label" :key="label"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="label-box">
                <p class="label-title">高科技:</p>
                <el-checkbox-group v-model="checkList2">
                    <el-checkbox v-for="label in label2" :label="label" :key="label"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="label-box">
                <p class="label-title">文化创意:</p>
                <el-checkbox-group v-model="checkList3">
                    <el-checkbox v-for="label in label3" :label="label" :key="label"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="label-box">
                <p class="label-title">精英配套:</p>
                <el-checkbox-group v-model="checkList4">
                    <el-checkbox v-for="label in label4" :label="label" :key="label"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="label-box">
                <p class="label-title">其他:</p>
                <el-checkbox-group v-model="checkList5">
                    <el-checkbox v-for="label in label5" :label="label" :key="label"></el-checkbox>
                </el-checkbox-group>
            </div><div class="label-box">
                <p class="label-title">港口物流:</p>
                <el-checkbox-group v-model="checkList6">
                    <el-checkbox v-for="label in label6" :label="label" :key="label"></el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false" v-if="typeOne.length!=0">取 消</el-button>
                        <el-button type="primary" @click="upDate">确 定</el-button>
                      </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['timeShow', 'timeList'],
    data() {
        return {
            showClose:false,
            typeOne: [],
            typeTwo: [],
            time: ['今日', '昨天', '近七天', '一个月', '半年', '一年'],
            oneCode: 0,
            twoCode: 0,
            timeCode: 2,
            showTime: this.timeShow,
            dialogVisible: false,
            checkList1: [],
            label1: ['网络游戏', '大数据', '电子商务', '网络视听', '移动阅读', '智能硬件'],
            checkList2: [],
            label2: ['新一代信息技术', '智能机器人', '生物医药', '节能环保技术装备', '新能源', '新材料', '航空装备'],
            checkList3: [],
            label3: ['动漫制作', '影视传媒', '图书出版', '广告营销'],
            checkList4: [],
            label4: ['金融服务', '住宅地产', '商业综合体', '康体美容', '母婴产业', '健康产业', '教育培训'],
            checkList5: [],
            label5:['特色旅游综合体','体育产业'],
            checkList6: [],
            label6:['生鲜贸易','食品加工','冷链物流']


        }

    },
    methods: {
        selectOne(index) {
            this.oneCode = index;
            this.twoCode = 0;
            localStorage.setItem("oneCode", index);
            localStorage.setItem("twoCode", 0);
            if (this.timeShow == true) {

                this.$emit('labelInfo', [this.typeOne[this.oneCode], this.typeTwo[this.oneCode][this.twoCode], this.time[this.timeCode]]);
            } else {

                this.$emit('labelInfo', [this.typeOne[this.oneCode], this.typeTwo[this.oneCode][this.twoCode]]);
            }




        },
        selectTwo(index) {
            this.twoCode = index;
            localStorage.setItem("twoCode", index);
            if (this.showTime == true) {
                this.$emit('labelInfo', [this.typeOne[this.oneCode], this.typeTwo[this.oneCode][this.twoCode], this.time[this.timeCode]]);
            } else if (this.showTime == false) {

                this.$emit('labelInfo', [this.typeOne[this.oneCode], this.typeTwo[this.oneCode][this.twoCode]]);
            }
        },
        selectTime(index) {
            this.timeCode = index;
            localStorage.setItem("timeCode", index);
            localStorage.setItem("time", this.time[this.timeCode]);
            this.$emit('labelInfo', [this.typeOne[this.oneCode], this.typeTwo[this.oneCode][this.twoCode], this.time[this.timeCode]]);
        },
        getLabel() {

            this.$ajax.get('/apis/param/getParamById.json').then((res) => {
                this.typeOne = [];
                this.typeTwo = [];
                if(JSON.stringify(res.data.data) == "{}"){
                        this.dialogVisible=true;
                };
                let type = res.data.data;
                for (let key in type) {
                    if (type[key] != []) {
                        this.typeOne.push(key);
                        if (key == "互联网+") {
                            this.checkList1 = type[key].slice(0);
                        } else if (key == "高科技") {
                            this.checkList2 = type[key].slice(0);
                        } else if (key == "文化创意") {
                            this.checkList3 = type[key].slice(0);
                        } else if (key == "精英配套") {
                            this.checkList4 = type[key].slice(0);
                        } else if (key == "其他") {
                            this.checkList5 = type[key].slice(0);
                        } else if (key == "港口物流") {
                            this.checkList6 = type[key].slice(0);    
                        };
                        this.typeTwo.push(type[key]);
                    };
                }
                this.typeTwo.forEach(val => {
                    val.unshift('不限');
                });

                this.selectTwo(this.twoCode);
            }).catch(err => console.log(err))
        },
        set(){
          this.getLabel();
          this.dialogVisible=true;
        },
        upDate() {
            if(this.checkList1.length==0&&this.checkList2.length==0&&this.checkList3.length==0&&this.checkList4.length==0&&this.checkList5.length==0&&this.checkList6.length==0){
                this.$message.error("您什么都没选哦!");
                return;
            };

            let parameter = { "互联网+": this.checkList1, "高科技": this.checkList2, "文化创意": this.checkList3, "精英配套": this.checkList4,"其他":this.checkList5,"港口物流":this.checkList6 };
            this.typeOne = [];
            this.typeTwo = [];
            
            for (let key in parameter) {

                if (parameter[key].length == 0) {
                    delete parameter[key];
                }
            }
            let p = JSON.stringify(parameter);
            this.$ajax.post('/apis/param/getInsertParam.json', { 'msg': p }).then((res) => {
                this.dialogVisible = false;
                this.getLabel();
                 this.oneCode=0;
                this.twoCode=0;
                this.timeCode=0;

            }).catch(err => console.log(err))
        },

    },
    mounted() {
        if (this.timeList != undefined) {
            this.time = this.timeList;
           
        }; 
         this.getLabel();
        if (localStorage.getItem("oneCode")) {

            this.oneCode = localStorage.getItem("oneCode") - 0;
        };
        if (localStorage.getItem("twoCode")) {
            this.twoCode = localStorage.getItem("twoCode") - 0;

        };
        if (localStorage.getItem("timeCode")) {
            let index=localStorage.getItem("timeCode") - 0;
            if(this.time[index]==localStorage.getItem("time")){
                this.timeCode = index;
            }else{
                this.timeCode =0;
            }
            
        };
       
    }

}
</script>