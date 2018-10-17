<template>
    <div>
        <head-bar></head-bar>
        <div class="wrapper">
            <div class="left-bar">
                <ul class="left-nav">
                    <li>
                        <router-link to="/user/userCenter" active-class="active">
                            <img src="../assets/images/home.png"  alt=""> 个人中心
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/user/modify" active-class="active">
                            <img src="../assets/images/pw.png"  alt=""> 修改密码
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/down" active-class="active" >
                            <img src="../assets/images/down.png" style="margin-left:-5px;margin-right:12px;" alt="">
                            下载中心
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/requires" active-class="active">
                            <img src="../assets/images/text.png"  alt="">
                            招商需求池
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="home">
                <div class="main-content">
                    <router-view></router-view>
                </div>
                <footer>
                    Copyright©2008-2016 中科点击（北京）科技有限公司-版权所有 京ICP备11012241-3号
                </footer>
            </div>
        </div>
    </div>
</template>
<style scoped>
.left-nav>li>a {
    height: 60px;
    line-height: 60px;
}
</style>
<script>
import headBar from './commonParts/headBar.vue'
export default {
    components: {
        'headBar': headBar
    },
    data() {
        return {
            
        }
    },
    mounted() {
        $(function() {
            var min_height = $(window).height() - 212 + "px";
            $(".main-content").css({ "min-height": min_height });
            $(window).resize(function() {
                var min_height = $(window).height() - 212 + "px";
                $(".main-content").css({ "min-height": min_height });
            });
        });

    },

}
</script>