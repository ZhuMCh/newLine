<template>
<div>
    <div class="homeTitle">
        <img src="@/assets/images/homeTitle.png">
    </div>
    <div class="homeContent">
        <van-row>
            <van-col span="8">
                <router-link to="/problemReport" class="linkTo">
                    <div class="linkPic"><img src="@/assets/images/problemR.png" alt=""></div>
                    <p>问题提报</p>
                </router-link>
            </van-col>
            <van-col span="8">
                <router-link to="/problemFeedback" class="linkTo">
                    <div class="linkPic"><img src="@/assets/images/problemF.png" alt=""></div>
                    <p>问题反馈</p>
                </router-link>
            </van-col>
            <van-col span="8">
                <router-link to="/problemList" class="linkTo">
                    <div class="linkPic"><img src="@/assets/images/problemR.png" alt=""></div>
                    <p>问题信息查看</p>
                </router-link>
            </van-col>
        </van-row>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    created(){

    },
    methods:{

    }
}
</script>
<style scoped>
.homeTitle{
    box-sizing: content-box;
    padding:10px 10px 0;
}
.homeTitle img{
    width: 100%;
}
.homeContent{
    padding:10px;
}
.linkTo{
    text-align: center;
    display: block;
}
.linkTo .linkPic{
    height: 60px;
    width: 60px;
    margin: 10px auto;
}
.linkTo .linkPic img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>

