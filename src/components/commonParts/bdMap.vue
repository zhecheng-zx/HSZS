<template>
    <div id="map">
    </div>
</template>
<script>
import { MP } from '../../common/js/map.js'
export default {
    props: ['parkInfo', 'cityInfo'],
    data() {
        return {

            BMap: '',
            myGeo: '',
            isview: false,
            map: ''

        }
    },
    methods: {
        init(BMap) {
           let vm=this;
            var map = new BMap.Map("map", { enableMapClick: false }); // 创建Map实例
            // var point = new BMap.Point(116.404, 39.915); // 创建点坐标
            // map.centerAndZoom(point,12);
            map.enableScrollWheelZoom();
            map.disableDoubleClickZoom();
            map.addControl(new BMap.ScaleControl());
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();


            if (this.cityInfo != undefined) {

                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint(this.cityInfo.name, function(point) {
                    if (point) {
                        map.centerAndZoom(point, 11);
                        map.addOverlay(new BMap.Marker(point));
                        vm.isview=true;
                    } else {
                        alert("地址解析失败!");
                    }
                });


            };
            this.BMap = BMap;
            this.myGeo = new BMap.Geocoder();
            this.map = map;

        },
        view(BMap, myGeo, map) {
            //解析并标注所在城市园区
            let vm =this;
            var adds = this.cityInfo.park;
            map.clearOverlays();
            var index = 0;
            geocodeSearch();

            function bdGEO() {
                var add = adds[index].address;
                var name = adds[index].name;

                index++;
                geocodeSearch(add, name);


            };

            function geocodeSearch(add, name) {

                if (index < adds.length) {
                    setTimeout(bdGEO(), 100);
                }
                vm.myGeo.getPoint(add, function(point) {
                    if (point) {
                        var label = new BMap.Label(name, { offset: new BMap.Size(20, -10) })
                        label.setStyle({ borderColor: "#fff" })
                        var address = new BMap.Point(point.lng, point.lat);
                        addMarker(address, label);
                    }
                });
            }
            // 编写自定义函数,创建标注
            function addMarker(point, label) {
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
                marker.setLabel(label);
                marker.addEventListener("click",attribute);
            }
            //marker点击事件
            function attribute(e){
                 var p = e.target;
                 adds.forEach(val=>{
                    if(val.name==p.zc.innerText){
                        console.log(val);
                        vm.$router.push({path:'/supervision/focusPark/parkDetails',query:{query:val.name,id:val.id,address:val.address}})
                        
                    }
                 })
                   
             }   

            //结束
        },
        park(){
            //点位园区
             
              let vm=this;

                // 将地址解析结果显示在地图上,并调整地图视野
                this.myGeo.getPoint(this.parkInfo.address, function(point) {

                    if (point) {

                        vm.map.centerAndZoom(point, 17);
                        var marker=new vm.BMap.Marker(point);
                        vm.map.addOverlay(marker);
                        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                    } else {
                        alert("地址解析失败!");
                    }
                });
            

        },
    },
    watch: {
        'cityInfo.park': function(val){
           
              
            if (val!= [] && this.isview==true) {
              
                 this.view(this.BMap,this.myGeo,this.map)
            }
        },
        'isview': function(val){
              
            if (val!= [] && this.isview==true) {
              
                 this.view(this.BMap,this.myGeo,this.map)
            }
        },
        'parkInfo.address':function(val){
            if(this.parkInfo!=undefined){
                 if(val!=''&&this.myGeo!=''){
               this.park();
            }
            }
           
        },
        'myGeo':function(val){
                       if(this.parkInfo!=undefined){
                 if(val!=''&&this.myGeo!=''){
               this.park();
            }
            }
        },

    },
    mounted() {

        
        this.$nextTick(function() {

            var vm = this;
            MP().then(BMap => {
                
                vm.init(BMap)

            });


        });
    },
}
</script>