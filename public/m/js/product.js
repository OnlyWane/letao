$(function(){
    var key = location.search.split('=')[1];
    key = decodeURI(key);
    console.log(key);
    $.ajax({
        url:'/product/queryProduct',
        data:{
            page:1,
            pageSize:6,
            proName:key
        },
        success:function(data){
            console.log(data);
            var html = template('productListTpl',data);
            $('.product-list ul').html(html);
            
        }
    })
    
    
    
})