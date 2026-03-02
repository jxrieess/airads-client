import { fetchDashboard, fetchAds } from '$lib/api';
import { dashboardKPIs, ads } from '$lib/data';

export const ssr = false;

export async function load() {
	const [kpis, adsRes] = await Promise.all([fetchDashboard(), fetchAds(1, 50)]);
	return {
		dashboardKPIs: kpis ?? dashboardKPIs,
		ads: adsRes?.items ?? ads,
		fromApi: Boolean(kpis && adsRes)
	};
}
