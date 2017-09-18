<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img :src="logo" alt="Leaguer">
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/">Leagues</router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/leagues/new">Create League</router-link>
        </a>
      </div>
      <div v-if="currentUser" class="navbar-end">
        <b-dropdown v-model="navigation" position="is-bottom-left">
          <a class="navbar-item" slot="trigger">
            <img class="is-round" :src="currentUser.photo" />
            <b-icon icon="caret-down"></b-icon>
          </a>
          <b-dropdown-item>
            <logged-in-menu></logged-in-menu>
            <logged-out-menu></logged-out-menu>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
  import logo from '@/assets/LeagueIcon.png'
  import LoggedInMenu from '@/components/LoggedInMenu'
  import LoggedOutMenu from '@/components/LoggedOutMenu'
  import { GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        logo,
        navigation: 'home'
      }
    },
    computed: {
      ...mapGetters({
        currentUser: GlobalTypes.currentUser
      })
    },
    components: {
      LoggedInMenu,
      LoggedOutMenu
    }
  }
</script>

<style scoped="true">
  .is-round {
    border-radius: 50%;
  }
</style>
