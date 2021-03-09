import axios from 'axios';
import config from '../config.json'
import store from '../store.js'
axios.defaults.timeout = 50000;
axios.defaults.baseURL = config[process.env].host;
//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json',
      'X-Request-Time': Date.now()
    }
    if (store.state.userToken != null){
      config.headers['X-Auth-Token'] = store.state.userToken
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if ("/client/user/login" === response.config.url && store.state.userToken == null){
      store.commit('initUserToken',response.headers['x-auth-token'])
    }
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    if (error.response) {
      let httpCode = error.response.status;
      switch (httpCode) {
        case 403:
        case 401:
          store.commit('removeUserToken')
          break;
      }
    }
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}, config={}){
  return new Promise((resolve,reject) => {
    config['params'] = params
    axios.get(url,config)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}
