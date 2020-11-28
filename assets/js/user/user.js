$(function(){
    layui.form.verify({
        nickname:function(value){
            if(value.length > 6) return '用户昵称必须在1-6个字符之间'
        }
        
    })

    initUserInfo()
    function initUserInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                // console.log(res);
                if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
                //layui.form.val 快速为表单赋值 
                layui.form.val('userInfoForm',res.data)
            }
        })
    }

    // 重置表单中的用户信息
    $('#btnCz').on('click',function(e){
        //阻止重置按钮的默认行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('用户信息更新失败')
                }
                layui.layer.msg('用户信息更新成功')
                window.parent.getUsername()
            }
        })
    })
})