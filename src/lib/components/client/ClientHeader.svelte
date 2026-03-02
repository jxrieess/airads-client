<script lang="ts">
	interface Props {
		clientName?: string;
		userName?: string;
		userRole?: string;
		credits?: string;
	}
	let { clientName = "Julie's Bakeshop", userName = 'Samantha Dwight', userRole = 'Administrator', credits = 'P50,000' }: Props = $props();
</script>

<header class="header">
	<div class="header-left">
		<h1 class="title">Client DASHBOARD</h1>
		<p class="welcome">Welcome to AirAds, <strong class="client-name">{clientName}</strong></p>
	</div>
	<div class="header-right">
		<div class="user-block">
			<div class="user-info">
				<span class="user-name">{userName}</span>
				<span class="user-role">{userRole}</span>
			</div>
			<a href="/profile" class="avatar" aria-label="View profile">
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
	.header-left .title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #374151;
		margin: 0 0 0.25rem 0;
	}
	.welcome {
		margin: 0;
		font-size: 0.95rem;
		color: #4b5563;
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
