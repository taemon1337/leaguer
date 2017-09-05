<template>
  <div v-if="league" class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ league.title }}
          </h1>
          <h2 class="subtitle">
            {{ league.subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <league-stats></league-stats>
  </div>
</template>

<script>
  import LeagueStats from '@/components/LeagueStats'
  import { mapGetters } from 'vuex'
  import { LeagueTypes } from '@/store/mutation-types'

  export default {
    name: 'LeaguePage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        league: LeagueTypes.active
      })
    },
    created () {
      this.$store.dispatch(LeagueTypes.active, this.$route.params.leagueId)
    },
    components: {
      LeagueStats
    }
  }
</script>
