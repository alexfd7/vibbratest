<template>
    <section>
        <div v-if="isLoading">
            <b-loading active></b-loading>
        </div>
        <div v-else>
            <div v-if="!isAuthenticated">
                <login></login>
            </div>
            <div v-else>
                <section >
                    <navbar-principal></navbar-principal>
                    <div id="body">
                        <div class="columns">
                            <sidebar></sidebar>
                            <div :class="(sidebarIsOpened) ? 'column is-10' : 'column is-12'">
                                <b-message v-for="(erro, index) in erros" v-bind:key="index" title="Erro" type="is-danger" aria-close-label="Fechar mensagem">
                                    {{ erro }}
                                </b-message>
                                <transition name="component-fade"
                                            mode="out-in">
                                    <router-view></router-view>
                                </transition>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<style>
@import '/Home/CustomizacaoCss';
</style>

<script>
    import login from '@/components/login.vue'
    import navbarPrincipal from '@/components/navbarPrincipal.vue'
    import sidebar from '@/components/sidebar.vue'        
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'App',
        components: {
            login,
            navbarPrincipal,            
            sidebar        
        },
        computed: {
            ...mapState([
                'config',
                'erros',
                'isLoading',
                'isAuthenticated',                
                'usuario'
            ]),
            ...mapState('componentes', [
                'sidebarIsOpened'
            ])
        },
        created() {            
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
            this.$moment.locale('pt-br')            
            
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        methods: {     
            handleResize() {
                this.$store.commit('componentes/HANDLE_RESIZE')
            },
            toggleSidebar() {
                this.$store.commit('componentes/SET_SIDEBAR', this.$store.state.componentes.sidebarIsOpened)
            },
            ...mapActions([
                'logout'
            ]),
            refresh() {
                setTimeout(() => {
                    window.location.reload()
                })
            }
        }
    }
</script>
