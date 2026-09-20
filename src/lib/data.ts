export type ServiceSeed = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  priceHint?: string;
  image: string;
  featured?: boolean;
  whatsapp: string;
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  hero: "/clean2.png",
  home: "/clean9.png",
  office: "/clean3.png",
  commercial: "/clean6.png",
  deep: "/clean7.png",
  move: "/clean11.png",
  post: img("photo-1504307651254-35680f356dfd"),
  carpet: img("photo-1600166898405-da9535204843"),
  sofa: img("photo-1555041469-a586c61ea9bc"),
  mattress: img("photo-1505693416388-ac5ce068fe85"),
  window: img("photo-1528740561666-dc2479dc08ab"),
  kitchen: img("photo-1556911220-bff31c812dba"),
  washroom: img("photo-1584622650111-993a426fbf0a"),
  airbnb: img("photo-1522708323590-d24dbb6b0267"),
  event: img("photo-1519167758481-83f550bb49b3"),
  team: "/clean10.png",
  sparkle: "/clean8.png",
};

export const services: ServiceSeed[] = [
  {
    name: "Residential Cleaning", slug: "residential-cleaning",
    shortDescription: "Routine and detailed home cleaning for apartments, houses and rentals.",
    description: "Our residential cleaning covers bedrooms, living areas, kitchens and washrooms — dusting, mopping, sanitising touch points and leaving every room fresh. Choose one-time, weekly, bi-weekly or monthly plans tailored to your home.",
    features: ["Bedrooms, living rooms & common areas", "Kitchen surfaces & floors", "Washroom deep-sanitisation", "Dusting, mopping & vacuuming", "Laundry & linen change on request"],
    priceHint: "From KSh 3,500 / visit", image: IMAGES.home, featured: true,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for residential cleaning.",
  },
  {
    name: "Office Cleaning", slug: "office-cleaning",
    shortDescription: "Scheduled cleaning that keeps offices presentable and productive.",
    description: "Daily, weekly or custom office cleaning: workstations, boardrooms, kitchens, washrooms and floors. Discreet teams, consistent checklists and supervisor spot-checks.",
    features: ["Workstations & boardrooms", "Kitchen & break areas", "Washroom servicing", "Floor care & waste management", "After-hours availability"],
    priceHint: "Custom site-based quote", image: IMAGES.office, featured: true,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for office cleaning.",
  },
  {
    name: "Commercial Cleaning", slug: "commercial-cleaning",
    shortDescription: "Cleaning for shops, institutions, warehouses, clinics and more.",
    description: "Safiluxe supports retail, hospitality, healthcare, education and industrial sites with contracted cleaning, consumable management and SLA-backed quality control.",
    features: ["Retail, clinics, schools & gyms", "Daily / weekly / monthly contracts", "Site assessments & SOPs", "Consumables & hygiene supplies", "Trained, supervised crews"],
    priceHint: "Custom site-based quote", image: IMAGES.commercial, featured: true,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like to discuss commercial cleaning services.",
  },
  {
    name: "Deep Cleaning", slug: "deep-cleaning",
    shortDescription: "Top-to-bottom intensive cleaning for heavily used spaces.",
    description: "A detailed, room-by-room deep clean: limescale, grout, skirting, windowsills, behind appliances and inside cabinets. Ideal quarterly or before special occasions.",
    features: ["Inside cabinets & wardrobes", "Grout, tiles & descaling", "Skirting, sills & fixtures", "Appliance detailing", "Balcony & utility areas"],
    priceHint: "From KSh 8,500", image: IMAGES.deep, featured: true,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for deep cleaning.",
  },
  {
    name: "Move-In / Move-Out Cleaning", slug: "move-in-move-out-cleaning",
    shortDescription: "Deposit-ready cleaning for tenants, landlords and managers.",
    description: "Empty-unit deep cleans that satisfy inventory checklists — cupboards, bathrooms, kitchens, floors and windows left ready for the next occupant.",
    features: ["Empty-unit deep clean", "Cupboards in & out", "Bathroom descaling", "Floor scrub & polish", "Window & sill wipe-down"],
    priceHint: "From KSh 7,000", image: IMAGES.move,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for move-in / move-out cleaning.",
  },
  {
    name: "Post-Construction Cleaning", slug: "post-construction-cleaning",
    shortDescription: "Dust, debris, paint and cement residue removal.",
    description: "Two-phase post-construction clean: rough clean (debris, stickers, cement) then fine clean (dust extraction, glass, polish) for handover-ready spaces.",
    features: ["Fine dust extraction", "Paint & cement spot removal", "Glass & frame cleaning", "Floor scrub & polish", "Handover checklist"],
    priceHint: "Site-based quote", image: IMAGES.post, featured: true,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for post-construction cleaning.",
  },
  {
    name: "Carpet Cleaning", slug: "carpet-cleaning",
    shortDescription: "Deep extraction, stain removal and deodorising.",
    description: "Hot-water extraction and professional spotting lift embedded dirt, allergens and stains from wall-to-wall carpets, rugs and office carpet tiles.",
    features: ["Deep extraction wash", "Stain & spot treatment", "Deodorising & sanitising", "Rugs & carpet tiles", "Quick-dry process"],
    priceHint: "From KSh 120 / sq.ft", image: IMAGES.carpet, featured: true,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for carpet cleaning.",
  },
  {
    name: "Sofa & Upholstery Cleaning", slug: "sofa-upholstery-cleaning",
    shortDescription: "Fabric-safe shampooing and stain care for sofas & chairs.",
    description: "pH-balanced shampooing and extraction for fabric sofas, dining chairs and office upholstery. Colour-safe, quick-dry and gentle on fibres.",
    features: ["Fabric assessment first", "Shampoo + extraction", "Stain treatment", "Deodorising", "Leather wipe & condition on request"],
    priceHint: "From KSh 1,500 / seat", image: IMAGES.sofa, featured: true,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for sofa cleaning.",
  },
  {
    name: "Mattress Cleaning", slug: "mattress-cleaning",
    shortDescription: "Deep mattress cleaning, stain removal and sanitisation.",
    description: "Vacuum extraction, stain treatment and sanitisation remove dust mites, sweat and odours for healthier sleep.",
    features: ["Deep vacuum extraction", "Stain & sweat treatment", "Sanitisation & deodorising", "All sizes: single to king", "Pillow & protector add-ons"],
    priceHint: "From KSh 2,500", image: IMAGES.mattress,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for mattress cleaning.",
  },
  {
    name: "Window Cleaning", slug: "window-cleaning",
    shortDescription: "Streak-free interior & exterior glass cleaning.",
    description: "Frames, sills and glass cleaned with pure-water and professional squeegee finish for homes, shops and low-rise offices.",
    features: ["Interior & exterior glass", "Frames & sills", "High-reach poles", "Shopfronts & partitions", "Post-construction glass"],
    priceHint: "From KSh 2,000", image: IMAGES.window,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for window cleaning.",
  },
  {
    name: "Kitchen Cleaning", slug: "kitchen-cleaning",
    shortDescription: "Degreasing, appliances, cabinets, surfaces & floors.",
    description: "Heavy degreasing of hobs, hoods, tiles and ovens plus cabinet wipe-downs and floor scrubs for homes and restaurants.",
    features: ["Degreasing & descaling", "Oven, hob & hood detailing", "Cabinets in & out", "Tiles & grout scrub", "Floor deep scrub"],
    priceHint: "From KSh 4,500", image: IMAGES.kitchen,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for kitchen cleaning.",
  },
  {
    name: "Washroom Cleaning & Sanitization", slug: "washroom-cleaning",
    shortDescription: "Hygienic toilet & washroom care for homes and businesses.",
    description: "Descaling, disinfection and odour control for WCs, showers, basins and high-touch surfaces using hospital-grade disinfectants.",
    features: ["Descaling & stain removal", "Disinfection of touch points", "Odour treatment", "Mirror & fixture polish", "Consumable refills"],
    priceHint: "From KSh 2,000", image: IMAGES.washroom,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for washroom cleaning.",
  },
  {
    name: "Airbnb Cleaning", slug: "airbnb-cleaning",
    shortDescription: "Fast-turnover cleans for short-stay hosts.",
    description: "Hotel-style turnovers: linen change, restocking, photos on request and same-day availability to protect your ratings.",
    features: ["Same-day turnovers", "Linen & towel change", "Restocking & staging", "Photo reports", "Check-in ready checklist"],
    priceHint: "From KSh 3,000 / turnover", image: IMAGES.airbnb,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for Airbnb cleaning.",
  },
  {
    name: "Event Cleaning", slug: "event-cleaning",
    shortDescription: "Before-event preparation and post-event clear-ups.",
    description: "Pre-event detailing and rapid post-event clear-ups for weddings, corporate events and private parties — waste, washrooms and floors handled.",
    features: ["Pre-event detailing", "On-call attendants", "Post-event clear-up", "Waste & recycling", "Washroom servicing"],
    priceHint: "Custom quote", image: IMAGES.event,
    whatsapp: "Hello Safiluxe Cleaning Solutions, I would like a quotation for event cleaning.",
  },
];

export const locations = [
  { name: "Nairobi", slug: "nairobi", description: "Full coverage: Westlands, Kilimani, Kileleshwa, Lavington, Karen, Langata, South B, South C, Embakasi, Kasarani, Ruaka surrounds, Gigiri, Muthaiga, Parklands and CBD.", featured: true },
  { name: "Kiambu", slug: "kiambu", description: "Kiambu town, Ruiru, Limuru, Banana, Ndumberi and surrounding estates.", featured: true },
  { name: "Thika", slug: "thika", description: "Thika town, Makongeni, Section 9, Landless, Gatitu and industrial zones.", featured: true },
  { name: "Kajiado", slug: "kajiado", description: "Kitengela, Ongata Rongai, Kiserian and Ngong.", featured: false },
  { name: "Machakos", slug: "machakos", description: "Athi River, Syokimau, Mlolongo and Machakos town.", featured: false },
  { name: "Nakuru", slug: "nakuru", description: "Nakuru city and environs — available on request for commercial contracts.", featured: false },
];

export const testimonialsSeed = [
  { customerName: "Wanjiku M.", location: "Kilimani, Nairobi", rating: 5, review: "Safiluxe deep-cleaned our 3-bedroom and it felt brand new. The team was punctual, thorough and so polite. The washrooms and kitchen look incredible.", service: "Deep Cleaning", featured: true },
  { customerName: "Daniel O.", location: "Westlands, Nairobi", rating: 5, review: "They handle our office twice a week. Consistent quality, supervisor checks, and our washrooms are always stocked. Very professional outfit.", service: "Office Cleaning", featured: true },
  { customerName: "Amina S.", location: "Lavington, Nairobi", rating: 5, review: "My sofa and carpet stains are gone — I honestly thought I needed replacements. Quick drying and no harsh smell. Highly recommend.", service: "Sofa & Carpet Cleaning", featured: true },
  { customerName: "Kevin N.", location: "Ruiru, Kiambu", rating: 5, review: "Booked post-construction cleaning after renovations. They removed all the dust and paint spots. Handover was smooth.", service: "Post-Construction Cleaning", featured: false },
  { customerName: "Grace W.", location: "South C, Nairobi", rating: 5, review: "Our Airbnb turnovers have been flawless since Safiluxe took over. Fast, great photos, happy guests.", service: "Airbnb Cleaning", featured: false },
  { customerName: "Brian K.", location: "Karen, Nairobi", rating: 4, review: "Reliable monthly home cleaning. Same crew, great attention to detail. Worth every shilling.", service: "Residential Cleaning", featured: false },
];

export const faqs = [
  { q: "How much does cleaning cost?", a: "Pricing depends on the service, size and condition of the space. Homes start from around KSh 3,500 per visit, sofas from KSh 1,500 per seat, and deep cleans from KSh 8,500. Commercial and post-construction work is quoted after a free assessment. Request a free quote and we respond within one business day." },
  { q: "Do you bring cleaning products and equipment?", a: "Yes. We arrive with professional-grade detergents, disinfectants and machines (carpet extractors, scrubbers, vacuum systems). If you prefer we use your products for any reason, just tell us in advance." },
  { q: "Do I need to be home during cleaning?", a: "No. Many clients give us access and return to a fresh space. Our teams are vetted, supervised and sign-checked on arrival and departure. You can also be present if you prefer." },
  { q: "How long does cleaning take?", a: "A standard 2-bedroom apartment takes 2–4 hours; deep cleans take 4–8 hours depending on condition. Carpet and sofa items typically take 1–3 hours. We confirm a time window when you book." },
  { q: "Do you offer recurring cleaning?", a: "Yes — one-time, weekly, bi-weekly, monthly, daily (commercial) and custom schedules. Recurring plans include priority slots and consistent crews." },
  { q: "Can I request the same cleaners?", a: "Absolutely. Recurring clients can keep the same team whenever scheduling allows, which improves consistency and trust." },
  { q: "Do you clean offices and commercial spaces?", a: "Yes. Offices, clinics, schools, restaurants, retail, gyms, warehouses and institutions. We offer daily/weekly/monthly contracts, site visits and SLA-backed checklists." },
  { q: "Do you handle post-construction cleaning?", a: "Yes — rough and fine cleans including fine-dust extraction, paint/cement spot removal, glass and handover polishing." },
  { q: "Can I book weekend cleaning?", a: "Yes, including Saturdays, Sundays and public holidays (subject to availability). Weekend slots fill fast, so book early." },
  { q: "How do I request a quotation?", a: "Use the Get a Free Quote form, WhatsApp us, or call. Share your service, location and photos for the fastest, most accurate quote." },
];

export const blogPosts = [
  {
    title: "How Often Should You Deep Clean Your Home?", slug: "how-often-deep-clean-home",
    excerpt: "A practical schedule for Kenyan homes — dust, humidity, cooking and pets change everything.",
    category: "Home Cleaning", image: IMAGES.deep,
    content: "For most homes, a professional deep clean every 3–4 months keeps grout, kitchens and washrooms healthy, with light routine cleaning weekly. Homes with pets, allergies or heavy cooking benefit from deep cleans every 2–3 months. Signs you are overdue: dull tiles, greasy kitchen walls, musty mattresses and dusty skirting. Pair quarterly deep cleans with weekly or bi-weekly upkeep for the best results.",
  },
  {
    title: "How Often Should Office Carpets Be Professionally Cleaned?", slug: "office-carpet-cleaning-frequency",
    excerpt: "Foot traffic, stains and indoor air quality — the numbers that matter.",
    category: "Office Cleaning", image: IMAGES.carpet,
    content: "High-traffic offices need professional carpet extraction every 3–6 months; medium-traffic spaces every 6–12 months. Daily vacuuming helps but cannot remove embedded grit that wears fibres. Schedule extraction before the carpet looks dirty — by then, fibre damage has started. Add entrance mats, spot-clean spills immediately and book after events or renovations.",
  },
  {
    title: "Sofa Cleaning Tips for Kenyan Homes", slug: "sofa-cleaning-tips-kenyan-homes",
    excerpt: "Dust, cooking odours and stains: how to keep fabric sofas fresh longer.",
    category: "Upholstery Care", image: IMAGES.sofa,
    content: "Vacuum weekly with an upholstery tool, rotate cushions, keep throws on armrests and blot (never rub) spills immediately. Avoid soaking fabric or using bleach. Professional shampoo + extraction every 6–12 months removes dust mites, sweat and odours and revives colour. Leather needs pH-neutral cleaning and conditioning — test in a hidden spot first.",
  },
  {
    title: "Why Professional Office Cleaning Matters", slug: "why-professional-office-cleaning-matters",
    excerpt: "First impressions, health, focus and retention all start with a clean workplace.",
    category: "Commercial Cleaning", image: IMAGES.office,
    content: "Clients judge you in seconds; staff get sick less and focus more in clean, decluttered spaces. Professional teams bring checklists, supervisor QA, the right chemistry for each surface and after-hours availability. The ROI shows up in fewer sick days, better retention and a workplace you are proud to show.",
  },
  {
    title: "How to Prepare Your Home for Deep Cleaning", slug: "prepare-home-for-deep-cleaning",
    excerpt: "Five small steps that make your deep clean faster and more thorough.",
    category: "Cleaning Tips", image: IMAGES.home,
    content: "Declutter surfaces, secure valuables and pets, point out problem areas, ensure water and power access, and plan to be reachable for the first 15 minutes. You do not need to pre-clean — but clearing counters and floors lets the crew spend time on actual cleaning, not tidying.",
  },
  {
    title: "Post-Construction Cleaning Checklist", slug: "post-construction-cleaning-checklist",
    excerpt: "From rough clean to handover polish — what good looks like.",
    category: "Commercial Cleaning", image: IMAGES.post,
    content: "Phase 1 (rough): remove debris and stickers, dry-dust walls and ceilings, vacuum with HEPA. Phase 2 (fine): damp-wipe all surfaces, clean glass inside and out, scrub floors, detail kitchens and washrooms, polish fixtures. Finish with a white-glove walkthrough, snag list and airing. Never skip fine-dust extraction — it settles for weeks otherwise.",
  },
];

export const gallerySeed = [
  { image: "/clean6.png", category: "commercial", caption: "Lobby crew — scheduled upkeep" },
  { image: "/clean3.png", category: "office", caption: "Boardroom detail — office cleaning" },
  { image: "/clean2.png", category: "office", caption: "Lobby finish — mopped & polished" },
  { image: "/clean4.png", category: "commercial", caption: "Glass & floors — commercial care" },
  { image: "/clean7.png", category: "post-construction", caption: "Intensive floor & detail work" },
  { image: "/clean11.png", category: "residential", caption: "Team on site — home deep clean" },
  { image: "/clean12.png", category: "residential", caption: "Detail touch — living areas" },
  { image: "/clean10.png", category: "commercial", caption: "Equipped crew — ready for any job" },
  { image: "/clean5.png", category: "office", caption: "Boardroom wipe-down & polish" },
  { image: IMAGES.carpet, category: "carpet", caption: "Carpet — deep extraction" },
  { image: IMAGES.sofa, category: "sofa", caption: "Fabric sofa — shampoo & deodorise" },
  { image: IMAGES.kitchen, category: "kitchen", caption: "Kitchen — degrease & polish" },
  { image: IMAGES.washroom, category: "bathroom", caption: "Washroom — descale & sanitise" },
];
