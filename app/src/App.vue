<template>
  <div class="container" id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.css'
  import 'bulma/css/bulma.css'
  import Navbar from '@/components/Navbar'

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>
