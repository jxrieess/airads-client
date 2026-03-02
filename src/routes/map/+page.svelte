<script lang="ts">
	import { onMount } from 'svelte';
	import 'mapbox-gl/dist/mapbox-gl.css';

	const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

	// Fallback: Philippines center
	const DEFAULT_CENTER: [number, number] = [122.7312, 11.351];
	const DEFAULT_ZOOM = 5;

	let mapContainer: HTMLDivElement;
	let locationError = '';

	onMount(() => {
		let mapInstance: any;
		let userMarker: any;

		(async () => {
			const module = await import('mapbox-gl');
			const mapboxgl = module.default;

			mapboxgl.accessToken = mapboxToken;

			mapInstance = new mapboxgl.Map({
				container: mapContainer,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: DEFAULT_CENTER,
				zoom: DEFAULT_ZOOM
			});

			mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

			// Center map on user's location when ready
			mapInstance.on('load', () => {
				if (!navigator.geolocation) {
					locationError = 'Geolocation is not supported by your browser.';
					return;
				}

				navigator.geolocation.getCurrentPosition(
					(pos) => {
						locationError = '';
						const lng = pos.coords.longitude;
						const lat = pos.coords.latitude;

						mapInstance.flyTo({ center: [lng, lat], zoom: 14, duration: 2000 });

						// Remove previous marker if any
						if (userMarker) userMarker.remove();

						userMarker = new mapboxgl.Marker({ color: '#0ea5e9' })
							.setLngLat([lng, lat])
							.setPopup(
								new mapboxgl.Popup({ offset: 25 }).setHTML(
									'<strong>You are here</strong>'
								)
							)
							.addTo(mapInstance);
					},
					() => {
						locationError = 'Location access denied or unavailable. Showing default map.';
					},
					{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
				);
			});
		})();

		return () => {
			if (userMarker) userMarker.remove();
			if (mapInstance) mapInstance.remove();
		};
	});
</script>

<div class="map-page">
	<section class="map-card" aria-label="Client campaigns map">
		<header class="map-header">
			<div>
				<h2 class="map-title">Campaign Map</h2>
				<p class="map-subtitle">View campaign locations on the map. The map will center on your location.</p>
			</div>
		</header>

		{#if locationError}
			<p class="location-message location-message--warn" role="alert">{locationError}</p>
		{/if}

		<div bind:this={mapContainer} class="map-container" />
	</section>
</div>

<style>
	.map-page {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
	}

	.map-card {
		border: 1px solid #a8d8e8;
		border-radius: 12px;
		background: #fff;
		padding: 1rem 1.25rem 1.25rem;
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
	}

	.map-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.map-title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 600;
		color: #1f2937;
	}

	.map-subtitle {
		margin: 0.15rem 0 0 0;
		font-size: 0.85rem;
		color: #6b7280;
	}

	.location-message {
		margin: 0 0 0.75rem 0;
		font-size: 0.85rem;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
	}
	.location-message--warn {
		background: #fef3c7;
		color: #92400e;
		border: 1px solid #fcd34d;
	}

	.map-container {
		flex: 1;
		min-height: 360px;
		border-radius: 10px;
		overflow: hidden;
	}

	/* Make mapbox canvas fill the container */
	.map-container :global(.mapboxgl-canvas) {
		width: 100% !important;
		height: 100% !important;
	}
</style>
