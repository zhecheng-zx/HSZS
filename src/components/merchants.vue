<template>
    <div>
        <head-bar></head-bar>
        <div class="wrapper">
            <div class="left-bar">
                <ul class="left-nav">
                    <li>
                        <router-link to="/merchants/companySearch" active-class="active">
                            <img src="../assets/images/n1.png" height="20" width="17" alt=""> 企业搜索
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/merchants/intelligent/recommendCompanys" active-class="active">
                            <img src="../assets/images/n3.png" height="18" width="18" alt=""> 智能推荐
                        </router-link>
                    </li> -->
                    <li>
                        <router-link to="/merchants/wisdomMap" active-class="active">
                            <img src="../assets/images/wisdom.png" height="19" width="18" alt=""> 产业智图
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/merchants/focusCompany" active-class="active">
                            <img src="../assets/images/n4.png" height="21" width="22" style="margin-right:10px;" alt=""> 关注企业
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="home">
                <div class="main-content">
                    <router-view></router-view>
                </div>
                <footer>
                    <!-- Copyright©2008-2016 中科点击（北京）科技有限公司-版权所有 京ICP备11012241-3号 -->
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