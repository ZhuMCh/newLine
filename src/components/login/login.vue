<template>
<div>
    <van-nav-bar title="登录页" left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1)}" />
    <div class="loginBox">
        <van-cell-group>
            <van-field
                v-model="username"
                left-icon="manager"
                label="账号"
                placeholder="请输入用户名"
                required
                clearable
            />
            <van-field
                v-model="password"
                type="password"
                left-icon="lock"
                label="密码"
                placeholder="请输入密码"
                required
                clearable
            />
        </van-cell-group>
        
        <van-row class="remberMe">
            <van-col span="12">
                <van-checkbox v-model="checked" checked-color="#1bbc9a">记住我</van-checkbox>
            </van-col>
            <van-col span="12" class="forgetPwd">忘记密码?</van-col>
        </van-row>
        <van-row gutter="10">
            <van-col span="12">
                <van-button @click="loginForAccount(1)">&nbsp;&nbsp;&nbsp;账号登录&nbsp;&nbsp;&nbsp;</van-button>
            </van-col>
            <van-col span="12">
                <van-button @click="loginForAccount(2)">企业微信登录</van-button>
            </van-col>
        </van-row>
        
    </div>
</div>
</template>
<script>
import http from '@/api/axios'
export default {
    data(){
        return {
            username:'',
            password:'',
            checked: false
        }
    },
    created(){
        
    },
    methods:{
        loginForAccount(e){
            if(e==1){
                this.$router.push({path:'/login/logincheck'});
            }else if(e==2){
                this.$router.push({path:'/home'});
            }
        }
    }
}
</script>
<style scoped>
.loginBox{
    margin: 100px 30px 0;
}
.remberMe{
    padding: 20px 15px 40px;
}
.forgetPwd{
    text-align: right;
    color: #1bbc9a;
}
</style>


