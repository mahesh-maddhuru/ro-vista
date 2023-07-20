<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBar from "@/layouts/SideBar.vue";
import AppHeader from "@/layouts/AppHeader.vue";
</script>

<template>
  <v-app class="rounded rounded-md">
    <app-header/>
    <side-bar/>

    <v-main class="ma-10" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
