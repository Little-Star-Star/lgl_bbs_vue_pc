/*
 * @Author: 李国亮 
 * @Date: 2019-04-16 00:38:12 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-06-01 00:44:26
 */
import {
    imgHeader
} from '../../utils/js/config'
import {
    GET_NEWS_COMMENT,
    ADD_NEWS_COMMENT,
    ADD_NEWS_REPLY,
    ADD_NEWS_COMMENT_PAGEINDEX,
    CLEAR_NEWS_COMMENT
} from '../mutaion-type'
import {
    api_post_newsComment,
    api_post_releaseNewsComment,
    api_post_replyNewsComment
} from '../../api/comment'
export const comment = {
    namespaced: true,
    state: {
        newsComment: [],
        newsCommentPageIndex:1,
        newsCommentTotal:0
    },
    mutations: {
        [CLEAR_NEWS_COMMENT](state,params){
            state.newsComment = []
        },
        [ADD_NEWS_COMMENT_PAGEINDEX](state,params=true){
            params ? state.newsCommentPageIndex++ : state.newsCommentPageIndex = 1
        },
        [GET_NEWS_COMMENT](state, params) {
            console.log('get news comment', params);
            let addComments = params.data.map((d) => {
                d.showChildReply = false
                d.replyActived = false
                d.replyData = d.replyData.map(d => {
                    d.replyActived = false
                    return d
                })
                return d
            })
            state.newsComment.push(...addComments)
            if(params&&params.page)
            state.newsCommentTotal = params.page.total
        },
        [ADD_NEWS_COMMENT](state, params) {
            console.log('add news release comment', params);
            params.showChildReply = false
            params.replyActived = false
            params.replyData = params.replyData.map(d => {
                d.replyActived = false
                return d
            })
            state.newsComment.unshift(params)
        },
        [ADD_NEWS_REPLY](state, params) {
            console.log('add news reply comment', params);
            state.newsComment = state.newsComment.map(d=>{
                if(d._id === params.newsCommentId){
                    console.log('find update:',d)
                    d.replyData = params.r.replyData.map(d=>{
                        d.replyActived = false
                        return d
                    })
                }
                return d
            })
        },
    },
    actions: {
        async post_newsComment({
            commit,
            state
        }, options) {
            const r = await api_post_newsComment(options)
            commit(GET_NEWS_COMMENT, r)
        },
        async post_releaseNewsComment({
            commit,
            state,
            rootState            
        }, options) {
            const r = await api_post_releaseNewsComment(options)
            // 更新评论条数
            if(!r)return
            rootState.news.newsDetail.statics.comment++ 
            commit(ADD_NEWS_COMMENT, r)
        },
        async post_replyNewsComment({
            commit,
            state,
            rootState            
        }, options) {
            try {
                const r = await api_post_replyNewsComment(options)
                // 更新评论条数
                rootState.news.newsDetail.statics.comment++ 
                commit(ADD_NEWS_REPLY, {r,newsCommentId:options.newsCommentId})
            } catch (error) {
            }
        },
    }
}