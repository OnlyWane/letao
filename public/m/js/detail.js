$(function(){

    var id = getQueryString('id');

     // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url:'/product/queryProductDetail',
        data:{id:id},
        success:function(data){
            console.log(data);
            var size = data.size.split('-');
            console.log(size);
            var minsize = size[0]-0;
            var maxsize = size[1]-0;
            var arr = [];
            for(var i = minsize;i<=maxsize;i++){
                arr.push(i);
            }
            data.size = arr;
            console.log(data);
            var html = template('detailTpl',data);
            $('#details').html(html);
            mui('.mui-numbox').numbox();
            mui('.mui-slider').slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            $('.btn-size').on('tap', function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
            
        }
    });

    $('.btn-add-cart').on('tap',function(){
        var size = $('.btn-size.active').data('size');
        var num = mui('.mui-numbox').numbox().getValue();
        if (!size) {
            mui.toast('请选择尺码！', { duration: 3000, type: 'div' });
            return false;
        }
        if (!num) {
            mui.toast('请选择数量！', { duration: 3000, type: 'div' });
            return false;
        }
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num:num,
                size:size
            },
            success: function(data){
                if(data.success){
                    mui.confirm('加入购物车成功！ 是否要去购物车查看?', 'hello 单身狗', ['去看','发呆','不看'], function(e){
                       console.log(e);
                        if(e.index == 0){
                           location = 'buyCar.html?returnUrl='+location.href;
                        }else{
                            mui.toast('你继续加一件就可以脱离单身了！', { duration: 3000, type: 'div' });
                        }
                    });

                }else{
                    mui.toast(data.message, { duration: 3000, type: 'div' });
                    location = 'login.html?returnUrl='+location.href;
                }
            }
        })
    });

    $('.back').on('tap',function(){
        var returnUrl = getQueryString('returnUrl');
        location = returnUrl;
    })

    // 获取指定url参数值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'); // 以&开头以&结束 ,并且中间不能有多个& ,区分大小写
        var r = decodeURI(window.location.search).substr(1).match(reg);  //截取?后面的字符, 匹配一个或者多个对应正则
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})