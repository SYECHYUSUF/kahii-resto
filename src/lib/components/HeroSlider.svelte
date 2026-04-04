<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
	import 'swiper/css';

	const slides = [
		{
			bg: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop',
			subtitle: 'Signature',
			title1: 'SIPS &',
			title2: 'BREWS',
			desc: 'Setiap tegukan adalah ritual. Nikmati kopi terbaik kami yang diseduh dengan penuh cinta dan presisi.'
		},
		{
			bg: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop',
			subtitle: 'Best Bites',
			title1: "KAHII'S",
			title2: 'UMM ALI',
			desc: 'Hidangan penutup khas kami yang autentik — manis, hangat, dan selalu bikin ketagihan.'
		},
		{
			bg: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1920&auto=format&fit=crop',
			subtitle: 'Your Cozy Spot',
			title1: 'YOUR DAY',
			title2: 'TO DAY',
			desc: 'Tempat pelarian sempurna Anda — dari fokus bekerja dengan laptop hingga ngobrol santai bersama teman.'
		}
	];

	let swiperEl: HTMLElement;
	let swiper: Swiper;

	onMount(() => {
		swiper = new Swiper(swiperEl, {
			modules: [Navigation, Pagination, Autoplay, EffectFade],
			effect: 'fade',
			loop: true,
			autoplay: { delay: 5000, disableOnInteraction: false },
			pagination: { el: '.hero-pagination', clickable: true },
			navigation: {
				prevEl: '.hero-prev',
				nextEl: '.hero-next'
			}
		});
		return () => swiper?.destroy();
	});
</script>

<section class="hero-section" id="home">
	<div class="swiper" bind:this={swiperEl}>
		<div class="swiper-wrapper">
			{#each slides as slide}
				<div class="swiper-slide hero-slide" style="background-image: url('{slide.bg}')">
					<div class="container mx-auto px-6 lg:px-12" style="max-width:1300px">
						<div class="hero-content max-w-3xl">
							<span class="hero-subtitle">{slide.subtitle}</span>
							<h1 class="hero-title">
								<span>{slide.title1}</span><br />{slide.title2}
							</h1>
							<p class="hero-desc">{slide.desc}</p>
							<div class="flex flex-wrap gap-4">
								<a href="#menu" class="theme-btn">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h6l2 2h10M21 6H3l3 14h12l3-14z"/></svg>
									Jelajahi Menu
								</a>
								<a href="#contact" class="theme-btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.5)">
									Kunjungi Kami
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
								</a>
							</div>
						</div>
					</div>

					<!-- Bottom bar -->
					<div class="hero-bottom-bar">
						<div class="flex items-center gap-2 text-white text-sm">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#c8932a"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
							<span>Area Makassar, Sulawesi Selatan</span>
						</div>
						<div class="flex items-center gap-4">
							<span class="text-white text-sm opacity-70">Follow Us:</span>
							<div class="flex gap-3">
								<a href="https://instagram.com" target="_blank" class="text-white hover:text-brand-gold transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
								</a>
								<a href="https://tiktok.com" target="_blank" class="text-white hover:text-brand-gold transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/></svg>
								</a>
								<a href="https://wa.me/6281234567890" target="_blank" class="text-white hover:text-brand-gold transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Navigation -->
		<div class="hero-nav absolute z-20 bottom-20 right-10 flex gap-3">
			<button class="swiper-btn hero-prev" aria-label="Previous slide">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
			</button>
			<button class="swiper-btn hero-next" aria-label="Next slide">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
			</button>
		</div>

		<!-- Pagination dots -->
		<div class="hero-pagination absolute z-20 left-10 bottom-8 flex gap-2"></div>
	</div>
</section>

<style>
	:global(.hero-pagination .swiper-pagination-bullet) {
		width: 10px; height: 10px; background: rgba(255,255,255,0.4);
		border-radius: 50%; cursor: pointer; transition: all 0.3s ease;
	}
	:global(.hero-pagination .swiper-pagination-bullet-active) {
		background: var(--color-primary); width: 30px; border-radius: 5px;
	}
</style>
