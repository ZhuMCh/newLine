<template>
<div>
    <van-nav-bar title="问题提报" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="8" class="detailTh">发现部门</van-col>
            <van-col span="16" class="detailTd">机电部</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">发现人</van-col>
            <van-col span="16" class="detailTd">张三</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">发现时间</van-col>
            <van-col span="16" class="detailTd">2019-02-25 12:30:56</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">提报人</van-col>
            <van-col span="16" class="detailTd">李四</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">提报日期</van-col>
            <van-col span="16" class="detailTd">2019-02-25</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">需要整改完成时限</van-col>
            <van-col span="16" class="detailTd">2019-02-30</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">责任部门</van-col>
            <van-col span="16" class="detailTd">机电</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">联络员</van-col>
            <van-col span="16" class="detailTd">王五</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">审批状态</van-col>
            <van-col span="16" class="detailTd">待提交</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">审核时限(天)</van-col>
            <van-col span="16" class="detailTd">2</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">添加附件</van-col>
            <van-col span="16" class="detailTd"></van-col>
        </van-row>
    </div>
</div>
</template>
<script>
export default {
    
}
</script>
