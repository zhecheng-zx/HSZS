<template>
    <div class="content-block">
        <ul class="type-box ">
            <li>
                <div class="head">
                    企业描述
                </div>
                <p class="type-list">
                    <el-select v-model="industry" size="small" @change="select">
                        <el-option v-for="item in option1" :key="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="regCapital" size="small" @change="select1">
                        <el-option v-for="item in option2" :key="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </p>
            </li>
            <li>
                <div class="head">
                    企业分组
                </div>
                <p class="type-list">
                    <span v-for="(item,index) in group" @click="select2(item,index)" :class="{active:activeIndex==index}">{{item}}</span>
                    <span class="type-item" @click="addVisible = true">添加企业分组</span>
                    <span class="type-item" @click="removeVisible = true">删除企业分组</span>
                </p>
                <el-dialog :visible.sync="addVisible" size="tiny" class="text-center" title="添加企业分组">
                    <el-input v-model="addGroup" placeholder="请输入组名"></el-input>
                    <span slot="footer" class="dialog-footer">
                                <el-button @click="addOff">取 消</el-button>
                                <el-button type="primary" @click="addlist">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog :visible.sync="removeVisible" size="tiny" class="text-center" title="删除企业分组">
                    <el-select v-model="removes" multiple placeholder="请选择组">
                        <el-option v-for="item in removeGroup" :key="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                    <span slot="footer" class="dialog-footer">
                                <el-button @click="removeOff">取 消</el-button>
                                <el-button type="primary" @click="removelist">确 定</el-button>
                    </span>
                </el-dialog>
            </li>
        </ul>
        <!-- <div class="top-tool">
            <el-input
                    icon="search"
                    v-model="keyWord"
                    :on-icon-click="search">
            </el-input>
            
        </div> -->



        <ul>
           <div class="text-center no-data" v-if="company.length==0" >
                   <img src="../../assets/images/noData.png" height="166" width="157" alt="">
           </div>
            <li class="content-box" v-for="(item,index) in company">
                <div class="main-body">
                    <img :src="item.logo" height="100" width="162" alt="">
                    <div class="company-info">
                        <a :href="'/apis/oauth/getCompanyDetail.json?name='+item.companyName" target="_blank" class="blue">{{item.companyName}}</a>
                        <div class="sub-list">
                            <span>
                        <img src="../../assets/images/person.png" height="15" width="13" alt="">
                        法定代表人：{{item.boss}}
                        </span>
                            <span>
                        <img src="../../assets/images/money.png" height="15" width="13" alt="">
                        注册资本：{{item.registerCapital}}万
                        </span>
                            <span>
                        <img src="../../assets/images/time-h.png" height="15" width="13" alt="">
                        注册时间：{{item.registerDate}}
                        </span>
                            <span>
                        <img src="../../assets/images/location-h.png" height="15" width="13" alt="">
                        位置：{{item.area}}
                        </span>
                        </div>
                    </div>
                </div>
                <el-button @click="collect(item)">添加到</el-button>
            </li>
            <el-dialog :visible.sync="selectVisible" size="tiny" class="text-center" title="选择组名">
                <el-select v-model="selectGroup" placeholder="请选择组">
                    <el-option v-for="item in removeGroup" :key="item.value" :value="item.value">
                    </el-option>
                </el-select>
                <span slot="footer" class="dialog-footer">
                                <el-button @click="confirmOff">取 消</el-button>
                                <el-button type="primary" @click="confirmCollect">确 定</el-button>
                    </span>
            </el-dialog>
        </ul>
        <div class="text-center" v-if="total!=0">
            <el-pagination @current-change="change" :current-page="pageNumber" :page-size="pageSize" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageNumber: 1,
            pageSize: 8,
            total: 0,
            group: ["全部"],

            option1: [
                { value: '全部' },
                { value: '互联网+' },
                { value: '高科技' }

            ],
            industry: "全部",
            option2: [
                { value: '全部' },
                { value: '0-100万' },
                { value: '100-200万' },
                { value: '200-500万' },
                { value: '500-1000万' },
                { value: '1000万以上' },
            ],
            regCapital: "全部",
            keyWord: '',
            removeVisible: false,
            addVisible: false,
            selectVisible: false,
            addGroup: '',
            removeGroup: [],
            removes: [],

            company: [],
            selectGroup: '',
            activeIndex: 0,
            activeGroup: '',
            collectID: ''


        }
    },
    methods: {
        search() {
            this.getcompany();
        },
        getcompany() {
            let data = this.group[this.activeIndex];
            this.$ajax.post('/apis/supervise/searchCompanyFromGardenForPage.json', { industry: this.industry, regCapital: this.regCapital, groupname: data, pageNumber: this.pageNumber, pageSize: this.pageSize }).then(res => {
                if (res.data.data != null) {
                    this.company = res.data.data[0].content;
                    this.total = res.data.data[0].totalElements;
                }

            }).catch(err => console.log(err))
        },
        select() {
            this.pageNumber=1;
            this.getcompany();
        },
        select1() {
            this.pageNumber=1;
            this.getcompany();
        },
        select2(item, index) {
            this.pageNumber=1;
            this.activeIndex = index;
            this.activeGroup = item;
            this.getcompany();
        },
        getGroup() {
            this.$ajax.get('/apis/supervise/selectCompanyGroup.json').then(res => {
                this.group = ['全部'];
                this.removeGroup = [];
                let groups = res.data.data;
                groups.forEach(val => {
                    this.group.push(val.groupName);
                    this.removeGroup.push({ value: val.groupName });
                })


            }).catch(err => console.log(err))
        },
        msg(data,type){
           this.$message({
                        message: data,
                        type: type
                    });
        },
        addlist() {
            let rex=/(^[\u4E00-\u9FA5a-zA-Z0-9_]+$)/;
            if(!rex.test(this.addGroup)){
                this.msg('组名由中英文数字下划线组成并不能为空','warning');
                return;
            };
            if(this.addGroup.length>10){
                this.msg('组名不能超过十个字符','warning');
                return;
            };
            this.$ajax.get('/apis/supervise/addCompanyGroup.json', { params: { groupName: this.addGroup } }).then(res => {
                if (res.data.data.state == "success") {
                    this.addVisible = false;
                    this.getGroup();
                    this.msg('添加分组成功','success');
                    this.addGroup='';
                } else if (res.data.data.state == "分组已经存在") {
                    this.msg('组名已存在','warning')
                } else {
                    this.$message.error('添加分组失败');
                }
            }).catch(err => console.log(err))
        },
        addOff(){
            this.addVisible = false;
            this.addGroup='';
        },
        removelist() {
            
            if(this.removes.length==0){
                this.msg('请选择要删除组名','warning');
                return;
            }
            let p = this.removes.join();
            this.$ajax.get('/apis/supervise/dropCompanyGroup.json', { params: { groupNames: this.removes } }).then(res => {
                if (res.data.data == true) {
                   
                    this.msg('删除分组成功','success');
                    this.removeVisible = false;
                    this.getGroup();
                    this.select2('全部', 0);
                    this.removes=[];
                } else {
                    this.$message.error('删除分组失败');
                }

            }).catch(err => {
                console.log(err);
                this.$message.error('删除分组失败');
            })
        },
        removeOff(){
            this.removeVisible = false;
            this.removes=[];
        },
        collect(item) {
            if(this.removeGroup.length==0){
                this.msg('请先添加企业分组','warning');
                return;
            };
            this.selectVisible = true;
            this.collectID = item.cid;
        },
        confirmCollect() {
            if (this.selectGroup == '') {
                this.$message.error('请选择组名');
                return;
            };
            this.$ajax.post('/apis/supervise/saveCompanyByGroupId.json', { companyId: this.collectID, groupname: this.selectGroup }).then(res => {
                if (res.data.data == 0) {
                    this.msg('分组成功','success');
                    this.selectVisible = false;
                } else{
                    this.msg('该组中已存在此企业','warning');
                }

            }).catch(err => console.log(err))

        },
        confirmOff(){
            this.selectVisible = false;
            this.selectGroup = ''
        },
        change(val) {
            this.pageNumber = val;
            this.getcompany();
        },

    },
    mounted() {

        this.getGroup();
        this.getcompany();
    },
}
</script>
<style lang="less" scoped>
.type-item {
    border-radius: 2px;
    height: 24px;
    color: #959595;
    display: inline-block;
    border: 1px solid #cdcdcd;
    margin-left: 20px;
    line-height: 24px;
}

.type-box {
    margin: 0 -24px;
    border: none;
    border-bottom: 1px solid #e8ebf2;
    li {
        margin-bottom: 25px;
    }
    p {
        .el-select {
            width: 150px;
            text-align: left;
            margin-top: -20px;
            margin-right: 20px;
        }
    }
    .head {
        padding-top: 3px;
    }
}

.top-tool {
    height: 60px;
    margin: 0 -24px;
    padding: 0 24px;
    line-height: 60px;
    background-color: #fafafa;
    border-top: 1px solid #e8ebf2;
    border-bottom: 1px solid #e8ebf2;
    .el-input {
        width: 200px;
        margin-left: 30px;
    }
    .el-button {
        width: 80px;
        color: white;
        background: #00a5ff;
        margin-left: 47px;
        margin-top: 10px;
    }
}

.content-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #e8ebf2;
    .main-body {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin: 0 30px;
        .company-info {
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin-left: 30px;
        }
    }
}

.rate {
    float: right;
    .circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #00a5ff;
    }
}

.company-info {
    padding-top: 15px;
    a {
        font-size: 16px;
    }
    .sub-list {
        margin-top: 15px;
        span {
            margin-right: 15px;
            color: #808080;
            img {
                margin-right: 6px;
                margin-top: -3px;
            }
        }
    }
}

.el-pagination {
    display: inline-block;

    margin-top: 60px
}
</style>