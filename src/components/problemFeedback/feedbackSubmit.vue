<template>
<div>
    <van-nav-bar title="问题反馈" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题编号</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="WT20190225001" v-model="problemId"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">跟踪日期</van-col>
            <van-col span="14" class="detailTd">
                <van-field readonly v-model="feedbackTime"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">资料附件</van-col>
            <van-col span="14" class="detailTd uploaderBox">
                <img :src="failPath" alt="">
                <van-uploader :after-read="onRead" class="uploader">
                    <van-icon name="plus" class="addIcon"/>
                </van-uploader>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">跟踪记录</van-col>
            <van-col span="14" class="detailTd">
                <van-field type="textarea" rows="3" autosize placeholder="日常跟踪检查" v-model="recordDesc"/>
            </van-col>
        </van-row>
    </div>
    <div class="btnBox">
        <van-row gutter="20">
            <van-col span="8">
                <van-button size="large" @click="feedbackSubmitFunc">保存</van-button>        
            </van-col>
            <van-col span="8" offset="8">
                <van-button size="large" @click="()=>{this.$router.go(-1)}">取消</van-button>        
            </van-col>
        </van-row>
    </div>
    
</div>
</template>
<script>
import { feedbackSubmitDetail,feedbackSubmit } from '@/api/http'
export default {
    data(){
        return {
            problemId:'',
            feedbackTime:new Date().Format('yyyy-MM-dd hh:mm:ss'),
            failPath:'',
            recordDesc:'',
        }
    },
    created(){
        // 详情
        feedbackSubmitDetail('').then(res=>{
            console.log(res)
            if(res.data.code==200){
                this.problemId=res.data.detail.problemId;
                this.feedbackTime=res.data.detail.date;
                this.failPath=res.data.detail.docAttachmentName;
                this.recordDesc=res.data.detail.recordDescription;
            }else{
                this.$toast.fail(res.data.message);
            }
        })
    },
    methods: {
        feedbackSubmitFunc(){//反馈
            feedbackSubmit(this.problemId,this.failPath,this.recordDesc).then(res=>{
                console.log(res);
                if(res.data.code==200){
                    this.$toast.success('提交成功');
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        onRead(file) {
            console.log(file)
            this.failPath=file.content
        }
    }
}
</script>
<style scoped>
.detailTd{
    padding: 0;
}
.detailTh{
    color: #1bbc9a;
}
.uploaderBox{
    padding: 5px 10px;
}
.uploaderBox img{
    width: 80px;
    height: 80px;
    vertical-align: middle;
}
.uploaderBox .uploader{
    background-color: #F6F6F6;
    width: 50px;
    height: 50px;
    vertical-align: middle;
}
.uploaderBox .uploader .addIcon{
    font-size: 30px;
    line-height: 50px;
    color: #C4C5C7;
}
.btnBox{
    padding: 0 10px 20px;
}
.btnBox .van-button{
    background-color: #1bbc9a;
}
</style>
