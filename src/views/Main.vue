<style lang="less">
    @import "./main.less";
</style>
<template>
    <div>
            <div v-if="!loading" class="main" :class="{'main-hide-text': shrink}">
                <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}" >
                    <shrinkable-menu
                            :shrink="shrink"
                            @on-change="handleSubmenuChange"
                            :theme="menuTheme"
                            :before-push="beforePush"
                            :open-names="openedSubmenuArr"
                            :menu-list="menuList">
                        <div slot="top" class="logo-con" style="height: 60px;line-height: 45px;color:#fff;font-size: 20px;">
                                <router-link to="/" style="white-space: nowrap;font-weight: bold;color: #fff" v-show="!shrink">实验室管理系统</router-link>
                            <!--<img v-show="!shrink" style="height: 60px;width: 180px" src="../images/logo.png" key="max-logo" />-->
                            <img v-show="shrink" src="../images/logo-min.png" key="min-logo" />
                                <!--<span  v-show="shrink" >MES</span>-->
                            <!--<span v-show="!shrink">因致生产管理系统</span>-->

                        </div>
                        <div slot="shrink"  >
                            <div class="navicon-con" @click="toggleClick">
                                <Button size="small" :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" >
                                    <Icon type="navicon" size="24"></Icon>
                                </Button>
                            </div>
                        </div>
                    </shrinkable-menu>
                </div>
                <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
                    <div class="main-header">
                        <div class="header-middle-con">
                            <ul class="one-nav">
                                <li v-for="(m,index) in moduleList" @click="onOneMenuClick(m,index)" :class="{'active':currentIndex==index}" v-ripple>
                                    <a href="#" >
                                        <i :class="getIcon(m.icon)"></i>
                                        {{m.name}}</a>
                                </li>

                            </ul>
                        </div>
                        <div class="header-avator-con">
                            <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                            <lock-screen></lock-screen>
                            <!--<message-tip v-model="mesCount"></message-tip>-->
                            <!--<theme-switch></theme-switch>-->

                            <div class="user-dropdown-menu-con">
                                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                    <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                        <a href="javascript:void(0)">
                                            <span class="main-user-name">{{ userName }}</span>
                                            <Icon type="arrow-down-b"></Icon>
                                        </a>
                                        <DropdownMenu slot="list">
                                            <!--<DropdownItem name="ownSpace">个人中心</DropdownItem>-->
                                            <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Avatar icon="person"  style="background: #619fe7;margin-left: 10px;"></Avatar>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div class="tags-con">
                        <tags-page-opened :beforePush="onBeforePush" :pageTagsList="pageTagsList"></tags-page-opened>
                    </div>
                </div>
                <div class="single-page-con"  :style="{left: shrink?'60px':'200px'}">
                    <div class="single-page" >
                        <keep-alive :include="cachePage">
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
            </div>
            <div class="loading-progress" v-if="loading">
                <div class="logo">
                    <span class="gear-a"></span>
                    <span class="gear-b"></span>
                    <span class="gear-c"></span>
                </div>
                <h5>实验室管理系统</h5>
                <Progress :percent="percent" status="active"></Progress>
            </div>
    </div>

</template>
<style lang="less" scoped>
    @-webkit-keyframes y-rotate {
        0%,
        100% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @-moz-keyframes y-rotate {
        0%,
        100% {
            -moz-transform: rotate(0deg);
        }
        100% {
            -moz-transform: rotate(360deg);
        }
    }
    @-o-keyframes y-rotate {
        0%,
        100% {
            -o-transform: rotate(0deg);
        }
        100% {
            -o-transform: rotate(360deg);
        }
    }
    @-ms-keyframes y-rotate {
        0%,
        100% {
            -ms-transform: rotate(0deg);
        }
        100% {
            -ms-transform: rotate(360deg);
        }
    }
    @keyframes y-rotate {
        0%,
        100% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .navicon-con{
        text-align: center;
        cursor: pointer;
        height: 35px;
        line-height: 35px;
        background-color: #4A5064;
        .ivu-btn-text{
            color: #fff;
        }
    }

    .loading-progress{
        width: 600px;
        position: absolute;
        height: 500px;
        margin-top: -250px;
        margin-left: -300px;
        top:50%;
        left: 50%;
        h5{
            font-size: 40px;
            font-weight: bold;
            font-stretch: normal;
            text-align: center;
            color: #333333;
            margin-bottom: 10px;
        }
    }
    .logo{
        height: 162px;
        width: 440px;
        margin: 0 auto;
        background-image: url("../images/gear_bg.png");
        background-repeat: no-repeat;
        background-position: 50% 48px;

        position: relative;
        .gear-a{
            position: absolute;
            height: 104px;
            width: 104px;
            right: 140px;
            top: 10px;
            background: url("../images/gear_a.png") no-repeat;
            animation: y-rotate 8s linear infinite;
        }

        .gear-b{
            height: 56px;
            width: 56px;
            bottom: -12px;
            right: 194px;
            position: absolute;
            background: url("../images/gear_b.png") no-repeat;
            animation: y-rotate 6s linear infinite;
        }

        .gear-c{
            height: 26px;
            width: 26px;
            left: 180px;
            top: 94px;
            position: absolute;
            animation: y-rotate 4s linear infinite;
            background: url("../images/gear_c.png") no-repeat;
        }
    }

</style>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import { mapState } from 'vuex';
    import loginService from '@/services/login';


    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch
        },
        data () {
            return {
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                loading:true,
                baseServiceCount: 0
            };
        },
        computed: {
            ...mapState({
                moduleList:state=>state.app.moduleList
            }),
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            },
            currentIndex() {
                return this.$store.state.app.currentModuleIndex
            },
            progressIndex() {
                return this.$store.state.common.progress_index;
            },
            percent(){
                // let p = (100/this.baseServiceCount)*this.progressIndex;
                return 100;
                // return p>=100?100:parseInt(p);
            }
        },
        methods: {
            getIcon(icon){
                if(icon){
                    return icon.indexOf('yizit')>-1?icon:`ivu-icon ivu-icon-${icon}`
                }else{
                    return '';
                }
            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                //
                // let currentModuleIndex = this.$ls.get('currentModuleIndex') || 0;
                // this.$store.commit("setCurrentModuleIndex",currentModuleIndex);
                this.$store.commit('setModuleList',this.$ls.get('menus'));
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$store.commit('clearAllTags');
                    this.$ls.set('menus',null);
                    this.$ls.set('auths',null);
                    this.$router.push({
                        name: 'login'
                    });
                    loginService.logout().then(rep=>{
                        window.location.reload();
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            onOneMenuClick(menu,index){
                this.$store.commit('setCurrentModuleIndex',index);
                this.$store.commit('updateMenulist');
            },
            onBeforePush(v){
                let menus = this.$store.state.app.moduleList;
                var index;
                var loop = function (data,i) {
                    data.forEach(d=>{
                        if(d.url == v.name) {
                            return index = i;
                        }else if(d.children.length>0) {
                            loop(d.children,i);
                        }
                    })
                }

                menus.forEach((item,i)=>{
                    if(item.url == v.name) {
                        return index = i;
                    }else if(item.children.length>0) {
                        loop(item.children,i);
                    }

                });

                this.$store.commit('setCurrentModuleIndex',index);
                this.$store.commit('updateMenulist');
                return true;
            },
            async initData(){
                // await this.$store.dispatch('getRoles');
                // await this.$store.dispatch('getDepartments');
                // await this.$store.dispatch('getPrinters');
                // await this.$store.dispatch('getWorkCenters');
                // await this.$store.dispatch('getMaterialSeries');
                // await this.$store.dispatch('getMaterialCatalog');
                // await this.$store.dispatch('getCustomerDock');
                // await this.$store.dispatch('getCustomers');
                // await this.$store.dispatch('getSections');
                // await this.$store.dispatch('getGroups');
                // await this.$store.dispatch('getLines');
                // await this.$store.dispatch('getRoutes');
                // await this.$store.dispatch('getShifts');
                // await this.$store.dispatch('getTeams');
                // await this.$store.dispatch('getCodes');
                // await this.$store.dispatch('getTemplets');
                // await this.$store.dispatch('getStations');

                this.$store.commit('setProgress');
            }
        },
        watch: {
            '$route'(to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            },
            progressIndex(p){
                if(p >= this.baseServiceCount) {
                    this.init();
                    this.loading = false;
                }
            }
        },
        async mounted () {
            await this.initData();
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        }
    };
</script>
