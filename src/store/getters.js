const getters = {
    uuid:state => state.user.uuid,
    userInfo:state =>  state.user.userInfo,

    info:state =>  state.user.info,
    JID:state =>  state.user.JID,
    TU_ENV:state =>  state.user.TU_ENV,
    ssoUrl:state =>  state.user.ssoUrl,
}
export default getters
