import http from './http'

export const getCategory = () => {
    return http('get', '/category')
}

export const getBloglist = (data) => {
    return http('post', '/bloglist', data)
}

export const getBlogContent = (data) => {
    return http('get', '/blogcontent', data)
}

export const getBlogdel = (data) => {
    return http('post', '/blogdel', data)
}
export const blogadd = (data) => {
    return http('post', '/blogadd', data)
}

