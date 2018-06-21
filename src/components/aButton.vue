<template>
        <Button :type="type" :size="size" :icon="icon" :disabled="disabled" v-auth="auth" @click="onClick" v-if="text" >{{text}}</Button>
        <Button :type="type" :size="size" :icon="icon" :disabled="disabled" v-auth="auth" @click="onClick" v-else></Button>
</template>

<script>
    export default {
        name: "aButton",
        props:['type','size','text','auth','icon','disabled'],
        methods:{
            onClick(){
                this.$emit('click')
            }
        }

    }
</script>
<style scoped>

</style>