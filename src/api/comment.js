/*
 * @Author: 李国亮 
 * @Date: 2019-05-01 20:47:23 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-19 21:55:25
 */

//  用于处理comment相关API

import axios from 'axios'
import {
    successTip,
    errTip,
    warnTip
} from '../utils/js/tool';
import {imgHeader} from '../utils/js/config'

/**
 * 获取校园资讯的评论
 * @export
 * @param {*} data 
 */
export async function api_post_newsComment(data){
    try {
        const r = await axios.post(`/news/comment`,data)
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
 * 对某一条新闻发布一条评论
 * @export
 * @param {*} data 
 */
export async function api_post_releaseNewsComment(options){
    try {
        const r = await axios.post(`/news/releaseComment`,options)
        let {code,msg,data} = r.data
        if(code === 'success'){
            successTip(msg)
            return data
         }else if(code === 'fail'){
             warnTip(msg)
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 对某一条新闻回复一条评论
 * @export
 * @param {*} data 
 */
export async function api_post_replyNewsComment(options){
    try {
        const r = await axios.post('/news/replyComment',options)
        let {code,msg,data} = r.data
        if(code === 'success'){
            successTip(msg)
            return data
         }else if(code === 'fail'){
             warnTip(msg)
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
