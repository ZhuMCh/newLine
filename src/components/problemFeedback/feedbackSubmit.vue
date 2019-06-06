<template>
<div>
    <van-nav-bar title="问题反馈" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">问题编号</van-col>
            <van-col span="14" class="detailTd">
                <van-field readonly v-model="problemNum"/>
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
                    <div class="upload">
                        <img :src="item" alt="" v-for="(item,index) in filePreview" :key="index">
                        <input ref="pathClear" type="file" multiple value="" @change="uploadFile">
                        <van-icon name="close" size="24px" style="vertical-align:middle;" @click="clearFile" v-if="fileArr.length>0"/>
                    </div>
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
            filePreview:[]
        }
    },
    created(){
        // 详情
        feedbackSubmitDetail(this.$route.query.id).then(res=>{
            console.log(res)
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
                if(res.data.code==200){
                    this.$toast.success(res.data.message);
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }else{
                    this.$toast.fail(res.data.message);
                }
            })
        },
        uploadFile(file){
            for(var i=0;i<file.target.files.length;i++){
                reportUpload(file.target.files[i]).then(res=>{
                    if(res.data.obj){
                        this.fileArr.push({name:res.data.obj.fileName,path:res.data.obj.path});
                    }else{
                        this.$toast.fail(res.data.msg)
                        this.$refs. pathClear.value ='';
                        this.fileArr=[];
                        this.filePreview=[];
                    }   
                })

                var fileObj = file.target.files[i];
                var type = fileObj.type.split('/')[0];
                if ( type === 'image' ){
                    //将图片img转化为base64
                    var reader = new FileReader();
                    reader.readAsDataURL(fileObj);
                    var that = this;
                    reader.onloadend = function () {
                        var dataURL = reader.result;
                        var blob = that.dataURItoBlob(dataURL);
                        that.filePreview.push(dataURL)
                    };
                }
            }
        },
        clearFile(){
            this.$refs. pathClear.value ='';
            this.fileArr=[];
            this.filePreview=[];
        },
        dataURItoBlob (dataURI) {
            // base64 解码
            let byteString = window.atob(dataURI.split(',')[1]);
            let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            let T = mimeString.split('/')[1];
            let ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
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
.upload img{
    width: 90px;
    height: 90px;
    margin:10px;
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
