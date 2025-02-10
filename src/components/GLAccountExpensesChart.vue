<template>
  <Doughnut
    v-if="chartData"
    :data="chartData"
    :options="chartOptions"
    :plugins="[centerTextPlugin, percentagePlugin]"
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
import type { ChartOptions, Chart, ChartDataset } from "chart.js";
import { Doughnut } from "vue-chartjs";

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

const totalExpenses = computed(() => {
    return Object.values(groupedExpenses.value).reduce((sum, amount) => sum + amount, 0);
});

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

// Plugin to show percentages inside each slice
const percentagePlugin = {
    id: "percentage",
    afterDraw: (chart: Chart<'doughnut'>) => {
        const ctx = chart.ctx;

        const labels = chart.data.labels as string[] | undefined;
        const datasets = chart.data.datasets as ChartDataset<'doughnut'>[];

        if (!labels || !datasets[0]?.data) {
            return;
        }

        labels.forEach((label, i) => {
            const meta = chart.getDatasetMeta(0).data[i];
            const total = (datasets[0].data as number[]).reduce((acc, value) => acc + value, 0);
            const value = datasets[0].data[i] as number;
            const percentage = ((value / total) * 100).toFixed(1) + "%";

            const position = meta.tooltipPosition(true);

            ctx.fillStyle = "#fff";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(percentage, position.x, position.y);
        });
    },
};
</script>