$(function(){
    var searchData = JSON.parse(localStorage.getItem('searchData'))|| [];
    getHistoryData(searchData);
    $('.btn-search').on('tap',function(){
        var searchKey = $('.input-search').val();
        //内容去掉前后空格后不能为空
        if (!searchKey.trim()){
            alert('请输入搜索内容!')
            return false;
        }
        console.log(searchData.indexOf(searchKey));
        
        if (searchData.indexOf(searchKey) != -1) {
            searchData.splice(searchData.indexOf(searchKey), 1)
        }
        searchData.unshift(searchKey.trim());
        // 将数据转换成字符串形式存储到本地
        localStorage.setItem('searchData',JSON.stringify(searchData));
        // 将本地JSON数据转换成js对象(这里是数组)
        var historyData = JSON.parse(localStorage.getItem('searchData'));
        // 模板渲染
        getHistoryData(historyData);
        $('.input-search').val('');
        location = "product.html?search="+ searchKey;
    })
    //生成模板样式
    function getHistoryData(historyData){
        var obj = {'history':historyData};
        console.log(obj);
        //生成模板
        var html = template('SearchHistoryTpl',obj);
        $('.search-history ul').html(html);
    }
    //删除单个历史记录
    $('.search-history ul').on('tap','.btn-del',function(){
        var index = $(this).data('index');
        var historyData = JSON.parse(localStorage.getItem('searchData'));
        // 删除对应下标的数组
        historyData.splice(index,1);
        // 模板渲染
        getHistoryData(historyData);
        // 将更新后的搜索记录存储到本地
        localStorage.setItem('searchData',JSON.stringify(historyData));
    });
    // 清空历史记录
    $('.btn-clear-history').on('tap',function(){
        localStorage.removeItem('searchData');
        searchData = [];
        getHistoryData(searchData);

    })
});