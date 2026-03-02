<script lang="ts">
	type Item = { label: string; value: number };
	let { title = '', items = [] } = $props<{ title: string; items: Item[] }>();

	function maxVal() {
		return Math.max(...items.map((i) => i.value), 1);
	}

	const palette: Record<string, string> = {
		Bank: '#c9f1f7',
		Food: '#76c7da',
		Telco: '#3f8fb2',
		Clothing: '#2f5fa8'
	};
</script>

<div class="card">
	<div class="legend">
		{#each items as it}
			<div class="legItem">
				<span class="dot" style="background:{palette[it.label] || '#3f8fb2'}"></span>
				<span>{it.label}</span>
			</div>
		{/each}
	</div>

	<div class="chart">
		<div class="yLabels">
			{#each items as it}
				<div class="y">{it.label}</div>
			{/each}
		</div>

		<div class="bars">
			{#each items as it}
				<div class="row">
					<div
						class="bar"
						style="
							width:{(it.value / maxVal()) * 100}%;
							background:{palette[it.label] || '#3f8fb2'};
						"
					></div>
				</div>
			{/each}
		</div>
	</div>

	<div class="title">{title}</div>
</div>

<style>
	.card {
		border: 2px solid var(--accent);
		border-radius: 14px;
		background: #fff;
		padding: 14px;
	}

	.legend {
		display: flex;
		gap: 18px;
		margin-bottom: 18px;
		font-size: 13px;
	}

	.legItem {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.chart {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 10px;
	}

	.yLabels {
		display: flex;
		flex-direction: column;
		gap: 26px;
		font-size: 13px;
		margin-top: 4px;
	}

	.bars {
		display: flex;
		flex-direction: column;
		gap: 26px;
	}

	.row {
		height: 18px;
		background:
			repeating-linear-gradient(
				to right,
				rgba(0, 0, 0, 0.05) 0px,
				rgba(0, 0, 0, 0.05) 1px,
				transparent 1px,
				transparent 24px
			);
	}

	.bar {
		height: 100%;
		border-radius: 3px;
	}

	.title {
		text-align: center;
		font-size: 22px;
		font-weight: 800;
		margin-top: 30px;
	}
</style>
