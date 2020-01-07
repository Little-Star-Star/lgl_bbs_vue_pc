/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 21:20:00 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-29 02:53:31
 */

//  用于处理account相关API

import axios from 'axios'
import {
    successTip,
    errTip,
    warnTip
} from '../utils/js/tool';
import {imgHeader} from '../utils/js/config'
// 获取活动-最新活动-活动需要审核,才能进行发布,需要后台管理员确定那些活动定为轮播图首页
export async function api_get_news_banner() {
    // const r = axios.get('/get/fjdlsfj')
    const r = [{
        cover: imgHeader + 'activity/activity1.png',
        title: '活动1',
        router:'/activity/1'
    }, {
        cover: imgHeader + 'activity/activity2.jpg',
        title: '活动2',
        router:'/activity/2'
    }, {
        cover: imgHeader + 'activity/activity3.jpg',
        title: '活动3',
        router:'/activity/3'
    }, {
        cover: imgHeader + 'activity/activity4.jpg',
        title: '活动4',
        router:'/activity/4'
    }, {
        cover: imgHeader + 'activity/activity5.jpg',
        title: '活动5',
        router:'/activity/5'
    }, {
        cover: imgHeader + 'activity/activity6.jpg',
        title: '活动6',
        router:'/activity/6'
    }, ]
    return r
}

/**
 * 获取最热门的3条校园资讯
 * @export
 * @param {*} data 
 */
export async function api_get_getMostHotNews(){
    try {
        const r = await axios.get("/news/rest/mostHot")
        let {code,msg,data} = r.data
        if(code === 'success'){
            return data
         }else if(code === 'fail'){
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取最新的6条校园资讯
 * @export
 * @param {*} data 
 */
export async function api_post_getMostNewNews(data){
    try {
        const r = await axios.post("/news/rest/mostNew",data)
        let {code,msg} = r.data
        if(code === 'success'){
            return r.data
         }else if(code === 'fail'){
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 收搜News
 * @export
 * @param {*} data 
 */
export async function api_post_searchNews(data){
    try {
        const r = await axios.post("/news/rest/searchNews",data)
        let {code,msg} = r.data
        if(code === 'success'){
            return r.data
         }else if(code === 'fail'){
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 获取某一作者的所有资讯
 * @export
 * @param {*} data 
 */
export async function api_get_taNewsList(userId){
    try {
        const r = await axios.get("/news/rest/taNewsList/"+userId)
        let {code,msg,data} = r.data
        if(code === 'success'){
            return data
         }else if(code === 'fail'){
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 获取最新热门的10条校园资讯
 * @export
 * @param {*} data 
 */
export async function api_post_getHotTopic(data){
    try {
        const r = await axios.post("/news/rest/mostHotTopic",data)
        let {code,msg} = r.data
        if(code === 'success'){
            return r.data
         }else if(code === 'fail'){
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取资讯详情资料
 * @export
 * @param {*} newsId 
 */
export async function api_get_getNewsDetail(newsId){
    try {
        const r = await axios.get("/news/rest/detail/"+newsId)
        let {code,msg,data} = r.data
        if(code === 'success'){
            return data
        }else if(code === 'fail'){
            console.log(msg)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取关注列表
 * @export
 */
export async function api_get_followList(){
    try {
        const r = await axios.get("/user/followList")
        let {code,msg,data} = r.data
        if(code === 'success'){
            return data
         }else if(code === 'fail'){
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 获取点赞列表
 * @export
 */
export async function api_get_likeList(){
    try {
        const r = await axios.get("/user/likeList")
        let {code,msg,data} = r.data
        if(code === 'success'){
            return data
         }else if(code === 'fail'){
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 点赞/取消点赞
 * @export
 * @param {*} newsId 
 * @returns
 */
export async function api_get_like(newsId){
    try {
        const r = await axios.get("/user/like/"+newsId)
        let {code,msg,data} = r.data
        if(code === 'success'){
            successTip(msg)
            return data
         }else if(code === 'fail'){
             console.log(msg)
             warnTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 收藏/取消收藏
 * @export
 * @param {*} newsId 
 * @returns
 */
export async function api_get_collect(newsId){
    try {
        const r = await axios.get("/user/collect/"+newsId)
        let {code,msg,data} = r.data
        if(code === 'success'){
            successTip(msg)
            return data
         }else if(code === 'fail'){
             console.log(msg)
             warnTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}


/**
 * 关注/取消关注
 * @export
 * @param {*} userFollowed 被关注用户
 * @returns
 */
export async function api_get_follow(userFollowed){
    try {
        const r = await axios.get("/user/follow/"+userFollowed)
        let {code,msg,data} = r.data
        if(code === 'success'){
            successTip(msg)
            return data
         }else if(code === 'fail'){
             console.log(msg)
             warnTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 反馈
 * @export
 * @returns
 */
export async function api_post_feedback(data){
    try {
        const r = await axios.post("/news/feedback",data)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
         }else if(code === 'fail'){
             warnTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 举报
 * @export
 * @returns
 */
export async function api_post_report(data){
    try {
        const r = await axios.post("/news/report",data)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
         }else if(code === 'fail'){
             warnTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 修改校园资讯
 *
 * @export
 * @param {*} data
 */
export async function api_post_modifyNews(data){
    try {
        const r = await axios.post('/private/news/modify',data)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
        }else if(code === 'fail'){
            warnTip(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 删除校园资讯
 *
 * @export
 * @param {*} newsId
 */
export async function api_get_deleteNews(newsId){
    try {
        const r = await axios.get('/private/news/delete/'+newsId)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
        }else if(code === 'fail'){
            warnTip(msg)
        }
    } catch (error) {
        console.log(error)
    }
}