import http from './axios'

// 问题提报-列表
export function problemList(page,size,description,lineLike,dutyDeptLike){
    return http.fetchPost('/newline/mobile/ProblemList',{
        page,
        size,
        description,
        lineLike,
        dutyDeptLike
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
export function addProblem(serialNumber,line,problemStage,seekOpinion,name,description,address,rank,effect,changeOpinion,findDepartment,findEmployee,findTime,reportEmployee,reportDate,endTime,dutyDepartment,liaisonEmployee,processStatus,approvalTime,file){
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
        approvalTime,
        file
    })
}
//问题提报-修改
export function updateProblem(id,serialNumber,line,problemStage,seekOpinion,name,description,address,rank,effect,changeOpinion,findDepartment,findEmployee,findTime,reportEmployee,reportDate,endTime,dutyDepartment,liaisonEmployee,processStatus,approvalTime,file){
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
        approvalTime,
        file
    })
}
//问题提报-提交
export function homeSubmitProblem(ids){
    return http.fetchGet('/newline/mobile/homePageProblemSubmit',{ids})
}

//问题提报-保存提交
export function addSubmitProblem(serialNumber,line,problemStage,seekOpinion,name,description,address,rank,effect,changeOpinion,findDepartment,findEmployee,findTime,reportEmployee,reportDate,endTime,dutyDepartment,liaisonEmployee,processStatus,approvalTime,file){
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
        approvalTime,
        file
    })
}

//问题反馈-列表
export function feedbackList(page,size,type,description,lineId,deptName){
    return http.fetchPost('/newline/mobile/problemFollowFeedbackList',{
        page,
        size,
        type,
        description,
        lineId,
        deptName
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
    return http.fetchGet('/newline/mobile//problemFollowFeedbackInfoById',{id})
}
//问题反馈-问题详情
export function feedbackDetail(id){
    return http.fetchGet('/newline/mobile/problemById',{id})
}