<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img :src="logo" alt="League Manager">
      </a>
  
      <div class="navbar-burger burger" data-target="navMenubd-example">
        <span></span>
        <span></span>
        <span></span>
      </div>
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
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link">
            My Stuff
          </div>
          <div class="navbar-dropdown">
            <a class="navbar-item " href="http://bulma.io/extensions/">
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p>
                      <strong>Extensions</strong>
                      <br>
                      <small>Side projects to enhance Bulma</small>
                    </p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <span class="icon has-text-info">
                      <i class="fa fa-plug"></i>
                    </span>
                  </div>
                </div>
              </div>
            </a>
            <a class="navbar-item">
              My Leagues
            </a>
            <a class="navbar-item">
              My Schedule
            </a>
            <a class="navbar-item">
              My Games
            </a>
            <a class="navbar-item">
              My Teams
            </a>
            <a class="navbar-item">
              My Profile
            </a>
          </div>
        </div>
        <div v-if="currentUser" class="navbar-item">
          <figure class="image">
            <img :src="currentUser.photo">
          </figure>
        </div>
        {{ currentUser }}
      </div>
      <div class="navbar-item">
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Navbar',
    data () {
      return {
        logo: require('@/assets/LeagueIcon.png'),
        googleIcon: require('@/assets/google_signin_icon.png')
      }
    },
    computed: {
      ...mapGetters({
        isSignedIn: GlobalTypes.isSignedIn,
        currentUser: GlobalTypes.currentUser
      })
    },
    methods: {
      signInWithGoogle () {
        this.$store.dispatch(GlobalTypes.signin, { provider: 'google' })
      }
    }
  }
</script>
