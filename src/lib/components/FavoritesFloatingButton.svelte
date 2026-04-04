<script lang="ts">
	import { favorites } from '$lib/favorites.svelte';
	import { fly, scale } from 'svelte/transition';
    import { page } from '$app/state';

    // Show only on product list and detail pages
    const showButton = $derived(
        page.url.pathname.startsWith('/products')
    );
</script>

{#if showButton}
<div class="fixed bottom-8 right-8 z-[100]" in:fly={{ y: 50 }} out:fly={{ y: 50 }}>
	<a
		href="/favorites"
		id="floating-fav-button"
		class="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 {favorites.isShaking ? 'animate-bounce' : ''}"
	>
		<svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
		</svg>
		
		{#if favorites.items.length > 0}
			<div 
                in:scale
                class="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-dark shadow-md"
            >
				{favorites.items.length}
			</div>
		{/if}
	</a>
</div>
{/if}

<style>
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-5px) rotate(-5deg); }
		50% { transform: translateX(5px) rotate(5deg); }
		75% { transform: translateX(-5px) rotate(-5deg); }
	}
	
	.animate-bounce {
		animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
	}
</style>
