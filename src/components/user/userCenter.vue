<template>
    <div>
        <div class="content-block">
            <div class="title policy-title">
                <img src="../../assets/images/peopleCenter.png" height="24" width="18" alt="">个人中心
            </div>
            <div class="userCenter">
                <img :src="link" height="100" width="100" alt="头像">
                <span>账号：{{user.userAccount}}</span>
                <span>注册时间：{{user.createTime}}</span>
            </div>
        </div>
        <div class="content-block">
            <div class="title policy-title">
                <img src="../../assets/images/peopleinfo.png" height="18" width="23" alt="">基本信息
            </div>
            <div class="info">
                <div><span class="label">姓名</span>{{user.realName}}</div>
                <div><span class="label">所在园区</span>{{user.userPark}}</div>
                <div><span class="label">所在部门</span>{{user.userDepartment}}</div>
                <div><span class="label">职位</span>{{user.userJob}}</div>
                <div><span class="label">邮箱</span>
                    <input type="text" v-model='email' class="enter">
                    <button class="blue" v-if="isModify" @click="modify">修改</button>
                    <span v-if="!isModify"><button class="blue" @click="save">保存</button><button @click="cancle">取消</button></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {},
            email: '',
            isModify: true,
            link:''
        }
    },
    methods: {
        getInfo() {
            this.$ajax.get('/apis/user/findMyInformation.json').then(res => {
                   this.user=res.data.data;
                   this.email=res.data.data.userEmail;
                   this.link=this.user.imageUrl;
            }).catch(err => console.log(err))
        },
        modify() {
            this.isModify = false;
            document.querySelectorAll('.enter')[0].focus();
            document.querySelectorAll('.enter')[0].select();
        },
        cancle() {
            this.isModify = true;
        },
        save() {
            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            if(!reg.test(this.email)){
                 this.$message({
                      showClose: true,
                      message: '邮箱格式不正确',
                      type: 'error'
                    });
                 return;
            };
            this.$ajax.get('/apis/user/modifyEmail.json', {params:{email:this.email}}).then(res => {
                  if(res.data.message=="邮箱修改成功"){
                        this.isModify=true;
                        this.$message({
                      showClose: true,
                      message: '邮箱修改成功',
                      type: 'success'
                    });
                  }else{
                     this.$message({
                      showClose: true,
                      message: res.data.message,
                      type: 'error'
                    });
                  }
            }).catch(err => console.log(err))
        },
    },
    mounted(){
             this.getInfo();
    },
}
</script>
<style lang="less" scoped>
.userCenter {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 10px;
    img {
        border-radius: 50%;
        transition:transform 1s;
        &:hover{
            transform:rotateY(180deg);
        }
    }
    span {
        margin-left: 30px;
        font-size: 16px;
    }
}

.info {
    width: 500px;
    padding: 20px;
    margin: 0 auto;

    &>div {
        margin-top: 15px;
        color: #999;
        .label {
            display: inline-block;
            width: 80px;
            margin-right: 30px;
            text-align: right;
            color: #333;
            font-size: 16px;
            font-weight: normal;
        }
        input,
        button {
            border: 1px solid #fff;
            height: 30px;
            background-color: #fff;
            &:focus {
                outline: none;
            }
        }
    }
}
</style>