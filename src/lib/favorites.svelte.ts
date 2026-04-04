import { browser } from '$app/environment';
import type { Product } from './products';

class FavoritesStore {
	items = $state<Product[]>([]);
	isShaking = $state(false);

	constructor() {
		if (browser) {
			const saved = localStorage.getItem('kahii-favorites');
			if (saved) {
				this.items = JSON.parse(saved);
			}
		}
	}

	add(product: Product) {
		if (!this.items.find((p) => p.id === product.id)) {
			this.items.push(product);
			this.save();
			
			// Trigger shaking animation after fly animation (approx 1s)
			setTimeout(() => {
				this.isShaking = true;
				setTimeout(() => (this.isShaking = false), 500);
			}, 800);
		}
	}

	remove(id: string) {
		this.items = this.items.filter((p) => p.id !== id);
		this.save();
	}

	private save() {
		if (browser) {
			localStorage.setItem('kahii-favorites', JSON.stringify(this.items));
		}
	}
}

export const favorites = new FavoritesStore();
