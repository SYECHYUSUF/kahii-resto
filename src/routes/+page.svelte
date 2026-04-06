<script lang="ts">
	import { onMount } from 'svelte';

	let headerScrolled = $state(false);
	let offcanvasOpen = $state(false);
	let activeTab = $state('Breakfast');
	let mobileMenuOpen = $state(false);

	const menuTabs = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drink'];

	const menuData: Record<
		string,
		{ items: { num: string; name: string; desc: string; price: string }[]; img: string }
	> = {
		Breakfast: {
			items: [
				{
					num: '01',
					name: 'Charcoal Latte Art',
					desc: 'Activated charcoal, velvet micro-foam, single-origin espresso.',
					price: 'Rp 55.000'
				},
				{
					num: '02',
					name: 'Smashed Avo & Miso',
					desc: 'Organic sourdough, white miso paste, togarashi, micro-greens.',
					price: 'Rp 85.000'
				},
				{
					num: '03',
					name: 'The Urban Benedict',
					desc: 'Smoked brisket, poached hen eggs, truffle hollandaise.',
					price: 'Rp 105.000'
				}
			],
			img: 'menu1.png'
		},
		Lunch: {
			items: [
				{
					num: '01',
					name: 'Nasi Goreng Tuna',
					desc: 'Jasmine rice, fresh tuna, sambal matah, sunny-side egg.',
					price: 'Rp 75.000'
				},
				{
					num: '02',
					name: 'Mie Jawa Katsu',
					desc: 'Hand-pulled noodles, panko chicken cutlet, kecap manis jus.',
					price: 'Rp 88.000'
				},
				{
					num: '03',
					name: 'Spaghetti Carbonara',
					desc: 'Al-dente pasta, guanciale, pecorino, farm egg yolk.',
					price: 'Rp 95.000'
				}
			],
			img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop'
		},
		Dinner: {
			items: [
				{
					num: '01',
					name: 'Wagyu Yakiniku Bowl',
					desc: 'A5 wagyu strips, garlic butter rice, pickled daikon.',
					price: 'Rp 185.000'
				},
				{
					num: '02',
					name: 'Grilled Barramundi',
					desc: 'Line-caught barramundi, miso butter, charred corn relish.',
					price: 'Rp 145.000'
				},
				{
					num: '03',
					name: 'Urban Lamb Ribs',
					desc: 'Slow-braised lamb, tamarind glaze, flatbread, sumac labneh.',
					price: 'Rp 165.000'
				}
			],
			img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop'
		},
		Dessert: {
			items: [
				{
					num: '01',
					name: 'Dark Chocolate Ganache',
					desc: 'Single-origin dark choc, salted caramel core, cocoa tuile.',
					price: 'Rp 65.000'
				},
				{
					num: '02',
					name: 'Klepon Panna Cotta',
					desc: 'Pandan panna cotta, palm sugar drizzle, toasted coconut.',
					price: 'Rp 58.000'
				},
				{
					num: '03',
					name: 'Burnt Basque Cheesecake',
					desc: 'Creamy basque, berry compote, edible flowers.',
					price: 'Rp 68.000'
				}
			],
			img: '/menu6.png'
		},
		Drink: {
			items: [
				{
					num: '01',
					name: 'Cold Brew Tonic',
					desc: 'Slow-drip cold brew, fever-tree tonic, orange peel.',
					price: 'Rp 48.000'
				},
				{
					num: '02',
					name: 'Matcha Lychee Fizz',
					desc: 'Ceremonial matcha, fresh lychee, sparkling water, mint.',
					price: 'Rp 52.000'
				},
				{
					num: '03',
					name: 'Kahii Signature Blend',
					desc: 'House-roasted espresso, oat milk, dark caramel, sea salt.',
					price: 'Rp 55.000'
				}
			],
			img: '/menu3.png'
		}
	};

	$effect(() => {
		// re-trigger for reactivity
		const _ = activeTab;
	});

	const currentMenu = $derived(menuData[activeTab]);

	const top3 = [
		{
			name: 'NASI GORENG TUNA',
			rank: '#1',
			img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500&auto=format&fit=crop',
			rot: 'translate-y-0'
		},
		{
			name: 'MIE JAWA KATSU',
			rank: '#2',
			img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500&auto=format&fit=crop',
			rot: 'translate-y-12'
		},
		{
			name: 'SPAGHETTI CARBONARA',
			rank: '#3',
			img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500&auto=format&fit=crop',
			rot: 'translate-y-0'
		}
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
		{
			q: 'Do you take reservations for large groups?',
			a: 'Yes! For groups over 8, please use our dedicated booking form or give us a call at least 48 hours in advance so we can prepare your canvas properly.'
		},
		{
			q: 'Is there a dress code?',
			a: "Come as you are. Whether you're in a tailored suit or your favorite street gear, you belong here. We only ask for creative energy."
		},
		{
			q: 'What are your vegan options?',
			a: 'Over 40% of our menu is vegan or can be made plant-based. From our Miso Avo to our Dark Chocolate Ganache, we ensure no flavor is lost in translation.'
		}
	];

	let openFaq = $state(-1);

	onMount(() => {
		const onScroll = () => {
			headerScrolled = window.scrollY > 60;
		};
		window.addEventListener('scroll', onScroll, { passive: true });

		const observer = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) e.target.classList.add('revealed');
				}),
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
	<meta
		name="description"
		content="Where street culture meets the finest roast. More than a cafe it's your curated urban sketchbook."
	/>
	<style>
		.material-symbols-outlined {
			font-variation-settings:
				'FILL' 0,
				'wght' 400,
				'GRAD' 0,
				'opsz' 24;
			font-family: 'Material Symbols Outlined';
		}
		.liquid-morphism {
			background: rgba(249, 246, 245, 0.75);
			backdrop-filter: blur(20px) saturate(180%);
			-webkit-backdrop-filter: blur(20px) saturate(180%);
		}
		.bemet-logo-shape {
			clip-path: polygon(0 0, 100% 0, 90% 100%, 50% 90%, 10% 100%);
		}
		@keyframes float-doodle {
			0% {
				transform: translateY(0px) rotate(0deg);
			}
			50% {
				transform: translateY(-10px) rotate(2deg);
			}
			100% {
				transform: translateY(0px) rotate(0deg);
			}
		}
		.floating-doodle {
			animation: float-doodle 4s ease-in-out infinite;
		}
		@keyframes scroll-strip {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(-50%);
			}
		}
		.animate-scroll {
			animation: scroll-strip 40s linear infinite;
		}
		.reveal {
			opacity: 0;
			transform: translateY(28px);
			transition:
				opacity 0.7s ease,
				transform 0.7s ease;
		}
		.reveal.revealed {
			opacity: 1;
			transform: translateY(0);
		}
		details summary::-webkit-details-marker {
			display: none;
		}
		details[open] .faq-icon {
			transform: rotate(180deg);
		}
		.faq-icon {
			transition: transform 0.3s;
		}
		.no-scrollbar::-webkit-scrollbar {
			display: none;
		}
		.no-scrollbar {
			-ms-overflow-style: none;
			scrollbar-width: none;
		}
	</style>
</svelte:head>

<!-- ═══ HEADER ═══════════════════════════════════════ -->
<header class="fixed top-0 z-50 w-full transition-all duration-500">
	{#if !headerScrolled}
		<!-- ── State: TOP — split layout for mobile vs desktop ── -->
		<!-- DESKTOP: logo center + nav below -->
		<div class="hidden flex-col items-center gap-y-4 pt-4 pb-3 sm:flex">
			<div
				class="bemet-logo-shape flex items-center gap-2 bg-white px-4 py-2 shadow-lg sm:px-6 sm:py-3"
			>
				<img src="/kahi-logo.png" alt="Kahii icon" class="h-8 w-auto sm:h-10" />
				<img src="/kahi-logo-2.png" alt="Kahii" class="h-6 w-auto sm:h-8" />
			</div>
			<div
				class="mt-3 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 font-['Epilogue'] text-xs font-bold tracking-tight text-white uppercase sm:text-sm"
			>
				<a href="#menu" class="transition-colors hover:text-[#ba0013]">Menu</a>
				<a href="#reservation" class="transition-colors hover:text-[#ba0013]">Reservations</a>
				<a href="#about" class="transition-colors hover:text-[#ba0013]">Our Story</a>
				<span class="text-base opacity-30">|</span>
				<a
					href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Instagram Kahii"
					class="flex text-white transition-colors hover:text-[#ba0013]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="currentColor"
						><path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
						/></svg
					>
				</a>
				<a
					href="https://tr.ee/ipfxhI_Ohr"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="WhatsApp Kahii"
					class="flex text-white transition-colors hover:text-[#ba0013]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="currentColor"
						><path
							d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
						/></svg
					>
				</a>
				<span class="text-base opacity-30">|</span>
				<a href="#gallery" class="transition-colors hover:text-[#ba0013]">Journal</a>
				<a href="#top3" class="transition-colors hover:text-[#ba0013]">Shop</a>
				<a
					href="#reservation"
					class="bg-[#ba0013] px-5 py-2 text-xs font-bold tracking-widest text-white uppercase transition-all hover:opacity-90 active:scale-95"
				>
					Book Now
				</a>
			</div>
		</div>
		<!-- MOBILE: compact top bar dengan logo + hamburger -->
		<div
			class="flex items-center justify-between px-4 py-3 sm:hidden"
			style="background:rgba(0,0,0,0.4);backdrop-filter:blur(12px);"
		>
			<div class="flex items-center gap-2">
				<img
					src="/kahi-logo.png"
					alt="Kahii icon"
					class="h-7 w-auto"
					style="filter:brightness(0) invert(1)"
				/>
				<img
					src="/kahi-logo-2.png"
					alt="Kahii"
					class="h-5 w-auto"
					style="filter:brightness(0) invert(1)"
				/>
			</div>
			<div class="flex items-center gap-3">
				<a
					href="#reservation"
					class="bg-[#ba0013] px-3 py-1.5 font-['Permanent_Marker'] text-xs tracking-wider text-white uppercase"
					>Book</a
				>
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					aria-label="Toggle menu"
					class="flex flex-col gap-1.5 p-1"
				>
					<span
						class="block h-0.5 w-6 bg-white transition-all"
						class:rotate-45={mobileMenuOpen}
						class:translate-y-2={mobileMenuOpen}
					></span>
					<span class="block h-0.5 w-6 bg-white transition-all" class:opacity-0={mobileMenuOpen}
					></span>
					<span
						class="block h-0.5 w-6 bg-white transition-all"
						class:-rotate-45={mobileMenuOpen}
						class:-translate-y-2={mobileMenuOpen}
					></span>
				</button>
			</div>
		</div>
		<!-- MOBILE full-screen drawer -->
		{#if mobileMenuOpen}
			<div class="fixed inset-0 z-100 flex flex-col sm:hidden" style="background:#1a1a1a;">
				<!-- Drawer header -->
				<div class="flex items-center justify-between border-b border-white/10 px-6 py-5">
					<div class="flex items-center gap-2">
						<img
							src="/kahi-logo.png"
							alt="Kahii"
							class="h-8 w-auto"
							style="filter:brightness(0) invert(1)"
						/>
						<img
							src="/kahi-logo-2.png"
							alt="Kahii"
							class="h-6 w-auto"
							style="filter:brightness(0) invert(1)"
						/>
					</div>
					<button onclick={() => (mobileMenuOpen = false)} class="text-white" aria-label="Close">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
						>
					</button>
				</div>
				<!-- Nav items -->
				<nav class="flex flex-1 flex-col justify-center gap-6 px-8">
					<a
						href="#menu"
						onclick={() => (mobileMenuOpen = false)}
						class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl tracking-tight text-white uppercase transition-colors hover:text-[#ba0013]"
					>
						<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] opacity-60">01</span> Menu
					</a>
					<div class="h-px w-full bg-white/10"></div>
					<a
						href="#reservation"
						onclick={() => (mobileMenuOpen = false)}
						class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl tracking-tight text-white uppercase transition-colors hover:text-[#ba0013]"
					>
						<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] opacity-60">02</span> Reservations
					</a>
					<div class="h-px w-full bg-white/10"></div>
					<a
						href="#about"
						onclick={() => (mobileMenuOpen = false)}
						class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl tracking-tight text-white uppercase transition-colors hover:text-[#ba0013]"
					>
						<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] opacity-60">03</span> Our
						Story
					</a>
					<div class="h-px w-full bg-white/10"></div>
					<a
						href="#gallery"
						onclick={() => (mobileMenuOpen = false)}
						class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl tracking-tight text-white uppercase transition-colors hover:text-[#ba0013]"
					>
						<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] opacity-60">04</span> Journal
					</a>
					<div class="h-px w-full bg-white/10"></div>
					<a
						href="#top3"
						onclick={() => (mobileMenuOpen = false)}
						class="group flex items-center gap-4 font-['Permanent_Marker'] text-3xl tracking-tight text-white uppercase transition-colors hover:text-[#ba0013]"
					>
						<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] opacity-60">05</span> Shop
					</a>
				</nav>
				<!-- Drawer footer -->
				<div class="border-t border-white/10 px-8 py-6">
					<a
						href="#reservation"
						onclick={() => (mobileMenuOpen = false)}
						class="block w-full bg-[#ba0013] py-4 text-center font-['Permanent_Marker'] text-xl tracking-widest text-white uppercase"
					>
						Book a Table
					</a>
					<div class="mt-4 flex items-center justify-center gap-6">
						<a
							href="https://www.instagram.com/your.kahii"
							target="_blank"
							class="text-white/50 transition-colors hover:text-[#ba0013]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
								/></svg
							>
						</a>
						<a
							href="https://tr.ee/ipfxhI_Ohr"
							target="_blank"
							class="text-white/50 transition-colors hover:text-[#ba0013]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
								/></svg
							>
						</a>
						<p class="font-['Pacifico'] text-sm text-white/30">EST. 2024</p>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<!-- ── State: SCROLLED (mobile + desktop) ── -->
		<nav
			class="flex h-16 w-full flex-row items-center justify-between px-4 py-0 shadow-md sm:h-20 sm:px-8 md:px-12"
			style="background:#ba0013;backdrop-filter:blur(24px) saturate(200%);-webkit-backdrop-filter:blur(24px) saturate(200%);"
		>
			<!-- Left Nav (desktop only) -->
			<div
				class="hidden items-center space-x-8 font-['Epilogue'] text-sm font-bold tracking-tight uppercase md:flex"
			>
				<a href="#menu" class="rounded-full bg-white px-3 py-1 text-[#ba0013] shadow-sm">Menu</a>
				<a href="#reservation" class="text-white transition-colors hover:text-white/80"
					>Reservations</a
				>
				<a href="#about" class="text-white transition-colors hover:text-white/80">Our Story</a>
			</div>
			<!-- Mobile: Kahii logo kiri -->
			<div class="flex items-center gap-2 md:hidden">
				<img
					src="/kahi-logo.png"
					alt="Kahii"
					class="h-7 w-auto"
					style="filter:brightness(0) invert(1)"
				/>
				<img
					src="/kahi-logo-2.png"
					alt="Kahii"
					class="h-5 w-auto"
					style="filter:brightness(0) invert(1)"
				/>
			</div>
			<!-- Central Logo (desktop) -->
			<div class="absolute top-0 left-1/2 hidden -translate-x-1/2 flex-col items-center md:flex">
				<div
					class="bemet-logo-shape flex items-center gap-2 border-x border-b border-black/5 bg-white px-6 pt-3 pb-10 shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
					style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));"
				>
					<img src="/kahi-logo.png" alt="Kahii icon" class="h-10 w-auto" />
					<img src="/kahi-logo-2.png" alt="Kahii" class="h-8 w-auto" />
				</div>
			</div>
			<!-- Right Nav & Actions -->
			<div class="flex items-center space-x-3 sm:space-x-4">
				<div
					class="hidden items-center space-x-8 font-['Epilogue'] text-sm font-bold tracking-tight uppercase lg:flex"
				>
					<a href="#gallery" class="text-white transition-colors hover:text-white/80">Journal</a>
					<a href="#top3" class="text-white transition-colors hover:text-white/80">Shop</a>
				</div>
				<div class="flex items-center space-x-3">
					<a
						href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						class="hidden text-white transition-colors hover:text-white/80 sm:flex"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
							/></svg
						>
					</a>
					<span
						class="material-symbols-outlined hidden cursor-pointer text-white transition-colors select-none hover:text-white/80 sm:block"
						>shopping_bag</span
					>
					<a
						href="#reservation"
						class="rounded-full bg-white px-3 py-2 font-['Permanent_Marker'] text-xs tracking-wider text-[#ba0013] uppercase shadow-md transition-all hover:opacity-90 active:scale-95 sm:px-4 sm:text-xs"
						>Book</a
					>
					<!-- Hamburger mobile -->
					<button
						class="flex flex-col gap-1.5 p-1.5 md:hidden"
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
						aria-label="Toggle menu"
					>
						<span
							class="block h-0.5 w-5 bg-white transition-all duration-300"
							class:rotate-45={mobileMenuOpen}
							class:translate-y-2={mobileMenuOpen}
						></span>
						<span
							class="block h-0.5 w-5 bg-white transition-all duration-300"
							class:opacity-0={mobileMenuOpen}
						></span>
						<span
							class="block h-0.5 w-5 bg-white transition-all duration-300"
							class:-rotate-45={mobileMenuOpen}
							class:-translate-y-2={mobileMenuOpen}
						></span>
					</button>
				</div>
			</div>
		</nav>
		<!-- Mobile full-screen drawer (shared between top & scrolled on mobile) -->
		{#if mobileMenuOpen}
			<div class="fixed inset-0 z-200 flex flex-col md:hidden" style="background:#1a1a1a;">
				<div class="flex items-center justify-between border-b border-white/10 px-6 py-5">
					<div class="flex items-center gap-2">
						<img
							src="/kahi-logo.png"
							alt="Kahii"
							class="h-8 w-auto"
							style="filter:brightness(0) invert(1)"
						/>
						<img
							src="/kahi-logo-2.png"
							alt="Kahii"
							class="h-6 w-auto"
							style="filter:brightness(0) invert(1)"
						/>
					</div>
					<button
						onclick={() => (mobileMenuOpen = false)}
						class="p-1 text-white"
						aria-label="Close"
					>
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
						>
					</button>
				</div>
				<nav class="flex flex-1 flex-col justify-center gap-5 px-8">
					{#each [['#menu', '01', 'Menu'], ['#reservation', '02', 'Reservations'], ['#about', '03', 'Our Story'], ['#gallery', '04', 'Journal'], ['#top3', '05', 'Shop']] as [href, num, label]}
						<a
							{href}
							onclick={() => (mobileMenuOpen = false)}
							class="flex items-center gap-4 border-b border-white/8 pb-5 font-['Permanent_Marker'] text-3xl tracking-tight text-white uppercase transition-colors hover:text-[#ba0013]"
						>
							<span class="w-6 font-['Epilogue'] text-xs font-black text-[#ba0013] opacity-70"
								>{num}</span
							>
							{label}
						</a>
					{/each}
				</nav>
				<div class="border-t border-white/10 px-8 py-6">
					<a
						href="#reservation"
						onclick={() => (mobileMenuOpen = false)}
						class="block w-full bg-[#ba0013] py-4 text-center font-['Permanent_Marker'] text-xl tracking-widest text-white uppercase"
						>Book a Table</a
					>
					<div class="mt-5 flex items-center justify-center gap-6">
						<a
							href="https://www.instagram.com/your.kahii"
							target="_blank"
							class="text-white/40 transition-colors hover:text-[#ba0013]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
								/></svg
							>
						</a>
						<a
							href="https://tr.ee/ipfxhI_Ohr"
							target="_blank"
							class="text-white/40 transition-colors hover:text-[#ba0013]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
								/></svg
							>
						</a>
						<p class="font-['Pacifico'] text-sm text-white/30">EST. 2024</p>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</header>

<!-- ═══ HERO ══════════════════════════════════════════ -->
<section
	class="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden bg-black pt-16 sm:pt-20"
>
	<!-- Background Image -->
	<div class="absolute inset-0 z-0">
		<img
			src="/hero.png"
			alt="Kahii Urban Vibe"
			class="h-full w-full object-cover opacity-70"
			style="filter:grayscale(0.2)"
		/>
		<!-- Doodle Overlays -->
		<div class="pointer-events-none absolute inset-0 z-10">
			<svg class="h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
				<path
					d="M100,100 Q150,50 200,100 T300,100"
					fill="none"
					stroke="white"
					stroke-width="3"
					stroke-dasharray="10 10"
					stroke-linecap="round"
					opacity="0.4"
				></path>
				<circle
					cx="800"
					cy="200"
					r="40"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-dasharray="5 5"
					opacity="0.4"
				></circle>
				<path
					d="M50,900 C200,850 400,950 600,900"
					fill="none"
					stroke="white"
					stroke-width="2"
					opacity="0.4"
				></path>
				<path
					class="floating-doodle"
					d="M900,400 L910,430 L940,430 L915,450 L925,480 L900,460 L875,480 L885,450 L860,430 L890,430 Z"
					fill="none"
					stroke="white"
					stroke-width="1.5"
					opacity="0.3"
				></path>
			</svg>
		</div>
		<div
			class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f9f6f5]/20"
		></div>
	</div>

	<!-- Content -->
	<div class="relative z-20 max-w-4xl px-6 text-center">
		<div
			class="mb-4 inline-block bg-[#ba0013] px-3 py-1 font-['Permanent_Marker'] text-base text-white sm:mb-6 sm:text-xl"
			style="transform:rotate(-2deg)"
		>
			EST. 2024
		</div>
		<h1
			class="mb-6 font-['Permanent_Marker'] leading-none tracking-tight text-white uppercase drop-shadow-2xl sm:mb-8"
			style="font-size:clamp(2.5rem,10vw,10rem)"
		>
			<span class="font-['Permanent_Marker']">URBAN</span> <br /><span
				class="font-['Permanent_Marker'] text-[#ba0013]">CANVAS</span
			>
		</h1>
		<p
			class="mx-auto mb-8 max-w-2xl font-['Plus_Jakarta_Sans'] text-base font-medium tracking-wide text-white sm:mb-10 sm:text-xl md:text-2xl"
		>
			Where street culture meets the finest roast. More than a cafe it's your curated urban
			sketchbook.
		</p>
		<div class="flex flex-col items-center justify-center gap-6 md:flex-row">
			<a
				href="/menu"
				class="bg-[#ba0013] px-10 py-5 font-['Permanent_Marker'] text-2xl text-white shadow-2xl transition-all duration-300 hover:bg-[#f9f6f5] hover:text-[#ba0013]"
				style="transform:none"
				onmouseenter={(e) => (e.currentTarget.style.transform = 'rotate(-1deg)')}
				onmouseleave={(e) => (e.currentTarget.style.transform = 'none')}
			>
				EXPLORE THE MENU
			</a>
			<div class="relative">
				<span
					class="block font-['Pacifico'] text-3xl text-white"
					style="transform:rotate(-12deg);display:inline-block">Fresh Brewed!</span
				>
				<svg
					class="absolute h-8 w-16 text-white"
					style="bottom:-24px;left:50%;transform:translateX(-50%)"
					viewBox="0 0 60 40"
				>
					<path
						d="M5 5C20 5 40 15 55 35M55 35L45 35M55 35L55 25"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					></path>
				</svg>
			</div>
		</div>
	</div>

	<!-- Floating Card -->
	<div class="absolute right-12 bottom-12 z-30 hidden lg:block" style="transform:rotate(3deg)">
		<div class="border border-black/5 bg-[#f9f6f5] p-2 shadow-2xl">
			<img
				src="cardhero.jpeg"
				alt="Coffee Cups"
				class="w-48 object-cover"
				style="aspect-ratio:3/4;filter:grayscale(0.2)"
			/>
			<p
				class="mt-2 text-center font-['Permanent_Marker'] tracking-tighter text-[#ba0013] uppercase"
			>
				Daily Dose
			</p>
		</div>
	</div>
</section>

<!-- ═══ OUR STORY ══════════════════════════════════════ -->
<section
	id="about"
	class="overflow-hidden border-b border-[#2f2f2e]/5 bg-[#f9f6f5] px-4 py-16 sm:px-6 md:px-12 md:py-24"
>
	<div
		class="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-16"
	>
		<!-- Left Image -->
		<div class="reveal relative md:col-span-5">
			<div class="relative z-10 border-4 border-[#2f2f2e] bg-white p-4 shadow-xl">
				<img
					src="/story.png"
					alt="The Space"
					class="h-auto w-full transition-all duration-500"
					style="filter:grayscale(1)"
					onmouseenter={(e) => (e.currentTarget.style.filter = 'grayscale(0)')}
					onmouseleave={(e) => (e.currentTarget.style.filter = 'grayscale(1)')}
				/>
				<div class="absolute -top-6 -right-6 h-24 w-24 text-[#ba0013]">
					<svg viewBox="0 0 100 100" fill="currentColor">
						<path
							d="M20,20 Q50,0 80,20 T80,80 T20,80 Z"
							fill="none"
							stroke="currentColor"
							stroke-dasharray="2 2"
							stroke-width="1"
						></path>
					</svg>
				</div>
			</div>
			<div class="absolute -bottom-8 -left-8 -z-10 h-full w-full bg-[#eae7e7]"></div>
			<div
				class="absolute z-50 hidden rotate-3 font-['Caveat'] text-[#ba0013] md:block"
				style="font-size:2.8rem;bottom:-1rem;right:-3rem"
			>
				The Beginning.
			</div>
		</div>
		<!-- Right Content -->
		<div class="reveal space-y-8 md:col-span-7">
			<span class="font-['Permanent_Marker'] text-2xl tracking-widest text-[#ba0013] uppercase"
				>The Chapter One</span
			>
			<h2
				class="font-['Permanent_Marker'] leading-none text-[#2f2f2e] uppercase"
				style="font-size:clamp(3rem,7vw,6rem)"
			>
				<span class="font-['Permanent_Marker']">THE STORY OF</span>
				<span
					class="font-['Permanent_Marker'] text-[#ba0013] underline decoration-wavy underline-offset-8"
					>KAHII</span
				>
			</h2>
			<div class="space-y-6 font-['Plus_Jakarta_Sans'] text-lg text-[#5c5b5b]">
				<p>
					Born from the intersection of concrete jungles and aromatic beans, KAHII isn't just a
					rest-stop — it's a destination for the thinkers, the doers, and the street-style
					connoisseurs.
				</p>
				<p class="border-l-4 border-[#ba0013] pl-6 font-bold text-[#2f2f2e] italic">
					"We believe that every cup of coffee is a blank page, and every meal is a stroke of
					genius. Our space is designed as a living sketchbook where community and creativity
					collide over the best Sips &amp; Bites in the city."
				</p>
			</div>
			<div class="flex flex-wrap gap-4 pt-4">
				<div class="flex items-center gap-3 bg-[#eae7e7] px-6 py-3">
					<span class="material-symbols-outlined text-[#ba0013] select-none">edit_note</span>
					<span class="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest uppercase"
						>Artist Residencies</span
					>
				</div>
				<div class="flex items-center gap-3 bg-[#eae7e7] px-6 py-3">
					<span class="material-symbols-outlined text-[#ba0013] select-none">coffee</span>
					<span class="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest uppercase"
						>Single Origin</span
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ TOP 3 FAN FAVORITES ════════════════════════════ -->
<section
	id="top3"
	class="relative overflow-hidden bg-[#2f2f2e] px-4 py-16 text-[#f9f6f5] sm:px-6 md:px-12 md:py-32"
>
	<div class="absolute inset-0 z-0 opacity-40">
		<img src="background.png" alt="Background" class="h-full w-full object-cover" />
	</div>
	<div class="relative z-10 mx-auto max-w-7xl">
		<div class="reveal mb-20 space-y-2 text-center">
			<h2
				class="font-['Permanent_Marker'] leading-none uppercase drop-shadow-lg"
				style="font-size:clamp(4rem,10vw,9rem);transform:rotate(-1deg)"
			>
				<span class="font-['Permanent_Marker']"> TOP 3</span>
			</h2>
			<p
				class="font-['Permanent_Marker'] tracking-tighter text-[#ff766a] uppercase"
				style="font-size:clamp(2rem,5vw,4rem);transform:rotate(2deg)"
			>
				FAVORITE FOODS OF 2025
			</p>
		</div>
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-12">
			{#each top3 as food, i}
				<div class="group relative" class:md:translate-y-12={i === 1}>
					<div
						class="transform bg-[#f9f6f5] p-4 shadow-2xl transition-transform duration-500"
						class:group-hover:-rotate-2={i === 0}
						class:group-hover:rotate-1={i === 1}
						class:group-hover:-rotate-1={i === 2}
					>
						<div class="relative aspect-[4/5] overflow-hidden">
							<img src={food.img} alt={food.name} class="h-full w-full object-cover" />
							<div class="pointer-events-none absolute inset-0 p-4">
								<svg class="h-full w-full text-white" viewBox="0 0 100 100">
									<path
										d="M10 10 L20 20 M10 20 L20 10"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-width="2"
									></path>
									<circle cx="85" cy="15" r="5" fill="none" stroke="currentColor" stroke-width="1.5"
									></circle>
								</svg>
							</div>
						</div>
						<div class="mt-6 flex items-center justify-between px-2">
							<h3
								class="font-['Permanent_Marker'] text-3xl tracking-tighter text-[#2f2f2e] uppercase"
							>
								{food.name}
							</h3>
							<span
								class="font-['Pacifico'] text-2xl text-[#ba0013]"
								style="transform:rotate({i === 0
									? '12'
									: i === 1
										? '-12'
										: '6'}deg);display:inline-block">{food.rank}</span
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══ SIGNATURE SIPS & BITES ═══════════════════════ -->
<section id="menu" class="overflow-hidden bg-[#f3f0ef] py-12 md:py-24">
	<div
		class="mb-10 flex flex-col items-start justify-between gap-6 overflow-hidden px-4 sm:px-6 md:mb-16 md:flex-row md:items-end md:gap-8 md:px-12"
	>
		<div class="max-w-2xl">
			<span class="font-['Caveat'] text-3xl text-[#ba0013]">Chef's Selection</span>
			<h2
				class="mt-2 font-['Epilogue'] text-3xl font-black tracking-tighter text-[#2f2f2e] uppercase sm:text-4xl md:text-5xl"
			>
				SIGNATURE SIPS &amp; BITES
			</h2>
		</div>
		<div class="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth pb-4 md:w-auto">
			{#each menuTabs as tab}
				<button
					class="px-6 py-2 font-['Epilogue'] text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all"
					class:bg-[#ba0013]={activeTab === tab}
					class:text-white={activeTab === tab}
					class:bg-[#eae7e7]={activeTab !== tab}
					class:text-[#5c5b5b]={activeTab !== tab}
					onclick={() => (activeTab = tab)}>{tab}</button
				>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-1 items-start gap-8 px-4 sm:px-6 md:px-12 lg:grid-cols-2 lg:gap-16">
		<!-- Menu Items -->
		<div class="space-y-8 sm:space-y-12">
			{#each currentMenu.items as item (item.num + activeTab)}
				<div class="group flex items-start justify-between gap-4 border-b border-[#afadac]/20 pb-6">
					<div class="flex gap-6">
						<div
							class="font-['Epilogue'] text-4xl font-black text-[#afadac]/30 transition-colors group-hover:text-[#ba0013]/40"
						>
							{item.num}
						</div>
						<div>
							<h3
								class="font-['Epilogue'] text-xl font-bold tracking-tight text-[#2f2f2e] uppercase"
							>
								{item.name}
							</h3>
							<p class="mt-1 font-['Plus_Jakarta_Sans'] text-sm text-[#5c5b5b]">{item.desc}</p>
						</div>
					</div>
					<div class="font-['Permanent_Marker'] text-2xl whitespace-nowrap text-[#ba0013]">
						{item.price}
					</div>
				</div>
			{/each}
		</div>
		<!-- Menu Image -->
		<div class="relative">
			<img
				src={currentMenu.img}
				class="aspect-square w-full object-cover shadow-2xl transition-all duration-500"
				style="filter:grayscale(0.1)"
				alt="{activeTab} menu at Kahii"
			/>
			<div class="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#ba0013]/10 blur-3xl"></div>
			<svg
				class="floating-doodle absolute -bottom-8 -left-8 h-24 w-24 text-[#ba0013]"
				viewBox="0 0 100 100"
			>
				<path
					d="M50 85 C50 85 10 60 10 35 C10 15 35 10 50 25 C65 10 90 15 90 35 C90 60 50 85 50 85"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
				></path>
			</svg>
			<!-- Active tab label on image -->
			<div
				class="absolute top-4 left-4 bg-[#ba0013] px-3 py-1 font-['Permanent_Marker'] text-sm tracking-widest text-white uppercase"
			>
				{activeTab}
			</div>
		</div>
	</div>
</section>

<!-- ═══ RESERVATION ════════════════════════════════════ -->
<section id="reservation" class="relative overflow-hidden bg-[#f9f6f5] px-6 py-24 md:px-12">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<!-- Left: Atmospheric Image -->
			<div class="reveal relative">
				<div
					class="group rotate-1 bg-[#2f2f2e] p-3 shadow-2xl transition-transform duration-500 hover:rotate-0"
				>
					<img
						src="about.png"
						alt="Cozy Kahii Booth"
						class="h-64 w-full object-cover transition-all duration-500 sm:h-80 md:h-[500px]"
						style="filter:grayscale(0.2)"
						onmouseenter={(e) => (e.currentTarget.style.filter = 'grayscale(0)')}
						onmouseleave={(e) => (e.currentTarget.style.filter = 'grayscale(0.2)')}
					/>
				</div>
				<div
					class="pointer-events-none absolute -top-10 -left-10 h-32 w-32 text-[#ba0013] opacity-20"
				>
					<svg fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="40" stroke-dasharray="4 4"></circle>
					</svg>
				</div>
				<div
					class="absolute -rotate-12 font-['Pacifico'] text-[#ba0013]"
					style="font-size:2rem;bottom:-1.5rem;right:-1.5rem"
				>
					Reserved for you.
				</div>
			</div>
			<!-- Right: Form -->
			<div class="reveal relative">
				<div class="mb-10">
					<h2
						class="mb-4 font-['Permanent_Marker'] leading-none text-[#2f2f2e] uppercase"
						style="font-size:clamp(3rem,5vw,4.5rem)"
					>
						<span class="font-['Permanent_Marker']"> SECURE YOUR</span> <br /><span
							class="font-['Permanent_Marker'] text-[#ba0013]">CANVAS TABLE</span
						>
					</h2>
					<p class="font-['Plus_Jakarta_Sans'] text-lg text-[#5c5b5b]">
						Join the urban collective. Every booking is a commitment to creativity and exceptional
						flavor.
					</p>
				</div>
				<form class="space-y-6">
					<div class="space-y-2">
						<label
							class="font-['Permanent_Marker'] text-sm tracking-widest text-[#2f2f2e] uppercase"
							>Full Name</label
						>
						<input
							type="text"
							placeholder="Who's joining us?"
							class="w-full border-2 border-transparent bg-[#f3f0ef] p-4 font-['Plus_Jakarta_Sans'] text-[#2f2f2e] transition-colors outline-none focus:border-[#ba0013] focus:ring-0"
						/>
					</div>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<label
								class="font-['Permanent_Marker'] text-sm tracking-widest text-[#2f2f2e] uppercase"
								>Guests</label
							>
							<select
								class="w-full border-2 border-transparent bg-[#f3f0ef] p-4 font-['Plus_Jakarta_Sans'] text-[#2f2f2e] transition-colors outline-none focus:border-[#ba0013] focus:ring-0"
							>
								<option>1 Person</option>
								<option>2 People</option>
								<option>3 People</option>
								<option>4 People</option>
								<option>5+ People</option>
							</select>
						</div>
						<div class="relative space-y-2">
							<label
								class="font-['Permanent_Marker'] text-sm tracking-widest text-[#2f2f2e] uppercase"
								>Date</label
							>
							<input
								type="date"
								class="w-full border-2 border-transparent bg-[#f3f0ef] p-4 font-['Plus_Jakarta_Sans'] text-[#2f2f2e] transition-colors outline-none focus:border-[#ba0013] focus:ring-0"
							/>
							<div class="absolute top-0 -right-24 hidden xl:block">
								<span
									class="block font-['Pacifico'] text-xl text-[#ba0013]"
									style="transform:rotate(-12deg)">Pick a date!</span
								>
								<svg
									class="ml-3 h-7 w-14 text-[#ba0013]"
									style="transform:rotate(-45deg)"
									viewBox="0 0 60 40"
								>
									<path
										d="M5 5C20 5 40 15 55 35M55 35L45 35M55 35L55 25"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									></path>
								</svg>
							</div>
						</div>
					</div>
					<div class="space-y-2">
						<label
							class="font-['Permanent_Marker'] text-sm tracking-widest text-[#2f2f2e] uppercase"
							>Preferred Time</label
						>
						<input
							type="time"
							class="w-full border-2 border-transparent bg-[#f3f0ef] p-4 font-['Plus_Jakarta_Sans'] text-[#2f2f2e] transition-colors outline-none focus:border-[#ba0013] focus:ring-0"
						/>
					</div>
					<button
						type="submit"
						class="w-full py-6 font-['Permanent_Marker'] text-2xl tracking-widest text-white uppercase shadow-xl transition-all duration-300 hover:-translate-y-1"
						style="background-color:#D91A20"
					>
						CONFIRM TABLE BOOKING
					</button>
				</form>
				<div class="pointer-events-none mt-8 flex justify-center opacity-20">
					<svg
						width="200"
						height="40"
						viewBox="0 0 200 40"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M10 20 Q50 10 100 20 T190 20" stroke-dasharray="5 5"></path>
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ SUAFOTO DI KAHII (Photobooth) ════════════════ -->
<section
	class="relative overflow-hidden bg-[#f9f6f5] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32"
>
	<!-- Background Doodles -->
	<div class="pointer-events-none absolute inset-0 z-0 opacity-10">
		<svg class="h-full w-full" viewBox="0 0 1000 1000">
			<circle
				cx="100"
				cy="100"
				r="50"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-dasharray="5 5"
			></circle>
			<path d="M800,200 L850,250 M850,200 L800,250" stroke="currentColor" stroke-width="3"></path>
			<path
				d="M100,800 Q150,750 200,800 T300,800"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			></path>
		</svg>
	</div>
	<div class="relative z-10 mx-auto max-w-7xl">
		<div class="mb-20 text-center">
			<span
				class="mb-2 block font-['Pacifico'] text-4xl text-[#ba0013]"
				style="transform:rotate(-2deg);display:inline-block">Freeze the Moment</span
			>
			<h2
				class="font-['Permanent_Marker'] leading-none text-[#2f2f2e] uppercase"
				style="font-size:clamp(3.5rem,8vw,6rem)"
			>
				<span class="font-['Permanent_Marker']"> SUAFOTO DI KAHII</span>
			</h2>
			<p class="mt-4 font-['Plus_Jakarta_Sans'] font-bold tracking-widest text-[#ba0013] uppercase">
				Captured at our urban studio
			</p>
		</div>
		<!-- Collage Layout: Mobile = stacked, Desktop = 4-col grid -->
		<!-- MOBILE layout (hidden on md+) -->
		<div class="flex flex-col gap-4 md:hidden">
			<!-- Featured photo (booth2) full width -->
			<div class="group relative">
				<div class="relative overflow-hidden border border-[#afadac]/10 bg-white p-3 shadow-2xl">
					<img src="/booth2.png" alt="Gelora Asmara" class="h-auto w-full" />
					<div
						class="mt-4 flex items-center justify-between border-t border-dashed border-[#afadac]/20 pt-3"
					>
						<div>
							<p class="font-['Permanent_Marker'] text-base text-[#ba0013] uppercase">
								GELORA ASMARA
							</p>
							<p class="font-['Pacifico'] text-sm text-[#5c5b5b]">"Love at first sip"</p>
						</div>
						<span class="font-['Epilogue'] text-[10px] font-black uppercase opacity-40">2026</span>
					</div>
					<div
						class="absolute top-3 right-3 rotate-12 bg-[#ba0013] px-2 py-0.5 font-['Permanent_Marker'] text-xs text-white"
					>
						FAVE!
					</div>
				</div>
			</div>
			<!-- 3 photos in a row -->
			<div class="grid grid-cols-3 gap-3">
				<div class="border border-[#afadac]/10 bg-white p-2 shadow-xl">
					<img
						src="/booth4.png"
						alt="Suafoto 1"
						class="aspect-square h-auto w-full object-cover"
						style="filter:grayscale(0.2)"
					/>
					<p class="mt-1 truncate font-['Permanent_Marker'] text-[9px] text-[#ba0013] uppercase">
						Chapter: Lunar
					</p>
				</div>
				<div class="border border-[#afadac]/10 bg-white p-2 shadow-xl">
					<img
						src="/booth3.png"
						alt="Suafoto 3"
						class="aspect-square h-auto w-full object-cover"
						style="filter:grayscale(0.4)"
					/>
					<p class="mt-1 text-center font-['Epilogue'] text-[9px] font-black uppercase opacity-40">
						KAHII
					</p>
				</div>
				<div class="border border-[#afadac]/10 bg-white p-2 shadow-xl">
					<img src="/booth.jpg" alt="Suafoto 4" class="aspect-square h-auto w-full object-cover" />
					<p class="mt-1 truncate font-['Permanent_Marker'] text-[9px] text-[#ba0013] uppercase">
						Growing Together
					</p>
				</div>
			</div>
		</div>
		<!-- DESKTOP layout (hidden on mobile) -->
		<div class="hidden grid-cols-4 items-center gap-4 md:grid">
			<!-- Photo 1 -->
			<div class="group relative -rotate-3 transition-transform duration-500 hover:rotate-0">
				<div class="relative overflow-hidden border border-[#afadac]/10 bg-white p-4 shadow-2xl">
					<img
						src="/booth4.png"
						alt="Suafoto 1"
						class="h-auto w-full transition-all duration-500"
						style="filter:grayscale(0.2)"
						onmouseenter={(e) => (e.currentTarget.style.filter = 'grayscale(0)')}
						onmouseleave={(e) => (e.currentTarget.style.filter = 'grayscale(0.2)')}
					/>
					<div class="mt-4 flex items-center justify-between">
						<span class="font-['Permanent_Marker'] text-sm tracking-widest text-[#ba0013] uppercase"
							>Chapter: Lunar</span
						>
						<span class="font-['Epilogue'] text-xs font-black text-[#2f2f2e] opacity-50">KAHII</span
						>
					</div>
				</div>
				<svg
					class="floating-doodle absolute -top-6 -left-6 h-16 w-16 text-[#ba0013]"
					viewBox="0 0 100 100"
				>
					<path
						d="M50 20 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z"
						fill="none"
						stroke="currentColor"
						stroke-width="4"
					></path>
				</svg>
			</div>
			<!-- Photo 2 (Large Center) -->
			<div
				class="group relative z-20 col-span-2 translate-y-8 rotate-2 transition-transform duration-500 hover:rotate-0"
			>
				<div class="relative overflow-hidden border border-[#afadac]/10 bg-white p-6 shadow-2xl">
					<img src="/booth2.png" alt="Suafoto 2 (featured)" class="h-auto w-full" />
					<div
						class="mt-6 flex items-end justify-between border-t border-dashed border-[#afadac]/20 pt-4"
					>
						<div>
							<p class="mb-1 font-['Permanent_Marker'] text-xl text-[#ba0013] uppercase">
								GELORA ASMARA
							</p>
							<p class="font-['Pacifico'] text-lg text-[#5c5b5b]">"Love at first sip"</p>
						</div>
						<span
							class="mt-2 font-['Epilogue'] text-[10px] font-black tracking-tighter uppercase opacity-40"
							>2026 EDITION</span
						>
					</div>
					<div
						class="absolute top-4 right-4 rotate-12 bg-[#ba0013] px-3 py-1 font-['Permanent_Marker'] text-xs text-white"
					>
						FAVE!
					</div>
				</div>
				<svg
					class="floating-doodle absolute -right-8 -bottom-10 h-24 w-24 text-[#ba0013]"
					style="animation-delay:1s"
					viewBox="0 0 100 100"
				>
					<path
						d="M50 85 C50 85 10 60 10 35 C10 15 35 10 50 25 C65 10 90 15 90 35 C90 60 50 85 50 85"
						fill="none"
						stroke="currentColor"
						stroke-dasharray="10 5"
						stroke-width="3"
					></path>
				</svg>
			</div>
			<!-- Photo 3 & 4 column -->
			<div class="flex flex-col gap-12">
				<div class="group relative -rotate-[5deg] transition-transform duration-500 hover:rotate-0">
					<div class="border border-[#afadac]/10 bg-white p-3 shadow-xl">
						<img
							src="/booth3.png"
							alt="Suafoto 3"
							class="h-auto w-full transition-all duration-500"
							style="filter:grayscale(0.5)"
							onmouseenter={(e) => (e.currentTarget.style.filter = 'grayscale(0)')}
							onmouseleave={(e) => (e.currentTarget.style.filter = 'grayscale(0.5)')}
						/>
						<div class="mt-3 flex justify-center">
							<span
								class="font-['Epilogue'] text-xs font-black tracking-tighter uppercase opacity-30"
								>KAHII</span
							>
						</div>
					</div>
					<span
						class="absolute -rotate-6 font-['Pacifico'] text-xl whitespace-nowrap text-[#ba0013]"
						style="bottom:-1.5rem;left:50%;transform:translateX(-50%) rotate(-6deg)"
						>Captured at Kahii</span
					>
				</div>
				<div class="group relative rotate-[4deg] transition-transform duration-500 hover:rotate-0">
					<div class="border border-[#afadac]/10 bg-white p-3 shadow-xl">
						<img src="/booth.jpg" alt="Suafoto 4" class="h-auto w-full" />
						<div class="mt-3 flex justify-end">
							<span class="font-['Permanent_Marker'] text-[10px] text-[#ba0013] uppercase"
								>Growing Together</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- CTA -->
		<div class="mt-24 text-center">
			<a
				href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
				target="_blank"
				rel="noopener noreferrer"
				class="relative inline-block bg-[#2f2f2e] px-8 py-4 font-['Permanent_Marker'] text-xl text-[#f9f6f5] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#ba0013] hover:text-white sm:px-12 sm:py-6 sm:text-3xl"
			>
				GET YOUR STRIP
				<svg
					class="absolute -top-4 -right-4 h-12 w-12 rotate-12 text-[#ba0013]"
					viewBox="0 0 100 100"
				>
					<path
						d="M10 50 L90 50 M50 10 L50 90"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="4"
					></path>
					<path
						d="M25 25 L75 75 M75 25 L25 75"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="4"
					></path>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- ═══ GALLERY SCROLL STRIP ═══════════════════════════ -->
<section id="gallery" class="overflow-hidden bg-[#f9f6f5] py-12">
	<div class="animate-scroll flex flex-nowrap gap-4 whitespace-nowrap">
		{#each galleryUrls as url}
			<img
				src={url}
				class="aspect-video h-[200px] w-auto object-cover sm:h-[280px] md:h-[400px]"
				style="filter:grayscale(0.2)"
				alt="Gallery"
			/>
		{/each}
	</div>
</section>

<!-- ═══ FAQ ════════════════════════════════════════════ -->
<section class="bg-[#eae7e7] px-4 py-16 sm:px-6 md:px-12 md:py-24">
	<div class="mx-auto max-w-4xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-['Epilogue'] text-5xl font-black text-[#2f2f2e] uppercase">
				<span class="font-['Permanent_Marker']"> GETTING YOU HUNGRY?</span>
			</h2>
			<p class="font-['Caveat'] text-2xl text-[#ba0013]">
				Everything you need to know about the Canvas.
			</p>
		</div>
		<div class="space-y-4">
			{#each faqItems as faq, i}
				<details
					class="group cursor-pointer border border-[#afadac]/10 bg-white p-4 transition-all duration-300 open:border-[#ba0013] sm:p-6 md:p-8"
				>
					<summary
						class="flex list-none items-center justify-between font-['Epilogue'] text-base font-bold tracking-tight text-[#2f2f2e] uppercase sm:text-xl"
					>
						{faq.q}
						<span class="material-symbols-outlined faq-icon text-[#2f2f2e] select-none"
							>expand_more</span
						>
					</summary>
					<div class="mt-6 font-['Plus_Jakarta_Sans'] leading-relaxed text-[#5c5b5b]">
						{faq.a}
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>

<!-- ═══ FOOTER ══════════════════════════════════════════ -->
<footer
	class="bg-[#1A1A1A] px-4 pt-12 pb-10 font-['Plus_Jakarta_Sans'] text-white sm:px-6 md:px-12 md:pt-20"
>
	<div
		class="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:mb-20 md:grid-cols-12 md:gap-12"
	>
		<!-- Brand & Social -->
		<div class="space-y-8 md:col-span-4">
			<div
				class="flex items-center font-['Epilogue'] text-4xl font-black tracking-tighter uppercase"
			>
				<img
					src="/kahi-logo.png"
					alt="kahi"
					class="h-12 w-auto"
					style="filter: brightness(0) invert(1);"
				/>
				<img
					src="/kahi-logo-2.png"
					alt="Kahii"
					class="h-12 w-auto"
					style="filter: brightness(0) invert(1);"
				/>
			</div>
			<p class="max-w-xs leading-relaxed text-[#e4e2e1]/60">
				A multi-sensory experience where urban grit meets high end coffee culture. Join us for the
				ritual, stay for the art.
			</p>
			<div class="flex items-center space-x-6">
				<!-- Instagram -->
				<a
					href="https://www.instagram.com/your.kahii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Instagram Kahii"
					class="text-white transition-colors hover:text-[#ba0013]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
						/>
					</svg>
				</a>
				<!-- WhatsApp -->
				<a
					href="https://tr.ee/ipfxhI_Ohr"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="WhatsApp Kahii"
					class="text-white transition-colors hover:text-[#ba0013]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
						/>
					</svg>
				</a>
				<!-- Email -->
				<a
					href="mailto:hello@kahii.id"
					aria-label="Email Kahii"
					class="material-symbols-outlined cursor-pointer text-2xl transition-colors select-none hover:text-[#ba0013]"
					>alternate_email</a
				>
			</div>
		</div>
		<!-- Navigation Links -->
		<div class="space-y-6 md:col-span-2">
			<h4 class="font-['Permanent_Marker'] text-xs tracking-[0.2em] text-[#e4e2e1]/40 uppercase">
				Navigation
			</h4>
			<ul class="space-y-4 text-sm font-medium">
				<li><a href="#menu" class="transition-colors hover:text-[#ba0013]">Our Menu</a></li>
				<li>
					<a href="#reservation" class="transition-colors hover:text-[#ba0013]">Reservations</a>
				</li>
				<li><a href="#about" class="transition-colors hover:text-[#ba0013]">Our Story</a></li>
				<li><a href="#gallery" class="transition-colors hover:text-[#ba0013]">Journal</a></li>
			</ul>
		</div>
		<!-- Legal -->
		<div class="space-y-6 md:col-span-2">
			<h4 class="font-['Permanent_Marker'] text-xs tracking-[0.2em] text-[#e4e2e1]/40 uppercase">
				Legal
			</h4>
			<ul class="space-y-4 text-sm font-medium text-[#e4e2e1]/60">
				<li><a href="#" class="transition-colors hover:text-[#ba0013]">Privacy</a></li>
				<li><a href="#" class="transition-colors hover:text-[#ba0013]">Terms</a></li>
				<li><a href="#" class="transition-colors hover:text-[#ba0013]">Allergens</a></li>
				<li><a href="#" class="transition-colors hover:text-[#ba0013]">Careers</a></li>
			</ul>
		</div>
		<!-- Join the Club -->
		<div class="flex items-start sm:justify-end md:col-span-4">
			<div
				class="w-full max-w-sm -rotate-2 bg-[#D91A20] p-8 shadow-2xl transition-transform duration-500 hover:rotate-0"
			>
				<h3 class="mb-4 font-['Permanent_Marker'] text-3xl tracking-tighter uppercase">
					JOIN THE CLUB
				</h3>
				<p class="mb-6 text-sm font-medium opacity-90">
					Get exclusive access to secret menus and gallery openings.
				</p>
				<div class="flex">
					<input
						type="email"
						placeholder="Email"
						class="flex-grow border-none bg-white/10 p-3 text-sm text-white placeholder-white/50 outline-none focus:ring-0"
					/>
					<button
						class="flex items-center justify-center bg-white px-4 text-[#D91A20] transition-colors hover:bg-[#f9f6f5]"
					>
						<span class="material-symbols-outlined select-none">arrow_forward</span>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Bottom -->
	<div
		class="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-white/5 pt-8 text-center text-xs font-medium tracking-widest text-[#e4e2e1]/40 uppercase"
	>
		<div>© 2024 KAHII. Crafted for the Urban Canvas with Love and Festivity.</div>
		<div class="font-['Pacifico'] text-2xl tracking-normal text-[#e4e2e1]/60 lowercase normal-case">
			Created with Heart <span class="mx-2">•</span> Brewed with Passion
		</div>
	</div>
</footer>
