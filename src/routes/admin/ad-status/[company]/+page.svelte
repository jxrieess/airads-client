<script lang="ts">
	import Topbar from '$lib/components/admin/Topbar.svelte';
	import StatCard from '$lib/components/admin/StatCard.svelte';
	import StatusBadge from '$lib/components/admin/StatusBadge.svelte';
	import { peso } from '$lib/data';
	import { goto } from '$app/navigation';

	let { data } = $props();
	const ad = $derived(data.ad);
	const baseAds = $derived(data.ads.filter((a: { company: string }) => !a.company.startsWith('Client')));
	const counts = $derived({
		forApproval: baseAds.filter((a: { status: string }) => a.status === 'For Approval').length,
		ongoing: baseAds.filter((a: { status: string }) => a.status === 'Active').length,
		completed: baseAds.filter((a: { status: string }) => a.status === 'Completed').length,
		rejected: baseAds.filter((a: { status: string }) => a.status === 'Rejected').length
	});
</script>

<Topbar title="AirAds Status" />

<section class="cards">
	<StatCard label="For Approval" value={counts.forApproval} emphasize />
	<StatCard label="Ongoing" value={counts.ongoing} />
	<StatCard label="Completed" value={counts.completed} />
	<StatCard label="Rejected" value={counts.rejected} />
</section>

{#if ad}
	<section class="panel">
		<div class="grid">
			<div class="label">Industry</div>
			<div class="value">{ad.industry}</div>

			<div class="label">Company Name</div>
			<div class="value">{ad.company}</div>

			<div class="label">Number of Buses</div>
			<div class="value">{ad.buses}</div>

			<div class="label">Route</div>
			<div class="value">{ad.route ?? '—'}</div>

			<div class="label">Duration</div>
			<div class="value">
				{ad.durationMonths} months
				{#if ad.start && ad.end}
					<div class="sub">{ad.start} - {ad.end}</div>
				{/if}
			</div>

			<div class="label">Photo</div>
			<div class="value">
				{#if ad.photo}
					<img class="logo" src="{ad.photo}" alt="{ad.company} logo" />
				{:else}
					—
				{/if}
			</div>

			<div class="label">Message</div>
			<div class="value message">
				{ad.message ?? '—'}
			</div>

			<div class="label">Credits</div>
			<div class="value">{peso(ad.amount)}</div>

			<div class="label">Status</div>
			<div class="value"><StatusBadge status={ad.status} /></div>
		</div>

		<div class="actions">
			<button class="btn reject" type="button" onclick={() => goto('/admin/ad-status')}>Reject</button>
			<button class="btn approve" type="button" onclick={() => goto('/admin/ad-status')}>Approved</button>
		</div>
	</section>
{:else}
	<p class="notFound">Ad not found.</p>
{/if}

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
		margin-bottom: 14px;
	}

	.panel {
		border: 2px solid var(--accent);
		border-radius: 14px;
		background: #fff;
		padding: 18px 20px 14px;
		position: relative;
		max-width: 980px;
	}

	.grid {
		display: grid;
		grid-template-columns: 160px 1fr;
		column-gap: 18px;
		row-gap: 12px;
		align-items: start;
	}

	.label {
		font-weight: 800;
		color: #111;
	}

	.value {
		color: #111;
	}

	.sub {
		margin-top: 4px;
		color: #111;
	}

	.logo {
		height: 44px;
		width: auto;
		display: block;
		margin-top: 2px;
	}

	.message {
		max-width: 520px;
		line-height: 1.25;
	}

	.actions {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
		margin-top: 10px;
	}

	.btn {
		height: 22px;
		padding: 0 14px;
		border: none;
		border-radius: 8px;
		font-weight: 800;
		font-size: 12px;
		color: #fff;
		cursor: pointer;
	}

	.reject {
		background: #d50000;
	}
	.approve {
		background: #13b500;
	}

	.notFound {
		text-align: center;
		margin-top: 30px;
		font-weight: 700;
	}

	@media (max-width: 1100px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 650px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.actions {
			justify-content: stretch;
		}
		.btn {
			width: 100%;
			height: 34px;
			font-size: 14px;
		}
	}
</style>
