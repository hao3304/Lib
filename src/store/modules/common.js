import roleService from '@/services/system/role';
import departmentService from '@/services/config/department';
import PrinterService from '@/services/config/printer';
import workcenterService from '@/services/config/workcenter';
import MaterialseriesService from '@/services/config/materialseries';
import MaterialcatalogService from '@/services/config/materialcatalog';
import CustomerdockService from '@/services/config/customerdock';
import CustomerService from '@/services/config/customer';
import SectionService from '@/services/config/section';
import GroupService from '@/services/config/group';
import lineService from '@/services/config/line';
import routeService from '@/services/config/route';
import shiftService from '@/services/config/shift';
import teamService from '@/services/config/team';
import codeService from '@/services/config/code';
import templetService from '@/services/config/templet';
import backflush from '@/services/statistics/backflush';
import StationService from '@/services/config/station';

const common = {
    state: {
        progress_index: 0,
        work_center_type: {
            '0': '原材料仓库',
            '1': '生产车间',
            '2': '半成品仓库',
            '3': '成品仓库'
        },
        emp_type: { '0': '操作工', '1': '管理人员', '2': '检验员', '3': '维修工', '4': '物料员', '5': '班组长' },
        printer_type: {
            '0': '条码打印机',
            '1': '普通打印机'
        },
        station_type: {
            '0': '车间生产工位',
            '1': '仓库排序工位'
        },
        material_type: {
            '0': '零件',
            '1': '主关件',
            '2': '过桥部件',
            '3': '虚拟总成',
            '4': '半成品',
            '5': '成品',
        },
        material_attr: {
            '0': '外购',
            '1': '委外加工',
            '2': '虚拟件',
            '3': '自制物料',
        },
        lr_flag: {
            '0': '不区分',
            '1': '左',
            '2': '右',
        },
        tracking_way_2d: {
            '1': '精确追溯',
            '0': '批次追溯'
        },
        print_way: {
            '0': '仅打印总成',
            '1': '打印总成及货架',
            '2': '仅打印货架'
        },
        plan_status: {
            0: '初始',
            1: '已投入',
            2: '已打印',
            3: '进行中',
            4: '已完成',
            5: '关闭'
        },
        label_type: {
            "0": "总成标签",
            "1": "货架标签"
        },
        roles: [],
        departments: [],
        printers: [],
        workCenters: [],
        materialSeries: [],
        materialCatalog: [],
        customerDock: [],
        customers: [],
        sections: [],
        groups: [],
        lines: [],
        routes: [],
        shifts: [],
        teams: [],
        codes: [],  //打印条码规则
        templets: [],
        stations: []
    },
    mutations: {
        setProgress(state) {
            state.progress_index += 1;
        },
        setRoles(state, data) {
            state.roles = data;
        },
        setDepartments(state, data) {
            state.departments = data;
        },
        setPrinters(state, data) {
            state.printers = data;
        },
        setWorkCenters(state, data) {
            state.workCenters = data;
        },
        setMaterialSeries(state, data) {
            state.materialSeries = data;
        },
        setMaterialCatalog(state, data) {
            state.materialCatalog = data;
        },
        setCustomerDock(state, data) {
            state.customerDock = data;
        },
        setCustomers(state, data) {
            state.customers = data;
        },
        setSections(state, data) {
            state.sections = data;
        },
        setGroups(state, data) {
            state.groups = data;
        },
        setLines(state, data) {
            state.lines = data;
        },
        setRoutes(state, data) {
            state.routes = data;
        },
        setShifts(state, data) {
            state.shifts = data;
        },
        setTeams(state, data) {
            state.teams = data;
        },
        setCodes(state, data) {
            state.codes = data;
        },
        setTemplets(state, data) {
            state.templets = data;
        },
        setStations(state, data) {
            state.stations = data.data;
        }

    },
    actions: {
        getRoles({ commit }) {
            roleService.findAll({ size: 999 }).then(rep => {
                commit('setRoles', rep.data)
                commit('setProgress')
            })
        },
        getDepartments({ commit }) {
            departmentService.findAll({ size: 999 }).then(rep => {
                rep.forEach(r => {
                    r.open = true;
                })
                commit('setDepartments', rep)
                commit('setProgress')
            })
        },
        getPrinters({ commit }) {
            PrinterService.findAll({ size: 999 }).then(rep => {
                commit('setPrinters', rep.data)
                commit('setProgress')
            })
        },
        getWorkCenters({ commit }) {
            workcenterService.findAll({ size: 999 }).then(rep => {
                commit('setWorkCenters', rep.data)
                commit('setProgress')
            })
        },
        getMaterialSeries({ commit }) {
            MaterialseriesService.findAll({ size: 999 }).then(rep => {
                commit('setMaterialSeries', rep.data)
                commit('setProgress')
            })
        },
        getMaterialCatalog({ commit }) {
            MaterialcatalogService.findAll({ size: 999 }).then(rep => {
                commit('setMaterialCatalog', rep.data)
                commit('setProgress')
            })
        },
        getCustomerDock({ commit }) {
            CustomerdockService.findAll({ size: 999 }).then(rep => {
                commit('setCustomerDock', rep.data)
                commit('setProgress')
            })
        },
        getCustomers({ commit }) {
            CustomerService.findAll({ size: 999 }).then(rep => {
                commit('setCustomers', rep.data)
                commit('setProgress')
            })
        },
        getSections({ commit }) {
            SectionService.findAll({ size: 999 }).then(rep => {
                commit('setSections', rep.data)
                commit('setProgress')
            })
        },
        getGroups({ commit }) {
            GroupService.findAll({ size: 999 }).then(rep => {
                commit('setGroups', rep.data)
                commit('setProgress')
            })
        },
        getLines({ commit }) {
            lineService.findAll({ size: 999 }).then(rep => {
                commit('setLines', rep.data)
                commit('setProgress')
            })
        },
        getRoutes({ commit }) {
            routeService.findAll({ size: 999 }).then(rep => {
                commit('setRoutes', rep.data)
                commit('setProgress')
            })
        },
        getShifts({ commit }) {
            shiftService.findAll({ size: 999 }).then(rep => {
                commit('setShifts', rep.data)
                commit('setProgress')
            })
        },
        getTeams({ commit }) {
            teamService.findAll({ size: 999 }).then(rep => {
                commit('setTeams', rep.data)
                commit('setProgress')
            })
        },
        getCodes({ commit }) {
            codeService.findAll({ size: 999 }).then(rep => {
                commit('setCodes', rep)
                commit('setProgress')
            })
        },
        getTemplets({ commit }) {
            templetService.findAll({ size: 999 }).then(rep => {
                commit('setTemplets', rep)
                commit('setProgress')
            })
        },
        getStations({ commit }) {
            StationService.findAll({ size: 999 }).then(rep => {
                commit('setStations', rep)
                commit('setProgress')
            })
        }
    }
}

export default common