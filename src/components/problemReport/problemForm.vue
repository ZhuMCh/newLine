<template>
<div>
    <van-nav-bar title="问题提报" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题流水号</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="problemNum" v-model="problemNum"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">线路</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="line" v-model="line"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现阶段</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="problemStage" v-model="problemStage"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">文档名称</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="documentName" v-model="documentName" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">文件名称/问题部位</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="fileName" v-model="fileName" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">源文件内容/问题描述</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="fileContent" v-model="fileContent"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">问题地点</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="problemAddr" v-model="problemAddr"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">等级</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="rank" v-model="rank"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">问题影响</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="problemEffeck" v-model="problemEffeck"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">运营整改意见</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="idea" v-model="idea"/>
            </van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现部门</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="findDept" v-model="findDept"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现人</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="findPerson" v-model="findPerson"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现时间</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="选择时间" value="findTime" v-model="findTime" readonly="readonly" icon="notes-o" @click="findTimePop = true;"/>
            </van-col>
        </van-row>
        <!-- 发现时间选择器 -->
        <van-popup v-model="findTimePop" position="bottom" :overlay="true">
            <van-datetime-picker v-model="currentDate" type="datetime" @cancel="cancelPopup" @confirm="confirmPopup"/>
        </van-popup>

        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">提报人</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="reportPerson" v-model="reportPerson"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">提报日期</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="2019-02-25" value="reportTime" v-model="reportTime"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">需要整改完成时限</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="选择时间" value="endTime" v-model="endTime" readonly="readonly" icon="notes-o" @click="endTimePop = true;"/>
            </van-col>
        </van-row>
        <!-- 整改完成时限选择器 -->
        <van-popup v-model="endTimePop" position="bottom" :overlay="true">
            <van-datetime-picker v-model="currentDate" type="date" @cancel="cancelPopup" @confirm="confirmPopup"/>
        </van-popup>

        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">责任部门</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="dutyDept" v-model="dutyDept"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="liaisonPerson" v-model="liaisonPerson"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="approveStatus" v-model="approveStatus"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">审核时限(天)</van-col>
            <van-col span="14" class="detailTd">
                <van-field value="approveTime" v-model="approveTime"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">添加附件</van-col>
            <van-col span="14" class="detailTd uploaderBox">
                <img :src="accessory" alt="">
                <van-uploader :after-read="onRead" class="uploader">
                    <van-icon name="plus" class="addIcon"/>
                </van-uploader>
            </van-col>
        </van-row>
    </div>
    <div class="btnBox">
        <van-row gutter="20">
            <van-col span="8">
                <van-button size="large" @click="addSubmitProblemFunc">提交</van-button>        
            </van-col>
            <van-col span="8">
                <van-button size="large" @click="addProblemFunc">保存</van-button>     
            </van-col>
            <van-col span="8">
                <van-button size="large" @click="()=>{this.$router.go(-1)}">取消</van-button>        
            </van-col>
        </van-row>
    </div>
    
</div>
</template>
<script>
import { seeDetail,addProblem,homeSubmitProblem } from '@/api/http'
export default {
    data(){
        return {
            currentDate: new Date(),
            findTimePop:false,
            endTimePop:false,

            problemNum:'',//问题流水号
            line:'',//线路
            problemStage:'',//发现阶段
            documentName:'',//文档名称
            fileName:'',//文件名称
            fileContent:'',//文件内容
            problemAddr:'',//问题地点
            rank:'',//等级
            problemEffeck:'',//问题影响
            idea:'',//整改意见
            findDept:'',//发现部门
            findPerson:'',//发现人
            findTime:'',//发现时间
            reportPerson:'',//提报人
            reportTime:'',//提报日期
            endTime:'',//需要整改完成时间
            dutyDept:'',//责任部门
            liaisonPerson:'',//联络员
            approveStatus:'',//审批状态
            approveTime:'',//审批时限
            accessory:'',//附件
        }
    },
    created(){
        // 查看详情
        if(this.$route.query.id){
            console.log(this.$route.query.id);
            seeDetail(this.$route.query.id).then(res=>{
                console.log(res);
                if(res.data.code==200){

                }else{
                    this.$toast.fail(res.data.message); 
                }
            })
        }
        
    },
    methods: {
        addProblemFunc(){//新增问题
            addProblem(
                this.problemNum,
                this.line,
                this.problemStage,
                this.documentName,
                this.fileName,
                this.fileContent,
                this.problemAddr,
                this.rank,
                this.problemEffeck,
                this.idea,
                this.findDept,
                this.findPerson,
                this.findTime,
                this.reportPerson,
                this.reportTime,
                this.endTime,
                this.dutyDept,
                this.liaisonPerson,
                this.approveStatus,
                this.approveTime,
                this.accessory
            ).then(res=>{
                console.log(res)
                if(res.data.code==200){

                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        addSubmitProblemFunc(){//保存提交
            addSubmitProblem(
                this.problemNum,
                this.line,
                this.problemStage,
                this.documentName,
                this.fileName,
                this.fileContent,
                this.problemAddr,
                this.rank,
                this.problemEffeck,
                this.idea,
                this.findDept,
                this.findPerson,
                this.findTime,
                this.reportPerson,
                this.reportTime,
                this.endTime,
                this.dutyDept,
                this.liaisonPerson,
                this.approveStatus,
                this.approveTime,
                this.accessory
            ).then(res=>{
                consoel.log(res)
                if(res.data.code==200){

                }else{
                   this.$toast.fail(res.data.message); 
                }
            })

        },
        onRead(file) {//上传附件
            console.log(file)
            this.accessory=file.content
        },
        confirmPopup(time){//确认时间
            if(this.findTimePop==true){//发现时间
                this.findTime=new Date(time).Format('yyyy-MM-dd hh:mm');
                this.findTimePop=false;
            }else if(this.endTimePop==true){//整改时限
                this.endTime=new Date(time).Format('yyyy-MM-dd');
                this.endTimePop=false;
            }
        },
        cancelPopup(){//取消时间
            if(this.findTimePop==true){
                this.findTimePop=false;
                this.findTime='';
            }else if(this.endTimePop==true){
                this.endTimePop=false;
                this.endTime='';
            }
        },

    }
}
</script>
<style scoped>
.detailTd{
    padding: 0;
}
.detailTh{
    color: #1bbc9a;
}
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
.btnBox{
    padding: 0 10px 20px;
}
.btnBox .van-button{
    background-color: #1bbc9a;
}
</style>
