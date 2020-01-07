import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import {
  account
} from './modules/account'
import {
  news
} from './modules/news'
import {
  secondHand
} from './modules/secondHand'
import {
  comment
} from './modules/comment'
import {
  release
} from './modules/release'
import {
  activity
} from './modules/activity'
import {
  personal
} from './modules/personal'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nav: {
      news: {
        router: '/news',
        name: '校园资讯',
        actived: false,
      },
      secondHand: {
        router: '/secondhand',
        name: '二手交易',
        actived: false,
      },
      download: {
        router: '/download',
        name: '资料下载',
        actived: false
      },
      hobby: {
        router: '/hobby',
        name: '兴趣爱好',
        actived: false
      },
      study: {
        router: '/study',
        name: '学习天地',
        actived: false
      },
    },
    self: {
      index: {
        router: '/private/index',
        name: '个人主页',
        actived: false
      },
      info: {
        router: '/private/info',
        name: '编辑资料',
        actived: false
      },
    },
    leftNav: {
      myNews: {
        router: '/private/index/news',
        name: '我的校园资讯',
      },
      mySecondHand: {
        router: '/private/index/secondhand',
        name: "我的二手物品",
      },
      myView: {
        router: '/private/index/view',
        name: '我的浏览',
      },
      myFollow: {
        router: '/private/index/follow',
        name: '我的关注'
      },
      myFans: {
        router: '/private/index/fans',
        name: '我的粉丝'
      },
      myCollect: {
        router: '/private/index/collect',
        name: '我的收藏'
      },
      myLike: {
        router: '/private/index/like',
        name: '我的点赞'
      },
      myReport: {
        router: '/private/index/report',
        name: '我的举报'
      },
      // myMessage: {
      //   router: '/private/index/message',
      //   name: '我的消息'
      // }

    },
    leftNavRun: {
      runNews: {
        router: '/private/index/runNews',
        name: '管理所有校园资讯',
        type: 'admin'
      },
      runSecondHand: {
        router: '/private/index/runSecondhand',
        name: '管理所有二手物品',
        type: 'admin',
        split: true
      },
      runReport: {
        router: '/private/index/runReport',
        name: '管理所有举报',
        type: 'admin'
      },
      runFeedback: {
        router: '/private/index/runFeedback',
        name: '管理所有反馈',
        type: 'admin'
      },
    }
  },
  mutations,
  actions,
  modules: {
    account,
    news,
    secondHand,
    comment,
    activity,
    personal
  }
});