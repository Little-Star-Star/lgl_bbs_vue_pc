/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 21:25:44 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-17 17:51:05
 */
import CryptoJS from 'crypto-js'
import SHA256 from 'crypto-js/sha256'
import dayjs from "dayjs";

/**
 * 错误提示
 * @export
 * @param {*} msg 错误信息
 */
export function errTip(msg) {
    let el = document.createElement('div')
    el.innerHTML = `<div class="notice error">${msg}</div>`
    document.body.append(el)
    setTimeout(()=>{
        document.body.removeChild(el)
    },3000)
}
/**
 * 成功提示
 * @export
 * @param {*} msg 成功信息
 */
export function successTip(msg) {
    let el = document.createElement('div')
    el.innerHTML = `<div class="notice success">${msg}</div>`
    document.body.append(el)
    setTimeout(()=>{
        document.body.removeChild(el)
    },3000)
}

/**
 * 警告提示
 * @export
 * @param {*} msg 成功信息
 */
export function warnTip(msg) {
    let el = document.createElement('div')
    el.innerHTML = `<div class="notice warning">${msg}</div>`
    document.body.append(el)
    setTimeout(()=>{
        document.body.removeChild(el)
    },3000)
}
/**
 * 覆盖整个屏幕的提示框，点击四周，以及，右上角x，以及确定，均可关闭
 * @export
 * @param {*} title1 
 * @param {*} title2
 */
export function onlyNotice(title1,title2){
    let el = document.createElement('div')
    el.className = 'only-notice'
    el.innerHTML = `
    <div class="wrapper">
        <div class="only-notice-close"><img class="only-notice-close-img" src="http://localhost:3000/img/close.png"/></div>
        <div class="title-1">${title1}</div>
        <div class="title-2">${title2}</div>
        <div class="only-notice-confirm">知道啦</div>
    </div>
    `
    document.body.append(el)
    function closeIt(e){
        e.stopPropagation();
        if(['only-notice','only-notice-close','only-notice-confirm','only-notice-close-img'].includes(e.target.className)){
            el.remove()
        }
        console.log(e.target.className);
    }
    try {
        document.querySelector('.only-notice').addEventListener('click',closeIt,false)
        document.querySelector('.only-notice .close').addEventListener('click',closeIt,false)
        document.querySelector('.only-notice .confirm').addEventListener('click',closeIt,false)
    } catch (error) {
        
    }
}

// export function report

/**
 * 加密-密码请以AES128/CBC/PKCS5Padding模式加密,key=账号SHA256前32位,iv=账号SHA256后32位.
 * @export
 * @param {*} password
 * @param {*} account
 * @returns
 */
export function encode(password, account) {
    const key = SHA256(account).toString().slice(0, 32)
    const iv = SHA256(account).toString().slice(32, 64)
    return CryptoJS.AES.encrypt(password, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
}
/**
 * 判断手机号码
 * @export
 * @param {*} account
 * @returns
 */
export function isPhone(account) {
    return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(account)
}
/**
 *判断是否是邮箱
 *
 * @export
 * @param {*} account
 * @returns
 */
export function isMail(account) {
    return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(account)
}
/**
 *判断是否是合法用户
 *
 * @export
 * @param {*} account
 * @returns
 */
export function isPhoneOrMail(account) {
    return isPhone(account) || isMail(account)
}
/**
 *
 *判断是否是6位数字验证码
 * @export
 * @param {*} captcha
 * @returns
 */
export function isCaptcha(captcha) {
    return /^[0-9]{6}$/.test(captcha)
}
/**
 *清除所有cookie
 * @export
 */
export function clearAllCookie () {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      let eqPos = cookie.indexOf('=')
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    }
    if (cookies.length > 0) {
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i]
        let eqPos = cookie.indexOf('=')
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        let domain = location.host.substr(location.host.indexOf('.'))
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + domain
      }
    }
  }
  
  /**
 * 生成uuid "49e802d8-d74b-4cc1-ea38-2e19546c7929"
 * @returns
 */
export function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	});
	return uuid;
};

export function formatTime(T){
    let time = +new Date(T),now = +new Date(),m = 1000 * 60, h = m *60, d = h * 24,cha = now - time
    if(cha < m * 60){
        return Math.floor(cha / m) + '分钟前'
    } else if(cha < h * 24){
        return Math.floor(cha / h) + '小时前'
    } else if(cha < d * 30){
        return Math.floor(cha / d) + '天前'
    } else{
        return dayjs(time).format("YYYY-MM-DD")
    }
}

export function formatTime01(T){
    return dayjs(T).format("YYYY-MM-DD HH:mm:ss")
}

