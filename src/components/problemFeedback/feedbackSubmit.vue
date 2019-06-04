<template>
<div>
    <van-nav-bar title="问题反馈" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题编号</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="WT20190225001" readonly v-model="problemNum"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">跟踪日期</van-col>
            <van-col span="14" class="detailTd">
                <van-field readonly v-model="feedbackTime"/>
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="24" class="detailTd uploaderBox">
                <van-panel title="资料附件">
                    <div class="upload"><input type="file" value="" @change="uploadFile"></div>
                </van-panel>  
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
import { feedbackSubmitDetail,feedbackSubmit,reportUpload } from '@/api/http'
export default {
    data(){
        return {
            currentDate: new Date(),
            timeProp:false,
            problemNum:'',
            feedbackTime:new Date().Format('yyyy-MM-dd hh:mm:ss'),
            recordDesc:'',
            fileArr:[],//附件
        }
    },
    created(){
        // 详情
        feedbackSubmitDetail(this.$route.query.id).then(res=>{
            if(res.data.code==200){
                this.problemNum=res.data.data[0].problemId.problemCode;
            }else{
                this.$toast.fail(res.data.message);
            }
        })
    },
    methods: {
        feedbackSubmitFunc(){//反馈
            feedbackSubmit({id:this.$route.query.id},this.fileArr,this.recordDesc).then(res=>{
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
        uploadFile(file){
            for(var key in file.target.files){
                reportUpload(file.target.files[key]).then(res=>{
                    console.log(res)
                    this.fileArr.push(res.data.obj)
                })
            }  
        },
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

.btnBox{
    padding: 0 10px 20px;
}
.btnBox .van-button{
    background-color: #1bbc9a;
}
</style>
<style>
.uploaderBox .van-panel{
    width:100%;
}
.uploaderBox .van-panel__header{
    width:100%;
    text-align:left;
    color:#1bbc9a;
    padding:0 0 5px 35px;
}
.uploaderBox .van-cell:not(:last-child)::after{
    left:0;
}
.uploaderBox [class*=van-hairline]::after{
    border:none;
}
.uploaderBox .upload{
    width:100%;
    padding:20px 0;
}
</style>
