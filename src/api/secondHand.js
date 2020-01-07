/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 21:20:00 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-29 17:08:28
 */

//  用于处理account相关API

import axios from 'axios'
import {
    successTip,
    errTip,
    warnTip
} from '../utils/js/tool';
import {imgHeader} from '../utils/js/config'
export async function api_post_getSecondList(options) {
    try {
        const r = await axios.post("/secondHand/rest/list",options)
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
export async function api_get_getSecondDetail(itemId) {
    try {
        const r = await axios.get("/secondHand/rest/detail/"+itemId)
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
 * 收藏/取消收藏
 * @export
 * @param {*} secondhandId 
 * @returns
 */
export async function api_get_collect(secondhandId){
    try {
        const r = await axios.get("/user/collectSecondHand/"+secondhandId)
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
 * 获取个人和用户相关联数据
 * @export
 * @param {*} secondhandId 
 * @returns
 */
export async function api_get_like(secondhandId){
    try {
        const r = await axios.get("/user/likeSecondHand/"+secondhandId)
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
 * 获取二手物品的留言列表
 * @export
 * @param {*} secondhandId 
 * @returns
 */
export async function api_get_secondHandCommentList(secondhandId){
    try {
        const r = await axios.get("/secondHand/comment/list/"+secondhandId)
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
 * 对某一二手物品发布一条评论
 * @export
 * @param {*} data 
 */
export async function api_post_releaseSecondHandComment(options){
    try {
        const r = await axios.post('/secondHand/releaseComment',options)
        let {code,msg,data} = r.data
        if(code === 'success'){
            successTip(msg)
            return data
         }else if(code === 'fail'){
             warnTip(msg)
             console.log(msg)
             return 
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 修改二手物品
 *
 * @export
 * @param {*} data
 */
export async function api_post_modifySecondHand(data){
    try {
        const r = await axios.post('/private/secondhand/modify',data)
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
 * 删除二手物品
 *
 * @export
 * @param {*} secondhandId
 */
export async function api_get_deleteSecondHand(secondhandId){
    try {
        const r = await axios.get('/private/secondhand/delete/'+secondhandId)
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