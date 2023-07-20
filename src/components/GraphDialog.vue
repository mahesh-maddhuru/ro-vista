<script>
import HighChartsWrapper from "@/components/high-charts-wrapper.vue";
export default {
  components: {HighChartsWrapper},
  props: {
    asn_id: String
  },
  data () {
    return {
      dialog: false
    }
  },
}
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <div>
          <v-btn
              elevation="1"
              v-bind="props"
          >
            {{asn_id}}
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-toolbar
            color="blue-darken-4"
        >
          <v-btn
              icon
              dark
              @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>AS-Specific ROV Filtering Ratio</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <div class="text--primary pa-5">
          <p><b>"Total"</b> indicates the number of invalid prefixes we have tested to measure whether the AS is reachable or not.</p>
          <p><b>"Ratio"</b> indicates the ratio of the invalid prefixes that the AS NOT is reachable.</p>
          <br>
          <p>To see what ASNs and their RPKI-invalid prefixes we have tested, click each data point!</p>
        </div>


        <high-charts-wrapper :asn_id="asn_id"/>

      </v-card>
    </v-dialog>
  </v-row>
</template>