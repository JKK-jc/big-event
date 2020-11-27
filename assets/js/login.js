$(function () {
  // 点击去注册页面，切换到注册页面
  $("#link_reg").on("click", function () {
    $(".reg-box").show();
    $(".login-box").hide();
  });
  // 点击去登录页面，切换到登录页面
  $('#link_login').on('click', function () {
    $(".login-box").show();
    $(".reg-box").hide();
  })

  layui.form.verify({
    uname: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符，且不能小于6大于18个字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
    },

    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //验证两次密码不一样
    repwd: function (value) {
      var pwd = $('.reg-box [name = password]').val()
        if(value !== pwd){
        return '两次密码输入不一致'
    }
  }
  })
  // 监听注册表单的提交事件
  $('#from-vey').on('submit',function(e){
    // 阻止默认行为
    e.preventDefault()

    $.ajax({
      type:'post',
      url:'/api/reguser',
      data:{
        // 获取form表单里面的数据
        username:$('#from-vey [name = username]').val(),
        password:$('#from-vey [name = password]').val()
      },
      success:function(res){
        if(res.status !== 0) return layui.layer.msg(res.message); 
        layui.layer.msg(res.message); 
        // 注册成功后自动点击去登陆链接
        $('#link_login').click()
        // 注册完后清除输入框
        $('#from-vey [name = username]').val(''),
        $('#from-vey [name = password]').val('')
      }
    })
  })


  // 监听登录表单的提交事件
  $('#from-login').on('submit',function(e){
    // 阻止默认行为
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/api/login',
      // 获取当前form表单里的全部表单数据
      data:$(this).serialize(),
      success:function(res){
        // console.log(res.token);
        if(res.status !== 0){
          return layui.layer.msg(res.message);
        } 
        layui.layer.msg('登陆成功');
        // 将返回的token值储存在本地
        localStorage.setItem('token',res.token)
        // 登录成功后跳转到首页
        location.href = 'index.html'
      }
    })
  })


});
