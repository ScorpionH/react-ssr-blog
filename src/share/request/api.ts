import Axios from 'axios';

//-- src/utils/cookie.js   这里使用的是mdn网站的cookie封装,附上链接
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework

//create方法会创建一个新的axios实例，并继承axios几乎所有属性,配置和方法
//建议使用 create 方法封装 api ，不对 axios 本身做特殊配置
const api = Axios.create({
    //传参是一个对象，配置包含baseUrl，timeout等等，既可以在这里传进去，也可以在实例化后设置配置

    //baseURL: process.env.NODE_ENV === "development" ? '//localhost:3000' : 'https://example.domain',
    // 设置通用url，使用请求的方法时，就可以省略这个url
    // 可以通过process.env.NODE_ENV判断是否开发环境，来决定是否使用代理url
    // 代理是用来解决跨域的。。

    headers: {
        //这个配置不用说了吧。默认携带请求头，
        //有的后台更喜欢让前端把session_id放在header里发送
    },

    transformRequest: [function (data, headers) {
        // 此处是格式化发请求时，需要发送的数据格式
        // 某些后台在处理数据时不识别默认的 payload
        // 此处用第三方模块qs 转换成 兼容较好的 form-data(x-www-form-urlencoded)
        // return qs.stringify(data);
    }],

    timeout: 10000,//超时，超出这时间，就会Promise.reject()，单位ms

    //withCredentials: true,
    // 允许浏览器端在发请求时，携带cookie一起发送，
    // 某些后台语言会把session_id放在cookie里返回给前端
    // 如果这时不允许发送cookie的话  那么后台会判断是另一个浏览器在登录操作。
    // 我都是在实例化后 配置这个属性 因为我偶尔出现在这里传参配置会无效。
    // 设置这个属性为true后 ，后台不可以把允许跨域设置为'*'，必须指定ip或域名
});


// api.interceptors.response.use((response) => {
//     console.log(response);
//     const { status, data } = response;
//     return response;
// })


//api.defaults.withCredentials = true;
// 允许发送cookie，根据自己的项目需求是否需要开启
// axios的更多配置可以看官方的文档 github的 readme.md
// https://github.com/axios/axios   

export default api
