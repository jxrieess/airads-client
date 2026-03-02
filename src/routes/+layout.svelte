<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { ClientHeader, ClientTabs } from '$lib/components/client';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>
	:global(body) {
		margin: 0;
		background: #f8fafc;
		font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
		color: #374151;
	}
	:global(html, body) {
		height: 100%;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		padding: 1.25rem 1.5rem;
		background: #f1f5f9;
		box-sizing: border-box;
	}
	.wrapper :global(main) {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}
</style>

<div class="wrapper">
	<ClientHeader />
	<ClientTabs />
	<main>
		{@render children()}
	</main>
</div>
