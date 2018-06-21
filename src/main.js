import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import VueLocalStorage from 'vue-ls';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import Ripple from 'vue-ripple-directive'
import VueI18n from 'vue-i18n';
import util from '@/libs/util';
import auth from '@/libs/auth';
import Vuebar from 'vuebar';

import $ from 'jquery';
import 'ztree';
import 'ztree/css/zTreeStyle/zTreeStyle.css'
import './styles/yizitfont.css';

import Transitions from 'vue2-transitions'
Vue.use(Transitions)

Vue.use(VueI18n);
Vue.use(iView);
Vue.use(auth);
Vue.use(VueLocalStorage, {namespace:'mes__'});
Vue.use(Vuebar);
Ripple.color = 'rgba(255, 255, 255, 0.1)';
Vue.directive('ripple', Ripple);

router.beforeEach((to,from,next) => {
       if(to.matched.length == 0) {
           next({name:'error-404'});
       }
    next();
});
export default new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    methods:{
      getCurrentIndex(name){
          if(!name){
              return;
          }

          var index;

          let menus = this.$ls.get("menus");

          var loop = function (data,i) {
              data.forEach(d=>{
                  if(d.url == name) {
                      return index = i;
                  }else if(d.children.length>0) {
                      loop(d.children,i);
                  }
              })
          }

          menus.forEach((item,i)=>{
              if(item.url == name) {
                  return index = i;
              }else if(item.children.length>0) {
                  loop(item.children,i);
              }

          });
          this.$store.commit('setCurrentModuleIndex',index||0);
      }
    },
    mounted () {
        this.currentPageName = this.$route.name;
        this.getCurrentIndex(localStorage['currentPageName']);
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        // this.$store.commit('updateMenulist');
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);

        let auths = this.$ls.get('auths')
        this.$store.commit('setAuths',auths);

    }
});


