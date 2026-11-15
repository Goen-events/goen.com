// All page copy and data in one place so it can be edited without touching layout.

export const shiftWords = 'If your network is your net\u00A0worth. Goen helps you build both'.split(' ');
export const shiftHighlightFrom = 6; // "Goen helps you build both" sits on its own line in a highlight pill

export type Feature = {
  key: 'voice' | 'map' | 'ask';
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
    key: 'voice', num: '01', short: 'CAPTURE', title: 'Store', em: 'personalised context',
    line: 'After you meet someone, send Goen a quick voice note or text on WhatsApp or iMessage. It picks out the details and files them against the right person.',
    img: '/img/voice-hallway.webp', pos: '50% 35%', alt: 'A woman recording a voice note in a lamplit hallway outside a dinner party',
  },
  {
    key: 'map', num: '02', short: 'NETWORK', title: 'Fully organised network', em: '& actionable insights',
    line: 'Every contact is categorised and your engagement tracked in the Goen app, so you can see your whole network and get useful relationship development insights.',
    img: '/img/network-dining.webp', pos: '40% 35%', alt: 'Friends laughing and greeting each other around a dinner table in a wood-panelled room',
  },
  {
    key: 'ask', num: '03', short: 'ASK GOEN', title: 'Answers in the', em: 'same chat',
    line: 'Need a name, a detail or a follow-up? Ask Goen right where you message and it pulls up the context, or drafts the note for you.',
    img: '/img/exchange-doorway.webp', pos: '30% 40%', alt: 'Three friends looking at their phones in the doorway of a wood-panelled dining room',
  },
];

// Voice note waveform, drawn inside an outgoing (red) chat bubble.
export const wave = Array.from({ length: 30 }, (_, i) => ({
  h: 28 + ((i * 37 + 11) % 68),
  c: i < 12 ? 'var(--on-accent)' : 'rgba(var(--band-ink-rgb),.45)',
  d: ((i % 7) * 0.13).toFixed(2),
}));

export type Story = { name: string; role: string; quote: string; img: string };

export const stories: Story[] = [
  { name: 'Maya R.', role: 'Architect · Melbourne', quote: 'I met Leila at a dinner in March. We’ve since started a studio together.', img: '/img/avatar-maya.webp' },
  { name: 'Theo A.', role: 'Founder · London', quote: 'It doesn’t feel like networking. It feels like having a really good memory.', img: '/img/avatar-theo.webp' },
  { name: 'Priya S.', role: 'Product designer · Sydney', quote: 'The map showed me my padel crew had drifted. Two games later, I had a new job.', img: '/img/avatar-priya.webp' },
  { name: 'Jules M.', role: 'Chef · Paris', quote: 'The first message it wrote sounded more like me than I do after service.', img: '/img/avatar-jules.webp' },
  { name: 'Sam K.', role: 'Photographer · Auckland', quote: 'I voice-noted forty people from a festival on the bus home. I still remember every single one.', img: '/img/avatar-sam.webp' },
];

export const faqs: [string, string][] = [
  ['Do I need to download an app?', 'Day to day, you just chat with Goen on WhatsApp or iMessage, so there’s nothing new to open. The Goen app is where your full contact database and deeper insights live, for when you want the bigger picture.'],
  ['How do I add someone?', 'Send Goen a voice note or text after you meet, the way you’d message a friend. Mention who they are, where you met and anything worth remembering, and Goen organises it for you.'],
  ['Can I still share my details?', 'Yes. Make a custom contact card with one QR code for your chosen socials, portfolio, number or email. The other person doesn’t need Goen; it opens in their browser. If they’re on Goen too, you land in each other’s networks automatically.'],
  ['How does Goen know what to suggest?', 'From your own notes and what people choose to share with you — where you met, what you talked about, what you want to follow up on. We never scrape anyone’s profile.'],
  ['Who can see my network?', 'Only you. Your database is private, and nothing about your connections is ever shared or sold.'],
  ['Will Goen message people for me?', 'Never on its own. It drafts a message right in your chat; you tweak it and send it yourself, wherever you like.'],
  ['What’s the hardware?', 'A dedicated device for capturing context with Goen in the moment, as an alternative to messaging. It’s still in development, and people on the waitlist will hear about it first.'],
  ['When can I get in?', 'Invites go out in small groups every week. Core features stay free, forever.'],
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
