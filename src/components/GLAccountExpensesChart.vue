<template>
  <Doughnut
    v-if="chartData"
    :data="chartData"
    :options="chartOptions"
    :plugins="[centerTextPlugin, ChartDataLabels]"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify";
import {
    Chart as ChartJS,
    DoughnutController,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import type { ChartOptions, Chart } from "chart.js";
import { Doughnut } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register required Chart.js components
ChartJS.register(DoughnutController, Title, Tooltip, Legend, ArcElement);

const theme = useTheme();

const props = defineProps<{
    expenses: Array<{ gl_account: string; amount: number }>;
}>();

const groupedExpenses = computed(() => {
    return props.expenses.reduce((acc, expense) => {
        acc[expense.gl_account] = (acc[expense.gl_account] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);
});

const totalExpenses = computed(() =>
    Object.values(groupedExpenses.value).reduce((sum, amount) => sum + amount, 0)
);

const chartData = computed(() => {
    const labels = Object.keys(groupedExpenses.value);
    const values = Object.values(groupedExpenses.value);
    const colors = theme.global.current.value.colors;

    return {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    colors.primary,
                    colors["primary-lighten"],
                    colors.secondary,
                    colors["secondary-lighten-1"],
                    colors["secondary-lighten-2"],
                ],
                hoverOffset: 10,
            },
        ],
    };
});

const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    layout: {
        padding: {
            bottom: 10,
        },
    },
    plugins: {
        legend: {
            position: "top",
            onClick: () => null,
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    const value = tooltipItem.raw as number;
                    const percentage = ((value / totalExpenses.value) * 100).toFixed(2);
                    return `${tooltipItem.label}: ${percentage}% (€${value.toLocaleString()})`;
                },
            },
        },
        title: {
            display: false,
        },
        datalabels: {
            formatter: (value, context) => {
                const dataset = context.dataset.data as number[];
                const total = dataset.reduce((acc, val) => acc + val, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
            },
            color: "#fff",
            font: {
                size: 12,
            },
            anchor: "center",
            align: "center",
        },
    },
};

// Plugin to show total expenses in center of donut chart
const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: Chart<'doughnut'>) => {
        const { width } = chart;
        const ctx = chart.ctx;
        ctx.restore();
        ctx.font = `14px Arial`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const text = `€${totalExpenses.value.toLocaleString()}`;
        const x = width / 2;
        const y = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

        ctx.fillText(text, x, y);
        ctx.save();
    },
};
</script>