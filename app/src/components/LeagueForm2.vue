<template>
  <div>
    <form @submit.prevent.stop='save' ref="form" id="form">
      <input type='hidden' name='id' :value="league ? league.id : null">
      <form-wizard>
        <tab-content title="League Info" :beforeChange="refresh">
          <div class="columns">
            <div class="column one-half">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input name="title" class="input" type="text" placeholder="unique title..." required>
                </div>
              </div>
              <div class="field">
                <label class="label">Subtitle</label>
                <div class="control">
                  <input name="subtitle" class="input" type="text" placeholder="tag line...">
                </div>
              </div>
              <input type="hidden" name="photo">
              <croppie-image-input value="" @input="setPhoto" label='League Image'></croppie-image-input>
            </div>
            <div class="column one-half">
              <div class="field">
                <label class="label">Information</label>
                <div class="control">
                  <textarea name="description" class="textarea" type="text" placeholder="description and/or rules..."></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column field">
              <label class="label">City</label>
              <div class="control">
                <input name="city" class="input" type="text" placeholder="city..." required>
              </div>
            </div>
            <div class="column field">
              <label class="label">State</label>
              <div class="control">
                <input name="state" class="input" type="text" placeholder="state..." required>
              </div>
            </div>
            <div class="column field">
              <label class="label">Country</label>
              <div class="control">
                <input name="country" class="input" type="text" placeholder="country..." required>
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="League Management">
          <div class="field">
            <label class="label">Number of allowed teams in league</label>
            <div class="control">
              <input class="is-hidden" name="min_teams_per_league" type="number" ref="min_teams_per_league">
              <input class="is-hidden" name="max_teams_per_league" type="number" ref="max_teams_per_league">
              <vue-slider @callback='setTeamsPerLeague' ref="slider1" v-bind="slider"></vue-slider>
            </div>
          </div>
          <div class="field">
            <label class="label">Number of teams allowed in each game</label>
            <div class="control">
              <input class="is-hidden" name="min_teams_per_game" type="number" ref="min_teams_per_game">
              <input class="is-hidden" name="max_teams_per_game" type="number" ref="max_teams_per_game">
              <vue-slider @callback="setTeamsPerGame" ref="slider3" v-bind="slider"></vue-slider>
            </div>
          </div>
          <div class="field">
            <label class="label">Number of players allowed on each team</label>
            <div class="control">
              <input class="is-hidden" name="min_players_per_team" type="number" ref="min_players_per_team">
              <input class="is-hidden" name="max_players_per_team" type="number" ref="max_players_per_team">
              <vue-slider @callback="setPlayersPerTeam" ref="slider2" v-bind="slider"></vue-slider>
            </div>
          </div>
          
          <div class="columns">
            <div class="field column is-one-third">
              <label class="label">Who will be the manager?</label>
              <div class="control">
                <input class="input" v-if="currentUser" type="text" name="managerEmail" :value="currentUser.email">
              </div>
            </div>

            <div class="field column is-one-third">
              <label class="label">Is this an "open" or "private" league?</label>
              <div class="control">
                <button type="button" @click.prevent="setOpen" :class="openLeague === true ? 'button is-primary' : 'button'">Open</button>
                <button type="button" @click.prevent="setPrivate" :class="openLeague === false ? 'button is-primary' : 'button'">Private</button>
              </div>
            </div>
            
            <div class="field column is-one-third">
              <article class="message">
                <div class="message-body">
                  An <strong>open</strong> league allows teams to schedule their own games and locations.
                </div>
              </article>
              <article class="message">
                <div class="message-body">
                  A <strong>private</strong> league requires the league manager to schedule games and locations and approve teams before they can join the league.
                </div>
              </article>
            </div>
          </div>
        </tab-content>
        <tab-content title="Advanced" :before-change="computeFormData">
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
          <button class="button is-large is-primary">Create League</button>
          <br><br>
          <pre>{{ formdata }}</pre>
        </tab-content>
      </form-wizard>
    </form>
  </div>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import vueSlider from 'vue-slider-component'
  import serializeForm from '@/lib/serializeForm'
  import { LeagueTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import CroppieImageInput from '@/components/CroppieImageInput'
  import injectForm from '@/lib/injectForm'

  export default {
    name: 'LeagueForm',
    props: {
      id: {
        type: String
      }
    },
    data () {
      return {
        formdata: {},
        openLeague: null,
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
    computed: {
      ...mapGetters({
        league: LeagueTypes.active,
        currentUser: GlobalTypes.currentUser
      })
    },
    methods: {
      computeFormData: function () {
        console.log('computing...')
        let form = this.$refs.form || document.getElementById('form') || document.forms[0]
        this.formdata = serializeForm(form)
        return true
      },
      refresh: function () {
        let self = this
        process.nextTick(function () {
          self.$refs.slider1.refresh()
          self.$refs.slider2.refresh()
          self.$refs.slider3.refresh()
        })
        return true
      },
      setPhoto (val) {
        console.log('set photo', val)
        this.$refs.form.elements.photo.value = val
      },
      setTeamsPerLeague (val) {
        this.$refs.form.elements.min_teams_per_league.value = parseInt(val[0])
        this.$refs.form.elements.max_teams_per_league.value = parseInt(val[1])
      },
      setTeamsPerGame (val) {
        this.$refs.form.elements.min_teams_per_game.value = parseInt(val[0])
        this.$refs.form.elements.max_teams_per_game.value = parseInt(val[1])
      },
      setPlayersPerTeam (val) {
        this.$refs.form.elements.min_players_per_team.value = parseInt(val[0])
        this.$refs.form.elements.max_players_per_team.value = parseInt(val[1])
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
      },
      save (e) {
        let record = Object.assign(this.league, serializeForm(e.target))
        console.log('Record ', record)
        this.$store.dispatch(LeagueTypes.save, record)
      }
    },
    created () {
      this.computeFormData()
      if (this.id) {
        this.$store.dispatch(LeagueTypes.active, this.id)
      }
    },
    updated () {
      if (this.league) {
        injectForm(this.$refs.form, this.league)
      }
    },
    components: {
      FormWizard,
      TabContent,
      vueSlider,
      CroppieImageInput
    }
  }
</script>
