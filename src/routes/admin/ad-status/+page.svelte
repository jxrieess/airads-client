<script lang="ts">
	import Topbar from '$lib/components/admin/Topbar.svelte';
	import StatCard from '$lib/components/admin/StatCard.svelte';
	import AdsTable from '$lib/components/admin/AdsTable.svelte';
	import type { AdStatus } from '$lib/data';

	let { data } = $props();
	const baseAds = $derived((data.ads ?? []).filter((a: { company: string }) => !a.company.startsWith('Client')));

	let industry = $state<string>('Industry');
	let location = $state<string>('Location');
	let status = $state<string>('Status');
	let search = $state<string>('');

	const industries = $derived([
		'Industry',
		'Food',
		'BPO',
		'Clothing',
		'Apparel',
		'Event Services'
	]);

	const locations = $derived([
		'Location',
		'NCR',
		'North Luzon',
		'South Luzon',
		'Central Luzon',
		'Western Visayas',
		'Central Visayas',
		'Eastern Visayas',
		'Northern Mindanao',
		'Southern Mindanao',
		'BARMM'
	]);

	const statuses = $derived([
		'Status',
		'For Approval',
		'Active',
		'Completed',
		'Rejected'
	]);

	const normalized = (s: string) => s.trim().toLowerCase();

	const filtered = $derived(
		baseAds.filter((a) => {
			const okIndustry = industry === 'Industry' || a.industry === industry;
			const okLocation = location === 'Location' || a.location === location;
			const okStatus = status === 'Status' || a.status === (status as AdStatus);

			const q = normalized(search);
			const okSearch =
				!q ||
				normalized(a.company).includes(q) ||
				normalized(a.industry).includes(q) ||
				normalized(a.location).includes(q) ||
				normalized(a.status).includes(q);

			return okIndustry && okLocation && okStatus && okSearch;
		})
	);

	const counts = $derived({
		forApproval: baseAds.filter((a) => a.status === 'For Approval').length,
		ongoing: baseAds.filter((a) => a.status === 'Active').length,
		completed: baseAds.filter((a) => a.status === 'Completed').length,
		rejected: baseAds.filter((a) => a.status === 'Rejected').length
	});
</script>

<Topbar title="AirAds Status" />

<section class="cards">
	<StatCard label="For Approval" value={counts.forApproval} />
	<StatCard label="Ongoing" value={counts.ongoing} />
	<StatCard label="Completed" value={counts.completed} />
	<StatCard label="Rejected" value={counts.rejected} />
</section>

<section class="filters">
	<select bind:value={industry}>
		{#each industries as i}
			<option value={i}>{i}</option>
		{/each}
	</select>

	<select bind:value={location}>
		{#each locations as l}
			<option value={l}>{l}</option>
		{/each}
	</select>

	<select bind:value={status}>
		{#each statuses as s}
			<option value={s}>{s}</option>
		{/each}
	</select>

	<div class="search">
		<span class="magnifier" aria-hidden="true"></span>
		<input placeholder="Search" bind:value={search} />
	</div>
</section>

<AdsTable rows={filtered} />

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
		margin-bottom: 14px;
	}

	.filters {
		display: grid;
		grid-template-columns: 180px 180px 180px 220px;
		gap: 14px;
		align-items: center;
		margin-bottom: 14px;
	}

	select {
		height: 38px;
		border-radius: 10px;
		border: 2px solid #2a6fb6;
		padding: 0 10px;
		background: #fff;
		font-weight: 600;
		color: #1c2b33;
	}

	.search {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 38px;
		border-radius: 10px;
		border: 2px solid #2a6fb6;
		padding: 0 10px;
		background: #fff;
	}

	.magnifier {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 2px solid rgba(0, 0, 0, 0.45);
		position: relative;
	}

	.magnifier:after {
		content: '';
		position: absolute;
		width: 8px;
		height: 2px;
		background: rgba(0, 0, 0, 0.45);
		right: -7px;
		bottom: -3px;
		transform: rotate(45deg);
		border-radius: 2px;
	}

	input {
		width: 100%;
		border: none;
		outline: none;
		font-weight: 600;
	}

	@media (max-width: 1100px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}

		.filters {
			grid-template-columns: 1fr;
		}
	}
</style>
