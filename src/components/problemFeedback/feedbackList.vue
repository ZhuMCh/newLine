<template>
<div>
    <van-nav-bar title="问题跟踪反馈" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">问题描述</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox"/>
            </van-col>
            <van-col span="3" class="inputLabel">线路</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox"/>
            </van-col>
        </van-row>
        <br>
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">责任部门</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox"/>
            </van-col>
        </van-row>
        <br>
        <van-row gutter="20" type="flex" justify="center">
            <van-col span="6">
                <van-button size="small">查询</van-button>        
            </van-col>
            <van-col span="6">
                <van-button size="small">反馈</van-button>        
            </van-col>
            <van-col span="6">
                <van-button size="small">提交</van-button>        
            </van-col>
        </van-row>
        <br>
        <div class="table">
            <van-row class="tr">
                <van-col class="th">问题编号</van-col>
                <van-col class="th">问题地点</van-col>
                <van-col class="th">问题描述</van-col>
                <van-col class="th">责任部门</van-col>
                <van-col class="th">提报人</van-col>
                <van-col class="th">提报日期</van-col>
            </van-row>
            <router-link to="/problemReport/problemDetail">
                <van-row class="tr">
                    <van-col class="td">2018110201</van-col>
                    <van-col class="td">XXXX</van-col>
                    <van-col class="td">XXXX</van-col>
                    <van-col class="td">车辆部</van-col>
                    <van-col class="td">张三</van-col>
                    <van-col class="td">2019-02-25</van-col>
                </van-row>
            </router-link>
            <router-link to="/problemReport/problemDetail">
                <van-row class="tr">
                    <van-col class="td">2018110201</van-col>
                    <van-col class="td">XXXX</van-col>
                    <van-col class="td">XXXX</van-col>
                    <van-col class="td">车辆部</van-col>
                    <van-col class="td">张三</van-col>
                    <van-col class="td">2019-02-25</van-col>
                </van-row>
            </router-link>
        </div>
    </div>
    
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
van-button{
    background-color:#52B8D6;
}
</style>

