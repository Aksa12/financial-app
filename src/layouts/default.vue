<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <router-view />
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/AppHeader.vue";
import FooterComponent from "@/components/AppFooter.vue";
</script>

<style scoped>
</style>
