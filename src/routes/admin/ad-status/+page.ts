import { fetchAds } from '$lib/api';
import { ads as fallbackAds } from '$lib/data';

export const ssr = false;

export async function load() {
	const res = await fetchAds(1, 200);
	return {
		ads: res?.items ?? fallbackAds,
		fromApi: Boolean(res)
	};
}
