<template>
  <div>
    <div v-if="currentUser">
      <img class="is-round" :src="currentUser.photo" />
      <a @click.stop.prevent="signout">
        Sign Out
      </a>
    </div>
  </div>
</template>

<script>
  import { GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'LogoutForm',
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

