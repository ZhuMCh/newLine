import http from './axios'
//登录
export function loginForWx(){
    return http.fetchGet('/newline/mobile/user/login')
}
export function loginFowPwd(){
    return http.fetchPost('/newline/mobile/user')
}
// 问题提报-列表
export function problemList(page,size,description,lineLike,dutyDeptLike,tabStatus){
    return http.fetchPost('/newline/mobile/ProblemList',{
        "page":page,
        "size":size,
        "description":description,
        "lineLike":lineLike,
        "dutyDeptLike":dutyDeptLike,
        "tabStatus":tabStatus
    })
}
//问题提报-查看详情
export function seeDetail(id){
    return http.fetchGet('/newline/mobile/Problem',{id})
}
//问题提报-批量删除
export function delProblem(ids){
    return http.fetchGet('/newline/mobile/delProblem',{ids})
}
// 问题提报-新增
export function addProblem(serialNumber,line,problemStage,seekOpinion,name,description,address,rank,effect,changeOpinion,findDepartment,findEmployee,findTime,reportEmployee,reportDate,endTime,dutyDepartment,liaisonEmployee,processStatus,file){
    return http.fetchPost('/newline/mobile/addProblem',{
        serialNumber,
        line,
        problemStage,
        seekOpinion,
        name,
        description,
        address,
        rank,
        effect,
        changeOpinion,
        findDepartment,
        findEmployee,
        findTime,
        reportEmployee,
        reportDate,
        endTime,
        dutyDepartment,
        liaisonEmployee,
        processStatus,
        file
    })
}
//问题提报-修改
export function updateProblem(id,serialNumber,line,problemStage,seekOpinion,name,description,address,rank,effect,changeOpinion,findDepartment,findEmployee,findTime,reportEmployee,reportDate,endTime,dutyDepartment,liaisonEmployee,processStatus,file){
    return http.fetchPost('/newline/mobile/updateProblem',{
        id,
        serialNumber,
        line,
        problemStage,
        seekOpinion,
        name,
        description,
        address,
        rank,
        effect,
        changeOpinion,
        findDepartment,
        findEmployee,
        findTime,
        reportEmployee,
        reportDate,
        endTime,
        dutyDepartment,
        liaisonEmployee,
        processStatus,
        file
    })
}
//问题提报-提交
export function homeSubmitProblem(ids){
    return http.fetchGet('/newline/mobile/homePageProblemSubmit',{ids})
}

//问题提报-保存提交
export function addSubmitProblem(serialNumber,line,problemStage,seekOpinion,name,description,address,rank,effect,changeOpinion,findDepartment,findEmployee,findTime,reportEmployee,reportDate,endTime,dutyDepartment,liaisonEmployee,processStatus,file){
    return http.fetchPost('/newline/mobile/addProblemSubmit',{
        serialNumber,
        line,
        problemStage,
        seekOpinion,
        name,
        description,
        address,
        rank,
        effect,
        changeOpinion,
        findDepartment,
        findEmployee,
        findTime,
        reportEmployee,
        reportDate,
        endTime,
        dutyDepartment,
        liaisonEmployee,
        processStatus,
        file
    })
}

//问题反馈-列表
export function feedbackList(page,size,type,description,lineId,deptName){
    return http.fetchPost('/newline/mobile/problemFollowFeedbackList',{
        "page":page,
        "size":size,
        "type":type,
        "description":description,
        "lineId":lineId,
        "deptName":deptName
    })
}
//问题反馈-反馈
export function feedbackSubmit(problemId,docAttachmentFile,recordDescription){
    return http.fetchPost('/newline/mobile/addProblemFollowFeedback',{
        problemId,
        docAttachmentFile,
        recordDescription,
    })
}
//问题反馈-反馈详情
export function feedbackSubmitDetail(id){
    return http.fetchGet('/newline/mobile/problemFollowFeedbackInfoById',{id})
}
//问题反馈-问题详情
export function feedbackDetail(id){
    return http.fetchGet('/newline/mobile/problemById',{id})
}

// 字典
//获取线路
export function getLine(lineId){
    return http.fetchPost('/newline/mobile/getLine',{lineId})
}
//获取发现阶段
export function getFind(psId){
    return http.fetchPost('/newline/mobile/getProblemStage',{psId})
}
//获取字典数据
export function getDic(dictCode,typeCode){
    return http.fetchGet('/newline/mobile/getDic',{dictCode,typeCode})
}
//获取用户信息
export function getUserInfo(){
    return http.fetchPost('/newline/mobile/getLoginManData')
}
//获取任务名称
export function getTaskName(lineId,problemStageId){
    return http.fetchGet('/newline/mobile/selectSeekOpinion',{lineId,problemStageId})
}
//获取联络员
export function getLiaison(lineId,dutyDepartmentId){
    return http.fetchPost('/newline/mobile/selectLiaisonByDutyDeptAndLine',{lineId,dutyDepartmentId})
}
//获取专业
export function getMajor(lineId,dutyDepartmentId){
    return http.fetchPost('/newline/mobile/majorByDept',{lineId,dutyDepartmentId})
}
//获取某个公司
export function getCompany(){
    return http.fetchGet('/newline/mobile/getComp?compNo=06')
}
//获取某个公司根部门
export function getRootDept(){
    return http.fetchGet('/newline/mobile/RootDepartsByComp?compNo=06')
}
//获取某个部门下级部门
export function getNextDept(){
    return http.fetchGet('/newline/mobile/Children',{deptId})
}
//获取某个部门
export function getDeptById(deptIds){
    return http.fetchGet('/newline/mobile/getDeptById',{deptIds})
}