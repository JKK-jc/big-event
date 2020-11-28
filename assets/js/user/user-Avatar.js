$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  //上传头像的点击事件
  $("#btnStr").on("click", function () {
    $("#file").click();
  });

  // 为文件绑定change事件
  $("#file").on("change", function (e) {
    // console.log(e);
    var file = e.target.files[0];
    // console.log(files);
    // 生成对象图片地址
    var imgURL = URL.createObjectURL(file);
    // console.log(imgURL);
    // 渲染裁剪区选择的图片
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  $("#btnRes").on("click", function () {
    var dataURL = $image
      // console.log(dataURL)
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      }).toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
      method: "post",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        //   console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("res.message");
        }
        layui.layer.msg("更新头像成功");
        window.parent.getUsername();
      },
    });
  });
});
