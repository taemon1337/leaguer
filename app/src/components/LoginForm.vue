<template>
  <div>
    <div v-show="!currentUser">
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </div>
</template>

<script>
  import { GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'LoginForm',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        currentUser: GlobalTypes.currentUser
      })
    }
  }
</script>

<style scoped="true">
  .is-round {
    border-radius: 50%;
  }
</style>

