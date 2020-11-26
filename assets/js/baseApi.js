//每次发送ajax之前，都会先调用这个函数
$.ajaxPrefilter(function(option){
    // console.log(option);
    // 用根路径加上此时点击的页面的路径，就是完整的api接口
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // console.log(option.url);
})