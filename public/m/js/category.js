$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        url:"/category/queryTopCategory",
        success:function(data){
            var html = template('categoryLeftTpl',data);
            $('.category-left ul').html(html);
        }
    });

    $('.category-left ul').on('tap','li a',function(){
        console.log($(this).data('id'));
        $(this).parent().addClass('active').siblings().removeClass('active');
        var id = $(this).data('id');
        getBrandList(id);
        
    })

    function getBrandList(id) {
        $.ajax({
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(data){
                console.log(data);
                var html = template('categoryRightTpl',data);
                $('.category-right ul').html(html);
            }
        })
    }

    getBrandList(1);
})