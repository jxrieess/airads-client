<script lang="ts">
	type Item = { label: string; value: number };
	let { title = '', items = [] } = $props<{ title: string; items: Item[] }>();

	function maxVal() {
		return Math.max(...items.map((i) => i.value), 1);
	}

	function ticks() {
		return [0, 5, 10, 15, 20, 25, 30, 35];
	}
</script>

<div class="card">
	<div class="plot">
		<div class="yTicks">
			{#each [...ticks()].reverse() as t}
				<div class="yTick">{t}</div>
			{/each}
		</div>

		<div class="gridWrap">
			<div class="grid" style="--rows:{ticks().length - 1}"></div>

			<div class="bars">
				{#each items as it}
					<div class="col">
						<div class="bar" style="height:{(it.value / 35) * 100}%"></div>
						<div class="xLab">{it.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="title">{title}</div>
</div>

<style>
	.card {
		border: 2px solid var(--accent);
		border-radius: 14px;
		background: #fff;
		padding: 12px 14px 14px;
	}

	.plot {
		display: grid;
		grid-template-columns: 34px 1fr;
		gap: 10px;
		align-items: stretch;
		padding: 8px 0 0;
	}

	.yTicks {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 11px;
		color: #1c2b33;
		padding: 0 2px 30px 0;
	}
	.yTick {
		line-height: 1;
	}

	.gridWrap {
		position: relative;
	}

	.grid {
		position: absolute;
		inset: 0 0 30px 0;
		border-left: 1px solid rgba(0, 0, 0, 0.12);
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
		background-image:
			repeating-linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.08) 0,
				rgba(0, 0, 0, 0.08) 1px,
				transparent 1px,
				transparent calc(100% / var(--rows))
			);
		background-size: 100% calc(100% / var(--rows));
		pointer-events: none;
	}

	.bars {
		position: relative;
		height: 240px;
		padding-bottom: 30px;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(64px, 1fr);
		gap: 14px;
		align-items: end;
	}

	.col {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		height: 100%;
	}

	.bar {
		width: 44px;
		background: #3d7f8f;
		border-radius: 4px;
	}

	.xLab {
		margin-top: 6px;
		font-size: 10px;
		color: #1c2b33;
		text-align: center;
		width: 80px;
		white-space: normal;
		line-height: 1.1;
	}

	.title {
		margin-top: 10px;
		text-align: center;
		font-weight: 800;
		font-size: 18px;
	}
</style>
