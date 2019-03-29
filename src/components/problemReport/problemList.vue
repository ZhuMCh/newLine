<template>
<div>
    <van-nav-bar title="问题提报" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">问题描述</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox" v-model="problemDesc"/>
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
        </van-row>
        <br>
        <van-row gutter="20">
            <van-col span="6">
                <van-button size="small" @click="getProblemListData">查询</van-button>        
            </van-col>
            <van-col span="6">
                <router-link to="/problemReport/problemForm">
                    <van-button size="small">新增</van-button>  
                </router-link>      
            </van-col>
            <van-col span="6">
                <van-button size="small" @click="homeSubmitProblem">提交</van-button>        
            </van-col>
            <van-col span="6">
                <van-button size="small" @click="handleDelete">删除</van-button>        
            </van-col>
        </van-row>
        <br>
        <div class="table">
            <van-row class="tr">
                <van-col class="selectAll"><input type="checkbox" :checked="problemList.length===ids.length&&ids.length" @click="checkAll"></van-col>
                <van-col style="flex:5;">
                    <van-row class="tr" style="border-bottom:none;border-right:none;">
                        <van-col class="th">问题流水号</van-col>
                        <van-col class="th">问题描述</van-col>
                        <van-col class="th">责任部门</van-col>
                        <van-col class="th">提报人</van-col>
                        <van-col class="th">提报日期</van-col>
                        <van-col class="th">审批状态</van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row class="tr" v-if="problemList.length==0">
                <van-col class="td">暂无数据</van-col>
            </van-row>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :offset="5">
                <van-row class="tr" v-for="(item,index) in problemList" :key="index">
                    <van-col class="selectOne"><input type="checkbox" :checked="ids.indexOf(item.id)>=0" @click="checkOne(item.id)"></van-col>
                    <van-col style="flex:5;">
                        <router-link :to="{path:'/problemReport/problemForm',query:{id:item.id}}">
                            <van-row class="tr" style="border-bottom:none;border-right:none;">
                                <van-col class="td">{{item.serialNumber}}</van-col>
                                <van-col class="td">{{item.description}}</van-col>
                                <van-col class="td">{{item.dutyDeptLike}}</van-col>
                                <van-col class="td">{{item.reportEmployee}}</van-col>
                                <van-col class="td">{{item.reportDate}}</van-col>
                                <van-col class="td">{{item.processStatus}}</van-col>
                            </van-row>
                        </router-link>
                    </van-col>
                </van-row>
            </van-list>
        </div>
    </div>
    
</div>
</template>
<script>
import { problemList,homeSubmitProblem,delProblem } from '@/api/http'
export default {
    data(){
        return {
            pageNo:1,
            pageSize:10,
            problemDesc:'',
            line:'',
            dutyDept:'',
            ids:[],
            problemList:[],
            loading: false,
            finished: false,
        }
    },
    created(){
        this.getProblemListData();
    },
    methods:{
        getProblemListData(){//问题列表
            problemList(this.pageNo,this.pageSize,this.problemDesc,this.line,this.dutyDept).then(res=>{
                if(res.data.code==200){
                    console.log(res);
                    this.problemList=this.problemList.concat(res.data.problemList)
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        homeSubmitProblem(){//提交
            this.ids=[]//测试用
            homeSubmitProblem(this.ids).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.$toast.success('提交成功');
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        handleDelete(){//批量删除
            this.ids=[]//测试用
            delProblem(this.ids).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.$toast.success('删除成功');
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        checkAll(e){//全选
            this.isCheckedAll = e.target.checked;
            if (this.isCheckedAll) {//全选时
                this.ids = []
                this.problemList.forEach(item => {
                    this.ids.push(item.id)
                })
            } else {
                this.ids = []
            }
        },
        checkOne(id){//单选
            let idIndex = this.ids.indexOf(id)
            if (idIndex >= 0) {//如果已经包含就去除
                this.ids.splice(idIndex, 1)
            } else {//如果没有包含就添加
                this.ids.push(id)
            }
        },
        loadMore() {
            console.log('开始加载')
            // 异步更新数据
            setTimeout(() => {
                this.getProblemListData();
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                // if (this.problemList.length >= 40) {
                    this.finished = true;
                // }
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

