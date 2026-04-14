// ============================================================
// HopeConnect – Realistic Dummy Data
// Used as fallback when the backend API is unavailable
// ============================================================

export const DUMMY_ORPHANAGES = [
  {
    _id: "demo-001",
    name: "Sunshine Children's Home",
    email: "info@sunshinehome.org",
    phone: "+91 94131 29876",
    location: "Jaipur, Rajasthan",
    address: "42, Malviya Nagar, Near Central Park, Jaipur 302017",
    children: "65",
    fyear: "2008",
    des: "Sunshine Children's Home has been a sanctuary of hope for orphaned and abandoned children since 2008. Nestled in the heart of Jaipur, we provide a safe, nurturing environment where children receive quality education, nutritious meals, healthcare, and most importantly—love. Our holistic approach to child development includes art therapy, sports programs, and vocational training for older children preparing for independent life.",
    history: "Founded by Meera Sharma after witnessing the plight of street children during the 2008 floods, Sunshine Home started with just 8 children in a rented apartment. Today, we are home to 65 children and have successfully rehabilitated over 200 children into mainstream society.",
    photo: "demo-sunshine.jpg",
    urgentNeeds: [
      { item: "Winter Blankets", urgency: "High", quantity: "50 pcs" },
      { item: "School Textbooks", urgency: "Medium", quantity: "120 sets" },
      { item: "First Aid Kits", urgency: "High", quantity: "10 kits" }
    ],
    user: "demo@hopeconnect.org"
  },
  {
    _id: "demo-002",
    name: "Little Stars Orphanage",
    email: "care@littlestars.in",
    phone: "+91 98290 54321",
    location: "Bikaner, Rajasthan",
    address: "15, Gandhi Colony, Near Junagarh Fort, Bikaner 334001",
    children: "38",
    fyear: "2012",
    des: "Little Stars Orphanage is dedicated to transforming the lives of vulnerable children in Bikaner. We believe every child deserves a chance to shine. Our programs focus on education, emotional well-being, and creative expression. With a team of dedicated caregivers and educators, we ensure each child receives personalized attention and care.",
    history: "Established in 2012 by retired teacher Ramesh Purohit, Little Stars began as a weekend tutoring center for underprivileged children and evolved into a full-time residential care facility.",
    photo: "demo-littlestars.jpg",
    urgentNeeds: [
      { item: "Rice & Pulses", urgency: "High", quantity: "200 kg" },
      { item: "Children's Clothing", urgency: "Medium", quantity: "80 sets" },
      { item: "Educational Toys", urgency: "Low", quantity: "30 items" }
    ],
    user: "demo@hopeconnect.org"
  },
  {
    _id: "demo-003",
    name: "Hope Haven Shelter",
    email: "hopehaven@gmail.com",
    phone: "+91 99100 87654",
    location: "Mumbai, Maharashtra",
    address: "78, Andheri West, Link Road, Mumbai 400058",
    children: "92",
    fyear: "2005",
    des: "Hope Haven Shelter is one of Mumbai's most trusted child care institutions. Located in Andheri West, we provide comprehensive care to 92 children ranging from infants to teenagers. Our facility includes modern classrooms, a library, a playground, and a medical center. We partner with leading schools to ensure our children receive the best education possible.",
    history: "Started by Dr. Priya Menon in 2005 as a response to the growing number of street children in Mumbai. Hope Haven has won multiple state-level awards for excellence in child welfare.",
    photo: "demo-hopehaven.jpg",
    urgentNeeds: [
      { item: "Baby Formula & Diapers", urgency: "High", quantity: "100 packs" },
      { item: "Laptops for Learning", urgency: "Medium", quantity: "15 units" },
      { item: "Art Supplies", urgency: "Low", quantity: "40 kits" }
    ],
    user: "demo@hopeconnect.org"
  },
  {
    _id: "demo-004",
    name: "Naya Savera Foundation",
    email: "contact@nayasavera.org",
    phone: "+91 88005 66789",
    location: "Delhi, NCR",
    address: "23, Saket, Near Select City Walk, New Delhi 110017",
    children: "55",
    fyear: "2010",
    des: "Naya Savera Foundation means 'New Dawn' — and that's exactly what we provide to every child who walks through our doors. Situated in South Delhi, our center focuses on skill development, mental health support, and academic excellence. We run specialized programs for children with special needs and learning disabilities.",
    history: "Founded by social activist Anjali Gupta in 2010, Naya Savera started with a mission to rescue children from bonded labor. Today it stands as a model institution for child rehabilitation in North India.",
    photo: "demo-nayasavera.jpg",
    urgentNeeds: [
      { item: "Warm Jackets", urgency: "High", quantity: "60 pcs" },
      { item: "School Bags", urgency: "Medium", quantity: "55 pcs" },
      { item: "Sports Equipment", urgency: "Low", quantity: "20 items" }
    ],
    user: "demo@hopeconnect.org"
  },
  {
    _id: "demo-005",
    name: "Asha Niketan Trust",
    email: "asha.niketan@yahoo.com",
    phone: "+91 97120 34567",
    location: "Jaipur, Rajasthan",
    address: "89, Vaishali Nagar, Near Ridhi Sidhi Circle, Jaipur 302021",
    children: "48",
    fyear: "2015",
    des: "Asha Niketan Trust provides a loving home environment for children who have lost their parents or have been abandoned. Our cozy campus in Vaishali Nagar is designed to feel like a family home, not an institution. Children participate in cooking, gardening, and household activities alongside their studies, preparing them for a self-sufficient future.",
    history: "Built from the personal savings of the late Shri Gopal Agarwal, Asha Niketan was his lifelong dream of giving back to society. After his passing in 2018, his family continued his legacy with renewed vigor.",
    photo: "demo-ashaniketan.jpg",
    urgentNeeds: [
      { item: "Cooking Utensils", urgency: "Medium", quantity: "25 pcs" },
      { item: "Mattresses", urgency: "High", quantity: "20 pcs" },
      { item: "Stationery Kits", urgency: "Medium", quantity: "48 sets" }
    ],
    user: "demo@hopeconnect.org"
  },
  {
    _id: "demo-006",
    name: "Bal Vikas Kendra",
    email: "balvikas@outlook.com",
    phone: "+91 94140 23456",
    location: "Jodhpur, Rajasthan",
    address: "12, Ratanada, Near Umaid Bhawan, Jodhpur 342001",
    children: "72",
    fyear: "2003",
    des: "Bal Vikas Kendra (Child Development Center) is a government-aided institution that has been serving orphaned children in Jodhpur for over two decades. We run a school up to Class 10, provide vocational training in carpentry, tailoring, and computer skills, and have partnerships with local businesses for apprenticeships.",
    history: "One of the oldest child welfare institutions in Western Rajasthan, Bal Vikas Kendra was established with joint efforts of the local community and district administration in 2003.",
    photo: "demo-balvikas.jpg",
    urgentNeeds: [
      { item: "Sewing Machines", urgency: "High", quantity: "5 units" },
      { item: "Computer Systems", urgency: "High", quantity: "8 units" },
      { item: "Library Books", urgency: "Medium", quantity: "200 books" }
    ],
    user: "demo@hopeconnect.org"
  }
];

export const DUMMY_DONATIONS = [
  { name: "Rajesh Kumar", quan: "25 kg", quantity: "Rice & Pulses", donationtype: "Food", createdAt: "2026-04-14T10:30:00Z" },
  { name: "Priya Sharma", quan: "15 sets", quantity: "School Uniforms", donationtype: "Clothes", createdAt: "2026-04-13T14:20:00Z" },
  { name: "Anonymous", quan: "50 pcs", quantity: "Notebooks & Pens", donationtype: "Education", createdAt: "2026-04-12T09:15:00Z" },
  { name: "Mohit Jain", quan: "10 liters", quantity: "Cooking Oil", donationtype: "Food", createdAt: "2026-04-11T16:45:00Z" },
  { name: "Sunita Devi", quan: "30 pcs", quantity: "Warm Blankets", donationtype: "Shelter", createdAt: "2026-04-10T11:00:00Z" },
  { name: "Amit Verma", quan: "20 pcs", quantity: "Children's Books", donationtype: "Education", createdAt: "2026-04-09T08:30:00Z" },
  { name: "Kavita Mehra", quan: "40 pairs", quantity: "Shoes & Sandals", donationtype: "Clothes", createdAt: "2026-04-08T13:10:00Z" },
  { name: "Deepak Singh", quan: "100 pcs", quantity: "Sanitary Pads", donationtype: "Other", createdAt: "2026-04-07T15:00:00Z" },
  { name: "Neha Agarwal", quan: "8 kits", quantity: "First Aid Kits", donationtype: "Other", createdAt: "2026-04-06T12:25:00Z" },
  { name: "Anonymous", quan: "5 boxes", quantity: "Packed Snacks", donationtype: "Food", createdAt: "2026-04-05T17:40:00Z" },
];

export const DUMMY_DONATION_CATEGORIES = [
  { name: "Food", value: 145 },
  { name: "Education", value: 98 },
  { name: "Clothes", value: 112 },
  { name: "Shelter", value: 67 },
  { name: "Other Supplies", value: 43 },
];

export const DUMMY_TESTIMONIALS = [
  {
    quote: "Thanks to the winter clothes donation drive organized last month, 45 children are now warm and comfortable for the upcoming season.",
    author: "Sarah Jenkins",
    role: "Orphanage Director, Hope Haven",
  },
  {
    quote: "The regular supply of nutritious food has improved the health of our children significantly. We are grateful for every donor who contributes.",
    author: "Meera Sharma",
    role: "Founder, Sunshine Children's Home",
  },
  {
    quote: "Education materials donated through HopeConnect helped 23 of our children pass their board exams with flying colors this year.",
    author: "Ramesh Purohit",
    role: "Director, Little Stars Orphanage",
  },
];

// Unsplash images for orphanages (royalty-free)
export const ORPHANAGE_IMAGES = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
];

// Helper: get a demo image for orphanage by index
export function getDemoImage(indexOrPhoto) {
  if (typeof indexOrPhoto === "number") {
    return ORPHANAGE_IMAGES[indexOrPhoto % ORPHANAGE_IMAGES.length];
  }
  // If the photo starts with "demo-" it's our dummy data
  if (typeof indexOrPhoto === "string" && indexOrPhoto.startsWith("demo-")) {
    const idx = DUMMY_ORPHANAGES.findIndex(o => o.photo === indexOrPhoto);
    return ORPHANAGE_IMAGES[idx >= 0 ? idx : 0];
  }
  return null; // Not a demo photo — use original URL
}

// Helper: check if an orphanage is from dummy data
export function isDemoOrphanage(orphanage) {
  return orphanage?._id?.startsWith?.("demo-");
}
