<template>
<div>
    <van-nav-bar title="问题反馈详情" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题流水号</van-col>
            <van-col span="14" class="detailTd">{{detailData.problemCode}}</van-col>
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
            <van-col span="10" class="detailTh">文档名称</van-col>
            <van-col span="14" class="detailTd">{{detailData.seekOpinion?detailData.seekOpinion.fileName:''}}</van-col>
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
            <van-col span="14" class="detailTd">{{detailData.findDepartment.deptName}}</van-col>
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
            <van-col span="14" class="detailTd">{{detailData.reportEmployee.empName}}</van-col>
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
            <van-col span="14" class="detailTd">{{detailData.dutyDepartment.deptName}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">{{detailData.liaisonEmployee.empName}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">{{detailData.processStatus==0?'待审批':(detailData.processStatus==1?'审批中':(detailData.processStatus==2?'审批通过':'审批否决'))}}</van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">添加附件</van-col>
            <van-col span="14" class="detailTd uploaderBox">
                <span v-for="(item,index) in fileBack" :key="index">
                    <div class="preview" v-if="item.type==1">
                        <img :src="item.url" alt="">
                    </div>
                    <div class="preview docFile" v-else>
                        <a :href="item.url">{{item.name}}</a>
                    </div>
                </span>
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
            detailData:{
                line:{},
                seekOpinion:{},
                problemStage:{},
                findDepartment:{},
                reportEmployee:{},
                dutyDepartment:{},
                liaisonEmployee:{}
            },
            fileBack:[]
        }
    },
    created(){
        console.log(this.$route.query.id);
        feedbackDetail(this.$route.query.id).then(res=>{
            console.log(res)
            if(res.data.code==1001){
                this.detailData=res.data.data.problemResult
                var fileData=res.data.data.problemAttachments;
                for(var i=0;i<fileData.length;i++){
                    if(fileData[i].path.substring(fileData[i].path.lastIndexOf(".")+1,fileData[i].path.length).toLowerCase()=='jpg'||fileData[i].path.substring(fileData[i].path.lastIndexOf(".")+1,fileData[i].path.length).toLowerCase()=='png'){
                        this.fileBack.push({type:1,url:res.data.data.problemAttachments[i].path,name:res.data.data.problemAttachments[i].name})
                    }else{
                        this.fileBack.push({type:2,url:res.data.data.problemAttachments[i].path,name:res.data.data.problemAttachments[i].name})
                    }  
                }
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
.uploaderBox{
    padding: 5px 10px;
}
.preview{
    display: inline-block;
    margin: 10px 10px 0 0; 
}
.preview img{
    width: 80px;
    height: 80px;
}
.docFile a{
    color: #1bbc9a;
}
</style>
