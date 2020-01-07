/*
 * @Author: 李国亮 
 * @Date: 2019-04-16 00:38:12 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-20 01:39:12
 */
import {
    imgHeader
} from '../../utils/js/config'
import {
    SET_USER_INFO,
    LOGOUT
} from '../mutaion-type'
import {
    api_post_loginWithPassword,
    api_post_registerWithMail,
    api_post_findPasswordWithMail,
    api_post_updateUserInfo,
    api_post_updatePassword,
    api_post_updatebindedemail
} from '../../api/account'
import {clearAllCookie} from '@/utils/js/tool'
export const account = {
    namespaced: true,
    state: {
        user: ''
    },
    mutations: {
        [SET_USER_INFO](state, params) {
            console.log('get user info',params);
            localStorage.setItem('user',JSON.stringify(params))
            state.user = params
        },
        [LOGOUT](state){
            console.log('logout')
            clearAllCookie()
            localStorage.clear()
            return state.user = ''
        }
    },
    actions: {
        async post_loginWithPassword({
            commit,
            state
        },{
            password,account
        }) {
            const r = await api_post_loginWithPassword(password,account)
            commit(SET_USER_INFO, r)
        },
        async post_registerWithMail({
            commit,
            state
        },data) {
            const r = await api_post_registerWithMail(data)
            commit(SET_USER_INFO, r)
        },
        async post_findPasswordWithMail({
            commit,
            state
        },data) {
            const r = await api_post_findPasswordWithMail(data)
            commit(SET_USER_INFO, r)
        },
        async post_updateUserInfo({
            commit,
            state
        },data) {
            const r = await api_post_updateUserInfo(data)
            commit(SET_USER_INFO, r)
        },
        logout({commit}){
            commit(LOGOUT)
        },
        async post_updatePassword({
            commit,
            state
        },data){
            const r = await api_post_updatePassword(data)
        },
        async post_updatebindedemail({
            commit,
            state
        },data){
            const r = await api_post_updatebindedemail(data)
            commit(SET_USER_INFO,r)
        }
    }
}