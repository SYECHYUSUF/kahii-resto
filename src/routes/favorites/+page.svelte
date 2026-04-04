<script lang="ts">
	import { favorites } from '$lib/favorites.svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	// Mapping IDs for transition consistency
	const landingPageMap: Record<string, string> = {
		'kahii-signature-latte': 'signature',
		'kahii-umm-ali': 'umm-ali',
		'croissant-classic': 'bites'
	};

	function getTransitionId(id: string) {
		return landingPageMap[id] || id;
	}

	// State untuk melacak produk mana yang sedang di-shake sebelum dihapus
	let removingId = $state<string | null>(null);

	async function handleRemove(id: string) {
		removingId = id;
		// Tunggu animasi shake selesai (400ms)
		await new Promise((resolve) => setTimeout(resolve, 400));
		favorites.remove(id);
		removingId = null;
	}
</script>

<svelte:head>
	<title>Your Favorites | KAHII</title>
</svelte:head>

<div class="min-h-screen bg-brand-cream pb-24">
	<!-- Header - Aligned with Product List Page -->
	<header class="bg-brand-brown py-16 text-center text-white">
		<div class="container mx-auto px-6">
			<a href="/products" class="mb-8 inline-block text-sm font-bold uppercase tracking-widest hover:text-brand-gold">
				← Back to Menu
			</a>
			<h1 class="text-5xl font-bold">Favorit Anda</h1>
			<p class="mt-4 text-brand-cream/80">Daftar menu pilihan yang paling Anda sukai.</p>
		</div>
	</header>

	<main class="container mx-auto mt-16 px-6">
		{#if favorites.items.length === 0}
			<div class="flex flex-col items-center justify-center py-20 text-center" in:fade>
				<div class="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-brand-brown/10 text-brand-brown">
					<svg class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
				</div>
				<h2 class="mb-4 text-3xl font-bold text-brand-dark">Belum ada favorit</h2>
				<p class="mb-10 text-xl text-brand-dark/60">Jelajahi menu kami dan simpan yang Anda sukai di sini.</p>
				<a href="/products" class="rounded-full bg-primary px-10 py-4 text-lg font-bold text-white shadow-xl transition-transform hover:scale-105">
					Jelajahi Menu
				</a>
			</div>
		{:else}
			<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
				{#each favorites.items as product (product.id)}
					<div 
                        animate:flip={{ duration: 500 }}
                        in:fly={{ y: 20, duration: 500 }}
                        out:fade={{ duration: 300 }}
                        class="group flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl {removingId === product.id ? 'animate-shake-delete' : ''}"
                    >
						<!-- Image Container - Same as Product List -->
						<div 
                            class="relative aspect-[4/3] overflow-hidden"
                            style="view-transition-name: product-image-{getTransitionId(product.id)}"
                        >
							<img 
                                src={product.image} 
                                alt={product.name} 
                                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
							<button 
                                onclick={() => handleRemove(product.id)}
                                class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-all hover:bg-primary hover:text-white active:scale-90"
                                title="Remove from Favorites"
                            >
								<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
							</button>
                            <div class="absolute left-6 top-6 rounded-full bg-brand-gold/90 px-4 py-1 text-xs font-bold text-brand-dark shadow-md backdrop-blur-md">
                                {product.category}
                            </div>
						</div>

						<!-- Content Area - Same p-8 as Product List -->
						<div class="flex flex-1 flex-col p-8">
							<h3 
                                class="mb-3 text-2xl font-bold text-brand-dark group-hover:text-primary transition-colors"
                                style="view-transition-name: product-name-{getTransitionId(product.id)}"
                            >
                                {product.name}
                            </h3>
							<p class="mb-6 flex-1 text-brand-dark/60 leading-relaxed line-clamp-2">
                                {product.description}
                            </p>
                            <div class="flex items-center justify-between mb-8">
                                <span class="text-xl font-bold text-primary">
                                    Rp {product.price.toLocaleString('id-ID')}
                                </span>
                            </div>
							<a 
                                href="/products/{product.id}" 
                                class="block w-full rounded-2xl bg-brand-brown/10 py-4 text-center font-bold text-primary transition-all hover:bg-primary hover:text-white active:scale-95"
                            >
								Lihat Detail
							</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

    @keyframes shake-delete {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(-4px, 0) rotate(-1deg); }
        50% { transform: translate(4px, 0) rotate(1deg); }
        75% { transform: translate(-4px, 0) rotate(-1deg); }
        100% { transform: translate(0, 0) rotate(0deg); opacity: 0; scale: 0.95; }
    }

    .animate-shake-delete {
        animation: shake-delete 0.4s cubic-bezier(.36,.07,.19,.97) both;
        pointer-events: none; /* Cegah klik ganda saat animasi berlangsung */
    }
</style>
