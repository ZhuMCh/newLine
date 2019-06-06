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
                        <span v-for="(item,index) in filePreview" :key="index">
                            <div class="preview" v-if="item.type==1">
                                <img :src="item.url" alt="">
                                <van-icon name="close" class="delBtn" size="18px" @click="clearFile(index)"/>
                            </div>
                            <div class="preview docFile" v-else>
                                <span>{{item.url}}</span>
                                <van-icon name="close" class="delBtn" size="18px" @click="clearFile(index)"/>
                            </div>
                        </span>
                        <van-button class="addFile" @click="handleUpload"><van-icon name="plus" size="24px"/></van-button>
                        <input type="file" id="upload" ref="pathClear" value="" style="display:none;" @change="uploadFile">
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
            filePreview:[]//上传文件预览
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
        // 文件上传
        handleUpload(){
            document.getElementById('upload').click()
        },
        uploadFile(file){//附件上传
            reportUpload(file.target.files[0]).then(res=>{
                if(res.data.obj){
                    this.fileArr.push({name:res.data.obj.fileName,path:res.data.obj.path});
                }else{
                    this.$toast.fail(res.data.msg)
                    this.$refs. pathClear.value ='';
                    this.fileArr=[];
                    this.filePreview=[];
                }   
            })
            var that = this;
            var fileObj = file.target.files[0];
            var type = fileObj.type.split('/')[0];
            if ( type === 'image' ){
                //将图片img转化为base64
                var reader = new FileReader();
                reader.readAsDataURL(fileObj);
                
                reader.onloadend = function () {
                    var dataURL = reader.result;
                    var blob = that.dataURItoBlob(dataURL);
                    that.filePreview.push({type:1,url:dataURL})
                };
            }else{
                that.filePreview.push({type:2,url:fileObj.name})
            }
        },
        clearFile(index){//清除上传
            this.fileArr.splice(index,1);
            this.filePreview.splice(index,1);
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
.btnBox{
    padding: 0 10px 20px;
}
.btnBox .van-button{
    background-color: #1bbc9a;
}
.uploaderBox{
    padding: 5px 10px;
}
.uploaderBox .upload{
    width:100%;
    min-height: 100px;
    position: relative;
    padding-top:10px;
    padding-right: 40px;
}
.addFile{
    width: 30px;
    height: 30px;
    padding: 0;
    background: #E6E6E6 !important;
    border: none !important;
    color: #999 !important;
    position: absolute;
    bottom: 0;
    right: 0;
}
.preview{
    display: inline-block;
    position: relative;
    margin: 10px 10px 0 0; 
}
.preview img{
    width: 80px;
    height: 80px;
}
.preview .delBtn{
    position: absolute;
    top: -8px;
    right: -8px;
    color: #999;
}
.docFile{
    padding-right: 20px;
}
.docFile .delBtn{
    top: 0;
    right: 0;
}
.docFile a{
    color: #1bbc9a;
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
</style>
