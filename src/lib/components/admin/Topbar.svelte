<script lang="ts">
	import { userProfile } from '$lib/data';

	let { title = '' } = $props();
</script>

<div class="topbar">
	<div class="title">{title}</div>

	<div class="user">
		<div class="userText">
			<div class="uname">{$userProfile.fullName}</div>
			<div class="role">{$userProfile.role}</div>
		</div>

		<div class="avatar" aria-hidden="true"></div>
	</div>
</div>

<style>
	.topbar {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 8px 10px 14px;
	}

	.title {
		font-size: 22px;
		font-weight: 800;
	}

	.user {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.userText {
		text-align: right;
		line-height: 1.1;
	}

	.uname {
		font-size: 12px;
		font-weight: 700;
	}

	.role {
		font-size: 12px;
		color: #56656e;
		font-weight: 600;
	}

	.avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, #ffd36a, #ff6a6a);
		border: 1px solid rgba(0, 0, 0, 0.15);
	}
</style>
