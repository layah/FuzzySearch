# FuzzySearch
支持模糊搜索及模式切换
全局函数引用：
  new SeachFuzzy({
            el:"#seachBox",//定位元素
            data:_this.dataList.tableData,//数据来源
            tabID:["tableBox","tr"],//搜索结果定位到对象引用
            style:"hover",//搜索结果增加样式
            toggle:true,//模式切换，增加多条件匹配搜索
        });
