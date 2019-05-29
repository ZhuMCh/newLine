<template>
<div>
    <van-nav-bar title="问题提报" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题流水号</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="problemNum" readonly placeholder="系统自动生成"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">线路</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="line" readonly @click="clickFunc('线路',lineList,1)" placeholder="请选择线路"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现阶段</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="problemStage" readonly  @click="clickFunc('发现阶段',findStageList,2)" placeholder="请选择阶段"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">任务名称</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="taskName" readonly />
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
                <van-field readonly v-model="findDept"/>
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
                <van-field v-model="reportPerson" readonly/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">提报日期</van-col>
            <van-col span="14" class="detailTd">
                <van-field readonly v-model="reportTime"/>
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
                <van-field v-model="dutyDept" readonly :disabled="disabled"  @click="clickFunc('1',deptList,3)" placeholder="请选择部门"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="liaisonPerson" readonly :disabled="disabled"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="approveStatus" readonly/>
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
    <!-- 部门选择器 -->
    <van-popup v-model="deptPop" position="bottom" :overlay="true">
        <van-picker show-toolbar title="责任部门" :columns="deptList" value-key='deptName' @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
    <div class="btnBox">
        <van-row gutter="20">
            <!-- <van-col span="8" v-if="isAdd">
                <van-button size="large" @click="addProblemFunc">添加</van-button>        
            </van-col> -->
            <!-- <van-col span="8" v-else>
                <van-button size="large" @click="homeSubmit">提交</van-button>        
            </van-col> -->
            <van-col span="8" v-if="isAdd">
                <van-button size="large" @click="addProblemFunc">保存</van-button>     
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
import { seeDetail,addProblem,addSubmitProblem,updateProblem,homeSubmitProblem,getLine,getFind,getRootDept,getDeptById,getLiaison,getUserInfo,getNextDept,getTaskName } from '@/api/http'
export default {
    data(){
        return {
            currentDate: new Date(),
            findTimePop:false,
            endTimePop:false,
            eventPop:false,
            deptPop:false,
            dataList:[],
            titleVal:'',
            lineList:[],//线路字典
            findStageList:[],//发现阶段字典
            deptList:[],
            isAdd:false,
            disabled:false,

            problemNum:'',//问题流水号
            line:'',//线路
            lineId:'',
            problemStage:'',//发现阶段
            stageId:'',
            taskName:'',//文档名称
            fileName:'',//文件名称
            fileContent:'',//文件内容
            problemAddr:'',//问题地点
            rank:'',//等级
            problemEffeck:'',//问题影响
            idea:'',//整改意见
            findDept:'',//发现部门
            findDeptId:'',
            findPerson:'',//发现人
            findTime:'',//发现时间
            reportPerson:'',//提报人
            reportPersonId:'',
            reportTime:new Date().Format('yyyy-MM-dd'),//提报日期
            endTime:'',//需要整改完成时间
            dutyDept:'',//责任部门
            dutyDeptId:'',
            liaisonPerson:'',//联络员
            liaisonId:'',
            approveStatus:'',//审批状态
            accessory:[],//附件
        }
    },
    created(){
        if(this.$route.query.id!=undefined){// 查看详情
            this.isAdd=false;
            seeDetail(this.$route.query.id).then(res=>{
                if(res.data.code==1000){
                    var detailData=res.data.data.problem;
                    this.problemNum=detailData.serialNumber;
                    this.line=detailData.line.name;
                    this.lineId=detailData.line.id;
                    this.problemStage=detailData.problemStage.name;
                    this.stageId=detailData.problemStage.id;
                    this.getTeskNameFunc(detailData.line.id,detailData.problemStage.id);
                    this.fileName=detailData.name;
                    this.fileContent=detailData.description;
                    this.problemAddr=detailData.address;
                    this.rank=detailData.rank;
                    this.problemEffeck=detailData.effect;
                    this.idea=detailData.changeOpinion;
                    this.findDept=detailData.findDepartment.deptName;
                    this.findDeptId=detailData.findDepartment.deptId;
                    this.findPerson=detailData.findEmployee;
                    this.findTime=new Date(detailData.findTime).Format('yyyy-MM-dd hh:mm:ss')
                    this.reportPerson=detailData.reportEmployee.empName;
                    this.reportPersonId=detailData.reportEmployee.empId;
                    this.reportTime=new Date(detailData.reportDate).Format('yyyy-MM-dd hh:mm:ss')
                    this.endTime=new Date(detailData.endTime).Format('yyyy-MM-dd hh:mm:ss')
                    this.dutyDept=detailData.dutyDepartment.deptName;
                    this.dutyDeptId=detailData.dutyDepartment.deptId;
                    this.liaisonPerson=detailData.liaisonEmployee.empName;
                    this.liaisonId=detailData.liaisonEmployee.empId;
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
        getUserInfo().then(res=>{//获取登录信息
            console.log("登录人信息",res)
            if(res.data.code==200){
                this.findDept=res.data.data[0].deptName;
                this.findDeptId=res.data.data[0].deptId;
                this.reportPerson=res.data.data[0].userName
                this.reportPersonId=res.data.data[0].id
            }
        })
        // 获取部门
        getRootDept().then(res=>{
            if(res.data.code==200){
                var oneDept=res.data.data
                for(var i=0;i<oneDept.length;i++){
                    if(oneDept[i].deptName!="西海岸运营中心"){
                        this.deptList.push(oneDept[i])
                    }else{  
                        getNextDept(oneDept[i].deptId).then(resp=>{
                            if(resp.data.code==200){
                                for(var j=0;j<resp.data.data.length;j++){
                                    this.deptList.push(resp.data.data[j])
                                }
                            }
                        }) 
                    }
                }
            }
        })
    },
    methods: {
        //获取任务名称
        getTeskNameFunc(lineId,stageId,status){
            getTaskName(lineId,stageId).then(res=>{
                if(res.data.code==200){
                    console.log(res)
                    this.taskName=res.data.data[0].fileName;
                    this.taskNameId=res.data.data[0].id;
                    if(status=='SJLL'){
                        this.disabled=true;
                        this.deptName=res.data.data[0].createEmp.department.parent?res.data.data[0].createEmp.department.parent.deptName:res.data.data[0].createEmp.department.deptName;
                        this.deptNameId=res.data.data[0].createEmp.department.parent?res.data.data[0].createEmp.department.parent.deptId:res.data.data[0].createEmp.department.deptId;
                        this.liaisonPerson=res.data.data[0].empName;
                        this.liaisonId=res.data.data[0].empId;
                    }
                }
            })
        },

        addProblemFunc(){//保存(新增)问题
            addProblem(
                this.lineId,
                this.stageId,
                this.taskNameId,
                this.fileName,
                this.fileContent,
                this.problemAddr,
                this.rank,
                this.problemEffeck,
                this.idea,
                this.findDeptId,
                this.findPerson,
                this.findTime,
                this.reportPersonId,
                this.reportTime,
                this.endTime,
                this.dutyDeptId,
                this.liaisonId
            ).then(res=>{
                if(res.data.code==200){
                    this.$toast.success(res.data.message);
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        addSubmitProblemFunc(){//提交
            addSubmitProblem(
                this.lineId,
                this.stageId,
                this.taskNameId,
                this.fileName,
                this.fileContent,
                this.problemAddr,
                this.rank,
                this.problemEffeck,
                this.idea,
                this.findDeptId,
                this.findPerson,
                this.findTime,
                this.reportPersonId,
                this.reportTime,
                this.endTime,
                this.dutyDeptId,
                this.liaisonId
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
                this.lineId,
                this.stageId,
                this.taskNameId,
                this.fileName,
                this.fileContent,
                this.problemAddr,
                this.rank,
                this.problemEffeck,
                this.idea,
                this.findDeptId,
                this.findPerson,
                this.findTime,
                this.reportPersonId,
                this.reportTime,
                this.endTime,
                this.dutyDeptId,
                this.liaisonId
            ).then(res=>{
                console.log("修改",res)
                if(res.data.code==200){
                    this.$toast.success(res.data.message);
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
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
            this.idx=idx;
            if(idx==3){
                this.deptPop=true;
            }else{
                this.eventPop=true;
                this.titleVal=popTitle;
                this.dataList=dataList;
            }
            if(idx==2){
                if(this.line==''){
                    this.eventPop=false;
                    this.$toast.fail("请先选择线路");
                } 
            }  
        },
        onConfirm(value, index){//选择器确认按钮事件
            console.log(value);
            this.eventPop=false;
            this.deptPop=false;
            switch(this.idx){
                case 1:{
                    this.line=value.name;
                    this.lineId=value.id
                } break;
                case 2:{
                    this.problemStage=value.name;
                    this.stageId=value.id;
                    if(value.processName=='GK'){
                        this.getTeskNameFunc(this.lineId,value.id)
                    }else if(value.processName=='ZB'){
                        this.taskName=null;
                        this.taskNameId=null;
                    }else{
                        this.getTeskNameFunc(this.lineId,value.id)
                    }
                } break;
                case 3:{
                    this.dutyDept=value.deptName;
                    this.dutyDeptId=value.deptId;
                    getLiaison(this.lineId,value.deptId).then(res=>{
                        console.log(res)
                        if(res.data.code==200){
                            this.liaisonPerson=res.data.data?res.data.data.emp.empName:null;
                            this.liaisonId=res.data.data?res.data.data.emp.empId:null;
                        }
                    })
                } break;
            }
        },
        onCancel(){//选择器取消按钮事件
            this.eventPop=false;
            this.deptPop=false;
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
