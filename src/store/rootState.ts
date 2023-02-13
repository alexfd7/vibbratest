import { ConfigManager } from './configManager';
import { UsuarioManager } from './usuarioManager';
import { Unidade } from './unidade';
import { Integrador } from './integrador';
import { Cidade } from './cidade';

export interface RootState {
    isLoading: boolean,
    isAuthenticated: boolean,
    isUpdated: boolean,
    isServerOut: boolean,

    unidadeId: number,

    config: ConfigManager,
    usuario: UsuarioManager,
    erros: string[],

    status: string[],
    unidades: Unidade[],
    integradores: Integrador[],
    cidades: Cidade[],
    estados: string[],
    conselhos: [],
    
    agendamentoTarefaConfiguracoes: string
}