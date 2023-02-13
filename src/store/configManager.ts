export interface ConfigManager {
    releaseNumber: string,
    releaseDate: string,

    nomeDoLaboratorio: string
    razaoSocial: string,
    cnpj: string,
    hasLogo: boolean
    logoBase64: string,

    loginInfo: string
    logoffMiliseconds: number,
    logoffTimer: boolean,

    horasAlerta: number,
    naoCarregarAutomaticoPendencias: boolean,
    dashboardAtendimentoSalaEspera: boolean,
    exibirUrgenciasSolicitadas: boolean,
    laboratorioVeterinario: boolean,
    utilizaValidacaoHimms: boolean,
    permiteCriarUsuarioParaPacienteSemEmail: boolean,
    resultadoNaInternetAuto: boolean,
    ultimosResultadosAutomaticos: boolean,
    mostrarQuantidadePendenciasInterface: boolean,
    naoCarregarArquivosRespostaPesquisa: boolean,
    percentualOtimizacaoImagem: string,
    moduloSline: boolean,
    naoVincularContaPagarContaCorrente: boolean,
    naoFaturarExamesVinculados: boolean,
    agendamentoMinutosAlerta: number,
    senhaAtendimentoValorMaximo: number,
    medicamentoUrl: string,
    cidUrl: string,
    cboUrl: string,

    gerarXLSFaturamentoServico: boolean,
    faturarBuscandoReferencia: boolean,
    faturaAgendamento: boolean,

    cpfObrigatorio: boolean,
    cpfUnico: boolean,
    convenioPadraoObrigatorioPaciente: boolean,
    convenioPadraoObrigatorioMedico: boolean,
    videoSenhaDeAtendimento: string,
    naoAbreSemAutorizacao: boolean,
    integracaoRis: boolean,

    ordenarConfirmacaoPorData: boolean,

    linkSuporteRemoto: string,
    linkVideosTreinamento: string,
    linkDownloadSocket: string,


    language: string
    bloqueiaNovaAmostraExameRepetido: boolean,
    bloqueiaConfiguracaoInclusaoGuia: boolean,

    permitirInclusaoMesmaAmostraSoroteca: boolean,
    agendaPermitirFiltrarTodos: boolean,

    ResponsavelObrigatorioVet: boolean,
    periodoFiltro: number,

    ExibirObservacaoMedicoNaBusca: boolean,
}