<template>
    <div class="test-protocol">
        <div class="y-toolbar" style="padding-bottom: 15px;">
            <div class="y-query">
                <span class="y-title">
                    委托检测协议(变压器)
</span>
            </div>
            <div class="y-query-btn" style="width: 300px;">
                <Button type="primary">保存</Button>
                <Button type="success" >派发</Button>
                <Button type="disabled">查看委托单</Button>
            </div>
            <div class="y-add-btn" >

                <Button type="info" >返回</Button>
            </div>
        </div>

        <Card class="protocol">
            <Form  :model="protocol" :label-width="120">
                <Row>
                    <Col span="8">
                        <FormItem label="合同编号">
                            <Input style="width:240px" placeholder="请输入合同编号" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="委托方全称">
                            <Input style="width:240px" placeholder="请输入委托方全称" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="委托方地址">
                            <Input style="width:240px" placeholder="请输入委托方地址" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="联系人/送检人">
                            <Input style="width:240px" placeholder="请输入联系人/送检人" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="委托方电话">
                            <Input style="width:240px" placeholder="请输入委托方电话" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="委托时间">
                            <Input style="width:240px" placeholder="请输入委托时间" />
                        </FormItem>
                    </Col>
                </Row><Row>
                    <Col span="8">
                        <FormItem label="付款方式">
                                 <RadioGroup>
                                        <Radio label="现金"></Radio>
                                        <Radio label="转账"></Radio>
                                </RadioGroup>                        
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="检测报告发送方式">
                            <RadioGroup>
                                        <Radio label="邮递"></Radio>
                                        <Radio label="自取"></Radio>
                                </RadioGroup>  
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="样品回收约定">
                            <RadioGroup>
                                        <Radio label="委托方回收"></Radio>
                                        <Radio label="承检方处理"></Radio>
                                </RadioGroup>  
                        </FormItem>
                    </Col>
                </Row><Row>
                    <Col span="8">
                        <FormItem label="承检方全程">
                            <Input style="width:240px" placeholder="请输入承检方全程" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="承检方地址">
                            <Input style="width:240px" placeholder="请输入承检方地址" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="承检方电话">
                            <Input style="width:240px" placeholder="请输入承检方电话" />
                        </FormItem>
                    </Col>
                </Row><Row>
                    <Col span="8">
                        <FormItem label="承检方邮编">
                            <Input style="width:240px" placeholder="请输入承检方邮编" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="承检方传真">
                            <Input style="width:240px" placeholder="请输入承检方传真" />
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </Card>

        <card class="desc">
            <div class="tabl">
                <Table :loading="loading" :columns="columns" :data="data"></Table>
            </div>
            <div class="stand">
                <Form :label-width="100">
                    <Row>
                        <Col>
                            <FormItem label="检测项目:">
                                <Input type="textarea" :rows="2"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="检测标准:">
                                <Input type="textarea" :rows="8"></Input>
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </div>
        </card>
        <div class="end">
            <div class="money">
                <p>检测费用合计:</p>
                <div class="price">
                    ¥<input style="margin-left:20px;"/>元 (大写)
                    <input/>佰
                    <input/>拾
                    <input/>万
                    <input/>仟
                    <input/>佰
                    <input/>拾
                    <input/>元整
                </div>
            </div>
            <div class="limitdate">
                <p>完成期限： 1.计划送检：承诺15个工作日内完成检测，并出具报告/证书；</p>
                <p>2.非计划送检:根据工作安排,双方协商确定<input style="width:30px;"/>工作日内完成送检，并出具报告/证书；</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            query: {
                    name: '',
                    no: '',
                    unit: '',
                    size: 10
            },
            protocol:{
                protocolNo:"",
                clientName:"",
                clientAddress:"",
                clientContacts:"",
                clientPhone:"",
                clientDate:"",
                payType:"",
                sendType:"",
            },
            columns:[
                {
                    title: "序号",
                    render: (h, params) => {
                        let current = this.query.size * (this.query.page - 1) + params.index + 1;
                        return h('div', {}, current);
                    },
                    width: 60
                },
                {
                    title: '试品名称/编号',
                    key: 'name',
                },
                {
                    title: '型号规格',
                    key: 'type',
                },
                {
                    title: '数量',
                    key: 'count',
                },
                {
                    title: '制造商',
                    key: 'manufacturer',
                },
                {
                    title: '检测项目',
                    key: 'testitem',
                },
                {
                    title: '检测标准',
                    key: 'teststand',
                }
            ],
            data:[],
        }
    }
}
</script>

<style lang="less">
    .test-protocol{
        .title{
            line-height: 50px;
            &::before{
                content:"";
                display: inline-block;
                width:4px;
                padding: 7px 0 8px 0;
                background-color:#2d8cf0;
                margin-right:10px;
                vertical-align: text-bottom;
            }
            .title-btn{
                float:right;
            }
        }
       
        .protocol{
            background-color:#fff;
            .ivu-form-item{
                margin-bottom:5px;
            }
        }
        .desc{
            height:300px;
            margin-top: 10px;
            background-color:#fff;
            font-size:0;
            letter-spacing: -3px;
            .tabl,.stand{
                display: inline-block;
                font-size:12px;
                letter-spacing: normal;
                vertical-align: top;
            }
            .tabl{
                width:60%;
                height:100%;
            }
            .stand{
                width:calc( ~ "40% - 10px");
                height:100%;
            }
        }
        .end{
            background-color:#fff;
            font-size:0px;
            margin-top: 10px;
            letter-spacing: -3px;
            .money,.limitdate{
                display: inline-block;
                font-size:12px;
                letter-spacing: normal;
                vertical-align: top;
            }
            .money{
                width:50%;
                p:first-child{
                    color:red;
                }
                .price{
                    input{
                        width:30px;
                        border:none;
                    }
                    border:1px solid #dddee1;
                    display: inline-block;
                    line-height: 25px;
                    padding-left:20px;
                    padding-right:50px;
                    border-radius: 4px;
                }
                

            }
            .limitdate{
                width:50%;
                p:nth-child(2){
                    text-indent: 63px;
                }
            }
        }

    }
</style>
