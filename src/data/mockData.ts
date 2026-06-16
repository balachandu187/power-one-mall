export interface Store {
  id: string;
  name: string;
  category: 'Fashion' | 'Electronics' | 'Beauty' | 'Lifestyle' | 'Food' | 'Services' | 'Entertainment';
  floor: 'Ground Floor' | 'First Floor' | 'Second Floor' | 'Third Floor';
  description: string;
  openStatus: 'Open Now' | 'Closed' | 'Opening Soon';
  hours: string;
  logo: string;
  image: string;
  phone: string;
  featured: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  logo: string;
  image: string;
  rating: number;
  featured: boolean;
  popularDishes: string[];
  contact: string;
}

export interface Dish {
  id: string;
  name: string;
  restaurant: string;
  price: string;
  image: string;
  category: 'Vegetarian' | 'Non-Vegetarian' | 'Beverages' | 'Dessert';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  ctaText: string;
  registrationOpen: boolean;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  language: string;
  rating: string;
  poster: string;
  showTimings: string[];
  synopsis: string;
}

export interface Offer {
  id: string;
  title: string;
  discount: string;
  store: string;
  category: string;
  image: string;
  validUntil: string;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  role: string;
  rating: number;
}

export const STORES_DATA: Store[] = [
  {
    id: 's1',
    name: 'Zara',
    category: 'Fashion',
    floor: 'Ground Floor',
    description: 'Spanish multi-national retail clothing chain specializing in fast fashion, premium apparel, and accessories.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 10:00 PM',
    logo: 'ZARA',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691101',
    featured: true,
  },
  {
    id: 's2',
    name: 'Reliance Digital',
    category: 'Electronics',
    floor: 'First Floor',
    description: 'India\'s leading electronics retailer offering consumer durables, IT, telecommunications, and home appliances.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 9:30 PM',
    logo: 'RD',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691102',
    featured: true,
  },
  {
    id: 's3',
    name: 'Sephora',
    category: 'Beauty',
    floor: 'Ground Floor',
    description: 'Premium French multinational retailer of personal care and beauty products with global luxury brands.',
    openStatus: 'Open Now',
    hours: '11:00 AM - 10:00 PM',
    logo: 'SEPHORA',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691103',
    featured: true,
  },
  {
    id: 's4',
    name: 'H&M',
    category: 'Fashion',
    floor: 'Ground Floor',
    description: 'Swedish multinational clothing-retail company known for its fast-fashion clothing for men, women, teenagers, and children.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 10:00 PM',
    logo: 'H&M',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691104',
    featured: true,
  },
  {
    id: 's5',
    name: 'Lifestyle',
    category: 'Fashion',
    floor: 'First Floor',
    description: 'One-stop shop for the latest fashion trends, cosmetics, footwear, and accessories from leading national and international brands.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 10:00 PM',
    logo: 'LIFESTYLE',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691105',
    featured: true,
  },
  {
    id: 's6',
    name: 'Home Centre',
    category: 'Lifestyle',
    floor: 'Second Floor',
    description: 'A leading destination for premium home furniture, decor, soft furnishings, and kitchenware.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 9:30 PM',
    logo: 'HC',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691106',
    featured: true,
  },
  {
    id: 's7',
    name: 'Westside',
    category: 'Fashion',
    floor: 'First Floor',
    description: 'Tata Group\'s premier retail chain offering contemporary, high-quality fashion apparel, footwear, and home decor.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 10:00 PM',
    logo: 'WESTSIDE',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691107',
    featured: true,
  },
  {
    id: 's8',
    name: 'Apple Unicorn',
    category: 'Electronics',
    floor: 'Ground Floor',
    description: 'Apple Premium Reseller providing the full range of Apple products, expert service, and authorized support.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 10:00 PM',
    logo: 'UNICORN',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691108',
    featured: true,
  },
  // Extra stores for the directory
  {
    id: 's9',
    name: 'Inox Movies',
    category: 'Entertainment',
    floor: 'Third Floor',
    description: 'PVR INOX premium multiplex cinema featuring state-of-the-art projection, Dolby Atmos sound, and luxury seating.',
    openStatus: 'Open Now',
    hours: '9:00 AM - 11:30 PM',
    logo: 'INOX',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691109',
    featured: false,
  },
  {
    id: 's10',
    name: 'Suhana Salon & Spa',
    category: 'Services',
    floor: 'Second Floor',
    description: 'Indulge in luxury hair styling, rejuvenation spa therapy, facials, and premium bridal makeup.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 8:30 PM',
    logo: 'SUHANA',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691110',
    featured: false,
  },
  {
    id: 's11',
    name: 'Adidas',
    category: 'Fashion',
    floor: 'First Floor',
    description: 'Global sports brand offering athletic footwear, clothing, and accessories designed for training and lifestyle.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 9:30 PM',
    logo: 'ADIDAS',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691111',
    featured: false,
  },
  {
    id: 's12',
    name: 'Mac Cosmetics',
    category: 'Beauty',
    floor: 'Ground Floor',
    description: 'Professional-grade cosmetics, makeup products, and accessories curated by expert makeup artists.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 9:30 PM',
    logo: 'MAC',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691112',
    featured: false,
  },
  {
    id: 's13',
    name: 'Decathlon',
    category: 'Lifestyle',
    floor: 'Second Floor',
    description: 'French sports equipment retailer offering gears and apparel for over 60+ sports under one roof.',
    openStatus: 'Open Now',
    hours: '10:00 AM - 10:00 PM',
    logo: 'DECATHLON',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691113',
    featured: false,
  },
  {
    id: 's14',
    name: 'Timezone',
    category: 'Entertainment',
    floor: 'Third Floor',
    description: 'Premium family entertainment center with state-of-the-art arcade games, virtual reality rides, and prize shops.',
    openStatus: 'Open Now',
    hours: '11:00 AM - 10:00 PM',
    logo: 'TIMEZONE',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691114',
    featured: false,
  },
  {
    id: 's15',
    name: 'Starbucks',
    category: 'Food',
    floor: 'Ground Floor',
    description: 'Seattle-based coffeehouse chain known for its signature roasts, light bites, and WiFi-connected spaces.',
    openStatus: 'Open Now',
    hours: '8:00 AM - 11:00 PM',
    logo: 'STARBUCKS',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
    phone: '+91 866 6691115',
    featured: false,
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'r1',
    name: 'South Spice',
    cuisine: 'South Indian & Andhra Specials',
    description: 'Experience the authentic, rich spices of Andhra cuisine. Renowned for its traditional thalis, spicy biryanis, and crispy dosas.',
    logo: 'SS',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    featured: true,
    popularDishes: ['Andhra Special Meals', 'Nellore Chepala Pulusu', 'Ghee Roast Dosa', 'Hyderabadi Chicken Biryani'],
    contact: '+91 866 6692101',
  },
  {
    id: 'r2',
    name: 'Burger Hub',
    cuisine: 'Gourmet Burgers & Fries',
    description: 'Juicy, flame-grilled burgers made with premium ingredients, fresh artisan buns, and signature homemade sauces.',
    logo: 'BH',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    featured: true,
    popularDishes: ['Triple Cheese Crunch Burger', 'Spicy Volcano Chicken Burger', 'Loaded Peri-Peri Fries', 'Monster Veggie Burger'],
    contact: '+91 866 6692102',
  },
  {
    id: 'r3',
    name: 'Pizza Corner',
    cuisine: 'Artisanal Italian Pizzas',
    description: 'Freshly tossed wood-fired pizzas loaded with fresh mozzarella, authentic Italian herbs, and premium toppings.',
    logo: 'PC',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    featured: true,
    popularDishes: ['Paneer Tikka Passion Pizza', 'Classic Margherita', 'Supreme Chicken Delight', 'Garlic Bread Stuffed'],
    contact: '+91 866 6692103',
  },
  {
    id: 'r4',
    name: 'Chinese Wok',
    cuisine: 'Indo-Chinese Fusion',
    description: 'A hot stir-fry experience. Choose your base, sauces, and proteins customized and wok-tossed in front of you.',
    logo: 'CW',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    featured: true,
    popularDishes: ['Schezwan Fried Rice', 'Chilli Chicken Dry', 'Veg Hakka Noodles', 'Manchurian Gravy'],
    contact: '+91 866 6692104',
  },
  {
    id: 'r5',
    name: 'Fresh Juice Bar',
    cuisine: 'Cold-pressed Juices & Smoothies',
    description: 'Healthy living made delicious. Serving freshly-squeezed cold-pressed juices, refreshing milkshakes, and wellness shots.',
    logo: 'FJ',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    featured: true,
    popularDishes: ['Mango Magic Smoothie', 'ABC Wellness Juice', 'Dry Fruit Shake', 'Avocado Protein Bowl'],
    contact: '+91 866 6692105',
  }
];

export const DISHES_DATA: Dish[] = [
  {
    id: 'd1',
    name: 'Andhra Special Meals',
    restaurant: 'South Spice',
    price: '₹220',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=400',
    category: 'Vegetarian',
  },
  {
    id: 'd2',
    name: 'Hyderabadi Chicken Biryani',
    restaurant: 'South Spice',
    price: '₹310',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400',
    category: 'Non-Vegetarian',
  },
  {
    id: 'd3',
    name: 'Triple Cheese Crunch Burger',
    restaurant: 'Burger Hub',
    price: '₹189',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=400',
    category: 'Non-Vegetarian',
  },
  {
    id: 'd4',
    name: 'Paneer Tikka Passion Pizza',
    restaurant: 'Pizza Corner',
    price: '₹349',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400',
    category: 'Vegetarian',
  },
  {
    id: 'd5',
    name: 'Schezwan Fried Rice & Manchurian Combo',
    restaurant: 'Chinese Wok',
    price: '₹249',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400',
    category: 'Vegetarian',
  },
  {
    id: 'd6',
    name: 'Mango Magic Smoothie',
    restaurant: 'Fresh Juice Bar',
    price: '₹140',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400',
    category: 'Beverages',
  }
];

export const EVENTS_DATA: Event[] = [
  {
    id: 'e1',
    title: 'Summer Sale Festival',
    date: 'June 20 - July 5, 2026',
    time: '10:00 AM - 10:00 PM',
    location: 'Central Atrium',
    description: 'Get ready for the biggest shopping bonanza in Vijayawada! Grab up to 50% discount on top international and national fashion brands, electronics, and home decor. Plus, get assured gift vouchers on shopping above ₹5,000.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'View Store Offers',
    registrationOpen: false,
  },
  {
    id: 'e2',
    title: 'Weekend Family Carnival',
    date: 'June 27 - June 28, 2026',
    time: '4:00 PM - 9:00 PM',
    location: 'Outdoor Plaza & Third Floor',
    description: 'A magical weekend for kids and families! Enjoy live puppet shows, magic performances, balloon sculpting, face painting, mascot meet-and-greets, and exciting game stalls with fabulous prizes.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Register Free Pass',
    registrationOpen: true,
  },
  {
    id: 'e3',
    title: 'Vijayawada Food Fest',
    date: 'July 10 - July 12, 2026',
    time: '12:00 PM - 10:00 PM',
    location: 'Food Court & Terrace Garden',
    description: 'Celebrate the rich culinary heritage of Andhra and global street food at the grand Food Fest! Taste special menus, watch live chef masterclasses, participate in eating competitions, and enjoy live unplugged music.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Register for Masterclass',
    registrationOpen: true,
  },
  {
    id: 'e4',
    title: 'Live Music Night with Local Bands',
    date: 'July 18, 2026',
    time: '6:30 PM Onwards',
    location: 'Main Amphitheatre',
    description: 'Set your mood right for the weekend with mesmerizing performances by Vijayawada\'s popular fusion band and acoustic artists. Experience Telugu hits, Bollywood chartbusters, and soft rock in a cozy outdoor setup.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Book Free Entry',
    registrationOpen: true,
  }
];

export const OFFERS_DATA: Offer[] = [
  {
    id: 'o1',
    title: 'Flat 30% Off On Summer Collection',
    discount: '30% OFF',
    store: 'Zara',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
    validUntil: 'Valid till June 30, 2026',
  },
  {
    id: 'o2',
    title: 'Get 10% Cash Back on HDFC Cards',
    discount: '10% CASHBACK',
    store: 'Reliance Digital',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600',
    validUntil: 'Valid till July 15, 2026',
  },
  {
    id: 'o3',
    title: 'Buy 2 Get 1 Free on Select Cosmetics',
    discount: 'BUY 2 GET 1',
    store: 'Sephora',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
    validUntil: 'Valid till July 05, 2026',
  },
  {
    id: 'o4',
    title: 'End of Season Sale - Up to 50% Off',
    discount: '50% OFF',
    store: 'H&M',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=600',
    validUntil: 'Valid till July 10, 2026',
  }
];

export const MOVIES_DATA: Movie[] = [
  {
    id: 'm1',
    title: 'Dragon',
    genre: 'Action, Sci-Fi, Thriller',
    duration: '2h 45m',
    language: 'Telugu, Hindi, Tamil',
    rating: 'UA',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    showTimings: ['10:45 AM', '2:00 PM', '6:15 PM', '9:45 PM'],
    synopsis: 'A highly anticipated high-octane action thriller starring NTR Jr., presenting an immersive world of grit, survival, and combat in an epic futuristic landscape.',
  },
  {
    id: 'm2',
    title: 'The Raja Saab',
    genre: 'Horror, Comedy, Romance',
    duration: '2h 52m',
    language: 'Telugu, Hindi, Tamil, Malayalam',
    rating: 'UA',
    poster: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600',
    showTimings: ['11:00 AM', '3:00 PM', '7:00 PM', '10:30 PM'],
    synopsis: 'A grand mass entertainer starring Prabhas in a stylish new avatar, blending spine-chilling horror and side-splitting comedy with a charming romance story.',
  },
  {
    id: 'm3',
    title: 'Toy Story 5',
    genre: 'Animation, Adventure, Comedy',
    duration: '1h 48m',
    language: 'English, Hindi, Telugu',
    rating: 'U',
    poster: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=600',
    showTimings: ['1:30 PM', '4:30 PM', '7:45 PM', '10:15 PM'],
    synopsis: 'Buzz, Woody, and the rest of the gang face a brand-new threat: electronic gadgets and tech toys that grab children\'s attention, leading them on a hilarious adventure.',
  },
  {
    id: 'm4',
    title: 'Lenin',
    genre: 'Action, Romance, Drama',
    duration: '2h 38m',
    language: 'Telugu, Tamil',
    rating: 'UA',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600',
    showTimings: ['10:00 AM', '1:45 PM', '5:30 PM', '9:15 PM'],
    synopsis: 'An intense romantic action drama charting the journey of a passionate young leader standing up for justice while navigating complex relationships and high-stakes family loyalty.',
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Suresh Kumar',
    review: 'Power One Mall is the best thing that happened to Vijayawada. Shopping options are top-notch and the multiplex cinema experience is outstanding! The parking is also extremely spacious.',
    role: 'Local Guide',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Pranathi Reddy',
    review: 'I love visiting the Food Court with my family on weekends. The options like South Spice and Burger Hub are brilliant. Air-conditioned seating is clean and the vibe is very premium.',
    role: 'Frequent Shopper',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Anjali Sharma',
    review: 'Finally, a destination in Vijayawada where I can find brands like Zara and Sephora under one roof. The mall events are very well organized. Highly recommend visiting during the festivals!',
    role: 'Fashion Blogger',
    rating: 4,
  }
];
