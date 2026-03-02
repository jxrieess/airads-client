<script lang="ts">
	import Topbar from '$lib/components/admin/Topbar.svelte';
	import { onMount } from 'svelte';

	let mapEl: HTMLDivElement | null = null;
	let mapboxgl: typeof import('mapbox-gl') | null = null;

	onMount(async () => {
		try {
			const m = await import('mapbox-gl');
			mapboxgl = m.default ?? m;
			await import('mapbox-gl/dist/mapbox-gl.css');
		} catch (e) {
			console.warn('mapbox-gl failed to load:', e);
			return;
		}

		const token = import.meta.env.VITE_MAPBOX_TOKEN;
		if (!token) {
			console.warn('VITE_MAPBOX_TOKEN not set.');
			return;
		}

		mapboxgl.accessToken = token;

		const map = new mapboxgl.Map({
			container: mapEl as HTMLElement,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [123.9, 10.3157],
			zoom: 11.6
		});

		map.addControl(new mapboxgl.NavigationControl());

		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true,
			showUserHeading: true
		});

		map.addControl(geolocate);

		map.on('load', () => {
			geolocate.trigger();
		});
	});
</script>

<Topbar title="Map" />

<div class="mapWrap">
	<div class="mapInner">
		<div bind:this={mapEl} class="map" aria-label="AirAds map"></div>
	</div>
</div>

<style>
	:global(html, body) {
		height: 100%;
		overflow: hidden;
		margin: 0;
	}

	:global(#app) {
		height: 100%;
	}

	.mapWrap {
		height: calc(100vh - 70px);
		padding: 12px;
		box-sizing: border-box;
	}

	.mapInner {
		border: 2px solid var(--accent);
		border-radius: 12px;
		background: #fff;
		padding: 12px;
		height: 100%;
		box-sizing: border-box;
	}

	.map {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}

	@media (max-width: 900px) {
		.mapWrap {
			height: calc(100vh - 60px);
		}
	}
</style>
