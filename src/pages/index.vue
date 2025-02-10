<template>
  <v-container fluid>
    <h1 class="text-h4 font-weight-bold my-4">
      Financial Dashboard
    </h1>
    <FilterComponent
      :vendors="vendors"
      :gl-accounts="glAccounts"
      :selected-vendors="selectedVendors"
      :selected-g-l-accounts="selectedGLAccounts"
      @update:selected-vendors="selectedVendors = $event"
      @update:selected-g-l-accounts="selectedGLAccounts = $event"
    />
    <!-- Table and Chart Section -->
    <v-row
      align="stretch"
      class="gap-4 mt-2"
    >
      <!-- Chart Cards -->
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          variant="outlined"
          class="px-4 fill-height custom-card"
        >
          <v-card-title class="text-h6 font-weight-bold">
            Expenses by GL Account
          </v-card-title>
          <v-card-text class="chart-container">
            <GLAccountExpensesChart :expenses="filteredExpenses" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          variant="outlined"
          class="px-4 fill-height custom-card"
        >
          <v-card-title class="text-h6 font-weight-bold">
            Total Expenses per Month
          </v-card-title>
          <v-card-text class="chart-container">
            <MonthExpensesChart :expenses="filteredExpenses" />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Table Card -->
      <v-col cols="12">
        <v-card
          variant="outlined"
          class="px-4 fill-height custom-card"
        >
          <v-card-title class="text-h6 font-weight-bold">
            Expenses by Vendor
          </v-card-title>
          <ExpenseTable :expenses="filteredExpenses" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ExpenseTable from "@/components/ExpenseTable.vue";
import MonthExpensesChart from "@/components/MonthExpensesChart.vue";
import GLAccountExpensesChart from "@/components/GLAccountExpensesChart.vue";
import FilterComponent from "@/components/ExpenseFilter.vue";
import expenses from "@/assets/Task_Data.json";

const expensesData = ref<Array<{ 
  year: number; 
  month: string; 
  vendor: string; 
  gl_account: string; 
  amount: number;
}>>([]);

const selectedVendors = ref<Array<string>>([]);
const selectedGLAccounts = ref<Array<string>>([]);

// Compute unique vendors & GL Accounts for filtering
const vendors = computed(() => [...new Set(expensesData.value.map((e) => e.vendor))]);
const glAccounts = computed(() => [...new Set(expensesData.value.map((e) => e.gl_account))]);

// Compute filtered expenses
const filteredExpenses = computed(() => {
  return expensesData.value.filter((expense) => {
    const vendorMatch = selectedVendors.value.length === 0 || selectedVendors.value.includes(expense.vendor);
    const accountMatch = selectedGLAccounts.value.length === 0 || selectedGLAccounts.value.includes(expense.gl_account);
    return vendorMatch && accountMatch;
  });
});

// Load expenses data
onMounted(() => {
  expensesData.value = expenses;
});
</script>

<style scoped>
.fill-height {
  height: 100%;
}

.custom-card.v-card--variant-outlined {
  border-color: #efefef;
}

.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 350px;
}
</style>
