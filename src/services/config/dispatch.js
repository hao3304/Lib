import {RESTful} from '../axios'
import instance from "../axios";

export const operate = (params)=>instance.post('/operate', params)
export const backend = (params)=>instance.post('/dispatch', params)

export default RESTful('dispatch')
