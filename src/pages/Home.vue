<template>
    <!--eslint-disable-->
    <div>
        <section class="hero is-primary">
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-menu">
                            <div class="navbar-end">
                                <span class="navbar-item">
                                    <a class="button is-white is-outlined is-small" @click="logout">
                                        <span class="icon">
                                            <i class="fas fa-sign-out-alt"></i>
                                        </span>
                                        <span>Sign out</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="hero-body">
                <div class="columns">
                    <div class="column is-12">
                        <div class="container content">
                            <!-- <img src="/images/main_menu_logo.png" alt> -->
                            <h1 class="title">
                                <em>Token</em> Manager
                            </h1>
                            <h3 class="subtitle">
                                Build for
                                <img src="/images/mynewslogo.png" width="150" height="30">
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-3">
                        <aside class="is-medium menu">
                            <p class="menu-label">tokens</p>
                            <ul class="menu-list">
                                <li class="is-right">
                                    <a href="#token" class="is-active">Token</a>
                                </li>
                                <li>
                                    <a href="#profile" class="is-active">Token Profile</a>
                                </li>
                                <li>
                                    <a href="#id" class="is-active">Id Token</a>
                                </li>
                                <li>
                                    <a href="#session" class="is-active">Session State</a>
                                </li>
                                <li>
                                    <a href="#access" class="is-active">Access Token</a>
                                </li>
                                <li>
                                    <a href="#scopes" class="is-active">Scopes</a>
                                </li>
                            </ul>
                              <!-- <p class="menu-label">Router Protection</p>
                              <ul class="menu-list">
                                <li>
                                    <a href="#/payinguser" class="is-active">PayingUser</a>
                                </li>
                                <li>
                                    <a href="#/freeuser" class="is-active">FreeUser</a>
                                </li>
                            </ul> -->
                        </aside>
                    </div>
                    <div class="column is-9">
                        <div class="content is-medium">
                            <h3 class="title is-3">Information of Token</h3>
                            <div class="box">
                                <h4 id="token" class="title is-3">user@client</h4>
                                <article class="message is-primary">
                                    <span class="icon has-text-primary">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                    <div class="message-body">
                                        User type is returned from the UserManager's API.
                                        <br>
                                        <br>
                                        <span class="has-text-danger">
                                            [Usage:
                                            <button
                                                class="button is-small is-danger"
                                                @click="permitChild"
                                            >Force Access Token Renewal</button> ]
                                        </span>
                                    </div>
                                </article>
                                <token-slots :isNew="childState" v-on:class-token="lockChild"></token-slots>
                            </div>
                            <div class="box">
                                <h4 id="profile" class="title is-3">profile</h4>
                                <article class="message is-primary">
                                    <span class="icon has-text-primary">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                    <div
                                        class="message-body"
                                    >The claims represented by a combination of the id_token and the user info endpoint.</div>
                                </article>
                                <pre><code v-html="profile" class="language-javascript"></code></pre>
                            </div>
                            <div class="box">
                                <h4 id="id" class="title is-3">id_token</h4>
                                <article class="message is-primary">
                                    <span class="icon has-text-primary">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                    <div
                                        class="message-body"
                                    >The id_token returned from the OIDC provider.</div>
                                </article>
                                <pre><code v-html="idToken" class="language-javascript"></code></pre>
                            </div>
                            <div class="box">
                                <h4 id="session" class="title is-3">session_state</h4>
                                <article class="message is-primary">
                                    <span class="icon has-text-primary">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                    <div
                                        class="message-body"
                                    >The session state value returned from the OIDC provider.</div>
                                </article>
                                <pre><code v-html="sessionState" class="language-javascript"></code></pre>
                            </div>
                            <div class="box">
                                <h4 id="access" class="title is-3">access_token</h4>
                                <article class="message is-primary">
                                    <span class="icon has-text-primary">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                    <div
                                        class="message-body"
                                    >The access token returned from the OIDC provider.</div>
                                </article>
                                <pre><code v-html="accessToken" class="language-javascript"></code></pre>
                            </div>
                            <div class="box">
                                <h4 id="scopes" class="title is-3">scopes</h4>
                                <article class="message is-primary">
                                    <span class="icon has-text-primary">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                    <div
                                        class="message-body"
                                    >The scope returned from the OIDC provider.</div>
                                </article>
                                <pre><code v-html="scopes" class="language-javascript"></code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="footer">
            <div class="content has-text-centered">
                <div class="level">
                    <div class="level-item">
                        built with
                        <span class="icon has-text-danger">
                            <i class="fas fa-heart"></i>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
        <!-- Return to Top -->
        <a href="#" id="return-to-top">
            <i class="fas fa-chevron-up"></i>
        </a>
    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, mapMutations } from 'vuex'
import TokenSlots from '../components/TokenSlots'

export default {
    name: 'Home',
    components: { TokenSlots },
    data() {
        return {
            childState: false
        }
    },
    computed: {
        ...mapGetters([
            'profile',
            'idToken',
            'sessionState',
            'accessToken',
            'scopes'
        ])
    },
    created() {
        this.fetchProfile()
        this.fetchIdToken()
        this.fetchSessionState()
        this.fetchAcessToken()
        this.fetchScopes()
    },
    methods: {
        ...mapMutations(['setAcessToken']),
        ...mapActions([
            'fetchProfile',
            'fetchIdToken',
            'fetchSessionState',
            'fetchAcessToken',
            'fetchScopes',
            'signOut'
        ]),
        permitChild: function() {
            this.childState = true
        },
        lockChild: function(value) {
            console.log('debug > emitted = ' + value)
            this.childState = false
        },
        logout: function() {
            this.signOut()
        }
    }
}
</script>
