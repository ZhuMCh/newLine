<template>
<div>
    <van-nav-bar title="问题反馈详情" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题流水号</van-col>
            <van-col span="14" class="detailTd">{{detailData.serialNumber}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">线路</van-col>
            <van-col span="14" class="detailTd">{{detailData.line}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现阶段</van-col>
            <van-col span="14" class="detailTd">{{detailData.problemStage}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">文档名称</van-col>
            <van-col span="14" class="detailTd">{{detailData.seekOpinion}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">文件名称/问题部位</van-col>
            <van-col span="14" class="detailTd">{{detailData.name}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">源文件内容/问题描述</van-col>
            <van-col span="14" class="detailTd">{{detailData.description}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题地点</van-col>
            <van-col span="14" class="detailTd">{{detailData.address}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">等级</van-col>
            <van-col span="14" class="detailTd">{{detailData.rank}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题影响</van-col>
            <van-col span="14" class="detailTd">{{detailData.effect}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">运营整改意见</van-col>
            <van-col span="14" class="detailTd">{{detailData.changeOpinion}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现部门</van-col>
            <van-col span="14" class="detailTd">{{detailData.findDepartment}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现人</van-col>
            <van-col span="14" class="detailTd">{{detailData.findEmployee}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现时间</van-col>
            <van-col span="14" class="detailTd">{{detailData.findTime}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">提报人</van-col>
            <van-col span="14" class="detailTd">{{detailData.reportEmployee}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">提报日期</van-col>
            <van-col span="14" class="detailTd">{{detailData.reportDate}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">需要整改完成时限</van-col>
            <van-col span="14" class="detailTd">{{detailData.endTime}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">责任部门</van-col>
            <van-col span="14" class="detailTd">{{detailData.dutyDepartment}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">{{detailData.liaisonEmployee}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">{{detailData.processStatus}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">审核时限(天)</van-col>
            <van-col span="14" class="detailTd">{{detailData.approvalTime}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">添加附件</van-col>
            <van-col span="14" class="detailTd uploaderBox">
                <img :src="detailData.problemAttachments" alt="">
                <!-- <van-uploader :after-read="onRead" class="uploader">
                    <van-icon name="plus" class="addIcon"/>
                </van-uploader> -->
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
            // accessory:'',
            detailData:''
        }
    },
    created(){
        console.log(this.$route.query.id);
        this.$route.query.id=''
        feedbackDetail(this.$route.query.id).then(res=>{
            console.log(res)
            if(res.data.code==200){
                this.detailData=res.data.detail
            }else{
                this.$toast.fail(res.data.message);
            }
       })
    },
    methods:{
        // onRead(file) {//上传附件
        //     console.log(file)
        //     this.accessory=file.content
        // },
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
