/*
 * @Author: 李国亮 
 * @Date: 2019-04-16 00:38:12 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-23 16:44:28
 */
import {
    GET_ACTIVITY_LIST,
    GET_ACTIVITY_DETAIL,
} from '../mutaion-type'
import {
    api_get_activityList,
    api_get_activity,
} from '../../api/activity'
export const activity = {
    namespaced: true,
    state: {
        activityList:'',
        activityDetail:''
    },
    mutations: {
     [GET_ACTIVITY_DETAIL](state,params){
         console.log('get activity\'s detail:',params)
        state.activityDetail = params
     },
     [GET_ACTIVITY_LIST](state,params){
        console.log('get activity\'s list:',params)
       state.activityList = params
    }
    },
    actions: {
        async get_activityList({
            commit,
            state
        }) {
            const r = await api_get_activityList()
            commit(GET_ACTIVITY_LIST, r)
        },
        async get_activity({
            commit,
            state
        }, activityId) {
            const r = await api_get_activity(activityId)
            commit(GET_ACTIVITY_DETAIL, r)
        },
    }
}