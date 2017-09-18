<template>
  <form>
    <section>
      <b-loading :active.sync="isLoading" :canCancel="true"></b-loading>

      <div class="columns">
        <div class="column">
          <b-field label="Title" :type="isUniqueTitle ? 'is-success' : isUniqueTitle === false ? 'is-danger' : ''" :message="isUniqueTitle ? 'valid and unique title' : isUniqueTitle === false ? 'This title is already taken!' : 'enter a unique title'">
            <b-input @change.native="checkTitle" v-model="title" maxlength="30" placeholder="enter a unique title..."></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Subtitle">
            <b-input v-model="subtitle" maxlength="30" placeholder="an interesting tag line..."></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="Location" message="the area in which this will take place">
            <b-autocomplete :value='location' :data="locationData" placeholder="city, state" :loading="locationsLoading" @input="fetchLocations" @select="setLocation">
              <template scope="props">
                {{ props.option.city }}, {{ props.option.state }}
              </template>
            </b-autocomplete>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Online">
            <b-checkbox @input="onlineClicked">The games will take place online only</b-checkbox>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Manager's Email">
            <b-input v-model="managerEmail" placeholder="the email of the person who will be the manager"></b-input>
          </b-field>
        </div>
      </div>

      <b-field label="Description or Rules">
        <b-input v-model="description" maxlength="200" placeholder="describe the league..." type="textarea"></b-input>
      </b-field>

      <div class="columns">
        <div class="column">
          <b-field label="Start Date"></b-field>
          <b-field>
            <b-datepicker v-model="start_date" placeholder="Select a start date" icon="calendar" style="width:200px;" :min-date="today" :max-date="nextYear" :date-formatter="formatDate"></b-datepicker>
            <b-select placeholder="Set time" @input="setStartTime">
              <option v-for="time in times" :value="time" :key="time">{{ time < 13 ? time : time - 12 }}:00 {{ time < 12 ? 'AM' : 'PM' }}</option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="End Date"></b-field>
          <b-field>
            <b-datepicker v-model="end_date" placeholder="Select an end date (optional)" icon="calendar" style="width:200px;" :min-date="start_date" :max-date="nextYear" :date-formatter="formatDate"></b-datepicker>
            <b-select placeholder="Set time" @input="setEndTime">
              <option v-for="time in times" :value="time" :key="time">{{ time < 12 ? time : time - 12 }}:00 {{ time < 12 ? 'AM' : 'PM' }}</option>
            </b-select>
          </b-field>
        </div>
      </div>

      <b-field>
        <croppie-image-input ref="croppie" label='Banner Image'></croppie-image-input>
      </b-field>
      
      <table class="table" width='100%'>
        <thead>
          <tr>
            <th width='25%'>Permissions</th>
            <th width='25%'>Min</th>
            <th width='25%'></th>
            <th width='25%' class='has-text-right'>Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Teams allowed per league</td>
            <td colspan='3'>
              <vue-slider @callback="setMTPL" :value="[min_teams_per_league, max_teams_per_league]" v-bind="slider"></vue-slider>
            </td>
          </tr>
          <tr>
            <td>Players allowed per team</td>
            <td colspan='3'>
              <vue-slider @callback="setPPT" :value="[min_players_per_team, max_players_per_team]" v-bind="slider"></vue-slider>
            </td>
          </tr>
          <tr>
            <td>Teams allowed per game</td>
            <td colspan='3'>
              <vue-slider @callback="setTPG" :value="[min_teams_per_game, max_teams_per_game]" v-bind="slider"></vue-slider>
            </td>
          </tr>
          <tr>
            <td>Allow teams to join league anytime</td>
            <td colspan='1'>
              <b-switch v-model="allow_teams_to_join_anytime">{{ allow_teams_to_join_anytime ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If not allowed, teams cannot be added once the league has started.</td>
          </tr>
          <tr>
            <td>Allow players to join teams anytime</td>
            <td colspan='1'>
              <b-switch v-model="allow_players_to_join_anytime">{{ allow_players_to_join_anytime ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If no, players will need manager approval to switch teams or join the league after it has started.</td>
          </tr>
          <tr>
            <td>Allow teams to request their own game locations</td>
            <td colspan='1'>
              <b-switch v-model="allow_teams_to_request_locations">{{ allow_teams_to_request_locations ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If so, teams can suggest locations where games can be held.</td>
          </tr>
          <tr>
            <td>Allow teams to request their own games</td>
            <td colspan='1'>
              <b-switch v-model="allow_teams_to_request_games">{{ allow_teams_to_request_games ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If yes, teams can challenge or request their own games, otherwise the league manager must schedule games.</td>
          </tr>
          <tr>
            <td>Allow teams to approve their own games</td>
            <td colspan='1'>
              <b-switch v-model="allow_teams_to_approve_games">{{ allow_teams_to_approve_games ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If so, teams can accept challenges or game requests from other teams, else the league manager must approve all game requests.</td>
          </tr>
        </tbody>
      </table>
      
      <button @click.stop.prevent="save" class="button is-primary is-large">Save</button>

    </section>
  </form>
</template>

<script>
  import api from '@/api'
  import debounce from 'lodash/debounce'
  import vueSlider from 'vue-slider-component'
  import { LeagueTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  // import ProgressTracker, { StepItem } from 'vue-bulma-progress-tracker'
  import CroppieImageInput from '@/components/CroppieImageInput'

  export default {
    name: 'LeagueForm',
    props: {
      id: {
        type: String
      }
    },
    data () {
      return {
        title: '',
        subtitle: '',
        description: '',
        location: '',
        managerEmail: '',
        photo: '',
        min_teams_per_league: 2,
        max_teams_per_league: 100,
        min_players_per_team: 1,
        max_players_per_team: 20,
        min_teams_per_game: 2,
        max_teams_per_game: 2,
        allow_players_to_join_anytime: true,
        allow_teams_to_join_anytime: false,
        allow_teams_to_request_locations: false,
        allow_teams_to_request_games: false,
        allow_teams_to_approve_games: false,
        categories: [],
        tags: [],
        start_date: undefined,
        end_date: undefined,
        isUniqueTitle: null,
        isLoading: false,
        locationData: [],
        locationsLoading: false,
        today: new Date(),
        slider: {
          min: 1,
          max: 100,
          interval: 1,
          tooltip: 'hover',
          processStyle: {
            backgroundColor: 'rgba(121, 87, 213, 0.9)'
          }
        }
      }
    },
    methods: {
      checkTitle: debounce(function (e) {
        let self = this
        console.log('checking title...', e.target.value)
        api.leagues.isUniqueTitle(e.target.value).then(function (isUniqueTitle) {
          self.isUniqueTitle = isUniqueTitle
        })
      }),
      fetchLocations: debounce(function (val) {
        let self = this
        self.locationsLoading = true
        return api.cities.get('/', { params: { state: 'MD', city: val } }).then(function (resp) {
          self.locationData = resp.data
          self.locationsLoading = false
        })
      }),
      setLocation (opt) {
        if (opt) {
          this.location = opt.city + ', ' + opt.state
        }
      },
      onlineClicked (val) {
        if (val) {
          this.oldlocation = this.location
          this.location = 'online'
        } else {
          this.location = this.oldlocation
        }
      },
      setPhoto () {
        let self = this
        return this.$refs.croppie.getResult().then(function (res) {
          self.photo = res
        })
      },
      setMTPL: debounce(function (val) {
        this.min_teams_per_league = val[0]
        this.max_teams_per_league = val[1]
      }),
      setPPT: debounce(function (val) {
        this.min_players_per_team = val[0]
        this.max_players_per_team = val[1]
      }),
      setTPG: debounce(function (val) {
        this.min_teams_per_game = val[0]
        this.max_teams_per_game = val[1]
      }),
      formatDate (date) {
        return date.toDateString()
      },
      setStartTime (val) {
        if (this.start_date && typeof this.start_date.setHours === 'function') {
          let d = this.start_date
          this.start_date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), val - 4, 0, 0, 1)
        }
      },
      setEndTime (val) {
        if (this.end_date && typeof this.end_date.setHours === 'function') {
          let d = this.end_date
          this.end_date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), val - 4, 0, 0, 1)
        }
      },
      save (e) {
        let self = this
        self.isLoading = true
        this.setPhoto().then(function () {
          process.nextTick(function () {
            self.$store.dispatch(LeagueTypes.save, self.formdata).then(function () {
              self.photo = undefined
              self.isLoading = false
            })
          })
        })
      }
    },
    computed: {
      ...mapGetters({
        currentUser: GlobalTypes.currentUser
      }),
      findLeague () {
        return this.$store.getters.search(this.id)
      },
      formdata () {
        return {
          id: this.id,
          title: this.title,
          subtitle: this.subtitle,
          description: this.description,
          location: this.location,
          managerEmail: this.managerEmail,
          photo: this.photo,
          start_date: this.start_date,
          end_date: this.end_date,
          min_teams_per_league: this.min_teams_per_league,
          max_teams_per_league: this.max_teams_per_league,
          min_players_per_team: this.min_players_per_team,
          max_players_per_team: this.max_players_per_team,
          min_teams_per_game: this.min_teams_per_game,
          max_teams_per_game: this.max_teams_per_game,
          allow_players_to_join_anytime: this.allow_players_to_join_anytime,
          allow_teams_to_join_anytime: this.allow_teams_to_join_anytime,
          allow_teams_to_request_locations: this.allow_teams_to_request_locations,
          allow_teams_to_request_games: this.allow_teams_to_request_games,
          allow_teams_to_approve_games: this.allow_teams_to_approve_games,
          categories: this.categories,
          tags: this.tags
        }
      },
      nextYear () {
        return new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate())
      },
      times () {
        return Array.apply(null, Array(24)).map(function (_, i) { return i })
      }
    },
    mounted () {
      if (this.currentUser) {
        this.managerEmail = this.currentUser.email
      }
      if (this.id) {
        this.$store.dispatch(LeagueTypes.active, this.id)
      }
      if (this.league) {
        this.id = this.league.id
        this.title = this.league.title
        this.subtitle = this.league.subtitle
        this.description = this.league.description
        this.location = this.league.location
        this.managerEmail = this.league.managerEmail
        this.start_date = this.league.start_date
        this.end_date = this.league.end_date
        this.min_teams_per_league = this.league.min_teams_per_league
        this.max_teams_per_league = this.league.max_teams_per_league
        this.min_players_per_team = this.league.min_players_per_team
        this.max_players_per_team = this.league.max_players_per_team
        this.min_teams_per_game = this.league.min_teams_per_game
        this.max_teams_per_game = this.league.max_teams_per_game
        this.allow_players_to_join_anytime = this.league.allow_players_to_join_anytime
        this.allow_teams_to_join_anytime = this.league.allow_teams_to_join_anytime
        this.allow_teams_to_request_locations = this.league.allow_teams_to_request_locations
        this.allow_teams_to_request_games = this.league.allow_teams_to_request_games
        this.allow_teams_to_approve_games = this.allow_teams_to_approve_games
        this.categories = this.league.categories
        this.tags = this.league.tags
      }
    },
    components: {
      vueSlider,
      CroppieImageInput
    }
  }
</script>
