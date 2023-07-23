<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import tnodes from "@/data/tnodes.json";
import RoaApi from "@/api/RoaApi";

exportingInit(Highcharts)

export default {
  props: {
    asn_id: Number
  },
  data () {
    return {
      asSpecificRatioData : [],
      test: {},
      showGraph : false,
      dialog2: false,
      lastClickedPoint:{},

      //chart
      chartOptions: {},

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
  methods : {
    fetchAsSpecificRatio() {
      RoaApi.getAsSpecificRatio(this.asn_id).then(response => {
        this.asSpecificRatioData = response.data;
        this.populateChartOptions(this.asSpecificRatioData);
        this.showGraph = true;
      })
    },
    populateChartOptions(data){
      let processedInterim = this.prepareData(data);

      let options = {
        title:{
          text: "ROV Filtering Ratio"
        },
        series: [],
        xAxis: {
          tickInterval: 20,
          title: {
            text: ""
          },
          categories: []
        },

        yAxis: [
          {
            title: {
              text: '# of Targets'
            }
          },
          {
            gridLineWidth: 0,
            opposite: true,
            max: 1,
            min: 0,
            title: {
                text: "ROV Ratio (%)"
            },
            labels: {
                align: 'left',
                x: 8,
                y: 3,
                format: '{value:.,0f}'
            },
          }
        ],

        legend: {
          align: 'left',
          verticalAlign: 'top',
          borderWidth: 0
        },

        tooltip: {
          shared: true,
          crosshairs: true
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
            marker: {
              lineWidth: 1
            },
            cursor: 'pointer',
            point: {
              events: {
                click:  ({point}) => {
                  this.dialog2 = true;
                  this.lastClickedPoint = point.category;
                  console.log(this.lastClickedPoint); //TODO: pick data from this
                }
              }
            }
          }
        },
        error: function (e, t) {
          console.log(e, t);
        }
      };

      let labels = ['total', 'filter','remove','ratio'];
      labels.forEach(label => {
        var series = {
          name: label,
          data: processedInterim[label],
        };

        if(label === 'ratio'){
          series.yAxis = 1;
          series.type = 'line';
          series.marker = {
            radius: 4
          }
        }
        options.series.push(series);
      })
      options.xAxis.categories = processedInterim.categories;

      // console.log(options);

      this.chartOptions = options;
    },
    prepareData(data) {
      let processedInterim = {
        categories:[],
        total: [],
        filter:[],
        remove:[],
        ratio:[]
      };

      data.forEach(item => {
        processedInterim.categories.push(new Date(item["recordDate"]).toDateString());
        processedInterim.total.push(item["total"]);
        processedInterim.filter.push(item["filter"]);
        processedInterim.remove.push(item["remove"]);
        processedInterim.ratio.push(item["ratio"]);
      })
      // console.log(processedInterim);
      return processedInterim;
    }
  },
  created() {
    this.fetchAsSpecificRatio();
  }
}

</script>
<style>

</style>
<template>
  <div class="d-flex justify-center">
    <p class="text-h5 text--primary pa-2">AS {{asn_id}}</p>
  </div>
  <div class="ma-5 pa-5">
    <div class="d-flex justify-center">
      <v-progress-circular
          v-if="!showGraph"
          :size="70"
          :width="7"
          color="blue-darken-4"
          indeterminate
      ></v-progress-circular>
    </div>
    <highcharts class="hc" v-if="showGraph" :options="chartOptions" ></highcharts>

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
              <div class="text-h5 text--primary pa-2 bg-red">You clicked on: "{{lastClickedPoint}}" --- TODO: DATA ISSUE (Values are currently hardcoded!) ---</div>

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