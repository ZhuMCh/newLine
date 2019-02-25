<template>
<div>
    <van-nav-bar title="首次登录验证" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="loginBox">
        <div class="tips">您是初次访问该系统,请设置一个新密码</div>
        <van-cell-group>
            <van-field
                v-model="username"
                label="员工编号"
                placeholder="请输入员工编号"
                required
                clearable
            />
            <van-field
                v-model="password"
                type="password"
                label="新密码"
                placeholder="请输入新密码"
                required
                clearable
            />
            <van-field
                v-model="passwordSure"
                type="password"
                label="确认密码"
                placeholder="请再次输入密码"
                required
                clearable
            />
        </van-cell-group>

        <van-row class="sureBtn">
            <van-col span="8" offset="16">
                <van-button>&nbsp;&nbsp;确认&nbsp;&nbsp;</van-button>
            </van-col>
        </van-row>
        
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            username:'',
            password:'',
            passwordSure:''
        }
    }
}
</script>
<style scoped>
.loginBox{
    margin:30px;
}
.tips{
    color: #1bbc9a;
    padding: 20px 0;
}
.sureBtn{
    margin-top: 40px;
}
</style>


