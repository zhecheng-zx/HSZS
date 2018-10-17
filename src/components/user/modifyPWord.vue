<template>
    <div class="content-block">
        <div class="title policy-title">
            <img src="../../assets/images/mima.png" alt="">修改密码
        </div>
        <div class="modify">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="原始密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm">
                    <el-input type="password" v-model="ruleForm.confirm" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="testCode">
                    <el-col :span="10">
                        <el-input type="password" v-model="ruleForm.testCode" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="7" :offset="2" class="code">
                        {{testCode}}
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <a href="javascript:void(0);" class="blue" @click="test">换一批</a>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm" :disabled="isdisabled">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
 import '../../common/js/security.js'
export default {
   
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入原始密码'));
            } else {

                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else {

                callback();
            }
        };
        var validatePass3 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.ruleForm.newPass) {
                callback(new Error('两次输入不一致'));
            } else {

                callback();
            }
        };
        var validatePass4 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else if (value.toLowerCase() !== this.testCode.toLowerCase()) {

                callback(new Error('验证码输入错误'));
            } else {

                callback();
            }
        };
        return {
            ruleForm: {

                oldPass: '',
                newPass: '',
                confirm: '',
                testCode: ''
            },
            testLink: '',
            testCode: '',
            rules: {
                oldPass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                newPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                confirm: [
                    { validator: validatePass3, trigger: 'blur' }
                ],
                testCode: [
                    { validator: validatePass4, trigger: 'blur' }
                ],
            },
            isdisabled:false
        }
    },
    methods: {
       
        test() {
            let all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
            let b = "";
            for (let i = 0; i < 4; i++) {
                let index = Math.floor(Math.random() * 62);
                b += all.charAt(index);

            }
            this.testCode=b;
            
        },
        getkey() {
            this.$ajax.get('/apis/security/generateKey.do').then(res => {

                if (res.data.success == true) {

                    let exponent = res.data.data.publicKeyExponent;
                    let modulus = res.data.data.publicKeyModulus;
                    RSAUtils.setMaxDigits(200);
                    let key = new RSAUtils.getKeyPair(exponent, "", modulus);
                    let encrypedPwd = RSAUtils.encryptedString(key, this.ruleForm.oldPass);
                    let encrypedPwds = RSAUtils.encryptedString(key, this.ruleForm.newPass);
                    this.modify(encrypedPwd,encrypedPwds);

                }
            }).catch(err => console.log(err))
        },
        modify(old,now){
           this.$ajax({
                url: '/apis/user/modifyPassword.json',
                method: 'post',
                data: { oldPassword: old, newPassword: now, type: 'user' }
            }).then(res=>{
                this.isdisabled=false;
                  this.$message(res.data.message);
            }).catch(err => console.log(err))
        },
        submitForm() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                       this.isdisabled=true;
                       this.getkey();
                      
                } else {

                    return false;
                }
            });
        },
    },
    mounted(){
    	this.test();
    }
}
</script>
<style lang="less" scoped>
.modify {
    width: 500px;
    margin: 0 auto;
    margin-top: 30px;
}

.code {
     background-color:rgba(153,153,153,0.19);
    font-size: 16px;
    color: #00a5ff;
    text-align: center;
    letter-spacing: 15px;
    padding-left: 15px;
}
</style>