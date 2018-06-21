import Cookies from 'js-cookie';
import aButton from '@/components/aButton';
import treeSelect from '@/components/treeSelect';
import tableSelect from '@/components/tableSelect';
import clickoutside from '@/components/clickoutside';
export default {
    install(Vue, options) {
        Vue.directive('auth', {
            bind (el, binding, vnode, oldVnode) {
                let auths = Vue.ls.get("auths");
                let superadmin = Cookies.get('superadmin');
                if(auths.indexOf(binding.value)==-1 && superadmin != "1"){
                    el.remove();
                }
            }
        });

        Vue.component('aButton',aButton)
        Vue.component('treeSelect',treeSelect)
        Vue.component('tableSelect',tableSelect)

        Vue.directive('outside',clickoutside)
    }
}