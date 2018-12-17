$(function () {
    var search = getQueryString('search');
    var page = 1;
    queryProduct(); // 从搜索页面到商品页面的search

    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 搜索对应商品
    $('.btn-search').on('tap', function () {
        search = $('.input-search').val();
        console.log(search);
        queryProduct();
    });

    // 根据排序类型及方式排序
    $('.product-sel a').on('tap', function () {
        var sortType = $(this).data('sortType'); //获取想要排序的类型
        var sort = $(this).data('sort');
        sort = sort == 1 ? 2 : 1; //切换排序的方式
        $(this).data('sort', sort);

        var param = {
            page: 1,
            pageSize: 2,
            proName: search
        }

        param[sortType] = sort; //将需要排序的类型和方式添加到请求的参数中
        $.ajax({
            url: '/product/queryProduct',
            data: param,
            success: function (data) {
                console.log(data);
                var html = template('productListTpl', data);
                $('.product-list ul').html(html);

            }
        })
    });

    // 上拉下拉刷新内容
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            // 下拉刷新
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                callback: function () {
                    // 由于是本地请求数据很快, 看不到请求数据的效果,所以加一个定时器,有个一秒钟的延迟
                    setTimeout(function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        queryProduct();
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        mui('#refreshContainer').pullRefresh().refresh(true);
                        page = 1;
                    }, 1000);
                }
            },
            // 上拉加载
            up: {
                contentrefresh: "正在拼命加载更多数据...",
                contentnomore: '再下实在是给不了更多!',
                callback: function () {
                    setTimeout(function () {
                        page++;
                        $.ajax({
                            url: '/product/queryProduct',
                            data: { page: page, pageSize: 2, proName: search },
                            success: function (data) {
                                if (data.data.length > 0) {
                                    var html = template('productListTpl', data);
                                    $('.product-list ul').append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                                } else {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        });
                    }, 1000);
                }
            }
        }
    });

    // 点击购买跳转到详情页面
    $('.product-list ul').on('tap','.btn-buy',function(){
        var id = $(this).data('id');
	 	location = 'detail.html?id='+id+'&returnUrl='+location.href;
    });

    // 获取指定url参数值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'); // 以&开头以&结束 ,并且中间不能有多个& ,区分大小写
        var r = decodeURI(window.location.search).substr(1).match(reg);  //截取?后面的字符, 匹配一个或者多个对应正则
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    // 请求商品数据
    function queryProduct() {
        $.ajax({
            url: '/product/queryProduct',
            data: {
                page: page,
                pageSize: 2,
                proName: search
            },
            success: function (data) {
                console.log(data);
                
                var html = template('productListTpl', data);
                $('.product-list ul').html(html);
            }
        })
    }


})