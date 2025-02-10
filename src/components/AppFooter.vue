<template>
  <v-footer
    app
    color="grey darken-2"
  >
    <v-container class="text-center">
      <v-row>
        <v-col>
          &copy; {{ new Date().getFullYear() }} Expense Tracker.
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.v-footer {
  text-align: center;
  padding: 10px;
}
</style>
