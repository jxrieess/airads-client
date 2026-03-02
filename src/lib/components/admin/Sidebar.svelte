<script lang="ts">
	import { page } from '$app/stores';

	const nav = [
		{ href: '/admin/dashboard', label: 'Dashboard', icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>` },
		{ href: '/admin/ad-status', label: 'Ad Status', icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>` },
		{ href: '/admin/map', label: 'Map', icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>` },
		{ href: '/admin/setup', label: 'Set-up', icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>` },
		{ href: '/client', label: 'Client', icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>` }
	];

	const isActive = (href: string) => $page.url.pathname.startsWith(href);
</script>

<aside class="side">
	<div class="logo">
		<img src="/logo.png" alt="AirAds Logo" />
	</div>

	<nav class="nav">
		{#each nav as item}
			<a class="link {isActive(item.href) ? 'active' : ''}" href={item.href}>
				<span class="icon" aria-hidden="true">{@html item.icon}</span>
				<span>{item.label}</span>
			</a>
		{/each}
	</nav>

	<div class="bottom">
		<a class="link" href="/admin/profile">
			<span class="icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="8" r="4" />
					<path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
				</svg>
			</span>
			<span>Profile</span>
		</a>
		<a class="link" href="/admin/logout">
			<span class="icon">🚪</span>
			<span>Log Out</span>
		</a>
	</div>
</aside>

<style>
	.side {
		width: 250px;
		background: #fff;
		border-right: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
		border-radius: 18px;
		padding: 14px 12px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		position: sticky;
		top: 0;
		height: calc(100vh - 28px);
	}
	.logo {
		display: flex;
		justify-content: center;
		padding: 6px 0 10px;
	}
	.logo img {
		width: 190px;
		height: 190px;
		max-height: 90px;
		border-radius: 12px;
		object-fit: contain;
	}

	:global(.icon svg) {
		width: 18px;
		height: 18px;
		stroke-width: 2;
	}
	.nav {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding-top: 6px;
	}
	.link {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 12px;
		border-radius: 12px;
		color: #1c2b33;
		text-decoration: none;
		font-weight: 600;
	}
	.link:hover {
		background: #f3fdff;
	}
	.active {
		background: #dff7fb;
	}
	.icon {
		width: 18px;
		height: 18px;
		border-radius: 4px;
	}
	.bottom {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
</style>
