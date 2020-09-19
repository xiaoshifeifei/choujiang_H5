import request from '@/utils/request'
const user = {
    getInfo(params) {
        return request({
            url: `/zlActivity/findRemarks/${params.id}`,
            method: 'get',
            params
        })
    },
    getFindLotteryById(params) {
        return request({
            url: '/lottery/findLotteryById/ysfPayHtml',
            method: 'get'
        })
    },
    getWinning(params) {
        return request({
            url: '/lottery/getLotterys',
            method: 'get',
            params
        })
    },
    getGoLottery(params) {
        return request({
            url: '/lottery/goLottery/ysfPayHtml',
            method: 'get'
        })
    },
    getUpdateAdd(params) {
        return request({
            url: '/lottery/updateAddress',
            method: 'put',
            data: params
        })
    },
    getCode(params) {
        return request({
            url: '/register/verify',
            method: 'post',
            data: params
        })
    },
    getCodeZg(params) {
        return request({
            url: '/zlActivity/changeIsDowloadYsf',
            method: 'post',
            data: params
        })
    },

    signUp(params) {
        return request({
            url: '/zlActivity/joinActivity',
            method: 'post',
            data: params
        })
    },

    newSignUp(params) {
        return request({
            url: '/register',
            method: 'post',
            data: params
        })
    },
    down(params) {
        return request({
            url: `/appVersion/findAppLatestVersion/${params.versionNoType}`,
            method: 'get',
            params
        })
    },
    goToPay(params) {
        return request({
            url: '/zlActivity/getPayAddress',
            method: 'get',
            params
        })
    },
    gozlActivity(params) {
        return request({
            url: '/zlActivity/getPayAddress',
            method: 'get',
            params
        })
    },
    goOtherJoin(params) {
        return request({
            url: '/zlActivity/otherJoin',
            method: 'get',
            params
        })
    },
    getCjData(params) {
        return request({
            url: '/zlActivity/findActivitesLuck',
            method: 'get',
            params
        })
    },
    getUrl(params) {
        return request({
            url: '/zlActivity/getIntermeYsfLink',
            method: 'get',
            params
        })
    },
    // 统计报表管理APP总数据
    getInfoDataCount(params) {
        return request({
            url: `/api/dataCount/totalData`,
            method: 'post',
            data: params
        })
    },
    // 统计报表管理APP数据列表
    getDataDetail(params) {
        return request({
            url: `/api/dataCount/dataDetail`,
            method: 'post',
            data: params
        })
    },
    // 统计报表管理APP新增团长
    getFindTeam(params) {
        return request({
            url: '/api/dataCount/findTeamDetail',
            method: 'get',
            params
        })
    },
}
export default user