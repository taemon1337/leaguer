<template>
  <div v-if="currentUser">
    <b-dropdown-item custom>
      Logged in as <b>{{ currentUser.name }}</b>
    </b-dropdown-item>
    <hr class="dropdown-divider">
    <a @click.stop.prevent="signout">
      Sign Out
    </a>
  </div>
</template>

<script>
  import { GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'LoggedOutMenu',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        currentUser: GlobalTypes.currentUser
      })
    },
    methods: {
      signout () {
        this.$store.dispatch(GlobalTypes.signout)
      }
    }
  }
</script>

<style scoped="true">
  .is-round {
    border-radius: 50%;
  }
</style>

