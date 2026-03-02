<script lang="ts">
	import StatusPill from './StatusPill.svelte';

	export interface CampaignRow {
		company: string;
		industry: string;
		location: string;
		duration: string;
		buses: string;
		amount: string;
		status: string;
		statusVariant?: 'for-approval' | 'completed' | 'active';
		date: string;
	}

	interface Props {
		rows?: CampaignRow[];
	}

	const defaultRows: CampaignRow[] = [
		{ company: "Julie's Bakeshop", industry: 'Food', location: 'Visayas', duration: '6 months', buses: '20', amount: 'P 50,000', status: 'For Approval', statusVariant: 'for-approval', date: 'February 14, 2026' },
		{ company: "Julie's Bakeshop", industry: 'Food', location: 'Cen. Visayas', duration: '9 months', buses: '40', amount: 'P 200,000', status: 'Completed', statusVariant: 'completed', date: 'November 01, 2025' },
		{ company: "Julie's Bakeshop", industry: 'Food', location: 'Wes. Visayas', duration: '3 months', buses: '35', amount: 'P 145,000', status: 'Active', statusVariant: 'active', date: 'January 05, 2026' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' },
		{ company: 'Company Name', industry: 'Industry', location: 'Location', duration: 'Duration', buses: 'No. of Buses', amount: 'Amount', status: 'Status', date: '' }
	];

	let { rows = defaultRows }: Props = $props();
</script>

<div class="table-card">
	<table class="data-table">
		<thead>
			<tr>
				<th>Company Name</th>
				<th>Industry</th>
				<th>Location</th>
				<th>Duration</th>
				<th>No. of Buses</th>
				<th>Amount</th>
				<th>Status</th>
				<th>Creation Date</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row, i}
				<tr class={i % 2 === 1 ? 'alt' : ''}>
					<td>{row.company}</td>
					<td>{row.industry}</td>
					<td>{row.location}</td>
					<td>{row.duration}</td>
					<td>{row.buses}</td>
					<td>{row.amount}</td>
					<td>
						{#if row.statusVariant}
							<StatusPill status={row.status} variant={row.statusVariant} />
						{:else}
							{row.status}
						{/if}
					</td>
					<td>{row.date}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-card {
		border: 1px solid #a8d8e8;
		background: #fff;
		border-radius: 12px;
		overflow: hidden;
	}
	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}
	.data-table th {
		text-align: left;
		padding: 0.75rem 1rem;
		background: #fff;
		color: #374151;
		font-weight: 600;
		border-bottom: 1px solid #e5e7eb;
	}
	.data-table td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #f3f4f6;
	}
	.data-table tbody tr.alt {
		background: #f8fafc;
	}
	.data-table tbody tr:hover {
		background: #f1f5f9;
	}
</style>
