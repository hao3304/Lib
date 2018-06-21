<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer v-if="item.children.length >0" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <!--<Icon :size="20" :color="iconColor" :type="item.icon"></Icon>-->
                        <i :class="getIcon(item.icon)" style="font-size: 20px;color: #fff"></i>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.url" :key="i"><i :class="getIcon(child.icon)"></i><span style="padding-left:10px;">{{ child.name }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <i :class="getIcon(item.icon)" style="font-size: 20px;color: #fff"></i>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.url" :key="'d' + index"><i :class="getIcon(item.icon)" style="font-size: 20px;color: #fff"></i><span style="padding-left:10px;">{{ item.name }}</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
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
        }
    }
};
</script>
