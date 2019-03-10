<template>
<div>
    <van-nav-bar title="问题反馈详情" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题流水号</van-col>
            <van-col span="14" class="detailTd">201902251234</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">线路</van-col>
            <van-col span="14" class="detailTd">2</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现阶段</van-col>
            <van-col span="14" class="detailTd">工可</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">文档名称</van-col>
            <van-col span="14" class="detailTd">XXX图纸</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">文件名称/问题部位</van-col>
            <van-col span="14" class="detailTd">XXX.doc</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">源文件内容/问题描述</van-col>
            <van-col span="14" class="detailTd">XXXXXXXX(文件内容)</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题地点</van-col>
            <van-col span="14" class="detailTd">XXX地点</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">等级</van-col>
            <van-col span="14" class="detailTd">C级</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题影响</van-col>
            <van-col span="14" class="detailTd">2</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">运营整改意见</van-col>
            <van-col span="14" class="detailTd">需要整改</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现部门</van-col>
            <van-col span="14" class="detailTd">机电部</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现人</van-col>
            <van-col span="14" class="detailTd">张三</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现时间</van-col>
            <van-col span="14" class="detailTd">2019-02-25 12:30:56</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">提报人</van-col>
            <van-col span="14" class="detailTd">李四</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">提报日期</van-col>
            <van-col span="14" class="detailTd">2019-02-25</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">需要整改完成时限</van-col>
            <van-col span="14" class="detailTd">2019-02-30</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">责任部门</van-col>
            <van-col span="14" class="detailTd">机电</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">王五</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">待提交</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">审核时限(天)</van-col>
            <van-col span="14" class="detailTd">2</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">添加附件</van-col>
            <van-col span="14" class="detailTd uploaderBox">
                <img :src="imgPath" alt="">
                <van-uploader :after-read="onRead" class="uploader">
                    <van-icon name="plus" class="addIcon"/>
                </van-uploader>
            </van-col>
        </van-row>
    </div>
</div>
</template>
<script>
import { feedbackDetail } from '@/api/http'
export default {
    data(){
        return {
            imgPath:''
        }
    },
    created(){
        console.log(this.$route.query.id);
        feedbackDetail(this.$route.query.id).then(res=>{
            console.log(res)
            if(res.data.code==200){

            }else{
                this.$toast.fail(res.data.message);
            }
       })
    },
    methods:{
        onRead(file) {//上传附件
            console.log(file)
            this.accessory=file.content
        },
    }
}
</script>
<style scoped>
.uploaderBox{
    padding: 5px 10px;
}
.uploaderBox img{
    width: 80px;
    height: 80px;
    vertical-align: middle;
}
.uploaderBox .uploader{
    background-color: #F6F6F6;
    width: 50px;
    height: 50px;
    vertical-align: middle;
}
.uploaderBox .uploader .addIcon{
    font-size: 30px;
    line-height: 50px;
    color: #C4C5C7;
}
</style>
