<script lang="ts">
	import { onMount } from 'svelte';

	let headerScrolled = $state(false);
	let offcanvasOpen = $state(false);
	let activeTab = $state('Breakfast');
	let mobileMenuOpen = $state(false);

	const menuTabs = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drink'];

	const menuData: Record<string, { items: { num: string; name: string; desc: string; price: string }[]; img: string }> = {
		Breakfast: {
			items: [
				{ num: '01', name: 'Charcoal Latte Art', desc: 'Activated charcoal, velvet micro-foam, single-origin espresso.', price: 'Rp 55.000' },
				{ num: '02', name: 'Smashed Avo & Miso', desc: 'Organic sourdough, white miso paste, togarashi, micro-greens.', price: 'Rp 85.000' },
				{ num: '03', name: 'The Urban Benedict', desc: 'Smoked brisket, poached hen eggs, truffle hollandaise.', price: 'Rp 105.000' },
			],
			img: 'menu1.png',
		},
		Lunch: {
			items: [
				{ num: '01', name: 'Nasi Goreng Tuna', desc: 'Jasmine rice, fresh tuna, sambal matah, sunny-side egg.', price: 'Rp 75.000' },
				{ num: '02', name: 'Mie Jawa Katsu', desc: 'Hand-pulled noodles, panko chicken cutlet, kecap manis jus.', price: 'Rp 88.000' },
				{ num: '03', name: 'Spaghetti Carbonara', desc: 'Al-dente pasta, guanciale, pecorino, farm egg yolk.', price: 'Rp 95.000' },
			],
			img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop',
		},
		Dinner: {
			items: [
				{ num: '01', name: 'Wagyu Yakiniku Bowl', desc: 'A5 wagyu strips, garlic butter rice, pickled daikon.', price: 'Rp 185.000' },
				{ num: '02', name: 'Grilled Barramundi', desc: 'Line-caught barramundi, miso butter, charred corn relish.', price: 'Rp 145.000' },
				{ num: '03', name: 'Urban Lamb Ribs', desc: 'Slow-braised lamb, tamarind glaze, flatbread, sumac labneh.', price: 'Rp 165.000' },
			],
			img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
		},
		Dessert: {
			items: [
				{ num: '01', name: 'Dark Chocolate Ganache', desc: 'Single-origin dark choc, salted caramel core, cocoa tuile.', price: 'Rp 65.000' },
				{ num: '02', name: 'Klepon Panna Cotta', desc: 'Pandan panna cotta, palm sugar drizzle, toasted coconut.', price: 'Rp 58.000' },
				{ num: '03', name: 'Burnt Basque Cheesecake', desc: 'Creamy basque, berry compote, edible flowers.', price: 'Rp 68.000' },
			],
			img: '/menu6.png',
		},
		Drink: {
			items: [
				{ num: '01', name: 'Cold Brew Tonic', desc: 'Slow-drip cold brew, fever-tree tonic, orange peel.', price: 'Rp 48.000' },
				{ num: '02', name: 'Matcha Lychee Fizz', desc: 'Ceremonial matcha, fresh lychee, sparkling water, mint.', price: 'Rp 52.000' },
				{ num: '03', name: 'Kahii Signature Blend', desc: 'House-roasted espresso, oat milk, dark caramel, sea salt.', price: 'Rp 55.000' },
			],
			img: '/menu3.png',
		},
	};

	$effect(() => {
		// re-trigger for reactivity
		const _ = activeTab;
	});

	const currentMenu = $derived(menuData[activeTab]);


	const top3 = [
		{ name: 'NASI GORENG TUNA', rank: '#1', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500&auto=format&fit=crop', rot: 'translate-y-0' },
		{ name: 'MIE JAWA KATSU', rank: '#2', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500&auto=format&fit=crop', rot: 'translate-y-12' },
		{ name: 'SPAGHETTI CARBONARA', rank: '#3', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500&auto=format&fit=crop', rot: 'translate-y-0' }
	];

	const galleryUrls = [
		'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'
	];

	const faqItems = [
		{ q: 'Do you take reservations for large groups?', a: 'Yes! For groups over 8, please use our dedicated booking form or give us a call at least 48 hours in advance so we can prepare your canvas properly.' },
		{ q: 'Is there a dress code?', a: 'Come as you are. Whether you\'re in a tailored suit or your favorite street gear, you belong here. We only ask for creative energy.' },
		{ q: 'What are your vegan options?', a: 'Over 40% of our menu is vegan or can be made plant-based. From our Miso Avo to our Dark Chocolate Ganache, we ensure no flavor is lost in translation.' }
	];

	let openFaq = $state(-1);

	onMount(() => {
		const onScroll = () => { headerScrolled = window.scrollY > 60; };
		window.addEventListener('scroll', onScroll, { passive: true });

		const observer = new IntersectionObserver(
			(entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
			{ threshold: 0.1 }
		);
		document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

		return () => {
			window.removeEventListener('scroll', onScroll);
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>KAHII | The Urban Canvas</title>
	<meta name="description" content="Where street culture meets the finest roast. More than a cafe it's your curated urban sketchbook." />
	<style>
		.material-symbols-outlined {
			font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
			font-family: 'Material Symbols Outlined';
		}
		.liquid-morphism {
			background: rgba(249,246,245,0.75);
			backdrop-filter: blur(20px) saturate(180%);
			-webkit-backdrop-filter: blur(20px) saturate(180%);
		}
		.bemet-logo-shape {
			clip-path: polygon(0 0, 100% 0, 90% 100%, 50% 90%, 10% 100%);
		}
		@keyframes float-doodle {
			0%   { transform: translateY(0px) rotate(0deg); }
			50%  { transform: translateY(-10px) rotate(2deg); }
			100% { transform: translateY(0px) rotate(0deg); }
		}
		.floating-doodle { animation: float-doodle 4s ease-in-out infinite; }
		@keyframes scroll-strip { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
		.animate-scroll { animation: scroll-strip 40s linear infinite; }
		.reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease, transform 0.7s ease; }
		.reveal.revealed { opacity:1; transform:translateY(0); }
		details summary::-webkit-details-marker { display:none; }
		details[open] .faq-icon { transform: rotate(180deg); }
		.faq-icon { transition: transform 0.3s; }
	</style>
</svelte:head>

<!-- ═══ HEADER ═══════════════════════════════════════ -->
<header class="fixed top-0 w-full z-50 transition-all duration-500">
	{#if !headerScrolled}
		<!-- ── State: TOP — split layout for mobile vs desktop ── -->
		<!-- DESKTOP: logo center + nav below -->
		<div class="hidden sm:flex flex-col items-center pt-4 pb-3">
			<div class="flex items-center gap-2 bg-white px-4 py-2 sm:px-6 sm:py-3 bemet-logo-shape shadow-lg">
				<img src="/kahi-logo.png" alt="Kahii icon" class="h-8 sm:h-10 w-auto" />
				<img src="/kahi-logo-2.png" alt="Kahii" class="h-6 sm:h-8 w-auto" />
			</div>
			<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3 font-['Epilogue'] tracking-tight text-xs sm:text-sm uppercase font-bold text-white px-4">
				<a href="#menu" class="hover:text-[#ba0013] transition-colors">Menu</a>
				<a href="#reservation" class="hover:text-[#ba0013] transition-colors">Reservations</a>
				<a href="#about" class="hover:text-[#ba0013] transition-colors">Our Story</a>
				<span class="opacity-30 text-base">|</span>
				<a href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram Kahii" class="text-white hover:text-[#ba0013] transition-colors flex">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
				</a>
				<a href="https://tr.ee/ipfxhI_Ohr" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Kahii" class="text-white hover:text-[#ba0013] transition-colors flex">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
				</a>
				<span class="opacity-30 text-base">|</span>
				<a href="#gallery" class="hover:text-[#ba0013] transition-colors">Journal</a>
				<a href="#top3" class="hover:text-[#ba0013] transition-colors">Shop</a>
				<a href="#reservation" class="bg-[#ba0013] text-white px-5 py-2 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all active:scale-95">
					Book Now
				</a>
			</div>
		</div>
		<!-- MOBILE: compact top bar dengan logo + hamburger -->
		<div class="sm:hidden flex items-center justify-between px-4 py-3" style="background:rgba(0,0,0,0.4);backdrop-filter:blur(12px);">
			<div class="flex items-center gap-2">
				<img src="/kahi-logo.png" alt="Kahii icon" class="h-7 w-auto" style="filter:brightness(0) invert(1)" />
				<img src="/kahi-logo-2.png" alt="Kahii" class="h-5 w-auto" style="filter:brightness(0) invert(1)" />
			</div>
			<div class="flex items-center gap-3">
				<a href="#reservation" class="bg-[#ba0013] text-white px-3 py-1.5 font-['Permanent_Marker'] uppercase tracking-wider text-xs">Book</a>
				<button onclick={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Toggle menu" class="flex flex-col gap-1.5 p-1">
					<span class="block w-6 h-0.5 bg-white transition-all" class:rotate-45={mobileMenuOpen} class:translate-y-2={mobileMenuOpen}></span>
					<span class="block w-6 h-0.5 bg-white transition-all" class:opacity-0={mobileMenuOpen}></span>
					<span class="block w-6 h-0.5 bg-white transition-all" class:-rotate-45={mobileMenuOpen} class:-translate-y-2={mobileMenuOpen}></span>
				</button>
			</div>
		</div>
		<!-- MOBILE full-screen drawer -->
		{#if mobileMenuOpen}
			<div class="sm:hidden fixed inset-0 z-100 flex flex-col" style="background:#1a1a1a;">
				<!-- Drawer header -->
				<div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
					<div class="flex items-center gap-2">
						<img src="/kahi-logo.png" alt="Kahii" class="h-8 w-auto" style="filter:brightness(0) invert(1)" />
						<img src="/kahi-logo-2.png" alt="Kahii" class="h-6 w-auto" style="filter:brightness(0) invert(1)" />
					</div>
					<button onclick={() => mobileMenuOpen = false} class="text-white" aria-label="Close">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
					</button>
				</div>
				<!-- Nav items -->
				<nav class="flex-1 flex flex-col justify-center px-8 gap-6">
					<a href="#menu" onclick={() => mobileMenuOpen=false} class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl text-white uppercase tracking-tight hover:text-[#ba0013] transition-colors">
						<span class="text-[#ba0013] font-['Epilogue'] text-sm font-black opacity-60">01</span> Menu
					</a>
					<div class="w-full h-px bg-white/10"></div>
					<a href="#reservation" onclick={() => mobileMenuOpen=false} class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl text-white uppercase tracking-tight hover:text-[#ba0013] transition-colors">
						<span class="text-[#ba0013] font-['Epilogue'] text-sm font-black opacity-60">02</span> Reservations
					</a>
					<div class="w-full h-px bg-white/10"></div>
					<a href="#about" onclick={() => mobileMenuOpen=false} class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl text-white uppercase tracking-tight hover:text-[#ba0013] transition-colors">
						<span class="text-[#ba0013] font-['Epilogue'] text-sm font-black opacity-60">03</span> Our Story
					</a>
					<div class="w-full h-px bg-white/10"></div>
					<a href="#gallery" onclick={() => mobileMenuOpen=false} class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl text-white uppercase tracking-tight hover:text-[#ba0013] transition-colors">
						<span class="text-[#ba0013] font-['Epilogue'] text-sm font-black opacity-60">04</span> Journal
					</a>
					<div class="w-full h-px bg-white/10"></div>
					<a href="#top3" onclick={() => mobileMenuOpen=false} class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl text-white uppercase tracking-tight hover:text-[#ba0013] transition-colors">
						<span class="text-[#ba0013] font-['Epilogue'] text-sm font-black opacity-60">05</span> Shop
					</a>
				</nav>
				<!-- Drawer footer -->
				<div class="px-8 py-6 border-t border-white/10">
					<a href="#reservation" onclick={() => mobileMenuOpen=false} class="block w-full text-center bg-[#ba0013] text-white py-4 font-['Permanent_Marker'] text-xl uppercase tracking-widest">
						Book a Table
					</a>
					<div class="flex items-center justify-center gap-6 mt-4">
						<a href="https://www.instagram.com/your.kahii" target="_blank" class="text-white/50 hover:text-[#ba0013] transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
						</a>
						<a href="https://tr.ee/ipfxhI_Ohr" target="_blank" class="text-white/50 hover:text-[#ba0013] transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						</a>
						<p class="font-['Pacifico'] text-white/30 text-sm">EST. 2024</p>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<!-- ── State: SCROLLED (mobile + desktop) ── -->
		<nav class="flex flex-row w-full px-4 sm:px-8 md:px-12 py-0 justify-between items-center h-16 sm:h-20 border-b border-black/5" style="background:rgba(249,246,245,0.95);backdrop-filter:blur(24px) saturate(200%);-webkit-backdrop-filter:blur(24px) saturate(200%);">
			<!-- Left Nav (desktop only) -->
			<div class="hidden md:flex items-center space-x-8 font-['Epilogue'] tracking-tight text-sm uppercase font-bold">
				<a href="#menu" class="text-[#ba0013] border-b-2 border-[#ba0013] pb-1">Menu</a>
				<a href="#reservation" class="text-[#2f2f2e] hover:text-[#ba0013] transition-colors">Reservations</a>
				<a href="#about" class="text-[#2f2f2e] hover:text-[#ba0013] transition-colors">Our Story</a>
			</div>
			<!-- Mobile: Kahii logo kiri -->
			<div class="flex md:hidden items-center gap-2">
				<img src="/kahi-logo.png" alt="Kahii" class="h-7 w-auto" />
				<img src="/kahi-logo-2.png" alt="Kahii" class="h-5 w-auto" />
			</div>
			<!-- Central Logo (desktop) -->
			<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 flex-col items-center">
				<div class="flex items-center gap-2 bg-[#f9f6f5] px-6 py-3 bemet-logo-shape shadow-sm border-x border-b border-black/5">
					<img src="/kahi-logo.png" alt="Kahii icon" class="h-10 w-auto" />
					<img src="/kahi-logo-2.png" alt="Kahii" class="h-8 w-auto" />
				</div>
			</div>
			<!-- Right Nav & Actions -->
			<div class="flex items-center space-x-3 sm:space-x-4">
				<div class="hidden lg:flex items-center space-x-8 font-['Epilogue'] tracking-tight text-sm uppercase font-bold">
					<a href="#gallery" class="text-[#2f2f2e] hover:text-[#ba0013] transition-colors">Journal</a>
					<a href="#top3" class="text-[#2f2f2e] hover:text-[#ba0013] transition-colors">Shop</a>
				</div>
				<div class="flex items-center space-x-3">
					<a href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="text-[#2f2f2e] hover:text-[#ba0013] transition-colors hidden sm:flex">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
					</a>
					<span class="material-symbols-outlined text-[#2f2f2e] hover:text-[#ba0013] transition-colors cursor-pointer select-none hidden sm:block">shopping_bag</span>
					<a href="#reservation" class="bg-[#ba0013] text-white px-3 sm:px-4 py-2 font-['Permanent_Marker'] uppercase tracking-wider text-xs sm:text-xs hover:opacity-90 transition-all active:scale-95">Book</a>
					<!-- Hamburger mobile -->
					<button class="md:hidden flex flex-col gap-1.5 p-1.5 border border-[#2f2f2e]/20" onclick={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Toggle menu">
						<span class="block w-5 h-0.5 bg-[#2f2f2e] transition-all duration-300" class:rotate-45={mobileMenuOpen} class:translate-y-2={mobileMenuOpen}></span>
						<span class="block w-5 h-0.5 bg-[#2f2f2e] transition-all duration-300" class:opacity-0={mobileMenuOpen}></span>
						<span class="block w-5 h-0.5 bg-[#2f2f2e] transition-all duration-300" class:-rotate-45={mobileMenuOpen} class:-translate-y-2={mobileMenuOpen}></span>
					</button>
				</div>
			</div>
		</nav>
		<!-- Mobile full-screen drawer (shared between top & scrolled on mobile) -->
		{#if mobileMenuOpen}
			<div class="md:hidden fixed inset-0 z-200 flex flex-col" style="background:#1a1a1a;">
				<div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
					<div class="flex items-center gap-2">
						<img src="/kahi-logo.png" alt="Kahii" class="h-8 w-auto" style="filter:brightness(0) invert(1)" />
						<img src="/kahi-logo-2.png" alt="Kahii" class="h-6 w-auto" style="filter:brightness(0) invert(1)" />
					</div>
					<button onclick={() => mobileMenuOpen = false} class="text-white p-1" aria-label="Close">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
					</button>
				</div>
				<nav class="flex-1 flex flex-col justify-center px-8 gap-5">
					{#each [['#menu','01','Menu'],['#reservation','02','Reservations'],['#about','03','Our Story'],['#gallery','04','Journal'],['#top3','05','Shop']] as [href, num, label]}
						<a {href} onclick={() => mobileMenuOpen=false} class="flex items-center gap-4 border-b border-white/8 pb-5 font-['Permanent_Marker'] text-3xl text-white uppercase tracking-tight hover:text-[#ba0013] transition-colors">
							<span class="font-['Epilogue'] text-xs font-black text-[#ba0013] opacity-70 w-6">{num}</span>
							{label}
						</a>
					{/each}
				</nav>
				<div class="px-8 py-6 border-t border-white/10">
					<a href="#reservation" onclick={() => mobileMenuOpen=false} class="block w-full text-center bg-[#ba0013] text-white py-4 font-['Permanent_Marker'] text-xl uppercase tracking-widest">Book a Table</a>
					<div class="flex items-center justify-center gap-6 mt-5">
						<a href="https://www.instagram.com/your.kahii" target="_blank" class="text-white/40 hover:text-[#ba0013] transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
						</a>
						<a href="https://tr.ee/ipfxhI_Ohr" target="_blank" class="text-white/40 hover:text-[#ba0013] transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						</a>
						<p class="font-['Pacifico'] text-white/30 text-sm">EST. 2024</p>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</header>

<!-- ═══ HERO ══════════════════════════════════════════ -->
<section class="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black pt-16 sm:pt-20">
	<!-- Background Image -->
	<div class="absolute inset-0 z-0">
		<img src="/hero.png" alt="Kahii Urban Vibe" class="w-full h-full object-cover opacity-70" style="filter:grayscale(0.2)" />
		<!-- Doodle Overlays -->
		<div class="absolute inset-0 z-10 pointer-events-none">
			<svg class="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
				<path d="M100,100 Q150,50 200,100 T300,100" fill="none" stroke="white" stroke-width="3" stroke-dasharray="10 10" stroke-linecap="round" opacity="0.4"></path>
				<circle cx="800" cy="200" r="40" fill="none" stroke="white" stroke-width="2" stroke-dasharray="5 5" opacity="0.4"></circle>
				<path d="M50,900 C200,850 400,950 600,900" fill="none" stroke="white" stroke-width="2" opacity="0.4"></path>
				<path class="floating-doodle" d="M900,400 L910,430 L940,430 L915,450 L925,480 L900,460 L875,480 L885,450 L860,430 L890,430 Z" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"></path>
			</svg>
		</div>
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f9f6f5]/20"></div>
	</div>

	<!-- Content -->
	<div class="relative z-20 text-center px-6 max-w-4xl">
		<div class="inline-block bg-[#ba0013] text-white font-['Permanent_Marker'] text-base sm:text-xl px-3 py-1 mb-4 sm:mb-6" style="transform:rotate(-2deg)">EST. 2024</div>
		<h1 class="font-['Permanent_Marker'] text-white leading-none tracking-tight uppercase mb-6 sm:mb-8 drop-shadow-2xl" style="font-size:clamp(2.5rem,10vw,10rem)">
			<span class="font-['Permanent_Marker']">URBAN</span> <br/><span class="text-[#ba0013] font-['Permanent_Marker']">CANVAS</span>
		</h1>
		<p class="text-white text-base sm:text-xl md:text-2xl font-['Plus_Jakarta_Sans'] max-w-2xl mx-auto mb-8 sm:mb-10 font-medium tracking-wide">
			Where street culture meets the finest roast. More than a cafe it's your curated urban sketchbook.
		</p>
		<div class="flex flex-col md:flex-row items-center justify-center gap-6">
			<a href="/menu" class="bg-[#ba0013] text-white font-['Permanent_Marker'] text-2xl px-10 py-5 hover:bg-[#f9f6f5] hover:text-[#ba0013] transition-all duration-300 shadow-2xl" style="transform:none" onmouseenter={(e)=>e.currentTarget.style.transform='rotate(-1deg)'} onmouseleave={(e)=>e.currentTarget.style.transform='none'}>
				EXPLORE THE MENU
			</a>
			<div class="relative">
				<span class="font-['Pacifico'] text-white text-3xl block" style="transform:rotate(-12deg);display:inline-block">Fresh Brewed!</span>
				<svg class="absolute w-16 h-8 text-white" style="bottom:-24px;left:50%;transform:translateX(-50%)" viewBox="0 0 60 40">
					<path d="M5 5C20 5 40 15 55 35M55 35L45 35M55 35L55 25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
				</svg>
			</div>
		</div>
	</div>

	<!-- Floating Card -->
	<div class="hidden lg:block absolute bottom-12 right-12 z-30" style="transform:rotate(3deg)">
		<div class="bg-[#f9f6f5] p-2 shadow-2xl border border-black/5">
			<img src="cardhero.jpeg" alt="Coffee Cups" class="w-48 object-cover" style="aspect-ratio:3/4;filter:grayscale(0.2)" />
			<p class="font-['Permanent_Marker'] text-[#ba0013] mt-2 text-center uppercase tracking-tighter">Daily Dose</p>
		</div>
	</div>
</section>

<!-- ═══ OUR STORY ══════════════════════════════════════ -->
<section id="about" class="py-16 md:py-24 bg-[#f9f6f5] px-4 sm:px-6 md:px-12 border-b border-[#2f2f2e]/5 overflow-hidden">
	<div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
		<!-- Left Image -->
		<div class="md:col-span-5 relative reveal">
			<div class="relative z-10 border-4 border-[#2f2f2e] p-4 bg-white shadow-xl">
				<img src="/story.png" alt="The Space" class="w-full h-auto transition-all duration-500" style="filter:grayscale(1)" onmouseenter={(e)=>e.currentTarget.style.filter='grayscale(0)'} onmouseleave={(e)=>e.currentTarget.style.filter='grayscale(1)'} />
				<div class="absolute -top-6 -right-6 w-24 h-24 text-[#ba0013]">
					<svg viewBox="0 0 100 100" fill="currentColor">
						<path d="M20,20 Q50,0 80,20 T80,80 T20,80 Z" fill="none" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1"></path>
					</svg>
				</div>
			</div>
			<div class="absolute -bottom-8 -left-8 w-full h-full bg-[#eae7e7] -z-10"></div>
			<div class="hidden md:block absolute font-['Caveat'] text-[#ba0013] rotate-3 z-50" style="font-size:2.8rem;bottom:-1rem;right:-3rem">The Beginning.</div>
		</div>
		<!-- Right Content -->
		<div class="md:col-span-7 space-y-8 reveal">
			<span class="font-['Permanent_Marker'] text-[#ba0013] text-2xl tracking-widest uppercase">The Chapter One</span>
			<h2 class="font-['Permanent_Marker'] text-[#2f2f2e] leading-none uppercase" style="font-size:clamp(3rem,7vw,6rem)">
				<span class="font-['Permanent_Marker']">THE STORY OF</span> <span class="text-[#ba0013] font-['Permanent_Marker'] underline decoration-wavy underline-offset-8">KAHII</span>
			</h2>
			<div class="space-y-6 text-lg text-[#5c5b5b] font-['Plus_Jakarta_Sans']">
				<p>Born from the intersection of concrete jungles and aromatic beans, KAHII isn't just a rest-stop — it's a destination for the thinkers, the doers, and the street-style connoisseurs.</p>
				<p class="font-bold text-[#2f2f2e] italic border-l-4 border-[#ba0013] pl-6">
					"We believe that every cup of coffee is a blank page, and every meal is a stroke of genius. Our space is designed as a living sketchbook where community and creativity collide over the best Sips &amp; Bites in the city."
				</p>
			</div>
			<div class="flex flex-wrap gap-4 pt-4">
				<div class="flex items-center gap-3 px-6 py-3 bg-[#eae7e7]">
					<span class="material-symbols-outlined text-[#ba0013] select-none">edit_note</span>
					<span class="font-['Plus_Jakarta_Sans'] font-bold uppercase text-xs tracking-widest">Artist Residencies</span>
				</div>
				<div class="flex items-center gap-3 px-6 py-3 bg-[#eae7e7]">
					<span class="material-symbols-outlined text-[#ba0013] select-none">coffee</span>
					<span class="font-['Plus_Jakarta_Sans'] font-bold uppercase text-xs tracking-widest">Single Origin</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ TOP 3 FAN FAVORITES ════════════════════════════ -->
<section id="top3" class="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-[#2f2f2e] text-[#f9f6f5] overflow-hidden relative">
	<div class="absolute inset-0 z-0 opacity-40">
		<img src="background.png" alt="Background" class="w-full h-full object-cover" />
	</div>
	<div class="max-w-7xl mx-auto relative z-10">
		<div class="text-center mb-20 space-y-2 reveal">
			<h2 class="font-['Permanent_Marker'] leading-none uppercase drop-shadow-lg" style="font-size:clamp(4rem,10vw,9rem);transform:rotate(-1deg)"><span class="font-['Permanent_Marker']"> TOP 3</span></h2>
			<p class="font-['Permanent_Marker'] text-[#ff766a] uppercase tracking-tighter" style="font-size:clamp(2rem,5vw,4rem);transform:rotate(2deg)">FAVORITE FOODS OF 2025</p>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
			{#each top3 as food, i}
				<div class="relative group" class:md:translate-y-12={i===1}>
					<div class="bg-[#f9f6f5] p-4 shadow-2xl transform transition-transform duration-500" class:group-hover:-rotate-2={i===0} class:group-hover:rotate-1={i===1} class:group-hover:-rotate-1={i===2}>
						<div class="relative aspect-[4/5] overflow-hidden">
							<img src={food.img} alt={food.name} class="w-full h-full object-cover" />
							<div class="absolute inset-0 pointer-events-none p-4">
								<svg class="w-full h-full text-white" viewBox="0 0 100 100">
									<path d="M10 10 L20 20 M10 20 L20 10" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
									<circle cx="85" cy="15" r="5" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
								</svg>
							</div>
						</div>
						<div class="mt-6 flex justify-between items-center px-2">
							<h3 class="font-['Permanent_Marker'] text-3xl text-[#2f2f2e] uppercase tracking-tighter">{food.name}</h3>
							<span class="font-['Pacifico'] text-[#ba0013] text-2xl" style="transform:rotate({i===0?'12':(i===1?'-12':'6')}deg);display:inline-block">{food.rank}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══ SIGNATURE SIPS & BITES ═══════════════════════ -->
<section id="menu" class="py-12 md:py-24 bg-[#f3f0ef] overflow-hidden">
	<div class="px-4 sm:px-6 md:px-12 mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
		<div class="max-w-2xl">
			<span class="font-['Caveat'] text-3xl text-[#ba0013]">Chef's Selection</span>
			<h2 class="font-['Epilogue'] text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mt-2 uppercase text-[#2f2f2e]">SIGNATURE SIPS &amp; BITES</h2>
		</div>
		<div class="flex gap-4 overflow-x-auto pb-4">
			{#each menuTabs as tab}
				<button
					class="whitespace-nowrap px-6 py-2 font-bold uppercase text-xs tracking-widest transition-all font-['Epilogue']"
					class:bg-[#ba0013]={activeTab === tab}
					class:text-white={activeTab === tab}
					class:bg-[#eae7e7]={activeTab !== tab}
					class:text-[#5c5b5b]={activeTab !== tab}
					onclick={() => activeTab = tab}
				>{tab}</button>
			{/each}
		</div>
	</div>
	<div class="px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
		<!-- Menu Items -->
		<div class="space-y-8 sm:space-y-12">
			{#each currentMenu.items as item (item.num + activeTab)}
				<div class="group flex justify-between items-start gap-4 border-b border-[#afadac]/20 pb-6">
					<div class="flex gap-6">
						<div class="font-['Epilogue'] font-black text-4xl text-[#afadac]/30 group-hover:text-[#ba0013]/40 transition-colors">{item.num}</div>
						<div>
							<h3 class="font-['Epilogue'] font-bold text-xl uppercase tracking-tight text-[#2f2f2e]">{item.name}</h3>
							<p class="text-[#5c5b5b] text-sm mt-1 font-['Plus_Jakarta_Sans']">{item.desc}</p>
						</div>
					</div>
					<div class="font-['Permanent_Marker'] text-2xl text-[#ba0013] whitespace-nowrap">{item.price}</div>
				</div>
			{/each}
		</div>
		<!-- Menu Image -->
		<div class="relative">
			<img
				src={currentMenu.img}
				class="w-full aspect-square object-cover shadow-2xl transition-all duration-500"
				style="filter:grayscale(0.1)"
				alt="{activeTab} menu at Kahii"
			/>
			<div class="absolute -top-10 -right-10 w-48 h-48 bg-[#ba0013]/10 rounded-full blur-3xl"></div>
			<svg class="absolute -bottom-8 -left-8 w-24 h-24 text-[#ba0013] floating-doodle" viewBox="0 0 100 100">
				<path d="M50 85 C50 85 10 60 10 35 C10 15 35 10 50 25 C65 10 90 15 90 35 C90 60 50 85 50 85" fill="none" stroke="currentColor" stroke-width="3"></path>
			</svg>
			<!-- Active tab label on image -->
			<div class="absolute top-4 left-4 bg-[#ba0013] text-white px-3 py-1 font-['Permanent_Marker'] text-sm uppercase tracking-widest">{activeTab}</div>
		</div>
	</div>
</section>

<!-- ═══ RESERVATION ════════════════════════════════════ -->
<section id="reservation" class="py-24 px-6 md:px-12 bg-[#f9f6f5] overflow-hidden relative">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<!-- Left: Atmospheric Image -->
			<div class="relative reveal">
				<div class="bg-[#2f2f2e] p-3 shadow-2xl rotate-1 group hover:rotate-0 transition-transform duration-500">
					<img src="about.png" alt="Cozy Kahii Booth" class="w-full h-64 sm:h-80 md:h-[500px] object-cover transition-all duration-500" style="filter:grayscale(0.2)" onmouseenter={(e)=>e.currentTarget.style.filter='grayscale(0)'} onmouseleave={(e)=>e.currentTarget.style.filter='grayscale(0.2)'} />
				</div>
				<div class="absolute -top-10 -left-10 w-32 h-32 text-[#ba0013] opacity-20 pointer-events-none">
					<svg fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="40" stroke-dasharray="4 4"></circle>
					</svg>
				</div>
				<div class="absolute font-['Pacifico'] text-[#ba0013] -rotate-12" style="font-size:2rem;bottom:-1.5rem;right:-1.5rem">Reserved for you.</div>
			</div>
			<!-- Right: Form -->
			<div class="relative reveal">
				<div class="mb-10">
					<h2 class="font-['Permanent_Marker'] text-[#2f2f2e] uppercase leading-none mb-4" style="font-size:clamp(3rem,5vw,4.5rem)">
						<span class="font-['Permanent_Marker']"> SECURE YOUR</span> <br/><span class="text-[#ba0013] font-['Permanent_Marker']">CANVAS TABLE</span>
					</h2>
					<p class="font-['Plus_Jakarta_Sans'] text-[#5c5b5b] text-lg">
						Join the urban collective. Every booking is a commitment to creativity and exceptional flavor.
					</p>
				</div>
				<form class="space-y-6">
					<div class="space-y-2">
						<label class="font-['Permanent_Marker'] text-sm uppercase tracking-widest text-[#2f2f2e]">Full Name</label>
						<input type="text" placeholder="Who's joining us?" class="w-full bg-[#f3f0ef] border-2 border-transparent focus:border-[#ba0013] focus:ring-0 text-[#2f2f2e] p-4 font-['Plus_Jakarta_Sans'] outline-none transition-colors" />
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-2">
							<label class="font-['Permanent_Marker'] text-sm uppercase tracking-widest text-[#2f2f2e]">Guests</label>
							<select class="w-full bg-[#f3f0ef] border-2 border-transparent focus:border-[#ba0013] focus:ring-0 text-[#2f2f2e] p-4 font-['Plus_Jakarta_Sans'] outline-none transition-colors">
								<option>1 Person</option>
								<option>2 People</option>
								<option>3 People</option>
								<option>4 People</option>
								<option>5+ People</option>
							</select>
						</div>
						<div class="space-y-2 relative">
							<label class="font-['Permanent_Marker'] text-sm uppercase tracking-widest text-[#2f2f2e]">Date</label>
							<input type="date" class="w-full bg-[#f3f0ef] border-2 border-transparent focus:border-[#ba0013] focus:ring-0 text-[#2f2f2e] p-4 font-['Plus_Jakarta_Sans'] outline-none transition-colors" />
							<div class="absolute -right-24 top-0 hidden xl:block">
								<span class="font-['Pacifico'] text-[#ba0013] text-xl block" style="transform:rotate(-12deg)">Pick a date!</span>
								<svg class="w-14 h-7 text-[#ba0013] ml-3" style="transform:rotate(-45deg)" viewBox="0 0 60 40">
									<path d="M5 5C20 5 40 15 55 35M55 35L45 35M55 35L55 25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
								</svg>
							</div>
						</div>
					</div>
					<div class="space-y-2">
						<label class="font-['Permanent_Marker'] text-sm uppercase tracking-widest text-[#2f2f2e]">Preferred Time</label>
						<input type="time" class="w-full bg-[#f3f0ef] border-2 border-transparent focus:border-[#ba0013] focus:ring-0 text-[#2f2f2e] p-4 font-['Plus_Jakarta_Sans'] outline-none transition-colors" />
					</div>
					<button type="submit" class="w-full py-6 font-['Permanent_Marker'] text-2xl uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1 shadow-xl" style="background-color:#D91A20">
						CONFIRM TABLE BOOKING
					</button>
				</form>
				<div class="mt-8 flex justify-center opacity-20 pointer-events-none">
					<svg width="200" height="40" viewBox="0 0 200 40" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M10 20 Q50 10 100 20 T190 20" stroke-dasharray="5 5"></path>
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>



<!-- ═══ SUAFOTO DI KAHII (Photobooth) ════════════════ -->
<section class="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#f9f6f5] overflow-hidden relative">
	<!-- Background Doodles -->
	<div class="absolute inset-0 z-0 pointer-events-none opacity-10">
		<svg class="w-full h-full" viewBox="0 0 1000 1000">
			<circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 5"></circle>
			<path d="M800,200 L850,250 M850,200 L800,250" stroke="currentColor" stroke-width="3"></path>
			<path d="M100,800 Q150,750 200,800 T300,800" fill="none" stroke="currentColor" stroke-width="2"></path>
		</svg>
	</div>
	<div class="max-w-7xl mx-auto relative z-10">
		<div class="text-center mb-20">
			<span class="font-['Pacifico'] text-4xl text-[#ba0013] block mb-2" style="transform:rotate(-2deg);display:inline-block">Freeze the Moment</span>
			<h2 class="font-['Permanent_Marker'] text-[#2f2f2e] uppercase leading-none" style="font-size:clamp(3.5rem,8vw,6rem)"><span class="font-['Permanent_Marker']"> SUAFOTO DI KAHII</span> </h2>
			<p class="font-['Plus_Jakarta_Sans'] font-bold text-[#ba0013] tracking-widest uppercase mt-4">Captured at our urban studio</p>
		</div>
		<!-- Collage Layout: Mobile = stacked, Desktop = 4-col grid -->
		<!-- MOBILE layout (hidden on md+) -->
		<div class="md:hidden flex flex-col gap-4">
			<!-- Featured photo (booth2) full width -->
			<div class="relative group">
				<div class="bg-white p-3 shadow-2xl border border-[#afadac]/10 relative overflow-hidden">
					<img src="/booth2.png" alt="Gelora Asmara" class="w-full h-auto" />
					<div class="mt-4 flex justify-between items-center border-t border-dashed border-[#afadac]/20 pt-3">
						<div>
							<p class="font-['Permanent_Marker'] text-[#ba0013] text-base uppercase">GELORA ASMARA</p>
							<p class="font-['Pacifico'] text-[#5c5b5b] text-sm">"Love at first sip"</p>
						</div>
						<span class="font-['Epilogue'] font-black text-[10px] uppercase opacity-40">2026</span>
					</div>
					<div class="absolute top-3 right-3 bg-[#ba0013] text-white px-2 py-0.5 font-['Permanent_Marker'] text-xs rotate-12">FAVE!</div>
				</div>
			</div>
			<!-- 3 photos in a row -->
			<div class="grid grid-cols-3 gap-3">
				<div class="bg-white p-2 shadow-xl border border-[#afadac]/10">
					<img src="/booth4.png" alt="Suafoto 1" class="w-full h-auto object-cover aspect-square" style="filter:grayscale(0.2)" />
					<p class="font-['Permanent_Marker'] text-[#ba0013] text-[9px] uppercase mt-1 truncate">Chapter: Lunar</p>
				</div>
				<div class="bg-white p-2 shadow-xl border border-[#afadac]/10">
					<img src="/booth3.png" alt="Suafoto 3" class="w-full h-auto object-cover aspect-square" style="filter:grayscale(0.4)" />
					<p class="font-['Epilogue'] font-black text-[9px] uppercase opacity-40 mt-1 text-center">KAHII</p>
				</div>
				<div class="bg-white p-2 shadow-xl border border-[#afadac]/10">
					<img src="/booth.jpg" alt="Suafoto 4" class="w-full h-auto object-cover aspect-square" />
					<p class="font-['Permanent_Marker'] text-[#ba0013] text-[9px] uppercase mt-1 truncate">Growing Together</p>
				</div>
			</div>
		</div>
		<!-- DESKTOP layout (hidden on mobile) -->
		<div class="hidden md:grid grid-cols-4 gap-4 items-center">
			<!-- Photo 1 -->
			<div class="relative group transition-transform duration-500 -rotate-3 hover:rotate-0">
				<div class="bg-white p-4 shadow-2xl border border-[#afadac]/10 relative overflow-hidden">
					<img src="/booth4.png" alt="Suafoto 1" class="w-full h-auto transition-all duration-500" style="filter:grayscale(0.2)" onmouseenter={(e)=>e.currentTarget.style.filter='grayscale(0)'} onmouseleave={(e)=>e.currentTarget.style.filter='grayscale(0.2)'} />
					<div class="mt-4 flex justify-between items-center">
						<span class="font-['Permanent_Marker'] text-[#ba0013] text-sm tracking-widest uppercase">Chapter: Lunar</span>
						<span class="font-['Epilogue'] font-black text-xs text-[#2f2f2e] opacity-50">KAHII</span>
					</div>
				</div>
				<svg class="absolute -top-6 -left-6 w-16 h-16 text-[#ba0013] floating-doodle" viewBox="0 0 100 100">
					<path d="M50 20 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z" fill="none" stroke="currentColor" stroke-width="4"></path>
				</svg>
			</div>
			<!-- Photo 2 (Large Center) -->
			<div class="relative group col-span-2 translate-y-8 z-20 rotate-2 hover:rotate-0 transition-transform duration-500">
				<div class="bg-white p-6 shadow-2xl border border-[#afadac]/10 relative overflow-hidden">
					<img src="/booth2.png" alt="Suafoto 2 (featured)" class="w-full h-auto" />
					<div class="mt-6 flex justify-between items-end border-t border-dashed border-[#afadac]/20 pt-4">
						<div>
							<p class="font-['Permanent_Marker'] text-[#ba0013] text-xl uppercase mb-1">GELORA ASMARA</p>
							<p class="font-['Pacifico'] text-[#5c5b5b] text-lg">"Love at first sip"</p>
						</div>
						<span class="font-['Epilogue'] font-black text-[10px] uppercase tracking-tighter opacity-40 mt-2">2026 EDITION</span>
					</div>
					<div class="absolute top-4 right-4 bg-[#ba0013] text-white px-3 py-1 font-['Permanent_Marker'] text-xs rotate-12">FAVE!</div>
				</div>
				<svg class="absolute -bottom-10 -right-8 w-24 h-24 text-[#ba0013] floating-doodle" style="animation-delay:1s" viewBox="0 0 100 100">
					<path d="M50 85 C50 85 10 60 10 35 C10 15 35 10 50 25 C65 10 90 15 90 35 C90 60 50 85 50 85" fill="none" stroke="currentColor" stroke-dasharray="10 5" stroke-width="3"></path>
				</svg>
			</div>
			<!-- Photo 3 & 4 column -->
			<div class="flex flex-col gap-12">
				<div class="relative group -rotate-[5deg] hover:rotate-0 transition-transform duration-500">
					<div class="bg-white p-3 shadow-xl border border-[#afadac]/10">
						<img src="/booth3.png" alt="Suafoto 3" class="w-full h-auto transition-all duration-500" style="filter:grayscale(0.5)" onmouseenter={(e)=>e.currentTarget.style.filter='grayscale(0)'} onmouseleave={(e)=>e.currentTarget.style.filter='grayscale(0.5)'} />
						<div class="mt-3 flex justify-center"><span class="font-['Epilogue'] font-black text-xs uppercase opacity-30 tracking-tighter">KAHII</span></div>
					</div>
					<span class="absolute font-['Pacifico'] text-[#ba0013] text-xl whitespace-nowrap -rotate-6" style="bottom:-1.5rem;left:50%;transform:translateX(-50%) rotate(-6deg)">Captured at Kahii</span>
				</div>
				<div class="relative group rotate-[4deg] hover:rotate-0 transition-transform duration-500">
					<div class="bg-white p-3 shadow-xl border border-[#afadac]/10">
						<img src="/booth.jpg" alt="Suafoto 4" class="w-full h-auto" />
						<div class="mt-3 flex justify-end"><span class="font-['Permanent_Marker'] text-[#ba0013] text-[10px] uppercase">Growing Together</span></div>
					</div>
				</div>
			</div>
		</div>
		<!-- CTA -->
		<div class="mt-24 text-center">
			<a href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" class="inline-block bg-[#2f2f2e] text-[#f9f6f5] px-8 sm:px-12 py-4 sm:py-6 font-['Permanent_Marker'] text-xl sm:text-3xl hover:bg-[#ba0013] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-2xl relative">
				GET YOUR STRIP
				<svg class="absolute -top-4 -right-4 w-12 h-12 text-[#ba0013] rotate-12" viewBox="0 0 100 100">
					<path d="M10 50 L90 50 M50 10 L50 90" stroke="currentColor" stroke-linecap="round" stroke-width="4"></path>
					<path d="M25 25 L75 75 M75 25 L25 75" stroke="currentColor" stroke-linecap="round" stroke-width="4"></path>
				</svg>
			</a>
		</div>
	</div>
</section>



<!-- ═══ GALLERY SCROLL STRIP ═══════════════════════════ -->
<section id="gallery" class="py-12 bg-[#f9f6f5] overflow-hidden">
	<div class="flex flex-nowrap gap-4 animate-scroll whitespace-nowrap">
		{#each galleryUrls as url}
			<img src={url} class="h-[200px] sm:h-[280px] md:h-[400px] w-auto aspect-video object-cover" style="filter:grayscale(0.2)" alt="Gallery" />
		{/each}
	</div>
</section>

<!-- ═══ FAQ ════════════════════════════════════════════ -->
<section class="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#eae7e7]">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="font-['Epilogue'] text-5xl font-black mb-4 uppercase text-[#2f2f2e]"><span class="font-['Permanent_Marker']"> GETTING YOU HUNGRY?</span></h2>
			<p class="font-['Caveat'] text-2xl text-[#ba0013]">Everything you need to know about the Canvas.</p>
		</div>
		<div class="space-y-4">
			{#each faqItems as faq, i}
				<details class="group bg-white p-4 sm:p-6 md:p-8 border border-[#afadac]/10 open:border-[#ba0013] transition-all duration-300 cursor-pointer">
					<summary class="list-none flex justify-between items-center font-['Epilogue'] font-bold text-base sm:text-xl uppercase tracking-tight text-[#2f2f2e]">
						{faq.q}
						<span class="material-symbols-outlined faq-icon select-none text-[#2f2f2e]">expand_more</span>
					</summary>
					<div class="mt-6 text-[#5c5b5b] font-['Plus_Jakarta_Sans'] leading-relaxed">
						{faq.a}
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>


<!-- ═══ FOOTER ══════════════════════════════════════════ -->
<footer class="bg-[#1A1A1A] text-white pt-12 md:pt-20 pb-10 px-4 sm:px-6 md:px-12 font-['Plus_Jakarta_Sans']">
	<div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20">
		<!-- Brand & Social -->
		<div class="md:col-span-4 space-y-8">
			<div class="text-4xl font-black tracking-tighter uppercase font-['Epilogue'] flex items-center ">
			<img src="/kahi-logo.png" alt="kahi" class="h-12 w-auto" style="filter: brightness(0) invert(1);">
				<img src="/kahi-logo-2.png" alt="Kahii" class="h-12 w-auto" style="filter: brightness(0) invert(1);" />
			</div>
			<p class="text-[#e4e2e1]/60 max-w-xs leading-relaxed">
				A multi-sensory experience where urban grit meets high end coffee culture. Join us for the ritual, stay for the art.
			</p>
			<div class="flex space-x-6 items-center">
				<!-- Instagram -->
				<a href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram Kahii" class="text-white hover:text-[#ba0013] transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
					</svg>
				</a>
				<!-- WhatsApp -->
				<a href="https://tr.ee/ipfxhI_Ohr" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Kahii" class="text-white hover:text-[#ba0013] transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
					</svg>
				</a>
				<!-- Email -->
				<a href="mailto:hello@kahii.id" aria-label="Email Kahii" class="material-symbols-outlined text-2xl cursor-pointer hover:text-[#ba0013] transition-colors select-none">alternate_email</a>
			</div>
		</div>
		<!-- Navigation Links -->
		<div class="md:col-span-2 space-y-6">
			<h4 class="font-['Permanent_Marker'] text-xs uppercase tracking-[0.2em] text-[#e4e2e1]/40">Navigation</h4>
			<ul class="space-y-4 text-sm font-medium">
				<li><a href="#menu" class="hover:text-[#ba0013] transition-colors">Our Menu</a></li>
				<li><a href="#reservation" class="hover:text-[#ba0013] transition-colors">Reservations</a></li>
				<li><a href="#about" class="hover:text-[#ba0013] transition-colors">Our Story</a></li>
				<li><a href="#gallery" class="hover:text-[#ba0013] transition-colors">Journal</a></li>
			</ul>
		</div>
		<!-- Legal -->
		<div class="md:col-span-2 space-y-6">
			<h4 class="font-['Permanent_Marker'] text-xs uppercase tracking-[0.2em] text-[#e4e2e1]/40">Legal</h4>
			<ul class="space-y-4 text-sm font-medium text-[#e4e2e1]/60">
				<li><a href="#" class="hover:text-[#ba0013] transition-colors">Privacy</a></li>
				<li><a href="#" class="hover:text-[#ba0013] transition-colors">Terms</a></li>
				<li><a href="#" class="hover:text-[#ba0013] transition-colors">Allergens</a></li>
				<li><a href="#" class="hover:text-[#ba0013] transition-colors">Careers</a></li>
			</ul>
		</div>
		<!-- Join the Club -->
		<div class="md:col-span-4 flex sm:justify-end items-start">
			<div class="bg-[#D91A20] p-8 -rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl max-w-sm w-full">
				<h3 class="font-['Permanent_Marker'] text-3xl mb-4 uppercase tracking-tighter">JOIN THE CLUB</h3>
				<p class="text-sm font-medium mb-6 opacity-90">Get exclusive access to secret menus and gallery openings.</p>
				<div class="flex">
					<input type="email" placeholder="Email" class="bg-white/10 border-none focus:ring-0 text-white placeholder-white/50 flex-grow p-3 text-sm outline-none" />
					<button class="bg-white text-[#D91A20] px-4 flex items-center justify-center hover:bg-[#f9f6f5] transition-colors">
						<span class="material-symbols-outlined select-none">arrow_forward</span>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Bottom -->
	<div class="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-xs font-medium tracking-widest text-[#e4e2e1]/40 uppercase text-center">
		<div>© 2024 KAHII. Crafted for the Urban Canvas with Love and Festivity.</div>
		<div class="font-['Pacifico'] text-2xl lowercase normal-case tracking-normal text-[#e4e2e1]/60">
			Created with Heart <span class="mx-2">•</span> Brewed with Passion
		</div>
	</div>
</footer>
