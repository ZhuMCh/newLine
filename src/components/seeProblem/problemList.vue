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
                <van-field clearable class="inputBox" v-model="line"/>
            </van-col>
        </van-row>
        <br>
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">责任部门</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox" v-model="dutyDept"/>
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
                        <van-col class="td">{{item.problemCod}}</van-col>
                        <van-col class="td">{{item.address}}</van-col>
                        <van-col class="td">{{item.description}}</van-col>
                        <van-col class="td">{{item.dutyDepartment.deptName}}</van-col>
                        <van-col class="td">{{item.reportEmployee.empName}}</van-col>
                        <van-col class="td">{{item.reportDate}}</van-col>
                    </van-row>
                </router-link>
            </van-list>
        </div>
    </div>
</div>
</template>
<script>
import { seeProblemList,getLine,getRootDept,getNextDept } from '@/api/http'
export default {
    data(){
        return {
            pageNo:1,
            pageSize:10,
            type:1,//1,2
            description:null,
            line:null,
            dutyDept:null,
            findPerson:null,
            problemList:[],

            loading: false,
            finished: false,
            totalRows:0
        }
    },
    created(){
        this.getProblemListData();
    },
    methods:{
        getProblemListData(){//获取问题反馈列表数据
            seeProblemList(this.pageNo,this.pageSize,this.description,this.line,this.dutyDept,this.findPerson).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.problemList=res.data.data.list;
                    this.totalRows=res.data.data.totalCount;
                    console.log(this.totalRows)
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        loadMore() {//加载更多
            // 异步更新数据
            console.log("loadMore",this.totalRows,this.pageSize)
            setTimeout(() => {
                // 加载状态结束
                this.loading = false;
                if (this.totalRows<= this.pageSize) {
                    // 数据全部加载完成
                    this.finished = true;
                }else{
                    console.log(123)
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

