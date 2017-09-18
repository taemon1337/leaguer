<template>
  <div></div>
</template>

<script>
  import { MessageTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ErrorMessage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        messages: MessageTypes.all
      })
    },
    methods: {
      remove (idx) {
        this.$store.dispatch(MessageTypes.remove, idx)
      }
    },
    created () {
      this.once = true
    },
    mounted () {
      let self = this
      this.messages.forEach(function (message) {
        if (message.component === 'dialog') {
          self.$dialog.open(message)
        } else if (message.component === 'snackbar') {
          self.$snackbar.open(message)
        } else {
          self.$toast.open(message)
        }
      })
    }
  }
</script>
