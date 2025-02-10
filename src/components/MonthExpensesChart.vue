<template>
  <Bar
    v-if="chartData"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify";
import { Chart as ChartJS, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

const theme = useTheme();

const props = defineProps<{
  expenses: Array<{ year: number; month: string; amount: number }>;
}>();

const monthLabels = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const chartData = computed(() => {
  const monthExpenses = monthLabels.map(month =>
    props.expenses.filter(expense => expense.month === month).reduce((sum, expense) => sum + expense.amount, 0)
  );

  return {
    labels: monthLabels,
    layout: {
      padding: {
        bottom: 10,
      },
    },
    datasets: [
      {
        label: "Total Expenses (€)",
        data: monthExpenses,
        backgroundColor: theme.global.current.value.colors.primary,
      },
    ],
  };
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
};
</script>
