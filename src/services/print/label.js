import instance,{RESTful} from '../axios'

export const getLabels= (params)=>instance.get('/labelprintdetail',{params})
export const adjustLabels= (params)=>instance.post('/labeladjustprint',params)
export const reLabels= (params)=>instance.post('/labelreprint',params)

export default RESTful('labelprint')
