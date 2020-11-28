//每次发送ajax之前，都会先调用这个函数
$.ajaxPrefilter(function(option){
    // console.log(option);
    // 用根路径加上此时点击的页面的路径，就是完整的api接口
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // console.log(option.url);
    
    // 所有能用到headers数据的文件放在这个js文件里
    if(option.url.indexOf('/my') !== -1){
        // 如果api中带 /my字符就调用下面的数据
        option.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
        // 全局统一挂载 complete 回调函数
         option.complete = function(res){
             // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
             if(res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败！'){
                //  强制清楚 token
                localStorage.removeItem('token')
                // 强制跳转到登录页
                location.assign('/login.html')
             }
         }
    }
})