$(function () {
    var page = 1;
    queryCarData();
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 初始化上拉下拉效果
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            // 下拉刷新
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                callback: function () {
                    setTimeout(function () {
                        // 重置page页面
                        page = 1;
                        queryCarData();
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        // 重置上拉加载
                        mui('#refreshContainer').pullRefresh().refresh(true);
                    }, 1000);

                }
            },
            // 上拉加载
            up: {
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    setTimeout( function () {
                        page++;
                        $.ajax({
                            url: '/cart/queryCartPaging',
                            data: {
                                page: page,
                                pageSize: 4
                            },
                            success: function (data) {
                                // 由于后台返回的数据格式问题,所以将返回数据为数组时,转换为对象
                                if (data instanceof Array) {
                                    data = {
                                        data: data
                                    }
                                }
                                console.log(data);
                                if (data.data.length > 0) {
                                    var html = template('carListTpl', data);
                                    $('.car-list').append(html);
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

    //查询购物车数据
    function queryCarData() {
        $.ajax({
            url: '/cart/queryCartPaging',
            data: {
                page: page,
                pageSize: 4
            },
            success: function (data) {
                // 由于后台返回的数据格式问题,所以将返回数据为数组时,转换为对象
                if (data instanceof Array) {
                    data = {
                        data: data
                    }
                }
                console.log(data);
                if (data.data.length > 0) {
                    var html = template('carListTpl', data);
                    $('.car-list').html(html);
                }
            }
        })
    }

    //返回上一页
    $('#header .back').on('tap',function(){
        var returnUrl = getQueryString('returnUrl');
        location = returnUrl;
    });

    // 获取指定url参数值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'); // 以&开头以&结束 ,并且中间不能有多个& ,区分大小写
        var r = decodeURI(window.location.search).substr(1).match(reg);  //截取?后面的字符, 匹配一个或者多个对应正则
        if (r != null) return decodeURI(r[2]);
        return null;
    }
});