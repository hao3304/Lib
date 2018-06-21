import instance,{RESTful} from '../axios'

export const getPlanNo = ()=>instance.get('/plan/getplanno')
export const getWeek = params=>instance.get('/plan/week',{params})
export const getDay = params=>instance.get('/plan/day',{params})
export const closePlan = id=>instance.delete('/plandetail/'+ id)
export const updatePlan = (id, params)=>instance.put('/plandetail/'+ id, params)

export default RESTful('plan')
