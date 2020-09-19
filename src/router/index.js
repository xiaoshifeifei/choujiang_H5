import Vue from 'vue'
import VueRouter from 'vue-router'
import Myprize from '@/views/myprize/myprize'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            name: 'zhifu',
            path: '/',
            redirect: '/zhifu' // 重定向
        },
        /*
         * {
         *     name: 'noindex',
         *     path: '/',
         *     redirect: '/noindex', //重定向
         * },
         */
        {
            path: '/index',
            name: 'inidex',
            component: (resolve) => require(['@/views'], resolve),
            meta: {
                title: '来抽奖',
                keepAlive: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: (resolve) => require(['@/views/register'], resolve),
            meta: {
                title: '报名',
                keepAlive: false
            }
        },
        {
            path: '/down',
            name: 'down',
            component: (resolve) => require(['@/views/download'], resolve),
            meta: {
                title: '下载',
                keepAlive: false
            }
        },
        {
            path: '/mzldown',
            name: 'mzldown',
            component: (resolve) => require(['@/views/downloadcopy'], resolve),
            meta: {
                title: '下载',
                keepAlive: false
            }
        },
        {
            path: '/huodonglc/:id/:qdId',
            name: 'huodonglc',
            component: (resolve) => require(['@/views/huodonglc'], resolve),
            meta: {
                title: '活动流程',
                keepAlive: false
            }
        },
        {
            path: '/zhifu',
            name: 'zhifu',
            component: (resolve) => require(['@/views/zhifu'], resolve),
            meta: {
                title: '一元支付',
                keepAlive: false
            }
        },
        {
            path: '/xieyi',
            name: 'xieyi',
            component: (resolve) => require(['@/views/xieyi'], resolve),
            meta: {
                title: '用户协议',
                keepAlive: false
            }
        },
        {
            path: '/noindex',
            name: 'noindex',
            component: (resolve) => require(['@/views/noindex'], resolve),
            meta: {
                title: '页面找不到',
                keepAlive: false
            }
        },
        {
            path: '*',
            name: 'NotDefined',
            meta: {
                title: '页面找不到',
                keepAlive: true
            },
            component: (resolve) => require(['@/views/NotDefined'], resolve)
        },
        {
            path: '/myprize',
            name: 'myprize',
            meta: {
                title: '我的奖品',
                keepAlive: true
            },
            component: Myprize
        },
        {
            path: "/zhiliaozhenxuan",
            name: "zhiliaozhenxuan",
            meta: {
                title: "知了甄选操作指南",
                keepAlive: true,
            },
            component: resolve => require(['@/views/zhiliaozhenxuan'], resolve),
        },
        {
            path: "/androidShare",
            name: "androidShare",
            meta: {
                title: "邀请注册",
                keepAlive: true,
            },
            component: resolve => require(['@/views/androidShare'], resolve),
        },
        {
            path: "/syx",
            name: "syx",
            meta: {
                title: "邀请码",
                keepAlive: true,
            },
            component: resolve => require(['@/views/syx'], resolve),
        },
        {
            path: "/dataPromotion",
            name: "dataPromotion",
            meta: {
                title: "数据概况统计",
                keepAlive: true,
            },
            component: resolve => require(['@/views/dataPromotion'], resolve),
        },
        {
            path: "/teamleader",
            name: "teamleader",
            meta: {
                title: "团队长",
                keepAlive: true,
            },
            component: resolve => require(['@/views/teamleader'], resolve),
        }
    ]
})

export default router