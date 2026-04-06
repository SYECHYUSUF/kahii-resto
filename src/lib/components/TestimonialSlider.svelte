<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation, Autoplay } from 'swiper/modules';
	import 'swiper/css';

	const testimonials = [
		{
			name: 'Andi Pratama',
			role: 'Mahasiswa UH',
			avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format',
			text: 'KAHII adalah tempat favoritku untuk ngerjain tugas. Kopinya enak banget, Wi-Fi kenceng, dan suasananya bikin betah. Umm Ali-nya juga luar biasa!'
		},
		{
			name: 'Siti Rahma',
			role: 'Content Creator',
			avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format',
			text: 'Serius deh, ini coffee shop paling Instagrammable di Makassar. Setiap sudut foto-able, dan yang paling penting — kopinya tidak mengecewakan sama sekali!'
		},
		{
			name: 'Budi Santoso',
			role: 'Software Engineer',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format',
			text: 'Signature Latte-nya jadi andalan saya setiap pagi sebelum WFH. Konsisten rasanya, tidak pernah mengecewakan. Tempat yang sangat recommended!'
		},
		{
			name: 'Nurul Aini',
			role: 'Ibu Rumah Tangga',
			avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format',
			text: 'Selalu bawa anak-anak ke sini di akhir pekan. Mereka suka banget dengan Umm Ali-nya! Staff-nya juga ramah dan cepat. Pasti balik lagi!'
		}
	];

	let swiperEl: HTMLElement;
	let swiper: Swiper;

	onMount(() => {
		swiper = new Swiper(swiperEl, {
			modules: [Navigation, Autoplay],
			slidesPerView: 1,
			spaceBetween: 24,
			loop: true,
			autoplay: { delay: 4000, disableOnInteraction: false },
			navigation: { prevEl: '.testi-prev', nextEl: '.testi-next' },
			breakpoints: {
				768: { slidesPerView: 2 },
				1024: { slidesPerView: 3 }
			}
		});
		return () => swiper?.destroy();
	});
</script>

<section class="section-padding" style="background:#f6edde;" id="testimonials">
	<div class="container mx-auto px-6" style="max-width:1300px">
		<!-- Header -->
		<div class="scroll-reveal mb-12 text-center">
			<div class="sub-title-badge justify-center">
				<span></span>
				TESTIMONIALS
				<span></span>
			</div>
			<h2 class="text-4xl font-bold" style="color:#1a1010">Apa Kata Pelanggan Kami</h2>
		</div>

		<!-- Slider -->
		<div class="relative">
			<div class="swiper overflow-visible" bind:this={swiperEl}>
				<div class="swiper-wrapper">
					{#each testimonials as t}
						<div class="swiper-slide">
							<div class="testi-card">
								<div class="testi-stars">
									{#each Array(5) as _}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											viewBox="0 0 24 24"
											><path
												d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
											/></svg
										>
									{/each}
								</div>
								<p style="color:#555; line-height:1.8; margin-bottom:20px; font-size:0.95rem">
									{t.text}
								</p>
								<div
									class="flex items-center gap-4"
									style="border-top:1px solid #f0e8da; padding-top:16px"
								>
									<img src={t.avatar} alt={t.name} class="testi-avatar h-14 w-14" />
									<div>
										<h5
											style="font-family: var(--font-serif); font-weight:700; color:#1a1010; font-size:1rem"
										>
											{t.name}
										</h5>
										<p style="color:#a21b2b; font-size:0.8rem; font-weight:600">{t.role}</p>
									</div>
									<div class="testi-quote-icon ml-auto">"</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Buttons -->
			<div class="mt-10 flex justify-center gap-4">
				<button class="swiper-btn testi-prev" aria-label="Previous">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg
					>
				</button>
				<button class="swiper-btn testi-next" aria-label="Next">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg
					>
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	.swiper-btn {
		border-color: #a21b2b;
		color: #a21b2b;
		background: transparent;
	}
	.swiper-btn:hover {
		background: #a21b2b;
		color: #fff;
		border-color: #a21b2b;
	}
</style>
