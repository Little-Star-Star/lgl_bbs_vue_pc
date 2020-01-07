/*
 * @Author: 李国亮 
 * @Date: 2019-04-16 00:38:12 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-20 02:28:02
 */
import {
} from '../mutaion-type'
import {
   
} from '../../api/release'
export const release = {
    namespaced: true,
    state: {
        
    },
    mutations: {
     
    },
    actions: {
        async post_getSecondList({
            commit,
            state
        }, options) {
            const r = await api_post_getSecondList(options)
            commit(GET_SECONDHAND_LIST, r)
        },
    }
}