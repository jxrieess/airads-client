<script lang="ts">
	import DashboardPage from '$lib/pages/DashboardPage.svelte';

	let { data } = $props();
</script>

<DashboardPage dashboardKPIs={data.dashboardKPIs} ads={data.ads} />
