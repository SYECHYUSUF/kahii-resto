<script lang="ts">
	import type { PageData } from './$types';
	import { favorites } from '$lib/favorites.svelte';

	let { data } = $props<{ data: PageData }>();
	let product = $derived(data.product);

	// Mapping IDs for transition from Landing Page
	const landingPageMap: Record<string, string> = {
		'kahii-signature-latte': 'signature',
		'kahii-umm-ali': 'umm-ali',
		'croissant-classic': 'bites'
	};

	function getTransitionId(id: string) {
		return landingPageMap[id] || id;
	}

	function addToFavorites() {
		const floatingBtn = document.getElementById('floating-fav-button');
		const productImage = document.getElementById('main-product-image') as HTMLImageElement;

		if (floatingBtn && productImage) {
			const imgRect = productImage.getBoundingClientRect();
			const btnRect = floatingBtn.getBoundingClientRect();

			// Create flying clone
			const clone = productImage.cloneNode() as HTMLImageElement;
			clone.style.position = 'fixed';
			clone.style.top = `${imgRect.top}px`;
			clone.style.left = `${imgRect.left}px`;
			clone.style.width = `${imgRect.width}px`;
			clone.style.height = `${imgRect.height}px`;
			clone.style.borderRadius = '3rem';
			clone.style.zIndex = '1000';
			clone.style.transition = 'all 0.8s cubic-bezier(0.42, 0, 0.58, 1)';
			clone.style.pointerEvents = 'none';

			document.body.appendChild(clone);

			// Animation frame for smooth transition
			requestAnimationFrame(() => {
				clone.style.top = `${btnRect.top + btnRect.height / 2}px`;
				clone.style.left = `${btnRect.left + btnRect.width / 2}px`;
				clone.style.width = '20px';
				clone.style.height = '20px';
				clone.style.opacity = '0';
				clone.style.transform = 'scale(0.1) rotate(45deg)';
			});

			setTimeout(() => {
				clone.remove();
			}, 800);
		}

		favorites.add(product);
	}
</script>

<svelte:head>
	<title>{product.name} | KAHII</title>
</svelte:head>

<div class="min-h-screen bg-brand-cream pb-24">
	<!-- Top Bar -->
	<nav class="sticky top-0 z-50 bg-brand-dark/90 py-6 text-white shadow-md backdrop-blur-md">
		<div class="container mx-auto px-6">
			<a
				href="/products"
				class="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase transition-colors hover:text-brand-gold"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/></svg
				>
				Kembali ke Menu
			</a>
		</div>
	</nav>

	<main class="container mx-auto mt-12 px-6">
		<div class="grid gap-12 lg:grid-cols-2">
			<!-- Product Image -->
			<div
				class="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl"
				style="view-transition-name: product-image-{getTransitionId(product.id)}"
			>
				<img
					id="main-product-image"
					src={product.image}
					alt={product.name}
					class="h-full w-full object-cover"
				/>
				<div
					class="absolute top-8 left-8 rounded-full bg-brand-gold px-6 py-2 text-sm font-bold tracking-widest text-brand-dark uppercase shadow-lg"
				>
					{product.category}
				</div>
			</div>

			<!-- Product Details -->
			<div class="flex flex-col justify-center">
				<h1
					class="mb-6 text-6xl tracking-widest text-brand-dark lg:text-8xl"
					style="font-family: var(--font-display); view-transition-name: product-name-{getTransitionId(
						product.id
					)}"
				>
					{product.name}
				</h1>
				<p class="mb-8 text-3xl font-bold text-brand-gold lg:text-4xl">
					Rp {product.price.toLocaleString('id-ID')}
				</p>
				<div class="mb-10 h-1 w-20 bg-brand-gold"></div>
				<p class="mb-12 text-xl leading-relaxed text-brand-dark/70 lg:text-2xl">
					{product.description}
				</p>

				<div class="flex flex-col gap-4 sm:flex-row">
					<a
						href="https://wa.me/6281234567890?text=I'd like to order {product.name}"
						class="flex-1 rounded-3xl bg-primary px-10 py-6 text-center text-xl font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
					>
						Pesan via WhatsApp
					</a>
					<button
						onclick={addToFavorites}
						class="flex-1 rounded-3xl bg-brand-dark px-10 py-6 text-xl font-bold text-white shadow-xl transition-all hover:bg-brand-gold hover:text-brand-dark active:scale-95"
					>
						Favoritkan
					</button>
				</div>

				<div class="mt-16 grid grid-cols-3 gap-8 border-t border-brand-dark/10 pt-16 text-center">
					<div>
						<h4 class="mb-2 text-xs font-bold tracking-widest text-brand-dark/40 uppercase">
							Aroma
						</h4>
						<p class="font-bold">Exceptional</p>
					</div>
					<div>
						<h4 class="mb-2 text-xs font-bold tracking-widest text-brand-dark/40 uppercase">
							Kualitas
						</h4>
						<p class="font-bold">Premium</p>
					</div>
					<div>
						<h4 class="mb-2 text-xs font-bold tracking-widest text-brand-dark/40 uppercase">
							Rasa
						</h4>
						<p class="font-bold">Original</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
