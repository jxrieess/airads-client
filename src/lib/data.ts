import { writable } from 'svelte/store';

export type AdStatus = 'For Approval' | 'Active' | 'Completed' | 'Rejected';

export type AdRow = {
	company: string;
	industry: string;
	location: string;
	durationMonths: number;
	buses: number;
	amount: number;
	status: AdStatus;
	route?: string;
	start?: string;
	end?: string;
	photo?: string;
	message?: string;
};

const base: AdRow[] = [
	{
		company: "Julie's Bakeshop",
		industry: 'Food',
		location: 'Visayas',
		durationMonths: 6,
		buses: 20,
		amount: 50000,
		status: 'For Approval',
		route: 'Mandaue - Cebu',
		start: 'February',
		end: 'August',
		photo: '/julies-logo.svg',
		message: "Enjoy 10% discount, presents the receipt at any Julie's Bakeshop branch."
	},
	{ company: 'Concentrix', industry: 'BPO', location: 'Luzon', durationMonths: 9, buses: 40, amount: 200000, status: 'Active' },
	{ company: 'Penshoppe', industry: 'Clothing', location: 'Luzon', durationMonths: 3, buses: 35, amount: 145000, status: 'Completed' },
	{ company: '7 Eleven', industry: 'Food', location: 'Luzon', durationMonths: 12, buses: 15, amount: 50000, status: 'Active' },
	{ company: 'Burger King', industry: 'Food', location: 'Mindanao', durationMonths: 2, buses: 15, amount: 50000, status: 'Rejected' }
];

function gen(prefix: string, n: number, status: AdStatus): AdRow[] {
	const industries = ['Food', 'BPO', 'Clothing', 'Bank', 'Telco'];
	const locations = ['Luzon', 'Visayas', 'Mindanao', 'NCR'];
	return Array.from({ length: n }, (_, i) => ({
		company: `${prefix} ${i + 1}`,
		industry: industries[i % industries.length],
		location: locations[i % locations.length],
		durationMonths: [2, 3, 6, 9, 12][i % 5],
		buses: [10, 15, 20, 25, 35, 40][i % 6],
		amount: [50000, 75000, 120000, 145000, 200000][i % 5],
		status
	}));
}

export const ads: AdRow[] = [
	...base,
	...gen('Client (For Approval)', 19, 'For Approval'),
	...gen('Client (Active)', 13, 'Active'),
	...gen('Client (Completed)', 11, 'Completed')
];

export const dashboardKPIs = {
	busCount: 100,
	advertisers: 20,
	ticketsIssued: 45675,
	totalCredits: 137025
};

export const userProfile = writable({
	fullName: 'Cressa Faye Abrencia',
	email: 'cressaabrencia@gmail.com',
	contact: '+639123456789',
	position: 'System Administrator',
	department: 'Management',
	role: 'Administrator',
	memberSince: 'April 24, 2025',
	lastLogin: '8:45 : 1023'
});

export function peso(n: number) {
	return `₱ ${n.toLocaleString('en-PH')}`;
}
