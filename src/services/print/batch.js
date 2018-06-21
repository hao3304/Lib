import instance,{RESTful} from '../axios'

export const getPrintSn= (params)=>instance.get('/batchprintsn',{params})
export const postPrintSn= (params)=>instance.post('/batchprintsn',params)
export const getPrintInfo = (params)=>instance.get('/labelprint_mtrl_ref',{params})

export default RESTful('batchprint')
