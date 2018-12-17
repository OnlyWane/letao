$(function(){
    $('.btn-login').on('tap',function(){
        var username = $('.username').val().trim();
        var password = $('.password').val().trim();
        $.ajax({
            url:'/user/login',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:function(data){
                console.log(data);
                if(data.success){
                    console.log('success!');
                    var returnUrl = getQueryString('returnUrl');
                    location = returnUrl;
                }else{
                    mui.toast(data.message,{ duration:'long', type:'div' });
                }
            }
        })
    });

    // 跳转注册页面
    $('.btn-register').on('tap',function () {
		location = 'register.html';
    });

    // // 返回上一页
    // $('.back').on('tap',function(){

    // })

     // 根据url参数名取值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        // console.log(r);
        if (r != null) {
            //转码方式改成 decodeURI
            return decodeURI(r[2]);
        }
        return null;
    }
})