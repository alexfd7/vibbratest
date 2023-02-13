<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{$tc('MODALNOTIFICACAO.TITULO', this.$store.state.notificacao.length) }}</p>
            <button class="button is-small" @click="testeEco" title="Testar conexão">*</button>
        </header>
        <section class="modal-card-body list is-paddingless is-marginless">
            <div class="list-item"
                 v-for="item in notificacoes" :key="item.id">
                <div class="tags has-addons is-marginless">
                    <span class="tag is-dark"><b>{{ item.de }}</b></span>
                    <span class="tag is-warning">{{ item.tipo }}</span>
                    <span class="tag">{{ item.datahora | moment('DD/MM/YYYY HH:mm:ss') }}</span>
                    <a class="tag is-danger is-delete" @click="apagarNotificacao(item.id)" :title="$t('MODALNOTIFICACAO.APAGAR')"></a>
                </div>
                <a v-if="item.mensagem.indexOf('/Guia/NotificarGuiaCompleta') != -1" target="_blank" class="column is-12 button is-link" 
                    :href="item.mensagem">
                    {{$t('MODALNOTIFICACAO.NOTIFICARGUIACOMPLETA')}}
                </a>
                <p v-else class="is-paddingless has-text-black	">{{ item.mensagem }}</p>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">{{$t('MODALNOTIFICACAO.FECHAR')}}</button>
            <button v-if="hasNotifications" class="button is-danger" type="button" @click="apagarTodasAsNotificacoes();$parent.close();">{{$t('MODALNOTIFICACAO.APAGARTODAS')}}</button>
        </footer>
    </div>
</template>

<script>
    export default {
        computed: {
            notificacoes() {
                return this.$store.state.notificacao
            },
            hasNotifications() {
                return this.$store.getters['notificacao/Count'] > 0;
            }
        },
        methods: {
            apagarTodasAsNotificacoes() {
                this.$store.commit("notificacao/APAGAR_TODAS");
            },
            apagarNotificacao(id) {
                this.$store.commit("notificacao/APAGAR", id);
            },
            testeEco() {
                this.$notificacaoHub.invoke("Eco",
                    "Mensagem de teste do hub")
                    .then(() => {
                        this.$buefy.snackbar.open({
                            duration: 2000,
                            message: 'Mensagem de teste enviada para o hub!',
                            type: 'is-success',
                            position: 'is-top-right',
                            queue: false
                        })
                    })
                    .catch(e => {
                        this.$buefy.snackbar.open({
                            duration: 2000,
                            message: e.toString(),
                            type: 'is-danger',
                            position: 'is-top-right',
                            queue: false
                        })
                    })
            }
        }
    }
</script>