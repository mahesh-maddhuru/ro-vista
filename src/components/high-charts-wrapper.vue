<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import tnodes from "@/data/tnodes.json";

exportingInit(Highcharts)

export default {
  props: {
    asn_id: String
  },
  data () {
    return {
      dialog2: false,
      lastClickedPoint:{},
      //chart
      chartOptions: {
        title:{
          text: "ROV Filtering Ratio"
        },
        series: [
          {
            data: [1, 2, 3]
          }
        ],
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click:  ({point}) => {
                  this.dialog2 = true;
                  console.log(point); //TODO: pick data from this
                  this.lastClickedPoint = point.category;
                }
              }
            }
          }
        },
      },

      // table
      search: '',
      sortBy: [{ key: 'asn', order: 'asc' }],
      headers: [
        { title: 'Date', align: 'start', sortable: true, key: 'date'},
        { title: 'Source ASN', sortable: true, key: 'asn' },
        { title: 'Destination ASN', key: 'target-asn' },
        { title: 'Invalid Prefix', key: 'prefix' },
        { title: 'Route Filtered', key: 'filter' },
      ],
      data: tnodes
    }
  },
}

</script>
<style>

</style>
<template>
  <div class="d-flex justify-center">
    <p class="text-h5 text--primary pa-2">AS {{asn_id}}</p>
  </div>
  <div class="ma-5 pa-5">
    <highcharts class="hc" :options="chartOptions" ></highcharts>

      <v-dialog
          v-model="dialog2"
          width="auto"
      >
        <v-card>
          <v-toolbar
              color="blue-darken-4"
          >
            <v-btn
                icon
                dark
                @click="dialog2 = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Details of RoVISTA’s Inference Results</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-card
                class="mx-auto mt-10 pa-5"
                elevation="2"
            >
              <div class="text-h5 text--primary pa-2">{{lastClickedPoint}}</div>

              <p class="pa-5">The table shows the list of (Destination) ASNs and the RPKI-invalid IP prefixes that they announced on the specific date.
                It also shows, based on our technique, whether the (source) ASN filtered such RPKI-invalid prefixes or not.</p>

              <v-text-field
                  class="mt-5"
                  v-model="search"
                  label="Search"
                  hide-details
              ></v-text-field>


              <v-data-table
                  v-model:sort-by="sortBy"
                  :headers="headers"
                  :items="data"
                  class="elevation-1"
                  :search="search"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td style="width:20%">{{ item.columns.date }}</td>
                    <td style="width:20%">{{ item.columns.asn }}</td>
                    <td style="width:20%">{{ item.columns['target-asn'] }}</td>
                    <td style="width:20%">{{ item.columns.prefix }}</td>
                    <td style="width:20%">{{ item.columns.filter }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>