import { env } from '$env/dynamic/public';
import type { AdRow } from '$lib/data';

/** When unset, uses same-origin (built-in API routes). When set, uses external backend. */
const getBase = () =>
	(typeof env.PUBLIC_API_URL === 'string' && env.PUBLIC_API_URL ? env.PUBLIC_API_URL : '').replace(
		/\/$/,
		''
	);

function apiUrl(path: string): string {
	const base = getBase();
	return base ? `${base}${path}` : path;
}

export async function fetchDashboard(): Promise<{
	busCount: number;
	advertisers: number;
	ticketsIssued: number;
	totalCredits: number;
} | null> {
	try {
		const r = await fetch(apiUrl('/api/admin/dashboard'));
		if (!r.ok) return null;
		return await r.json();
	} catch {
		return null;
	}
}

export async function fetchAds(
	page = 1,
	size = 50
): Promise<{ items: AdRow[]; total: number; page: number; size: number } | null> {
	try {
		const r = await fetch(apiUrl(`/api/admin/ads?page=${page}&size=${size}`));
		if (!r.ok) return null;
		return await r.json();
	} catch {
		return null;
	}
}

/** True when using an external API URL; false when using built-in same-origin API. */
export function hasBackend(): boolean {
	return Boolean(getBase());
}
