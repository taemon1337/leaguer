<template>
  <div v-if="league" class="container">
    <league-bar :league="league"></league-bar>
    <section class="hero">
      <div class="hero-body">
        <img :src="league.photo" />
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
  </div>
</template>

<script>
  import LeagueBar from '@/components/LeagueBar'
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
      this.$store.dispatch(LeagueTypes.active, this.$route.params.id)
    },
    components: {
      LeagueBar
    }
  }
</script>
