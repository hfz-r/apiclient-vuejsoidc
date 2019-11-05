<template>
    <pre><code v-html="token" class="language-javascript"></code></pre>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'TokenSlots',
    props: ['isNew'],
    data() {
        return {
            token: null
        }
    },
    computed: {
        ...mapGetters(['user', 'newToken'])
    },
    watch: {
        user(user) {
            if (user) {
                this.token = user
            }
        },
        newToken(newToken) {
            if (newToken) {
                this.token = newToken
            }
        },
        isNew: function() {
            if (this.isNew) {
                this.renewToken()
                this.$emit('class-token', 666)
            }
        }
    },
    created() {
        this.fetchUser()
    },
    methods: {
        ...mapActions(['fetchUser', 'renewToken'])
    }
}
</script>
