const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

// Footer year
$('#year').textContent = new Date().getFullYear();

// Glass navbar behaviour + mobile menu
const nav = $('.nav');
const menuBtn = $('#menuBtn');
const navLinks = $('#navLinks');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
$$('#navLinks a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .11 });
$$('.reveal').forEach(el => revealObserver.observe(el));

// Cursor aura
const aura = $('.cursor-aura');
let targetX = innerWidth / 2, targetY = innerHeight / 2;
let auraX = targetX, auraY = targetY;
window.addEventListener('pointermove', e => { targetX = e.clientX; targetY = e.clientY; }, { passive: true });
function animateAura() {
  auraX += (targetX - auraX) * .12;
  auraY += (targetY - auraY) * .12;
  aura.style.left = `${auraX}px`;
  aura.style.top = `${auraY}px`;
  requestAnimationFrame(animateAura);
}
animateAura();

// 3D portrait motion
const stage = $('#portraitStage');
const portrait = $('#portraitCard');
if (stage && portrait) {
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    portrait.style.transform = `rotateY(${x * 15}deg) rotateX(${y * -12}deg) translateZ(8px)`;
  });
  stage.addEventListener('pointerleave', () => portrait.style.transform = 'rotateY(-8deg) rotateX(3deg)');
}

// Subtle 3D tilt on cards
$$('.tilt-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    if (window.innerWidth < 760) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(850px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

// ---------- Local portfolio assistant ----------
const portfolio = {
  name: 'Oyindamola Tolulope Dare',
  location: 'Lagos State, Nigeria',
  email: 'dareoyindamola22@gmail.com',
  phone: '+234 808 971 4844',
  linkedin: 'linkedin.com/in/oyindamola-dare-838161222',
  summary: 'Oyindamola is a resourceful and customer-focused professional with experience across customer service, sales support, client relations, HR, recruitment administration and day-to-day business operations. Her working style emphasizes clear communication, organization, practical problem-solving and follow-through.',
  strengths: 'Her strongest documented qualities are customer focus, communication, organization, adaptability, problem-solving, relationship management and dependable follow-through. She also has practical multichannel support experience across phone, email and chat.',
  experience: 'Her experience includes Customer Service Representative & Sales Closer at Right Pick Stores, Customer Experience Expert at Polaris Bank Limited, HR Intern at GAO Tek Inc., Assistant to the Supervisor at Captain Cook Bakery, and Sales Attendant at Darey’s Store. She also worked as a Support Teacher in Civic Education at I.M.G. Grammar School, Ibadan.',
  rightPick: 'At Right Pick Stores, she combines customer service and sales: engaging customers, following up leads, converting sales, processing orders, updating CRM records, resolving concerns and supporting after-sales service. A documented performance highlight is an 80% delivery rate on assigned orders, above the company target.',
  polaris: 'At Polaris Bank Limited (April 2025 to April 2026), she worked as a Customer Experience Expert, managing high-volume customer interactions across phone, email and chat, identifying needs, resolving issues, collaborating with internal teams and helping clients understand suitable service options.',
  gao: 'At GAO Tek Inc., she supports HR and recruitment activities including candidate sourcing and screening, applicant communication, interview coordination, records, documentation and onboarding support.',
  captain: 'At Captain Cook Bakery (2022–2023), she supported payroll, allowance disbursement, daily operational activities and workflow coordination. The portfolio reports that improved workflows contributed to a 15% reduction in processing time.',
  dareys: 'At Darey’s Store (2019–2022), she built her early customer-service and retail foundation through customer service, sales, inventory, cash-register accuracy, product displays and promotional support.',
  skills: 'Her portfolio groups her skills into Customer Support, Sales, HR & Administration, Operations and Digital Tools. Examples include complaint resolution, lead follow-up, sales closing, candidate sourcing, interview coordination, onboarding support, CRM updates, workflow support, reporting, Microsoft Word, Google Suite and CRM tools.',
  education: 'She earned a B.Sc. in Industrial Relations and Personnel Management from the University of Ilorin, Kwara State, Nigeria, in 2022.',
  courses: 'Professional development listed in the portfolio includes Customer Analytics from the University of Pennsylvania via Coursera (2023), Virtual Customer Support & American Accent Development (2024), and Virtual Assistant training with ALX (2026).',
  research: 'Her 2022 undergraduate research project at the University of Ilorin was “An Evaluation of Work Engagement on Job Performance: A Case Study of Pure Water Factories in Ilorin.” It developed research, information gathering, analysis, evaluation, academic writing and presentation skills.',
  story: 'Her professional story moves from early retail service into administration, teaching, banking customer experience, remote sales and HR support. Across those roles, the consistent theme is working with people, understanding needs, organizing information or workflows, and following tasks through to a useful outcome.',
  approach: 'Her four-step professional approach is: Understand → Organize → Execute → Follow up. She first understands the customer, task or problem, structures priorities, completes work accurately with clear communication, and stays engaged until the outcome is properly delivered.',
  roles: 'She is open to opportunities in customer support, customer experience, sales support, HR & administration, virtual assistance and operations support.',
  contact: 'You can contact Oyindamola at dareoyindamola22@gmail.com or +234 808 971 4844. Her LinkedIn profile is linkedin.com/in/oyindamola-dare-838161222.',
  development: 'The portfolio does not state private weaknesses or personal challenges, so I will not invent them. A fair professional-development summary is that she is continuing to build deeper specialist experience while already working across several people-facing and operational functions. Her listed courses also show an active focus on continuous learning.',
  challenges: 'No private personal challenges are documented in the portfolio. What is documented is a career built across different environments—retail, education, banking, remote sales, HR and operations—which shows adaptability and continued professional development.',
  leadership: 'Her leadership and volunteer experience includes Charity Syndicate CDS Group during NYSC, where she participated in outreach supporting elderly people and hospital patients, and R.C.C.G. ushering experience from 2018 to 2025, supporting congregation logistics and coordination.',
};

const intents = [
  { keys: ['weakness','weaknesses','development area','improve','improvement','gap'], answer: portfolio.development },
  { keys: ['challenge','challenges','struggle','difficulty','difficulties'], answer: portfolio.challenges },
  { keys: ['right pick','rightpick','sales closer','delivery rate','80%'], answer: portfolio.rightPick },
  { keys: ['polaris','bank','banking'], answer: portfolio.polaris },
  { keys: ['gao','recruitment','hr intern'], answer: portfolio.gao },
  { keys: ['captain cook','bakery','15%','processing time'], answer: portfolio.captain },
  { keys: ["darey's",'dareys','retail','sales attendant'], answer: portfolio.dareys },
  { keys: ['education','degree','university','school','b.sc','bsc'], answer: portfolio.education },
  { keys: ['course','courses','certificate','certification','alx','coursera','analytics'], answer: portfolio.courses },
  { keys: ['research','project','work engagement','job performance'], answer: portfolio.research },
  { keys: ['skill','skills','capability','capabilities','tools','crm','google suite'], answer: portfolio.skills },
  { keys: ['strength','strengths','best quality','strongest'], answer: portfolio.strengths },
  { keys: ['story','history','journey','career path','background'], answer: portfolio.story },
  { keys: ['approach','work style','how does she work','method'], answer: portfolio.approach },
  { keys: ['leadership','volunteer','nysc','church','rccg'], answer: portfolio.leadership },
  { keys: ['experience','worked','work experience','career'], answer: portfolio.experience },
  { keys: ['role','roles','opportunity','opportunities','looking for','open to'], answer: portfolio.roles },
  { keys: ['contact','email','phone','linkedin','reach'], answer: portfolio.contact },
  { keys: ['where','location','based','live'], answer: `Oyindamola is based in ${portfolio.location}.` },
  { keys: ['who','about','tell me about','summary'], answer: portfolio.summary },
];

function answerQuestion(q) {
  const query = q.toLowerCase().replace(/[^a-z0-9%+'\s.-]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!query) return 'Ask me anything about Oyindamola’s professional portfolio.';

  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const key of intent.keys) {
      if (query.includes(key)) score += key.split(' ').length + 1;
    }
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  if (best) return best.answer;

  if (query.includes('salary') || query.includes('age') || query.includes('relationship') || query.includes('married') || query.includes('family')) {
    return 'That information is not included in Oyindamola’s professional portfolio, so I won’t guess or invent it. I can help with her experience, skills, education, achievements, professional story or contact details instead.';
  }

  return `I don’t have a documented answer to that specific question in Oyindamola’s portfolio, and I won’t make one up. I can answer about her experience, skills, education, achievements, career story, work approach, professional-development areas and contact information.`;
}

const chatLauncher = $('#chatLauncher');
const chatPanel = $('#chatPanel');
const chatClose = $('#chatClose');
const chatForm = $('#chatForm');
const chatInput = $('#chatInput');
const chatMessages = $('#chatMessages');

function openChat() {
  chatPanel.classList.add('open');
  chatPanel.setAttribute('aria-hidden', 'false');
  chatLauncher.setAttribute('aria-expanded', 'true');
  setTimeout(() => chatInput.focus(), 180);
}
function closeChat() {
  chatPanel.classList.remove('open');
  chatPanel.setAttribute('aria-hidden', 'true');
  chatLauncher.setAttribute('aria-expanded', 'false');
}
chatLauncher.addEventListener('click', () => chatPanel.classList.contains('open') ? closeChat() : openChat());
chatClose.addEventListener('click', closeChat);

function addMessage(text, type) {
  const wrap = document.createElement('div');
  wrap.className = `message ${type}`;
  const p = document.createElement('p');
  p.textContent = text;
  wrap.appendChild(p);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function ask(text) {
  const clean = text.trim();
  if (!clean) return;
  addMessage(clean, 'user');
  chatInput.value = '';
  setTimeout(() => addMessage(answerQuestion(clean), 'bot'), 260);
}
chatForm.addEventListener('submit', e => { e.preventDefault(); ask(chatInput.value); });
$$('#quickPrompts button').forEach(btn => btn.addEventListener('click', () => { openChat(); ask(btn.textContent); }));

// Escape closes chat/menu
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeChat();
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});
