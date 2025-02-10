<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="3"
    >
      <v-select
        :model-value="selectedVendors"
        :items="vendors"
        label="Select Vendors"
        clearable
        multiple
        density="comfortable"
        variant="outlined"
        single-line
        @update:model-value="emit('update:selectedVendors', $event)"
      >
        <template #selection="data">
          <template v-if="data.index === 0 && selectedVendors.length <= 2">
            {{ selectedVendors.join(", ") }}
          </template>
          <div v-else-if="data.index === 0">
            {{ selectedVendors.length }} selected
          </div>
        </template>
      </v-select>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="3"
    >
      <v-select
        :model-value="selectedGLAccounts"
        :items="glAccounts"
        label="Select GL Accounts"
        clearable
        multiple
        density="comfortable"
        variant="outlined"
        @update:model-value="emit('update:selectedGLAccounts', $event)"
      >
        <template #selection="data">
          <template v-if="data.index === 0 && selectedGLAccounts.length <= 2">
            {{ selectedGLAccounts.join(", ") }}
          </template>
          <div v-else-if="data.index === 0">
            {{ selectedGLAccounts.length }} selected
          </div>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps({
    vendors: { type: Array, required: true },
    glAccounts: { type: Array, required: true },
    selectedVendors: { type: Array, required: true },
    selectedGLAccounts: { type: Array, required: true },
});

const emit = defineEmits(["update:selectedVendors", "update:selectedGLAccounts"]);
</script>