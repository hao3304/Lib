<template>
    <div class="customize-task">
        <div>
            <Button type="primary" size="small">返回</Button>
        </div>
        <div class="title">自定义填写任务单
            <div class="title-btn">
                <Button type="primary" size="small">保存</Button>
                <Button type="disabled" size="small">提交任务单</Button>
            </div>
        </div>
        <div class="task">
            <div class="btn">
                <Button type="primary">插入文字</Button>
                <Button type="primary">插入矩形</Button>
                <Button type="primary">插入复选框</Button>
            </div>
            <div class="content">
                <Form :label-width="100">

                    <Row>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:170px;" size="small" placeholder="请填写数据"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label="付款方式">
                            <CheckboxGroup>
                                <Checkbox label="现金"></Checkbox>
                                <Checkbox label="转账"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="检测报告发送方式">
                            <CheckboxGroup>
                                <Checkbox label="邮递"></Checkbox>
                                <Checkbox label="自取"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="样品回收约定">
                            <CheckboxGroup>
                                <Checkbox label="委托方回收"></Checkbox>
                                <Checkbox label="承检方处理"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>

            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="less">
    .customize-task {
        .title {
            line-height: 50px;
            &::before {
                content: "";
                display: inline-block;
                width: 4px;
                padding: 7px 0 8px 0;
                background-color: #2d8cf0;
                margin-right: 10px;
                vertical-align: text-bottom;
            }
            .title-btn {
                float: right;
            }
        }
        .task {
            padding: 0 60px;
            .btn {
                padding: 20px 0 40px;
            }
            .content {
                .ivu-form-item {
                    margin-bottom: 10px;
                }
            }

        }
    }
</style>