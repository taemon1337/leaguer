<template>
  <div>
    <form ref="form">
      <form-wizard>
        <tab-content title="League Info" :beforeChange="refresh">
          <div class="columns">
            <div class="column field">
              <label class="label">Title</label>
              <div class="control">
                <input name="title" class="input" type="text" placeholder="unique title...">
              </div>
            </div>
            <div class="column field">
              <label class="label">Subtitle</label>
              <div class="control">
                <input name="subtitle" class="input" type="text" placeholder="tag line...">
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Information</label>
            <div class="control">
              <textarea name="description" class="textarea" type="text" placeholder="description and/or rules..."></textarea>
            </div>
          </div>
          <div class="columns">
            <div class="column field">
              <label class="label">City</label>
              <div class="control">
                <input name="city" class="input" type="text" placeholder="city...">
              </div>
            </div>
            <div class="column field">
              <label class="label">State</label>
              <div class="control">
                <input name="state" class="input" type="text" placeholder="state...">
              </div>
            </div>
            <div class="column field">
              <label class="label">Country</label>
              <div class="control">
                <input name="country" class="input" type="text" placeholder="country...">
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="League Management">
          <div class="field">
            <label class="label">Number of allowed teams in league</label>
            <div class="control">
              <input name="min_teams_per_league" type="hidden" ref="min_teams_per_league">
              <input name="max_teams_per_league" type="hidden" ref="max_teams_per_league">
              <vue-slider ref="slider1" v-bind="slider"></vue-slider>
            </div>
          </div>
          <div class="field">
            <label class="label">Number of teams allowed in each game</label>
            <div class="control">
              <input name="min_teams_per_game" type="hidden" ref="min_teams_per_game">
              <input name="max_teams_per_game" type="hidden" ref="max_teams_per_game">
              <vue-slider ref="slider3" v-bind="slider"></vue-slider>
            </div>
          </div>
          <div class="field">
            <label class="label">Number of players allowed on each team</label>
            <div class="control">
              <input name="min_players_per_team" type="hidden" ref="min_players_per_team">
              <input name="max_players_per_team" type="hidden" ref="max_players_per_team">
              <vue-slider @callback="setPlayersPerTeam" ref="slider2" v-bind="slider"></vue-slider>
            </div>
          </div>
          
          <div class="field">
            <label class="label">Is this an "open" or "private" league?</label>
            <div class="control">
              <button type="button" @click.prevent="setOpen" :class="openLeague ? 'button is-primary' : 'button'">Open</button>
              <button type="button" @click.prevent="setPrivate" :class="openLeague ? 'button' : 'button is-primary'">Private</button>
              <div class="content">
                An open league allows teams to schedule their own games and locations, a private league requires the league manager to schedule games and locations and approve teams before they can join the league.
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="Advanced">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <strong>Allow players to join anytime?</strong>
                <label class="radio">
                    <input type="radio" name="allow_players_to_join_anytime" value="1" ref="allow_players_to_join_anytime">
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" name="allow_players_to_join_anytime" value="0" ref="allow_players_to_join_anytime">
                    No
                  </label>
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <strong>Allow teams to join anytime?</strong>
                <label class="radio">
                    <input type="radio" name="allow_teams_to_join_anytime" ref="allow_teams_to_join_anytime">
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" name="allow_teams_to_join_anytime" ref="allow_teams_to_join_anytime">
                    No
                  </label>
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <strong>Allow teams to request games?</strong>
                <label class="radio">
                    <input type="radio" name="allow_teams_to_request_games" value="1" ref="allow_teams_to_request_games">
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" name="allow_teams_to_request_games" value="0" ref="allow_teams_to_request_games">
                    No
                  </label>
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <strong>Allow teams to request game locations?</strong>
                <label class="radio">
                    <input type="radio" name="allow_teams_to_request_locations" ref="allow_teams_to_request_locations">
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" name="allow_teams_to_request_locations" ref="allow_teams_to_request_locations">
                    No
                  </label>
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <strong>Allow teams to approve games?</strong>
                <label class="radio">
                    <input type="radio" name="allow_teams_to_approve_games" ref="allow_teams_to_approve_games">
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" name="allow_teams_to_approve_games" ref="allow_teams_to_approve_games">
                    No
                  </label>
              </label>
            </div>
          </div>
        </tab-content>
        <tab-content title="Finish">
          Complete
        </tab-content>
      </form-wizard>
    </form>
  </div>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import vueSlider from 'vue-slider-component'

  export default {
    name: 'LeagueForm',
    data () {
      return {
        openLeague: true,
        slider: {
          value: [1, 10],
          min: 0,
          max: 100,
          interval: 1,
          tooltip: 'hover',
          processStyle: {
            backgroundColor: '#1abc9c'
          }
        }
      }
    },
    methods: {
      refresh: function () {
        let self = this
        process.nextTick(function () {
          self.$refs.slider1.refresh()
          self.$refs.slider2.refresh()
          self.$refs.slider3.refresh()
        })
        return true
      },
      setTeamsPerLeague (val) {
        this.$refs.min_teams_per_league.value = val[0]
        this.$refs.max_teams_per_league.value = val[1]
      },
      setTeamsPerGame (val) {
        this.$refs.min_teams_per_game.value = val[0]
        this.$refs.max_teams_per_game.value = val[1]
      },
      setPlayersPerTeam (val) {
        this.$refs.min_players_per_team.value = val[0]
        this.$refs.max_players_per_team.value = val[1]
      },
      setAdvanced (val) {
        this.$refs.form.elements.allow_players_to_join_anytime[0].checked = !!val
        this.$refs.form.elements.allow_players_to_join_anytime[1].checked = !val
        this.$refs.form.elements.allow_teams_to_join_anytime[0].checked = !!val
        this.$refs.form.elements.allow_teams_to_join_anytime[1].checked = !val
        this.$refs.form.elements.allow_teams_to_request_games[0].checked = !!val
        this.$refs.form.elements.allow_teams_to_request_games[1].checked = !val
        this.$refs.form.elements.allow_teams_to_request_locations[0].checked = !!val
        this.$refs.form.elements.allow_teams_to_request_locations[1].checked = !val
        this.$refs.form.elements.allow_teams_to_approve_games[0].checked = !!val
        this.$refs.form.elements.allow_teams_to_approve_games[1].checked = !val
      },
      setOpen () {
        this.openLeague = true
        this.setAdvanced(true)
      },
      setPrivate () {
        this.openLeague = false
        this.setAdvanced(false)
      }
    },
    components: {
      FormWizard,
      TabContent,
      vueSlider
    }
  }
</script>
