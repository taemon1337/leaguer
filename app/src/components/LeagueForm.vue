<template>
  <form @submit.stop.prevent="submit">
    <section>
      
      <div class="columns">
        <div class="column">
          <b-field label="Title" message="the name of the league">
            <b-input v-model="title" maxlength="30" placeholder="enter a unique title..."></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Subtitle">
            <b-input v-model="subtitle" maxlength="30" placeholder="an interesting tag line..."></b-input>
          </b-field>
        </div>
      </div>

      <b-field label="Description or Rules">
        <b-input v-model="description" maxlength="200" placeholder="describe the league..." type="textarea"></b-input>
      </b-field>

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
      </div>
      
      <b-field>
        <croppie-image-input ref="croppie" label='Banner Image'></croppie-image-input>
      </b-field>
      
      <table class="table" width='100%'>
        <thead>
          <tr>
            <th width='25%'>Team Restrictions</th>
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

    </section>
  </form>
</template>

<script>
  import api from '@/api'
  import debounce from 'lodash/debounce'
  import vueSlider from 'vue-slider-component'
  // import ProgressTracker, { StepItem } from 'vue-bulma-progress-tracker'
  import CroppieImageInput from '@/components/CroppieImageInput'

  export default {
    name: 'LeagueForm',
    data () {
      return {
        title: '',
        subtitle: '',
        description: '',
        location: '',
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
        locationData: [],
        locationsLoading: false,
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
      })
    },
    computed: {
      formdata () {
        return {
          title: this.title,
          subtitle: this.subtitle,
          description: this.description,
          location: this.location,
          photo: this.photo,
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
      }
    },
    components: {
      vueSlider,
      CroppieImageInput
    }
  }
</script>
