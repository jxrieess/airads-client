<script lang="ts">
	import Topbar from '$lib/components/admin/Topbar.svelte';
	import StatCard from '$lib/components/admin/StatCard.svelte';
	import IndustryBars from '$lib/components/admin/IndustryBars.svelte';
	import StatusDonut from '$lib/components/admin/StatusDonut.svelte';
	import AdsTable from '$lib/components/admin/AdsTable.svelte';
	import LocationBars from '$lib/components/admin/LocationBars.svelte';
	import { ads as fallbackAds, dashboardKPIs as fallbackKPIs } from '$lib/data';
	import type { AdRow } from '$lib/data';

	let {
		dashboardKPIs = fallbackKPIs,
		ads = fallbackAds
	} = $props<{
		dashboardKPIs?: { busCount: number; advertisers: number; ticketsIssued: number; totalCredits: number };
		ads?: AdRow[];
	}>();

	const industryItems = [
		{ label: 'Bank', value: 9 },
		{ label: 'Food', value: 14 },
		{ label: 'Telco', value: 16 },
		{ label: 'Clothing', value: 18 }
	];

	const donutSlices = [
		{ label: 'For Approval', percent: 62.5, color: '#a7e7f0' },
		{ label: 'Ongoing', percent: 25, color: '#2a88a0' },
		{ label: 'Completed', percent: 12.5, color: '#1f4c87' }
	];

	const locationItems = [
		{ label: 'NCR', value: 6 },
		{ label: 'North Luzon', value: 11 },
		{ label: 'Central Luzon', value: 15 },
		{ label: 'South Luzon', value: 19 },
		{ label: 'Western Visayas', value: 21 },
		{ label: 'Central Visayas', value: 30 },
		{ label: 'Eastern Visayas', value: 24 },
		{ label: 'Northern Mindanao', value: 0 },
		{ label: 'Southern Mindanao', value: 0 },
		{ label: 'BARMM', value: 0 }
	];

	const tableRows = $derived(ads.filter((a) => !a.company.startsWith('Client')).slice(0, 18));
</script>

<Topbar title="AirAds Dashboard" />

<section class="grid4">
	<StatCard label="Bus Count" value={dashboardKPIs.busCount} />
	<StatCard label="Advertisers" value={dashboardKPIs.advertisers} />
	<StatCard label="Ticket Issued" value={dashboardKPIs.ticketsIssued.toLocaleString()} />
	<StatCard label="Total Credits" value={dashboardKPIs.totalCredits.toLocaleString()} emphasize />
</section>

<section class="grid2">
	<IndustryBars title="Industry" items={industryItems} />
	<StatusDonut title="Status" slices={donutSlices} />
</section>

<section class="wide">
	<LocationBars title="Location" items={locationItems} />
</section>

<section class="wide">
	<AdsTable rows={tableRows} />
</section>

<style>
	.grid4 {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
		margin-bottom: 14px;
	}
	.grid2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
		margin-bottom: 14px;
	}
	.wide {
		margin-bottom: 14px;
	}
	@media (max-width: 1100px) {
		.grid4 {
			grid-template-columns: repeat(2, 1fr);
		}
		.grid2 {
			grid-template-columns: 1fr;
		}
	}
</style>
