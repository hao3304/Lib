<template>
    <div>
        <div class="y-toolbar">
            <div class="y-query">
                <Form :label-width="80" :model="query" ref="queryForm"  inline>
                    <FormItem label="用户名">
                        <Input placeholder="请输入用户名" v-model="query.username" />
                    </FormItem>

                </Form>
            </div>
            <div class="y-query-btn">
                <Button type="success" icon="search" @click="onQuery"  v-ripple>查询</Button>
                <Button  icon="refresh" @click="onReset">重置</Button>
            </div>
            <div class="y-add-btn">
                <Button v-auth="'system:user:add'" type="primary" icon="plus" @click="onAdd" v-ripple>新增用户</Button>
            </div>
        </div>
        <div class="y-table">
            <Table  :loading="loading" :columns="columns" :data="data" ></Table>
            <div class="page-block">
                <Page :total="total" :page-size="query.size" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" show-elevator show-total show-sizer></Page>
            </div>
        </div>
        <Modal
                v-model="userModal"
                title="用户管理"
        >
            <Spin size="large" fix v-if="formLoading"></Spin>
            <Form ref="userForm" :label-width="80" :model="userForm" :rules="rules" >
                <FormItem label="用户名" prop="username">
                    <Input v-model="userForm.username" placeholder="请输入用户名" />
                </FormItem>
                <FormItem label="密码" prop="password"  >
                    <Input type="password" v-model="userForm.password" placeholder="请输入密码" />
                </FormItem>

                <FormItem label="角色">
                    <Select v-model="userForm.roles" placeholder="请选择角色" multiple >
                        <Option v-for="r in roles" :key="r.id" :value="r.id">{{r.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="关联员工">
                    <table-select  table="c_emp_t" style="width: 100%" placeholder="请选择工位"
                                  :columns="empColumns"
                                   :text="userForm.emp_name"
                                  v-model="userForm.emp_id"/>
                </FormItem>
                <FormItem label="备注">
                    <Input type="textarea"  v-model="userForm.remark" placeholder="请输入备注" />
                </FormItem>
            </Form>

            <div slot="footer">
                <Button @click="onCancel">取消</Button>
                <Button @click="onSave" icon="checkmark" type="primary">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

    import userService from '@/services/system/user';
    import roleService from '@/services/system/role';

    const UserModel =()=>{
        return {
            id:'',
            username:'',
            roles:[],
            password:'',
            emp_id:'',
            emp_name:'',
            remark:''
        }
    }

    export default {
        name: "user_index",
        data(){

            const validatePass = (rule, value, callback)=>{
                if(this.userForm.id) {

                    if(value==''|| value==undefined){
                        callback();
                    }else if(value.length <6 || value.length>20) {
                        callback(new Error("密码不能少于6位或大于10位字符"));
                    }

                }else{

                    if(value === '') {
                        callback(new Error("必填"));
                    }else if(value.length <6 || value.length>20) {
                        callback(new Error("密码不能少于6位或大于10位字符"));
                    }else{
                        callback();
                    }

                }
                callback();
            }

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
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '角色',
                        render:(h,params)=>{
                            return h('div',params.row.roles.map(id=>{
                                return h('Tag',{
                                    props:{
                                        color:"green"
                                    }
                                }, this.getRoleName(id));
                            }))
                        }
                    },
                    {
                        title: '关联员工',
                        key: 'emp_name'
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
                                        auth:'system:user:edit'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click:() => {
                                            this.onEdit(params.row)
                                        }
                                    }
                                }),
                                h('aButton', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        text:'删除',
                                        auth:'system:user:delete'
                                    },
                                    on: {
                                        click: () => {
                                            this.onRemove(params.row)
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
                    username:''
                },
                total:0,
                userModal:false,
                userForm:UserModel(),
                rules:{
                    username:[
                        {required: true,message:'必填',trigger: 'blur'},
                        {type:'string',min:4,message:'最短不能少于4位字符',trigger:'blur'},
                        {type:'string',max:20,message:'最长不能超过20位字符',trigger:'blur'}
                    ],
                    password:[
                        { validator: validatePass, trigger: 'blur' }
                    ]
                },
                formLoading:false,
                loading:true,
                empColumns:[
                    {
                        title: '员工编号',
                        key: 'no'
                    }, {
                        title: '员工姓名',
                        key: 'name'
                    }
                ]
            }
        },
        computed:{
          roles(){
              return this.$store.state.common.roles||[];
          }
        },
        methods:{
            render(){
                this.loading = true;
                userService.findAll(this.query).then(rep=>{
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
                this.query.username = '';
                this.render();
            },
            onSave(){
                this.$refs['userForm'].validate(valid=>{
                    if(valid){
                        this.formLoading = true;
                        if(!this.userForm.id) {
                            userService.add(this.userForm).then(rep=>{
                                if(rep !='error') {
                                    this.$Message.success('新增用户成功！');
                                    this.render();
                                    this.userModal = false;
                                }
                                this.formLoading = false;

                            })
                        }else{
                            userService.update(this.userForm.id,this.userForm).then(rep=>{
                                if(rep !='error') {
                                    this.$Message.success('更新用户成功！');
                                    this.render();
                                    this.userModal = false;
                                }
                                this.formLoading = false;
                            })
                        }
                    }
                })
            },
            onUpdate(){

            },
            onEdit(row){
                this.$refs['userForm'].resetFields();
                this.userForm = UserModel();
                this.$nextTick(() => {
                    this.userForm = {...UserModel(),...JSON.parse(JSON.stringify(row))};
                    this.userModal = true;
                })

            },
            onRemove({id}) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定删除该用户？',
                    onOk: () => {
                        userService.remove(id).then(rep=>{
                            if(rep == 'success') {
                                this.$Message.success("删除成功!");
                                this.render();
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            onCancel(){
                this.userModal=false;
            },
            onAdd(){
                this.userForm = UserModel();
                this.$refs['userForm'].resetFields();
                this.userModal = true;
            },
            getRoleName(id){
                return this.roles.length>0?this.roles.find(r=>r.id == id)['name']:'';
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
        async mounted(){
            this.render();
        }
    }
</script>

<style lang="less" scoped>

</style>