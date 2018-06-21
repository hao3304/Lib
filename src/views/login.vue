<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">

        <!--<section >-->
        <!--<div class="block1"></div>-->
        <!--<div class="block2"></div>-->
        <!--<div class="block3"></div>-->
        <!--</section>-->
        <!--<div class="container">-->
        <!--<div class="login-bg"></div>-->

        <!--<div class="login-form">-->

        <!--<div class="logo">-->
        <!--<span class="gear-a"></span>-->
        <!--<span class="gear-b"></span>-->
        <!--<span class="gear-c"></span>-->
        <!--</div>-->
        <!--<h5>-->
        <!--因致生产管理系统-->
        <!--</h5>-->
        <!--<p>-->
        <!--制造执行系统应用软件v1.0-->
        <!--</p>-->
        <!--<Form  ref="loginForm" :model="form" :rules="rules">-->
        <!--<FormItem prop="username">-->
        <!--<i class="font yizityh"></i>-->
        <!--<Input v-model="form.username" placeholder="请输入用户名" />-->
        <!--</FormItem>-->
        <!--<FormItem prop="password">-->
        <!--<i class="font yizitmm"></i>-->
        <!--<Input type="password" v-model="form.password" placeholder="请输入密码" />-->
        <!--</FormItem>-->
        <!--<FormItem>-->
        <!--<Button @click="handleSubmit"  long :loading="loading" v-ripple.mouseover>登录</Button>-->
        <!--<p class="login-tip" v-if="msg">{{msg}}</p>-->
        <!--</FormItem>-->
        <!--</Form>-->
        <!--</div>-->
        <!--</div>-->

        <div class="log-form">
            <h2>Login to your account</h2>
            <Form  ref="loginForm" :model="form" :rules="rules">
                <FormItem prop="username">
                    <Input v-model="form.username" placeholder="请输入用户名" />
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="form.password" placeholder="请输入密码" />
                </FormItem>
                <FormItem>
                    <Button @click="handleSubmit"  long :loading="loading" v-ripple.mouseover>登录</Button>
                    <p class="login-tip" v-if="msg">{{msg}}</p>
                </FormItem>
            </Form>
        </div><!--end log form -->
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import loginService from '@/services/login';
    import axios from '../services/axios';
    export default {
        data () {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                msg:"",
                loading:false
            };
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        loginService.login({...this.form,mode:"WEB"}).then(rep=>{
                            if(typeof rep == 'string') {
                                this.msg = rep;
                            }else{

                                if(rep.auths.length==0) {
                                    this.loading = false;
                                    this.msg = '';
                                    return  this.$Notice.error({
                                        title: "提示",
                                        desc: "您没有权限登录系统，请联系管理员。",
                                        duration:4
                                    });
                                }

                                this.$Message.success("登录成功！");
                                Cookies.set('user', rep.user.username,{ expires: 1 });
                                Cookies.set('token', rep.token,{ expires: 1 });
                                if(rep.user.username == 'yizitadmin') {
                                    Cookies.set('superadmin',1,{ expires: 1 });
                                }else{
                                    Cookies.set('superadmin',0,{ expires: 1 });
                                }
                                let menus = rep.menus.sort((a,b)=>{
                                    return parseInt(a.weight) - parseInt(b.weight);
                                })
                                axios.defaults.headers.token = rep.token;
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                this.$store.commit('setModuleList',menus);
                                this.$ls.set('menus',menus);
                                this.$ls.set('auths',rep.auths);
                                this.$store.commit('setAuths',rep.auths);
                                this.$router.push({
                                    name: 'home_index'
                                });
                            }
                            this.loading = false;
                        }).catch(rep=>{
                            this.loading = false;
                        })
                    }
                });
            }
        },
        mounted(){

        }
    };
</script>

<style>

</style>
