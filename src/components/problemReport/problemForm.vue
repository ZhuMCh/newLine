<template>
<div>
    <van-nav-bar title="问题提报" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题流水号</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="problemNum"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">线路</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="line" readonly @click="clickFunc('线路',lineList,1)"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现阶段</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="problemStage" readonly  @click="clickFunc('发现阶段',findStageList,2)"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">文档名称</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="documentName" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">文件名称/问题部位</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="fileName" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">源文件内容/问题描述</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="fileContent"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">问题地点</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="problemAddr"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">等级</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="rank"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">问题影响</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="problemEffeck"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">运营整改意见</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="idea"/>
            </van-col>
        </van-row>
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现部门</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="findDept"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现人</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="findPerson"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现时间</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="选择时间" v-model="findTime" readonly="readonly" icon="notes-o" @click="findTimePop = true;"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">提报人</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="reportPerson"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">提报日期</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="2019-02-25" readonly v-model="reportTime"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">需要整改完成时限</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="选择时间" v-model="endTime" readonly icon="notes-o" @click="endTimePop = true;"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">责任部门</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="dutyDept"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="liaisonPerson"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="approveStatus"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">添加附件</van-col>
            <van-col span="14" class="detailTd uploaderBox">
                <img :src="item" alt="" v-for="(item,index) in accessory" :key="index">
                <van-uploader :after-read="onRead" class="uploader">
                    <van-icon name="plus" class="addIcon"/>
                </van-uploader>
            </van-col>
        </van-row>
    </div>
    <!-- 发现时间选择器 -->
    <van-popup v-model="findTimePop" position="bottom" :overlay="true">
        <van-datetime-picker v-model="currentDate" type="datetime" @cancel="cancelPopup" @confirm="confirmPopup"/>
    </van-popup>
    <!-- 整改完成时限选择器 -->
    <van-popup v-model="endTimePop" position="bottom" :overlay="true">
        <van-datetime-picker v-model="currentDate" type="date" @cancel="cancelPopup" @confirm="confirmPopup"/>
    </van-popup>
    <!-- 选择器 -->
    <van-popup v-model="eventPop" position="bottom" :overlay="true">
        <van-picker show-toolbar :title="titleVal" :columns="dataList" value-key='name' @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
    
    <div class="btnBox">
        <van-row gutter="20">
            <van-col span="8" v-if="isAdd">
                <van-button size="large" @click="addProblemFunc">添加</van-button>        
            </van-col>
            <van-col span="8" v-else>
                <van-button size="large" @click="homeSubmit">提交</van-button>        
            </van-col>
            <van-col span="8" v-if="isAdd">
                <van-button size="large" @click="addSubmitProblemFunc">保存</van-button>     
            </van-col>
            <van-col span="8" v-else>
                <van-button size="large" @click="updataProblemFunc">修改</van-button>     
            </van-col>
            <van-col span="8">
                <van-button size="large" @click="()=>{this.$router.go(-1)}">取消</van-button>        
            </van-col>
        </van-row>
    </div>
    
</div>
</template>
<script>
import { seeDetail,addProblem,addSubmitProblem,updateProblem,homeSubmitProblem,getLine,getFind,getRootDept,getDeptById,getLiaison } from '@/api/http'
export default {
    data(){
        return {
            currentDate: new Date(),
            findTimePop:false,
            endTimePop:false,
            eventPop:false,
            dataList:[],
            titleVal:'',
            lineList:[],//线路字典
            findStageList:[],//发现阶段字典
            isAdd:false,

            problemNum:'',//问题流水号
            line:'',//线路
            lineId:'',
            problemStage:'',//发现阶段
            stageId:'',
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
            accessory:[],//附件
        }
    },
    created(){
        console.log(this.$route.query.id)
        if(this.$route.query.id!=undefined){// 查看详情
            this.isAdd=false;
            seeDetail(this.$route.query.id).then(res=>{
                if(res.data.code==1000){
                    var detailData=res.data.data.problem;
                    this.problemNum=detailData.serialNumber;
                    this.line=detailData.line.name;
                    this.lineId=detailData.line.code;
                    this.problemStage=detailData.problemStage.name;
                    this.stageId=detailData.problemStage.code;
                    this.documentName=detailData.seekOpinion?detailData.seekOpinion.fileName:''
                    this.fileName=detailData.name
                    this.fileContent=detailData.description
                    this.problemAddr=detailData.address
                    this.rank=detailData.rank
                    this.problemEffeck=detailData.effect
                    this.idea=detailData.changeOpinion
                    this.findDept=detailData.findDepartment.deptName
                    this.findPerson=detailData.findEmployee
                    this.findTime=new Date(detailData.findTime).Format('yyyy-MM-dd hh:mm:ss')
                    this.reportPerson=detailData.reportEmployee.empName
                    this.reportTime=new Date(detailData.reportDate).Format('yyyy-MM-dd hh:mm:ss')
                    this.endTime=new Date(detailData.endTime).Format('yyyy-MM-dd hh:mm:ss')
                    this.dutyDept=detailData.dutyDepartment.deptName
                    this.liaisonPerson=detailData.liaisonEmployee.empName
                    this.approveStatus=detailData.processStatus==0?'待审批':(detailData.processStatus==1?'审批中':(detailData.processStatus==2?'审批通过':'审批否决'))
                    this.accessory=res.data.data.problemAttachments;
                }else{
                    this.$toast.fail(res.data.message); 
                }
            })
        }else{//新增
            this.isAdd=true
        }
        getLine().then(res=>{//获取线路
            res.data.code==200?this.lineList=res.data.data:this.$toast.fail(res.data.message)
        })
        getFind().then(res=>{//获取发现阶段
            res.data.code==200?this.findStageList=res.data.data:this.$toast.fail(res.data.message);
        })
        getRootDept().then(res=>{console.log(res)})
        // getDeptById().then(res=>{//获取部门
        //     res.data.code==200?console.log(res):this.$toast.fail(res.data.message);
        // })
        // getLiaison().thensoe(res=>{//获取联络人
        //     res.data.code==200?console.log(res):this.$toast.fail(res.data.message);
        // })
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
                this.accessory
            ).then(res=>{
                console.log("新增:",res)
                if(res.data.code==200){
                    this.$toast.success('添加成功');
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        addSubmitProblemFunc(){//保存
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
                this.accessory
            ).then(res=>{
                console.log("保存:",res)
                if(res.data.code==200){
                    this.$toast.success('保存成功');
                }else{
                   this.$toast.fail(res.data.message); 
                }
            })

        },
        updataProblemFunc(){//修改
            updateProblem(
                this.$route.query.id,
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
                this.accessory
            ).then(res=>{
                console.log("修改",res)
                if(res.data.code==200){
                    this.$toast.success('修改成功');
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        homeSubmit(){//提交
            var idArr=[this.$route.query.id];
            console.log(idArr)
            homeSubmitProblem(idArr).then(res=>{
                console.log("提交",res)
                if(res.data.code==200){
                    this.$toast.success('提交成功');
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
        clickFunc(popTitle,dataList,idx){//点击弹出选择器
            this.eventPop=true;
            this.titleVal=popTitle;
            this.dataList=dataList;
            this.idx=idx;
        },
        onConfirm(value, index){//选择器确认按钮事件
            this.eventPop=false;
            switch(this.idx){
                case 1:{
                    this.line=value.name;
                    this.lineId=value.code
                } break;
                case 2:{
                    this.problemStage=value.name;
                    this.stageId=value.code;
                }
            }
        },
        onCancel(){//选择器取消按钮事件
            this.eventPop=false;
            // switch(this.idx){
            //     case 1:{this.line=''} break;
            // }
            
        }

    }
}
</script>
<style scoped>
.detailTd{
    padding: 0;
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
