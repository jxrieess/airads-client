<script lang="ts">
	interface Segment {
		label: string;
		value: number;
		color: string;
	}

	interface Props {
		data?: Segment[];
	}

	const defaultData: Segment[] = [
		{ label: 'Completed', value: 12.5, color: '#2F5F98' },
		{ label: 'Ongoing', value: 25, color: '#3B92BE' },
		{ label: 'For Approval', value: 62.5, color: '#5AC1DA' }
	];

	let { data = defaultData }: Props = $props();

	const radius = 45;
	const circumference = 2 * Math.PI * radius;
</script>

<div class="chart-card">
	<div class="chart-wrap chart-donut">
		<svg viewBox="0 0 120 120" class="donut-svg">
			{#each data as seg, i}
				{@const dash = (seg.value / 100) * circumference}
				{@const offset = data.slice(0, i).reduce((s, x) => s + (x.value / 100) * circumference, 0)}
				<circle
					class="donut-ring"
					cx="60"
					cy="60"
					r={radius}
					fill="none"
					stroke={seg.color}
					stroke-width="20"
					stroke-dasharray="{dash} {circumference}"
					stroke-dashoffset="{-offset}"
				/>
			{/each}
		</svg>
	</div>
	<div class="donut-legend">
		{#each data as s}
			<span><span class="legend-dot" style="background: {s.color}"></span> {s.label} {s.value}%</span>
		{/each}
	</div>
	<p class="chart-title">Status</p>
</div>

<style>
	.chart-card {
		border: 1px solid #6CE5E8;
		border-radius: 12px;
		padding: 1rem;
		background: #fff;
		min-height: 180px;
		display: flex;
		flex-direction: column;
	}
	.chart-title {
		text-align: center;
		font-weight: 600;
		color: #1f2937;
		margin: 0.75rem 0 0 0;
		margin-top: auto;
		font-size: 1rem;
		flex-shrink: 0;
	}
	.chart-donut {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 160px;
	}
	.donut-svg {
		width: 140px;
		height: 140px;
	}
	.donut-ring {
		transform: rotate(-90deg);
		transform-origin: center;
	}
	.chart-wrap {
		flex-shrink: 0;
	}
	.donut-legend {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem 1rem;
		margin-top: 0.5rem;
		font-size: 0.8rem;
		color: #4b5563;
		flex-shrink: 0;
	}
	.legend-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-right: 0.25rem;
		vertical-align: middle;
	}
</style>

