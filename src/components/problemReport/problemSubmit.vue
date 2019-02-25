<template>
<div>
    <van-nav-bar title="问题提报" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="container">
        <van-row class="detailTr">
            <van-col span="10" class="detailTh">发现部门</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="机电部" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现人</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="张三" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">发现时间</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="2019-02-25 12:30:56" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">提报人</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="李四" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">提报日期</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="2019-02-25" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">需要整改完成时限</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="2019-02-30" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">责任部门</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="机电" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">联络员</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="王五" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">审批状态</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="待提交" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">审核时限(天)</van-col>
            <van-col span="14" class="detailTd">
                <van-field placeholder="2" />
            </van-col>
        </van-row>
        <van-row  class="detailTr">
            <van-col span="10" class="detailTh">添加附件</van-col>
            <van-col span="14" class="detailTd uploaderBox">
                <img :src="imgPath" alt="">
                <van-uploader :after-read="onRead" class="uploader">
                    <van-icon name="plus" class="addIcon"/>
                </van-uploader>
            </van-col>
        </van-row>
    </div>
    <div class="btnBox">
        <van-row gutter="20">
            <van-col span="8">
                <van-button size="large">提交</van-button>        
            </van-col>
            <van-col span="8">
                <van-button size="large">保存</van-button>     
            </van-col>
            <van-col span="8">
                <van-button size="large">取消</van-button>        
            </van-col>
        </van-row>
    </div>
    
</div>
</template>
<script>
export default {
    data(){
        return {
            imgPath:''
        }
    },
    methods: {
        onRead(file) {
            console.log(file)
            this.imgPath=file.content
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
