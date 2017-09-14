<template>
  <form @submit.stop.prevent="submit">
    {{ cache }}
    <section>
      <b-field label="Title" type="is-success" message="This username is available">
        <b-input value="johnsilver" maxlength="30" placeholder="enter a unique title..."></b-input>
      </b-field>

      <b-field label="Description or Rules">
        <b-input maxlength="200" placeholder="describe the league..." type="textarea"></b-input>
      </b-field>

      <b-field label="Location">
        <b-autocomplete :value='cache.location' :data="locationData" placeholder="city, state" :loading="locationsLoading" @input="fetchLocations" @select="setLocation">
          <template scope="props">
            {{ props.option.city }}, {{ props.option.state }}
          </template>
        </b-autocomplete>
      </b-field>

    </section>
  </form>
</template>

<script>
  import api from '@/api'
  import debounce from 'lodash/debounce'

  export default {
    name: 'LeagueForm',
    data () {
      return {
        cache: {},
        locationData: [],
        locationsLoading: false
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
          this.cache.location = opt.city + ', ' + opt.state
        }
      }
    }
  }
</script>
