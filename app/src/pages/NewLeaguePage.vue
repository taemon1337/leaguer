<template>
  <div>
    <h1>New League</h1>
    <league-form></league-form>
  </div>
</template>

<script>
  import LeagueForm from '@/components/LeagueForm'

  export default {
    name: 'NewLeaguePage',
    data () {
      return {}
    },
    components: {
      LeagueForm
    }
  }
</script>
