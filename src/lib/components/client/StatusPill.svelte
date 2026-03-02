<script lang="ts">
	interface Props {
		status: string;
		variant?: 'for-approval' | 'completed' | 'active' | 'default';
	}
	let { status, variant = 'default' }: Props = $props();
</script>

<span class="status-pill" class:status-for-approval={variant === 'for-approval'} class:status-completed={variant === 'completed'} class:status-active={variant === 'active'}>
	{status}
</span>

<style>
	.status-pill {
		display: inline-block;
		padding: 0.25rem 0.6rem;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 500;
	}
	.status-for-approval {
		background: #d9f99d;
		color: #422006;
	}
	.status-completed {
		background: #fed7aa;
		color: #9a3412;
	}
	.status-active {
		background: #bbf7d0;
		color: #14532d;
	}
</style>
