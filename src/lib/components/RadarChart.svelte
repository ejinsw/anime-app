<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Chart from '$lib/chart/chart';
	import clsx from 'clsx';

	// Define the expected props
	export let items: Array<{ label: string; value: number }>;

	let chartCanvas: HTMLCanvasElement | null = null;
	let myChart: Chart | null = null;

	onMount(() => {
		if (chartCanvas) {
			const ctx = chartCanvas.getContext('2d');

			if (ctx) {
				myChart = new Chart(ctx, {
					type: 'radar',
					data: {
						labels: items.map((item) => item.label),
						datasets: [
							{
								label: 'Genre Distribution',
								data: items.map((item) => item.value),
								backgroundColor: 'rgba(54, 162, 235, 0.2)', // Transparent fill
								borderColor: 'rgba(54, 162, 235, 1)', // Border color
								borderWidth: 1,
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointBackgroundColor: 'rgba(255, 255, 255, 0.2)', // Data point color
								pointHoverBorderColor: 'rgba(255, 255, 255, 0.3)',
								pointRadius: 3, 
							}
						]
					},
					options: {
						responsive: true,
						plugins: {
							legend: {
								display: false, 
							},
							tooltip: {
								enabled: false, 
							},
							datalabels: {
								display: false
							}
						},
						scales: {
							r: {
								angleLines: {
									color: 'rgba(255, 255, 255, 0.3)' // Grid line color
								},
								grid: {
									color: 'rgba(255, 255, 255, 0.3)' // Grid background lines
								},
								pointLabels: {
									color: '#fff', // Axis label color
									font: {
										size: 12 // Font size for axis labels
									}
								},
								suggestedMin: 0, // Starting at 0
								suggestedMax: Math.ceil(Math.max(...items.map(item => item.value)) / 10) * 10 + 10, // Rounding to nearest 10 and adding 10
								ticks: {
									display: false,
								},
								
							}
						},
						maintainAspectRatio: false // Let it fill the container
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
<div class={clsx('h-80 w-full bg-none', $$props.class)}>
	<canvas bind:this={chartCanvas} class="w-full"></canvas>
</div>