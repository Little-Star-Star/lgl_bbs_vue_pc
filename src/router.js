import Vue from "vue";
import Router from "vue-router";

// 兴趣爱好
import Hobby from '@/views/Hobby.vue'
// 学习天地
import Study from '@/views/Study.vue'
// 资料下载
import Download from '@/views/Download.vue'

// 账户相关-登录、注册
import AccountView from "@/views/account/Account_view.vue"
import Login from "@/views/account/Login.vue"
import Register from "@/views/account/Register.vue"
import FindPassword from "@/views/account/FindPassword.vue"

// 主页，暂时还不知道做什么
import Home from "@/views/home/home.vue"

// 校园资讯
import News from '@/views/News.vue'
import NewsDetail from '@/views/news/NewsDetail.vue'

// 二手物品
import SecondHand from '@/views/SecondHand.vue'
import ItemDetail from '@/views/secondHand/ItemDetail.vue'

// 个人设置
import Person from '@/views/Person.vue'
import BaseInfo from '@/views/person/BaseInfo.vue'
import SecuritySet from '@/views/person/SecuritySet.vue'
import ModifyPassword from '@/views/person/ModifyPassword.vue'
import ModifyEmailStepOne from '@/views/person/ModifyEmailStep1.vue'
import ModifyEmailStepTwo from '@/views/person/ModifyEmailStep2.vue'

// 校园活动
import Activity from '@/views/Activity.vue'

// 个人主页
const Index = ()=>import('@/views/Index.vue')
import MyNews from '@/views/index/News.vue'
import RunNews from '@/views/index/RunNews.vue'
import RunSecondHand from '@/views/index/RunSecondHand.vue'
import RunReport from '@/views/index/RunReport.vue'
import RunFeedback from '@/views/index/RunFeedback.vue'
import ModifyNews from '@/views/index/ModifyNews.vue'
import MySecondHand from '@/views/index/SecondHand.vue'
import ModifySecondHand from '@/views/index/ModifySecondHand.vue'
import MyView from '@/views/index/View.vue'
import MyFollow from '@/views/index/Follow.vue'
import MyFans from '@/views/index/Fans.vue'
import MyCollect from '@/views/index/Collect.vue'
import MyReport from '@/views/index/Report.vue'
import MyLike from '@/views/index/Like.vue'
import MyMessage from '@/views/index/Message.vue'

// 发布
import Release from '@/views/Release.vue'
import ReleaseNews from '@/views/release/ReleaseNews.vue'
import ReleaseSecondHand from '@/views/release/ReleaseSecondHand.vue'
import ReleaseActivity from '@/views/release/ReleaseActivity.vue'


import store from "./store";
import {
  warnTip
} from "./utils/js/tool";

Vue.use(Router);

const routerConfig = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      component: Home
    }, {
      path: "/home",
      name: "home",
      component: News
    },{
      path: "/hobby",
      name: "hobby",
      component: Hobby
    }, {
      path: "/study",
      name: "study",
      component: Study
    },{
      path: "/download",
      name: "download",
      component: Download
    }, {
      path: "/account",
      component: AccountView,
      children: [{
        path: '',
        name: 'account_default',
        component: Login,
      }, {
        path: 'login',
        name: 'account_login',
        component: Login
      }, {
        path: 'register',
        name: 'account_register',
        component: Register
      }, {
        path: 'forgetPassword',
        name: 'account_forget_password',
        component: FindPassword
      }]
    }, {
      path: '/news',
      name: 'news',
      component: News
    }, {
      path: '/secondhand',
      name: 'secondhand',
      component: SecondHand
    }, {
      path: '/secondhand/detail/:itemId',
      name: 'item_detail',
      component: ItemDetail,
      props: true
    }, {
      path: '/news/detail/:newsId',
      name: 'news_detail',
      component: NewsDetail,
      props: true
    }, {
      path: '/activity/:activityId',
      name: 'activity',
      component: Activity,
      props: true
    }, {
      path: '/private/info',
      component: Person,
      children: [{
        path: '',
        name: 'person_home',
        component: BaseInfo
      }, {
        path: 'baseInfo',
        name: 'person_base_info',
        component: BaseInfo
      }, {
        path: 'securitySet',
        name: 'person_security_set',
        component: SecuritySet
      }, {
        path: 'modifyPassword',
        name: 'person_modify_password',
        component: ModifyPassword
      }, {
        path: 'modifyEmailStepOne',
        name: 'person_modify_email_step_one',
        component: ModifyEmailStepOne
      }, {
        path: 'modifyEmailStepTwo',
        name: 'person_modify_email_step_two',
        component: ModifyEmailStepTwo
      }]
    }, {
      path: '/private/index',
      component: Index,
      children: [{
        path: '',
        name: 'index_my_main',
        component: MyNews
      }, {
        path: 'news',
        name: 'index_my_news',
        component: MyNews
      }, {
        path: 'runNews',
        name: 'index_run_news',
        component: RunNews
      }, {
        path: 'runSecondhand',
        name: 'index_run_secondhand',
        component: RunSecondHand
      }, {
        path: 'runReport',
        name: 'index_run_report',
        component: RunReport
      }, {
        path: 'runFeedback',
        name: 'index_run_feedback',
        component: RunFeedback
      },{
        path: 'secondhand',
        name: 'index_my_secondhand',
        component: MySecondHand
      }, {
        path: 'view',
        name: 'index_my_view',
        component: MyView
      }, {
        path: 'follow',
        name: 'index_my_follow',
        component: MyFollow
      }, {
        path: 'fans',
        name: 'index_my_fans',
        component: MyFans
      }, {
        path: 'collect',
        name: 'index_my_collect',
        component: MyCollect
      }, {
        path: 'report',
        name: 'index_my_report',
        component: MyReport
      }, {
        path: 'like',
        name: 'index_my_like',
        component: MyLike
      }, {
        path: 'message',
        name: 'index_my_message',
        component: MyMessage
      }]
    },
    {
      path:'/private/modifyNews/:newsId',
      name:'modify_news',
      component:ModifyNews,
      props:true
    },
    {
      path:'/private/modifySecondHand/:secondHandId',
      name:'modify_secondhand',
      component:ModifySecondHand,
      props:true
    },
    {
      path: '/release',
      component: Release,
      children: [{
        path: 'news',
        name: 'release_news',
        component: ReleaseNews
      }, {
        path: 'secondHand',
        name: 'release_secondHand',
        component: ReleaseSecondHand
      }, {
        path: 'activity',
        name: 'release_activity',
        component: ReleaseActivity
      }]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
routerConfig.beforeEach((to, from, next) => {
  // if(to.path.includes('private')&&!store.state.account.user){
  //   warnTip('请先登录...')
  //   next('/account/login')  
  // }
  next()
})
export default routerConfig