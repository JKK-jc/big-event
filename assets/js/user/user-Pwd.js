$(function(){
   
    layui.form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        somePwd:function(value){
            if(value === $('[name = oldPwd]').val()){
                return '新旧密码一致，请重新输入'
            }
        },
        resPwd:function(value){
            if(value !== $('[name = newPwd]').val()){
                return '两次密码输入不一致'
            }
            layui.layer.msg('登录失效')
            location.href = '/login.html'
        }
    })

   $('.layui-form').on('submit',function(e){
       e.preventDefault()
       $.ajax({
           type:'post',
           url:'/my/updatepwd',
           data:$(this).serialize(),
           success:function(res){
              if(res.status !== 0) return layui.layer.msg(res.message)
              layui.layer.msg(res.message)
              $('.layui-form')[0].reset()
           }
       })
   })
})