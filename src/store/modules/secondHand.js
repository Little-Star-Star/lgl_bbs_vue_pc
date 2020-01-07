/*
 * @Author: 李国亮 
 * @Date: 2019-04-16 00:38:12 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-06-01 00:06:53
 */
import {
    GET_SECONDHAND_LIST,
    GET_SECONDHAND_DETAIL,
    SET_OPTIONS_MAX_PRICE,
    SET_OPTIONS_MIN_PRICE,
    SET_OPTIONS_PAGEINDEX,
    SET_OPTIONS_KEYWORD,
    GET_LIKE_SECONDHAND,
    GET_SECONDHAND_COMMENT_LIST
} from '../mutaion-type'
import {
    api_post_getSecondList,
    api_get_getSecondDetail,
    api_get_like,
    api_get_collect,
    api_get_secondHandCommentList,
    api_post_releaseSecondHandComment
} from '../../api/secondHand'
export const secondHand = {
    namespaced: true,
    state: {
        types: [{
            type: 'all',
            name: '全部',
            actived: true
        }, {
            type: 'electronic',
            name: '电子产品',
            actived: false
        }, {
            type: 'makeup',
            name: '美妆',
            actived: false
        }, {
            type: 'costume',
            name: '服饰',
            actived: false
        }, {
            type: 'book',
            name: '图书资料',
            actived: false
        }, {
            type: 'daily',
            name: '生活用品',
            actived: false
        }, {
            type: 'outdoor',
            name: '户外运动',
            actived: false
        }, {
            type: 'music',
            name: '玩具乐器',
            actived: false
        }, {
            type: 'tenement',
            name: '租房',
            actived: false
        }, {
            type: 'else',
            name: '其他',
            actived: false
        }],
        sort: [{
            type: 'statics.view',
            name: '浏览量',
            actived: true
        }, {
            type: 'createTime',
            name: '上架时间',
            actived: false
        }, {
            type: 'price',
            name: '价格',
            actived: false
        }],
        secondList: '',
        secondListTotal: 0,
        secondHandDetail: '',
        sortType: function () {
            for (let i of this.$store.state.secondHand.sort) {
                if (i.actived) return i.type
            }
        },
        type: function () {
            let type = []
            this.$store.state.secondHand.types.forEach(d=>{
                if(d.actived&&d.type!=='all')type.push(d.name)
            })
            return type
        },
        minPrice: 0,
        maxPrice: Infinity,
        pageIndex: 1,
        keyword: '',
        followList:[], //关注列表
        like:'', //个人和二手物品关联数据
        comments:[], //某一二手物品留言列表
    },
    mutations: {
        [SET_OPTIONS_MAX_PRICE](state, params) {
            state.maxPrice = params
        },
        [SET_OPTIONS_MIN_PRICE](state, params) {
            state.minPrice = params
        },
        [SET_OPTIONS_PAGEINDEX](state, params) {
            state.pageIndex = params
        },
        [SET_OPTIONS_KEYWORD](state, params) {
            state.keyword = params
        },
        [GET_SECONDHAND_LIST](state, params) {
            console.log('get secondHand\'s list', params);
            state.secondList = params.data
            state.secondListTotal = params.page.total
        },
        [GET_SECONDHAND_DETAIL](state, params) {
            console.log('get secondHand\'s detail', params);
            state.secondHandDetail = params
        },
        [GET_LIKE_SECONDHAND](state, params) {
            console.log('get like data between user and secondHand', params);
            return state.like = params
        },
        [GET_SECONDHAND_COMMENT_LIST](state,params){
            console.log('get secondhand\'s comment list',params)
            if(!params)return
            state.comments = params
            state.comments.sort((d1,d2)=>{return (+new Date(d2.time)) - (+new Date(d1.time))})
        }
    },
    actions: {
        async post_getSecondList({
            commit,
            state
        }, options) {
            const r = await api_post_getSecondList(options)
            commit(GET_SECONDHAND_LIST, r)
        },
        async get_getSecondDetail({
            commit,
            state
        }, itemId) {
            const r = await api_get_getSecondDetail(itemId)
            commit(GET_SECONDHAND_DETAIL, r)
        },
        async get_getLike({
            commit,
            state
        }, itemId) {
            const r = await api_get_like(itemId)
            commit(GET_LIKE_SECONDHAND, r)
        },
        async get_collect({
            commit,
            state
        }, itemId) {
            const r = await api_get_collect(itemId)
            commit(GET_LIKE_SECONDHAND, r)
        },
        async get_secondHandCommentList({
            commit,
            state
        }, itemId) {
            const r = await api_get_secondHandCommentList(itemId)
            commit(GET_SECONDHAND_COMMENT_LIST, r)
        },
        async post_releaseSecondHandComment({
            commit,
            state
        }, options) {
            const r = await api_post_releaseSecondHandComment(options)
            if(!r)return
            commit(GET_SECONDHAND_COMMENT_LIST, r)
        },
    }
}