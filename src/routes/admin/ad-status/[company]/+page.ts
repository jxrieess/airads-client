import { fetchAds } from '$lib/api';
import { ads as fallbackAds } from '$lib/data';

export const ssr = false;

export async function load({ params }) {
	const res = await fetchAds(1, 200);
	const ads = res?.items ?? fallbackAds;
	const company = params.company ? decodeURIComponent(params.company) : '';
	const ad = ads.find((a) => a.company === company) ?? null;
	return { ads, ad };
}
