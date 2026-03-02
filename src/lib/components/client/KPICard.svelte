<script lang="ts">
	interface Props {
		label: string;
		value: string | number;
	}
	let { label, value }: Props = $props();
</script>

<div class="kpi-card">
	<span class="kpi-label">{label}</span>
	<span class="kpi-value">{value}</span>
</div>

<style>
	.kpi-card {
		border: 1px solid #6CE5E8;
		border-radius: 12px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		background: #fff;
		height: 100px;
	}
	.kpi-label {
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
		text-align: left;
		flex-shrink: 0;
	}
	.kpi-value {
		font-size: 3rem;
		font-weight: 700;
		color: #1f2937;
		text-align: center;
		margin: auto 0;
	}
</style>
