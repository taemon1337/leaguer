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
      <div class="navbar-end">
        <b-dropdown v-model="navigation" position="is-bottom-left">
          <a class="navbar-item" slot="trigger">
            <span>Menu</span>
            <b-icon pack="fa" icon="caret-down"></b-icon>
          </a>
          <b-dropdown-item>
            <login-form></login-form>
            <logout-form></logout-form>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
  import logo from '@/assets/LeagueIcon.png'
  import LoginForm from '@/components/LoginForm'
  import LogoutForm from '@/components/LogoutForm'

  export default {
    data () {
      return {
        logo,
        navigation: 'home'
      }
    },
    components: {
      LoginForm,
      LogoutForm
    }
  }
</script>