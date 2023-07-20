<script>
import overview from '@/data/overview.json'
import GraphDialog from "@/components/GraphDialog.vue";
export default {
  components: {GraphDialog},
  data () {
    return {
      search: '',
      sortBy: [{ key: 'calories', order: 'asc' }],
      headers: [
        { title: 'Rank', align: 'start', sortable: true, key: 'rank'},
        { title: 'ASN', sortable: true, key: 'asn' },
        { title: 'Country', key: 'country' },
        { title: 'Organization', key: 'organization' },
        { title: 'ROV-Ratio', key: 'ratio' },
      ],
      data: overview,
      groupBy: [
        {
          key: 'asn',
          order: 'asc',
        }
      ]
    }
  },
  methods: {
    handleClick(event, row) {
      alert(row.item.columns.asn);
    }
  }
}
</script>

<template>
  <main>
    <v-card
        class="mx-auto"
        elevation="2"
    >
      <v-card-text>
        <div class="d-inline-flex">
          <img src="@/assets/icon.png" width="60"/>
          <span class="text-h3 text--primary pa-2">
            RoVista
          </span>
        </div>

        <div class="text--primary pa-5">
          RoVista measures the RoV filtering ratio of network operators. This ratio is derived from our measurement technique that uses (1) in-the-wild invalid BGP Prefixes and (2) IP-ID side-channel technique. The details will be published soon.
          <br><br>
          The table below shows the ROV filtering Ratio based on our most-recent snapshots. Please click the ASN to see its historical pattern of ROV Ratio.
          <br><br>
          An ROV-ratio of 1 means this network <b>fully implements ROV</b> as far as we can see, whereas an ROV-ratio of 0 means this network is <b>NOT</b> implementing ROV.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
            variant="text"
            color="blue-darken-4"
        >
          Learn More
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card
        class="mx-auto mt-10 pa-5"
        elevation="2"
    >
      <div class="text-h4 text--primary pa-2">Overview of ROV Filtering Ratio</div>

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
            <td>{{ item.columns.rank }}</td>
            <td>
                <graph-dialog :asn_id="item.columns.asn"/>
            </td>
            <td>{{ item.columns.country }}</td>
            <td>{{ item.columns.organization }}</td>
            <td>{{ item.columns.ratio }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </main>
</template>
<style>

</style>