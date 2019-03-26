import Mock from 'mockjs'

const Random=Mock.Random

let problemList=[]
for(let i=0;i<10;i++){
    let mockData={
        'id':i,
        'serialNumber':/\d{10}/,
        'description|1':Random.ctitle(),
        'dutyDeptLike|1':['车辆部','站务部','宣传部','保安部'],
        'reportEmployee':Random.cname(),
        'reportDate':Random.date('yyyy-MM-dd'),
        'processStatus|1':['未提交','审批中','已通过']
    }
    problemList.push(mockData)
}

Mock.mock('/newline/mobile/ProblemList', 'post', {'code':200,problemList})
Mock.mock('/newline/mobile/homePageProblemSubmit','get',{'code|1':[200,500],'message':'提交失败'})
Mock.mock('/newline/mobile/delProblem','get',{'code|1':[200,500],'message':'删除失败'})
Mock.mock('/newline/mobile/Problem?id=','get',{'code':200,'detail':{
    'problemNum':/\d{10}/,//问题流水号
    'line':Random.natural(1, 10),//线路
    'problemStage':Random.cword(),//发现阶段
    'documentName':Random.ctitle(),//文档名称
    'fileName':Random.ctitle(),//文件名称
    'fileContent':Random.csentence(),//文件内容
    'problemAddr':Random.region(),//问题地点
    'rank|1':['A级','B级','C级'],//等级
    'problemEffeck':Random.cparagraph(),//问题影响
    'idea':Random.cparagraph(),//整改意见
    'findDept|1':['车辆部','站务部','宣传部','保安部'],//发现部门
    'findPerson':Random.cname(),//发现人
    'findTime':Random.date('yyyy-MM-dd'),//发现时间
    'reportPerson':Random.cname(),//提报人
    'reportTime':Random.date('yyyy-MM-dd'),//提报日期
    'endTime':Random.date('yyyy-MM-dd'),//需要整改完成时间
    'dutyDept|1':['车辆部','站务部','宣传部','保安部'],//责任部门
    'liaisonPerson':Random.cname(),//联络员
    'approveStatus|1':['未提交','审批中','已通过'],//审批状态
    'approveTime':Random.natural(2, 7),//审批时限
    'accessory':Random.image()//附件
}})