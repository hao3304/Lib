<template>
    <div class="tree-select" v-outside="onClick" >
        <div class="ivu-select ivu-select-single" style="min-width: 162px" @click="onShow">
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
        <div class="tree-content" v-show="show">
            <!--<Tree :data="data" @on-select-change="onSelect"></Tree>-->
            <div :id="nanoid" class="ztree"></div>
        </div>
    </div>
</template>

<script>
    var nanoid = require('nanoid')
    import Emitter from './emitter'
    export default {
        mixins:[Emitter],
        data(){
            return{
                currentValue:this.value,
                show:false,
                textValue:'',
                nanoid:nanoid()
            }
        },
        watch:{
            currentValue(v){
                this.$refs.input.focus();
                this.$emit('input', v);
            },
            value(v){
                this.currentValue = v;
                this.$nextTick(()=>{
                    let node = this.getSelected(v);
                    this.textValue = node?node.name:"";
                    if(!node) {
                        this.currentValue = '';
                    }
                    this.$refs.input.focus();
                    this.dispatch('FormItem', 'on-form-change',this.currentValue);
                })
            },
            data(d){
                if(d.length>0) {
                    this.renderTree();
                }
            }
        },
        props:{
          value:[String,Number],
          placeholder:String,
          data:Array
        },
        name: "tree-select",
        methods:{
            onSelect(e,item,node){
                this.textValue = node.name;
                this.currentValue = node.id;
                this.$refs.input.focus();
                this.dispatch('FormItem', 'on-form-change',this.currentValue);
                this.show =false;
            },
            onClick(){
                this.show =false;
            },
            getSelected(id){
                if(! this.$tree) {
                    this.renderTree();
                }
                let node = this.$tree.getNodeByParam("id",id);
                return node;
            },
            renderTree(){
                var setting = {
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey:'pid'
                        }
                    },
                    callback:{
                        onClick:this.onSelect
                    }
                };
                this.$tree = $.fn.zTree.init($("#"+this.nanoid), setting, this.data);
            },
            clearTree(){

            },
            onShow() {
                this.show = true;
            }
        },
        mounted(){
            if(this.data) {
                this.renderTree();
            }
        }
    }
</script>

<style lang="less" scoped>
    .tree-select{
        .tree-content {
            position: absolute;
            background-color: #fff;
            border:1px solid #ddd;
            padding: 0 10px;
            box-shadow: 1px 1px 1px #ddd;
            z-index: 1000;
            left:0;
            right: 0;
            max-height: 200px;
            overflow-y: auto;
            .ivu-tree ul li{
                line-height: 21px;
            }
            .ivu-tree-title{
                line-height: 21px;
            }
        }
    }
</style>