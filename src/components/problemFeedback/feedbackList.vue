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
            <router-link :to="{path:'/problemFeedback/feedbackDetail',query:{id:item.id}}" v-for="(item,index) in feedbackList" :key="index">
                <van-row class="tr">
                    <van-col class="td">2018110201</van-col>
                    <van-col class="td">XXXX</van-col>
                    <van-col class="td">XXXX</van-col>
                    <van-col class="td">车辆部</van-col>
                    <van-col class="td">张三</van-col>
                    <van-col class="td">2019-02-25</van-col>
                </van-row>
            </router-link>
        </div>
    </div>
    
</div>
</template>
<script>
import { feedbackList } from '@/api/http'
export default {
    data(){
        return {
            feedbackList:[],
            pageNo:1,
            pageSize:10,
            type:1,//1,2
            description:'',
            lineId:'',
            deptName:''
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
        }
    }
}
</script>
<style scoped>
van-button{
    background-color:#52B8D6;
}
</style>

