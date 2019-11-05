<template>
    <div v-if="signedIn">
        <div id="app">
            <router-view/>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'App',
    data() {
        return {
            signedIn: false
        }
    },
    mounted() {
        this.$store.dispatch('fetchSignedIn').then(
            signIn => {
                this.signedIn = signIn
            },
            err => {
                console.log(err)
            }
        )
    }
}
</script>
