import http from './axios'

// 问题提报-列表
export function problemList(page,size,desc,lineLike,dutyDeptLike){
    return http.fetchPost('/newline/mobile/ProblemList',{
        'page':page,
        'size':size,
        'description':desc,
        'lineLike':lineLike,
        'dutyDeptLike':dutyDeptLike
    })
}
//问题提报-查看详情
export function seeDetail(id){
    return http.fetchGet('/newline/mobile/Problem',{'id':id})
}
//问题提报-批量删除
export function delProblem(id){
    return http.fetchGet('/newline/mobile/delProblem',{'ids':ids})
}
// 问题提报-新增
export function addProblem(){
    return http.fetchPost('/newline/mobile/addProblem',{

    })
}
//问题提报-修改
export function pdateProblem(id,...arge){
    return http.fetchPost('/newline/mobile/addProblem',{
        'id':id
    })
}
//问题提报-提交
export function homeSubmitProblem(ids){
    return http.fetchGet('/newline/mobile/homePageProblemSubmit',{'ids':ids})
}

//问题提报-保存提交
export function addSubmitProblem(){
    return http.fetchPost('/newline/mobile/addProblemSubmit',{

    })
}