// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

// Fix: mapbox-gl references @mapbox/point-geometry types that may not be hoisted
declare module '@mapbox/point-geometry' {
	export default class Point {
		x: number;
		y: number;
		constructor(x: number, y: number);
		clone(): Point;
		add(other: Point): Point;
		sub(other: Point): Point;
		mult(k: number): Point;
		div(k: number): Point;
		rotate(angle: number): Point;
		matMult(m: number[]): Point;
		unit(): Point;
		perp(): Point;
		round(): Point;
		mag(): number;
		equals(other: Point): boolean;
		dist(other: Point): number;
		distSqr(other: Point): number;
		angle(): number;
		angleTo(b: Point): number;
		angleWith(b: Point): number;
		angleWithSep(x: number, y: number): number;
	}
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
