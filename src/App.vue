<template>
    <div id="app">
        
        <router-view></router-view>
       <el-dialog
       title="提示"
       :visible.sync="warnInfo.isWarn"
       size="tiny"
       >
  
       <span>您的账号将于{{warnInfo.message}}过期,<span v-show="warnInfo.level!=0">请及时续费</span></span>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="apply" v-show="warnInfo.level==0">申请转为正式</el-button>
      <el-button type="primary" @click="view" v-show="warnInfo.level!=0">确定</el-button>
     </span>
     </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
           
            
        }
    },
    computed:mapState({
    warnInfo:state => state.warnInfo,
    }),
    methods:{
        apply(){
         this.$ajax.get('/apis/user/applyFormal.json').then(res=>{
             
                 this.$message(res.data.message);
                 this.$store.commit('CANCLE_WARN');
         }).catch(err=>console.log(err))
        },
        view(){
            this.$store.commit('CANCLE_WARN');
        }
    }

    

}
</script>