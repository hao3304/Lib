<template>
    <div>
        <div class="y-toolbar" style="padding-bottom: 15px;text-align: right;display: block;">
            <Button type="primary" icon="plus" v-auth="'system:privilege:add'" @click="onAdd" v-ripple>新增权限</Button>
        </div>
        <Row :gutter="10">
            <Col span="4">
            <Card>
                <div id="ztree" class="ztree"></div>
            </Card>
            </Col>
            <Col span="20">
            <div class="y-table">
                <Table :loading="loading" :columns="columns" :data="data"></Table>
            </div>
            </Col>
        </Row>
        <Modal
                v-model="privilegeModal"
                title="权限管理"
        >
            <Spin size="large" fix v-if="formLoading"></Spin>
            <Form ref="privilegeForm" :label-width="80" :model="privilegeForm" :rules="rules">
                <FormItem label="权限名称" prop="name">
                    <Input v-model="privilegeForm.name" placeholder="请输入权限名称"/>
                </FormItem>
                <FormItem label="权限类型">
                    <RadioGroup v-model="privilegeForm.type">
                        <Radio label="menu">
                            <span>菜单</span>
                        </Radio>
                        <Radio label="button">
                            <span>按钮</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="菜单地址" v-show="privilegeForm.type=='menu'">
                    <Input v-model="privilegeForm.url" placeholder="权限类型是button的话一般不需要配置"/>
                </FormItem>
                <FormItem label="菜单图标" v-show="privilegeForm.type=='menu'">
                    <Input v-model="privilegeForm.icon" placeholder="配置菜单的class"/>
                </FormItem>
                <FormItem label="父菜单">
                    <tree-select :data="menuTree" placeholder="请选择父菜单" v-model="privilegeForm.pid"></tree-select>
                </FormItem>
                <FormItem label="终端类型">
                    <RadioGroup v-model="privilegeForm.terminal">
                        <Radio label="WEB">
                            <span>WEB端</span>
                        </Radio>
                        <Radio label="CS">
                            <span>C/S端</span>
                        </Radio>
                        <Radio label="PDA">
                            <span>PDA</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="权限标识" prop="sign">
                    <Input v-model="privilegeForm.sign" placeholder="请输入权限标识"/>
                </FormItem>

                <FormItem label="排序权重">
                    <InputNumber :max="999" :min="1" v-model="privilegeForm.weight"></InputNumber>
                </FormItem>
                <FormItem label="备注">
                    <Input type="textarea" v-model="privilegeForm.remark" placeholder="请输入权限名"/>
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

    import privilegeService from '@/services/system/privilege';

    const privilegeModel = () => {
        return {
            id: '',
            name: '',
            type: 'menu',
            remark: '',
            pid: "0",
            icon: '',
            sign: '',
            terminal: 'WEB',
            url: '',
            weight: 1
        }
    }

    export default {
        name: "privilege_index",
        data() {

            return {
                columns: [{
                    title: '名称',
                    key: 'name',
                }, {
                    title: '权限标识',
                    key: 'sign',
                }, {
                    title: '类型',
                    render: (h, params) => {
                        return h("div", [
                            h('Tag', {
                                props: {
                                    color: params.row.type == 'menu' ? 'blue' : 'yellow'
                                }
                            }, params.row.type)
                        ])
                    }
                }, {
                    title: '图标',
                    render: (h, params) => {
                        return h("div", [
                            h('i', {
                                class: this.getIcon(params.row.icon),
                                style: {
                                    fontSize: '20px'
                                }
                            })
                        ])
                    }
                }, {
                    title: '地址',
                    key: 'url',
                }, {
                    title: '终端类型',
                    key: 'terminal',
                }, {
                    title: '权重',
                    key: 'weight',
                }, {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('aButton', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    text: '编辑',
                                    auth: 'system:privilege:edit'
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
                                    text: '删除',
                                    auth: 'system:privilege:delete'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.onRemove(params.row.id)
                                    }
                                }
                            })
                        ]);
                    }
                }],
                data: [],
                query: {},
                privilegeModal: false,
                privilegeForm: privilegeModel(),
                rules: {
                    name: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    sign: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ]

                },
                formLoading: false,
                loading: true,
                menuTree: [],
                sourceData: [],
                selectId: null
            }
        },
        methods: {
            getIcon(icon) {
                if (icon) {
                    return icon.indexOf('yizit') > -1 ? icon : `ivu-icon ivu-icon-${icon}`
                } else {
                    return '';
                }
            },
            render() {
                this.loading = true;
                privilegeService.findAll(this.query).then(rep => {
                    if (rep) {
                        var data = rep.sort((a, b) => {
                            return parseInt(a.weight) - parseInt(b.weight);
                        });
                        this.sourceData = data;
                        this.data = data;
                        this.menuTree = this.getMenuTree(data);
                        this.renderTree(this.menuTree);
                    }
                    this.loading = false;
                })
            },
            onSave() {
                this.$refs['privilegeForm'].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        if (!this.privilegeForm.id) {
                            privilegeService.add(this.privilegeForm).then(rep => {
                                if (rep) {
                                    this.formLoading = false;
                                    this.$Message.success('新增权限成功！');
                                    this.render();
                                    this.privilegeModal = false;
                                }
                            }).catch(() => {
                                this.privilegeModal = false;
                                this.formLoading = false;
                            })
                        } else {
                            privilegeService.update(this.privilegeForm.id, this.privilegeForm).then(rep => {
                                if (rep) {
                                    this.formLoading = false;
                                    this.$Message.success('更新权限成功！');
                                    this.render();
                                    this.privilegeModal = false;
                                }
                            }).catch(() => {
                                this.privilegeModal = false;
                                this.formLoading = false;
                            })
                        }
                    }
                })
            },
            onEdit(row) {
                this.privilegeForm = {...privilegeModel(), ...row};
                this.$refs['privilegeForm'].resetFields();
                this.privilegeModal = true;
            },
            onRemove(id) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定删除该权限？',
                    onOk: () => {
                        privilegeService.remove(id).then(rep => {
                            if (rep == 'success') {
                                this.$Message.success("删除成功!");
                                this.render();
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            onCancel() {
                this.privilegeModal = false;
            },
            onAdd() {
                this.privilegeForm = privilegeModel();
                if (this.selectId != null) {
                    this.privilegeForm.pid = this.selectId;
                }
                this.$refs['privilegeForm'].resetFields();
                this.privilegeModal = true;
            },
            transTree(list) {
                let tree = [];
                let data = JSON.parse(JSON.stringify(list));
                data.forEach(d => d.children = []);
                const loop = function (node) {
                    data.forEach(item => {
                        if (item.pid == node.id) {
                            node.children.push(item);
                            loop(item);
                        }
                    })
                }
                data.forEach(item => {
                    item.expanded = true;
                    if (item.pid == 0) {
                        tree.push(item);
                        loop(item);
                    }
                })
                return tree;
            },
            getMenuTree(list) {
                let treeData = list.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        pid: item.pid,
                        type: item.type,
                        open: true
                    }
                }).filter(l => l.type == 'menu');

                return [{name: '根目录', id: "0", pid: null, open: true, selected: true}, ...treeData]
            },
            renderTree(data) {
                var setting = {
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey: 'pid'
                        },
                    },
                    callback: {
                        onClick: this.onTreeClick
                    }
                };
                this.$privilegeTree = $.fn.zTree.init($("#ztree"), setting, data);
                if (this.selectId != null) {
                    let node = this.$privilegeTree.getNodeByParam("id", this.selectId);
                    if (node) {
                        this.$privilegeTree.selectNode(node);
                        this.onTreeClick(null, null, node);
                    }
                    else {
                        this.selectId = null;
                    }

                }
            },
            onTreeClick(e, target, node) {
                this.selectId = node.id;
                this.filterData(node.id);
            },
            filterData(id) {
                if (id == '0') {
                    this.data = this.sourceData;
                } else {
                    let parent = this.sourceData.find(s => s.id == id);
                    let children = this.sourceData.filter(s => s.pid == id);
                    this.data = [parent, ...children];
                }
            },
        },
        mounted() {
            this.render();
        }
    }
</script>

<style lang="less" scoped>

</style>