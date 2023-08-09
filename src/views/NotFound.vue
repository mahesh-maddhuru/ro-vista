<template>
  <div class="d-flex align-center flex-column">
    <v-card
        width="50%"
    >
      <v-alert
          type="error"
          title="404"
          text="PAGE NOT FOUND"
      >
        <br><br>
        <p>We looked everywhere for this page.</p>
        <p>Are you sure the website URL is correct?</p>
      </v-alert>
    </v-card>
  </div>
</template>
<script>

export default {
  computed: {
  },
  data () {
    return {
    }
  },
  methods:{
  }
}
</script>
<style>
</style>