<script lang="ts">
	const MAX_MESSAGE_LENGTH = 80;

	// Location / operator / routes data
	const LOCATIONS = [
		'NCR',
		'Northern Luzon',
		'Central Luzon',
		'Southern Luzon',
		'Western Visayas',
		'Central Visayas',
		'Eastern Visayas',
		'Northern Mindanao',
		'Southern Mindanao',
		'BARMM'
	] as const;

	const OPERATORS = [
		'MTC',
		'LAMADO',
		'COC',
		'INTRASCO',
		'LATRASCO',
		"People's Jeep",
		'RSJ Lines',
		'PITAMCO',
		'UDOTCO'
	] as const;

	const LOCATION_OPERATORS: Record<string, string[]> = {
		NCR: ['MTC', 'LAMADO', "People's Jeep", 'RSJ Lines'],
		'Northern Luzon': ['MTC', 'COC', 'INTRASCO', 'LATRASCO'],
		'Central Luzon': ['COC', 'INTRASCO', 'PITAMCO', 'LATRASCO'],
		'Southern Luzon': ['LAMADO', 'LATRASCO', 'UDOTCO'],
		'Western Visayas': ['MTC', "People's Jeep", 'RSJ Lines', 'COC'],
		'Central Visayas': ['LAMADO', 'COC', 'PITAMCO', 'INTRASCO'],
		'Eastern Visayas': ['INTRASCO', 'UDOTCO', 'PITAMCO'],
		'Northern Mindanao': ['LATRASCO', "People's Jeep", 'UDOTCO'],
		'Southern Mindanao': ['RSJ Lines', 'UDOTCO', 'PITAMCO'],
		BARMM: ['MTC', 'LATRASCO', 'UDOTCO']
	};

	const OPERATOR_ROUTES: Record<string, string[]> = {
		MTC: ['MTC Route 1', 'MTC Route 2', 'MTC Route 3'],
		LAMADO: ['LAMADO Route 1', 'LAMADO Route 2'],
		COC: ['COC Route 1', 'COC Route 2', 'COC Route 3'],
		INTRASCO: ['INTRASCO Route 1', 'INTRASCO Route 2'],
		LATRASCO: ['LATRASCO Route 1', 'LATRASCO Route 2', 'LATRASCO Route 3'],
		"People's Jeep": ["People's Jeep Route 1", "People's Jeep Route 2"],
		'RSJ Lines': ['RSJ Route 1', 'RSJ Route 2'],
		'PITAMCO': ['PITAMCO Route 1', 'PITAMCO Route 2'],
		'UDOTCO': ['UDOTCO Route 1', 'UDOTCO Route 2']
	};

	let industryCompany = "Food, Julie's Bakeshop";
	let message = $state('');
	let months = $state(1);
	let startDate = $state('2026-02-20');
	let endDate = $state('2026-08-20');
	let totalBusNumber = $state(15);
	let budgetValue = $state(50000);
	let budgetMin = 5000;
	let budgetMax = 150000;

	let selectedLocations = $state<string[]>([]);
	let selectedOperators = $state<string[]>([]);
	let selectedRoutes = $state<string[]>([]);
	let routeCounts = $state<Record<string, number>>({});

	let isLocationOpen = $state(false);
	let isOperatorOpen = $state(false);
	let isRouteOpen = $state(false);

	let previewMessage = $derived(
		message.trim() || 'Eat apple a day to keep the doctor away!'
	);
	let estimatedTickets = $derived(totalBusNumber * 1667);
	let costPerReceipt = $derived(
		estimatedTickets > 0 ? (budgetValue / estimatedTickets).toFixed(2) : '0.00'
	);

	let availableOperators = $derived.by(() => {
		if (selectedLocations.length === 0) return [];
		const set = new Set<string>();
		for (const loc of selectedLocations) {
			const ops = LOCATION_OPERATORS[loc] ?? [];
			ops.forEach((op) => set.add(op));
		}
		return [...set].sort();
	});

	let availableRoutes = $derived.by(() => {
		if (selectedOperators.length === 0) return [];
		const set = new Set<string>();
		for (const op of selectedOperators) {
			const routes = OPERATOR_ROUTES[op] ?? [];
			routes.forEach((r) => set.add(r));
		}
		return [...set].sort();
	});

	function toggleLocation(loc: string) {
		const next = selectedLocations.includes(loc)
			? selectedLocations.filter((l) => l !== loc)
			: [...selectedLocations, loc];
		selectedLocations = next;
		const newOps =
			next.length === 0 ? [] : [...new Set(next.flatMap((l) => LOCATION_OPERATORS[l] ?? []))];
		selectedOperators = selectedOperators.filter((op) => newOps.includes(op));
		const newRoutes =
			selectedOperators.length === 0
				? []
				: [...new Set(selectedOperators.flatMap((o) => OPERATOR_ROUTES[o] ?? []))];
		selectedRoutes = selectedRoutes.filter((r) => newRoutes.includes(r));
	}

	function toggleOperator(op: string) {
		const next = selectedOperators.includes(op)
			? selectedOperators.filter((o) => o !== op)
			: [...selectedOperators, op];
		selectedOperators = next;
		const newRoutes =
			next.length === 0 ? [] : [...new Set(next.flatMap((o) => OPERATOR_ROUTES[o] ?? []))];
		selectedRoutes = selectedRoutes.filter((r) => newRoutes.includes(r));
	}

	function toggleRoute(route: string) {
		if (selectedRoutes.includes(route)) {
			selectedRoutes = selectedRoutes.filter((r) => r !== route);
			const { [route]: _removed, ...rest } = routeCounts;
			routeCounts = rest;
		} else {
			selectedRoutes = [...selectedRoutes, route];
			if (!routeCounts[route]) {
				routeCounts = { ...routeCounts, [route]: 1 };
			}
		}
	}

	function incrementRoute(route: string) {
		const current = routeCounts[route] ?? 1;
		routeCounts = { ...routeCounts, [route]: current + 1 };
	}

	function decrementRoute(route: string) {
		const current = routeCounts[route] ?? 1;
		const next = Math.max(1, current - 1);
		routeCounts = { ...routeCounts, [route]: next };
	}

	function clearMessage() {
		message = '';
	}

	function incrementMonths() {
		months = Math.min(12, months + 1);
	}

	function decrementMonths() {
		months = Math.max(1, months - 1);
	}
</script>

<div class="tips-page">
	<div class="tips-header">
		<a href="/advertise" class="back-link">&lt;</a>
		<span class="crumb">Client - Tips of the Day</span>
	</div>

	<!-- Top panel -->
	<div class="panel">
		<div class="panel-grid">
			<div class="panel-main">
				<label class="label">Industry and Company Name</label>
				<input class="input" type="text" bind:value={industryCompany} readonly />

				<h3 class="section-title">Tips of the Day</h3>
				<label class="label">Message</label>
				<div class="message-wrap">
					<textarea
						class="textarea"
						bind:value={message}
						maxlength={MAX_MESSAGE_LENGTH}
						rows="3"
						placeholder="Message (Maximum of 80 characters, including spaces, punctuation, and line breaks)"
					/>
					<button type="button" class="clear-btn" on:click={clearMessage}>×</button>
				</div>
			</div>

			<div class="panel-preview">
				<h3 class="preview-title">See Preview</h3>
				<div class="receipt-preview">
					<div class="receipt-line">Merchant Name : GOODKREDIT</div>
					<div class="receipt-line">Txn ID</div>
					<div class="receipt-line">Date/Time : 2005-04-11 08:51:15</div>
					<div class="receipt-line">Route</div>
					<div class="receipt-line">Station</div>
					<div class="receipt-line">Distance</div>
					<div class="receipt-line">Passenger Type : REG (0pax)</div>
					<div class="receipt-line">Payment Type : CASH</div>
					<div class="receipt-line">Amount Paid : 5800</div>
					<div class="receipt-line">GOOD AFCS</div>
					<div class="receipt-line">GOOD AFC5216 nexgo216 nexgo</div>
					<div class="receipt-ad">{previewMessage}</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom panel -->
	<div class="panel">
		<div class="panel-grid">
			<div class="tips-left-col">
				<label class="label label--heading">LOCATION</label>
				<div class="multi-select">
					<button
						type="button"
						class="multi-select-trigger"
						on:click={() => (isLocationOpen = !isLocationOpen)}
					>
						<span class="multi-select-label">
							{selectedLocations.length === 0
								? 'Select Location'
								: selectedLocations.join(', ')}
						</span>
						<span class="multi-select-arrow">▾</span>
					</button>
					{#if isLocationOpen}
						<div class="multi-select-menu">
							{#each LOCATIONS as loc}
								<label class="multi-select-option">
									<input
										type="checkbox"
										checked={selectedLocations.includes(loc)}
										on:change={() => toggleLocation(loc)}
									/>
									<span>{loc}</span>
								</label>
							{/each}
						</div>
					{/if}
				</div>

				<label class="label label--heading">TRANSPORT OPERATORS</label>
				<div class="multi-select">
					<button
						type="button"
						class="multi-select-trigger"
						disabled={availableOperators.length === 0}
						on:click={() => (isOperatorOpen = !isOperatorOpen)}
					>
						<span class="multi-select-label">
							{selectedOperators.length === 0
								? 'Select Transport Operators'
								: selectedOperators.join(', ')}
						</span>
						<span class="multi-select-arrow">▾</span>
					</button>
					{#if isOperatorOpen && availableOperators.length > 0}
						<div class="multi-select-menu">
							{#each availableOperators as op}
								<label class="multi-select-option">
									<input
										type="checkbox"
										checked={selectedOperators.includes(op)}
										on:change={() => toggleOperator(op)}
									/>
									<span>{op}</span>
								</label>
							{/each}
						</div>
					{/if}
				</div>

				<label class="label label--heading">ROUTES</label>
				<div class="multi-select">
					<button
						type="button"
						class="multi-select-trigger"
						disabled={availableRoutes.length === 0}
						on:click={() => (isRouteOpen = !isRouteOpen)}
					>
						<span class="multi-select-label">
							{selectedRoutes.length === 0 ? 'Select Routes' : selectedRoutes.join(', ')}
						</span>
						<span class="multi-select-arrow">▾</span>
					</button>
					{#if isRouteOpen && availableRoutes.length > 0}
						<div class="multi-select-menu routes-menu">
							{#each availableRoutes as route}
								<div class="route-option-row">
									<div class="route-option-main">
										<label class="route-option-label">
											<input
												type="checkbox"
												checked={selectedRoutes.includes(route)}
												on:change={() => toggleRoute(route)}
											/>
											<span>{route}</span>
										</label>
									</div>
									<div class="route-counter">
										<span class="route-count">{routeCounts[route] ?? 1}</span>
										<button
											type="button"
											class="route-counter-btn"
											on:click={() => incrementRoute(route)}
										>
											+
										</button>
										<button
											type="button"
											class="route-counter-btn"
											on:click={() => decrementRoute(route)}
										>
											−
										</button>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<div class="tips-right-col">
				<div class="duration-block">
					<h3 class="label">Duration</h3>
					<label class="label label--sub">Choose when this ad will end</label>
					<div class="duration-row">
						<div class="duration-card">
							<span class="duration-card-title">Months</span>
							<div class="duration-months-row">
								<span class="months-value">{months}</span>
								<div class="months-buttons">
									<button
										type="button"
										class="stepper-btn"
										on:click={incrementMonths}
									>
										+
									</button>
									<button
										type="button"
										class="stepper-btn"
										on:click={decrementMonths}
									>
										−
									</button>
								</div>
							</div>
						</div>
						<div class="duration-card">
							<span class="duration-card-title">Start Date</span>
							<input class="input date-input" type="date" bind:value={startDate} />
						</div>
						<div class="duration-card">
							<span class="duration-card-title">End Date</span>
							<input class="input date-input" type="date" bind:value={endDate} />
						</div>
					</div>
				</div>

				<div class="total-bus-block">
					<span class="total-bus-title">Total Bus Number</span>
					<div class="total-bus">
						<input
							class="input total-bus-input"
							type="number"
							min="1"
							max="30"
							bind:value={totalBusNumber}
						/>
						<span class="hint">10 buses is the minimum number required based on your goal.</span>
					</div>
				</div>

				<div class="budget-block">
					<span class="label label--heading">Budget</span>
					<p class="budget-caption">Estimated 8k - 13k transactions per month</p>
					<div class="budget-slider-row">
						<span class="budget-min">₱{budgetMin.toLocaleString()}</span>
						<input
							class="budget-slider"
							type="range"
							min={budgetMin}
							max={budgetMax}
							step="1000"
							bind:value={budgetValue}
						/>
						<span class="budget-max">₱{budgetMax.toLocaleString()}</span>
					</div>
					<div class="budget-value">₱{budgetValue.toLocaleString()}</div>
				</div>

				<div class="summary-block">
					<h3 class="summary-title">Ad Summary</h3>
					<div class="summary-grid">
						<div class="summary-label">Total Bus Number</div>
						<div class="summary-value">{totalBusNumber}</div>

						<div class="summary-label">Budget</div>
						<div class="summary-value">₱{budgetValue.toLocaleString()}</div>

						<div class="summary-label">Cost per receipt</div>
						<div class="summary-value">₱{costPerReceipt}</div>

						<div class="summary-label">Estimated released ticket</div>
						<div class="summary-value">
							{estimatedTickets.toLocaleString()}
						</div>
					</div>
				</div>

				<div class="actions">
					<button type="button" class="btn btn-secondary">Cancel</button>
					<button type="button" class="btn btn-primary">Create Advertisement</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.tips-page {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		padding-bottom: 2rem;
	}

	.tips-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		border: 1px solid transparent;
		text-decoration: none;
		color: #111827;
		font-size: 1rem;
	}

	.back-link:hover {
		border-color: #d1d5db;
		background: #f3f4f6;
	}

	.crumb {
		font-size: 0.9rem;
		color: #6b7280;
	}

	.panel {
		border: 2px solid #7ee0e5;
		border-radius: 12px;
		background: #fff;
		padding: 1rem 1.25rem;
		margin-bottom: 1.25rem;
	}

	.panel-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		gap: 1.5rem;
		align-items: flex-start;
	}

	@media (max-width: 900px) {
		.panel-grid {
			grid-template-columns: 1fr;
		}
	}

	.panel-main {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.panel-preview {
		min-width: 0;
	}

	.tips-left-col,
	.tips-right-col {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.section-title {
		margin: 1rem 0 0 0;
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
	}

	.label {
		display: block;
		font-size: 0.85rem;
		font-weight: 600;
		color: #111827;
		margin-bottom: 0.35rem;
	}

	.label--heading {
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.label--sub {
		font-weight: 500;
		color: #6b7280;
	}

	.input,
	.textarea {
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 6px;
		font-size: 0.9rem;
		color: #1f2937;
		box-sizing: border-box;
	}

	.textarea {
		resize: vertical;
		min-height: 80px;
	}

	.message-wrap {
		position: relative;
		display: flex;
		align-items: flex-start;
	}

	.message-wrap .textarea {
		flex: 1;
		padding-right: 2.25rem;
	}

	.clear-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		width: 24px;
		height: 24px;
		border: none;
		background: #f3f4f6;
		color: #6b7280;
		font-size: 1.1rem;
		line-height: 1;
		border-radius: 4px;
		cursor: pointer;
	}

	.clear-btn:hover {
		background: #e5e7eb;
		color: #374151;
	}

	.preview-title {
		margin: 0 0 0.5rem 0;
		font-size: 0.95rem;
		font-weight: 600;
		color: #111827;
	}

	.receipt-preview {
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		padding: 0.75rem 0.75rem 1rem;
		background: #f9fafb;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		font-size: 0.7rem;
		color: #111827;
	}

	.receipt-line + .receipt-line {
		margin-top: 0.15rem;
	}

	.receipt-ad {
		margin-top: 0.75rem;
		padding-top: 0.5rem;
		border-top: 1px dashed #d1d5db;
		font-weight: 600;
		text-align: center;
	}

	.multi-select {
		position: relative;
		width: 100%;
	}

	.multi-select-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 6px;
		background: #fff;
		font-size: 0.9rem;
		color: #1f2937;
		cursor: pointer;
		box-sizing: border-box;
	}

	.multi-select-trigger:disabled {
		background: #f9fafb;
		color: #9ca3af;
		cursor: not-allowed;
	}

	.multi-select-label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.multi-select-arrow {
		margin-left: 0.5rem;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.multi-select-menu {
		position: absolute;
		z-index: 10;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		background: #fff;
		border: 1px solid #e5e7eb;
		border-radius: 6px;
		max-height: 200px;
		overflow-y: auto;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
		padding: 0.25rem 0.5rem 0.5rem;
		box-sizing: border-box;
	}

	.multi-select-option {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.15rem 0;
		font-size: 0.85rem;
		color: #111827;
	}

	.multi-select-option input[type='checkbox'] {
		width: 14px;
		height: 14px;
	}

	.routes-menu {
		padding: 0;
	}

	.route-option-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		padding: 0.35rem 0.75rem;
		font-size: 0.85rem;
		color: #111827;
		border-bottom: 1px solid #e5e7eb;
	}

	.route-option-row:last-child {
		border-bottom: none;
	}

	.route-option-main {
		display: flex;
		align-items: center;
	}

	.route-option-label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.route-option-label input[type='checkbox'] {
		width: 14px;
		height: 14px;
	}

	.route-counter {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.route-count {
		min-width: 1rem;
		text-align: center;
	}

	.route-counter-btn {
		width: 22px;
		height: 22px;
		border-radius: 999px;
		border: 1px solid #111827;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		font-size: 0.8rem;
		line-height: 1;
		cursor: pointer;
	}

	.route-counter-btn:hover {
		background: #f3f4f6;
	}

	.duration-block {
		margin-top: 0.25rem;
	}

	.duration-row {
		display: flex;
		gap: 0.75rem;
		align-items: stretch;
		flex-wrap: nowrap;
	}

	.duration-card {
		flex: 1 1 0;
		border: 1px solid #7ee0e5;
		border-radius: 10px;
		padding: 0.45rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		box-sizing: border-box;
	}

	.duration-card-title {
		font-size: 0.85rem;
		font-weight: 600;
		color: #111827;
	}

	.duration-months-row {
		display: flex;
		align-items: center;
	}

	.months-value {
		flex: 1 1 0;
		font-weight: 600;
		text-align: center;
	}

	.months-buttons {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.stepper-btn {
		width: 22px;
		height: 22px;
		border-radius: 999px;
		border: 1px solid #111827;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		font-size: 0.8rem;
		line-height: 1;
		cursor: pointer;
	}

	.stepper-btn:hover {
		background: #f3f4f6;
	}

	.date-label {
		display: block;
		font-size: 0.75rem;
		color: #6b7280;
		margin-bottom: 0.25rem;
	}

	.duration-card .date-input {
		font-size: 0.85rem;
		padding-inline: 0;
		width: 100%;
		border: none;
		background: transparent;
	}

	.total-bus-block {
		margin-top: 0.75rem;
	}

	.total-bus-title {
		font-size: 0.85rem;
		font-weight: 600;
		color: #111827;
	}

	.total-bus {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: 0.25rem;
	}

	.total-bus-input {
		max-width: 80px;
	}

	.hint {
		font-size: 0.75rem;
		color: #6b7280;
	}

	.budget-block {
		margin-top: 0.75rem;
	}

	.budget-caption {
		margin: 0 0 0.5rem 0;
		font-size: 0.8rem;
		color: #6b7280;
	}

	.budget-slider-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.budget-min,
	.budget-max {
		font-size: 0.8rem;
		color: #6b7280;
	}

	.budget-slider {
		flex: 1;
	}

	.budget-value {
		margin-top: 0.25rem;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.summary-block {
		margin-top: 0.75rem;
		border-top: 1px solid #e5e7eb;
		padding-top: 0.75rem;
	}

	.summary-title {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
		row-gap: 0.25rem;
		column-gap: 0.75rem;
		font-size: 0.8rem;
	}

	.summary-label {
		color: #6b7280;
	}

	.summary-value {
		text-align: right;
		font-weight: 600;
		color: #111827;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.btn {
		min-width: 120px;
		padding: 0.45rem 0.9rem;
		border-radius: 6px;
		border: 1px solid transparent;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
	}

	.btn-secondary {
		background: #e5e7eb;
		color: #111827;
	}

	.btn-primary {
		background: #2563eb;
		color: #ffffff;
	}
</style>

