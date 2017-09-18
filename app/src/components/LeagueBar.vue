<template>
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Tweets</p>
        <p class="title">3,456</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Following</p>
        <p class="title">123</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Followers</p>
        <p class="title">456K</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div v-if="isOwner">
        <button class="button is-default">
          <router-link :to="'/leagues/' + league.id + '/edit'">Edit</router-link>
        </button>
        <button @click.stop.prevent="archive" class="button is-default">Archive</button>
        <button @click.stop.prevent="remove" class="button is-danger">Delete</button>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { GlobalTypes, LeagueTypes } from '@/store/mutation-types'

  export default {
    name: 'LeagueBar',
    props: {
      league: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        currentUser: GlobalTypes.currentUser
      }),
      isOwner () {
        return this.currentUser && this.league.managerEmail === this.currentUser.email || true
      }
    },
    methods: {
      leagueId () {
        return this.$route.params.id
      },
      archive () {
        this.$store.dispatch(LeagueTypes.remove, this.league)
      },
      remove () {
        let self = this
        this.$dialog.confirm({
          message: 'Are you sure you want to delete "' + this.league.title + '"?',
          onConfirm: function () {
            self.$store.dispatch(LeagueTypes.remove, self.league)
            self.$router.push({ path: '/' })
          }
        })
      }
    }
  }
</script>
