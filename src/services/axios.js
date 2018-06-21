import axios from 'axios'
import Cookies from 'js-cookie';
import Vue from "../main";

export const ROOT = '/lib';
export const UploadPath = ROOT + '/api/upload';
export const UploadBom = ROOT + '/api/uploadbom';
export const UploadMaterial = ROOT + '/api/uploadmaterial';

function Refresh() {
    Vue.$store.commit('clearOpenedSubmenu');
    Vue.$store.commit('clearAllTags');
    Vue.$store.commit('logout', this);
    Vue.$router.push({
        name: 'login'
    });
}

const instance = axios.create({
    baseURL: ROOT + '/api',
    timeout: 8000,
    headers: {'Content-Type': 'application/json',token:Cookies.get("token")}
});

instance.interceptors.response.use((res) =>{
    if(res.data.code == 0){
        return res.data.data
    }else{

        switch (res.data.code) {
            case 320106:
            case 320104:{
                return res.data.message;
            }break;
        }
        Vue.$Message.error(res.data.message);
        return 'error';
    }
}, (error) => {
    const {response} = error;

    if(!response)  {
        Refresh();
    }
    switch (response.status){
        case 401:{
            setTimeout(()=>{
                Refresh();
            },4000)

        }break;
    }
    Vue.$Notice.error({
        title: "警告",
        desc: response.data.Message||response.data,
        duration:4
    });
    return Promise.reject(error);
});

export default instance;

export const RESTful = function (target) {
    return  {
        findAll:params=> instance.get(`/${target}`,{params}),
        add:params=> instance.post(`/${target}`,params),
        remove:id=> instance.delete(`/${target}/${id}`),
        update:(id,params)=> instance.put(`/${target}/${id}`,params),
        findOne: (id)=> instance.get(`/${target}/${id}`)
    }
}
