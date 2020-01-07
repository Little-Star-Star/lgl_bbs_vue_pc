/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 21:20:00 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-22 17:18:26
 */

//  用于处理个人发布相关API

import axios from 'axios'
import {
    successTip,
    errTip,
    warnTip
} from '../utils/js/tool';
import {imgHeader} from '../utils/js/config'

/**
 * 发布校园资讯
 * @export
 * @param {*} options
 */
export async function api_post_releaseNews(options) {
    try {
        const r = await axios.post("/private/release/news",options)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
         }else if(code === 'fail'){
             errTip(msg)
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 发布二手物品
 * @export
 * @param {*} options
 */
export async function api_post_releaseSecondHand(options) {
    try {
        const r = await axios.post("/private/release/secondhand",options)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
         }else if(code === 'fail'){
             errTip(msg)
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 发布校园活动
 * @export
 * @param {*} options
 */
export async function api_post_releaseActivity(options) {
    try {
        const r = await axios.post("/private/release/activity",options)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
         }else if(code === 'fail'){
             errTip(msg)
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}