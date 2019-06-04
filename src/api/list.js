import http from './http'

export const getList = (data) => {
    return http('post', '/purchaseRecord/listPurRecord', data)
}
export const getListTotalPur = (data) => {
    return http('post', '/purchaseRecord/listTotalPur', data)
}
