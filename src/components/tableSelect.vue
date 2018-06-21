<template>
    <div class="table-select" :id="nanoid" v-outside="onClick">
        <div class="ivu-select ivu-select-single" @click="onShow">
            <div class="ivu-select-selection">
                <input  ref="input" type="hidden" v-model="currentValue" >
                <span class="ivu-select-selected-value" v-if="textValue">
                    {{textValue}}
                </span>
                <span class="ivu-select-placeholder" v-else>{{placeholder||''}}</span>
                <i class="ivu-icon ivu-icon-ios-close ivu-select-arrow" style="display: none;"></i>
                <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
            </div>
        </div>
        <div class="table-content" v-if="show">
            <header>查询过滤</header>
            <div class="body" >
                <table style="width: 100%">
                    <tr>
                        <td>
                            <Input size="small"  v-model="query.keywords" :placeholder="holder" />
                        </td>
                        <td style="padding-left: 10px;">
                            <Button size="small" type="primary" icon="search" @click="onSearch" >查询</Button>
                            <Button size="small"  @click="onReset" icon="refresh" >重置</Button>
                        </td>
                    </tr>
                </table>
                <Table   :loading="loading" @on-row-dblclick="onDbClick" size="small" border  :columns="columns" :data="data"></Table>
                <div class="page-block">
                    <Page :total="total" :current="query.page" size="small" :page-size="query.size" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" show-elevator show-total ></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var nanoid = require('nanoid');
    import service from '@/services/common';
    import Emitter from './emitter'
    export default {
        props:['columns','value','table','placeholder','text','textField','condition'],
        mixins:[Emitter],
        data(){
            return {
                show:false,
                data:[],
                loading:false,
                query:{
                    size:5,
                    page:1,
                    columns:this.columns.map(c=>c.key),
                    keywords:"",
                    table:this.table,
                    condition:''
                },
                textValue:this.text,
                nanoid:nanoid(),
                total:0,
                currentValue:this.value+''
            }
        },
        computed:{
            holder(){
                return  this.columns.map(c=>c.title).join(',');
            }
        },
        methods:{
            render(){
                this.loading = true;

                if(this.condition) {
                    this.query.condition = this.condition;
                }

                service.add(this.query).then(rep=>{
                    this.data = rep.data;
                    this.total = rep.total;
                    this.query.size = rep.size;
                    this.query.page = rep.page;
                    this.loading = false;
                })
            },
            onClick(e){
                this.show = false;
            },
            onPageChange(page){
                this.query.page = page;
                this.render();
            },
            onPageSizeChange(size) {
                this.query.size = size;
                this.render();
            },
            onDbClick(row){
                if(this.currentValue == row.id) {
                    return  this.show = false;
                }
                this.$emit('input',row.id);
                this.textValue = this.textField?row[this.textField]:row.name;
                this.currentValue = row.id;
                this.$emit('change',row);
                this.show = false;
            },
            onSearch() {
                this.render();
            },
            onReset(){
                this.query.keywords = '';
                this.render();
            },
            onShow(){
                this.show = true;
            }
        },
        watch:{
            show(){
                if(this.show) {
                    this.render();
                    this.$refs.input.focus();
                    this.dispatch('FormItem', 'on-form-change',this.currentValue);
                }
            },
            currentValue(value){
                this.$emit('input',value);
                this.$refs.input.focus();
                this.dispatch('FormItem', 'on-form-change', this.currentValue);

            },
            value(v){
                if(this.currentValue == v) {
                    return;
                }
                if(v=='' || v == null || v== undefined) {
                    this.textValue = '';
                }
                this.currentValue = v;
                this.$refs.input.focus();
                this.dispatch('FormItem', 'on-form-change', this.currentValue);

            },
            text(t) {
                this.textValue = t;
            }
        },
        mounted(){
            // document.addEventListener("click", (e)=>{
            //     this.show = false;
            // });
            //
            // $(document).on('test_click', (e,id)=> {
            //     if(id != this.nanoid) {
            //         this.show = false;
            //     }
            // })
        }
    }
</script>

<style lang="less" >
    .table-select{
        .table-content {
            header{
                background-color: #717971;
                color: #fff;
                padding: 0 10px;
            }
            position: absolute;
            background-color: #fff;
            border:1px solid #ddd;
            box-shadow: 1px 1px 1px #ddd;
            z-index: 1000;
            left:0;
            width: 460px;
            .ivu-table-small td{
                height: 30px;
            }
            .body{
                max-height: 320px;
                min-height: 200px;
                overflow-y: auto;
                padding: 10px 10px 0 10px;
            }
        }
    }
</style>