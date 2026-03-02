<script lang="ts">
	interface Props {
		clientName?: string;
		userName?: string;
		userRole?: string;
		credits?: string;
		notificationCount?: number;
	}
	let { clientName = "Julie's Bakeshop", userName = 'Samantha Dwight', userRole = 'Administrator', credits = 'P50,000', notificationCount = 0 }: Props = $props();
</script>

<header class="header">
	<div class="header-left">
		<p class="welcome">Welcome to AirAds, <strong class="client-name">{clientName}</strong></p>
	</div>
	<div class="header-right">
		<div class="user-block">
			<div class="user-info">
				<span class="user-name">{userName}</span>
				<span class="user-role">{userRole}</span>
			</div>
			<button type="button" class="icon-btn icon-btn--bell" aria-label="Notifications">
				<svg class="bell-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
					<path d="M13.73 21a2 2 0 0 1-3.46 0" />
				</svg>
				{#if notificationCount > 0}
					<span class="notification-badge" aria-hidden="true">{notificationCount > 9 ? '9+' : notificationCount}</span>
				{/if}
			</button>
			<a href="/client/profile" class="avatar" aria-label="View profile">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="#b45309"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
			</a>
		</div>
		<div class="credits-row">
			<a href="#" class="add-credits">Add Credits <span class="icon-plus">+</span></a>
			<span class="credits-pill">{credits}</span>
		</div>
	</div>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}
	.welcome {
		margin: 0;
		font-size: 1.5rem;
		color: #374151;
	}
	.client-name {
		color: #1e40af;
		font-weight: 700;
	}
	.header-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
	}
	.user-block {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.user-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.user-name {
		font-weight: 600;
		color: #374151;
	}
	.user-role {
		font-size: 0.8rem;
		color: #6b7280;
	}
	.icon-btn {
		position: relative;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 50%;
		background: transparent;
		color: #4b5563;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-btn:hover {
		background: #f3f4f6;
		color: #111827;
	}
	.bell-icon {
		display: block;
	}
	.notification-badge {
		position: absolute;
		top: 2px;
		right: 2px;
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		font-size: 0.65rem;
		font-weight: 700;
		line-height: 16px;
		text-align: center;
		background: #dc2626;
		color: #fff;
		border-radius: 999px;
		border: 2px solid #fff;
	}
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #f9a8d4;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}
	.credits-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.add-credits {
		color: #3b82f6;
		font-size: 0.9rem;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.add-credits:hover {
		text-decoration: underline;
	}
	.icon-plus {
		font-size: 1rem;
	}
	.credits-pill {
		background: #bfdbfe;
		color: #1e40af;
		padding: 0.35rem 0.75rem;
		border-radius: 9999px;
		font-weight: 600;
		font-size: 0.9rem;
	}
</style>
