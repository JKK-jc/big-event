$(function () {
  getInitCate();
  //获取文章分类的数据
  function getInitCate() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        var htmlStr = template("tpl-tb", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  //为添加类别添加绑定点击事件
  var index = null;
  $("#btnAddCate").on("click", function () {
    index = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章类别",
      content: $("#tbl-add").html(),
    });
  });
  // 因为内容是模板引擎渲染出来的，所以监听事件要写在body上
  $("body").on("submit", "#formAdd", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        getInitCate();
        //添加成功后自动关闭弹出层
        layer.close(index);
      },
    });
  });

  // 修改文章数据
  var edIndex = null;
  $("tbody").on("click", ".btn-edit", function () {
    edIndex = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章类别",
      content: $("#tbl-edit").html(),
    });

    var id = $(this).data("id");
    //   console.log(id);
    $.ajax({
      type: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        //   console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.form.val("formEdit", res.data);
      },
    });
  });
//   渲染修改后的文章数据
  $("body").on("submit", "#formEdit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        getInitCate();
        layer.close(edIndex);
      },
    });
  });

        // 删除文章数据
  $("tbody").on("click", ".btn-del", function () {
    var id = $(this).data("id");
    // console.log(id);
    layer.confirm("确定删除？", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        type: "get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
            // console.log(res);
          if (res.status !== 0) {
            return layui.layer.msg(res.message);
          }
          layer.close(index);
          getInitCate();
        },
      });
    });
  });
});
