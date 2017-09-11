<template>
  <div class="card">
    <div v-if="league.photo" class="card-image">
      <a :href="'#/leagues/' + league.id" class="image is4x3">
        <img :src="league.photo">
      </a>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ league.title }}</p>
          <p class="subtitle is-6">{{ league.subtitle }}</p>
        </div>
      </div>
  
      <div class="content">
        {{ league.description }}
      </div>
      <div class="content">
        <a :href="'#/leagues/' + league.id" class="button is-primary is-large">Learn more</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LeagueCard',
    props: {
      league: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>
