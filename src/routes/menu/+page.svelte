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

	type MenuItem = { name: string; price: string; fave?: boolean; star?: boolean; popular?: boolean };

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
			(entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
			{ threshold: 0.08 }
		);
		document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>KAHII | Digital Menu Book</title>
	<meta name="description" content="Explore KAHII's full menu — from signature coffees and Liquid Art drinks to gourmet bites, sweets, and festive specials." />
	<style>
		.material-symbols-outlined {
			font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
			font-family: 'Material Symbols Outlined';
			display: inline-block;
			line-height: 1;
			text-transform: none;
			letter-spacing: normal;
		}
		.editorial-shadow { box-shadow: 12px 12px 0px 0px rgba(186,0,19,0.04); }
		.glass-morphism {
			background: rgba(249,246,245,0.92);
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
		@keyframes draw { to { stroke-dashoffset: 0; } }
		.reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease, transform 0.7s ease; }
		.reveal.revealed { opacity:1; transform:translateY(0); }
	</style>
</svelte:head>

<!-- ═══ HEADER ═══════════════════════════════════════ -->
<header class="fixed top-0 w-full z-50">
	<!-- Top Bar – hidden on small mobile -->
	<div class="hidden sm:flex bg-[#0e0e0e] h-8 items-center justify-between px-4 md:px-8 text-[10px] font-['Be_Vietnam_Pro'] uppercase tracking-[0.2em] text-[#f9f6f5]">
		<span class="opacity-80">Jakarta · Surabaya · Makassar</span>
		<span class="flex gap-4">
			<a href="/menu" class="hover:text-[#ba0013] transition-colors">Order Now</a>
			<a href="/#reservation" class="hover:text-[#ba0013] transition-colors font-['Permanent_Marker']"> <span class="font-['Permanent_Marker']">Join the Club</span></a>
		</span>
	</div>
	<!-- Main Nav -->
	<nav class="h-14 sm:h-20 px-4 sm:px-8 flex justify-between items-center shadow-md w-full" style="background:#ba0013;backdrop-filter:blur(24px) saturate(200%);-webkit-backdrop-filter:blur(24px) saturate(200%);">
		<!-- Left -->
		<div class="flex gap-4 sm:gap-8 items-center font-['Epilogue'] tracking-tight text-sm uppercase font-bold">
			<a href="/menu" class="bg-white text-[#ba0013] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm text-sm sm:text-base">Menu</a>
			<a href="#" class="hidden sm:block text-white hover:text-white/80 transition-colors">Gifts</a>
		</div>
		<!-- Central Logo (desktop) -->
		<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 flex-col items-center">
			<a href="/" class="flex items-center gap-2 bg-white px-6 pt-3 pb-10 bemet-logo-shape shadow-[0_15px_30px_rgba(0,0,0,0.15)] border-x border-b border-black/5 hover:bg-gray-50 transition-colors cursor-pointer" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));">
				<img src="/kahi-logo.png" alt="Kahii icon" class="h-10 w-auto" />
				<img src="/kahi-logo-2.png" alt="Kahii" class="h-8 w-auto" />
			</a>
		</div>
		<!-- Mobile Logo -->
		<div class="flex md:hidden items-center gap-2">
			<a href="/"><img src="/kahi-logo.png" alt="Kahii" class="h-7 w-auto" style="filter:brightness(0) invert(1)" /></a>
			<a href="/"><img src="/kahi-logo-2.png" alt="Kahii" class="h-5 w-auto" style="filter:brightness(0) invert(1)" /></a>
		</div>
		<!-- Right -->
		<div class="flex gap-3 sm:gap-8 items-center font-['Epilogue'] tracking-tight text-sm uppercase font-bold">
			<a href="#happenings" class="hidden sm:block text-white hover:text-white/80 transition-colors">Events</a>
			<a href="/#about" class="hidden sm:block text-white hover:text-white/80 transition-colors">Locations</a>
			<div class="flex gap-2 sm:gap-4 items-center">
				<span class="material-symbols-outlined cursor-pointer hover:text-white/80 transition-colors active:scale-90 text-white text-xl sm:text-2xl select-none">shopping_bag</span>
				<span class="material-symbols-outlined cursor-pointer hover:text-white/80 transition-colors active:scale-90 text-white text-xl sm:text-2xl select-none">person</span>
			</div>
		</div>
	</nav>
</header>

<main class="pt-14 sm:pt-28 bg-[#f9f6f5] pb-24 sm:pb-4">

	<!-- ═══ HERO BANNER ══════════════════════════════ -->
	<section class="relative px-3 sm:px-8 mb-12 sm:mb-24 overflow-hidden">
		<div class="max-w-7xl mx-auto h-[320px] sm:h-[500px] md:h-[700px] bg-[#2D1F1A] relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-2xl">
			<img
				src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop"
				alt="KAHII Menu Hero"
				class="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[3s]"
				style="mix-blend-mode:luminosity"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-[#2d1f1a]/60 to-transparent"></div>
			<div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
				<span class="font-['Caveat'] text-[#ff766a] text-xl sm:text-3xl md:text-4xl mb-3 sm:mb-6 italic tracking-wide">Ramadhan Kareem &amp; Specials</span>
				<h1 class="font-['Permanent_Marker'] text-white leading-none tracking-tight mb-4 sm:mb-8" style="font-size:clamp(2.5rem,8vw,7rem);text-shadow:0 10px 30px rgba(0,0,0,0.5)">
					<span class="font-['Permanent_Marker']">KAHII</span> <span class="text-[#ff766a] font-['Permanent_Marker']">KREASI</span>
				</h1>
				<p class="font-['Epilogue'] text-sm sm:text-xl md:text-2xl text-white/90 max-w-xl font-light italic mb-6 sm:mb-14 leading-relaxed px-2">
					A curated journey of heritage flavors and refined modern craft.
				</p>
				<div class="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full max-w-sm sm:max-w-none sm:w-auto">
					<a href="#editors-picks" class="bg-[#ba0013] font-['Permanent_Marker'] text-white px-8 sm:px-14 py-3 sm:py-5 font-bold text-sm sm:text-lg uppercase tracking-widest hover:bg-[#a4000f] transition-all shadow-xl rounded-full hover:-translate-y-1 transform text-center">
						Explore Menu
					</a>
					<a href="/#reservation" class="bg-white/10 font-['Permanent_Marker'] backdrop-blur-xl border border-white/20 text-white px-8 sm:px-14 py-3 sm:py-5 font-bold text-sm sm:text-lg uppercase tracking-widest hover:bg-white/15 transition-all rounded-full text-center">
						Reserve Table
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══ EDITOR'S PICKS ═════════════════════════=═══ -->
	<section id="editors-picks" class="px-4 sm:px-8 mb-16 sm:mb-32 max-w-7xl mx-auto">
		<div class="flex justify-between items-end mb-10 sm:mb-20 reveal">
			<div class="relative">
				<h2 class="font-['Permanent_Marker'] text-3xl sm:text-5xl md:text-6xl text-[#2f2f2e] mb-2"> <span class="font-['Permanent_Marker']">Editor's Pics</span></h2>
				<span class="font-['Caveat'] text-[#ba0013] text-xl sm:text-3xl absolute" style="bottom:-1.2rem;left:0.3rem;transform:rotate(-2deg)">The Signature Icons</span>
			</div>
			<div class="text-right hidden sm:block">
				<span class="font-['Be_Vietnam_Pro'] text-xs uppercase tracking-[0.3em] text-[#afadac] block mb-1">Authentic Selection</span>
				<span class="font-['Be_Vietnam_Pro'] text-sm font-bold text-[#2f2f2e]">CATALOG NO. 24.03</span>
			</div>
		</div>

		<!-- Mobile: photobooth collage style -->
		<div class="sm:hidden flex flex-col gap-4 mt-8">
			<!-- Featured photo full width -->
			<div class="relative group reveal">
				<div class="bg-white p-3 shadow-2xl border border-[#afadac]/10 relative overflow-hidden">
					<img src={editorPicks[0].img} alt={editorPicks[0].name} class="w-full h-auto object-cover" style="aspect-ratio:4/3;" />
					<div class="mt-4 border-t border-dashed border-[#afadac]/20 pt-3">
						<div class="flex justify-between items-start mb-2">
							<h3 class="font-['Permanent_Marker'] text-[#ba0013] text-lg uppercase leading-tight max-w-[60%]">{editorPicks[0].name}</h3>
							<span class="font-['Epilogue'] font-black text-[#2f2f2e] text-sm bg-[#f9f6f5] px-2 py-1">{editorPicks[0].price}</span>
						</div>
						<p class="font-['Plus_Jakarta_Sans'] text-[#5c5b5b] text-[11px] leading-relaxed">{editorPicks[0].desc}</p>
					</div>
					<div class="absolute top-5 left-5 bg-[#ba0013] text-white px-2 py-1 font-['Permanent_Marker'] text-[10px] -rotate-6 shadow-xl">BEST SELLER</div>
				</div>
			</div>
			<!-- 2 remaining photos in a row -->
			<div class="grid grid-cols-2 gap-3">
				{#each editorPicks.slice(1) as pick, i}
					<div class="relative reveal" style="animation-delay: {i * 150}ms">
						<div class="bg-white p-2 shadow-xl border border-[#afadac]/10 h-full flex flex-col justify-between">
							<img src={pick.img} alt={pick.name} class="w-full h-auto object-cover drop-shadow-sm" style="aspect-ratio:1/1;" />
							<div class="mt-2 text-center border-t border-dashed border-[#afadac]/10 pt-1.5 flex-1 flex flex-col justify-end">
								<p class="font-['Permanent_Marker'] text-[#2f2f2e] text-[10px] uppercase truncate">{pick.name}</p>
								<p class="font-['Epilogue'] font-black text-[#ba0013] text-[9px] mt-0.5">{pick.price}</p>
							</div>
						</div>
						{#if i === 0}
							<div class="absolute top-3 right-3 bg-[#2f2f2e] text-white px-1.5 py-0.5 font-bold text-[7px] rotate-3 shadow uppercase font-['Epilogue'] tracking-widest">Seasonal</div>
						{:else}
							<div class="absolute top-0 -left-1 font-['Caveat'] text-[#ba0013] text-xl -rotate-12 drop-shadow-sm">Must Try!</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Desktop: original grid layout -->
		<div class="hidden sm:grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
			<div class="md:col-span-7 group relative reveal">
				<div class="relative bg-white overflow-hidden editorial-shadow rounded-sm">
					<img
						src={editorPicks[0].img}
						alt={editorPicks[0].name}
						class="w-full object-cover transition-all duration-1000 group-hover:scale-105"
						style="aspect-ratio:4/3;filter:grayscale(0.2)"
						onmouseenter={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
						onmouseleave={(e) => e.currentTarget.style.filter = 'grayscale(0.2)'}
					/>
					<div class="absolute top-6 left-6 bg-[#ba0013] text-white px-6 py-2 font-black text-sm -rotate-6 shadow-xl z-10 font-['Epilogue']">BEST SELLER</div>
				</div>
				<div class="pt-10">
					<div class="flex justify-between items-baseline mb-4">
						<h3 class="font-['Permanent_Marker'] text-4xl italic uppercase flex items-center gap-3 text-[#2f2f2e]">
							{editorPicks[0].name}
							<span class="material-symbols-outlined text-[#ba0013] text-2xl select-none" style="font-variation-settings:'FILL' 1">restaurant</span>
						</h3>
						<span class="font-['Epilogue'] font-black text-[#ba0013] text-3xl">{editorPicks[0].price}</span>
					</div>
					<p class="text-[#5d5b57] text-lg leading-relaxed max-w-xl font-light font-['Plus_Jakarta_Sans']">{editorPicks[0].desc}</p>
				</div>
			</div>
			<div class="md:col-span-5 flex flex-col gap-20">
				{#each editorPicks.slice(1) as pick, i}
					<div class="group reveal">
						<div class="relative h-80 overflow-hidden mb-8 editorial-shadow rounded-sm">
							<img src={pick.img} alt={pick.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
							{#if i === 0}
								<div class="absolute top-6 right-6 bg-[#2f2f2e] text-[#f9f6f5] px-5 py-1.5 font-bold text-xs rotate-3 shadow-lg z-10 uppercase tracking-widest font-['Epilogue']">Seasonal</div>
							{:else}
								<div class="absolute -top-6 -left-6 font-['Caveat'] text-[#ba0013] text-5xl rotate-12 drop-shadow-sm z-10">Must Try!</div>
							{/if}
						</div>
						<div class="flex justify-between items-center px-2">
							<h3 class="font-['Permanent_Marker'] text-2xl uppercase flex items-center gap-2 text-[#2f2f2e]">
								{pick.name}
								<span class="material-symbols-outlined text-[#ba0013] text-lg select-none">{i === 0 ? 'local_fire_department' : 'favorite'}</span>
							</h3>
							<span class="font-['Epilogue'] font-bold text-[#ba0013] text-xl">{pick.price}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══ TOP 3 LIQUID ART ══════════════════════════ -->
	<section class="px-4 sm:px-8 mb-16 sm:mb-40 max-w-7xl mx-auto">
		<div class="flex flex-col items-center mb-10 sm:mb-24 reveal">
			<h2 class="font-['Permanent_Marker'] text-4xl sm:text-6xl md:text-7xl text-[#2f2f2e] mb-3 text-center tracking-tight"> <span class="font-['Permanent_Marker']">Top 3 Liquid Art</span></h2>
			<span class="font-['Caveat'] text-[#ba0013] text-2xl sm:text-4xl italic">Our most ordered drafts</span>
		</div>
		<!-- Mobile: horizontal scroll -->
		<div class="sm:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
			{#each topDrinks as drink}
				<div class="flex-none w-64 snap-start group relative rounded-2xl overflow-hidden editorial-shadow bg-[#e4e2e1] reveal" style="aspect-ratio:3/4">
					<img src={drink.img} alt={drink.name} class="w-full h-full object-cover" />
					<div class="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
						<h3 class="font-['Permanent_Marker'] text-2xl text-white uppercase mb-1">{drink.name}</h3>
						<p class="text-white/70 font-['Be_Vietnam_Pro'] text-xs uppercase tracking-[0.2em]">{drink.sub}</p>
					</div>
				</div>
			{/each}
		</div>
		<!-- Desktop: original grid -->
		<div class="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-14">
			{#each topDrinks as drink, i}
				<div class="group relative {drink.offset} reveal">
					<div class="relative rounded-[2rem] overflow-hidden editorial-shadow bg-[#e4e2e1] transition-transform duration-500 group-hover:-translate-y-4" style="aspect-ratio:4/5">
						<img src={drink.img} alt={drink.name} class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
						<div class="absolute inset-0 pointer-events-none p-8">
							<svg class="w-full h-full opacity-60" fill="none" viewBox="0 0 400 500">
								{#if i === 0}
									<path class="doodle-path" d="M80 120 Q150 40 220 120 T360 120" stroke="white" stroke-linecap="round" stroke-width="2.5"></path>
									<circle cx="340" cy="60" fill="white" opacity="0.8" r="6"></circle>
								{:else if i === 1}
									<path class="doodle-path" d="M100 450 Q200 480 300 450" stroke="white" stroke-dasharray="12 12" stroke-width="3"></path>
									<circle cx="200" cy="250" opacity="0.3" r="120" stroke="white" stroke-dasharray="2 8" stroke-width="1"></circle>
								{:else}
									<path d="M320 280 L350 250 M350 280 L320 250" stroke="white" stroke-width="3"></path>
									<path d="M40 40 C100 100 100 200 40 260" opacity="0.4" stroke="white" stroke-width="1.5"></path>
								{/if}
							</svg>
						</div>
						<div class="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
							<h3 class="font-['Permanent_Marker'] text-4xl text-white uppercase mb-1">{drink.name}</h3>
							<p class="text-white/70 font-['Be_Vietnam_Pro'] text-xs uppercase tracking-[0.3em]">{drink.sub}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- ═══ THE CANVAS SECTIONS (Full Menu Grid) ══════ -->
	<section class="bg-[#2f2f2e] py-12 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
		<div class="max-w-7xl mx-auto relative z-10">
			<h2 class="font-['Permanent_Marker'] text-3xl sm:text-5xl md:text-7xl text-center mb-8 sm:mb-28 text-[#f9f6f5] tracking-tighter reveal"> <span class="font-['Permanent_Marker'] text-[#ba0013]">The Canvas Sections</span></h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-12">

				<!-- SIPS -->
				<div class="bg-[#f9f6f5] p-5 sm:p-12 relative editorial-shadow border-t-8 border-[#ba0013] rounded-sm reveal">
					<div class="flex items-center justify-between mb-6 sm:mb-14">
						<h3 class="font-['Permanent_Marker'] text-3xl sm:text-5xl uppercase tracking-tighter text-[#2f2f2e]">Sips</h3>
						<span class="material-symbols-outlined text-[#ba0013] text-3xl sm:text-5xl select-none">local_cafe</span>
					</div>
					<div class="space-y-6 sm:space-y-12">
						{#each Object.entries(sipsMenu) as [cat, items], ci}
							<div>
								<h4 class="font-bold text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-6 flex items-center gap-2 font-['Be_Vietnam_Pro']" class:text-[#787676]={ci===0} class:text-[#ba0013]={ci===1}>
									{cat}
									{#if ci === 0}<span class="material-symbols-outlined text-[10px] text-[#ba0013] select-none">bolt</span>{/if}
									{#if ci === 1}<span class="material-symbols-outlined text-xs animate-pulse select-none">star</span>{/if}
								</h4>
								<ul class="space-y-3 sm:space-y-6">
									{#each items as item}
										<li class="flex justify-between border-b border-[#afadac]/20 pb-2 sm:pb-3 group cursor-default">
											<span class="font-bold group-hover:text-[#ba0013] transition-colors font-['Plus_Jakarta_Sans'] flex items-center gap-2 text-sm sm:text-base">
												{item.name}
												{#if item.fave}<span class="material-symbols-outlined text-[#ba0013] text-sm select-none" style="font-variation-settings:'FILL' 1">favorite</span>{/if}
											</span>
											<span class="font-['Epilogue'] font-black text-[#ba0013] text-sm sm:text-base">{item.price}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
					<div class="mt-6 sm:mt-14 pt-4 sm:pt-8 border-t border-dashed border-[#afadac]">
						<span class="font-['Caveat'] text-[#5d5b57] italic text-lg sm:text-2xl opacity-70">Single origin beans from Ijen Crater.</span>
					</div>
				</div>

				<!-- BITES -->
				<div class="bg-[#f9f6f5] p-5 sm:p-12 relative editorial-shadow border-t-8 border-[#2f2f2e] rounded-sm reveal">
					<div class="flex items-center justify-between mb-6 sm:mb-14">
						<h3 class="font-['Permanent_Marker'] text-3xl sm:text-5xl uppercase tracking-tighter text-[#2f2f2e]">Bites</h3>
						<span class="material-symbols-outlined text-[#2f2f2e] text-3xl sm:text-5xl select-none">restaurant</span>
					</div>
					<div class="space-y-6 sm:space-y-12">
						{#each Object.entries(bitesMenu) as [cat, items]}
							<div>
								<h4 class="font-bold text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#787676] mb-3 sm:mb-6 font-['Be_Vietnam_Pro']">{cat}</h4>
								<ul class="space-y-3 sm:space-y-6">
									{#each items as item}
										<li class="flex justify-between border-b border-[#afadac]/20 pb-2 sm:pb-3 group cursor-default">
											<span class="font-bold font-['Plus_Jakarta_Sans'] flex items-center gap-2 text-sm sm:text-base">
												{item.name}
												{#if item.star}<span class="material-symbols-outlined text-yellow-600 text-sm select-none" style="font-variation-settings:'FILL' 1">stars</span>{/if}
											</span>
											<span class="font-['Epilogue'] font-black text-[#ba0013] text-sm sm:text-base">{item.price}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
					<div class="mt-6 sm:mt-14 text-center">
						<button class="inline-block border-2 border-[#ba0013]/20 hover:border-[#ba0013]/60 transition-colors rounded-full px-6 sm:px-8 py-2 sm:py-3 hover:scale-105 transform">
							<span class="font-['Permanent_Marker'] text-[#ba0013] text-sm uppercase tracking-widest">Ask for Specials</span>
						</button>
					</div>
				</div>

				<!-- SWEETS -->
				<div class="bg-[#f9f6f5] p-5 sm:p-12 relative editorial-shadow border-t-8 border-[#ba0013] rounded-sm reveal">
					<div class="flex items-center justify-between mb-6 sm:mb-14">
						<h3 class="font-['Permanent_Marker'] text-3xl sm:text-5xl uppercase tracking-tighter text-[#2f2f2e]">Sweets</h3>
						<span class="material-symbols-outlined text-[#ba0013] text-3xl sm:text-5xl select-none">bakery_dining</span>
					</div>
					<div class="space-y-6 sm:space-y-12">
						{#each Object.entries(sweetsMenu) as [cat, items]}
							<div>
								<h4 class="font-bold text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#787676] mb-3 sm:mb-6 font-['Be_Vietnam_Pro']">{cat}</h4>
								<ul class="space-y-3 sm:space-y-6">
									{#each items as item}
										<li class="flex justify-between border-b border-[#afadac]/20 pb-2 sm:pb-3 group cursor-default">
											<span class="font-bold font-['Plus_Jakarta_Sans'] flex items-center gap-2 text-sm sm:text-base">
												{item.name}
												{#if item.popular}<span class="text-[9px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-black">POPULAR</span>{/if}
												{#if item.fave}<span class="material-symbols-outlined text-[#ba0013] text-sm select-none" style="font-variation-settings:'FILL' 1">favorite</span>{/if}
											</span>
											<span class="font-['Epilogue'] font-black text-[#ba0013] text-sm sm:text-base">{item.price}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
					<div class="mt-6 sm:mt-14 flex justify-center">
						<span class="font-['Caveat'] text-[#ba0013] text-3xl sm:text-4xl drop-shadow-sm" style="transform:rotate(6deg);display:inline-block">A sweet finale.</span>
					</div>
				</div>

			</div>
		</div>
	</section>

	<!-- ═══ FESTIVE HAPPENINGS ════════════════════════ -->
	<section id="happenings" class="py-12 sm:py-40 px-4 sm:px-8 max-w-7xl mx-auto">
		<h2 class="font-['Permanent_Marker'] text-3xl sm:text-5xl md:text-7xl mb-10 sm:mb-24 text-[#2f2f2e] text-center tracking-tight reveal"> <span class="font-['Permanent_Marker'] text-[#ba0013]">Festive Happenings</span></h2>
		<!-- Mobile: horizontal scroll cards -->
		<div class="sm:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
			{#each happenings as h, i}
				<div class="flex-none w-72 snap-start group relative overflow-hidden h-80 rounded-3xl editorial-shadow" style="background:{h.bg}">
					<img src={h.img} alt={h.title} class="absolute inset-0 w-full h-full object-cover opacity-50" style="mix-blend-mode:{i===0?'overlay':'normal'}" />
					<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
					<div class="absolute top-5 right-5 rotate-12">
						<span class="material-symbols-outlined text-3xl {h.iconColor} select-none" style="font-variation-settings:'FILL' 1">{h.icon}</span>
					</div>
					<div class="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white">
						<span class="font-['Caveat'] text-xl mb-1 italic {h.accentColor}">{h.sub}</span>
						<h3 class="font-['Permanent_Marker'] text-3xl mb-2 uppercase tracking-tight">{h.title}</h3>
						<p class="font-['Epilogue'] text-xs uppercase tracking-[0.15em] font-bold text-white/80 mb-3">{h.desc}</p>
						<button class="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-2 font-black text-xs uppercase tracking-widest rounded-full">{h.cta}</button>
					</div>
				</div>
			{/each}
		</div>
		<!-- Desktop: original grid -->
		<div class="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-10">
			{#each happenings as h, i}
				<div class="group relative overflow-hidden h-[500px] rounded-[2.5rem] editorial-shadow transition-all duration-500 hover:-translate-y-2 reveal" style="background:{h.bg}">
					<img src={h.img} alt={h.title} class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[3s]" style="mix-blend-mode:{i===0?'overlay':'normal'}" />
					<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
					<div class="absolute top-10 right-12 rotate-12 opacity-90 z-20">
						<span class="material-symbols-outlined text-5xl {h.iconColor} select-none" style="font-variation-settings:'FILL' 1">{h.icon}</span>
					</div>
					<div class="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white z-10">
						<span class="font-['Caveat'] text-3xl mb-2 italic {h.accentColor}">{h.sub}</span>
						<h3 class="font-['Permanent_Marker'] text-5xl mb-6 uppercase tracking-tight">{h.title}</h3>
						<p class="font-['Epilogue'] text-lg uppercase tracking-[0.2em] font-bold text-white/90">{h.desc}</p>
						{#if i===0}
							<button class="mt-10 bg-white text-[#ba0013] px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-[#f3f0ef] transition-all rounded-full shadow-2xl">{h.cta}</button>
						{:else if i===1}
							<button class="mt-10 border-2 border-white/50 text-white px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#2f2f2e] transition-all rounded-full backdrop-blur-md">{h.cta}</button>
						{:else}
							<button class="mt-10 bg-yellow-600 text-white px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-yellow-500 transition-all rounded-full shadow-2xl active:scale-95">{h.cta}</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

</main>

<!-- ═══ FOOTER ══════════════════════════════════════ -->
<footer class="bg-[#0e0e0e] text-[#f9f6f5] py-12 sm:py-28 px-4 sm:px-10 relative overflow-hidden">
	<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-24 relative z-10">
		<div>
			<h2 class="font-['Permanent_Marker'] text-4xl sm:text-7xl text-[#ba0013] mb-6 sm:mb-10 tracking-tighter">Join the Club</h2>
			<p class="font-['Plus_Jakarta_Sans'] text-[#e4e2e1]/60 text-base sm:text-xl mb-8 sm:mb-14 max-w-md leading-relaxed">
				Get exclusive invites to our secret menu launches, artist collaboration nights, and community pop-ups.
			</p>
			<form class="flex gap-3 max-w-md">
				<input
					type="email"
					placeholder="Your email..."
					class="flex-1 bg-white/5 border-0 border-b-2 border-white/20 focus:border-[#ba0013] focus:ring-0 text-[#f9f6f5] placeholder-white/20 font-['Epilogue'] italic py-3 sm:py-5 text-sm sm:text-lg outline-none transition-all"
				/>
				<button class="bg-[#ba0013] text-white px-6 sm:px-12 py-3 font-black uppercase tracking-widest hover:translate-x-1 transition-transform shadow-lg font-['Epilogue'] text-sm">In</button>
			</form>
			<div class="mt-10 sm:mt-24 text-[10px] font-['Be_Vietnam_Pro'] opacity-30 uppercase tracking-[0.4em]">
				© 2024 KAHII URBAN CANVAS. ALL RIGHTS RESERVED.
			</div>
		</div>
		<div class="grid grid-cols-2 gap-8 sm:gap-16">
			<div class="flex flex-col gap-6 sm:gap-10">
				<h4 class="font-['Permanent_Marker'] text-2xl sm:text-4xl text-[#f9f6f5] uppercase tracking-tight">Canvas</h4>
				<nav class="flex flex-col gap-4 sm:gap-7 font-['Epilogue'] text-sm uppercase tracking-tighter opacity-60">
					<a href="/menu" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">Menu Book</a>
					<a href="#" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">Gifts Shop</a>
					<a href="#happenings" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">Event Space</a>
					<a href="/#gallery" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">The Journal</a>
				</nav>
			</div>
			<div class="flex flex-col gap-6 sm:gap-10">
				<h4 class="font-['Permanent_Marker'] text-2xl sm:text-4xl text-[#f9f6f5] uppercase tracking-tight">Connect</h4>
				<nav class="flex flex-col gap-4 sm:gap-7 font-['Epilogue'] text-sm uppercase tracking-tighter opacity-60">
					<a href="https://instagram.com/kahii.id" target="_blank" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">Instagram</a>
					<a href="#" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">TikTok</a>
					<a href="#" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">Spotify</a>
					<a href="https://wa.me/6281234567890" target="_blank" class="hover:text-[#ba0013] hover:translate-x-2 transition-all">WhatsApp</a>
				</nav>
			</div>
		</div>
	</div>
</footer>

<!-- Mobile Bottom Nav -->
<div class="sm:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-[#f9f6f5] to-transparent">
	<div class="bg-[#f9f6f5]/95 backdrop-blur-2xl rounded-full h-14 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/30 px-3">
		<a href="/" class="flex flex-col items-center justify-center text-[#2f2f2e]/40 hover:text-[#ba0013] transition-colors gap-0.5">
			<span class="material-symbols-outlined select-none text-xl">home</span>
			<span class="text-[8px] font-black uppercase">Home</span>
		</a>
		<a href="/menu" class="flex flex-col items-center justify-center text-[#ba0013] bg-[#ba0013]/10 rounded-full px-5 py-2 gap-0.5">
			<span class="material-symbols-outlined select-none text-xl" style="font-variation-settings:'FILL' 1">restaurant_menu</span>
			<span class="text-[8px] font-black uppercase">Menu</span>
		</a>
		<a href="#happenings" class="flex flex-col items-center justify-center text-[#2f2f2e]/40 hover:text-[#ba0013] transition-colors gap-0.5">
			<span class="material-symbols-outlined select-none text-xl">loyalty</span>
			<span class="text-[8px] font-black uppercase">Promos</span>
		</a>
		<a href="/#reservation" class="flex flex-col items-center justify-center text-[#2f2f2e]/40 hover:text-[#ba0013] transition-colors gap-0.5">
			<span class="material-symbols-outlined select-none text-xl">person</span>
			<span class="text-[8px] font-black uppercase">Club</span>
		</a>
	</div>
</div>
