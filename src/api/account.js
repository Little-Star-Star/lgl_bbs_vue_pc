/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 21:20:00 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-01 09:35:32
 */

//  用于处理account相关API

import axios from 'axios'
import { successTip, errTip,warnTip, encode,onlyNotice } from '../utils/js/tool';

/**
 * *使用密码登录
 *密码使用aes256加密,key:账号的sha256散列前32位，iv:后32位
 * @export
 * @param {*} account 账号
 * @param {*} password 密码
 */
export async function api_post_loginWithPassword(password,account) {
    try {
        password = encode(password,account)
        const r = await axios.post('/account/rest/loginWithPassword', {
            password,
            account
        },{
            // withCredentials:true
        })
        let {code,msg,data:user} = r.data
        if(code === 'success'){
            successTip(msg)
            return user
        }else if(code === 'fail'){
            errTip(msg)
        }
    } catch (error) {
        errTip('请求失败')
    }
}
/**
 *  发送邮箱验证码
 * @export
 * @param {*} mail 接收验证码的邮箱
 */
export async function api_post_send_mail_code(mail){
    try {
        const r = await axios.post('/account/rest/sendMailCode',{
            account:mail
        })
        
        let {code,msg} = r.data
        if(code === 'success'){
           // 邮箱验证码发送成功提醒
          onlyNotice('验证码已经发送到你的邮箱','注意：验证码可能被拦截，在邮件垃圾箱里') 
        }else if(code === 'fail'){
            errTip(msg)
        }
    } catch (error) {
        console.log(error)        
    }
}
/**
 * 使用邮箱进行注册
 * @export
 * @param {*} data 
 */
export async function api_post_registerWithMail(data){
    try {
        const r = await axios.post("/account/rest/register",data)
        let {code,msg,data:user} = r.data
        if(code === 'success'){
            successTip(msg)
            return user
         }else if(code === 'fail'){
             errTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 使用邮箱找回密码
 * @export
 * @param {*} data 
 */
export async function api_post_findPasswordWithMail(data){
    try {
        const r = await axios.post("/account/rest/forgetPassword",data)
        let {code,msg,data:user} = r.data
        if(code === 'success'){
            successTip(msg)
            return user
         }else if(code === 'fail'){
             errTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}
/**
 *检查某一账号是否已经存在
 *
 * @export
 * @param {*} account
 * @param {*} showExisted 显示用户已存在提示
 */
export async function api_get_account_existed(account,showExisted = true){
    try {
        const r = await axios.get('/rest/account/existed/'+account)
        let {code,msg}  = r.data
        if(code === 'fail'&&showExisted){
            warnTip(msg)
            return true
        }else if(code === 'success'&&!showExisted){
            warnTip(msg)
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 使用邮箱找回密码
 * @export
 * @param {*} data 
 */
export async function api_post_updateUserInfo(data){
    try {
        const r = await axios.post('/account/private/rest/updateUserInfo',data)
        let {code,msg,data:user} = r.data
        if(code === 'success'){
            successTip(msg)
            console.log('update user:',user)
            return user
         }else if(code === 'fail'){
             errTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 修改密码
 * @export
 * @param {*} data 
 */
export async function api_post_updatePassword(data){
    try {
        const r = await axios.post('/account/private/rest/updatePassword',data)
        let {code,msg} = r.data
        if(code === 'success'){
            successTip(msg)
         }else if(code === 'fail'){
             errTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 修改已绑定邮箱
 * @export
 * @param {*} data 
 */
export async function api_post_updatebindedemail(data){
    try {
        const r = await axios.post('/account/private/rest/updateBindedAccount',data)
        let {code,msg,data:user} = r.data
        if(code === 'success'){
            successTip(msg)
            return user
         }else if(code === 'fail'){
             errTip(msg)
         }
    } catch (error) {
        console.log(error)
    }
}