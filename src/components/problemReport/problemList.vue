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
                <van-button size="small">提交</van-button>        
            </van-col>
            <van-col span="6">
                <van-button size="small">查看</van-button>        
            </van-col>
        </van-row>
        <br>
        <div class="table">
            <van-row class="tr">
                <van-col class="th">问题流水号</van-col>
                <van-col class="th">问题描述</van-col>
                <van-col class="th">责任部门</van-col>
                <van-col class="th">提报人</van-col>
                <van-col class="th">提报日期</van-col>
                <van-col class="th">审批状态</van-col>
            </van-row>
            <van-row class="tr" v-if="problemList.length==0">
                <van-col class="td">暂无数据</van-col>
            </van-row>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <router-link :to="{path:'/problemReport/problemForm',query:{id:item.id}}" v-for="(item,index) in problemList" :key="index">
                    <van-row class="tr">
                        <van-col class="td">{{item.serialNumber}}</van-col>
                        <van-col class="td">{{item.description}}</van-col>
                        <van-col class="td">{{item.dutyDeptLike}}</van-col>
                        <van-col class="td">{{item.reportEmployee}}</van-col>
                        <van-col class="td">{{item.reportDate}}</van-col>
                        <van-col class="td">{{item.processStatus}}</van-col>
                    </van-row>
                </router-link>
            </van-list>
        </div>
    </div>
    
</div>
</template>
<script>
import { problemList,homeSubmitProblem } from '@/api/http'
export default {
    data(){
        return {
            pageNo:1,
            pageSize:10,
            problemDesc:'',
            line:'',
            dutyDept:'',
            ids:[],
            problemList:[
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'},
                {serialNumber:'201903121234',description:'XX问题',dutyDeptLike:'车辆部',reportEmployee:'张三',reportDate:'2019-03-12 10:30',processStatus:'未提交'}
            ],
            list: [],
            loading: false,
            finished: false
        }
    },
    created(){
        this.getProblemListData();
        // window.addEventListener('scroll', this.onScroll);
    },
    methods:{
        getProblemListData(){//问题列表
            problemList(this.pageNo,this.pageSize,this.problemDesc,this.line,this.dutyDept).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        homeSubmitProblem(){//提交
            homeSubmitProblem(this.ids).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.$toast.success('提交成功');
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        onScroll() {
            //可滚动容器的高度
            let innerHeight = document.querySelector('.container').clientHeight;
            //屏幕尺寸高度
            let outerHeight = document.documentElement.clientHeight;
            //可滚动容器超出当前窗口显示范围的高度
            let scrollTop = document.documentElement.scrollTop;
            //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
            console.log(innerHeight + " " + outerHeight + " " + scrollTop);
            if (innerHeight < (outerHeight + scrollTop)) {
                //加载更多操作
                this.$toast.loading({
                    message: '加载中...',
                    duration:3000
                });
            }
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.list.length >= 40) {
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
.table{
    border-left: none;
    border-right: none;
}
.tr{
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
}

</style>

