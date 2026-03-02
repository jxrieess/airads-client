<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Props {
		searchPlaceholder?: string;
	}

	const dispatch = createEventDispatcher<{
		change: {
			industry: string;
			location: string;
			status: string;
			searchTerm: string;
		};
	}>();

	let { searchPlaceholder = 'Search...' }: Props = $props();

	let industry = '';
	let location = '';
	let status = '';
	let searchTerm = '';

	function emitChange() {
		dispatch('change', { industry, location, status, searchTerm });
	}
</script>

<div class="filters">
	<select
		class="filter-select"
		bind:value={industry}
		on:change={emitChange}
	>
		<option value="">Industry</option>
		<option value="Food">Food</option>
		<option value="BPO">BPO</option>
		<option value="Clothing">Clothing</option>
		<option value="Apparel">Apparel</option>
		<option value="Event Services">Event Services</option>
	</select>
	<select
		class="filter-select"
		bind:value={location}
		on:change={emitChange}
	>
		<option value="">Location</option>
		<option value="NCR">NCR</option>
		<option value="North Luzon">North Luzon</option>
		<option value="Central Luzon">Central Luzon</option>
		<option value="South Luzon">South Luzon</option>
		<option value="Western Visayas">Western Visayas</option>
		<option value="Central Visayas">Central Visayas</option>
		<option value="Eastern Visayas">Eastern Visayas</option>
		<option value="Northern Mindanao">Northern Mindanao</option>
		<option value="Southern Mindanao">Southern Mindanao</option>
		<option value="BARMM">BARMM</option>
	</select>
	<select
		class="filter-select"
		bind:value={status}
		on:change={emitChange}
	>
		<option value="">Status</option>
		<option value="For Approval">For Approval</option>
		<option value="Active">Active</option>
		<option value="Completed">Completed</option>
		<option value="Rejected">Rejected</option>
	</select>
	<div class="search-wrap">
		<svg
			class="search-icon"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
		<input
			type="text"
			class="search-input"
			placeholder={searchPlaceholder}
			bind:value={searchTerm}
			on:input={emitChange}
		/>
	</div>
</div>

<style>
	.filters {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.75rem;
		margin-bottom: 1rem;
	}
	.filter-select,
	.search-wrap {
		border: 1px solid #6CE5E8;
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		font-size: 0.9rem;
		color: #374151;
		background: #fff;
		width: 100%;
		box-sizing: border-box;
	}
	.search-wrap {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.search-icon {
		color: #6b7280;
		flex-shrink: 0;
	}
	.search-input {
		border: none;
		outline: none;
		flex: 1;
		font-size: 0.9rem;
	}
	.search-input::placeholder {
		color: #9ca3af;
	}
</style>
