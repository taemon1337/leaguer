<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="league in leagues" :key="league.leagueId">
        <league-card :league="league"></league-card>
      </div>
    </div>
  </div>
</template>

<script>
  import LeagueCard from '@/components/LeagueCard'
  import { mapGetters } from 'vuex'
  import { LeagueTypes } from '@/store/mutation-types'

  export default {
    name: 'HomePage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        leagues: LeagueTypes.all
      })
    },
    created () {
      this.$store.dispatch(LeagueTypes.all)
    },
    components: {
      LeagueCard
    }
  }
</script>
