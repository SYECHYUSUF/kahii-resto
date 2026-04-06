<script lang="ts">
	import { onMount } from 'svelte';

	const editorPicks = [
		{
			name: 'Nasi Goreng Tuna',
			desc: 'Smoked tuna chunks tossed in aromatic spice-paste, topped with a perfectly runny egg and house-made sambal matah. A Kahii classic.',
			price: 'Rp 85.000',
			img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=900&auto=format&fit=crop',
			badge: 'BEST SELLER',
			badgeRot: '-rotate-6',
			big: true
		},
		{
			name: 'Mie Jawa Katsu',
			desc: 'Crispy panko katsu meets the soul of Javanese noodles.',
			price: 'Rp 72.000',
			img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=700&auto=format&fit=crop',
			badge: 'Seasonal',
			badgeRot: 'rotate-3',
			big: false
		},
		{
			name: 'Carbonara',
			desc: '',
			price: 'Rp 92.000',
			img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=700&auto=format&fit=crop',
			badge: 'Must Try!',
			badgeRot: 'rotate-12',
			big: false
		}
	];

	const topDrinks = [
		{
			name: 'Matcha Latte',
			sub: 'Pure Kyoto Grade',
			label: 'Ceremonial Bliss',
			img: 'matcha.png',
			offset: ''
		},
		{
			name: 'Butterscotch Latte',
			sub: 'Local Soul',
			label: 'Sweet Heritage',
			img: 'butterscotch.png',
			offset: 'mt-16'
		},
		{
			name: 'Nitro Brew',
			sub: 'Velvet Texture',
			label: 'Creamy Flow',
			img: 'nitro.png',
			offset: ''
		}
	];

	type MenuItem = {
		name: string;
		price: string;
		fave?: boolean;
		star?: boolean;
		popular?: boolean;
	};

	const sipsMenu: Record<string, MenuItem[]> = {
		'Caffeine Rush': [
			{ name: 'Urban Latte', price: '38K' },
			{ name: 'Charcoal Matcha', price: '45K' },
			{ name: 'Nitro Cold Brew', price: '42K' }
		],
		'Seasonal Craft': [
			{ name: 'Rose Berry Sparkler', price: '48K', fave: true },
			{ name: 'Lychee Yakult Breeze', price: '40K' }
		]
	};

	const bitesMenu: Record<string, MenuItem[]> = {
		'Starters & Sides': [
			{ name: 'Truffle Fries', price: '55K' },
			{ name: 'Crispy Calamari', price: '68K' }
		],
		'Main Canvas': [
			{ name: 'Urban Platter', price: '125K', star: true },
			{ name: 'Beef Sliders (3pcs)', price: '85K' },
			{ name: 'Salmon Mentai Rice', price: '95K' }
		]
	};

	const sweetsMenu: Record<string, MenuItem[]> = {
		'The Patisserie': [
			{ name: 'Pain au Chocolat', price: '32K' },
			{ name: 'Almond Croissant', price: '35K' }
		],
		'Signature Endings': [
			{ name: 'Mochi Brownie', price: '42K', popular: true },
			{ name: 'Berry Cheesecake', price: '48K', fave: true },
			{ name: 'Tiramisu Kopi Kelapa', price: '52K' }
		]
	};

	const happenings = [
		{
			title: 'Pesta Angpao',
			sub: 'Year of the Dragon',
			desc: 'Win up to IDR 1,000,000',
			cta: 'Check Luck',
			bg: '#ba0013',
			accentColor: 'text-yellow-400',
			img: 'https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=700&auto=format&fit=crop',
			icon: 'stars',
			iconColor: 'text-yellow-400'
		},
		{
			title: 'Valentine',
			sub: 'The Love Language...',
			desc: '5-Course Tasting Set',
			cta: 'Book Table',
			bg: '#5d5b57',
			accentColor: 'text-[#ff766a]',
			img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=700&auto=format&fit=crop',
			icon: 'favorite',
			iconColor: 'text-[#ff766a]'
		},
		{
			title: 'Ramadhan',
			sub: 'Warmth in every bite',
			desc: 'Heritage Delight Set',
			cta: 'Reserve Iftar',
			bg: '#3E2723',
			accentColor: 'text-yellow-300',
			img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=700&auto=format&fit=crop',
			icon: 'bedtime',
			iconColor: 'text-yellow-400'
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) e.target.classList.add('revealed');
				}),
			{ threshold: 0.08 }
		);
		document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>KAHII | Digital Menu Book</title>
	<meta
		name="description"
		content="Explore KAHII's full menu — from signature coffees and Liquid Art drinks to gourmet bites, sweets, and festive specials."
	/>
	<style>
		.material-symbols-outlined {
			font-variation-settings:
				'FILL' 0,
				'wght' 400,
				'GRAD' 0,
				'opsz' 24;
			font-family: 'Material Symbols Outlined';
			display: inline-block;
			line-height: 1;
			text-transform: none;
			letter-spacing: normal;
		}
		.editorial-shadow {
			box-shadow: 12px 12px 0px 0px rgba(186, 0, 19, 0.04);
		}
		.glass-morphism {
			background: rgba(249, 246, 245, 0.92);
			backdrop-filter: blur(16px) saturate(180%);
			-webkit-backdrop-filter: blur(16px) saturate(180%);
		}
		.mixed-media-label {
			font-family: 'Caveat', cursive;
			background-image: linear-gradient(to right, #ff766a, #ba0013);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.doodle-path {
			stroke-dasharray: 1000;
			stroke-dashoffset: 1000;
			animation: draw 3s forwards ease-in-out;
		}
		@keyframes draw {
			to {
				stroke-dashoffset: 0;
			}
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
	</style>
</svelte:head>

<!-- ═══ HEADER ═══════════════════════════════════════ -->
<header class="fixed top-0 z-50 w-full">
	<!-- Top Bar – hidden on small mobile -->
	<div
		class="hidden h-8 items-center justify-between bg-[#0e0e0e] px-4 font-['Be_Vietnam_Pro'] text-[10px] tracking-[0.2em] text-[#f9f6f5] uppercase sm:flex md:px-8"
	>
		<span class="opacity-80">Jakarta · Surabaya · Makassar</span>
		<span class="flex gap-4">
			<a href="/menu" class="transition-colors hover:text-[#ba0013]">Order Now</a>
			<a
				href="/#reservation"
				class="font-['Permanent_Marker'] transition-colors hover:text-[#ba0013]"
			>
				<span class="font-['Permanent_Marker']">Join the Club</span></a
			>
		</span>
	</div>
	<!-- Main Nav -->
	<nav
		class="flex h-14 w-full items-center justify-between px-4 shadow-md sm:h-20 sm:px-8"
		style="background:#ba0013;backdrop-filter:blur(24px) saturate(200%);-webkit-backdrop-filter:blur(24px) saturate(200%);"
	>
		<!-- Left -->
		<div
			class="flex items-center gap-4 font-['Epilogue'] text-sm font-bold tracking-tight uppercase sm:gap-8"
		>
			<a
				href="/menu"
				class="rounded-full bg-white px-3 py-1 text-sm text-[#ba0013] shadow-sm sm:px-4 sm:py-1.5 sm:text-base"
				>Menu</a
			>
			<a href="#" class="hidden text-white transition-colors hover:text-white/80 sm:block">Gifts</a>
		</div>
		<!-- Central Logo (desktop) -->
		<div class="absolute top-0 left-1/2 hidden -translate-x-1/2 flex-col items-center md:flex">
			<a
				href="/"
				class="bemet-logo-shape flex cursor-pointer items-center gap-2 border-x border-b border-black/5 bg-white px-6 pt-3 pb-10 shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-colors hover:bg-gray-50"
				style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));"
			>
				<img src="/kahi-logo.png" alt="Kahii icon" class="h-10 w-auto" />
				<img src="/kahi-logo-2.png" alt="Kahii" class="h-8 w-auto" />
			</a>
		</div>
		<!-- Mobile Logo -->
		<div class="flex items-center gap-2 md:hidden">
			<a href="/"
				><img
					src="/kahi-logo.png"
					alt="Kahii"
					class="h-7 w-auto"
					style="filter:brightness(0) invert(1)"
				/></a
			>
			<a href="/"
				><img
					src="/kahi-logo-2.png"
					alt="Kahii"
					class="h-5 w-auto"
					style="filter:brightness(0) invert(1)"
				/></a
			>
		</div>
		<!-- Right -->
		<div
			class="flex items-center gap-3 font-['Epilogue'] text-sm font-bold tracking-tight uppercase sm:gap-8"
		>
			<a href="#happenings" class="hidden text-white transition-colors hover:text-white/80 sm:block"
				>Events</a
			>
			<a href="/#about" class="hidden text-white transition-colors hover:text-white/80 sm:block"
				>Locations</a
			>
			<div class="flex items-center gap-2 sm:gap-4">
				<span
					class="material-symbols-outlined cursor-pointer text-xl text-white transition-colors select-none hover:text-white/80 active:scale-90 sm:text-2xl"
					>shopping_bag</span
				>
				<span
					class="material-symbols-outlined cursor-pointer text-xl text-white transition-colors select-none hover:text-white/80 active:scale-90 sm:text-2xl"
					>person</span
				>
			</div>
		</div>
	</nav>
</header>

<main class="mt-12 bg-[#f9f6f5] pt-14 pb-24 sm:pt-28 sm:pb-4">
	<!-- ═══ HERO BANNER ══════════════════════════════ -->
	<section class="relative mb-12 overflow-hidden px-3 sm:mb-24 sm:px-8">
		<div
			class="group relative mx-auto h-[320px] max-w-7xl overflow-hidden rounded-2xl bg-[#2D1F1A] shadow-2xl sm:h-[500px] sm:rounded-3xl md:h-[700px]"
		>
			<img
				src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop"
				alt="KAHII Menu Hero"
				class="absolute inset-0 h-full w-full scale-105 object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-100"
				style="mix-blend-mode:luminosity"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-[#2d1f1a]/60 to-transparent"
			></div>
			<div class="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
				<span
					class="mb-3 font-['Caveat'] text-xl tracking-wide text-[#ff766a] italic sm:mb-6 sm:text-3xl md:text-4xl"
					>Ramadhan Kareem &amp; Specials</span
				>
				<h1
					class="mb-4 font-['Permanent_Marker'] leading-none tracking-tight text-white sm:mb-8"
					style="font-size:clamp(2.5rem,8vw,7rem);text-shadow:0 10px 30px rgba(0,0,0,0.5)"
				>
					<span class="font-['Permanent_Marker']">KAHII</span>
					<span class="font-['Permanent_Marker'] text-[#ff766a]">KREASI</span>
				</h1>
				<p
					class="mb-6 max-w-xl px-2 font-['Epilogue'] text-sm leading-relaxed font-light text-white/90 italic sm:mb-14 sm:text-xl md:text-2xl"
				>
					A curated journey of heritage flavors and refined modern craft.
				</p>
				<div
					class="flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-6"
				>
					<a
						href="#editors-picks"
						class="transform rounded-full bg-[#ba0013] px-8 py-3 text-center font-['Permanent_Marker'] text-sm font-bold tracking-widest text-white uppercase shadow-xl transition-all hover:-translate-y-1 hover:bg-[#a4000f] sm:px-14 sm:py-5 sm:text-lg"
					>
						Explore Menu
					</a>
					<a
						href="/#reservation"
						class="rounded-full border border-white/20 bg-white/10 px-8 py-3 text-center font-['Permanent_Marker'] text-sm font-bold tracking-widest text-white uppercase backdrop-blur-xl transition-all hover:bg-white/15 sm:px-14 sm:py-5 sm:text-lg"
					>
						Reserve Table
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══ EDITOR'S PICKS ═════════════════════════=═══ -->
	<section id="editors-picks" class="mx-auto mb-16 max-w-7xl px-4 sm:mb-32 sm:px-8">
		<div class="reveal mb-10 flex items-end justify-between sm:mb-20">
			<div class="relative">
				<h2 class="mb-2 font-['Permanent_Marker'] text-3xl text-[#2f2f2e] sm:text-5xl md:text-6xl">
					<span class="font-['Permanent_Marker']">Editor's Pics</span>
				</h2>
				<span
					class="absolute font-['Caveat'] text-xl text-[#ba0013] sm:text-3xl"
					style="bottom:-1.2rem;left:0.3rem;transform:rotate(-2deg)">The Signature Icons</span
				>
			</div>
			<div class="hidden text-right sm:block">
				<span
					class="mb-1 block font-['Be_Vietnam_Pro'] text-xs tracking-[0.3em] text-[#afadac] uppercase"
					>Authentic Selection</span
				>
				<span class="font-['Be_Vietnam_Pro'] text-sm font-bold text-[#2f2f2e]"
					>CATALOG NO. 24.03</span
				>
			</div>
		</div>

		<!-- Mobile: photobooth collage style -->
		<div class="mt-8 flex flex-col gap-4 sm:hidden">
			<!-- Featured photo full width -->
			<div class="group reveal relative">
				<div class="relative overflow-hidden border border-[#afadac]/10 bg-white p-3 shadow-2xl">
					<img
						src={editorPicks[0].img}
						alt={editorPicks[0].name}
						class="h-auto w-full object-cover"
						style="aspect-ratio:4/3;"
					/>
					<div class="mt-4 border-t border-dashed border-[#afadac]/20 pt-3">
						<div class="mb-2 flex items-start justify-between">
							<h3
								class="max-w-[60%] font-['Permanent_Marker'] text-lg leading-tight text-[#ba0013] uppercase"
							>
								{editorPicks[0].name}
							</h3>
							<span
								class="bg-[#f9f6f5] px-2 py-1 font-['Epilogue'] text-sm font-black text-[#2f2f2e]"
								>{editorPicks[0].price}</span
							>
						</div>
						<p class="font-['Plus_Jakarta_Sans'] text-[11px] leading-relaxed text-[#5c5b5b]">
							{editorPicks[0].desc}
						</p>
					</div>
					<div
						class="absolute top-5 left-5 -rotate-6 bg-[#ba0013] px-2 py-1 font-['Permanent_Marker'] text-[10px] text-white shadow-xl"
					>
						BEST SELLER
					</div>
				</div>
			</div>
			<!-- 2 remaining photos in a row -->
			<div class="grid grid-cols-2 gap-3">
				{#each editorPicks.slice(1) as pick, i}
					<div class="reveal relative" style="animation-delay: {i * 150}ms">
						<div
							class="flex h-full flex-col justify-between border border-[#afadac]/10 bg-white p-2 shadow-xl"
						>
							<img
								src={pick.img}
								alt={pick.name}
								class="h-auto w-full object-cover drop-shadow-sm"
								style="aspect-ratio:1/1;"
							/>
							<div
								class="mt-2 flex flex-1 flex-col justify-end border-t border-dashed border-[#afadac]/10 pt-1.5 text-center"
							>
								<p class="truncate font-['Permanent_Marker'] text-[10px] text-[#2f2f2e] uppercase">
									{pick.name}
								</p>
								<p class="mt-0.5 font-['Epilogue'] text-[9px] font-black text-[#ba0013]">
									{pick.price}
								</p>
							</div>
						</div>
						{#if i === 0}
							<div
								class="absolute top-3 right-3 rotate-3 bg-[#2f2f2e] px-1.5 py-0.5 font-['Epilogue'] text-[7px] font-bold tracking-widest text-white uppercase shadow"
							>
								Seasonal
							</div>
						{:else}
							<div
								class="absolute top-0 -left-1 -rotate-12 font-['Caveat'] text-xl text-[#ba0013] drop-shadow-sm"
							>
								Must Try!
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Desktop: original grid layout -->
		<div class="hidden grid-cols-1 items-start gap-16 sm:grid md:grid-cols-12">
			<div class="group reveal relative md:col-span-7">
				<div class="editorial-shadow relative overflow-hidden rounded-sm bg-white">
					<img
						src={editorPicks[0].img}
						alt={editorPicks[0].name}
						class="w-full object-cover transition-all duration-1000 group-hover:scale-105"
						style="aspect-ratio:4/3;filter:grayscale(0.2)"
						onmouseenter={(e) => (e.currentTarget.style.filter = 'grayscale(0)')}
						onmouseleave={(e) => (e.currentTarget.style.filter = 'grayscale(0.2)')}
					/>
					<div
						class="absolute top-6 left-6 z-10 -rotate-6 bg-[#ba0013] px-6 py-2 font-['Epilogue'] text-sm font-black text-white shadow-xl"
					>
						BEST SELLER
					</div>
				</div>
				<div class="pt-10">
					<div class="mb-4 flex items-baseline justify-between">
						<h3
							class="flex items-center gap-3 font-['Permanent_Marker'] text-4xl text-[#2f2f2e] uppercase italic"
						>
							{editorPicks[0].name}
							<span
								class="material-symbols-outlined text-2xl text-[#ba0013] select-none"
								style="font-variation-settings:'FILL' 1">restaurant</span
							>
						</h3>
						<span class="font-['Epilogue'] text-3xl font-black text-[#ba0013]"
							>{editorPicks[0].price}</span
						>
					</div>
					<p
						class="max-w-xl font-['Plus_Jakarta_Sans'] text-lg leading-relaxed font-light text-[#5d5b57]"
					>
						{editorPicks[0].desc}
					</p>
				</div>
			</div>
			<div class="flex flex-col gap-20 md:col-span-5">
				{#each editorPicks.slice(1) as pick, i}
					<div class="group reveal">
						<div class="editorial-shadow relative mb-8 h-80 overflow-hidden rounded-sm">
							<img
								src={pick.img}
								alt={pick.name}
								class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
							/>
							{#if i === 0}
								<div
									class="absolute top-6 right-6 z-10 rotate-3 bg-[#2f2f2e] px-5 py-1.5 font-['Epilogue'] text-xs font-bold tracking-widest text-[#f9f6f5] uppercase shadow-lg"
								>
									Seasonal
								</div>
							{:else}
								<div
									class="absolute -top-6 -left-6 z-10 rotate-12 font-['Caveat'] text-5xl text-[#ba0013] drop-shadow-sm"
								>
									Must Try!
								</div>
							{/if}
						</div>
						<div class="flex items-center justify-between px-2">
							<h3
								class="flex items-center gap-2 font-['Permanent_Marker'] text-2xl text-[#2f2f2e] uppercase"
							>
								{pick.name}
								<span class="material-symbols-outlined text-lg text-[#ba0013] select-none"
									>{i === 0 ? 'local_fire_department' : 'favorite'}</span
								>
							</h3>
							<span class="font-['Epilogue'] text-xl font-bold text-[#ba0013]">{pick.price}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══ TOP 3 LIQUID ART ══════════════════════════ -->
	<section class="mx-auto mb-16 max-w-7xl px-4 sm:mb-40 sm:px-8">
		<div class="reveal mb-10 flex flex-col items-center sm:mb-24">
			<h2
				class="mb-3 text-center font-['Permanent_Marker'] text-4xl tracking-tight text-[#2f2f2e] sm:text-6xl md:text-7xl"
			>
				<span class="font-['Permanent_Marker']">Top 3 Liquid Art</span>
			</h2>
			<span class="font-['Caveat'] text-2xl text-[#ba0013] italic sm:text-4xl"
				>Our most ordered drafts</span
			>
		</div>
		<!-- Mobile: horizontal scroll -->
		<div class="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
			{#each topDrinks as drink}
				<div
					class="group editorial-shadow reveal relative w-64 flex-none snap-start overflow-hidden rounded-2xl bg-[#e4e2e1]"
					style="aspect-ratio:3/4"
				>
					<img src={drink.img} alt={drink.name} class="h-full w-full object-cover" />
					<div
						class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5"
					>
						<h3 class="mb-1 font-['Permanent_Marker'] text-2xl text-white uppercase">
							{drink.name}
						</h3>
						<p class="font-['Be_Vietnam_Pro'] text-xs tracking-[0.2em] text-white/70 uppercase">
							{drink.sub}
						</p>
					</div>
				</div>
			{/each}
		</div>
		<!-- Desktop: original grid -->
		<div class="hidden grid-cols-1 gap-14 sm:grid md:grid-cols-3">
			{#each topDrinks as drink, i}
				<div class="group relative {drink.offset} reveal">
					<div
						class="editorial-shadow relative overflow-hidden rounded-[2rem] bg-[#e4e2e1] transition-transform duration-500 group-hover:-translate-y-4"
						style="aspect-ratio:4/5"
					>
						<img
							src={drink.img}
							alt={drink.name}
							class="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
						/>
						<div class="pointer-events-none absolute inset-0 p-8">
							<svg class="h-full w-full opacity-60" fill="none" viewBox="0 0 400 500">
								{#if i === 0}
									<path
										class="doodle-path"
										d="M80 120 Q150 40 220 120 T360 120"
										stroke="white"
										stroke-linecap="round"
										stroke-width="2.5"
									></path>
									<circle cx="340" cy="60" fill="white" opacity="0.8" r="6"></circle>
								{:else if i === 1}
									<path
										class="doodle-path"
										d="M100 450 Q200 480 300 450"
										stroke="white"
										stroke-dasharray="12 12"
										stroke-width="3"
									></path>
									<circle
										cx="200"
										cy="250"
										opacity="0.3"
										r="120"
										stroke="white"
										stroke-dasharray="2 8"
										stroke-width="1"
									></circle>
								{:else}
									<path d="M320 280 L350 250 M350 280 L320 250" stroke="white" stroke-width="3"
									></path>
									<path
										d="M40 40 C100 100 100 200 40 260"
										opacity="0.4"
										stroke="white"
										stroke-width="1.5"
									></path>
								{/if}
							</svg>
						</div>
						<div
							class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-10"
						>
							<h3 class="mb-1 font-['Permanent_Marker'] text-4xl text-white uppercase">
								{drink.name}
							</h3>
							<p class="font-['Be_Vietnam_Pro'] text-xs tracking-[0.3em] text-white/70 uppercase">
								{drink.sub}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- ═══ THE CANVAS SECTIONS (Full Menu Grid) ══════ -->
	<section class="relative overflow-hidden bg-[#2f2f2e] px-4 py-12 sm:px-8 sm:py-32">
		<div class="relative z-10 mx-auto max-w-7xl">
			<h2
				class="reveal mb-8 text-center font-['Permanent_Marker'] text-3xl tracking-tighter text-[#f9f6f5] sm:mb-28 sm:text-5xl md:text-7xl"
			>
				<span class="font-['Permanent_Marker'] text-[#ba0013]">The Canvas Sections</span>
			</h2>
			<div class="grid grid-cols-1 gap-4 sm:gap-12 md:grid-cols-3">
				<!-- SIPS -->
				<div
					class="editorial-shadow reveal relative rounded-sm border-t-8 border-[#ba0013] bg-[#f9f6f5] p-5 sm:p-12"
				>
					<div class="mb-6 flex items-center justify-between sm:mb-14">
						<h3
							class="font-['Permanent_Marker'] text-3xl tracking-tighter text-[#2f2f2e] uppercase sm:text-5xl"
						>
							Sips
						</h3>
						<span class="material-symbols-outlined text-3xl text-[#ba0013] select-none sm:text-5xl"
							>local_cafe</span
						>
					</div>
					<div class="space-y-6 sm:space-y-12">
						{#each Object.entries(sipsMenu) as [cat, items], ci}
							<div>
								<h4
									class="mb-3 flex items-center gap-2 font-['Be_Vietnam_Pro'] text-xs font-bold tracking-[0.2em] uppercase sm:mb-6 sm:tracking-[0.3em]"
									class:text-[#787676]={ci === 0}
									class:text-[#ba0013]={ci === 1}
								>
									{cat}
									{#if ci === 0}<span
											class="material-symbols-outlined text-[10px] text-[#ba0013] select-none"
											>bolt</span
										>{/if}
									{#if ci === 1}<span
											class="material-symbols-outlined animate-pulse text-xs select-none">star</span
										>{/if}
								</h4>
								<ul class="space-y-3 sm:space-y-6">
									{#each items as item}
										<li
											class="group flex cursor-default justify-between border-b border-[#afadac]/20 pb-2 sm:pb-3"
										>
											<span
												class="flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-sm font-bold transition-colors group-hover:text-[#ba0013] sm:text-base"
											>
												{item.name}
												{#if item.fave}<span
														class="material-symbols-outlined text-sm text-[#ba0013] select-none"
														style="font-variation-settings:'FILL' 1">favorite</span
													>{/if}
											</span>
											<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] sm:text-base"
												>{item.price}</span
											>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
					<div class="mt-6 border-t border-dashed border-[#afadac] pt-4 sm:mt-14 sm:pt-8">
						<span class="font-['Caveat'] text-lg text-[#5d5b57] italic opacity-70 sm:text-2xl"
							>Single origin beans from Ijen Crater.</span
						>
					</div>
				</div>

				<!-- BITES -->
				<div
					class="editorial-shadow reveal relative rounded-sm border-t-8 border-[#2f2f2e] bg-[#f9f6f5] p-5 sm:p-12"
				>
					<div class="mb-6 flex items-center justify-between sm:mb-14">
						<h3
							class="font-['Permanent_Marker'] text-3xl tracking-tighter text-[#2f2f2e] uppercase sm:text-5xl"
						>
							Bites
						</h3>
						<span class="material-symbols-outlined text-3xl text-[#2f2f2e] select-none sm:text-5xl"
							>restaurant</span
						>
					</div>
					<div class="space-y-6 sm:space-y-12">
						{#each Object.entries(bitesMenu) as [cat, items]}
							<div>
								<h4
									class="mb-3 font-['Be_Vietnam_Pro'] text-xs font-bold tracking-[0.2em] text-[#787676] uppercase sm:mb-6 sm:tracking-[0.3em]"
								>
									{cat}
								</h4>
								<ul class="space-y-3 sm:space-y-6">
									{#each items as item}
										<li
											class="group flex cursor-default justify-between border-b border-[#afadac]/20 pb-2 sm:pb-3"
										>
											<span
												class="flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-sm font-bold sm:text-base"
											>
												{item.name}
												{#if item.star}<span
														class="material-symbols-outlined text-sm text-yellow-600 select-none"
														style="font-variation-settings:'FILL' 1">stars</span
													>{/if}
											</span>
											<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] sm:text-base"
												>{item.price}</span
											>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
					<div class="mt-6 text-center sm:mt-14">
						<button
							class="inline-block transform rounded-full border-2 border-[#ba0013]/20 px-6 py-2 transition-colors hover:scale-105 hover:border-[#ba0013]/60 sm:px-8 sm:py-3"
						>
							<span
								class="font-['Permanent_Marker'] text-sm tracking-widest text-[#ba0013] uppercase"
								>Ask for Specials</span
							>
						</button>
					</div>
				</div>

				<!-- SWEETS -->
				<div
					class="editorial-shadow reveal relative rounded-sm border-t-8 border-[#ba0013] bg-[#f9f6f5] p-5 sm:p-12"
				>
					<div class="mb-6 flex items-center justify-between sm:mb-14">
						<h3
							class="font-['Permanent_Marker'] text-3xl tracking-tighter text-[#2f2f2e] uppercase sm:text-5xl"
						>
							Sweets
						</h3>
						<span class="material-symbols-outlined text-3xl text-[#ba0013] select-none sm:text-5xl"
							>bakery_dining</span
						>
					</div>
					<div class="space-y-6 sm:space-y-12">
						{#each Object.entries(sweetsMenu) as [cat, items]}
							<div>
								<h4
									class="mb-3 font-['Be_Vietnam_Pro'] text-xs font-bold tracking-[0.2em] text-[#787676] uppercase sm:mb-6 sm:tracking-[0.3em]"
								>
									{cat}
								</h4>
								<ul class="space-y-3 sm:space-y-6">
									{#each items as item}
										<li
											class="group flex cursor-default justify-between border-b border-[#afadac]/20 pb-2 sm:pb-3"
										>
											<span
												class="flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-sm font-bold sm:text-base"
											>
												{item.name}
												{#if item.popular}<span
														class="rounded-full bg-yellow-100 px-2 py-0.5 text-[9px] font-black text-yellow-800"
														>POPULAR</span
													>{/if}
												{#if item.fave}<span
														class="material-symbols-outlined text-sm text-[#ba0013] select-none"
														style="font-variation-settings:'FILL' 1">favorite</span
													>{/if}
											</span>
											<span class="font-['Epilogue'] text-sm font-black text-[#ba0013] sm:text-base"
												>{item.price}</span
											>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
					<div class="mt-6 flex justify-center sm:mt-14">
						<span
							class="font-['Caveat'] text-3xl text-[#ba0013] drop-shadow-sm sm:text-4xl"
							style="transform:rotate(6deg);display:inline-block">A sweet finale.</span
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══ FESTIVE HAPPENINGS ════════════════════════ -->
	<section id="happenings" class="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-40">
		<h2
			class="reveal mb-10 text-center font-['Permanent_Marker'] text-3xl tracking-tight text-[#2f2f2e] sm:mb-24 sm:text-5xl md:text-7xl"
		>
			<span class="font-['Permanent_Marker'] text-[#ba0013]">Festive Happenings</span>
		</h2>
		<!-- Mobile: horizontal scroll cards -->
		<div class="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
			{#each happenings as h, i}
				<div
					class="group editorial-shadow relative h-80 w-72 flex-none snap-start overflow-hidden rounded-3xl"
					style="background:{h.bg}"
				>
					<img
						src={h.img}
						alt={h.title}
						class="absolute inset-0 h-full w-full object-cover opacity-50"
						style="mix-blend-mode:{i === 0 ? 'overlay' : 'normal'}"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
					></div>
					<div class="absolute top-5 right-5 rotate-12">
						<span
							class="material-symbols-outlined text-3xl {h.iconColor} select-none"
							style="font-variation-settings:'FILL' 1">{h.icon}</span
						>
					</div>
					<div
						class="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white"
					>
						<span class="mb-1 font-['Caveat'] text-xl italic {h.accentColor}">{h.sub}</span>
						<h3 class="mb-2 font-['Permanent_Marker'] text-3xl tracking-tight uppercase">
							{h.title}
						</h3>
						<p
							class="mb-3 font-['Epilogue'] text-xs font-bold tracking-[0.15em] text-white/80 uppercase"
						>
							{h.desc}
						</p>
						<button
							class="rounded-full border border-white/30 bg-white/20 px-6 py-2 text-xs font-black tracking-widest text-white uppercase backdrop-blur"
							>{h.cta}</button
						>
					</div>
				</div>
			{/each}
		</div>
		<!-- Desktop: original grid -->
		<div class="hidden grid-cols-1 gap-10 sm:grid md:grid-cols-3">
			{#each happenings as h, i}
				<div
					class="group editorial-shadow reveal relative h-[500px] overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2"
					style="background:{h.bg}"
				>
					<img
						src={h.img}
						alt={h.title}
						class="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-[3s] group-hover:scale-110"
						style="mix-blend-mode:{i === 0 ? 'overlay' : 'normal'}"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
					></div>
					<div class="absolute top-10 right-12 z-20 rotate-12 opacity-90">
						<span
							class="material-symbols-outlined text-5xl {h.iconColor} select-none"
							style="font-variation-settings:'FILL' 1">{h.icon}</span
						>
					</div>
					<div
						class="absolute inset-0 z-10 flex flex-col items-center justify-center p-12 text-center text-white"
					>
						<span class="mb-2 font-['Caveat'] text-3xl italic {h.accentColor}">{h.sub}</span>
						<h3 class="mb-6 font-['Permanent_Marker'] text-5xl tracking-tight uppercase">
							{h.title}
						</h3>
						<p class="font-['Epilogue'] text-lg font-bold tracking-[0.2em] text-white/90 uppercase">
							{h.desc}
						</p>
						{#if i === 0}
							<button
								class="mt-10 rounded-full bg-white px-10 py-4 text-sm font-black tracking-widest text-[#ba0013] uppercase shadow-2xl transition-all hover:bg-[#f3f0ef]"
								>{h.cta}</button
							>
						{:else if i === 1}
							<button
								class="mt-10 rounded-full border-2 border-white/50 px-10 py-4 text-sm font-black tracking-widest text-white uppercase backdrop-blur-md transition-all hover:bg-white hover:text-[#2f2f2e]"
								>{h.cta}</button
							>
						{:else}
							<button
								class="mt-10 rounded-full bg-yellow-600 px-10 py-4 text-sm font-black tracking-widest text-white uppercase shadow-2xl transition-all hover:bg-yellow-500 active:scale-95"
								>{h.cta}</button
							>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<!-- ═══ FOOTER ══════════════════════════════════════ -->
<footer class="relative overflow-hidden bg-[#0e0e0e] px-4 py-12 text-[#f9f6f5] sm:px-10 sm:py-28">
	<div class="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:gap-24 md:grid-cols-2">
		<div>
			<h2
				class="mb-6 font-['Permanent_Marker'] text-4xl tracking-tighter text-[#ba0013] sm:mb-10 sm:text-7xl"
			>
				Join the Club
			</h2>
			<p
				class="mb-8 max-w-md font-['Plus_Jakarta_Sans'] text-base leading-relaxed text-[#e4e2e1]/60 sm:mb-14 sm:text-xl"
			>
				Get exclusive invites to our secret menu launches, artist collaboration nights, and
				community pop-ups.
			</p>
			<form class="flex max-w-md gap-3">
				<input
					type="email"
					placeholder="Your email..."
					class="flex-1 border-0 border-b-2 border-white/20 bg-white/5 py-3 font-['Epilogue'] text-sm text-[#f9f6f5] italic placeholder-white/20 transition-all outline-none focus:border-[#ba0013] focus:ring-0 sm:py-5 sm:text-lg"
				/>
				<button
					class="bg-[#ba0013] px-6 py-3 font-['Epilogue'] text-sm font-black tracking-widest text-white uppercase shadow-lg transition-transform hover:translate-x-1 sm:px-12"
					>In</button
				>
			</form>
			<div
				class="mt-10 font-['Be_Vietnam_Pro'] text-[10px] tracking-[0.4em] uppercase opacity-30 sm:mt-24"
			>
				© 2024 KAHII URBAN CANVAS. ALL RIGHTS RESERVED.
			</div>
		</div>
		<div class="grid grid-cols-2 gap-8 sm:gap-16">
			<div class="flex flex-col gap-6 sm:gap-10">
				<h4
					class="font-['Permanent_Marker'] text-2xl tracking-tight text-[#f9f6f5] uppercase sm:text-4xl"
				>
					Canvas
				</h4>
				<nav
					class="flex flex-col gap-4 font-['Epilogue'] text-sm tracking-tighter uppercase opacity-60 sm:gap-7"
				>
					<a href="/menu" class="transition-all hover:translate-x-2 hover:text-[#ba0013]"
						>Menu Book</a
					>
					<a href="#" class="transition-all hover:translate-x-2 hover:text-[#ba0013]">Gifts Shop</a>
					<a href="#happenings" class="transition-all hover:translate-x-2 hover:text-[#ba0013]"
						>Event Space</a
					>
					<a href="/#gallery" class="transition-all hover:translate-x-2 hover:text-[#ba0013]"
						>The Journal</a
					>
				</nav>
			</div>
			<div class="flex flex-col gap-6 sm:gap-10">
				<h4
					class="font-['Permanent_Marker'] text-2xl tracking-tight text-[#f9f6f5] uppercase sm:text-4xl"
				>
					Connect
				</h4>
				<nav
					class="flex flex-col gap-4 font-['Epilogue'] text-sm tracking-tighter uppercase opacity-60 sm:gap-7"
				>
					<a
						href="https://instagram.com/kahii.id"
						target="_blank"
						class="transition-all hover:translate-x-2 hover:text-[#ba0013]">Instagram</a
					>
					<a href="#" class="transition-all hover:translate-x-2 hover:text-[#ba0013]">TikTok</a>
					<a href="#" class="transition-all hover:translate-x-2 hover:text-[#ba0013]">Spotify</a>
					<a
						href="https://wa.me/6281234567890"
						target="_blank"
						class="transition-all hover:translate-x-2 hover:text-[#ba0013]">WhatsApp</a
					>
				</nav>
			</div>
		</div>
	</div>
</footer>

<!-- Mobile Bottom Nav -->
<div
	class="fixed right-0 bottom-0 left-0 z-50 bg-gradient-to-t from-[#f9f6f5] to-transparent px-4 pt-2 pb-4 sm:hidden"
>
	<div
		class="flex h-14 items-center justify-around rounded-full border border-white/30 bg-[#f9f6f5]/95 px-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
	>
		<a
			href="/"
			class="flex flex-col items-center justify-center gap-0.5 text-[#2f2f2e]/40 transition-colors hover:text-[#ba0013]"
		>
			<span class="material-symbols-outlined text-xl select-none">home</span>
			<span class="text-[8px] font-black uppercase">Home</span>
		</a>
		<a
			href="/menu"
			class="flex flex-col items-center justify-center gap-0.5 rounded-full bg-[#ba0013]/10 px-5 py-2 text-[#ba0013]"
		>
			<span
				class="material-symbols-outlined text-xl select-none"
				style="font-variation-settings:'FILL' 1">restaurant_menu</span
			>
			<span class="text-[8px] font-black uppercase">Menu</span>
		</a>
		<a
			href="#happenings"
			class="flex flex-col items-center justify-center gap-0.5 text-[#2f2f2e]/40 transition-colors hover:text-[#ba0013]"
		>
			<span class="material-symbols-outlined text-xl select-none">loyalty</span>
			<span class="text-[8px] font-black uppercase">Promos</span>
		</a>
		<a
			href="/#reservation"
			class="flex flex-col items-center justify-center gap-0.5 text-[#2f2f2e]/40 transition-colors hover:text-[#ba0013]"
		>
			<span class="material-symbols-outlined text-xl select-none">person</span>
			<span class="text-[8px] font-black uppercase">Club</span>
		</a>
	</div>
</div>
