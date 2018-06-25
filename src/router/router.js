import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    rootUrl:"/web",
    meta: {
        title: '实验室管理系统'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// export const preview = {
//     path: '/preview',
//     name: 'preview',
//     component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
// };

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: '/', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/user',
        name: 'user',
        title: '用户管理',
        component: Main,
        children: [
            { path: 'index', title: '用户管理', name: 'user_index', component: resolve => { require(['@/views/system/user.vue'], resolve); } }
        ]
    },
    {
        path: '/role',
        name: 'role',
        title: '角色管理',
        component: Main,
        children: [
            { path: 'index', title: '角色管理', name: 'role_index', component: resolve => { require(['@/views/system/role.vue'], resolve); } }
        ]
    },
    {
        path: '/privilege',
        name: 'privilege',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'privilege_index', component: resolve => { require(['@/views/system/privilege.vue'], resolve); } }
        ]
    },
    /*实验室管理系统*/

    {
        path: '/apply',
        name: 'apply',
        title: '委托单列表',
        component: Main,
        children: [
            { path: 'index', title: '委托单列表', name: 'apply_index', component: resolve => { require(['@/views/lib/apply.vue'], resolve); } }
        ]
    },
    {
        path: '/task',
        name: 'task',
        title: '任务单列表',
        component: Main,
        children: [
            { path: 'index', title: '任务单列表', name: 'task_index', component: resolve => { require(['@/views/lib/task.vue'], resolve); } }
        ]
    },  
    {
        path: '/test',
        name: 'test',
        title: '任务单列表',
        component: Main,
        children: [
            { path: 'protocol', title: '委托检测协议', name: 'test_protocol', component: resolve => { require(['@/views/lib/testprotocol.vue'], resolve); } }
        ]
    },  
    {
        path: '/customize',
        name: 'customize',
        title: '自定义任务单',
        component: Main,
        children: [
            { path: 'task', title: '委托检测协议', name: 'customize_task', component: resolve => { require(['@/views/lib/customizeTask.vue'], resolve); } }
        ]
    }, 
    {
        path: '/tj',
        name: 'tj',
        title: '产量统计',
        component: Main,
        children: [
            { path: 'cltj', title: '产量统计', name: 'tj_cltj', component: resolve => { require(['@/views/lib/tj/cltj.vue'], resolve); } }
        ]
    }
    // {
    //     path: '/stat',
    //     name: 'stat',
    //     title: '任务单列表',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '任务单列表', name: 'task_index', component: resolve => { require(['@/views/lib/task.vue'], resolve); } }
    //     ]
    // },

];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
