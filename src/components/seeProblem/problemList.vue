<template>
<div>
    <van-nav-bar title="问题信息查看" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">问题描述</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox" v-model="description"/>
            </van-col>
            <van-col span="3" class="inputLabel">线路</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox" readonly v-model="line" @click="clickFunc(0)"/>
            </van-col>
        </van-row>
        <br>
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">责任部门</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox"  readonly v-model="dutyDept" @click="clickFunc(1)"/>
            </van-col>
            <van-col span="4" class="inputLabel">发现人</van-col>
            <van-col span="7">
                <van-field clearable class="inputBox" v-model="findPerson"/>
            </van-col>
        </van-row>
        <br>
        <van-row gutter="32">
            <van-col span="6" offset="18">
                <van-button size="small" @click="getProblemListData">查询</van-button>        
            </van-col>
        </van-row>
        <br>
        <div class="table">
            <van-row class="tr">
                <van-col class="th">问题编号</van-col>
                <van-col class="th">问题地点</van-col>
                <van-col class="th">问题描述</van-col>
                <van-col class="th">责任部门</van-col>
                <van-col class="th">提报人</van-col>
                <van-col class="th">提报日期</van-col>
            </van-row>
            <van-row class="tr" v-if="problemList.length==0">
                <van-col class="td">暂无数据</van-col>
            </van-row>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :offset="5">
                <router-link :to="{path:'/problemList/detail',query:{id:item.id}}" v-for="(item,index) in problemList" :key="index">
                    <van-row class="tr">
                        <van-col class="td">{{item.id}}</van-col>
                        <van-col class="td">{{item.address}}</van-col>
                        <van-col class="td">{{item.description}}</van-col>
                        <van-col class="td">{{item.dutyDepartment.deptName}}</van-col>
                        <van-col class="td">{{item.reportEmployee.empName}}</van-col>
                        <van-col class="td">{{new Date(item.reportDate).Format('yyyy-MM-dd hh:mm:ss')}}</van-col>
                    </van-row>
                </router-link>
            </van-list>
        </div>
    </div>
    <!-- 线路选择器 -->
    <van-popup v-model="linePop" position="bottom" :overlay="true">
        <van-picker show-toolbar title="线路" :columns="lineList" value-key='name' @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
    <!-- 部门选择器 -->
    <van-popup v-model="deptPop" position="bottom" :overlay="true">
        <van-picker show-toolbar title="责任部门" :columns="deptList" value-key='deptName' @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
</div>
</template>
<script>
import { feedbackList,getLine,getRootDept,getNextDept } from '@/api/http'
export default {
    data(){
        return {
            idx:0,
            linePop:false,
            deptPop:false,
            deptList:[],//部门字典
            lineList:[],//线路字典

            pageNo:1,
            pageSize:10,
            type:1,//1,2
            description:'',
            line:'',
            lineId:'',
            dutyDept:'',
            dutyDeptId:'',
            findPerson:'',
            problemList:[],

            loading: false,
            finished: false,
            totalRows:0
        }
    },
    created(){
        this.getProblemListData();
        getLine().then(res=>{//获取线路
            res.data.code==200?this.lineList=res.data.data:this.$toast.fail(res.data.message)
        })
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
    methods:{
        getProblemListData(){//获取问题反馈列表数据
            feedbackList(this.pageNo,this.pageSize,this.type,this.description,this.lineId,this.dutyDeptId).then(res=>{
                console.log(res)
                if(res.data.code==0){
                    this.problemList=res.data.data.content;
                    this.totalRows=res.data.data.totalPages;
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        //点击弹出选择器
        clickFunc(idx){
            this.idx=idx;
            if(idx==0){
                this.linePop=true
            }else{
                this.deptPop=true
            }
        },
        // 选择器确认事件
        onConfirm(value, index){
            this.linePop=false
            this.deptPop=false
            if(this.idx==0){
                this.line=value.name;
                this.lineId=value.id
            }else{
                this.dutyDept=value.deptName;
                this.dutyDeptId=value.deptId;
            }
        },
        // 选择器取消事件
        onCancel(){
            this.linePop=false
            this.deptPop=false
            if(this.idx==0){
                this.line=null;
                this.lineId=null
            }else{
                this.dutyDept='';
                this.dutyDeptId='';
            }
        },
        loadMore() {//加载更多
            // 异步更新数据
            setTimeout(() => {
                // 加载状态结束
                this.loading = false;
                if (this.totalRows<= this.pageSize) {
                    // 数据全部加载完成
                    this.finished = true;
                }else{
                    this.pageSize+=10;
                    this.getProblemListData()
                }
            }, 2000);
        },
    }
}
</script>
<style scoped>
van-button{
    background-color:#52B8D6;
}
.selectAll,.selectOne{
    flex: 0.5 !important;
    display:flex;
    align-items:center;
    justify-content: center;
}
.selectAll input[type="checkbox"], .selectOne input[type="checkbox"]{
    width: 18px;
    height: 18px;
}
</style>

