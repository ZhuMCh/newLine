import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import LoginCheck from '@/components/login/loginCheck'
import ProblemReport from '@/components/problemReport/problemList'
import ProblemReportDetail from '@/components/problemReport/problemDetail'
import ProblemReportSubmit from '@/components/problemReport/problemSubmit'
import ProblemFeedback from '@/components/problemFeedback/feedbackList'
import ProblemFeedbackDetail from '@/components/problemFeedback/feedbackDetail'
import ProblemFeedbackSubmit from '@/components/problemFeedback/feedbackSubmit'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/problemReport'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/login/loginCheck',
      component: LoginCheck
    },
    {
      path: '/problemReport',
      component: ProblemReport
    },
    {
      path: '/problemReport/problemDetail',
      component: ProblemReportDetail
    },
    {
      path: '/problemReport/problemSubmit',
      component: ProblemReportSubmit
    },
    {
      path: '/ProblemFeedback',
      component: ProblemFeedback
    },
    {
      path: '/ProblemFeedback/feedbackDetail',
      component: ProblemFeedbackDetail
    },
    {
      path: '/ProblemFeedback/feedbackSubmit',
      component: ProblemFeedbackSubmit
    }
  ]
})
