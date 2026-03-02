<script lang="ts">
	import Topbar from '$lib/components/admin/Topbar.svelte';
	import { userProfile } from '$lib/data';

	let editing = $state(false);
	let form = $state({
		fullName: '',
		email: '',
		contact: '',
		position: '',
		department: ''
	});

	function loadForm(p: {
		fullName: string;
		email: string;
		contact: string;
		position: string;
		department: string;
	}) {
		form = {
			fullName: p.fullName,
			email: p.email,
			contact: p.contact,
			position: p.position,
			department: p.department
		};
	}

	$effect(() => {
		const p = $userProfile;
		if (!editing) loadForm(p);
	});

	function toggleEdit() {
		editing = !editing;
		if (!editing) loadForm($userProfile);
	}

	function save() {
		userProfile.update((p) => ({
			...p,
			fullName: form.fullName,
			email: form.email,
			contact: form.contact,
			position: form.position,
			department: form.department
		}));
		editing = false;
		alert('Saved!');
	}
</script>

<Topbar title="Profile" />

<section class="panel">
	<div class="left">
		<div class="avatar" aria-hidden="true"></div>

		<div class="name">{$userProfile.fullName}</div>
		<div class="rolePill">{$userProfile.role}</div>

		<div class="metaRow">
			<div class="metaBlock">
				<div class="metaLabel">Member Since</div>
				<div class="metaValue">{$userProfile.memberSince}</div>
			</div>

			<div class="metaBlock">
				<div class="metaLabel">Last Login</div>
				<div class="metaValue">{$userProfile.lastLogin}</div>
			</div>
		</div>
	</div>

	<div class="right">
		<div class="header">
			<div class="hdrTitle">Profile Information</div>

			<button class="editBtn" type="button" onclick={toggleEdit}>
				✏️ {editing ? 'Cancel' : 'Edit Profile'}
			</button>
		</div>

		<div class="fields">
			<div class="field">
				<div class="flabel">Full Name</div>
				<input class="finput" bind:value={form.fullName} disabled={!editing} />
			</div>

			<div class="field">
				<div class="flabel">Email Address</div>
				<input class="finput" type="email" bind:value={form.email} disabled={!editing} />
			</div>

			<div class="field">
				<div class="flabel">Contact Number</div>
				<input class="finput" bind:value={form.contact} disabled={!editing} />
			</div>

			<div class="field">
				<div class="flabel">Position</div>
				<input class="finput" bind:value={form.position} disabled={!editing} />
			</div>

			<div class="field">
				<div class="flabel">Department</div>
				<input class="finput" bind:value={form.department} disabled={!editing} />
			</div>

			{#if editing}
				<div class="saveCell">
					<button class="saveBtn" type="button" onclick={save}>
						Save Changes
					</button>
				</div>
			{:else}
				<div></div>
			{/if}
		</div>
	</div>
</section>

<style>
	.panel {
		border: 2px solid var(--accent);
		border-radius: 16px;
		background: #fff;
		padding: 22px;
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 26px;
		align-items: stretch;
		max-width: 1100px;
	}

	.left {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		padding-top: 8px;
	}

	.avatar {
		width: 170px;
		height: 170px;
		border-radius: 50%;
		background:
			radial-gradient(circle at 35% 30%, #ffcf6a 0 35%, transparent 36%),
			radial-gradient(circle at 65% 35%, #ff6a6a 0 45%, #f24a66 46% 100%);
		border: 10px solid #fff;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
	}

	.name {
		font-weight: 800;
		font-size: 18px;
		margin-top: 2px;
		text-align: center;
	}

	.rolePill {
		background: #73b9c7;
		color: #fff;
		font-weight: 700;
		padding: 8px 14px;
		border-radius: 14px;
	}

	.metaRow {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-top: 12px;
		gap: 18px;
	}

	.metaBlock {
		flex: 1;
		text-align: center;
	}

	.metaLabel {
		color: #777;
		font-size: 14px;
		margin-bottom: 6px;
	}

	.metaValue {
		font-weight: 800;
		font-size: 14px;
	}

	.right {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hdrTitle {
		font-size: 30px;
		font-weight: 900;
		text-align: center;
	}

	.editBtn {
		position: absolute;
		right: 0;
		background: #f4f5f7;
		border: none;
		padding: 10px 14px;
		border-radius: 14px;
		font-weight: 700;
		cursor: pointer;
		box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
	}

	.fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
		margin-top: 4px;
	}

	.field {
		background: #f4f5f7;
		border: 1px solid rgba(0, 0, 0, 0.28);
		border-radius: 12px;
		padding: 10px 12px;
	}

	.flabel {
		font-size: 16px;
		color: #777;
		font-weight: 700;
		margin-bottom: 6px;
	}

	.finput {
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		font-size: 18px;
		font-weight: 600;
		color: #111;
	}

	.saveCell {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}

	.saveBtn {
		width: 100%;
		height: 56px;
		border: none;
		border-radius: 14px;
		background: #2f5f97;
		color: #fff;
		font-size: 22px;
		font-weight: 900;
		cursor: pointer;
	}

	@media (max-width: 900px) {
		.panel {
			grid-template-columns: 1fr;
		}
	}
</style>
