$(function(){
// 调用 getUsername() 函数获取用户信息
    getUsername()

    // 退出当前账号
    $('#btnOut').on('click',function(){
        layui.layer.confirm('是否退出当前账号？', {icon: 3, title:'提示'}, function(index){
            //do something
            
            //清楚token 跳转到登录页面
            localStorage.removeItem('token')
            // location.href = 'login.html'
            location.assign('login.html')

            layer.close(index);
          });
    })

});

//获取用户信息封装的函数
function getUsername(){
    $.ajax({
        type: 'get',
        url:'/my/userinfo',
        //headers为请求头的数据，此数据在本地 token里面读取
        // headers:{
            // 为了服务器的渲染效果，用到此数据的文件，可以直接调用 basesapi 的 js 文件 
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0 ) return layui.layer.msg('获取用户信息失败')

            // 调用获取用户信息成功后的渲染函数
             reAvatar(res.data)
        }
    })
};

function  reAvatar(userInfo) {
    // 渲染用户名
    var name = userInfo.nickname || userInfo.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if(userInfo.user_pic == null){
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(name[0].toUpperCase())
    } else{
        $('.layui-nav-img').show().prop('src',userInfo.user_pic)
        $('.text-avatar').hide()
    }
}

