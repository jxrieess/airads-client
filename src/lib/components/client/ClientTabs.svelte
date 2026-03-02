<script lang="ts">
	import { page } from '$app/stores';

	const tabs = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Map', href: '/map' },
		{ label: 'Advertise', href: '/advertise' }
	];
</script>

<nav class="tabs">
	{#each tabs as tab}
		<a href={tab.href} class="tab" class:active={$page.url.pathname === tab.href}>
			{tab.label}
		</a>
	{/each}
</nav>

<style>
	.tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid #2F5F98;
	}
	.tab {
		padding: 0.6rem 0.25rem;
		margin-bottom: -1px;
		color: #9ca3af;
		text-decoration: none;
		font-size: 0.95rem;
	}
	.tab.active {
		color: #374151;
		font-weight: 700;
		border-bottom: 3px solid #2F5F98;
	}
</style>
