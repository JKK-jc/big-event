$(function () {
  var q = {
    pagenum: "1",
    pagesize: "2",
    cate_id: "",
    state: "",
  };
  //美化时间过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);
    var y = padZero(dt.getFullYear());
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());

    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());

    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };
  //   补零
  function padZero(n) {
    return n > 9 ? n : "0" + n;
  }

  getArtList(q);
  getArtSx();
  // 获取文章列表
  function getArtList(q) {
    $.ajax({
      type: "get",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("获取文章列表失败");
        }
        var htmlStr = template("tpl-art", res);
        $("tbody").html(htmlStr);
        renderPage(res.total);
      },
    });
  }

  //获取文章分类
  function getArtSx() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取文章分类失败");
        }
        var htmlStr = template("tpl-artSx", res);
        $("[name = cate_id]").html(htmlStr);
        layui.form.render();
      },
    });
  }

  //筛选功能
  $("#form-Sx").on("submit", function (e) {
    e.preventDefault();
    q.cate_id = $("[name =  cate_id]").val();
    q.state = $("[name = state]").val();

    getArtList(q);
  });

  // 分页器的功能
  function renderPage(total) {
    layui.laypage.render({
      elem: "art-Fy", //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的分页
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if (!first) {
          getArtList(q);
        }
      },
    });
  }

    // 编辑文章按钮
  $('tbody').on('click','.btn-edit',function(){
    location.href = '/artCle/artCle-pub.html'
  })

// 删除文章
$('tbody').on('click','.btn-del',function(){
    var id = $(this).data('id')
    var ten = $('.btn-del').length
    // console.log(ten);
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            type:"get",
            url:'/my/article/delete/' + id,
            success:function(res){
                if(res.status !== 0 ){
                    return layui.layer.msg('删除文章失败')
                }
                layui.layer.msg('删除文章成功')
                if(ten === 1){
                    q.pagenum = q.pagenum === 1? 1 : q.pagenum - 1
                }
                getArtList(q)
            }
        })
        
        layer.close(index);
      });
   
})
});
