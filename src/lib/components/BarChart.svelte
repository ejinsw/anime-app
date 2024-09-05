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
					type: 'bar',
					data: {
						labels: items.map((item) => item.label),
						datasets: [
							{
								label: '#',
								data: items.map((item) => item.value),
								backgroundColor: items.map(() => 'rgb(247, 177, 85)'),
								borderColor: items.map(() => 'rgb(247, 150, 85)'),
								borderWidth: 1
							}
						],
					},
					options: {
						scales: {
							x: {
								grid: {
									color: 'rgba(200, 200, 200, 0.5)' // Custom X-axis grid line color
								},
								ticks: {
									color: 'rgba(100, 100, 100, 1)' // Custom X-axis tick label color
								}
							},
							y: {
								beginAtZero: true,
								grid: {
									color: 'rgba(150, 150, 150, 0.5)' // Custom Y-axis grid line color
								},
								ticks: {
									color: 'rgba(100, 100, 100, 1)' // Custom Y-axis tick label color
								},
								max: Math.round((Math.max(...items.map((item) => item.value)) + 10) / 10) * 10
							}
						},
						plugins: {
                            legend:{ 
                                display: false
                            },
							tooltip: {
								enabled: false
							},
							datalabels: {
								anchor: 'end',
								align: 'top',
								color: 'white', // Color of the value text
								font: {
									weight: 'bold',
									size: 12
								},
							}
						},
						maintainAspectRatio: false
					},
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
<div class={clsx("h-80 w-full bg-none", $$props.class)}>
	<canvas bind:this={chartCanvas} class="w-full"></canvas>
</div>
