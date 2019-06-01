import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import LoginCheck from '@/components/login/loginCheck'
import Home from '@/components/home'
import ProblemReport from '@/components/problemReport/problemList'
import ProblemForm from '@/components/problemReport/problemForm'
import ProblemFeedback from '@/components/problemFeedback/feedbackList'
import ProblemFeedbackDetail from '@/components/problemFeedback/feedbackDetail'
import ProblemFeedbackSubmit from '@/components/problemFeedback/feedbackSubmit'
import SeeProblem from '@/components/seeProblem/problemList'
import ProblemDetail from '@/components/seeProblem/problemDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {//登录
      path: '/login',
      component: Login
    },
    {//登录验证
      path: '/login/loginCheck',
      component: LoginCheck
    },
    {
      path: '/home',
      component: Home
    },
    {//问题提报列表
      path: '/problemReport',
      component: ProblemReport
    },
    {//问题提报-详情/提交
      path:'/problemReport/problemForm',
      component: ProblemForm
    },
    {//问题追踪反馈列表
      path: '/problemFeedback',
      component: ProblemFeedback
    },
    {//问题反馈详情
      path: '/problemFeedback/feedbackDetail',
      component: ProblemFeedbackDetail
    },
    {//问题反馈
      path: '/problemFeedback/feedbackSubmit',
      component: ProblemFeedbackSubmit
    },
    {//问题信息查看列表
      path: '/problemList',
      component: SeeProblem
    },
    {//问题信息查看列表
      path: '/problemList/detail',
      component: ProblemDetail
    }
  ]
})