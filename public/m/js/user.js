$(function(){
    $.ajax({
		url: '/user/queryUserMessage',
		success: function (data) {
			console.log(data);
			// 拿到数据后判断是否成功 
			if(data.error){
				// 结果里面有报错 提示未登录的 不让用户在继续加载当前页面 而是跳转到登录页面去登录
				location = 'login.html?returnUrl='+location.href;
			}else{
				$('.username').html(data.username);
				$('.mobile').html(data.mobile);
			}
		}
    });
    $('.btn-login-out').on('tap',function(){
        $.ajax({
            url:'/user/logout',
            success:function(data){
                if(data.success){
                    location = 'login.html?returnUrl='+location.href;
                }
            }
        })
    });
})