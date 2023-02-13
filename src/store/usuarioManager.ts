export interface UsuarioManager {
    id: Int16Array,
    funcionarioId: Int16Array,
    funcionarioNome: string,
    nome: string,
    nomeCadastro: string,
    nivel: string,
    fotoBase64: string,
    unidadeId: number,

    //convenio
    escondePrecos: boolean,
    convenioPodeIncluirGuia: boolean,
    escondeIncluirGuia: boolean,
    escondeResultado: boolean,
    exibeFatura: boolean,
    radiologista: boolean,

    tipos: string[],
    regras: string[]
}