<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  word-break:break-all;
}
.van-nav-bar .van-icon, .van-nav-bar__text, .van-tab--active{
  color: #1bbc9a;
}
.van-nav-bar{
  background-color: #F2F2F2;
}
.loginBox .van-field__label{
    color: #1bbc9a;
}
a{
  color: #000;
}
.container{
  padding: 20px 10px;
}
.inputBox{
  width: 100%;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  border:1px solid #c8c8c8;
  height: 34px;
  padding: 5px;
}
.inputLabel{
  color: #1bbc9a;
  font-weight: 700;
  line-height: 34px;
}
.van-button{
  background-color: #4DB5D3;
  border: 1px solid #42A1BD;
  display: block;
  margin: 0 auto;
  color: #fff;
}
/* 数据表格 */
.table{
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.table .tr{
  border-bottom: 1px solid #ddd;
  display: flex;
  text-align: center;
}
.table .tr .th{
  padding: 5px;
  font-weight: bold;
  color: #1bbc9a;
  border-right: 1px solid #ddd;
  flex: 1;
}
.table .tr .th:last-child,.table .tr .td:last-child{
  border-right: none;
}
.table .tr .td{
  border-right: 1px solid #ddd;
  flex: 1;
  padding: 5px;
}
/* 详情表格 */
.detailTr{
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  display: flex;
}
.detailTr:last-child{
  border-bottom: 1px solid #ddd;
}
.detailTh{
  border-right: 1px solid #ddd;
  padding: 10px 5px;
}
.detailTd{
  padding: 10px 5px;
  color: #1bbc9a;
}
</style>
