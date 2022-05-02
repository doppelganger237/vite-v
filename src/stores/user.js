import {login} from '@/api/user'

import { defineStore } from 'pinia'

import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

export const useUserStore = defineStore('user',{
    state: () => {
        return{
            
            token: getToken(),
            name: ''
        }
    },
    actions: {

        SET_TOKEN: (token) => {
            this.token = token
        },
        SET_NAME: (name) => {
            this.name = name
        },

        async  login(userInfo) {
    
    
            const username = userInfo.username.trim()
            const password = userInfo.password
            //TODO 储存Token
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
    
        }
    }
})
