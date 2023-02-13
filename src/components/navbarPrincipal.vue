<template>
    <b-navbar type="is-navbar-main navbar-default" is-active>
        <template slot="brand">
            <a class="navbar-item" title="Abrir o menu" :class="{ 'is-hidden': sidebarIsOpened }" @click="SET_SIDEBAR(true)">
                <b-icon icon="menu"></b-icon>
            </a>
            <span v-if="!config.logoBase64" class="navbar-item">
                <img src="/logo-icon.png" />
            </span>
            <a class="navbar-item is-hidden-mobile" @click="$router.push(`/`)">
                <img v-if="config.logoBase64" :src="'data:image/png;base64, ' + config.logoBase64" height="30" />
                <span v-else>{{ config.nomeDoLaboratorio || "LaborLis" }}</span>
            </a>
        </template>
        <template slot="end">
            <div v-if="atendendo" class="navbar-item">
                <b-taglist attached>
                    <b-tag :type="atendendo.buttonType" size="is-small">{{ atendendo.tipo }}</b-tag>
                    <b-tag type="is-dark" size="is-medium">{{ atendendo.sequencia }}</b-tag>
                </b-taglist>
            </div>
            <a v-if="atendendo" class="navbar-item" @click="removerAtendendo">
                <b-icon icon="close-circle"></b-icon>
            </a>
            <div v-if="config.logoffTimer && !isDashboard" class="navbar-item" id="navIdleProgressBar">
                <b-progress :value="idleProgressBarValue" :type="idleProgressBarType" show-value>
                    <small>{{ idleRemainingTime }}</small>
                </b-progress>
            </div>


            <a class="navbar-link is-arrowless" @click="TOGGLE_MODAL_NOTIFICACAO">
                <b-icon icon="bell"></b-icon>
                <b-tag v-if="notificationsCount > 0" type="is-danger tag-notify" rounded>{{ notificationsCount }}</b-tag>
            </a>

            <b-modal :active.sync="modalNotificacaoIsOpened" has-modal-card trap-focus aria-role="dialog" aria-modal>
                <modal-notificacao></modal-notificacao>
            </b-modal>

            <a class="navbar-link is-arrowless" @click="TOGGLE_MODAL_USUARIO">
                <b-icon icon="account"></b-icon>
            </a>

            <b-modal :active.sync="modalUsuarioIsOpened" has-modal-card trap-focus aria-role="dialog" aria-modal>
                <modal-usuario></modal-usuario>
            </b-modal>
        </template>
    </b-navbar>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'    
    import modalNotificacao from '@/components/modalNotificacao.vue'
    import modalUsuario from '@/components/modalUsuario'

    export default {
        components: {            
            modalNotificacao,
            modalUsuario
        },
        computed: {
            idleRemainingTime() {
                const totalSeconds = (this.$store.state.config.logoffMiliseconds - this.$store.state.idle.time) / 1000;

                const minutes = Math.floor(totalSeconds / 60);
                const seconds = Math.floor(totalSeconds % 3600 % 60);

                return minutes + ":" +
                    (seconds < 10 ? "0" : "") + seconds;
            },
            idleProgressBarValue() {
                const value = ((this.$store.state.config.logoffMiliseconds - this.$store.state.idle.time) / this.$store.state.config.logoffMiliseconds) * 100;
                return isNaN(value)
                    ? 100
                    : value;
            },
            idleProgressBarType() {
                return this.idleProgressBarValue > 66
                    ? "is-info"
                    : this.idleProgressBarValue > 33
                        ? "is-warning"
                        : "is-danger";
            },
            notificationsCount() {
                return this.$store.getters['notificacao/Count']
            },
            isDashboard(){
                return this.$route.name == 'exames-entregas' || this.$route.name == 'progresso-setor'
            },
            modalNotificacaoIsOpened: {
                get() {
                    return this.$store.state.componentes.modalNotificacaoIsOpened;
                },
                set() {
                    return this.$store.commit('componentes/TOGGLE_MODAL_NOTIFICACAO')
                }
            },
            modalUsuarioIsOpened: {
                get() {
                    return this.$store.state.componentes.modalUsuarioIsOpened;
                },
                set() {
                    return this.$store.commit('componentes/TOGGLE_MODAL_USUARIO')
                }
            },
            ...mapState([
                'config'
            ]),
            ...mapState('componentes', [
                'sidebarIsOpened'
            ]),
            ...mapState('senhaAtendimento', [
                'atendendo'
            ])
        },
        methods: {
            ...mapMutations('componentes', [
                'SET_SIDEBAR',                
                'TOGGLE_MODAL_NOTIFICACAO',
                'TOGGLE_MODAL_USUARIO',
            ]),
            removerAtendendo() {
                this.$store.commit('senhaAtendimento/SET_ATENDENDO', undefined)
            }
        }
    }
</script>