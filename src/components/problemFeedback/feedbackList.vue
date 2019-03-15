<template>
<div>
    <van-nav-bar title="问题跟踪反馈" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">问题描述</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox" v-model="description"/>
            </van-col>
            <van-col span="3" class="inputLabel">线路</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox" v-model="lineId"/>
            </van-col>
        </van-row>
        <br>
        <van-row gutter="10">
            <van-col span="5" class="inputLabel">责任部门</van-col>
            <van-col span="8">
                <van-field clearable class="inputBox" v-model="deptName"/>
            </van-col>
        </van-row>
        <br>
        <van-row gutter="20" type="flex" justify="center">
            <van-col span="6">
                <van-button size="small" @click="getFeedbackListData">查询</van-button>        
            </van-col>
            <van-col span="6">
                <router-link to="/problemFeedback/feedbackSubmit">
                    <van-button size="small">反馈</van-button>
                </router-link>         
            </van-col>
            <van-col span="6">
                <van-button size="small">提交</van-button>        
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
            <van-row class="tr" v-if="feedbackList.length==0">
                <van-col class="td">暂无数据</van-col>
            </van-row>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :offset="5">
                <router-link :to="{path:'/problemFeedback/feedbackDetail',query:{id:item.id}}" v-for="(item,index) in feedbackList" :key="index">
                    <van-row class="tr">
                        <van-col class="td">{{item.id}}</van-col>
                        <van-col class="td">{{item.address}}]</van-col>
                        <van-col class="td">{{item.description}}</van-col>
                        <van-col class="td">{{item.dutyDepartment}}</van-col>
                        <van-col class="td">{{item.reportEmployee}}</van-col>
                        <van-col class="td">{{item.reportDate}}</van-col>
                    </van-row>
                </router-link>
            </van-list>
        </div>
    </div>
    
</div>
</template>
<script>
import { feedbackList } from '@/api/http'
export default {
    data(){
        return {
            pageNo:1,
            pageSize:10,
            type:1,//1,2
            description:'',
            lineId:'',
            deptName:'',
            feedbackList:[
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'},
                {id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张三',reportDate:'2019-03-12 10:30'}
            ],

            loading: false,
            finished: false
        }
    },
    created(){
        this.getFeedbackListData();
    },
    methods:{
        getFeedbackListData(){//获取问题反馈列表数据
            feedbackList(this.pageNo,this.pageSize,this.type,this.description,this.lineId,this.deptName).then(res=>{
                console.log(res)
                if(res.data.code==200){

                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        loadMore() {
            console.log('开始加载')
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.feedbackList.push({id:'201903121234',address:'XXX点',description:'XXX问题',dutyDepartment:'测量部',reportEmployee:'张'+i,reportDate:'2019-03-12 10:30'});
                }
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.feedbackList.length >= 40) {
                    this.finished = true;
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
</style>

