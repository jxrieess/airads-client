<script lang="ts">
	import { KPICard, StatusDonutChart, LocationBarChart, FilterBar, CampaignTable } from '$lib/components/client';
	import type { CampaignRow } from '$lib/components/client/CampaignTable.svelte';

	const allRows: CampaignRow[] = [
		{ company: "Julie's Bakeshop", industry: 'Food', location: 'Visayas', duration: '6 months', buses: '20', amount: 'P 50,000', status: 'For Approval', statusVariant: 'for-approval', date: 'February 14, 2026' },
		{ company: "Julie's Bakeshop", industry: 'Food', location: 'Central Visayas', duration: '9 months', buses: '40', amount: 'P 200,000', status: 'Completed', statusVariant: 'completed', date: 'November 01, 2025' },
		{ company: "Julie's Bakeshop", industry: 'Food', location: 'Western Visayas', duration: '3 months', buses: '35', amount: 'P 145,000', status: 'Active', statusVariant: 'active', date: 'January 05, 2026' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' }
	];

	let filters = {
		industry: '',
		location: '',
		status: '',
		searchTerm: ''
	};

	function handleFilterChange(event: any) {
		filters = event.detail;
	}

	function matchesFilters(row: CampaignRow, currentFilters: typeof filters) {
		const search = currentFilters.searchTerm.trim().toLowerCase();

		if (currentFilters.industry && row.industry !== currentFilters.industry) return false;
		if (currentFilters.location && !row.location.toLowerCase().includes(currentFilters.location.toLowerCase())) return false;
		if (currentFilters.status && row.status !== currentFilters.status) return false;

		if (search) {
			const haystack = `${row.company} ${row.industry} ${row.location} ${row.status}`.toLowerCase();
			if (!haystack.includes(search)) return false;
		}

		return true;
	}

	$: filteredRows = allRows.filter((row) => matchesFilters(row, filters));
</script>

<div class="dashboard-page">
	<!-- Bus & Ticket on the same row, both above Status. Location on the right spanning both rows. -->
	<section class="stats-grid" aria-label="Dashboard stats">
		<div class="stats-cell stats-cell--bus">
			<KPICard label="Bus Count" value="50" />
		</div>
		<div class="stats-cell stats-cell--ticket">
			<KPICard label="Ticket Count" value="12,429" />
		</div>
		<div class="stats-cell stats-cell--status">
			<StatusDonutChart />
		</div>
		<div class="stats-cell stats-cell--location">
			<LocationBarChart />
		</div>
	</section>

	<section class="filters-section">
		<FilterBar on:change={handleFilterChange} />
	</section>

	<section class="table-section">
		<CampaignTable rows={filteredRows} />
	</section>
</div>

<style>
	.dashboard-page {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		gap: 0;
	}

	/* 3-column, 2-row grid:
	   Row 1: [Bus] [Ticket] [Location (top)]
	   Row 2: [Status (spans 2 cols)] [Location (bottom)] */
	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 2fr;
		grid-template-rows: auto minmax(300px, auto);
		grid-template-areas:
			'bus ticket location'
			'status status location';
		gap: 1.25rem;
		flex-shrink: 0;
		margin-bottom: 1.5rem;
	}

	.stats-cell {
		min-width: 0;
	}

	.stats-cell--bus {
		grid-area: bus;
	}

	.stats-cell--ticket {
		grid-area: ticket;
	}

	.stats-cell--status {
		grid-area: status;
		display: flex;
		flex-direction: column;
		min-height: 300px;
	}

	.stats-cell--location {
		grid-area: location;
		display: flex;
		flex-direction: column;
		min-height: 300px;
	}

	.stats-cell--status :global(.chart-card),
	.stats-cell--location :global(.chart-card) {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 300px;
	}

	.filters-section {
		flex-shrink: 0;
		margin-bottom: 1rem;
	}

	.table-section {
		flex: 1;
		min-height: 0;
		overflow: auto;
	}
</style>
