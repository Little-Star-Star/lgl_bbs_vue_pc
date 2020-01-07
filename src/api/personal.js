/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 21:20:00 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-31 15:27:22
 */

//  个人校园资讯

import axios from 'axios'
import {
    successTip,
    errTip,
    warnTip
} from '../utils/js/tool';
import {
    imgHeader
} from '../utils/js/config'

/**
 * 获取个人校园资讯
 * @export
 */
export async function api_post_personalNewsList(options) {
    try {
        const r = await axios.post("/private/news/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 获取所有校园资讯
 * @export
 */
export async function api_post_adminNewsList(options) {
    try {
        const r = await axios.post("/private/admin/news/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 获取个人二手物品列表
 * @export
 */
export async function api_post_personalSecondHandList(options) {
    try {
        const r = await axios.post("/private/secondhand/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            console.log(r)
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 获取所有二手物品
 * @export
 */
export async function api_post_adminSecondHandList(options) {
    try {
        const r = await axios.post("/private/admin/secondhand/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 获取个人浏览列表
 * @export
 */
export async function api_post_personalViewList(options) {
    try {
        const r = await axios.post("/private/view/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            console.log(r)
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 删除所有个人浏览记录
 * @export
 */
export async function api_get_deletePersonalViewList() {
    try {
        const r = await axios.get("/private/view/delete")
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            successTip(msg)
        } else if (code === 'fail') {
            errTip(msg)
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
export async function api_post_personalFollowList(options) {
    try {
        const r = await axios.post("/private/followTa/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            // successTip(msg)
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取粉丝列表
 * @export
 */
export async function api_post_personalFanList(options) {
    try {
        const r = await axios.post("/private/followMe/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            // successTip(msg)
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取收藏（校园资讯+二手物品）列表
 * @export
 */
export async function api_post_personalLikeList(options) {
    try {
        const r = await axios.post("/private/allCollect/list", options)
        let {
            code,
            msg,
            data
        } = r.data
        if (code === 'success') {
            // successTip(msg)
            return data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取所有举报信息
 * @export
 */
export async function api_post_adminReportList(options) {
    try {
        const r = await axios.post("/private/admin/report/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取所有反馈信息
 * @export
 */
export async function api_post_adminFeedbackList(options) {
    try {
        const r = await axios.post("/private/admin/feedback/list", options)
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            return r.data
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 删除所有反馈信息
 * @export
 */
export async function api_get_deleteAdminFeedbackList() {
    try {
        const r = await axios.get("/private/admin/feedback/delete")
        let {
            code,
            msg
        } = r.data
        if (code === 'success') {
            successTip(msg)
        } else if (code === 'fail') {
            errTip(msg)
            console.log(msg)
        }
    } catch (error) {
        console.log(error)
    }
}
