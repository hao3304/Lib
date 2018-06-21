<template>
    <Row class="expand-row" v-if="row.type == 0">
        <Col span="8">
        <span class="expand-key">所属生产线: </span>
        <span class="expand-value">{{getLineName(row.lineid)}}</span>
        </Col>
        <Col span="8">
        <span class="expand-key">所属工段: </span>
        <span class="expand-value">{{getSectionName(row.sectionid)}}</span>
        </Col>
        <Col span="8">
        <span class="expand-key">所属群组（工序）: </span>
        <span class="expand-value">{{getGroupName(row.groupid)}}</span>
        </Col>
    </Row>
    <Row  class="expand-row"  v-else>
        <Col span="6">
        <span class="expand-key">道口: </span>
        <span class="expand-value">{{getDockName(row.dockid)}}</span>
        </Col>
        <Col span="6">
        <span class="expand-key">解析关键词: </span>
        <span class="expand-value">{{row.analysis_keyword}}</span>
        </Col>
        <Col span="6">
        <span class="expand-key">排序单物料数: </span>
        <span class="expand-value">{{row.sort_mtrl_num}}</span>
        </Col>
        <Col span="6">
        <span class="expand-key">排序单号规则: </span>
        <span class="expand-value">{{row.sortno_format}}</span>
        </Col>
        <Col span="6">
        <span class="expand-key">排序顺序: </span>
        <span class="expand-value">{{row.sequence == 0?'顺序':'逆序'}}</span>
        </Col>
        <Col span="6">
        <span class="expand-key">打印机: </span>
        <span class="expand-value">{{getPrintName(row.printerid)}}</span>
        </Col>
        <Col span="6">
        <span class="expand-key">打印份数: </span>
        <span class="expand-value">{{row.copy}}</span>
        </Col>
        <Col span="6">
        <span class="expand-key">标准节拍: </span>
        <span class="expand-value">{{row.beat}}</span>
        </Col>
    </Row>
</template>

<script>
    export default {
        props:{
            row:{
                type:Object
            }
        },
        computed:{
            docks(){
                return this.$store.state.common.customerDock;
            },
            printers(){
                return this.$store.state.common.printers;
            },
            lines(){
                return this.$store.state.common.lines;
            },
            sections(){
                return this.$store.state.common.sections;
            },
            groups(){
                return this.$store.state.common.groups;
            }
        },
        name: "station_expand",
        methods:{
            getPrintName(id) {
                let target = this.printers.find(p=>p.id == id);
                return target?target.name:""
            },
            getDockName(id) {
                let target = this.docks.find(p=>p.id == id);
                return target?target.name:""
            },
            getLineName(id) {
                let target = this.lines.find(p=>p.id == id);
                return target?target.name:""
            },
            getSectionName(id) {
                let target = this.sections.find(p=>p.id == id);
                return target?target.name:""
            },
            getGroupName(id) {
                let target = this.groups.find(p=>p.id == id);
                return target?target.name:""
            }
        }
    }
</script>

<style lang="less" scoped>
    .expand-row{
        .ivu-col{
            margin-bottom: 10px;
        }
    }
</style>