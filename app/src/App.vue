<template>
  <div class="container" id="app">
    <navbar></navbar>
    <error-messages></error-messages>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.css'
  import 'bulma/css/bulma.css'
  import Navbar from '@/components/Navbar'
  import ErrorMessages from '@/components/ErrorMessages'
  import { GlobalTypes } from '@/store/mutation-types'

  export default {
    name: 'app',
    created () {
      this.$store.dispatch(GlobalTypes.signin)
    },
    components: {
      Navbar,
      ErrorMessages
    }
  }
</script>
