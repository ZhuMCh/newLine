import Mock from 'mockjs'

const Random=Mock.Random

let problemList=[]
for(let i=0;i<10;i++){
    let mockData={
        'id':i,
        'serialNumber':/\d{10}/,
        'description|1':['打架斗殴','随地吐痰','车辆出轨'],
        'dutyDeptLike|1':['车辆部','站务部','宣传部','保安部'],
        'reportEmployee':Random.cname(),
        'reportDate':Random.date('yyyy-MM-dd'),
        'processStatus|1':['未提交','已提交']
    }
    problemList.push(mockData)
}

Mock.mock('/newline/mobile/ProblemList', 'post', {'code':200,problemList})
Mock.mock('/newline/mobile/homePageProblemSubmit','get',{'code|1':[200,500],'message':'提交失败'})
Mock.mock('/newline/mobile/delProblem','get',{'code|1':[200,500],'message':'删除失败'})