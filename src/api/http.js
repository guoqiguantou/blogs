import axios from 'axios'
import qs from 'qs'
// import store from './../store'
// import router from '@/router'
import { Message } from 'iview'
axios.interceptors.request.use(config => {
  // if (store.state.token) {
  //   config.headers.Authorization = store.state.token
  // }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    const { flag, msg, code } = response.data
    if (flag && code === 0) {
      return response.data
    } else {
      Message.error({
        content: msg,
        duration: 1000
      });

    }
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res && res.response) {
    if (res.response.status === 404) {
      Message.error({
        content: '请求接口出错',
        duration: 1000
      });
    }
    if (res.response.status === 401) {
      Message.error({
        content: '权限出错',
        duration: 1000
      });
      setTimeout(() => {
        //router.push({ name: 'login' })
      }, 1200)
    }
    if (res.response.status > 500 || res.response.status === 500) {
      Message.error({
        content: '请稍后重试',
        duration: 1000
      });
      // Notify({
      //   message: '请稍后重试',
      //   duration: 1000,
      //   background: '#ff0000'
      // });
    }
  }
}

const baseurl = process.env.NODE_ENV === 'production'
  ? 'http://192.168.3.57:9096'
  : 'http://127.0.0.1:8888'

const http = (type, url, data) => {
  let extend;
  if (type === "get") {
    extend = {
      params: data,
    }
  } else {
    extend = {
      data: JSON.stringify(data),
    }
  }
  let config = {
    method: type,
    // baseURL: 'http://192.168.31.14:9096',
    baseURL: baseurl,
    url,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    // withCredentials: true
  }
  return axios({
    ...config, ...extend
  }).then(
    (response) => {
      return checkStatus(response)
    }
  ).catch(
    (res) => {
      return checkCode(res)
    }
  )
}
export default http
