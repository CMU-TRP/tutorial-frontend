import apiClient from '@/services/AxiosClient.js'
import oauthapi from '@/services/OAuthAxios.js'
// import getUser from '@/services/GetUserService.js'
import GStore from '@/store'
export default {
    login(user) {
        return apiClient
            .post('/auth', {
                username: user.username,
                password: user.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                GStore.currentUser = response.data.user
                return Promise.resolve(response.data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    },
    // loginoauth(user) {
    //     return apiClient
    //         .post('/getToken', {
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    //                 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    //                 Accept: '*/*',
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             data: {
    //                 code: user,
    //                 redirect_uri: "http:/localhost:8081/redirect",
    //                 client_id: "7a2tEVznj823QypVnrBJHbRu7dnfdbrmTmwesF8K",
    //                 client_secret: "VWH0pZsVd2VSFWd6wHwBGthhURkCcjCTt20YD0fh",
    //                 grant_type: "authorization_code"
    //             }
    //         })
    //         .then((response) => {
    //             localStorage.setItem('token', response.data.access_token)
    //             GStore.currentUser = this.getUserFromApi(response.data.access_token)
    //             return Promise.resolve(response.data)
    //         })
    //         .catch((error) => {
    //             return Promise.reject(error)
    //         })
    // },
    loginoauth(code) {
        return oauthapi.get('/getToken?code=' + code)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.access_token)
                this.getUserFromApi(response.data.access_token)
                setTimeout(() => {
                        // After 3 seconds remove it
                        location.replace('http://localhost:8081/')
                    }, 1500)
                    // if (localStorage.getItem('user')) {
                    //     location.replace('http://localhost:8081/')
                    // }
            })
    },
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        GStore.currentUser = null
    },
    getUser() {
        return localStorage.getItem('user')
    },
    getUserFromApi(token) {
        return oauthapi.get('/getCredentials?token=' + token, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data.firstname_EN)
                localStorage.setItem('user', res.data.firstname_EN + ' ' + res.data.lastname_EN)
                GStore.currentUser = res.data.firstname_EN
            })
    },
    hasRoles(roles) {
        if (GStore.currentUser && roles) {
            let containRoles = GStore.currentUser.authorities.filter((authority) =>
                roles.includes(authority)
            )
            if (containRoles.length > 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}