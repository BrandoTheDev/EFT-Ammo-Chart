<!-- components/AmmoChart.vue -->
<template>
    <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
    ammoData: {
        type: Array,
        required: true
    }
});

const chartData = computed(() => {
    const topAmmo = props.ammoData
        .filter(a => a.damage && a.penetrationPower)
        .sort((a, b) => b.penetrationPower - a.penetrationPower)
        .slice(0, 10); // top 10 by pen power

    return {
        labels: topAmmo.map(a => a.item.shortName || a.item.name),
        datasets: [
            {
                label: 'Penetration Power',
                backgroundColor: '#4B9CD3',
                data: topAmmo.map(a => a.penetrationPower),
            },
            {
                label: 'Damage',
                backgroundColor: '#D94B4B',
                data: topAmmo.map(a => a.damage),
            }
        ]
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Top 10 Ammo by Penetration Power'
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: 400px;
    margin: 2rem auto;
}
</style>
