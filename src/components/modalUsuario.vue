<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{{$t('MODALUSUARIO.TITULO')}}</p>
        </header>
        <section class="modal-card-body is-paddingless is-marginless">
            <div class="panel">
                <div class="panel-block">
                    <b-field grouped>
                        <b-field :label="$t('MODALUSUARIO.GUICHE')" expanded>
                            <b-field>
                                <b-input :placeholder="$t('MODALUSUARIO.GUICHEPLACEHOLDER')" expanded v-model="guicheAtual"></b-input>
                            </b-field>
                        </b-field>
                        <b-field :label="$t('MODALUSUARIO.ETIQUETAPADRAO')" expanded>
                            <b-input :placeholder="$t('MODALUSUARIO.ETIQUETAPADRAOPLACEHOLDER')" v-model="etiquetaAtual"></b-input>
                        </b-field>
                    </b-field>
                </div>
                <div class="panel-block">
                    <b-button tag="a"
                              href="/Account/Manage"
                              icon-left="key"
                              expanded>
                        {{$t('MODALUSUARIO.ALTERARSENHA')}}
                    </b-button>
                </div>
                <div class="panel-heading">
                    <small>{{$t('MODALUSUARIO.LINKSUTEIS')}}</small>
                </div>
                <div class="panel-block">
                    <div class="buttons is-justified-between">
                        <b-button tag="a"
                                  :href="config.linkSuporteRemoto"
                                  target="_blank"
                                  icon-left="headset">
                            {{$t('MODALUSUARIO.SUPORTEREMOTO')}}
                        </b-button>
                        <b-button tag="a"
                                  :href="config.linkVideosTreinamento"
                                  target="_blank"
                                  icon-left="youtube">
                            {{$t('MODALUSUARIO.VIDEOSTREINAMENTO')}}
                        </b-button>
                        <b-button tag="a"
                                  :href="config.linkDownloadSocket"
                                  target="_blank"
                                  icon-left="printer">
                            {{$t('MODALUSUARIO.AGENTEIMPRESSAO')}}
                        </b-button>
                    </div>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-pulled-right" type="button" @click="$parent.close()">{{$t('MODALUSUARIO.FECHAR')}}</button>
            <button class="button is-primary" type="button" @click="salvarConfiguracoes();$parent.close();">{{$t('MODALUSUARIO.SALVAR')}}</button>
        </footer>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                guicheAtual: localStorage.guicheAtual,
                etiquetaAtual: localStorage.etiquetaAtual
            }
        },
        computed: {
            ...mapState([
                'config'
            ])
        },
        methods: {
            salvarConfiguracoes() {
                localStorage.guicheAtual = this.guicheAtual
                localStorage.etiquetaAtual = this.etiquetaAtual
                this.$emit('close')
            }
        }
    }
</script>