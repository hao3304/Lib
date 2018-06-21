<template>
    <table class="todo-table">
        <tr>
            <th>{{field}}</th>
            <th>操作</th>
        </tr>
        <tr v-for="(v,index) in list">
            <td>
                <span v-show="editIndex != index">{{v}}</span>
                <Input v-model="target" v-show=" index == editIndex" placeholder="请输入" style="width: 100%">
                </Input>
            </td>
            <td>
                <Button @click="onUpdate(index)"  v-show=" index == editIndex" type="primary" size="small" icon="checkmark"></Button>

                <Button v-show=" index != editIndex"  size="small" icon="edit" @click="onEdit(v,index)"></Button>
                <Button type="error" size="small" icon="trash-a" @click="onRemove(index)"></Button>

            </td>
        </tr>
        <tr v-show="editIndex==null">
            <td>
                <Input v-model="target" placeholder="请输入" style="width: 100%">
                </Input>
            </td>
            <td>
                <Button v-show="target" @click="onInsert" type="primary" size="small" icon="checkmark"></Button>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "todo",
        props:['value','field'],
        data(){
            return {
                list:this.value,
                target:'',
                editIndex:null
            }
        },
        methods:{
            onInsert(){
                this.list.push(this.target);
                this.target = '';
            },
            onRemove(index) {
                if(this.editIndex!=null) {
                    this.target = '';
                }
                this.editIndex=null;

                this.list = this.list.filter(function (v,i) {
                    return i != index
                });
            },
            onEdit(v,i){
                this.target = v;
                this.editIndex = i;
            },
            onUpdate(index){
                this.list[index] = this.target;
                this.editIndex = null;
                this.target = '';
            }
        },
        watch:{
            list(v){
                this.$emit('input',v);
            },
            value(){
                this.list = this.value;
                this.editIndex = null;
                this.target = "";
            }
        }
    }
</script>

<style lang="less" scoped>
    .todo-table{
        width: 100%;
        margin-top: 10px;
        border-collapse: collapse;
        border: 1px solid #ddd;
        box-sizing: border-box;
        tr{
            line-height: 20px;
            td:first-child{
                width: 70%;
            }
            td,th{
                border: 1px solid #ddd;
                text-align: center;
                padding: 4px;

            }
        }
    }
</style>