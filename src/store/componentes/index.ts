import { MutationTree } from 'vuex'
import { EstadoComponentes } from "./estadoComponentes"

const state: EstadoComponentes = {
    sidebarIsOpened: false,
    modalImpressaoIsOpened: false,
    modalNotificacaoIsOpened: false,
    modalUsuarioIsOpened: false,
    modalUsuarioPortalIsOpened: false,
    modalHistoricoIsOpened: false,
    novoMedico: undefined
};

const mutations: MutationTree<EstadoComponentes> = {
    HANDLE_RESIZE(state) {
        if (document?.activeElement?.hasAttribute('insideSidebar')) {
            return;
        }
        state.sidebarIsOpened = (window.innerWidth > 1023);
    },
    SET_SIDEBAR(state, isOpened) {
        state.sidebarIsOpened = isOpened
    },
    OPEN_MODAL_IMPRESSAO(state) {
        if (!state.modalImpressaoIsOpened) {
            state.modalImpressaoIsOpened = true
        }
    },
    TOGGLE_MODAL_IMPRESSAO(state) {
        state.modalImpressaoIsOpened = !state.modalImpressaoIsOpened
    },
    TOGGLE_MODAL_NOTIFICACAO(state) {
        state.modalNotificacaoIsOpened = !state.modalNotificacaoIsOpened
    },
    TOGGLE_MODAL_USUARIO(state) {
        state.modalUsuarioIsOpened = !state.modalUsuarioIsOpened
    },
    TOGGLE_MODAL_USUARIO_PORTAL(state) {
        state.modalUsuarioPortalIsOpened = !state.modalUsuarioPortalIsOpened
    },
    TOGGLE_MODAL_HISTORICO(state) {
        state.modalHistoricoIsOpened = !state.modalHistoricoIsOpened
    },

    SET_NOVO_MEDICO(state, medico) {
        state.novoMedico = medico
    }
} 

export default { 
    namespaced: true,
    state,
    mutations 
}