import { redirect } from '@sveltejs/kit';

export function load() {
	// Placeholder: redirect to client (replace with real logout when auth is added)
	redirect(302, '/client');
}
