<template>
    <transition name="fade">
        <div class="column is-2 is-fullheight sidebar-default" v-if="sidebarIsOpened">
            <aside class="menu">
                <p class="menu-label">
                    <button class="delete is-small is-pulled-right" id="close-sidebar" aria-label="close" @click="SET_SIDEBAR(false)" title="Fechar o menu"></button>
                </p>
                <figure class="image is-64x64 has-image-centered is-hidden-mobile">
                    <img class="is-rounded" src="../assets/pessoa.png">
                </figure>
                <h4 class="title is-6 has-text-centered is-marginless">
                    {{ usuario.nome }}
                </h4>
                <p class="is-size-7 has-text-centered">
                    {{ usuario.nivel }}
                </p>
                <hr class="dropdown-divider">

                <b-field v-if="isInRole('alterar-unidade-atual') && alterandoUnidade" 
                         label="Unidade" 
                         label-position="on-border">
                    <b-select size="is-small" v-model="unidadeId"
                              expanded>
                        <option v-for="(item, index) in unidades" 
                                v-bind:key="index" 
                                :value="item.id">{{item.nome}}</option>
                    </b-select>
                </b-field>
                <p v-else class="is-size-7 has-text-centered">
                    Unidade: <b>{{unidadeNome}}</b>
                    <a v-if="isInRole('alterar-unidade-atual') && usuario.unidadeId ==null" href="#" class="has-text-grey" @click="alterandoUnidade = true" title="Alterar unidade">
                        <b-icon  icon="pencil" size="is-small"></b-icon>
                    </a>                    
                </p>

                <section v-if="isInRole('guia-alterar') || isInRole('guia-consultar')">
                    <hr class="dropdown-divider">

                    <div class="is-flex">
                        <b-tabs type="is-toggle-rounded" size="is-small" expanded>
                            <b-tab-item icon="clipboard-plus-outline" class="is-paddingless">
                                <form @submit.prevent="abrirGuia" >
                                    <b-field label="Código da guia" label-position="inside">
                                        <b-input v-model="abrirGuiaId" type="number" insideSidebar expanded></b-input>
                                    </b-field>
                                </form>
                            </b-tab-item>
                            <b-tab-item icon="pound-box-outline" class="is-paddingless">
                                <form @submit.prevent="abrirGuiaRef" >
                                    <b-field label="Referência da guia" label-position="inside">
                                        <b-input v-model="abrirGuiaReferencia" insideSidebar expanded></b-input>
                                    </b-field>
                                </form>
                            </b-tab-item>
                            <b-tab-item icon="flask-outline" class="is-paddingless">
                                <form @submit.prevent="abrirGuiaAmo" >
                                    <b-field label="Código da amostra" label-position="inside">
                                        <b-input v-model="abrirGuiaAmostra" type="number" insideSidebar expanded></b-input>
                                    </b-field>
                                </form>
                            </b-tab-item>
                        </b-tabs>
                    </div>
                </section>

                <hr class="dropdown-divider">

                <ul class="menu-list">
                    <li v-if="isInRole('menu-atendimento')">
                        <router-link @click.native="HANDLE_RESIZE()" :to="{ name: 'atendimento' }">{{$t('SIDEBAR.ATENDIMENTO')}}</router-link>
                    </li>
                    <li v-if="isInRole('menu-analise')">
                        <router-link @click.native="HANDLE_RESIZE()" :to="{ name: 'analise' }">{{$t('SIDEBAR.ANALISE')}}</router-link>
                    </li>
                    <li v-if="isInRole('menu-interface')">
                        <router-link @click.native="HANDLE_RESIZE()" :to="{ name: 'equipamentos' }">{{$t('SIDEBAR.EQUIPAMENTO')}}</router-link>
                    </li>
                    <li v-if="isInRole('menu-integracao')">
                        <a href="/Integracao/index">{{$t('SIDEBAR.INTEGRACAO')}}</a>
                    </li>
                    <li v-if="isInRole('menu-manutencao')">
                        <router-link @click.native="HANDLE_RESIZE()" :to="{ name: 'manutencao' }">{{$t('SIDEBAR.MANUTENCAO')}}</router-link>
                    </li>
                    <li v-if="isInRole('menu-estoque')">
                        <router-link @click.native="HANDLE_RESIZE()" :to="{ name: 'estoque' }">{{$t('SIDEBAR.ESTOQUE')}}</router-link>
                    </li>
                    <li v-if="isInRole('menu-financeiro')">
                        <router-link @click.native="HANDLE_RESIZE()" :to="{ name: 'financeiro' }">{{$t('SIDEBAR.FINANCEIRO')}}</router-link>
                    </li>
                    <li v-if="isInRole('menu-relatorios')">
                        <a href="/Rel/index">{{$t('SIDEBAR.RELATORIO')}}</a>
                    </li>
                    <li v-if="isInRole('menu-plugins')">
                        <a href="/Plugins/index">{{$t('SIDEBAR.PLUGINS')}}</a>
                    </li>
                </ul>
                <hr class="dropdown-divider">
                <ul class="menu-list">
                    <li>
                        <a @click="logout">
                            <i class="fas fa-sign-out-alt"></i>
                            {{$t('SIDEBAR.SAIR')}}
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
    </transition>    
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
                alterandoUnidade: false,

                abrirGuiaId: null,
                abrirGuiaReferencia: null,
                abrirGuiaAmostra: null
            }
        },
        computed: {
            ...mapState([
                'config',
                'usuario',
                'unidadeId',
                'unidades'
            ]),
            ...mapState('componentes', [
                'sidebarIsOpened'
            ]),
            ...mapGetters([
                'isInRole'
            ]),
            unidadeId: {
                get() {
                    return this.$store.state.unidadeId;
                },
                set(value) {
                    this.alterandoUnidade = false;
                    this.$store.commit('SET_UNIDADE', value);
                }
            },
            unidadeNome() {
                const unidade = this.unidades?.find(x => x.id == this.unidadeId);
                return unidade?.nome;
            },
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
            ...mapMutations('componentes', [
                'HANDLE_RESIZE',
                'SET_SIDEBAR',
            ]),
            abrirGuia() {                
                //verifica se existe a guia
                this.$http.get('/api/atendimento/edit?id=' + this.abrirGuiaId)
                    .then(res => {
                        this.$router.push({
                            name: 'guia', params: {
                                id: this.abrirGuiaId
                            }
                        })
                        this.HANDLE_RESIZE()
                    })
                    .catch(e => {
                        this.$buefy.snackbar.open({
                            duration: 2000,
                            message: 'Guia ' + this.abrirGuiaId + ' não encontrada',
                            type: 'is-danger',
                            position: 'is-top-left',
                            queue: false
                        })
                    })
            },
            abrirGuiaRef() {                
                //verifica se existe a guia
                this.$http.get('/api/atendimento/AbrirGuiaReferencia?referencia=' + this.abrirGuiaReferencia)
                    .then(res => {
                        if(res.data != null && res.data.length == 1){
                            this.$router.push({
                                name: 'referencia', params: {
                                    referencia: this.abrirGuiaReferencia
                                }
                            })
                            this.HANDLE_RESIZE()
                        } else if (res.data != null && res.data.length > 1){
                            this.$router.push({
                                name: 'guia-list', params: {
                                    referencia: this.abrirGuiaReferencia
                                }
                            })
                        }
                    })
                    .catch(e => {
                        this.$buefy.snackbar.open({
                            duration: 2000,
                            message: 'Guia com referência ' + this.abrirGuiaReferencia + ' não encontrada',
                            type: 'is-danger',
                            position: 'is-top-left',
                            queue: false
                        })
                    })
            },
            abrirGuiaAmo() {                
                //verifica se existe a guia
                this.$http.get('/api/atendimento/AbrirGuia?codigoDeBarras=' + this.abrirGuiaAmostra)
                    .then(res => {
                        if(res.data != null && res.data.length == 1){
                            this.$router.push({
                                name: 'amostra', params: {
                                    amostra: this.abrirGuiaAmostra
                                }
                            })
                            this.HANDLE_RESIZE()
                        } else if (res.data != null && res.data.length > 1){
                            this.$router.push({
                                name: 'guia-list', params: {
                                    amostra: this.abrirGuiaAmostra
                                }
                            })
                        }
                    })
                    .catch(e => {
                        this.$buefy.snackbar.open({
                            duration: 2000,
                            message: 'Amostra ' + this.abrirGuiaAmostra + ' não encontrada',
                            type: 'is-danger',
                            position: 'is-top-left',
                            queue: false
                        })
                    })
            },
        }
}
</script>