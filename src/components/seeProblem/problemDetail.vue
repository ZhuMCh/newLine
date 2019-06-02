<template>
<div>
    <van-nav-bar title="问题详情" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题编号</van-col>
            <van-col span="14" class="detailTd">{{detailData.serialNumber}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">线路</van-col>
            <van-col span="14" class="detailTd">{{detailData.line.name}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现阶段</van-col>
            <van-col span="14" class="detailTd">{{detailData.problemStage.name}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">任务名称</van-col>
            <van-col span="14" class="detailTd">{{detailData.seekOpinion?detailData.seekOpinion.fileName:''}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">文件名称/问题部位</van-col>
            <van-col span="14" class="detailTd">{{detailData.name}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">原文件内容/问题描述</van-col>
            <van-col span="14" class="detailTd">{{detailData.description}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题地点</van-col>
            <van-col span="14" class="detailTd">{{detailData.address}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题等级</van-col>
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
            <van-col span="14" class="detailTd">{{detailData.findDepartment.deptName}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现人</van-col>
            <van-col span="14" class="detailTd">{{detailData.findEmployee}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现时间</van-col>
            <van-col span="14" class="detailTd">{{new Date(detailData.findTime).Format('yyyy-MM-dd hh:mm:ss')}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">提报人</van-col>
            <van-col span="14" class="detailTd">{{detailData.reportEmployee.empName}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">提报日期</van-col>
            <van-col span="14" class="detailTd">{{new Date(detailData.reportDate).Format('yyyy-MM-dd hh:mm:ss')}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">需要整改完成时限</van-col>
            <van-col span="14" class="detailTd">{{new Date(detailData.endTime).Format('yyyy-MM-dd')}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">责任部门</van-col>
            <van-col span="14" class="detailTd">{{detailData.dutyDepartment.deptName}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">{{detailData.liaisonEmployee.empName}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">{{detailData.processStatus}}</van-col>
        </van-row>
    </div>
</div>
</template>
<script>
import { problemDetail } from '@/api/http'
export default {
    data(){
        return {
            detailData:{
                line:{},
                seekOpinion:{},
                problemStage:{},
                findDepartment:{},
                reportEmployee:{},
                dutyDepartment:{},
                liaisonEmployee:{}
            }
        }
    },
    created(){
        console.log(this.$route.query.id);
        problemDetail(this.$route.query.id).then(res=>{
            console.log(res)
            if(res.data.code==200){
                this.detailData=res.data.data
            }else{
                this.$toast.fail(res.data.message);
            }
       })
    },
    methods:{
        
    }
}
</script>
<style scoped>

</style>
