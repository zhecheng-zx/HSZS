<template>
    <div class="left-bar">
        <ul class="left-bar-menu">
            <li>
                 <router-link to="/intelligence/headlines" > <i class="icon-left1"></i>产业情报</router-link>
                <ol>
                    <li>
                        <router-link to="/intelligence/headlines" active-class="active"> <i class="icon-left2"></i>产业头条</router-link>
                    </li>
                    <li>
                        <router-link to="/intelligence/policy" active-class="active"> <i class="icon-left3"></i>产业政策</router-link>
                    </li>
                    <li>
                        <router-link to="/intelligence/expertView" active-class="active"> <i class="icon-left4"></i>专家观点</router-link>
                    </li>
                    <li>
                        <router-link to="/intelligence/businessRank" active-class="active"> <i class="icon-left5"></i>企业排行</router-link>
                    </li>
                </ol>
            </li>
            <!-- <li> <router-link to="/intelligence/parkInfo" style="padding-left:20px;"> 
                     <i class="icon-left6"></i>园区情报</router-link>
                <ol>
                    <li>
                        <router-link to="/intelligence/parkInfo" active-class="active"> <i class="icon-left7"></i>园区概览</router-link>
                    </li>
                    <li>
                        <router-link to="/intelligence/focusPark" active-class="active"> <i class="icon-left8"></i>关注园区</router-link>
                    </li>
                </ol>
            </li> -->
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
           

        }
    },

    mounted() {


    },
}
</script>