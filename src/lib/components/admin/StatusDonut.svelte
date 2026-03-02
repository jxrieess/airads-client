<script lang="ts">
	type Slice = { label: string; percent: number; color: string };
	let { title = '', slices = [] } = $props<{ title: string; slices: Slice[] }>();

	function stops() {
		let start = 0;
		return slices
			.map((s) => {
				const end = start + s.percent;
				const seg = `${s.color} ${start}% ${end}%`;
				start = end;
				return seg;
			})
			.join(', ');
	}

	const labelPos: Record<string, { left: string; top: string; align?: string }> = {
		Completed: { left: '50%', top: '-6px', align: 'center' },
		Ongoing: { left: '-10px', top: '58%', align: 'left' },
		'For Approval': { left: 'calc(100% + 10px)', top: '72%', align: 'left' }
	};
</script>

<div class="card">
	<div class="wrap">
		<div class="donut" style="background: conic-gradient({stops()});"></div>
		<div class="hole"></div>

		{#each slices as s}
			<div
				class="lbl"
				style="
					left:{labelPos[s.label]?.left ?? '50%'};
					top:{labelPos[s.label]?.top ?? '50%'};
					text-align:{labelPos[s.label]?.align ?? 'center'};
				"
			>
				{s.label}<br />{s.percent}%
			</div>
		{/each}
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

	.wrap {
		position: relative;
		width: 240px;
		height: 240px;
		margin: 6px auto 0;
	}

	.donut {
		position: absolute;
		inset: 20px;
		border-radius: 50%;
	}
	.hole {
		position: absolute;
		inset: 80px;
		background: #fff;
		border-radius: 50%;
	}

	.lbl {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 12px;
		color: #1c2b33;
		white-space: nowrap;
		line-height: 1.05;
	}

	.title {
		margin-top: 10px;
		text-align: center;
		font-weight: 800;
		font-size: 22px;
	}
</style>
