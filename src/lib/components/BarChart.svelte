<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	// Define the expected props
	export let items: Array<{ label: string; value: number }>;

	let chartCanvas: HTMLCanvasElement | null = null;
	let myChart: Chart | null = null;

	onMount(() => {
		if (chartCanvas) {
			const ctx = chartCanvas.getContext('2d');

			if (ctx) {
				myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: items.map((item) => item.label),
						datasets: [
							{
								label: 'Values',
								data: items.map((item) => item.value),
								backgroundColor: items.map(() => 'rgba(54, 162, 235, 0.2)'),
								borderColor: items.map(() => 'rgba(54, 162, 235, 1)'),
								borderWidth: 1
							}
						]
					},
					options: {
						scales: {
							y: {
								beginAtZero: true
							}
						},
                        maintainAspectRatio: false
					}
				});
			}
		}
	});

	// Cleanup the chart instance when the component is destroyed
	onDestroy(() => {
		if (myChart) {
			myChart.destroy();
		}
	});
</script>

<!-- HTML Template -->
<div class="h-80 w-full p-6 bg-none rounded-lg shadow-md">
	<canvas bind:this={chartCanvas} class="w-full"></canvas>
</div>
