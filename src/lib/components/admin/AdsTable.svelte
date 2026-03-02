<script lang="ts">
	import type { AdRow } from '$lib/data';
	import { peso } from '$lib/data';
	import StatusBadge from './StatusBadge.svelte';
	import { goto } from '$app/navigation';

	let { rows = [], basePath = '/admin/ad-status' } = $props<{
		rows: AdRow[];
		basePath?: string;
	}>();

	const cols = [
		'Company Name',
		'Industry',
		'Location',
		'Duration',
		'No. of Buses',
		'Amount',
		'Status'
	];
</script>

<div class="wrap">
	<table class="tbl">
		<thead>
			<tr>
				{#each cols as c}
					<th>{c}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each rows.filter((r) => !r.company.startsWith('Client')) as r}
				<tr
					class:clickable={r.status === 'For Approval'}
					onclick={() => r.status === 'For Approval' && goto(`${basePath}/${encodeURIComponent(r.company)}`)}
				>
					<td>{r.company}</td>
					<td>{r.industry}</td>
					<td>{r.location}</td>
					<td>{r.durationMonths} months</td>
					<td>{r.buses}</td>
					<td>{peso(r.amount)}</td>
					<td><StatusBadge status={r.status} /></td>
				</tr>
			{/each}
		</tbody>

		<tfoot>
			<tr>
				{#each cols as c}
					<th>{c}</th>
				{/each}
			</tr>
		</tfoot>
	</table>
</div>

<style>
	.wrap {
		border: 2px solid var(--accent);
		border-radius: 14px;
		overflow: hidden;
		background: #fff;
	}

	.tbl {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		min-width: 860px;
	}

	thead th,
	tfoot th {
		text-align: left;
		padding: 10px 14px;
		font-weight: 700;
		font-size: 16px;
		background: #fff;
		border-bottom: 2px solid var(--accent);
	}

	tfoot th {
		font-weight: 600;
		color: #666;
		border-top: 2px solid var(--accent);
		border-bottom: none;
	}

	tbody td {
		padding: 10px 14px;
		font-size: 16px;
		border-bottom: 2px solid rgba(99, 214, 226, 0.85);
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	.clickable {
		cursor: pointer;
	}
	tr:hover {
		background: #f3fdff;
	}
	tr:not(.clickable):hover {
		background: transparent;
		cursor: default;
	}
</style>
