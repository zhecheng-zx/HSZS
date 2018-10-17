<template>
    <div>
        <ul class="type-box">
            <li>
                <div class="head" style="padding-top:3px;"><img src="../../../assets/images/bq.png" height="15" width="15" alt="">企业标签</div>
                <p class="type-list">
                    <span v-for="(item,index) in label" :class="{active:index==labelCode}" @click="select1(index)">{{item}}</span>
                    <span class="type-item" @click="addVisible = true">+ 添加企业标签</span>
                    <span class="type-item" @click="removeVisible = true">删除企业标签</span>
                </p>
                <el-dialog :visible.sync="addVisible" size="tiny" class="text-center" title="添加企业标签">
                    <el-input v-model="addLabel" placeholder="请输入标签名"></el-input>
                    <span slot="footer" class="dialog-footer">
                                <el-button @click="addOff">取 消</el-button>
                                <el-button type="primary" @click="addLabels">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog :visible.sync="removeVisible" size="tiny" class="text-center" title="删除企业分标签">
                    <el-select v-model="removes" multiple placeholder="请选择标签名">
                        <el-option v-for="item in removeLabel" :key="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                    <span slot="footer" class="dialog-footer">
                                <el-button @click="removeOff">取 消</el-button>
                                <el-button type="primary" @click="removelist">确 定</el-button>
                    </span>
                </el-dialog>
            </li>
            <li>
                <div class="head"><img src="../../../assets/images/state.png" height="12" width="23" style="margin-left:-8px;" alt="">状态</div>
                <p class="type-list">
                    <span v-for="(item,index) in state" :class="{active:index==stateCode}" @click="select2(index)">{{item}}</span>
                </p>
            </li>
            <li>
                <div class="head">
                    <img src="../../../assets/images/time.png" alt="">时间
                </div>
                <p class="type-list">
                    <span v-for="(item,index) in time" :class="{active:index==timeCode}" @click="select3(index)">{{item}}</span>
                </p>
            </li>
        </ul>
        <div class="addRequire">
            <a href="javascript:void(0);" @click="formVisible = true"><img src="../../../assets/images/add-small.png" height="21" width="21" alt="">添加需求</a>
        </div>
                <el-dialog :visible.sync="formVisible" @close="cancleAdd">
            <el-form :model="infos">
                <el-form-item label="企业名" label-width="120px">
                    <el-input v-model="infos.name" placeholder="请输入企业名"></el-input>
                </el-form-item>
                <el-form-item label="所属企业" label-width="120px">
                    <el-input v-model="infos.fatherName" placeholder="请输入总部企业名"></el-input>
                </el-form-item>
                <el-form-item label="企业标签" label-width="120px">
                    <el-select v-model="infos.label" placeholder="请选择企业标签">
                        <el-option  v-for="item in removeLabel" :key="item.value" :value="item.value">{{item.value}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属地区" label-width="120px">
                    <el-input v-model="infos.area" placeholder="请输入所在区域"></el-input>
                </el-form-item>
                <el-form-item label="企业关系" label-width="120px">
                    <el-input v-model="infos.relation" placeholder="子,父企业,投资企业"></el-input>
                </el-form-item>
                <el-form-item label="企业关系备注" label-width="120px">
                    <el-input v-model="infos.relationRemark"></el-input>
                </el-form-item>
                <el-form-item label="企业状态" label-width="120px">
                    <el-input v-model="infos.companyStatus" placeholder="请输入企业状态"></el-input>
                </el-form-item>
                <el-form-item label="负责人" label-width="120px">
                    <el-input v-model="infos.responsiblePerson" placeholder="请输入负责人姓名"></el-input>
                </el-form-item>
                <el-form-item label="招商状态" label-width="120px" >
                    <el-select v-model="infos.investmentStatus" placeholder="请选择企业标签">
                        <el-option  v-for="item in investmentStatus" :key="item.value" :value="item.value">{{item.value}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="招商备注" label-width="120px">
                    <el-input type="textarea" v-model="infos.investmentRemark"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer">
                <el-button type="primary" @click="addRequire">保存</el-button>
            </div>
        </el-dialog>
        <div class="table-box" v-show="list.length">
            <table class="table-zs">
                <thead>
                    <tr>
                        <th>企业名</th>
                        <th>子企业</th>
                        <th>产业领域</th>
                        <th>所属地区</th>
                        <th>负责人</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in list">
                    <tr v-for="(item1,index1) in item.children">
                        <td :rowspan="item.children.length" class="first" v-if="0==index1">{{item.name}}</td>
                        <td>
                            <router-link :to="'/user/requires/requireDetails/'+item1.id">{{item1.name}}</router-link>
                        </td>
                        <td>{{item1.label}}</td>
                        <td>{{item1.area}}</td>
                        <td>{{item1.responsiblePerson}}</td>
                        <td>{{item1.investmentStatus}}</td>
                        <td><a href="javascript:void(0);" class="blue" @click="edit(item1.id)">编辑</a></td>
                    </tr>
                   
                </tbody>
                
            </table>
        </div>
         <div v-show="!list.length" class="text-center">
              <img src="../../../assets/images/noData.png" height="166" width="157" alt="">
         </div>
          <el-dialog :visible.sync="editVisible">
            <el-form :model="company">
                <el-form-item label="招商状态" label-width="120px" >
                    <el-select v-model="company.investmentStatus" placeholder="请选择企业标签">
                        <el-option  v-for="item in investmentStatus" :key="item.value" :value="item.value">{{item.value}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="招商备注" label-width="120px">
                    <el-input type="textarea" v-model="company.investmentRemark"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer">
                <el-button type="primary" @click="saveEdit">保存修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            label: [],
            state: ['全部', "已入住", "未入住"],
            time: ['全部', '近一周', '近三个月', '近六个月', '近一年'],
            labelCode: 0,
            stateCode: 0,
            timeCode: 0,
            keyWord: '',
            count: 2,
            addVisible: false,
            addLabel: '',
            removeVisible: false,
            removes: [],
            removeLabel: [],
            formVisible: false,
            infos: {
                name: '',
                fatherName: '',
                label: '',
                relation: '',
                relationRemark: '',
                companyStatus: '',
                area:'',
                responsiblePerson: '',
                investmentRemark: '',
                investmentStatus: ''
            },
            investmentStatus:[
             {value:'目标企业'},
             {value:'洽谈中'},
             {value:'部署中'},
             {value:'成功入驻'},
            ],
            company:{
                investmentRemark: '',
                investmentStatus: ''
            },

            editVisible:false,
            editId:0,
            list:[]



        }
    },
    methods:{
        select1(index){
            this.labelCode = index
            this.update()
        },
        select2(index){
            this.stateCode = index
            this.update()
        },
        select3(index){
            this.timeCode = index
            this.update()
        },
        search(){

        },
         getLabel(){
           this.$ajax.get('/apis/label/getMyLabel.json').then(res => {
            this.label=['全部'];
            this.removeLabel = [];
            if(res.data.data){
                res.data.data.forEach(val=>{
                this.label.push(val.label)
                this.removeLabel.push({ value: val.label });
              });
            }
          
              this.update();
           })
       },
        msg(data,type){
            this.$message({
                message: data,
                type: type
            });
        },
        addLabels() {
            let rex=/(^[\u4E00-\u9FA5a-zA-Z0-9_]+$)/;
            if(!rex.test(this.addLabel)){
                this.msg('组名由中英文数字下划线组成并不能为空','warning');
                return;
            };
            if(this.addLabel.length>10){
                this.msg('组名不能超过十个字符','warning');
                return;
            };
            this.$ajax.get('/apis/label/addMyLabel.json', { params: { name: this.addLabel } }).then(res => {
                if (res.data.success == true) {
                    this.addVisible = false;
                    this.getLabel();
                    this.msg('添加标签成功','success');
                    this.addLabel='';
                } else if (res.data.message == "标签已经存在") {
                    this.msg('标签已存在','warning')
                } else {
                    this.$message.error('添加标签失败');
                }
            }).catch(err => console.log(err))
        },
        addOff(){
            this.addVisible = false;
            this.addLabel='';
        },
        removelist() {
            if(this.removes.length==0){
                this.msg('请选择要删除标签','warning');
                return;
            }
            let p = this.removes.join();
            this.$ajax.post('/apis/label/dropMyLabel.json', {msg: this.removes}).then(res => {
                
                if (res.data.success==true) {

                    this.msg('删除标签成功','success');
                    this.removeVisible = false;
                    this.getLabel();
                    this.labelCode=0;
                    this.removes=[];
                } else {
                    this.$message.error('删除标签失败');
                }

            }).catch(err => {
                console.log(err);
                this.$message.error('删除标签失败');
            })
        },
        removeOff(){
            this.removeVisible = false;
            this.removes=[];
        },
        update(){
            var msg = [this.label[this.labelCode],this.state[this.stateCode],this.time[this.timeCode]]
            this.$ajax.post('/apis/pool/getMyCompanyList.json', {msg}).then((res) => {
                this.list=res.data.data.list;
            }).catch(err => console.log(err))
        },
        addRequire(){
            this.$ajax.post('/apis/pool/addPoolCompany.json',this.infos).then(res =>{
                if(res.data.success){
                     this.update();
                     this.formVisible=false;
                     Object.keys(this.infos).forEach(val=>{
                         this.infos[val]='';
                     });
                }
               
            }).catch(err=>{this.formVisible=false;})
        },
        cancleAdd(){
           Object.keys(this.infos).forEach(val=>{
                         this.infos[val]='';
                     });
        },
        edit(ID){
            this.editId=ID;
            this.$ajax.get('/apis/pool/findPoolCompanyById.json',{params:{id:ID}}).then(res=>{
                this.company.investmentRemark=res.data.data.investmentRemark;
                 this.company.investmentStatus=res.data.data.investmentStatus;
                 this.editVisible=true;
            })
        },
        saveEdit(){
            this.$ajax.post('/apis/pool/editPoolCompany.json',{id:this.editId,investmentRemark:this.company.investmentRemark,investmentStatus:this.company.investmentStatus}).then(res=>{
                if(res.data.success){
                    this.editVisible=false;
                    this.msg('修改成功','success');
                    this.update();
                }else{
                    this.$message.error('修改失败');
                }
            })
        }
    },
    mounted(){
        this.getLabel();
        
        

    }
}
</script>
<style lang="less" scoped>
.type-box {
    margin: 0 -24px;
    background-color: #fafafa;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #e8ebf2;
}

.type-item {
    border-radius: 2px;
    height: 24px;
    color: #959595;
    display: inline-block;
    border: 1px solid #cdcdcd;
    margin-left: 20px;
    line-height: 24px;
    background-color: #fff;
}

.addRequire {
    padding: 10px 0;
    text-align: right;

    a {
        color: #999999;

        img {
            margin-right: 5px;
            margin-top: -3px;
        }
    }
}

.table-box {
    margin-top: 0;
}

.first {
    border-right: 1px solid #e8ebf2;
}

.el-form {
    width: 500px;
    margin: 0 auto;
}

.footer {
    text-align: center;
    .el-button {
        width: 150px;
    }
}
</style>