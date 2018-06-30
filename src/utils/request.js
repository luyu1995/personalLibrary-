import axios from "axios";
import qs from "qs";
import merge from "lodash/merge"
import isEmpty from 'lodash/isEmpty'
import smilecampusApi from "../config/api";
import {cookieExpires} from "../config/config";

let fetch = async(options) =>
{
  let {
    method = 'get',
    data,
    url,
    headers,
    timeout
  } = options

  // url = url.replace(/https?:/,window.location.protocol);
  axios.defaults.withCredentials = true
  let instance = axios.create({
    timeout: timeout ? timeout : 10000
  });
  for (let key in  headers) {
    axios.defaults.headers.common[key] = headers[key];
  }
  switch (method.toLowerCase()) {

    case 'get':
      return await
      instance.get(`${url}${!isEmpty(data) ? `?${qs.stringify(data)}` : ''}`)
    case 'delete':
      return await
      instance.delete(url, {data})
    case 'head':
      return await
      instance.head(url, data)
    case 'post':
      if (data instanceof FormData) {
        return await
        instance.post(url, data)
      } else {
        return await
        instance.post(url, qs.stringify(data))
      }
    case 'put':
      return await
      instance.put(url, data)
    case 'patch':
      return await
      instance.patch(url, data)
    default:
      return await
      instance(options)
  }
}

let request = async(options) =>
{
  if (typeof window.bus !== 'undefined' && window.bus.$Loading) {
    window.bus.$Loading.start();
  }
  let access_token = getToken('access_token')
  if (access_token) {
    options['headers'] = merge(options['headers'], {"Access-Token": access_token});

  }
  let x_session_token = getToken('x-session-token')
  if (x_session_token) {
    options['headers'] = merge(options['headers'], {"x-session-token": x_session_token});
  }
  let result = null;
  try {
    let result = await
    fetch(options);

    const {statusText, status, data} = result
    if (typeof window.bus !== 'undefined' && window.bus.$Message) {
      if (data && data.code && data.code !== '00000') {
        window.bus.$Message.error(data.message);
      }
    }
    if (typeof window.bus !== 'undefined' && window.bus.$message) {
      if (data && data.code && data.code !== '00000') {
        window.bus.$message.error(data.message);
      }
    }
    if (typeof window.bus !== 'undefined' && window.bus.$vux) {
      if (data && data.code && data.code !== '00000') {
        window.bus.$vux.toast.show({
          text: data.message
        })
      }
    }
    if (typeof window.bus !== 'undefined' && window.bus.$Loading) {
      if (data && data.code && data.code !== '00000') {
        window.bus.$Loading.error();
      } else {
        window.bus.$Loading.finish();
      }
    }
    if (data.code === '10004' || data.code === '10005') {
      redirectToLogin()
    }
    return data
  } catch (error) {
    if (error && error.response && error.response.status === 401) {

      redirectToLogin()
    }
    if (typeof window.bus !== 'undefined' && window.bus && window.bus.$Loading) {
      window.bus.$Loading.error();
    }
    if (typeof window.bus !== 'undefined' && window.bus.$Message) {
      if (error.response && error.response.data && error.response.data.message) {
        window.bus.$Message.error(error.response.data.message);
      } else {
        window.bus.$Message.error('服务器访问异常,请检查网络');
      }
    }
    if (typeof window.bus !== 'undefined' && window.bus.$message) {
      if (error.response && error.response.data && error.response.data.message) {
        window.bus.$message.error(error.response.data.message);
      } else {
        window.bus.$message.error('服务器访问异常,请检查网络');
      }
    }
    if (typeof window.bus !== 'undefined' && window.bus.$vux) {
      if (error.response && error.response.data && error.response.data.message) {
        window.bus.$vux.toast.show({
          text: error.response.data.message
        })
      } else {
        window.bus.$vux.toast.show({
          text: '服务器访问异常,请检查网络'
        })
      }
    }
    return result;
  }
}
let saveToken = (token, tokenKey) =>
{
  window.bus.$cookie.set(tokenKey, token, cookieExpires)
}
let getToken = (tokenKey) =>
{
  return window.bus.$cookie.get(tokenKey)
}
let deleteToken = (tokenKey) =>
{
  window.bus.$cookie.delete(tokenKey)
}
let getUserInfo = async(key = null, api = null) =>
{
  if (!key) {
    key = 'userInfo'
  }
  let userInfo = null;
  if (window.nativePageListener && window.nativePageListener.getUserInfo) {
    userInfo = JSON.parse(window.nativePageListener.getUserInfo());
    if (userInfo.access_token) {
      saveToken(userInfo.access_token, 'access_token')
    }

  } else if (window.smilecampus_config.userTest) {
    if (window.smilecampus_config.userTest.access_token) {
      saveToken(window.smilecampus_config.userTest.access_token, 'access_token')
    }
    // userInfo = window.smilecampus_config.userTest;
  } else {
    userInfo = window.sessionStorage.getItem(key);
    if (userInfo) {
      userInfo = JSON.parse(decodeCookie(userInfo));
    }
  }
  if (!getToken('access_token')) {
    return false
  }
  if (!userInfo) {
    let res = await
    request({
      url: api ? api : smilecampusApi.api.userApi.userInfo,
      method: 'post',
    });
    if (res.result) {
      userInfo = res.result;
      userInfo.uid = userInfo.id;
      userInfo.access_token = getToken('access_token')
    } else {
      return false;
    }
    window.sessionStorage.setItem(key, encodeCookie(JSON.stringify(userInfo)));
  }
  return userInfo;
}

function encodeCookie(raw) {
  let result = btoa(encodeURIComponent(raw))
  return result;
}

function decodeCookie(cookie) {
  let result = decodeURIComponent(atob(cookie))
  return result
}

function getRootWindow(win) {
  if (win.parent !== win) {
    win = getRootWindow(win.parent)
  }
  return win
}

function redirectToLogin() {
  if (window.bus && window.bus.$cookie) {
    deleteToken('access_token')
  }
  window.sessionStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('currentPage')
  let win = getRootWindow(window);
  win.location.replace(window.smilecampus_config.modules.sc_home.url);
}

export {
  getUserInfo,
  request,
  getRootWindow,
  redirectToLogin,
  getToken,
  saveToken,
  deleteToken,
  encodeCookie,
  decodeCookie
}




