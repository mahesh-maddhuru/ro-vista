<template>
  <iframe :src="config" style="width:100%;height: 100%" frameborder="0">
  </iframe>
</template>
<script>
import config from "@/config.js"

export default {
  computed: {
    config() {
      return `http://${config.hostname}/api-documentation.html`
    }
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