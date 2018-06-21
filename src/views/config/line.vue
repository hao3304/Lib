<template>
    <div>
        <div class="y-toolbar">
            <div class="y-query">
                <Form :label-width="90" :model="query" ref="queryForm"  inline>
                    <FormItem label="生产线编号">
                        <Input placeholder="请输入生产线编号" v-model="query.no" />
                    </FormItem>
                    <FormItem label="生产线名称">
                        <Input placeholder="请输入生产线名称" v-model="query.name" />
                    </FormItem>
                </Form>
            </div>
            <div class="y-query-btn">
                <Button type="success" icon="search" @click="onQuery"  v-ripple>查询</Button>
                <Button  icon="refresh" @click="onReset">重置</Button>
            </div>
            <div class="y-add-btn">
                <Button v-auth="'config:line:add'" type="primary" icon="plus" @click="onAdd" v-ripple>新增生产线</Button>
            </div>
        </div>
        <div class="y-table">
            <Table  :loading="loading" :columns="columns" :data="data" ></Table>
            <div class="page-block">
                <Page :total="total" :page-size="query.size" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" show-elevator show-total show-sizer></Page>
            </div>
        </div>
        <Modal
                v-model="lineModal"
                title="生产线管理"
        >
            <Spin size="large" fix v-if="formLoading"></Spin>
            <Form ref="lineForm" :label-width="90" :model="lineForm" :rules="rules" >
                <FormItem label="生产线编号" prop="no">
                    <Input v-model="lineForm.no" placeholder="请输入生产线编号" />
                </FormItem>
                <FormItem label="生产线名称" prop="name">
                    <Input v-model="lineForm.name" placeholder="请输入生产线名称" />
                </FormItem>
                <FormItem label="代码">
                    <Input v-model="lineForm.code" placeholder="请输入代码" />
                </FormItem>
                <FormItem label="工作中心" prop="work_center_id">
                    <Select v-model="lineForm.work_center_id" placeholder="请选择工作中心">
                        <Option v-for="v in WorkCenters" :key="v.id" :value="v.id">{{v.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="部门">
                    <Select v-model="lineForm.department_id" placeholder="请选择部门">
                        <Option v-for="d in Departments" :key="d.id" :value="d.id">{{d.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="标准节拍" >
                    <InputNumber :max="9999"  style="width: 100%" :min="0" v-model="lineForm.standard_beat" placeholder="请输入生产线地址"></InputNumber>
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

    import lineService from '@/services/config/line';

    const lineModel =()=>{
        return {
            "id":"",
            "no":"", // 生产线编号
            "name":"", //生产线名称
            "work_center_id":"", //工作中心id
            "department_id": "", //部门
            "code": "", //产线代码
            "standard_beat": undefined //标准节拍
        }
    }

    export default {
        name: "line_index",
        data(){
            var self = this;
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
                        title: '生产线编号',
                        key: 'no',
                    },
                    {
                        title: '生产线名称',
                        key: 'name',
                    },
                    {
                        title: '代码',
                        key: 'code',
                    },
                    {
                        title: '工作中心名称',
                        render(h,params){
                            let wc = self.WorkCenters.find(w=>w.id == params.row.work_center_id);
                            return h('div',{},wc?wc['name']:'')
                        }
                    },
                    {
                        title: '部门名称',
                        render(h,params){
                            let dp = self.Departments.find(w=>w.id == params.row.department_id);
                            return h('div',{},dp?dp['name']:'')
                        }
                    },
                    {
                        title: '标准节拍',
                        key: 'standard_beat',
                    },
                    {
                        title: '更新时间',
                        key: 'modified_time'
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
                                        auth:'config:line:edit'
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
                                        auth:'config:line:delete'
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
                    no:'',
                    name:'',
                    type:''
                },
                total:0,
                lineModal:false,
                lineForm:lineModel(),
                rules:{
                    name:[
                        {required:true,message:'必填',trigger:'blur'}
                    ],
                    no:[
                        {required:true,message:'必填',trigger:'blur'}
                    ],
                    work_center_id: [
                        {required:true, message:'必填', trigger:'blur',type:'number'}
                    ]
                },
                formLoading:false,
                loading:true,
                department:[]
            }
        },
        computed:{
            WorkCenters(){
                return this.$store.state.common.workCenters.filter(w=>w.type == "1");
            },
            Departments() {
                return this.$store.state.common.departments;
            }
        },
        methods:{
            render(){
                this.loading = true;
                lineService.findAll(this.query).then(rep=>{
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
                this.query.no = '';
                this.query.name = '';
                this.query.type = '';
                this.render();
            },
            onSave(){
                this.$refs['lineForm'].validate(valid=>{
                    if(valid){
                        this.formLoading = true;
                        if(!this.lineForm.id) {
                            lineService.add(this.lineForm).then(rep=>{
                                if(rep !='error') {
                                    this.$Message.success('新增生产线成功！');
                                    this.render();
                                    this.lineModal = false;
                                    this.$store.dispatch('getLines');
                                }
                                this.formLoading = false;

                            })
                        }else{
                            lineService.update(this.lineForm.id,this.lineForm).then(rep=>{
                                if(rep !='error') {
                                    this.$Message.success('更新生产线成功！');
                                    this.render();
                                    this.lineModal = false;
                                    this.$store.dispatch('getLines');
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
                this.lineForm = {...lineModel(),...JSON.parse(JSON.stringify(row))};
                this.$refs['lineForm'].resetFields();
                this.lineModal = true;
            },
            onRemove({id}) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定删除该生产线？',
                    onOk: () => {
                        lineService.remove(id).then(rep=>{
                            if(rep == 'success') {
                                this.$Message.success("删除成功!");
                                this.render();
                                this.$store.dispatch('getLines');
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            onCancel(){
                this.lineModal=false;
            },
            onAdd(){
                this.lineForm = lineModel();
                this.$refs['lineForm'].resetFields();
                this.lineModal = true;
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