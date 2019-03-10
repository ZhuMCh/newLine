<template>
<div>
    <van-nav-bar title="问题提报详情" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="8" class="detailTh">问题流水号</van-col>
            <van-col span="16" class="detailTd">201902251234</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">线路</van-col>
            <van-col span="16" class="detailTd">2</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">发现阶段</van-col>
            <van-col span="16" class="detailTd">工可</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">文档名称</van-col>
            <van-col span="16" class="detailTd">XXX图纸</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">文件名称/问题部位</van-col>
            <van-col span="16" class="detailTd">XXX.doc</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">源文件内容/问题描述</van-col>
            <van-col span="16" class="detailTd">XXXXXXXX(文件内容)</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">问题地点</van-col>
            <van-col span="16" class="detailTd">XXX地点</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">等级</van-col>
            <van-col span="16" class="detailTd">C级</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">问题影响</van-col>
            <van-col span="16" class="detailTd">2</van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="8" class="detailTh">运营整改意见</van-col>
            <van-col span="16" class="detailTd">需要整改</van-col>
        </van-row>
    </div>
</div>
</template>
<script>
import { } from '@/api/http'
export default {
    data(){
        return {

        }
    },
    created(){
       
    },
    methods:{

    }
}
</script>
