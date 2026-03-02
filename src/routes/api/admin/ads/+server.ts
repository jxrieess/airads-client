import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ads } from '$lib/server/admin-data';

export const GET: RequestHandler = async ({ url }) => {
	const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10));
	const size = Math.min(100, Math.max(1, parseInt(url.searchParams.get('size') ?? '50', 10)));
	const start = (page - 1) * size;
	const items = ads.slice(start, start + size);
	return json({
		items,
		total: ads.length,
		page,
		size
	});
};
