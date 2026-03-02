<script lang="ts">
	interface BarItem {
		name: string;
		value: number;
	}
	interface Props {
		data?: BarItem[];
		maxValue?: number;
	}
	const defaultData: BarItem[] = [
		{ name: 'NCR', value: 7 },
		{ name: 'North Luzon', value: 11 },
		{ name: 'Central Luzon', value: 15 },
		{ name: 'South Luzon', value: 20 },
		{ name: 'Western Visayas', value: 22 },
		{ name: 'Central Visayas', value: 34 },
		{ name: 'Eastern Visayas', value: 26 },
		{ name: 'Northern Mindanao', value: 12 },
		{ name: 'Southern Mindanao', value: 10 },
		{ name: 'BARMM', value: 6 }
	];
	let { data = defaultData, maxValue = 35 }: Props = $props();
</script>

<div class="chart-card">
	<div class="chart-wrap chart-bars">
		<div class="bar-y-axis">
			<span>{maxValue}</span><span>30</span><span>25</span><span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
		</div>
		<div class="bar-area">
			<div class="bar-chart">
				{#each data as loc}
					<div class="bar-group">
						<div class="bar" style="height: {(loc.value / maxValue) * 100}%;"></div>
					</div>
				{/each}
			</div>
			<div class="bar-labels">
				{#each data as loc}
					<span class="bar-label">{loc.name}</span>
				{/each}
			</div>
		</div>
	</div>
	<p class="chart-title">Location</p>
</div>

<style>
	.chart-card {
		border: 1px solid #6CE5E8;
		border-radius: 12px;
		padding: 1rem;
		background: #fff;
		display: flex;
		flex-direction: column;
	}
	.chart-wrap {
		flex: 1;
		min-height: 0;
	}
	.chart-title {
		text-align: center;
		font-weight: 600;
		color: #1f2937;
		margin: 0.75rem 0 0 0;
		margin-top: auto;
		font-size: 0.95rem;
		flex-shrink: 0;
	}
	.chart-bars {
		display: flex;
		align-items: stretch;
		gap: 0.5rem;
		min-height: 180px;
	}
	.bar-y-axis {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 0.7rem;
		color: #6b7280;
		padding-right: 0.25rem;
	}
	.bar-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.bar-chart {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		flex: 1;
		height: 120px;
	}
	.bar-group {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		height: 100%;
		min-width: 0;
	}
	.bar {
		width: 100%;
		max-width: 28px;
		background: #60a5fa;
		border-radius: 4px 4px 0 0;
		min-height: 4px;
	}
	.bar-labels {
		display: flex;
		justify-content: space-between;
		gap: 2px;
		margin-top: 0.5rem;
		font-size: 0.65rem;
		color: #6b7280;
		text-align: center;
	}
	.bar-label {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		min-width: 0;
		transform: rotate(-25deg);
		transform-origin: top center;
	}
</style>
