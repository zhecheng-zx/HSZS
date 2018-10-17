//登录
import login from '../components/login.vue'
//招商情报
import intelligence from '../components/intelligence.vue'
import headlines from '../components/intelligence/headlines.vue'
import policy from '../components/intelligence/policy.vue'
import expert from '../components/intelligence/expert.vue'
import expertList from '../components/intelligence/expertList.vue'
import article from '../components/intelligence/article.vue'
import businessRank from '../components/intelligence/businessRank.vue'
import parkInfo from '../components/intelligence/parkInfo.vue'
import infos from '../components/intelligence/infos.vue'
import parkDetails from '../components/intelligence/parkDetails.vue'
import focusPark from '../components/intelligence/focusPark.vue'
import focus from '../components/intelligence/focus.vue'
import dynamic from '../components/intelligence/dynamic.vue'
import cityPark from '../components/intelligence/cityPark.vue'

//精准招商
import merchants from '../components/merchants.vue'
import search from '../components/merchants/search.vue'
import companySearch from '../components/merchants/companySearch.vue'
import result from '../components/merchants/result.vue'
import merchantsDetail from '../components/merchants/merchantsDetail.vue'
import focusCompany from '../components/merchants/focusCompany.vue'
//智能企业
import industryType from '../components/merchants/intelligent/industryType.vue'
import recommendCompanys from '../components/merchants/intelligent/recommendCompanys.vue'
//产业智图
import wisdomMap from '../components/merchants/wisdomMap.vue'
//模拟tab页的子路由跳转引入
import merchBasic from '../components/merchants/tabRouter/merchBasic.vue'
import merchBusiness from '../components/merchants/tabRouter/merchBusiness.vue'
import merchFloor from '../components/merchants/tabRouter/merchFloor.vue'
import merchInformation from '../components/merchants/tabRouter/merchInformation.vue'
import merchRelation from '../components/merchants/tabRouter/merchRelation.vue'

//园区监管
import supervision from '../components/supervision.vue'
import parkMap from '../components/supervision/parkMap.vue'
import companys from '../components/supervision/companys.vue'
import goodNews from '../components/supervision/goodNews.vue'
import badNews from '../components/supervision/badNews.vue'
import outflow from '../components/supervision/outflow.vue'
import articleList from '../components/supervision/articleList.vue'
import infoChange from '../components/supervision/infoChange.vue'
import parkCompanys from '../components/supervision/parkCompanys.vue'
import companyDetail from '../components/supervision/companyDetail.vue'
import warningDetails from '../components/supervision/warningDetails.vue'
//模拟tab页的子路由跳转引入
import companyBasic from '../components/supervision/tabRouter/companyBasic.vue'
import companyBusiness from '../components/supervision/tabRouter/companyBusiness.vue'
import companyInformation from '../components/supervision/tabRouter/companyInformation.vue'
import companyFloor from '../components/supervision/tabRouter/companyFloor.vue'
import companyRelation from '../components/supervision/tabRouter/companyRelation.vue'
//个人中心
import user from '../components/user.vue'
import userCenter from '../components/user/userCenter.vue'
import modify from '../components/user/modifyPWord.vue'
import collect from '../components/user/collect.vue'
import collectArticle from '../components/user/collectArticle.vue'
import requires from '../components/user/require/requires.vue'
import myrequire from '../components/user/require/myrequire.vue'
import requireList from '../components/user/require/requireList.vue'
import requireDetails from '../components/user/require/requireDetails.vue'
export default [
    { path: '/', name: 'login', component: login },
    {
        path: '/intelligence',
        component: intelligence,
        meta: { requiresAuth: true },
        children: [
            { path: '/', redirect: '/intelligence/headlines' },
            { path: 'headlines', name: 'headlines', component: headlines },
            { path: 'policy', name: 'policy', component: policy },
            {path: 'expertView',redirect:'expertView/expert'}, 
            { path: 'expertView/expert', name: 'expert', component: expert },
            { path: 'expertView/expertList', name: 'expertList', component: expertList },
            { path: 'businessRank', name: 'businessRank', component: businessRank },
            {
                path: 'parkInfo',
                component: parkInfo,
                children: [
                    { path: '', name: 'infos', component: infos },
                    { path: 'cityPark', name: 'cityPark', component: cityPark },
                    { path: 'dynamic', name: 'dynamic', component: dynamic },

                ]
            },
            {
                path: 'focusPark',
                component: focusPark,
                children: [
                    { path: '', name: 'focus', component: focus },
                    { path: 'parkDetails', name: 'parkDetails', component: parkDetails }
                ]
            },
            { path: 'article/:id', name: 'article', component: article, }
        ]

    }, {
        path: '/merchants',

        component: merchants,
        meta: { requiresAuth: true },
        children: [
            { path: '/', redirect: '/merchants/companySearch' },
            {
                path: 'companySearch',
                component: companySearch,
                children: [
                    { path: '', component: search },
                    { path: 'result', name: 'result', component: result },
                    {
                        path: 'merchantsDetail/:id',
                        component: merchantsDetail,
                        children: [
                            { path: '', name: 'merchBasic', component: merchBasic },
                            { path: 'merchBusiness', name: 'merchBusiness', component: merchBusiness },
                            { path: 'merchInformation', name: 'merchInformation', component: merchInformation },
                            { path: 'merchFloor', name: 'merchFloor', component: merchFloor },
                            { path: 'merchRelation', name: 'merchRelation', component: merchRelation },
                        ]
                    },
                ]
            },
          
            {path: 'intelligent',redirect:'intelligent/industryType'},     
            { path: 'intelligent/industryType', name: 'industryType', component: industryType },
            { path: 'intelligent/recommendCompanys', name: 'recommendCompanys', component: recommendCompanys },
            { path: 'wisdomMap', name: 'wisdomMap', component: wisdomMap },
            { path: 'focusCompany', name: 'focusCompany', component: focusCompany }

        ]

    }, {
        path: '/supervision',
        component: supervision,
        meta: { requiresAuth: true },
        children: [
            { path:'',redirect:'parkMap'},
            { path: 'parkMap', name: 'parkMap', component: parkMap },
            {
                path: 'parkCompanys',
                component: parkCompanys,
                children: [
                    { path: '', name: 'companys', component: companys },
                    {
                        path: 'companyDetail',
                        component: companyDetail,
                        children: [
                            { path: '', name: 'companyBasic', component: companyBasic },
                            { path: 'companyBusiness', name: 'companyBusiness', component: companyBusiness },
                            { path: 'companyInformation', name: 'companyInformation', component: companyInformation },
                            { path: 'companyFloor', name: 'companyFloor', component: companyFloor },
                            { path: 'companyRelation', name: 'companyRelation', component: companyRelation },
                        ]
                    },
                ]
            },
            { path: 'goodNews', name: 'goodNews', component: goodNews },
            { path: 'badNews', name: 'badNews', component: badNews },
            { path: 'outflow', name: 'outflow', component: outflow },
            { path: 'articleList/:id', name: 'articleList', component: articleList },
            {path: 'infoWarning',redirect: "infoWarning/infoChange"},
            { path: 'infoWarning/infoChange', name: 'infoChange', component: infoChange },
            { path: 'infoWarning/warningDetails/:id', name: 'warningDetails', component: warningDetails },

          

        ]
    }, {
        path: '/user',
        component: user,
         meta: { requiresAuth: true },
        children: [
            { path: '/', redirect: 'userCenter' },
            { path: 'userCenter', name: 'userCenter', component: userCenter },
            { path: 'modify', name: 'modify', component: modify },
            { path: 'down', redirect: 'down/collect' },
            { path: 'down/collect', name: 'collect', component: collect },
            { path: 'down/collectArticle/:id', name: 'collectArticle', component: collectArticle },
            { path: 'requires',component:requires,children:[
                   {path:'',redirect:'requireList'},
                   { path: 'requireList', name: 'requireList', component: requireList },
                   { path: 'myrequire', name: 'myrequire', component: myrequire },

                   
            ]},
            { path: 'requires/requireDetails/:id', name: 'requireDetails', component: requireDetails },
          

        ]
    },
]