<template>
  <div>
    <form-wizard>
      <tab-content title="League Info">
        Basic League Information
      </tab-content>
      <tab-content title="League Management">
        League Management
      </tab-content>
      <tab-content title="Advanced">
        Advanced Configuration
      </tab-content>
      <tab-content title="Finish">
        Complete
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  export default {
    name: 'LeagueForm',
    data () {
      return {}
    },
    components: {
      FormWizard,
      TabContent
    }
  }
</script>
