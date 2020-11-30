$(function(){

    getArtPub()
    initEditor()

    function  getArtPub() {
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                // console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg('获取分类数据失败')
                }
                var htmlStr = template('tpl-pub',res)
                $('[name = cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

$('#btn-fm').on('click',function(){
    $('#coverFile').click()
})

$('#coverFile').on('change',function(e){
   var files = e.target.files
   if(files.length === 0){
       return
   }
   var newImgURL = URL.createObjectURL(files[0])
   $image
   .cropper('destroy') // 销毁旧的裁剪区域
   .attr('src', newImgURL) // 重新设置图片路径
   .cropper(options) // 重新初始化裁剪区域
})

  var  state = '已发布'

  $('#btnSave2').on('click',function(){
       state = '草稿'
  })
  $('.layui-form').on('submit',function(e){
      e.preventDefault()
      var fd = new FormData(this)
      fd.append('state',state)
       // 4. 将封面裁剪过后的图片，输出为一个文件对象
  $image
  .cropper('getCroppedCanvas', {
    // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {
    // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    // 5. 将文件对象，存储到 fd 中
    fd.append('cover_img', blob)
    artAdd(fd)
  })
 
  })
  function artAdd(fd){
    $.ajax({
        type:'post',
        url:'/my/article/add',
        data:fd,
        contentType:false,
        processData:false,
        success:function(res){
            // console.log(res);
            if(res.status !== 0){
                return layui.layer.msg('发布文章失败')
            }
            layui.layer.msg('发布文章成功')
            location.href = '/artCle/artCle-list.html'
        }
    })
}
})