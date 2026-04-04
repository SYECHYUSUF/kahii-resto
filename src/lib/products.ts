export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: 'Coffee' | 'Dessert' | 'Bites';
	image: string;
}

export const products: Product[] = [
	{
		id: 'kahii-signature-latte',
		name: 'Kahii Signature Latte',
		description: 'Our house special latte with a secret blend of beans and creamy milk.',
		price: 35000,
		category: 'Coffee',
		image:
			'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?cs=srgb&dl=pexels-tyler-nix-1259808-2396220.jpg&fm=jpg'
	},
	{
		id: 'kahii-umm-ali',
		name: "KAHII's Umm Ali",
		description: 'Authentic Egyptian bread pudding, rich, creamy and topped with nuts.',
		price: 45000,
		category: 'Dessert',
		image:
			'https://imgs.search.brave.com/LBPPGBAgDFMAH1qbt_3nAs2UGrf3hkRUZK0RKC9vjKc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEzLzQ2Lzg1Lzg2/LzM2MF9GXzEzNDY4/NTg2NTVfNllRREp4/UWhRNG9HeWNPaEVh/cVFnY0VZZzJtWmFV/VUsuanBn'
	},
	{
		id: 'croissant-classic',
		name: 'Classic Butter Croissant',
		description: 'Flaky, buttery, and golden brown. Perfect with your morning coffee.',
		price: 25000,
		category: 'Bites',
		image:
			'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'flat-white',
		name: 'Flat White',
		description: 'A smooth and velvety espresso-based drink with micro-foam.',
		price: 32000,
		category: 'Coffee',
		image:
			'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'brownie-fudge',
		name: 'Fudge Brownie',
		description: 'Rich, chocolatey, and gooey brownie served warm.',
		price: 28000,
		category: 'Dessert',
		image:
			'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'iced-americano',
		name: 'Iced Americano',
		description: 'Double shot of espresso over ice and water for a refreshing kick.',
		price: 28000,
		category: 'Coffee',
		image:
			'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop'
	},

	{
		id: 'pain-au-chocolat',
		name: 'Pain au Chocolat',
		description: 'Classic French pastry filled with premium dark chocolate.',
		price: 28000,
		category: 'Bites',
		image:
			'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=600&auto=format&fit=crop'
	},

	{
		id: 'matcha-latte',
		name: 'Ceremonial Matcha Latte',
		description: 'High-quality Japanese matcha whisked with creamy milk.',
		price: 38000,
		category: 'Coffee',
		image:
			'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'tiramisu',
		name: 'Espresso Tiramisu',
		description: 'Layers of coffee-soaked ladyfingers and mascarpone cream.',
		price: 48000,
		category: 'Dessert',
		image:
			'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'cappuccino-classic',
		name: 'Classic Cappuccino',
		description: 'Equal parts espresso, steamed milk, and airy foam.',
		price: 32000,
		category: 'Coffee',
		image:
			'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'almond-croissant',
		name: 'Almond Croissant',
		description: 'Double baked croissant filled with almond cream and topped with sliced almonds.',
		price: 32000,
		category: 'Bites',
		image:
			'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'red-velvet-cake',
		name: 'Red Velvet Cake',
		description: 'Classic red velvet layers with smooth cream cheese frosting.',
		price: 42000,
		category: 'Dessert',
		image:
			'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600&auto=format&fit=crop'
	},
	{
		id: 'nachos-supreme',
		name: 'Kahii Nachos Supreme',
		description: 'Loaded nachos with cheese sauce, jalapenos, and minced beef.',
		price: 55000,
		category: 'Bites',
		image:
			'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=600&auto=format&fit=crop'
	}
];
