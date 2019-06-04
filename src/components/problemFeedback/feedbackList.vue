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
                <van-field clearable class="inputBox" readonly v-model="line" @click="clickFunc"/>
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
        <van-row gutter="20" type="flex" justify="center">
            <van-col span="6">
                <van-button size="small" @click="getFeedbackListData">查询</van-button>        
            </van-col>
            <van-col span="6">
                <van-button size="small" @click="gotoFeedBack">反馈</van-button>
            </van-col>
        </van-row>
        <br>
        <div class="table">
            <van-row class="tr">
                <van-col class="selectAll"><input type="checkbox" :checked="feedbackList.length===ids.length&&ids.length" @click="checkAll"></van-col>
                <van-col style="flex:5;">
                    <van-row class="tr" style="border-bottom:none;border-right:none;">
                        <van-col class="th">问题编号</van-col>
                        <van-col class="th">问题地点</van-col>
                        <van-col class="th">问题描述</van-col>
                        <van-col class="th">责任部门</van-col>
                        <van-col class="th">提报人</van-col>
                        <van-col class="th">提报日期</van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row class="tr" v-if="feedbackList.length==0">
                <van-col class="td">暂无数据</van-col>
            </van-row>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :offset="5">
                <van-row class="tr" v-for="(item,index) in feedbackList" :key="index">
                    <van-col class="selectOne"><input type="checkbox" :checked="ids.indexOf(item.id)>=0" @click="checkOne(item.id)"></van-col>
                    <van-col style="flex:5;">
                        <router-link :to="{path:'/problemFeedback/feedbackDetail',query:{id:item.id}}">
                            <van-row class="tr" style="border-bottom:none;border-right:none;">
                                <van-col class="td">{{item.id}}</van-col>
                                <van-col class="td">{{item.address}}</van-col>
                                <van-col class="td">{{item.description}}</van-col>
                                <van-col class="td">{{item.dutyDepartment.deptName}}</van-col>
                                <van-col class="td">{{item.reportEmployee.empName}}</van-col>
                                <van-col class="td">{{new Date(item.reportDate).Format('yyyy-MM-dd hh:mm:ss')}}</van-col>
                            </van-row>
                        </router-link>
                    </van-col>
                </van-row>

            </van-list>
        </div>
    </div>
    <!-- 线路选择器 -->
    <van-popup v-model="linePop" position="bottom" :overlay="true">
        <van-picker show-toolbar title="线路" :columns="lineList" value-key='name' @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
</div>
</template>
<script>
import { feedbackList,getLine,getRootDept,getNextDept } from '@/api/http'
export default {
    data(){
        return {
            linePop:false,
            lineList:[],//线路字典

            pageNo:1,
            pageSize:10,
            type:1,//1,2
            description:'',
            line:'',
            lineId:'',
            dutyDept:'',
            feedbackList:[],
            ids:[],

            loading: false,
            finished: false,
            totalRows:0
        }
    },
    created(){
        this.getFeedbackListData();
        getLine().then(res=>{//获取线路
            res.data.code==200?this.lineList=res.data.data:this.$toast.fail(res.data.message)
        })
    },
    methods:{
        getFeedbackListData(){//获取问题反馈列表数据
            feedbackList(this.pageNo,this.pageSize,this.type,this.description,this.lineId,this.dutyDept).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.feedbackList=res.data.data.content;
                    this.totalRows=res.data.data.totalPages;
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        checkAll(e){//全选
            this.isCheckedAll = e.target.checked;
            if (this.isCheckedAll) {//全选时
                this.ids = []
                this.feedbackList.forEach(item => {
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
        gotoFeedBack(){
            if(this.ids.length==0){
                this.$toast.fail("请选择一条数据");
            }else{
                this.$router.push({path:'/problemFeedback/feedbackSubmit',query:{id:ids[0]}})
            }
        },
        //点击弹出选择器
        clickFunc(){
            this.linePop=true   
        },
        // 选择器确认事件
        onConfirm(value, index){
            this.linePop=false
            this.line=value.name;
            this.lineId=value.id
           
        },
        // 选择器取消事件
        onCancel(){
            this.linePop=false
            this.line=null;
            this.lineId=null; 
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
                    this.getFeedbackListData()
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

