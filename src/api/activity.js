/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 21:20:00 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-23 16:40:34
 */

//  活动

import axios from 'axios'
import {
    successTip,
    errTip,
    warnTip
} from '../utils/js/tool';
import {imgHeader} from '../utils/js/config'

/**
 * 获取活动列表
 * @export
 */
export async function api_get_activityList(activityId) {
    try {
        const r = await axios.get("/activity/list")
        let {code,msg,data} = r.data
        if(code === 'success'){
            return data
         }else if(code === 'fail'){
             errTip(msg)
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取活动详情
 * @export
 * @param {*} activityId
 */
export async function api_get_activity(activityId) {
    try {
        const r = await axios.get("/activity/detail/"+activityId)
        let {code,msg,data} = r.data
        if(code === 'success'){
            return data
         }else if(code === 'fail'){
             errTip(msg)
             console.log(msg)
         }
    } catch (error) {
        console.log(error)
    }
}