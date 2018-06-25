<template>
    <div>
        <div class="y-toolbar" style="padding-bottom: 15px;">
            <div class="y-query">
                <Form :label-width="90" :model="query" ref="queryForm"  inline>

                </Form>
            </div>
            <div class="y-query-btn">
                <Button type="success" icon="search" @click="onQuery"  v-ripple>查询</Button>
                <Button  icon="refresh" @click="onReset">重置</Button>
            </div>
            <div class="y-add-btn">
                <Button v-auth="'config:line:add'" type="primary" icon="plus" @click="onAdd" v-ripple>新建委托单</Button>
            </div>
        </div>

        <Modal v-model="modal" title="新建委托单" width="1200" style="padding:10;">

            <Form  :label-width="100">
                <Row>

                </Row>
            </Form>
            <div slot="footer">
                <Button @click="onCancel">取消</Button>
                <Button @click="onSave" icon="checkmark" type="primary">提交</Button>
            </div>
        </Modal>

        <div class="y-table">
            <Table  :loading="loading" :columns="columns" :data="data" ></Table>
            <div class="page-block">
                <Page :total="total" :page-size="query.size" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" show-elevator show-total show-sizer></Page>
            </div>
        </div>

    </div>


</template>
<script>
    export default {
        name: 'task_index',
        data() {
            return {
                query: {
                    name: '',
                    no: '',
                    unit: '',
                    size: 10
                },
                loading: false,
                total: 0,
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
                data: [],
                modal: false
            }
        },
        methods: {
            onPageSizeChange() {

            },
            onPageChange() {

            },
            onQuery() {

            },
            onAdd() {
                this.modal = true;
            },
            onSave() {

            },
            onCancel() {
                this.modal = false;
            },
            onReset() {}
        }
    }
</script>