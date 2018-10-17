<template>
    <div>
        <div class="company-head">
            <span class="comName">中科点击科技有限公司</span>
            <div class="right-action">
                <div class="right-box">
                    <a href="#">添加企业分组</a>
                </div>
                <div class="right-box">
                    <a href="#">生成企业报告</a>
                </div>
            </div>
        </div>
        <ul class="com-msg">
            <li><img src="../../assets/images/tel.png" height="15" width="15" alt="">电话:17801056798</li>
            <li><img src="../../assets/images/internet.png" height="17" width="16" alt="">网址:www.huishu.com</li>
            <li><img src="../../assets/images/e-mail.png" height="11" width="18" alt="">邮箱:zhongkedianji@dianji.com</li>
            <li class="last-list">
                <img src="../../assets/images/location-h.png" height="11" width="9" alt="">地址:北京市中关村软件园华胜天成大厦二层</li>
        </ul>
        <ul class="company-list">
            <li>
                <router-link to="/supervision/parkCompanys/companyDetail/" :class="{active:isActive}" class="l1">
                    企业基本画像
                </router-link>
            </li>
            <li>
                <router-link to="/supervision/parkCompanys/companyDetail/companyBusiness" active-class="active" class="l2">
                    企业业务画像
                </router-link>
            </li>
            <li>
                <router-link to="/supervision/parkCompanys/companyDetail/companyInformation" active-class="active" class="l3">
                    企业情报画像
                </router-link>
            </li>
            <li>
                <router-link to="/supervision/parkCompanys/companyDetail/companyFloor" active-class="active" class="l4">
                    企业落地
                </router-link>
            </li>
            <li>
                <router-link to="/supervision/parkCompanys/companyDetail/companyRelation" active-class="active" class="l5">
                    关系拓扑
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isActive: false
        }
    },
    mounted() {
        $(".company-list a").on("click", function() {
            $(this).addClass("active").parent().siblings().children().removeClass("active");
        })
        if (this.$route.path == "/supervision/parkCompanys/companyDetail/") {
            this.isActive = true;
        }
    },
    watch: {

        '$route' (to, from) {
            console.log(from);
            if (to.path !== "/supervision/parkCompanys/companyDetail/") {
                this.isActive = false;
            } else {
                this.isActive = true;
            }
        }
    }
}
</script>
<style scoped>
.company-list {
    height: 62px;
    overflow: hidden;
}

.company-list li {
    float: left;
    height: 100%;
    width: 20%;
    text-align: center;
    line-height: 62px;
}

.l1 {
    display: block;
    background-color: #72C3FC;
    color: #ffffff;
}

.l2 {
    display: block;
    background-color: #31b7ff;
    color: #ffffff;
}

.l3 {
    display: block;
    background-color: #07a8ff;
    color: #ffffff;
}

.l4 {
    display: block;
    background-color: #0096ea;
    color: #ffffff;
}

.l5 {
    display: block;
    background-color: #0080c4;
    color: #ffffff;
}

.active {
    background-color: white;
    color: #0b1222;
}

.com-msg {
    overflow: hidden;

    margin-bottom: 60px;
}

.com-msg li {
    float: left;
    margin: 0 30px;
    color: #9b9fa2;
}

.com-msg li img {
    margin-right: 6px;
}

.last-list {
    margin-right: 0;
}

.company-head {
    text-align: center;
    overflow: hidden;
    height: 80px;
    line-height: 40px;
    position: relative;
}

.comName {
    font-size: 20px;
    color: #000;
}

.right-action {
    position: absolute;
    right: 0;
    top: 2px;
}

.right-box {
    width: 120px;
    height: 32px;
    border: 1px solid #00a5ff;
    display: inline-block;
    margin-right: 20px;
    line-height: 32px;
    border-radius: 16px;
}

.right-box a {
    color: #00a5ff;
}

.right-box:hover {
    background-color: #00a5ff;
}

.right-box:hover a {
    color: #ffffff;
}
</style>