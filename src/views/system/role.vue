<template>
    <div>
        <div class="y-toolbar">
            <div class="y-query">
                <Form :label-width="80" :model="query" ref="queryForm"  inline>
                    <FormItem label="角色名称">
                        <Input placeholder="请输入角色名称" v-model="query.name" />
                    </FormItem>
                </Form>
            </div>
            <div class="y-query-btn">
                <Button type="success" icon="search" @click="onQuery"  v-ripple>查询</Button>
                <Button  icon="refresh" @click="onReset">重置</Button>
            </div>
            <div class="y-add-btn">
                <Button type="primary" icon="plus" v-auth="'system:role:add'" @click="onAdd" v-ripple>新增角色</Button>
            </div>
        </div>
        <div class="y-table">
            <Table   :loading="loading" :columns="columns" :data="data" ></Table>
            <div class="page-block">
                <Page :total="total" :page-size="query.size"  @on-page-size-change="onPageSizeChange" @on-change="onPageChange" show-elevator show-total show-sizer></Page>
            </div>
        </div>
        <Modal
                v-model="roleModal"
                title="角色管理"
                >
            <Spin size="large" fix v-if="formLoading"></Spin>
            <Form ref="roleForm" :label-width="80" :model="roleForm" :rules="rules" >
                <FormItem label="角色名" prop="name">
                    <Input v-model="roleForm.name" placeholder="请输入角色名" />
                </FormItem>

                <FormItem label="备注">
                    <Input type="textarea"  v-model="roleForm.remark" placeholder="请输入备注" />
                </FormItem>
            </Form>

            <div slot="footer">
                <Button @click="onCancel">取消</Button>
                <Button @click="onSave" icon="checkmark" type="primary">提交</Button>
            </div>
        </Modal>
        <Modal v-model="privilegeModal"  title="角色权限管理">
            <Spin size="large" fix v-if="privilegeLoading"></Spin>
            <div style="max-height: 400px;overflow-y: auto">
                <div class="ztree" id="ztree"></div>
            </div>
            <div slot="footer">
                <Button @click="privilegeModal = false">取消</Button>
                <Button @click="onSavePrivilege" icon="checkmark" type="primary">提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import roleService from '@/services/system/role';
    import privilegeService from '@/services/system/privilege';
    const roleModel =()=>{
        return {
            id:'',
            name:'',
            privileges:[],
            remark:''
        }
    }

    export default {
        name: "role_index",
        data(){
            return {
                columns:[
                    {
                        title:"#",
                        render:(h,params)=>{
                            let current = this.query.size*(this.query.page-1)+params.index +1;
                            return h('div',{},current);
                        },
                        width:60
                    },
                    {
                        title: '角色名称',
                        key: 'name'
                    },
                    {
                        title: '更新时间',
                        key: 'modified_time'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title:'操作',
                        render: (h, params) => {
                            return h('div', [
                                h('aButton', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        text:'编辑',
                                        auth:'system:role:edit'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.onEdit(params.row)
                                        }
                                    }
                                }),
                                h('aButton', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        text:'删除',
                                        auth:'system:role:delete'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.onRemove(params.row)
                                        }
                                    }
                                }),
                                h('aButton', {
                                    props: {
                                        type: 'info',
                                        size: 'small',
                                        text:'权限管理',
                                        auth:'system:role:edit'
                                    },
                                    on: {
                                        click: () => {
                                            this.onPrivilege(params.row)
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data:[],
                query:{
                    size:10,
                    page:1,
                    name:''
                },
                total:0,
                roleModal:false,
                roleForm:roleModel(),
                rules:{
                    name:[
                        {required: true,message:'必填',trigger: 'blur'}
                    ]

                },
                formLoading:false,
                loading:true,
                privilegeModal:false,
                privilegeLoading:false
            }
        },
        methods:{
            render(){
                this.loading = true;
                roleService.findAll(this.query).then(rep=>{
                    this.data = rep.data;
                    this.total = rep.total;
                    this.query.size = rep.size;
                    this.query.page = rep.page;
                    this.loading = false;
                })
            },
            onQuery(){
                this.render();
            },
            onReset(){
              this.query.name = '';
              this.render();
            },
            onSave(){
                this.$refs['roleForm'].validate(valid=>{
                    if(valid){
                        this.formLoading = true;
                        if(!this.roleForm.id) {
                            roleService.add(this.roleForm).then(rep=>{
                                if(rep !='error') {
                                    this.$Message.success('新增角色成功！');
                                    this.render();
                                    this.roleModal = false;
                                    this.$store.dispatch('getRoles');
                                }
                                this.formLoading = false;

                            }).catch(()=>{
                                this.formLoading = false;
                            })
                        }else{
                            roleService.update(this.roleForm.id,this.roleForm).then(rep=>{
                                if(rep !='error') {
                                    this.$Message.success('更新角色成功！');
                                    this.render();
                                    this.roleModal = false;
                                    this.$store.dispatch('getRoles');
                                }
                                this.formLoading = false;
                            }).catch(()=>{
                                this.formLoading = false;
                            })
                        }
                    }
                })
            },
            onEdit(row){
                this.roleForm = {...roleModel(),...row};
                this.$refs['roleForm'].resetFields();
                this.roleModal = true;
            },
            onRemove({id}) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定删除该角色？',
                    onOk: () => {
                        roleService.remove(id).then(rep=>{
                            if(rep == 'success') {
                                this.$Message.success("删除成功!");
                                this.render();
                                this.$store.dispatch('getRoles');
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            onCancel(){
                this.roleModal=false;
            },
            onAdd(){
                this.roleForm = roleModel();
                this.$refs['roleForm'].resetFields();
                this.roleModal = true;
            },
            async renderPrivilegeTree(privileges){
                let list = await privilegeService.findOne();
                ;

                var setting = {
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey:'pid'
                        }
                    },
                    check:{
                        chkboxType:  { "Y": "ps", "N": "s" },
                        enable:true
                    }
                };
                list.forEach(l=>{
                    delete l['icon'];
                    l.open = true;

                    privileges.forEach(p=>{
                        if(p == l.id) {
                            l.checked = true;
                        }
                    })

                });
                let data = list.sort((a,b)=>{
                    return parseInt(a.weight) - parseInt(b.weight);
                })
               this.$privilegeTree = $.fn.zTree.init($("#ztree"), setting, data);
                this.privilegeLoading =false;
            },
            async onPrivilege(row){
                this.privilegeModal = true;
                this.privilegeLoading =true;
                this.roleForm = {...roleModel(),...row};
                let role = await roleService.findOne(row.id);
                await this.renderPrivilegeTree(role.privileges);

            },
            onSavePrivilege() {
                this.privilegeLoading =true;
               let nodes = this.$privilegeTree.getCheckedNodes();
               let ids = nodes.map(n=>n.id);
               this.roleForm.privileges = ids;

                roleService.update(this.roleForm.id,this.roleForm).then(rep=>{
                    if(rep !='error') {
                        this.$Message.success('更新角色权限成功！');
                        this.privilegeModal = false;
                        this.privilegeLoading =false;
                    }

                }).catch(()=>{
                    this.privilegeLoading =false;
                })

            },
            onPageChange(page){
                this.query.page = page;
                this.render();
            },
            onPageSizeChange(size) {
                this.query.size = size;
                this.render();
            }
        },
        mounted(){
            this.render();
        }
    }
</script>

<style lang="less" scoped>

</style>