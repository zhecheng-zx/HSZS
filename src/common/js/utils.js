
export default {
    install(Vue) {
      
         function slice(target,number){
         	target.slice(0,number)+'...';
         };
        
        Vue.prototype.Util = {
          slice:slice
          

      }
    }
}

