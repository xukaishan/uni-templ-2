import {
	getUserInfo,
	setUserInfo,
	setToken,
	setrefreshToken,
	clearUserInfo
} from './../../utils/auth'
import {
	userLogin
} from "@/common/user";
import { getAppId, authlogin, loadUserInfo } from '@/common/api.js';

export default {
	namespaced: true,
	state: {
		info: getUserInfo(),
        JID: (() => uni.getStorageSync('JID'))(),
        TU_ENV: (() => JSON.parse(uni.getStorageSync('TU_ENV') || '{}'))(),
        ssoUrl: (() => uni.getStorageSync('ssoUrl'))(),
	},
	mutations: {
		setUserInfo(state, info) {
			state.info = info;
			setUserInfo(info)
		},
        setApiAuthInfo(state, { JID = '', TU_ENV = null, ssoUrl = '' } = {}) {
            state.JID = JID;
            state.TU_ENV = TU_ENV;
            
            uni.setStorageSync('JID', JID)
            uni.setStorageSync('TU_ENV', TU_ENV && JSON.stringify(TU_ENV) || null)
            if (ssoUrl) {
                state.ssoUrl = ssoUrl;
                uni.setStorageSync('ssoUrl', ssoUrl)
            }
        }

	},
	actions: {
        loadUserInfo ({ commit }, payload) {
            return new Promise((resolve, reject) => {
                loadUserInfo({ code: payload.code, cnf: payload.cnf }).then(res => {
                    if (res && res.status) {
                        const { JID, TU_ENV } = res.data;
                        commit('setApiAuthInfo', { JID, TU_ENV, ssoUrl: res.ssoUrl })
                        resolve({ JID, TU_ENV, ssoUrl: res.ssoUrl })
                    } else {
                        reject()
                        uni.showToast({
                            title: res.message || '登录失败！',
                            icon: "none"
                        })
                    }
                })
            })
        },
        apiAuth ({ commit }) {
            if (!window.h5sdk) {
                console.log('invalid h5sdk')
                uni.redirectTo({
                    url: `pages/custom/Tips`,
                });
                return Promise.reject()
            }

            return new Promise((resolve, reject) => {
                window.h5sdk.ready(async () => {
                    console.log("window.h5sdk.ready, href", window.location.href);
                    getAppId().then(r => {
                        if (r && r.status) {
                            tt.requestAuthCode({
                                appId: r.obj,
                                success (res) {
                                    console.log("getAuthCode succeed", res.code);
                                    authlogin({ code: res.code, type: 'feishu' }).then(res => {
                                        if (res && res.status) {
                                            const { JID, TU_ENV } = res.obj;
                                            commit('setApiAuthInfo', { JID, TU_ENV })
                                            resolve({ JID, TU_ENV })
                                        } else {
                                            reject()
                                            uni.showToast({
                                                title: res.data || '登录失败！',
                                                icon: "none"
                                            })
                                        }
                                    })
                                },
                                fail (err) {
                                    console.log(`getAuthCode failed, err:`, JSON.stringify(err));
                                    reject(err)

                                    uni.showToast({
                                        title: '获取权限失败！',
                                        icon: "none"
                                    })
                                }
                            })
                        }
                    })
                })
            })
        },
		login({
			commit
		}, $pages) {

			try {
				//获取并设置本地token
				userLogin($pages).then(res => {
					console.log(res, '登录接口返回')
					setToken(res.data.token);
					setrefreshToken(res.data.token)
					commit('setUserInfo', res.data.userInfo)
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/tabBar/home/index",
						});
					})
				}).catch(err => {})

				return

				// 获取或存储用户信息
				let res = getUserInfomation()
				commit('setUserInfo', res.data.result)
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/index/index",
					});
				})
			} catch (e) {}
		},

		logout({	commit}) {
			clearUserInfo();
			commit('setUserInfo', {})
			uni.navigateTo({
			    url: '/pages/login/login'
			});
		},
		async loginInfo({
			commit
		}) {
			console.log("自动登录")
			// 获取或存储用户信息
			let res = await getUserInfomation()
			console.log(res)
			commit('setUserInfo', res.data.result)

			setTimeout(() => {
				uni.reLaunch({
					url: "/pages/index/index",
				});
				// $pages.$store.dispatch('returns')
			}, 1000)
		},
	}
}
