// All page copy and data in one place so it can be edited without touching layout.

export const shiftWords = 'You met twelve brilliant people last month. How many do you still talk to?'.split(' ');
export const shiftHighlightFrom = 7; // "How many do you still talk to?" sits on its own line in a highlight pill

export type Feature = {
  key: 'scan' | 'voice' | 'map';
  num: string;
  short: string;
  title: string;
  em: string;
  line: string;
  img: string;
  pos: string;
  alt: string;
};

export const features: Feature[] = [
  {
    key: 'scan', num: '01', short: 'EXCHANGE', title: 'Custom', em: 'Contact Cards',
    line: 'Avoid the awkward contact exchange with personalised contact cards. One QR containing all your chosen contact info.',
    img: '/img/exchange-doorway.webp', pos: '30% 40%', alt: 'Three friends swapping details on their phones in the doorway of a wood-panelled dining room',
  },
  {
    key: 'voice', num: '02', short: 'VOICE NOTES', title: 'Store', em: 'personalised context',
    line: 'Leave a ten-second voice note on each profile. Press play next time and the whole conversation comes back.',
    img: '/img/voice-hallway.webp', pos: '50% 35%', alt: 'A woman recording a voice note in a lamplit hallway outside a dinner party',
  },
  {
    key: 'map', num: '03', short: 'NETWORK', title: 'See who’s', em: 'in your life.',
    line: 'Everyone you know, arranged around you, with a nudge when someone starts to drift.',
    img: '/img/network-dining.webp', pos: '40% 35%', alt: 'Friends laughing and greeting each other around a dinner table in a wood-panelled room',
  },
];

export const wave = Array.from({ length: 34 }, (_, i) => ({
  h: 28 + ((i * 37 + 11) % 68),
  c: i < 13 ? 'var(--accent)' : 'rgba(var(--ink-rgb),.35)',
  d: ((i % 7) * 0.13).toFixed(2),
}));

export type Story = { name: string; role: string; quote: string; img: string };

export const stories: Story[] = [
  { name: 'Maya R.', role: 'Architect · Melbourne', quote: 'I met Leila at a dinner in March. We’ve since started a studio together.', img: '/img/avatar-maya.webp' },
  { name: 'Theo A.', role: 'Founder · London', quote: 'It doesn’t feel like networking. It feels like having a really good memory.', img: '/img/avatar-theo.webp' },
  { name: 'Priya S.', role: 'Product designer · Sydney', quote: 'The map showed me my padel crew had drifted. Two games later, I had a new job.', img: '/img/avatar-priya.webp' },
  { name: 'Jules M.', role: 'Chef · Paris', quote: 'The first message it wrote sounded more like me than I do after service.', img: '/img/avatar-jules.webp' },
  { name: 'Sam K.', role: 'Photographer · Auckland', quote: 'I swapped details with forty people at a festival and remember every single one.', img: '/img/avatar-sam.webp' },
];

export const faqs: [string, string][] = [
  ['Does the other person need goen?', 'Nope. Your code opens your page in their browser, where they can follow, save or message you on each platform in a tap. If they’re on goen too, you land in each other’s index automatically.'],
  ['What can I share?', 'Any social or professional profile, your portfolio, number, email, a calendar link or a playlist. Make different sets for different rooms and switch in a second.'],
  ['How does goen know what to suggest?', 'From what people choose to share with you, plus your own notes — where you met, what you talked about, what you want to follow up on. We never scrape anyone’s profile.'],
  ['Who can see my people?', 'Only you. Your index is private, and nothing about your connections is ever shared or sold.'],
  ['Will goen message people for me?', 'Never on its own. It drafts a first message; you tweak it and send it yourself, wherever you like.'],
  ['When can I get in?', 'Invites go out in small groups every week. Everyone in the beta keeps the core features free — that’s the Beta Forever promise.'],
];

// Orbit diagram: same seeded layout as the prototype so dot positions match.
export function buildOrbit() {
  let seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const rings = [
    { r: 96, k: 7, c: 'var(--kicker)', s: 12, dur: 90, dir: 'gv-spin', bs: 'solid' },
    { r: 170, k: 13, c: 'var(--accent)', s: 10, dur: 140, dir: 'gv-spinr', bs: 'solid' },
    { r: 244, k: 18, c: 'var(--ink)', s: 8, dur: 200, dir: 'gv-spin', bs: 'dashed' },
    { r: 330, k: 22, c: 'var(--ink)', s: 6, dur: 260, dir: 'gv-spinr', bs: 'solid', bo: 0.07, fo: [0.3, 0.14] },
    { r: 430, k: 28, c: 'var(--muted)', s: 5, dur: 320, dir: 'gv-spin', bs: 'dashed', bo: 0.05, fo: [0.22, 0.1] },
    { r: 540, k: 34, c: 'var(--muted)', s: 4, dur: 400, dir: 'gv-spinr', bs: 'solid', bo: 0.035, fo: [0.16, 0.07] },
    { r: 660, k: 40, c: 'var(--muted)', s: 4, dur: 480, dir: 'gv-spin', bs: 'solid', bo: 0.025, fo: [0.12, 0.05] },
  ];
  return rings.map((R) => {
    const dots = [];
    for (let i = 0; i < R.k; i++) {
      const a = (i / R.k) * Math.PI * 2 + rnd() * 0.3;
      const s = R.s + (i % 4 === 0 ? 3 : 0);
      dots.push({
        x: +(50 + (Math.cos(a) * R.r) / 5.2).toFixed(2),
        y: +(50 + (Math.sin(a) * R.r) / 5.2).toFixed(2),
        s,
        c: R.c,
        o: R.fo ? (i % 3 === 0 ? R.fo[0] : R.fo[1]) : R.bs === 'dashed' ? (i % 3 === 0 ? 0.9 : 0.4) : 0.95,
      });
    }
    return { inset: +(50 - R.r / 5.2).toFixed(2), bs: R.bs, bo: R.bo ?? 0.14, anim: `${R.dir} ${R.dur}s linear infinite`, dots };
  });
}
