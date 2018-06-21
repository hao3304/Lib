<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="active" :open-names="openName" :theme="menuTheme" width="auto" @on-select="changeMenu">

        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length==0"  :name="item.url||0" :key="item.url" v-ripple>
                <i :class="getIcon(item.icon)" style="width:12px;text-align: center"></i>
                <!--<Icon :type="item.icon" :size="iconSize" :key="item.url" ></Icon>-->
                <span class="layout-text" :key="item.url">{{ item.name }}</span>
            </MenuItem>

            <Submenu v-if="item.children.length > 0" :name="item.url||0" :key="item.url">
                <template slot="title">
                    <!--<Icon :type="item.icon" :size="iconSize"></Icon>-->
                    <i :class="getIcon(item.icon)" style="width:12px;text-align: center"></i>
                    <span class="layout-text">{{ item.name }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.url" :key="child.url" v-ripple>
                        <i :class="getIcon(child.icon)" style="width:12px;text-align: center"></i>
                        <span class="layout-text" :key="child.url">{{child.name }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
    export default {
        name: 'sidebarMenu',
        props: {
            menuList: Array,
            iconSize: Number,
            menuTheme: {
                type: String,
                default: 'dark'
            },
            openNames: {
                type: Array
            }
        },
        data(){
            return {
                active:'',
                openName: []
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
            changeMenu (active) {
                this.$emit('on-change', active);
            },
            itemTitle (item) {
                if (typeof item.title === 'object') {
                    return this.$t(item.title.i18n);
                } else {
                    return item.title;
                }
            },
            openParent(action){
                var isSecondMenu=false;

                this.menuList.forEach(function(m){
                    if(m.url == action){
                        isSecondMenu = true;
                    }
                })
                if(isSecondMenu) {
                    return null;
                }else{
                    var openid;
                    this.menuList.forEach(function (m) {

                        if(m.children.length>0) {
                            m.children.forEach(function (c) {
                                if(c.url == action) {
                                    openid = m.url;
                                }
                            })
                        }

                    })

                    if(openid) {
                        this.openName = [openid]
                    }
                }


            }
        },
        updated () {
            this.$nextTick(() => {
                if (this.$refs.sideMenu) {
                    this.$refs.sideMenu.updateOpened();
                }
            });
        },
        watch:{
            "$route.name"(n){
                this.active = n;
            },
            active(a){
                this.openParent(a);
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.active = this.$route.name;
            })
        }

    };
</script>
