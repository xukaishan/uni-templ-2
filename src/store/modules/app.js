const state = {
	CheckData:'',
	ProductName:{
		catName:'请选择'
	},
	EntrustName:{
		wtOrgName:'请选择'
	},
	ContractNo:{
		protocolNo:'请选择'
	},
	BasisList:[],
	Permissions:true
}

const mutations = {
	CHECK_DATA: (state, data) => {
	    state.CheckData = data;
	},
	PRODUCT_NAME: (state, data) => {
	    state.ProductName = data;
	},
	ENTRUST_NAME: (state, data) => {
	    state.EntrustName = data;
	},
	CONTRACT_NO: (state, data) => {
	    state.ContractNo = data;
	},
	BASISLIST: (state, data) => {
	    state.BasisList = data;
	},
	PERMISSIONS: (state, data) => {
	    state.Permissions = data;
	},
}

const actions = {
	   checkdata ({ commit,state }, res) {
		 commit('CHECK_DATA', res)
	   },
	   productname ({ commit,state }, res) {
	   		 commit('PRODUCT_NAME', res)
	   },
	   entrustname ({ commit,state }, res) {
	   		 commit('ENTRUST_NAME', res)
	   },
	   contractno ({ commit,state }, res) {
	   		 commit('CONTRACT_NO', res)
	   },
	   basislist ({ commit,state }, res) {
	   		 commit('BASISLIST', res)
	   },
	   permissions ({ commit,state }, res) {
	   		 commit('PERMISSIONS', res)
	   },
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
