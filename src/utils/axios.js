import axios from 'axios';
// import KHbase from '@/kanghe.config';
import MD5 from 'md5';
const axiosIns = axios.create({});

var KHbase = {};
KHbase.url = process.env.VUE_APP_BASE_API;
// KHbase.url = 'https://testserver.kanghehealth.com/'; // 测试
// if (process.env.BUILD_ENV === 'development') {
//   KHbase.url = 'https://testserver.kanghehealth.com/'; // 测试
// } else if (process.env.BUILD_ENV === 'production') {
//   KHbase.url = 'https://manager.kanghehealth.com/'; // 正式
// } else if (process.env.BUILD_ENV === 'test') {
//   KHbase.url = 'https://testserver.kanghehealth.com/'; // 测试
// }

axiosIns.defaults.baseURL = KHbase.url;
axiosIns.defaults.timeout = 10000;

axiosIns.interceptors.request.use(function (config) {
  // console.log('config', config);
  let timestamp = new Date().getTime();
  let salt = 'kanghehealth8888';
  let params = config.params || '';
  let postBody = config.data || '';
  let { url } = config;
  let urlQuery = url.split('?')[1] || '';
  let key = '';
  // console.log(options);
  if (params) { // !params传进来
    params = params && typeof params === 'string' ? params : JSON.stringify(params);
    params = params.replace(/[^a-zA-Z0-9{}]/g, '');
    params = params.replace(/\{|\}/g, '');
  } else { // !urlQuery传进来
    params = urlQuery.replace(/[^a-zA-Z0-9{}]/g, '');
  }
  // console.log(postBody, 'postBody');
  if (postBody) {
    postBody = postBody && typeof postBody === 'string' ? postBody : JSON.stringify(postBody);
    postBody = postBody.replace(/[^a-zA-Z0-9{}]/g, '');
  }
  key = params + postBody;
  // console.log('原始参数', key);
  let sign = MD5(key + timestamp + salt);
  // console.log('签名校验', sign)
  let token = sessionStorage.getItem('user');
  if (token) {
    config.headers['X-Authorization'] = JSON.parse(token).jwtToken;
  } else {
    config.headers['X-Authorization'] = 'no login';
  }
  config.headers['X-APP-ID'] = '2';
  config.headers['X-APP-VER'] = '1.0.0';
  config.headers['timestamp'] = timestamp;
  config.headers['sign'] = sign;
  // if(config.method  === 'POST' || config.method  === 'PUT'){
  //     config.data = qs.stringify(config.data);
  // }else{
  //     config.params = config.data;
  // }
  // console.log(config)
  if (config.method.toLocaleUpperCase() === 'GET' || config.method.toLocaleUpperCase() === 'DELETE') {
    config.params = { ...config.params, ...config.data };
    delete config.data;
  }
  // console.log('config end', config);
  return config;
}, function (err) {
  return Promise.reject(err);
});

axiosIns.interceptors.response.use(function (response) {
  return new Promise((resolve, reject) => {
    // 处理服务端返回的状态码
    if (response.status === 200) {
      const responseBody = response.data;
      if (responseBody.success) {

      } else {
        let code = responseBody.code;
        if (code == '401') {
          sessionStorage.removeItem('user');
          localStorage.removeItem('user');
        }
      }
      resolve(responseBody);
    } else {
      reject(responseBody);
    }
  });
}, function (err) {
  return Promise.reject(err);
});

export default axiosIns;
