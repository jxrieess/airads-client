<script lang="ts">
	import Sidebar from '$lib/components/admin/Sidebar.svelte';

	let { children } = $props();
</script>

<div class="app">
	<Sidebar />
	<main class="main">
		{@render children()}
	</main>
</div>

<style>
	:global(:root) {
		--accent: #63d6e2;
	}
	:global(html, body) {
		height: 100%;
		margin: 0;
		overflow: hidden;
		font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
		background: #ffffff;
		color: #102028;
	}
	.app {
		display: flex;
		gap: 18px;
		height: 100vh;
		box-sizing: border-box;
	}
	.main {
		flex: 1;
		padding: 4px 6px;
		overflow-y: auto;
	}
</style>
