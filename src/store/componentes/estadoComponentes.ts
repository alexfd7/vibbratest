import { NovoMedico } from "./novoMedico";

export interface EstadoComponentes {
    sidebarIsOpened: boolean,
    modalImpressaoIsOpened: boolean,
    modalNotificacaoIsOpened: boolean,
    modalUsuarioIsOpened: boolean,
    modalUsuarioPortalIsOpened: boolean,
    modalHistoricoIsOpened: boolean,
    novoMedico?: NovoMedico
}