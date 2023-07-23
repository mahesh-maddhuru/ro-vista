<template>
  <div class="about d-flex">
    <v-card
        v-for="person in people"
        :key="person.name"
        class="ma-5"
        width="20%"
        elevation="10"
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">
            {{person.name}}
          </div>
          <div class="text-caption">
            {{person.designation}}<br>
            {{person.department}}<br>
            {{person.organization}}<br>
          </div>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn variant="outlined" @click="sendEmail(person.email)">
          Email
          <v-tooltip
              activator="parent"
              location="end"
          >
            {{ person.email }}
          </v-tooltip>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>

export default {
  data () {
    return {
      people : [
        {
          name: "Taejoong \"Tijay\" Chung",
          designation: "Assistant Professor",
          department: "Computer Science",
          organization: "Virginia Tech",
          email: "tijay@vt.edu"
        },
        {
          name: "Weitong Li",
          designation: "PHD Student",
          department: "Computer Science",
          organization: "Virginia Tech",
          email: "weitong@vt.edu"
        },
        {
          name: "Mahesh Maddhuru",
          designation: "Master's Student",
          department: "Computer Science",
          organization: "Virginia Tech",
          email: "maheshm@vt.edu"
        }
      ]
    }
  },
  methods:{
    sendEmail(email) {
      window.location = `mailto:${email}`;
    }
  }
}
</script>

<style>
</style>
