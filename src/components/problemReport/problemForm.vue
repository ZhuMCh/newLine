<template>
<div>
    <van-nav-bar title="问题填写" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
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
                <van-field v-model="rank" placeholder="请选择问题等级" readonly @click="clickFunc('问题等级',rankList,3)"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">问题影响</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="problemEffeck" placeholder="请选择问题影响" readonly @click="clickFunc('问题影响',effectList,4)"/>
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
                <van-field placeholder="选择时间" v-model="findTime" readonly icon="notes-o" @click="findTimePop = true;"/>
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
                <van-field v-model="dutyDept" readonly :disabled="disabled"  @click="clickFunc('1',deptList,5)" placeholder="请选择部门"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="liaisonPerson" readonly/>
            </van-col>
        </van-row>
        <van-row  class="detailTr" v-if="majorShow">
            <van-col span="10" class="detailTh">专业</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="major" readonly @click="clickFunc('专业',majorList,6)" placeholder="请选择专业"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr" v-if="!isAdd">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">
                <van-field v-model="approveStatus" readonly />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="24" class="detailTd uploaderBox">
                <van-panel title="资料附件">
                    <div class="upload">
                        <img :src="item" alt="" v-for="(item,index) in filePreview" :key="index">
                        <img :src="item.path" alt="" v-for="(item,index) in filePath" :key="index">
                        <input type="file" ref="pathClear" multiple value="" @change="uploadFile">
                        <van-icon name="close" size="24px" style="vertical-align:middle;" @click="clearFile" v-if="fileArr.length>0"/>
                    </div>
                </van-panel>  
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
                <van-button size="large" @click="addProblemFunc" :disabled="canSubmit">保存</van-button>     
            </van-col>
            <van-col span="8" v-else>
                <van-button size="large" @click="updataProblemFunc" :disabled="canSubmit">修改</van-button>     
            </van-col>
            <van-col span="8" offset="8">
                <van-button size="large" @click="()=>{this.$router.go(-1)}">取消</van-button>        
            </van-col>
        </van-row>
    </div>
    
</div>
</template>
<script>
import { seeDetail,addProblem,addSubmitProblem,updateProblem,homeSubmitProblem,getLine,getFind,getRootDept,getDeptById,getLiaison,getUserInfo,getNextDept,getTaskName,getDic,getMajor,reportUpload } from '@/api/http'
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
            idx:1,
            lineList:[],//线路字典
            findStageList:[],//发现阶段字典
            deptList:[],//部门字典
            rankList:[],//等级字典
            effectList:[],//问题影响字典
            majorList:[],//专业
            isAdd:false,
            disabled:false,
            majorShow:false,
            taskStatus:'',
            canSubmit:false,

            problemNum:'',//问题流水号
            line:'',//线路
            lineId:'',
            problemStage:'',//发现阶段
            stageId:'',
            taskName:'',//任务名称
            taskNameId:'',
            fileName:'',//文件名称
            fileContent:'',//文件内容
            problemAddr:'',//问题地点
            rank:'',//等级
            rankId:'',
            problemEffeck:'',//问题影响
            effectId:'',
            idea:'',//整改意见
            findDept:'',//发现部门
            findDeptId:'',
            findPerson:'',//发现人
            findTime:'',//发现时间
            reportPerson:'',//提报人
            reportPersonId:'',
            reportTime:new Date().Format('yyyy-MM-dd hh:mm:ss'),//提报日期
            endTime:'',//需要整改完成时间
            dutyDept:'',//责任部门
            dutyDeptId:'',
            liaisonPerson:'',//联络员
            liaisonId:'',
            major:'',//专业
            majorId:'',
            approveStatus:'',//审批状态
            fileArr:[],//附件
            filePath:[],//详情回显文件接收
            filePreview:[],//文件上传预览
        }
    },
    created(){
        
        if(this.$route.query.id!=undefined){// 查看详情
            this.isAdd=false;
            seeDetail(this.$route.query.id).then(res=>{
                console.log("详情",res.data.data)
                if(res.data.code==200){
                    this.filePath=res.data.data.problemAttachments;
                    var detailData=res.data.data.problem;
                    this.problemNum=detailData.serialNumber;
                    this.line=detailData.line.name;
                    this.lineId=detailData.line.id;
                    this.problemStage=detailData.problemStage.name;
                    this.stageId=detailData.problemStage.id;
                    this.taskName=detailData.seekOpinion?detailData.seekOpinion.fileName:'';
                    this.taskNameId=detailData.seekOpinion?detailData.seekOpinion.id:'';
                    this.fileName=detailData.name;
                    this.fileContent=detailData.description;
                    this.problemAddr=detailData.address;

                    this.getRankAndEffect('WTDJ',detailData.rank,2);
                    this.getRankAndEffect('WTYX',detailData.effect,3);

                    this.idea=detailData.changeOpinion;
                    this.findDept=detailData.findDepartment.deptName;
                    this.findDeptId=detailData.findDepartment.deptId;
                    this.findPerson=detailData.findEmployee;
                    this.findTime=new Date(detailData.findTime).Format('yyyy-MM-dd hh:mm:ss');
                    this.reportPerson=detailData.reportEmployee.empName;
                    this.reportPersonId=detailData.reportEmployee.empId;
                    this.reportTime=new Date(detailData.reportDate).Format('yyyy-MM-dd hh:mm:ss');
                    this.endTime=new Date(detailData.endTime).Format('yyyy-MM-dd');
                    this.dutyDept=detailData.dutyDepartment.deptName;
                    this.dutyDeptId=detailData.dutyDepartment.deptId;
                    this.liaisonPerson=detailData.liaisonEmployee.empName;
                    this.liaisonId=detailData.liaisonEmployee.empId;
                    this.major=detailData.major?detailData.major.name:'';
                    this.majorId=detailData.major?detailData.major.id:'';
                    this.approveStatus=detailData.processStatus==0?'待提交':(detailData.processStatus==1?'审批中':(detailData.processStatus==2?'审批完成':'审批否决'))
                    this.accessory=res.data.data.problemAttachments;
                }else{
                    this.$toast.fail(res.data.message); 
                }
            })
        }else{//新增
            this.isAdd=true
            getUserInfo().then(res=>{//获取登录信息
                if(res.data.code==200&&res.data.data.length>0){
                    this.findDept=res.data.data[0].deptName;
                    this.findDeptId=res.data.data[0].deptId;
                    this.reportPerson=res.data.data[0].userName;
                    this.reportPersonId=res.data.data[0].id;
                }
            })
        }
        getLine().then(res=>{//获取线路
            res.data.code==200?this.lineList=res.data.data:this.$toast.fail(res.data.message)
        })
        getFind().then(res=>{//获取发现阶段
            res.data.code==200?this.findStageList=res.data.data:this.$toast.fail(res.data.message);
        })
        
        this.getRankAndEffect('WTDJ',null,0)//问题等级
        this.getRankAndEffect('WTYX',null,1)//问题影响
        // 获取责任部门
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
                console.log(res)
                if(res.data.code==200&&res.data.data){
                    if(res.data.data.length>0){
                        this.taskName=res.data.data[0].fileName;
                        this.taskNameId=res.data.data[0].id;
                        if(status=='SJLL'){
                            console.log(1)
                            this.disabled=true;
                            this.majorShow=true;
                            this.dutyDept=res.data.data[0].createEmp.department.parent?res.data.data[0].createEmp.department.parent.deptName:res.data.data[0].createEmp.department.deptName;
                            this.dutyDeptId=res.data.data[0].createEmp.department.parent?res.data.data[0].createEmp.department.parent.deptId:res.data.data[0].createEmp.department.deptId;
                            this.getLiaisonFunc(this.lineId,this.dutyDeptId);
                            getMajor(this.lineId,this.dutyDeptId).then(res=>{
                                if(res.data.code==200){
                                    this.majorList=res.data.data;
                                } 
                            })
                        }else{
                            this.disabled=false;
                            this.dutyDept='';
                            this.dutyDeptId='';
                            this.liaisonPerson='';
                            this.liaisonId='';
                            if(this.findDeptId==this.dutyDeptId){
                                this.majorShow=true;
                            }else{
                                this.majorShow=false;
                                this.major=null;
                                this.majorId=null;
                            }
                        }
                    }else{
                        if(status=='SJLL'){
                            this.majorShow=true;
                        }else{
                            if(this.findDeptId==this.dutyDeptId){
                                this.majorShow=true;
                            }else{
                                this.majorShow=false;
                                this.major=null;
                                this.majorId=null;
                            }
                        }
                    }
                }
            })
        },
        // 获取联络员
        getLiaisonFunc(lineId,deptId){
            getLiaison(lineId,deptId).then(res=>{
                if(res.data.code==200){
                    this.liaisonPerson=res.data.data?res.data.data.emp.empName:null;
                    this.liaisonId=res.data.data?res.data.data.emp.empId:null;
                }
            })
        },
        // 获取等级/问题影响
        getRankAndEffect(typeCode,dictCode,type){
            getDic(typeCode,dictCode).then(res=>{
                if(res.data.code==200){
                    if(type==0){
                        this.rankList=res.data.data
                    }else if(type==1){
                        this.effectList=res.data.data
                    }else if(type==2){
                        this.rank=res.data.data[0].name;
                        this.rankId=res.data.data[0].code;
                    }else if(type==3){
                        this.problemEffeck=res.data.data[0].name;
                        this.effectId=res.data.data[0].code;
                    }
                }
            })
        },

        addProblemFunc(){//保存(新增)问题
            console.log(this.fileArr)
            if(this.lineId==''||this.stageId==''||this.taskNameId==''||this.fileContent==''||this.problemAddr==''||this.rankId==''||this.effectId==''||this.idea==''||this.findPerson==''||this.endTime==''||this.dutyDeptId==''){
                this.$toast.fail(信息不完整无法提交);
            }else{
                this.canSubmit=true
                addProblem(
                    this.lineId,
                    this.stageId,
                    this.taskNameId,
                    this.fileName,
                    this.fileContent,
                    this.problemAddr,
                    this.rankId,
                    this.effectId,
                    this.idea,
                    this.findDeptId,
                    this.findPerson,
                    this.findTime,
                    this.reportPersonId,
                    this.reportTime,
                    this.endTime,
                    this.dutyDeptId,
                    this.liaisonId,
                    this.majorId,
                    this.fileArr
                ).then(res=>{
                    if(res.data.code==200){
                        this.$toast.success(res.data.message);
                        setTimeout(()=>{
                            this.$router.go(-1)
                        },1500)
                    }else{
                        this.$toast.fail(res.data.message);
                        this.canSubmit=false
                    }
                })
            }
        },
        updataProblemFunc(){//修改
            this.canSubmit=true
            updateProblem(
                this.$route.query.id,
                this.lineId,
                this.stageId,
                this.taskNameId,
                this.fileName,
                this.fileContent,
                this.problemAddr,
                this.rankId,
                this.problemEffeck,
                this.idea,
                this.findDeptId,
                this.findPerson,
                this.findTime,
                this.reportPersonId,
                this.reportTime,
                this.endTime,
                this.dutyDeptId,
                this.liaisonId,
                this.majorId
            ).then(res=>{
                if(res.data.code==200){
                    this.$toast.success(res.data.message);
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }else{
                    this.$toast.fail(res.data.message);
                    this.canSubmit=false
                }
            })
        },
        addSubmitProblemFunc(){//保存提交
            addSubmitProblem(
                this.lineId,
                this.stageId,
                this.taskNameId,
                this.fileName,
                this.fileContent,
                this.problemAddr,
                this.rankId,
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
                    this.$toast.success('保存成功');
                }else{
                   this.$toast.fail(res.data.message); 
                }
            })
        },
        homeSubmit(){//提交
            var idArr=[this.$route.query.id];
            homeSubmitProblem(idArr).then(res=>{
                console.log("提交",res)
                if(res.data.code==200){
                    this.$toast.success('提交成功');
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        uploadFile(file){
            for(var i=0;i<file.target.files.length;i++){
                reportUpload(file.target.files[i]).then(res=>{
                    if(res.data.obj){
                        this.fileArr.push({name:res.data.obj.fileName,path:res.data.obj.path});
                    }else{
                        this.$toast.fail(res.data.msg)
                        this.$refs. pathClear.value ='';
                        this.fileArr=[];
                        this.filePreview=[];
                    }   
                })

                var fileObj = file.target.files[i];
                var type = fileObj.type.split('/')[0];
                if ( type === 'image' ){
                    //将图片img转化为base64
                    var reader = new FileReader();
                    reader.readAsDataURL(fileObj);
                    var that = this;
                    reader.onloadend = function () {
                        var dataURL = reader.result;
                        var blob = that.dataURItoBlob(dataURL);
                        that.filePreview.push(dataURL)
                    };
                }
            }
        },
        clearFile(){
            this.$refs. pathClear.value ='';
            this.fileArr=[];
            this.filePreview=[];
        },
        dataURItoBlob (dataURI) {
            // base64 解码
            let byteString = window.atob(dataURI.split(',')[1]);
            let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            let T = mimeString.split('/')[1];
            let ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
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
        clickFunc(popTitle,dataList,idxs){//点击弹出选择器
            this.idx=idxs;
            if(idxs==5){
                this.deptPop=true;
            }else{
                this.eventPop=true;
                this.titleVal=popTitle;
                this.dataList=dataList;
            }
            if(idxs==2){
                if(this.line==''){
                    this.eventPop=false;
                    this.$toast.fail("请先选择线路");
                } 
            }
            if(idxs==6){
                if(this.dutyDeptId==''){
                    this.eventPop=false;
                    this.$toast.fail("请先选择责任部门");
                }
            }  
        },
        onConfirm(value, index){//选择器确认按钮事件
            this.eventPop=false;
            this.deptPop=false;
            switch(this.idx){
                case 1:{
                    this.line=value.name;
                    this.lineId=value.id
                } break;
                case 2:{
                    this.taskName=null;
                    this.taskNameId=null;
                    this.problemStage=value.name;
                    this.stageId=value.id;
                    this.taskStatus=value.processName;
                    if(value.processName=='GK'){
                        this.getTeskNameFunc(this.lineId,value.id,null)
                    }else if(value.processName=='ZB'){
                        this.taskName=null;
                        this.taskNameId=null;
                    }else{
                        this.getTeskNameFunc(this.lineId,value.id,value.processName)
                    }
                } break;
                case 3:{
                    this.rank=value.name;
                    this.rankId=value.code;
                } break;
                case 4:{
                    this.problemEffeck=value.name;
                    this.effectId=value.code;
                } break;
                case 5:{
                    this.dutyDept=value.deptName;
                    this.dutyDeptId=value.deptId;
                    this.getLiaisonFunc(this.lineId,value.deptId);
                    if(this.findDeptId==value.deptId||this.taskStatus=='SJLL'){
                        this.majorShow=true;
                    }else{
                        this.majorShow=false;
                        this.major=null;
                        this.majorId=null;
                    }
                    getMajor(this.lineId,value.deptId).then(res=>{
                        if(res.data.code==200){
                            this.majorList=res.data.data;
                        } 
                    })
                } break;
                case 6:{
                    this.major=value.name;
                    this.majorId=value.id;
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
.upload img{
    width: 90px;
    height: 90px;
    margin:10px;
}
.btnBox{
    padding: 0 10px 20px;
}
.btnBox .van-button{
    background-color: #1bbc9a;
}
</style>
<style>
.uploaderBox .van-panel{
    width:100%;
}
.uploaderBox .van-panel__header{
    width:100%;
    text-align:left;
    color:#1bbc9a;
    padding:0 0 5px 35px;
}
.uploaderBox .van-cell:not(:last-child)::after{
    left:0;
}
.uploaderBox [class*=van-hairline]::after{
    border:none;
}
.uploaderBox .upload{
    width:100%;
    padding:20px 0;
}
</style>