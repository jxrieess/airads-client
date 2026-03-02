<script lang="ts">
	let { status = '' } = $props();

	function color(s: string) {
		if (s === 'For Approval') return '#FCFF39';
		if (s === 'Active') return '#13b500';
		if (s === 'Completed') return '#FFB602';
		if (s === 'Rejected') return '#d50000';
		return '#999';
	}
</script>

<span class="badge" style="background:{color(status)}">
	{status}
</span>

<style>
	.badge {
		padding: 4px 12px;
		border-radius: 12px;
		font-weight: 700;
		font-size: 12px;
		color: #000;
	}
</style>
