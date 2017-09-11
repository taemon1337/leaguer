<template>
  <div>
    Editing {{ $route.params.id }}
    <league-form :id="$route.params.id"></league-form>
  </div>
</template>

<script>
  import LeagueForm from '@/components/LeagueForm'

  export default {
    name: 'EditLeaguePage',
    data () {
      return {}
    },
    components: {
      LeagueForm
    }
  }
</script>
