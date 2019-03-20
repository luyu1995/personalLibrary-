/*封装请求，用于拦截错误码等等*/
import JsonP from 'jsonp'
export default class Axios {
    /*options接收的是一个对象*/
        static Jsonp(options){
            return new Promise((resolve,reject)=>{
                JsonP(options.url,{
                    params:'callback'
                },function (err,response) {
                //    to-do
                    if(response.status === 'success'){
                        resolve(response)
                    }else{
                        reject("接口请求失败")
                    }
                })
            })
        }
}