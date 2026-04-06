<script lang="ts">
	import { products } from '$lib/products';
	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	// Mapping IDs for transition from Landing Page
	const landingPageMap: Record<string, string> = {
		'kahii-signature-latte': 'signature',
		'kahii-umm-ali': 'umm-ali',
		'croissant-classic': 'bites'
	};

	function getTransitionId(id: string) {
		return landingPageMap[id] || id;
	}

	let selectedCategory = $state<'All' | 'Coffee' | 'Dessert' | 'Bites'>('All');

	const filteredProducts = $derived(
		selectedCategory === 'All' ? products : products.filter((p) => p.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Products | KAHII</title>
</svelte:head>

<div class="min-h-screen bg-brand-cream pb-24">
	<!-- Header -->
	<header class="relative bg-brand-dark py-16 text-center text-white">
		<div
			class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920')] bg-cover bg-center object-cover opacity-20 mix-blend-overlay"
		></div>
		<div class="relative z-10 container mx-auto px-6">
			<a
				href="/#menu"
				class="mb-8 inline-block text-sm font-bold tracking-widest uppercase transition-colors hover:text-primary"
			>
				← Kembali ke Beranda
			</a>
			<h1 class="text-6xl tracking-widest text-white" style="font-family: var(--font-display)">
				Daftar Menu
			</h1>
			<p class="mt-4 text-lg text-brand-cream/80">Pilihan terbaik untuk menemani momen Anda.</p>
		</div>
	</header>

	<!-- Filters -->
	<div class="sticky top-0 z-40 bg-brand-cream/80 py-6 backdrop-blur-md">
		<div class="container mx-auto flex flex-wrap justify-center gap-4 px-6">
			{#each ['All', 'Coffee', 'Dessert', 'Bites'] as cat}
				<button
					onclick={() => (selectedCategory = cat as 'All' | 'Coffee' | 'Dessert' | 'Bites')}
					class="rounded-full px-6 py-2 font-bold transition-all {selectedCategory === cat
						? 'bg-primary text-white shadow-lg'
						: 'bg-white text-brand-dark hover:bg-primary/10'}"
				>
					{cat}
				</button>
			{/each}
		</div>
	</div>

	<!-- Product Grid -->
	<main class="container mx-auto mt-12 px-6">
		<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredProducts as product (product.id)}
				<a
					href="/products/{product.id}"
					class="group flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
					animate:flip={{ duration: 600 }}
					in:fade={{ duration: 400 }}
					out:scale={{ duration: 200, start: 0.95, opacity: 0 }}
				>
					<div
						class="relative aspect-[4/3] overflow-hidden"
						style="view-transition-name: product-image-{getTransitionId(product.id)}"
					>
						<img
							src={product.image}
							alt={product.name}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							loading="lazy"
						/>
						<div
							class="absolute top-6 right-6 rounded-full bg-brand-gold/90 px-4 py-1 text-xs font-bold text-brand-dark shadow-md backdrop-blur-md"
						>
							{product.category}
						</div>
					</div>
					<div class="flex flex-1 flex-col p-8">
						<h3
							class="mb-3 text-3xl tracking-wide text-brand-dark transition-colors group-hover:text-primary"
							style="font-family: var(--font-display); view-transition-name: product-name-{getTransitionId(
								product.id
							)}"
						>
							{product.name}
						</h3>
						<p class="mb-6 flex-1 leading-relaxed text-brand-dark/60">
							{product.description}
						</p>
						<div class="flex items-center justify-between">
							<span class="text-2xl font-bold text-brand-gold">
								Rp {product.price.toLocaleString('id-ID')}
							</span>
							<div
								class="rounded-full bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white"
							>
								<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 4v16m8-8H4"
									/></svg
								>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
