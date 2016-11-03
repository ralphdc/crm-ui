

var setting = {
    td_width :150
}



//折叠菜单；
function togglePanel(obj,menuType)
{
    if($(obj).next("ul").is(":visible"))
    {
        //可见=>不可见
        $(obj).next("ul").slideUp();
        if(menuType == 'h4')
        {
            $(obj).find("span").removeClass('glyphicon-minus').addClass('glyphicon-plus');
        }else{
            $(obj).find("span").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    }else{
        //不可见=>可见
         $(obj).next("ul").slideDown();
         //$(obj).next("ul").find("h5").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
         $(obj).parent().siblings("li").find("ul").slideUp();
        if(menuType == 'h4')
        {
            $(obj).find("span").removeClass('glyphicon-plus').addClass('glyphicon-minus');
            $(obj).parent().siblings("li").find("h4").find("span").removeClass('glyphicon-minus').addClass('glyphicon-plus');
            $(obj).next("ul").find("h5").find("span").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }else{
            $(obj).find("span").removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            $(obj).parent().siblings("li").find("h5").find("span").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }

       
       
    }
}

/** bootstrap-dialog 居中对齐解决方案 2016-11-02 */
function setModalMaxHeight(element) {
  this.$element     = $(element);  
  this.$content     = this.$element.find('.modal-content');
  var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
  var dialogMargin  = $(window).width() < 768 ? 20 : 60;
  var contentHeight = $(window).height() - (dialogMargin + borderWidth);
  var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
  var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
  var maxHeight     = contentHeight - (headerHeight + footerHeight);

  this.$content.css({
      'overflow': 'hidden'
  });
  
  this.$element
    .find('.modal-body').css({
      'max-height': maxHeight,
      'overflow-y': 'auto'
  });
}

$('.modal').on('show.bs.modal', function() {
  $(this).show();
  setModalMaxHeight(this);
});

$(window).resize(function() {
  if ($('.modal.in').length != 0) {
    setModalMaxHeight($('.modal.in'));
  }
});

$(function(){
    //初始化页面对齐；
    winHeight   = $(window).height();
    topHeight   = $("#topnav").height();
    midHeight   = $("#middelnav").height();
    var midNavPadTop = parseInt($("#middelnav").css("padding-top"));
    var midNavPadBottom = parseInt($("#middelnav").css("padding-bottom"));
    wantHeight  = winHeight - topHeight - midHeight;
    var rightContentHeight = wantHeight - midNavPadTop - midNavPadBottom - 15;
    //alert(rightContentHeight);
    $("#xgd-content-left").height(rightContentHeight).css({"overflow-y":"auto"});
    $("#xgd-content-right").height(rightContentHeight);
    $("#xgd-content-right").css({"overflow":"auto"});
    if( $.isArray(xgd_menu)  && xgd_menu.length > 0)
    {
      /*
        //展开菜单；
       $("#xgd-content-left").children(":first").children().eq(xgd_menu[0]).find("ul").eq(0).slideDown();
       if(xgd_menu[1])
       {
          $("#xgd-content-left").children(":first").children().eq(xgd_menu[0]).find("ul").eq(0).children().eq(xgd_menu[1]).find("ul").slideDown();
          // 更改样式；
          $("#xgd-content-left").children(":first").children().eq(xgd_menu[0]).find("ul").eq(0).children().eq(xgd_menu[1]).find("h5").find("span").removeClass("glyphicon-chevron-up").addClass('glyphicon-chevron-down');
          
       }
       if(xgd_menu[2])
       {
          $("#xgd-content-left").children(":first").children().eq(xgd_menu[0]).find("ul").eq(0).children().eq(xgd_menu[1]).find("ul").children().eq(xgd_menu[2]).addClass('xgd-menu-cursor');
       }

       */
       $(".f_menu_box").eq(xgd_menu[0]).find(".secondPanel").first().slideDown();
       $(".f_menu_box").eq(xgd_menu[0]).find("h4").find("span").removeClass('glyphicon-plus').addClass('glyphicon-minus');
       if(xgd_menu.length == 2){
        $(".f_menu_box").eq(xgd_menu[0]).find(".secondPanel").find("ul.thirdPanel").eq(xgd_menu[1]).slideDown();
        $(".f_menu_box").eq(xgd_menu[0]).find(".secondPanel").find("span").eq(xgd_menu[1]).removeClass("glyphicon-chevron-up").addClass('glyphicon-chevron-down');

       }else if(xgd_menu.length == 3){
        $(".f_menu_box").eq(xgd_menu[0]).find(".secondPanel").find("ul.thirdPanel").eq(xgd_menu[1]).slideDown();
        $(".f_menu_box").eq(xgd_menu[0]).find(".secondPanel").find("span").eq(xgd_menu[1]).removeClass("glyphicon-chevron-up").addClass('glyphicon-chevron-down');
        $(".f_menu_box").eq(xgd_menu[0]).find(".secondPanel").find("ul.thirdPanel").eq(xgd_menu[1]).children("li").eq(xgd_menu[2]).addClass('xgd-menu-cursor');
       }
      
       
    }
  
    if($("#tableBox").length > 0)
    {
      var td_number = $("#tableBox").find("table").find("tr").eq(0).children().length;
      var divBoxLength = setting.td_width * td_number;
      $("#tableBox").width(divBoxLength);
      $("#tableBox td").width(setting.td_width);
      $("#tableBox tr").each(function(){
         $(this).children("td:first").attr("style","width:80px;");   
      })
    }


    //supply.html 补全撤机信息;
    if(($("#brForm").length > 0)  && ($("#tableBox").length > 0))
    {
      var lg = parseFloat($("#brForm").attr("wdlength"));
      if(lg > 0)
      {
        var tableBoxWidth = $("#tableBox").width();
        $("#brForm").width(tableBoxWidth * lg);
       // $("#brForm").find("label").css({"padding-left":"5px","background":"#FF0000"})
      }
    }

    $(".clientDetail").bind("click",function(){
       BootstrapDialog.show({
        title:"查看机器信息",
        message:$('<table class="table table-striped table-hover"><thead><tr><td>序号</td><td>商户号</td><td>终端号</td><td>机身号</td></tr></thead><tbody><tr><td>序号</td><td>商户号</td><td>终端号</td><td>机身号</td></tr><tr><td>序号</td><td>商户号</td><td>终端号</td><td>机身号</td></tr><tr><td>序号</td><td>商户号</td><td>终端号</td><td>机身号</td></tr></tbody></table>'),
        type:"type-primary",
        buttons:[{
          label:"确定",
          cssClass:"btn-primary",
          action:function(dialog){
            dialog.close();
          }
        }]
        
       })
    })

    //分页处理；
    if($("#paginator").length > 0)
    {
      var pagintorHeight = $("#paginator").offset();
      var offsetParent=$("#paginator").offsetParent();
      var parentOffset = offsetParent.offset();   

      var boxDistant = pagintorHeight.top - parentOffset.top + parseInt($("#paginator").css("margin-top"));
      var boxParentDistant = $("#paginator").parent().height();

      if(boxDistant < (boxParentDistant - $("#paginator").height()))
      {
        var paginatorTop = boxParentDistant - $("#paginator").height() - 15;
        $("#paginator").parent().css({"position":"relative"});
        $("#paginator").css({"position":"absolute","top":paginatorTop+"px"});
      }
    }
});




