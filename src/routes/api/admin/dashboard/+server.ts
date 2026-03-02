import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dashboardKPIs } from '$lib/server/admin-data';

export const GET: RequestHandler = async () => {
	return json(dashboardKPIs);
};
