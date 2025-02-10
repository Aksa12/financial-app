<template>
  <v-data-table
    :headers="headers"
    :items="groupedExpenses"
    density="comfortable"
    hide-default-footer
  >
    <template #item.totalAmount="{ item }">
      €{{ item.totalAmount.toLocaleString() }}
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    expenses: Array<{ year: number; month: string; vendor: string; gl_account: string; amount: number }>;
}>();

const headers = [
    { title: "Vendor", key: "vendor" },
    { title: "Total Amount (€)", key: "totalAmount" }
];

// Group expenses by vendor
const groupedExpenses = computed(() => {
    const expenseMap = props.expenses.reduce((acc, expense) => {
        acc[expense.vendor] = (acc[expense.vendor] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(expenseMap).map(([vendor, totalAmount]) => ({
        vendor,
        totalAmount,
    }));
});
</script>