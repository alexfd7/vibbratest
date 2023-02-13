import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VuexPersistence from 'vuex-persist'
import componentes from './componentes'
import { RootState } from './rootState'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { UsuarioManager } from './usuarioManager'
import { ConfigManager } from './configManager'

Vue.use(Vuex)

const rootState: RootState = {
    isLoading: true,
    isAuthenticated: false,
    isUpdated: true,
    isServerOut: false,

    unidadeId: parseInt(localStorage.unidadePadraoId) || 1,

    config: {} as ConfigManager,
    erros: [],
    usuario: {} as UsuarioManager,

    status: [],
    unidades: [],
    integradores: [],
    cidades: [],
    conselhos: [],
    estados: [],
    agendamentoTarefaConfiguracoes: ""
}

const rootGetters: GetterTree<RootState, RootState> = {
    isInRole: (state) => (role) => {
        return state.usuario.regras != null && state.usuario.regras.includes(role);
    },
    isUser: (state) => (userId) => {
        return state.usuario.id == userId;
    } 
}

const rootActions: ActionTree<RootState, RootState> = {
    async init ({ dispatch }) {
        Vue.use(VueResource)
        return await Promise.all([
            dispatch('restoreContext'),
            dispatch('getUser')
        ])
    },
    login({ commit }, credentials) {
        commit('SET_ISLOADING', true)
        commit('CLEAR_ERRO')
        return Vue.http.post('/api/auth/login', credentials)
            .then(res => {
                commit('SET_AUTH', res.data)
                commit('SET_ISLOADING', false)
                commit('idle/RESTART_TIME')                
            })
            .catch(err => {
                commit('SET_AUTH', {})
                commit('ADD_ERRO', err.data?.erro ?? err.message)
                commit('SET_ISLOADING', false)
            })
    },
    logout({ commit }) {
        commit('SET_ISLOADING', true)
        return Vue.http.post('/api/auth/logout')
            .then(() => {
                commit('SET_AUTH', {})
                commit('SET_ISLOADING', false)

                history.pushState(null, 'Login', '/');
            })
            .catch(err => {
                commit('SET_AUTH', {})
                commit('ADD_ERRO', err.response?.data?.erro ?? err.message)
                commit('SET_ISLOADING', false)
            })
    },
    async restoreContext({ commit }) {
        commit('SET_ISLOADING', true)
        await Vue.http.get('/api/auth/config')
            .then(res => {
                commit('SET_CONFIG', res.data)
            })
            .catch(err => {
                commit('SET_AUTH', {})
                commit('ADD_ERRO', "Não foi possível buscar as configurações!\n" + err.response.data.erro)
                return
            })
    },
    async getUser({ commit }){
        await Vue.http.get('/api/auth/context')
            .then(res => {
                commit('SET_AUTH', res.data)
                commit('SET_ISLOADING', false)
            })
            .catch(() => {
                commit('SET_AUTH', {})
                commit('SET_ISLOADING', false)
            })
    }
}

const rootMutations: MutationTree<RootState> = {
    SET_ISLOADING(state, isLoading) {
        state.isLoading = isLoading
    },
    SET_ISUPDATED(state, isUpdated) {
        state.isUpdated = isUpdated
    },
    SET_ISSERVEROUT(state, isServerOut) {
        state.isServerOut = isServerOut
    },
    SET_CONFIG(state, config) {

        if(config.language){
            localStorage.lang = config.language
        }

        state.config = config
    },
    SET_UNIDADE(state, id) {
        state.unidadeId = id;
        localStorage.unidadePadraoId = id;
    },
    CLEAR_ERRO(state) {
        state.erros = [];
    },
    ADD_ERRO(state, erro) {
        state.erros.push(erro);
    }, 
    SET_AGENDAMENTOTAREFACONFIG(state, config) {
        state.agendamentoTarefaConfiguracoes = config;
    }, 
    SET_AUTH(state, auth) {
        state.usuario.nome = auth.usuario
        state.usuario.nomeCadastro = auth.nomeCadastro
        state.usuario.id = auth.id 
        state.usuario.funcionarioId = auth.funcionarioId,
        state.usuario.funcionarioNome = auth.funcionarioNome,
        state.usuario.nivel = auth.nivel
        state.usuario.unidadeId = auth.unidadeId;
        state.usuario.escondePrecos = auth.escondePrecos
        state.usuario.escondeIncluirGuia = auth.escondeIncluirGuia
        state.usuario.exibeFatura = auth.exibeFatura
        state.usuario.escondeResultado = auth.escondeResultado
        state.usuario.convenioPodeIncluirGuia = auth.convenioPodeIncluirGuia
        state.usuario.tipos = auth.tipos
        state.usuario.radiologista = auth.radiologista        
        state.usuario.regras = auth.regras 
        state.isAuthenticated = (auth.usuario !== undefined && auth.usuario !== '')

        if (state.isAuthenticated) {

            Vue.http.get('/api/auth/unidades')
                .then(res => {
                    state.unidades = res.data
                    if(state.usuario.unidadeId !=null && state.usuario.unidadeId >0){
                        state.unidadeId =state.usuario.unidadeId
                        localStorage.unidadePadraoId = state.usuario.unidadeId
                    }else  if (localStorage.unidadePadraoId == -1) {
                        state.unidadeId = res.data[0].id
                        localStorage.unidadePadraoId = res.data[0].id
                    }
                })

            if (state.config.logoffTimer) {
                Vue.prototype.$idle.start();
            }
            Vue.prototype.iniciarHub();
        } else {
            if (state.config.logoffTimer) {
                Vue.prototype.$idle.stop();
            }
        }
    },
}

const vuexLocal = new VuexPersistence<RootState>({
    storage: window.localStorage,
    modules: ['componentes']
})

export default new Vuex.Store({
    state: rootState,
    actions: rootActions,
    getters: rootGetters,
    mutations: rootMutations,
    modules: {      
        componentes
    },
    plugins: [vuexLocal.plugin]
})
