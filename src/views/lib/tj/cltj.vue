<template>
    <div class="tj-cltj">
        <div class="y-toolbar">
            <div class="y-query">
                <Form :label-width="90" :model="query" ref="queryForm" inline>
                    <FormItem label="委托单名称">
                        <Input placeholder="请输入委托单名称" v-model="query.name" />
                    </FormItem>
                    <FormItem label="委托单位">
                        <Input placeholder="请输入委托单位" v-model="query.unit" />
                    </FormItem>
                    <FormItem label="委托单编号">
                        <Input placeholder="请输入委托单编号" v-model="query.no" />
                    </FormItem>
                </Form>
            </div>
            <div class="y-query-btn">
                <Button type="primary" @click="onQuery" v-ripple>搜索</Button>
                <Button v-auth="'config:line:add'"  type="primary" @click="onAdd" v-ripple>新建委托单</Button>
            </div>
        </div>

        <Modal v-model="modal" title="新建委托单" width="900" style="padding:10;" >
            <Row type="flex"  justify="end">
                    <Col span="11"><span style="line-height:32px;font-size:14px;font-weight:bold;">填写委托单信息</span></Col>
                    <Col span="3"><Button type="primary" size="small">委托单导入</Button></Col>
            </Row>
            <Form :model="order" :label-width="100" :rules="orderRules">
                <Row>
                    <Col span="8">
                    <FormItem label="单位名称">
                        <Input v-model="order.uname" placeholder="请输入单位名称" />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="公司名称">
                        <Input v-model="order.cname" placeholder="请输入公司名称" />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="单位地址">
                        <Input v-model="order.uaddress" placeholder="请输入单位地址" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem label="单位电话">
                        <Input v-model="order.uphone" placeholder="请输入单位电话" />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="送检人">
                        <Input v-model="order.name" placeholder="请输入送检人" />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="送检人电话">
                        <Input v-model="order.phone" placeholder="请输入送检人电话" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem label="工程名称">
                        <Input v-model="order.pname" placeholder="请输入工程名称" />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="检测类型" prop="type">
                        <Input v-model="order.type" placeholder="请输入检测类型" />
                    </FormItem>
                    </Col>
                </Row>
            </Form>

            <Row type="flex"  justify="end">
                    <Col span="11"><span style="line-height:32px;font-size:14px;font-weight:bold;">填写样品信息</span></Col>
                    <Col span="3"><Button type="primary" size="small" @click="addSample">新建样品</Button></Col>
            </Row>
            
            <Row><Col span="6" :push="1">检测名称</Col><Col span="4">检测型号</Col><Col span="4">样品数量</Col><Col span="4">制造商</Col><Col span="6"></Col></Row>
            <Row  v-for="sample in samples">
                <Col :push="1" span="6">
                    <Select style="width:150px;"></Select>
                </Col>
                <Col span="4">
                    <Input style="width:120px;"></Input>
                </Col>
                <Col span="4">
                    <Input style="width:120px;"></Input>
                </Col>
                <Col span="4">
                    <Input style="width:120px;"></Input>
                </Col>
                <Col span="6">
                    <Button size="small" type="primary" @click="editSample">设置检测项目</Button>
                    <Button size="small" style="margin-left:10px;" type="success" @click="delSample">删除</Button>
                </Col>
            </Row>

            <div slot="footer">
                <Button @click="onCancel">取消</Button>
                <Button @click="onSave" icon="checkmark" type="primary">提交</Button>
            </div>
        </Modal>

        <Modal v-model="editSampleModal" title="设置检测项目" width="900" style="padding:10;">
            <Row style="background-color:#dddee1;line-height:30px;"><Col span="8">名称</Col><Col span="16">检测标准规范</Col></Row>
            <Row style="line-height:50px;">
                <Col span="8">
                    <Button type="primary" size="small">全选</Button>
                    <Button type="success" size="small">取消</Button>
                </Col>
                <Col span="16">
                    <Button type="primary" size="small">全选</Button>
                    <Button type="success" size="small">取消</Button>
                </Col>
            </Row>
            <Row v-for="ti in testItems">
                <Col span="8">
                    <Checkbox>{{ti.name}}</Checkbox>
                </Col>
                <Col span="16">
                    <Checkbox>{{ti.stand}}</Checkbox>
                </Col>
            </Row>
        </Modal>



        <div class="y-table">
            <p class="y-table-title">
                <span>委托单列表</span>
                <span>共{{data.length}}条委托单记录</span>
            </p>
            <Table :loading="loading" :columns="columns" :data="data"></Table>
            <div class="page-block">
                <Page :total="total" :page-size="query.size" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" show-elevator
                    show-total show-sizer></Page>
            </div>
        </div>

        <Modal v-model="editModal" title="编辑委托单" width="500" style="padding:10;">
            <Form :model="currentRow" :label-width="100">
                <Row>
                    <FormItem label="委托单名称">
                        <Input v-model="currentRow.name" placeholder="请输入委托单名称" />
                    </FormItem>
                    <FormItem label="委托单编号">
                        <Input v-model="currentRow.no" placeholder="请输入委托单编号" />
                    </FormItem>
                    <FormItem label="委托单单位">
                        <Input v-model="currentRow.unit" placeholder="请输入单位地址" />
                    </FormItem>
                    <FormItem>
                        <DatePicker type="date" placeholder="选择委托单时间" v-model="currentRow.date"></DatePicker>
                    </FormItem>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="onCancel">取消</Button>
                <Button @click="onSave" icon="checkmark" type="primary">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    function Order() {
        return {
            uname: "",
            cname: "",
            uaddress: "",
            uphone: "",
            name: "",
            phone: "",
            pname: "",
            type: "",
        }
    }

    function Sample(){
        return {
            name:"",
            type:"",
            count:"",
            create:"",
        }
    }

    export default {
        name: "tj_cltj",
        data() {
            return {
                query: {
                    name: '',
                    no: '',
                    unit: '',
                    size: 10
                },
                total: 0,
                modal: false,
                columns: [{
                        title: "序号",
                        render: (h, params) => {
                            let current = this.query.size * (this.query.page - 1) + params.index + 1;
                            return h('div', {}, current);
                        },
                        width: 60
                    },
                    {
                        title: '委托单名称',
                        key: 'name',
                    },
                    {
                        title: '委托单编号',
                        key: 'no',
                    },
                    {
                        title: '委托单位',
                        key: 'unit',
                    },
                    {
                        title: '委托日期',
                        key: 'date',
                    },
                    {
                        title: '操作',
                        render: (h, params) => {

                            if (!params.row.send) {
                                return h('div', [
                                    h('aButton', {
                                        props: {
                                            type: 'success',
                                            size: 'small',
                                            text: ' 编辑 ',
                                            auth: 'config:line:edit'
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
                                            text: ' 删除 ',
                                            auth: 'config:line:delete'
                                        },
                                        on: {
                                            click: () => {
                                                this.onRemove(params.row)
                                            }
                                        }
                                    })
                                ]);
                            }

                            return h('div', [h('aButton', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    text: '已派发',
                                    auth: 'config:line:edit'
                                },
                                style: {
                                    marginRight: '5px'
                                }
                            })])
                        }
                    }
                ],
                data: [{
                    name: "1",
                    "no": 123,
                    "unit": "实验室",
                    "date": "2018-06-23",
                    "send": true
                }, {
                    name: "1",
                    "no": 123,
                    "unit": "实验室",
                    "date": "2018-06-23",
                    "send": false
                }],
                currentRow: {},
                editModal: false,
                editSampleModal:false,

                order: {...Order()},
                orderRules:{
                    type: [
                        { required: true, message: 'The type cannot be empty', trigger: 'blur' }
                    ],
                },
                samples: [{...Sample()}],
                testItems:[
                    {name:"导电直流电阻测量1",stand:"<<电线电缆电性能试验方法 第8部分 交流电压实验1>>"},
                    {name:"导电直流电阻测量2",stand:"<<电线电缆电性能试验方法 第8部分 交流电压实验2>>"},
                    {name:"导电直流电阻测量3",stand:"<<电线电缆电性能试验方法 第8部分 交流电压实验3>>"},
                    {name:"导电直流电阻测量4",stand:"<<电线电缆电性能试验方法 第8部分 交流电压实验4>>"},
                    {name:"导电直流电阻测量5",stand:"<<电线电缆电性能试验方法 第8部分 交流电压实验5>>"},
                    {name:"导电直流电阻测量6",stand:"<<电线电缆电性能试验方法 第8部分 交流电压实验6>>"},
                ]
                   
            }
        },
        methods: {
            editSample(){
                this.editSampleModal = true;
            },
            delSample(){
                this.samples.shift();
            },
            addSample(){
                this.samples.push({...Sample()})
            },
            onQuery() {

            },
            onAdd() {
                this.modal = true
            },
            onEdit(row) {
                this.editModal = true
                this.currentRow = row
            },
            onRemove(row) {
                this.data.shift()
            }
        }
    }
</script>

<style lang="less">
    .tj-cltj{
        .y-table-title {
            line-height: 30px;
            span:first-child {
                font-size: 14px;
                font-weight: bold;
            }
            span:last-child {
                margin-left: 20px;
                color: #ed3f14;
            }

        }
        .create-order-title{
            text-align: center;

        }
    }
</style>