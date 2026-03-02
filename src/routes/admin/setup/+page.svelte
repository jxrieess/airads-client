<script lang="ts">
	import Topbar from '$lib/components/admin/Topbar.svelte';

	let form = $state({
		companyName: '',
		industry: '',
		address: '',
		contactName: '',
		position: '',
		contactNumber: '',
		email: ''
	});

	function submit(e: SubmitEvent) {
		e.preventDefault();

		const isEmpty =
			!form.companyName.trim() ||
			!form.industry.trim() ||
			!form.address.trim() ||
			!form.contactName.trim() ||
			!form.position.trim() ||
			!form.contactNumber.trim() ||
			!form.email.trim();

		if (isEmpty) {
			alert('Please fill up all required fields.');
			return;
		}

		alert(`Created account for: ${form.companyName}`);
	}

	function reset() {
		form = {
			companyName: '',
			industry: '',
			address: '',
			contactName: '',
			position: '',
			contactNumber: '',
			email: ''
		};
	}
</script>

<Topbar title="Setup" />

<section class="panel">
	<div class="head">
		<div class="icon" aria-hidden="true">👤</div>
		<div class="headText">Create Client Account</div>
	</div>

	<form class="form" onsubmit={submit}>
		<div class="sectionTitle">Client Profile</div>

		<div class="grid2">
			<div class="field">
				<div class="label">Company Name</div>
				<input class="input" bind:value={form.companyName} required />
			</div>

			<div class="field">
				<div class="label">Industry</div>
				<input class="input" bind:value={form.industry} required />
			</div>
		</div>

		<div class="field">
			<div class="label">Address</div>
			<input class="input" bind:value={form.address} required />
		</div>

		<div class="sectionTitle">Contact Person</div>

		<div class="grid2">
			<div class="field">
				<div class="label">Full Name</div>
				<input class="input" bind:value={form.contactName} required />
			</div>

			<div class="field">
				<div class="label">Position</div>
				<input class="input" bind:value={form.position} required />
			</div>
		</div>

		<div class="gridContact">
			<div class="field">
				<div class="label">Contact Number</div>
				<input class="input" bind:value={form.contactNumber} required />
			</div>

			<div class="field">
				<div class="label">Email</div>
				<input class="input" type="email" bind:value={form.email} required />
			</div>
		</div>

		<div class="actions">
			<button type="button" class="btn cancel" onclick={reset}>Cancel</button>
			<button type="submit" class="btn primary">Create Account</button>
		</div>
	</form>
</section>

<style>
	:global(html, body) {
		margin: 0;
		height: 100%;
		overflow: hidden;
	}

	.panel {
		border: 4px solid var(--accent);
		border-radius: 18px;
		padding: 18px;
		max-width: 1100px;
		width: 100%;
		margin: 10px auto;
		box-sizing: border-box;
		height: calc(100vh - 80px);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.form {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.head {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 10px;
	}

	.icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		border: 2px solid rgba(0, 0, 0, 0.55);
		background: #fff;
		font-size: 21px;
	}

	.headText {
		font-weight: 700;
		font-size: 20px;
	}

	.sectionTitle {
		font-size: 16px;
		font-weight: 700;
		margin: 12px 0 8px;
	}

	.grid2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		margin-bottom: 14px;
	}

	.gridContact {
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: 16px;
		margin-top: 10px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.label {
		font-size: 14px;
		font-weight: 700;
	}

	.input {
		height: 36px;
		border: 2px solid rgba(0, 0, 0, 0.45);
		border-radius: 4px;
		padding: 0 10px;
		font-size: 15px;
		background: #fff;
		box-sizing: border-box;
	}

	.actions {
		margin-top: auto;
		display: flex;
		justify-content: flex-end;
		gap: 16px;
		padding-top: 12px;
	}

	.btn {
		height: 40px;
		padding: 0 20px;
		border: none;
		border-radius: 12px;
		font-weight: 700;
		font-size: 14px;
		cursor: pointer;
	}

	.cancel {
		background: #bfbfbf;
		color: #000;
	}

	.primary {
		background: #2f5f97;
		color: #fff;
	}

	@media (max-width: 900px) {
		.grid2 {
			grid-template-columns: 1fr;
		}

		.gridContact {
			grid-template-columns: 1fr;
		}
	}
</style>
