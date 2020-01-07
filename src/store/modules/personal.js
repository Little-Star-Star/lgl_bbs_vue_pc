/*
 * @Author: 李国亮 
 * @Date: 2019-04-16 00:38:12 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-06-01 00:43:28
 */
import {
    GET_PERSONAL_NEWS_LIST,
    GET_ADMIN_NEWS_LIST,
    GET_PERSONAL_SECONDHAND_LIST,
    GET_ADMIN_SECONDHAND_LIST,
    GET_PERSONAL_VIEW_LIST,
    GET_PERSONAL_FOLLOW_LIST,
    GET_PERSONAL_FAN_LIST,
    GET_PERSONAL_COLLECT_LIST,
    GET_ADMIN_REPORT_LIST,
    GET_ADMIN_FEEDBACK_LIST,
    CLEAR_PERSONAL_NEWS_LIST,
    CLEAR_ADMIN_NEWS_LIST,
    CLEAR_PERSONAL_SECONDHAND_LIST,
    CLEAR_ADMIN_SECONDHAND_LIST,
    CLEAR_PERSONAL_VIEW_LIST,
    CLEAR_PERSONAL_FOLLOW_LIST,
    CLEAR_PERSONAL_FAN_LIST,
    CLEAR_ADMIN_REPORT_LIST,
    CLEAR_ADMIN_FEEDBACK_LIST,
    ADD_NEWS_PAGEINDEX,
    ADD_ADMIN_NEWS_PAGEINDEX,
    ADD_SECONDHAND_PAGEINDEX,
    ADD_ADMIN_SECONDHAND_PAGEINDEX,
    ADD_VIEW_PAGEINDEX,
    ADD_FOLLOW_PAGEINDEX,
    ADD_FAN_PAGEINDEX,
    ADD_ADMIN_REPORT_PAGEINDEX,
    ADD_ADMIN_FEEDBACK_PAGEINDEX,
} from '../mutaion-type'
import {
    api_post_personalNewsList,
    api_post_adminNewsList,
    api_post_personalSecondHandList,
    api_post_personalViewList,
    api_post_personalFollowList,
    api_post_personalFanList,
    api_post_personalLikeList,
    api_post_adminSecondHandList,
    api_post_adminReportList,
    api_post_adminFeedbackList,
} from '../../api/personal'
export const personal = {
    namespaced: true,
    state: {
        newsPageIndex:1,
        adminNewsPageIndex:1,
        secondHandPageIndex:1,
        adminSecondHandPageIndex:1,
        viewPageIndex:1,
        followPageIndex:1,
        fanPageIndex:1,
        adminReportPageIndex:1,
        adminFeedbackPageIndex:1,
        newsTotal:0,
        adminNewsTotal:0,
        secondHandTotal:0,
        adminSecondHandTotal:0,
        viewTotal:0,
        followTotal:0,
        fanTotal:0,
        adminReportTotal:0,
        adminFeedbackTotal:0,
        personalNewsList: [],
        adminNewsList:[],
        personalSecondHandList: [],
        adminSecondHandList:[],
        personalViewList:[],
        personalFollowList:[],
        personalFanList:[],
        personalCollectList:[],
        personalLikeList:[],
        personalReportList:[],
        adminReportList:[],
        adminFeedbackList:[],
    },
    mutations: {
        [ADD_NEWS_PAGEINDEX](state,params=true){
            params ? state.newsPageIndex++ : state.newsPageIndex = 1
        },
        [ADD_ADMIN_NEWS_PAGEINDEX](state,params=true){
            state.adminNewsPageIndex =  params ? params : 1
        },
        [ADD_SECONDHAND_PAGEINDEX](state,params=true){
            params ? state.secondHandPageIndex++ : state.secondHandPageIndex = 1
        },
        [ADD_ADMIN_SECONDHAND_PAGEINDEX](state,params=true){
            state.adminSecondHandPageIndex =  params ? params : 1
        },
        [ADD_VIEW_PAGEINDEX](state,params=true){
            params ? state.viewPageIndex++ : state.viewPageIndex = 1
        },
        [ADD_FOLLOW_PAGEINDEX](state,params=true){
            params ? state.followPageIndex++ : state.followPageIndex = 1
        },
        [ADD_FAN_PAGEINDEX](state,params=true){
            params ? state.fanPageIndex++ : state.fanPageIndex = 1
        },
        [ADD_ADMIN_REPORT_PAGEINDEX](state,params=true){
            params ? state.adminReportPageIndex++ : state.adminReportPageIndex = 1
        },
        [ADD_ADMIN_FEEDBACK_PAGEINDEX](state,params=true){
            params ? state.adminFeedbackPageIndex++ : state.adminFeedbackPageIndex = 1
        },
        [CLEAR_PERSONAL_NEWS_LIST](state,params){
            state.personalNewsList = []
        },
        [CLEAR_ADMIN_NEWS_LIST](state,params){
            state.adminNewsList = []
        },
        [CLEAR_PERSONAL_SECONDHAND_LIST](state,params){
            state.personalSecondHandList = []
        },
        [CLEAR_ADMIN_SECONDHAND_LIST](state,params){
            state.adminSecondHandList = []
        },
        [CLEAR_PERSONAL_VIEW_LIST](state,params){
            state.personalViewList = []
        },
        [CLEAR_PERSONAL_FOLLOW_LIST](state,params){
            state.personalFollowList = []
        },
        [CLEAR_PERSONAL_FAN_LIST](state,params){
            state.personalFanList = []
        },
        [CLEAR_ADMIN_REPORT_LIST](state,params){
            state.adminReportList = []
        },
        [CLEAR_ADMIN_FEEDBACK_LIST](state,params){
            state.adminFeedbackList = []
        },
        [GET_PERSONAL_NEWS_LIST](state, params) {
            console.log('get personal news list:',params)
            if(params.data)
            state.personalNewsList.push(...params.data)
            if(params.page)
            state.newsTotal = params.page.total
        },
        [GET_ADMIN_NEWS_LIST](state, params) {
            console.log('get admin news list:',params)
            if(params.data)
            state.adminNewsList.push(...params.data)
            if(params.page)
            state.adminNewsTotal = params.page.total
        },
        [GET_PERSONAL_SECONDHAND_LIST](state, params) {
            console.log('get personal secondhand list:',params)
            if(!params)return
            if(params.data&&params.data.length)
            state.personalSecondHandList.push(...params.data)
            if(params.page)
            state.secondHandTotal = params.page.total
        },
        [GET_ADMIN_SECONDHAND_LIST](state, params) {
            console.log('get admin secondhand list:',params)
            if(params.data)
            state.adminSecondHandList.push(...params.data)
            if(params.page)
            state.adminSecondHandTotal = params.page.total
        },
        [GET_PERSONAL_VIEW_LIST](state, params) {
            console.log('get personal view list:',params)
            if(!params)return
            if(params.data&&params.data.length)
            state.personalViewList.push(...params.data)
            if(params.page)
            state.viewTotal = params.page.total
        },
        [GET_PERSONAL_FOLLOW_LIST](state, params) {
            console.log('get personal follow list:',params)
            if(!params)return
            if(params.data&&params.data.length)
            state.personalFollowList.push(...params.data)
            if(params.page)
            state.followTotal = params.page.total
        },
        [GET_PERSONAL_FAN_LIST](state, params) {
            console.log('get personal fan list:',params)
            if(!params)return
            if(params.data&&params.data.length)
            state.personalFanList.push(...params.data)
            if(params.page)
            state.fanTotal = params.page.total
        },
        [GET_PERSONAL_COLLECT_LIST](state, params) {
            console.log('get personal collect list:',params)
            if(!params)return
            state.personalCollectList = params.filter(d=>{return d.collect})
            state.personalLikeList = params.filter(d=>{return d.like})
            state.personalReportList = params.filter(d=>d.report)
            state.personalReportList.sort((d1,d2)=>{return +new Date(d2.report.time) - +new Date(d1.report.time)})
        },
        [GET_ADMIN_REPORT_LIST](state, params) {
            console.log('get admin report list:',params)
            if(!params)return
            if(params.data&&params.data.length)
            state.adminReportList.push(...params.data)
            if(params.page)
            state.adminReportTotal = params.page.total
        },
        [GET_ADMIN_FEEDBACK_LIST](state, params) {
            console.log('get admin feedback list:',params)
            if(!params)return
            if(params.data&&params.data.length)
            state.adminFeedbackList.push(...params.data)
            if(params.page)
            state.adminFeedbackTotal = params.page.total
        },
    },
    actions: {
        async post_personalNewsList({
            commit,
            state
        }, options) {
            const r = await api_post_personalNewsList(options)
            if(r)
            commit(GET_PERSONAL_NEWS_LIST, r)
        },
        async post_adminNewsList({
            commit,
            state
        }, options) {
            const r = await api_post_adminNewsList(options)
            if(r)
            commit(GET_ADMIN_NEWS_LIST, r)
        },
        async post_personalSecondHandList({
            commit,
            state
        }, options) {
            const r = await api_post_personalSecondHandList(options)
            commit(GET_PERSONAL_SECONDHAND_LIST, r)
        },
        async post_adminSecondHandList({
            commit,
            state
        }, options) {
            const r = await api_post_adminSecondHandList(options)
            if(r)
            commit(GET_ADMIN_SECONDHAND_LIST, r)
        },
        async post_personalViewList({
            commit,
            state
        }, options) {
            const r = await api_post_personalViewList(options)
            commit(GET_PERSONAL_VIEW_LIST, r)
        },
        async post_personalFollowList({
            commit,
            state
        }, options) {
            const r = await api_post_personalFollowList(options)
            commit(GET_PERSONAL_FOLLOW_LIST, r)
        },
        async post_personalFanList({
            commit,
            state
        }, options) {
            const r = await api_post_personalFanList(options)
            commit(GET_PERSONAL_FAN_LIST, r)
        },
        async post_adminReportList({
            commit,
            state
        }, options) {
            const r = await api_post_adminReportList(options)
            commit(GET_ADMIN_REPORT_LIST, r)
        },
        async post_personalLikeList({
            commit,
            state
        }, options) {
            const r = await api_post_personalLikeList(options)
            commit(GET_PERSONAL_COLLECT_LIST, r)
        },
        async post_adminFeedbackList({
            commit,
            state
        }, options) {
            const r = await api_post_adminFeedbackList(options)
            commit(GET_ADMIN_FEEDBACK_LIST, r)
        },
    }
}