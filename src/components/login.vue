<template>
    <div class="login">
        <div class="logo">
            <!-- <img src="../assets/images/logo.png" height="49" width="171" alt="logo"> -->
        </div>
        <div class="login-box clearfix">
            <el-row>
                <el-col :span="12" class="left">
                    <img src="../assets/images/login-left.png" alt=""></el-col>
                <el-col :span="12">
                    <div class="right">
                        <h3>登录</h3>
                        <div class="group">
                            <input type="text" v-model="uName" placeholder="请输入用户名">
                            <img src="../assets/images/user-b.png" height="26" width="24" alt="">
                        </div>
                        <div class="group">
                            <input type="password" v-model="pWord" placeholder="请输入密码">
                            <img src="../assets/images/pw-b.png" height="26" width="24" alt="">
                        </div>
                        <button class="btn btn-zs btn-block" @click="getkey" :disabled="isdisabled">
                            立即登录
                        </button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="footer">
            <!-- Copyright©2007-2016 中科点击（北京）科技有限公司-版权所有 京ICP备11012241-3号 -->
        </div>
    </div>
</template>
<style lang="less" scoped>
.login {
    min-width: 1200px;
    min-height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    padding-top: 35px;
    background: -webkit-linear-gradient(#1276f8, #7f6cfe);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#1276f8, #7f6cfe);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#1276f8, #7f6cfe);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(#1276f8, #7f6cfe);
    /* 标准的语法 */
    .logo {
        width: 90%;

        margin: 0 auto;
    }
}

.login-box {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 80%;
    margin: 0 auto;
    margin-top: 90px;

    .left {
        text-align: center;
        height: 320px;
        line-height: 320px;
        img {
            width: 72.5%;
        }
    }
    .right {
        width: 65%;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 10px;
        padding: 30px 30px;
        h3 {
            text-align: center;
            font-size: 28px;
            color: #161c26;
            margin-bottom: 30px;
            margin-top: 0;
        }
        button {
            height: 45px;
            font-size: 20px;
            margin-top: 40px;
        }
    }
}

.group {
    position: relative;
    margin-bottom: 25px;
    input {
        height: 45px;
        width: 100%;
        padding-left: 60px;
        border: 1px solid #b7b7b7;
    }
    img {
        position: absolute;
        left: 20px;
        top: 10px;
    }
}

.footer {
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #cec7ff;
}
</style>
<script>
import '../common/js/security.js'
export default {

    data() {
        return {
            uName: '',
            pWord: '',
            isdisabled:false

        }

    },
    methods: {
        getkey() {
            if (this.uName == '' || this.pWord == '') {
                this.open("用户名或密码不能为空");
                return;
            }
            this.isdisabled=true;
            this.$ajax.get('/apis/security/generateKey.do').then(res => {

                if (res.data.success == true) {

                    let exponent = res.data.data.publicKeyExponent;
                    let modulus = res.data.data.publicKeyModulus;
                    RSAUtils.setMaxDigits(200);
                    let key = new RSAUtils.getKeyPair(exponent, "", modulus);
                    let encrypedPwd = RSAUtils.encryptedString(key, this.pWord);
                    this.pWord=encrypedPwd;
                    this.login(encrypedPwd);

                }
            }).catch(err => console.log(err))
        },
        login(data) {
            this.$ajax({
                url: '/apis/login.do',
                method: 'post',
                data: { username: this.uName, password: data, type: 'user' },
                transformRequest: [function(data) {

                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                if (res.data.message == "登录成功") {
                   
                    this.$router.push('/intelligence');
                    
                } else {
                    this.pWord="";
                    this.open(res.data.message);
                    this.isdisabled=false;
                }

            }).catch(err => {
                this.isdisabled=false;
                console.log(err)
            })
        },

        open(message) {
            this.$notify.error({
                title: "登录出错",
                message: message,
                duration: 2000
            });
        },
    },
    mounted(){
        let vm=this;
        this.$nextTick(() => {
                document.querySelector(".login").onkeydown=keyListener;
            function keyListener(e){
                
                if(e.keyCode == 13){
                 vm.getkey();
                }
             }
         });
    
    },

}
</script>