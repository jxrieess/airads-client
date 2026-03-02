<script lang="ts">
	let fullName = $state('Samantha Dwight');
	let email = $state('dwight.jub.admin@gmail.com');
	let contactNumber = $state('+639618453295');
	let position = $state("Julie's Administrator");
	let department = $state('Management');

	let isEditing = $state(false);

	let avatarUrl = $state<string | null>(null);

	function handleAvatarChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) {
			avatarUrl = null;
			return;
		}
		avatarUrl = URL.createObjectURL(file);
	}
</script>

<div class="profile-page">
	<div class="profile-card">
		<div class="profile-left">
			<div class="profile-avatar-circle">
				{#if avatarUrl}
					<img src={avatarUrl} alt="Profile photo" class="profile-avatar-img" />
				{:else}
					<div class="profile-avatar-icon"></div>
				{/if}
			</div>

			{#if isEditing}
				<label class="profile-upload-label">
					<span class="profile-add-media-text">Upload media</span>
					<input
						class="avatar-input"
						type="file"
						accept="image/*"
						on:change={handleAvatarChange}
					/>
				</label>
			{/if}

			<div class="profile-name-block">
				<div class="profile-name">{fullName}</div>
				<div class="profile-role-pill">Administrator</div>
			</div>

			<div class="profile-meta-row">
				<div class="profile-meta">
					<div class="profile-meta-label">Member Since</div>
					<div class="profile-meta-value">February 11, 2026</div>
				</div>
				<div class="profile-meta">
					<div class="profile-meta-label">Last Login</div>
					<div class="profile-meta-value">02/11/2026 · 8:45 AM</div>
				</div>
			</div>
		</div>

		<div class="profile-right">
			<div class="profile-header-row">
				<h2 class="profile-title">Profile Information</h2>
				<button
					class="edit-profile-btn"
					type="button"
					on:click={() => (isEditing = !isEditing)}
				>
					{isEditing ? 'Cancel' : 'Edit Profile'}
				</button>
			</div>

			<div class="profile-grid">
				<div class="profile-field">
					<label class="field-label">Full Name</label>
					{#if isEditing}
						<input class="field-input" type="text" bind:value={fullName} />
					{:else}
						<div class="field-value">{fullName}</div>
					{/if}
				</div>
				<div class="profile-field">
					<label class="field-label">Email Address</label>
					{#if isEditing}
						<input class="field-input" type="email" bind:value={email} />
					{:else}
						<div class="field-value">{email}</div>
					{/if}
				</div>

				<div class="profile-field">
					<label class="field-label">Contact Number</label>
					{#if isEditing}
						<input class="field-input" type="tel" bind:value={contactNumber} />
					{:else}
						<div class="field-value">{contactNumber}</div>
					{/if}
				</div>
				<div class="profile-field">
					<label class="field-label">Position</label>
					{#if isEditing}
						<input class="field-input" type="text" bind:value={position} />
					{:else}
						<div class="field-value">{position}</div>
					{/if}
				</div>

				<div class="profile-field">
					<label class="field-label">Department</label>
					{#if isEditing}
						<input class="field-input" type="text" bind:value={department} />
					{:else}
						<div class="field-value">{department}</div>
					{/if}
				</div>
			</div>

			{#if isEditing}
				<div class="profile-actions">
					<button class="save-btn" type="button" on:click={() => (isEditing = false)}>
						Saves Changes
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.profile-page {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
	}

	.profile-card {
		border: 2px solid #7ee0e5;
		border-radius: 12px;
		background: #ffffff;
		padding: 2.5rem 3rem;
		width: 100%;
		margin-top: 1.25rem;
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 2.7fr);
		column-gap: 3rem;
		row-gap: 2.5rem;
		min-height: calc(95vh - 200px);
		box-sizing: border-box;
	}

	@media (max-width: 900px) {
		.profile-card {
			grid-template-columns: 1fr;
		}
	}

	.profile-left {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		align-items: center;
	}

	.profile-avatar-circle {
		width: 170px;
		height: 170px;
		border-radius: 50%;
		background: #f97373;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		padding: 0;
		cursor: pointer;
		overflow: hidden;
	}

	.profile-avatar-icon {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: #facc15;
	}

	.profile-avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.profile-name-block {
		text-align: center;
	}

	.profile-name {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
	}

	.profile-add-media-text {
		display: inline-block;
		margin-bottom: 0.25rem;
		font-size: 0.8rem;
		color: #4b5563;
	}

	.profile-upload-label {
		margin-top: 0.5rem;
		font-size: 0.8rem;
		color: #4b5563;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.avatar-input {
		font-size: 0.8rem;
	}

	.profile-role-pill {
		display: inline-block;
		margin-top: 0.25rem;
		padding: 0.2rem 0.7rem;
		border-radius: 999px;
		background: #dbeafe;
		color: #1f2937;
		font-size: 0.8rem;
	}

	.profile-meta-row {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}

	.profile-meta {
		min-width: 200px;
		text-align: center;
	}

	.profile-meta-label {
		color: #6b7280;
		margin-bottom: 0.15rem;
	}

	.profile-meta-value {
		color: #111827;
		font-weight: 500;
	}

	.profile-right {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.profile-header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.profile-title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 600;
		color: #111827;
	}

	.edit-profile-btn {
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		border: 1px solid #e5e7eb;
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		font-size: 0.85rem;
		cursor: pointer;
	}

	.profile-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2rem 1.25rem;
	}

	.profile-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.profile-field.full-width {
		grid-column: 1 / -1;
	}

	.field-label {
		font-size: 0.8rem;
		color: #6b7280;
	}

	.field-input,
	.field-value {
		border-radius: 10px;
		border: 1px solid #e5e7eb;
		background: #f3f4f6;
		padding: 1rem 1.25rem;
		font-size: 1rem;
		min-height: 52px;
		color: #111827;
		box-sizing: border-box;
	}

	.profile-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}

	.save-btn {
		min-width: 300px;
		padding: 0.6rem 1.3rem;
		border-radius: 6px;
		border: none;
		background: #1f58a8;
		color: #ffffff;
		font-size: 1.2rem;
		font-weight: 600;
		cursor: pointer;
	}

	.save-btn:hover {
		background: #184581;
	}
</style>

