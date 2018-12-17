$(function(){
    var vCode = '';
    // var check;
    $('.btn-register').on('tap',function(){
        var phone = $('.phone-number').val().trim(); // 手机号
        var userName = $('.user-name').val().trim(); // 手机号
        var password = $('.password').val().trim();  // 密码
        var pwdCheck = $('.password-check').val().trim(); //确认密码
        var vcode = $('.vcode').val().trim(); //验证码
        var check = true;
        mui(".register-from input").each(function() {
            //若当前input为空，则alert提醒 
            if(!this.value || this.value.trim() == '') {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + '不允许为空');
                check = false;
                return false;
            }
        }); 
        //校验通过，继续执行业务逻辑 
        if(check){
            // 将手机号进行正则匹配
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                mui.alert('用户手机不合法!');
                return false;
            }
            // 用户名长度时候大于10
            if (userName.length>10){
                mui.alert('用户名长度不能大于10!');
                return false;
            }
            // 判断两次密码
            if (password!=pwdCheck){
                mui.alert('两次密码不一致!');
                return false;
            }
            //判断验证码是否正确
            if (vcode!=vCode){
                mui.alert('验证码有误');
                return false;
            }
            $.ajax({
                url:'/user/register',
                type:'post',
                data:{
                    username:userName,
                    password:password,
                    mobile:phone,
                    vCode:vcode
                },
                success:function(data){
            		if(data.success){
            			mui.toast('注册成功');
            			// 如果注册成功就跳转到登录  希望登录成功去跳转到个人中心
            			location = 'login.html?returnUrl=user.html';
            		}else{
            			mui.toast(data.message);
            		}                 
                }
            })
        }
    });

    // 获取验证码
    $('.btn-code').on('tap',function(){
        $.ajax({
            url:'/user/vCode',
            success:function(data){
                // 让验证码在控制台打印
                console.log(data.vCode);
                vCode = data.vCode;
            }
        });
    })

});