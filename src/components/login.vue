<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-two-thirds">
                        <div class="box whitebox">
                            <div class="columns is-vcentered">
                                <div class="column is-7 is-spaced">
                                    <img v-if="config.logoBase64" :src="'data:image/png;base64, ' + config.logoBase64" />
                                    <h3 class="title" v-else>{{ config.nomeDoLaboratorio }}</h3>
                                    <address class="is-size-7" style="white-space:pre;">{{ config.loginInfo }}</address>
                                </div>
                                <div class="column is-spaced">
                                    <div v-if="isServerOut" class="notification is-warning">
                                        Sistema em manutenção.<br/>
                                        Tente novamente mais tarde.
                                    </div>
                                    <div v-if="erros.length > 0" class="notification is-danger">
                                        <ul>
                                            <li v-for="(erro, index) in erros" v-bind:key="index">
                                                {{ erro }}
                                            </li>
                                        </ul>                                        
                                    </div>
                                    <form @submit.prevent="onSubmit" method="post" role="form">
                                        <b-field label="E-mail ou Usuário">
                                            <b-input icon="account" required v-model="UserName"></b-input>
                                        </b-field>
                                        <b-field label="Senha">
                                            <b-input type="password" icon="lock" required v-model="Password"></b-input>
                                        </b-field>
                                        <button type="submit" class="button is-primary is-fullwidth">Entrar</button>
                                        <br />
                                        <p class="has-text-centered is-size-7">
                                            <a href="/Account/LostPassword">Esqueceu a senha?</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="has-text-centered is-italic">desenvolvido por <a href="http://proradis.com.br/">PRORADIS</a></p>
            </div>            
        </div>
    </section>
</template>

<style scoped>
.is-spaced {
    padding: 1.5em;
}
</style>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        data() {
            return {
                UserName: '',
                Password: ''
            }
        },
        computed: {
            ...mapState([
                'config',
                'erros',
                'usuario',
                'isServerOut'
            ])
        },
        methods: {
            ...mapActions([
                'login',
                'commit'
            ]),
            onSubmit() {
                // se estiver num portal, sai
                if (this.$route.path.startsWith('/portal/')) {
                    this.$router.push('/')
                }

                this.login({ authMethod: this.authMode, UserName: this.UserName, Password: this.Password })
                    .then(() => {   
                        
                        if(this.usuario.tipos[0] == 'Convenio'){
                            this.$router.push({ name: 'portalconvenio' });
                        }
                        else if(this.usuario.tipos[0] == 'Local'){
                            this.$router.push({ name: 'portallocal' });
                        }
                        else if(this.usuario.tipos[0] == 'Medico'){
                            this.$router.push({ name: 'portalmedico' });
                        }
                        else if(this.usuario.tipos[0] == 'Paciente'){
                            this.$router.push({ name: 'portalpaciente' });
                        } else if ( this.usuario.tipos[0] == 'Funcionario' && this.usuario.radiologista ){
                            this.$router.push({ name: 'estudos',query: { unidadeId: (this.usuario.unidadeId) ? this.usuario.unidadeId  : 1 }  });
                        }                 

                    });
            }
        }
    }
</script>