const destinations = [
  'Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 'New York, USA',
  'London, UK', 'Sydney, Australia', 'Rome, Italy', 'Bangkok, Thailand',
  'Dubai, UAE', 'Barcelona, Spain', 'Amsterdam, Netherlands', 'Seoul, South Korea',
  'Istanbul, Turkey', 'Marrakech, Morocco', 'Rio de Janeiro, Brazil',
  'Prague, Czech Republic', 'Hanoi, Vietnam', 'Cape Town, South Africa',
  'Reykjavik, Iceland', 'Machu Picchu, Peru', 'Athens, Greece', 'Lisbon, Portugal',
  'Berlin, Germany', 'Kathmandu, Nepal', 'Havana, Cuba',
];

const titlePrefixes = [
  'Weekend adventure in', 'Budget backpacking trip to', 'Cultural exploration of',
  'Beach getaway to', 'Mountain trek in', 'Foodie tour of', 'Road trip across',
  'Solo travel to', 'Photography trip to', 'Volunteer experience in',
  'Luxury escape to', 'Hiking expedition in', 'Historical tour of',
  'Wine tasting in', 'Snorkeling adventure in', 'Camping trip to',
  'Yoga retreat in', 'Wildlife safari in', 'City break in', 'Island hopping in',
];

const descriptions = [
  'Join me on this amazing journey! We will explore the best spots, try local cuisine, and make unforgettable memories together.',
  'Looking for travel companions to explore this beautiful destination. Lets discover hidden gems and popular attractions.',
  'Excited to announce this trip! I have planned a detailed itinerary covering must-visit places and local experiences.',
  'Adventure awaits! Seeking fellow travelers who love exploring new cultures and having fun. Budget-friendly itinerary.',
  'Traveling to this dream destination and looking for company. We will share costs, experiences, and create amazing stories.',
  'A well-planned trip with a perfect mix of adventure and relaxation. Join me for an incredible experience!',
  'Exploring off-the-beaten-path locations. Perfect for photographers and nature lovers. Limited spots available!',
];

const tagOptions = [
  ['adventure', 'hiking', 'nature'],
  ['beach', 'snorkeling', 'sunset'],
  ['culture', 'history', 'museums'],
  ['food', 'street-food', 'local-cuisine'],
  ['budget', 'backpacking', 'hostel'],
  ['luxury', 'relaxation', 'spa'],
  ['photography', 'wildlife', 'nature'],
  ['trekking', 'camping', 'outdoor'],
  ['nightlife', 'music', 'festival'],
  ['road-trip', 'camping', 'adventure'],
];

const sampleImages = [
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
];

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const start = new Date();
  start.setDate(start.getDate() + 7);
  const end = new Date(2027, 5, 1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

function randomBudget() {
  const budgets = [200, 300, 500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000];
  return pick(budgets);
}

function randomPeople() {
  return Math.floor(Math.random() * 5) + 1;
}

function generatePost(index) {
  const dest = pick(destinations);
  const prefix = pick(titlePrefixes);
  const tags = pick(tagOptions);

  return {
    title: `${prefix} ${dest}`,
    destination: dest,
    travelDate: randomDate(),
    budget: randomBudget(),
    description: `${pick(descriptions)} (Post #${index + 1})`,
    peopleNeeded: randomPeople(),
    tags,
    image: pick(sampleImages),
  };
}

async function registerUser() {
  const email = `seeduser_${Date.now()}@example.com`;
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Seed User', email, password: 'password123' }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Register failed: ${err.message || res.status}`);
  }

  const data = await res.json();
  console.log(`Registered user: ${data.email}`);
  return data.token;
}

async function createPost(token, postData, index) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error(`  Post #${index + 1} failed: ${err.message || res.status}`);
    return false;
  }

  const data = await res.json();
  console.log(`  Post #${index + 1} created: ${data.title}`);
  return true;
}

async function seed() {
  console.log('Starting API seeding...\n');

  let token;
  try {
    token = await registerUser();
  } catch (err) {
    console.error('Failed to register user:', err.message);
    process.exit(1);
  }

  console.log(`\nCreating 50 posts...\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < 50; i++) {
    const postData = generatePost(i);
    const ok = await createPost(token, postData, i);
    if (ok) success++;
    else failed++;

    if ((i + 1) % 10 === 0) {
      console.log(`  Progress: ${i + 1}/50 posts processed\n`);
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log('=== Seeding Complete ===');
  console.log(`Successful: ${success}`);
  console.log(`Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

seed().catch(err => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
