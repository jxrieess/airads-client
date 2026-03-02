<script lang="ts">
	let { label = '', value = 0, emphasize = false } = $props<{
		label: string;
		value?: number | string;
		emphasize?: boolean;
	}>();
</script>

<div class="card" class:emphasize>
	<div class="value">{value}</div>
	<div class="label">{label}</div>
</div>

<style>
	.card {
		border: 2px solid var(--accent);
		border-radius: 14px;
		background: #fff;
		padding: 14px 16px;
		text-align: center;
	}

	.value {
		font-size: 28px;
		font-weight: 900;
		line-height: 1;
	}

	.label {
		margin-top: 6px;
		font-size: 14px;
		font-weight: 800;
		color: #34454f;
	}

	.card.emphasize {
		box-shadow: 0 10px 22px rgba(0, 0, 0, 0.1);
		transform: translateY(-1px);
	}
</style>
