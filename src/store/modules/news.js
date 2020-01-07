/*
 * @Author: 李国亮 
 * @Date: 2019-04-16 00:38:12 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-18 16:41:11
 */
import {
    imgHeader
} from '../../utils/js/config'
import {
    GET_NEWS_BANNER,
    GET_MOST_HOT_NEWS,
    GET_MOST_NEW_NEWS,
    GET_TA_NEWS_LIST,
    GET_MOST_NEWS_DETAIL,
    GET_FOLLOW_LIST,
    GET_LIKE_LIST,
    GET_MOST_HOT_TOPIC,
    SET_KEYWORD_SEARCH,
    SET_SHOW_MOST_HOT_NEWS
} from '../mutaion-type'
import {
    api_get_news_banner,
    api_get_getMostHotNews,
    api_post_getMostNewNews,
    api_get_getNewsDetail,
    api_get_followList,
    api_get_follow,
    api_get_likeList,
    api_get_like,
    api_get_collect,
    api_post_getHotTopic,
    api_post_searchNews,
    api_get_taNewsList
} from '../../api/news'
export const news = {
    namespaced: true,
    state: {
        // 校园资讯下的快速进入
        quickEnter: '',
        mostHotNews:[],
        mostNewNews:[],
        mostNewPage:{
            pageIndex:1,
            pageSize:6
        },
        havaNoData:false,
        newsDetail:'', //资讯详情
        followList:[],
        likeList:[],
        hotTopicList:'',
        searchNews:[],
        showMostHotNews:true,
        newsKeyword:'',
        taNewsList:[],
    },
    mutations: {
        [GET_NEWS_BANNER](state, params) {
            console.log('get news_banner',params);
            return state.quickEnter = params
        },
        [GET_MOST_HOT_NEWS](state, params) {
            console.log('get most hot news (3)',params);
            state.mostHotNews = params
        },
        [GET_MOST_NEW_NEWS](state, params) {
            console.log('get most new news (6)',params);
            state.mostNewNews.push(...params.data)
            if(!params.code) state.mostNewNews = []
            if(!params.data.length&&params.code)   //params.code 用来区分是否是通过关键字收搜来重置的
            state.havaNoData = true
            state.mostNewPage = params.page
        },
        [GET_MOST_NEWS_DETAIL](state, params) {
            console.log('get most news detail',params);
            state.newsDetail = params
        },
        [GET_FOLLOW_LIST](state, params) {
            console.log('get follow list',params);
            if(!params)return
            state.followList = params
        },
        [GET_LIKE_LIST](state, params) {
            console.log('get like list',params);
            if(!params)return
            state.likeList = params
        },
        [GET_MOST_HOT_TOPIC](state, params) {
            console.log('get most hot topic news',params);
            state.hotTopicList = params.data
        },
        [SET_SHOW_MOST_HOT_NEWS](state, params) {
            console.log('set most hot  news show',params);
            state.showMostHotNews = params
        },
        [SET_KEYWORD_SEARCH](state, params) {
            console.log('set most hot  news search keyword',params);
            state.newsKeyword = params
        },
        [GET_TA_NEWS_LIST](state, params) {
            console.log('get his news list',params);
            state.taNewsList = params
        },
    },
    actions: {
        async get_news_banner({
            commit,
            state
        }) {
            const r = await api_get_news_banner()
            commit(GET_NEWS_BANNER, r)
        },
        async get_getMostHotNews({
            commit,
            state
        },data){
            const r = await api_get_getMostHotNews(data)
            commit(GET_MOST_HOT_NEWS,r)
        },
        async post_getMostNewNews({
            commit,
            state
        },data){
            const r = await api_post_getMostNewNews(data)
            commit(GET_MOST_NEW_NEWS,r)
        },
        async post_searchNews({
            commit,
            state
        },data){
            const r = await api_post_searchNews(data)
            commit(GET_MOST_NEW_NEWS,r)
        },
        async get_taNewsList({
            commit,
            state
        },userId){
            const r = await api_get_taNewsList(userId)
            commit(GET_TA_NEWS_LIST,r)
        },
        async post_getHotTopic({
            commit,
            state
        },data){
            const r = await api_post_getHotTopic(data)
            commit(GET_MOST_HOT_TOPIC,r)
        },
        async get_getNewsDetail({
            commit,
            state
        },data){
            const r = await api_get_getNewsDetail(data.newsId)
            commit(GET_MOST_NEWS_DETAIL,r)
        },
        async get_followList({
            commit,
            state
        }){
            const r = await api_get_followList()
            commit(GET_FOLLOW_LIST,r)
        },
        async get_likeList({
            commit,
            state
        }){
            const r = await api_get_likeList()
            commit(GET_LIKE_LIST,r)
        },
        async get_follow({
            commit,
            state
        },userFollowed){
            const r = await api_get_follow(userFollowed)
            commit(GET_FOLLOW_LIST,r)
        },
        async get_like({
            commit,
            state
        },newsId){
            const r = await api_get_like(newsId)
            commit(GET_LIKE_LIST,r)
        },
        async get_collect({
            commit,
            state
        },newsId){
            const r = await api_get_collect(newsId)
            commit(GET_LIKE_LIST,r)
        }
    }
}