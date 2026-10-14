const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

const nav=$(".nav"),menuBtn=$("#menuBtn"),navLinks=$("#navLinks"),year=$("#year"),portraitStage=$("#portraitStage"),portraitCard=$("#portraitCard"),cursorAura=$(".cursor-aura");
if(year)year.textContent=new Date().getFullYear();

// Keep the GAO Tek internship date accurate in the experience timeline.
const gaoTimelineItem=$$('.timeline-item').find(item=>item.textContent.includes('GAO TEK INC.'));
if(gaoTimelineItem){
  const gaoDate=$('.timeline-date',gaoTimelineItem);
  if(gaoDate)gaoDate.innerHTML='May 2026 — October 2026 <small>Remote</small>';
}

window.addEventListener("scroll",()=>nav?.classList.toggle("scrolled",window.scrollY>24));
menuBtn?.addEventListener("click",()=>{const open=navLinks?.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(Boolean(open)));menuBtn.textContent=open?"×":"☰"});
$$('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navLinks?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');if(menuBtn)menuBtn.textContent='☰'}));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const delay=Number(entry.target.dataset.delay||0);window.setTimeout(()=>entry.target.classList.add('is-visible'),delay);revealObserver.unobserve(entry.target)})},{threshold:.12});
$$('.reveal').forEach(el=>revealObserver.observe(el));

if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',event=>{if(cursorAura){cursorAura.style.left=`${event.clientX}px`;cursorAura.style.top=`${event.clientY}px`}});
  portraitStage?.addEventListener('pointermove',event=>{if(!portraitCard)return;const rect=portraitStage.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;portraitCard.style.transform=`rotateY(${x*11-6}deg) rotateX(${y*-8+2}deg) translateZ(4px)`});
  portraitStage?.addEventListener('pointerleave',()=>{if(portraitCard)portraitCard.style.transform='rotateY(-7deg) rotateX(2.5deg)'});
  $$('.magnetic').forEach(button=>{button.addEventListener('pointermove',event=>{const rect=button.getBoundingClientRect();const x=event.clientX-rect.left-rect.width/2;const y=event.clientY-rect.top-rect.height/2;button.style.transform=`translate(${x*.06}px, ${y*.06}px)`});button.addEventListener('pointerleave',()=>button.style.transform='')});
}

const portfolio={
  positioning:'Oyindamola Dare is positioned for Remote Operations, Customer Support / Customer Success, Virtual Assistance, Sales Support, Recruitment Coordination, HR Administration and Executive / Administrative Support opportunities.',
  value:'She helps teams stay responsive and organised by handling customer communication, CRM updates, sales follow-up, recruitment coordination, administration, records, workflow support and day-to-day operational tasks with dependable follow-through.',
  results:'At Right Pick Stores, she achieved an 80% delivery rate on assigned orders, exceeding the company target. At Captain Cook Bakery, she contributed to improved workflows associated with a reported 15% reduction in processing time. At Polaris Bank, she handled customer interactions across phone, email and chat.',
  rightPick:'At Right Pick Stores, Oyindamola works as a Customer Service Representative & Sales Closer. Her responsibilities include lead follow-up, sales conversion, customer support, order processing, CRM updates, operational coordination and after-sales support.',
  polaris:'At Polaris Bank, she worked as a Customer Experience Expert from April 2025 to April 2026, managing high-volume customer interactions across phone, email and chat, identifying needs, resolving issues and collaborating with internal teams.',
  gao:'At GAO Tek Inc., she worked as an HR Intern from May 2026 to October 2026, supporting candidate sourcing, screening, candidate communication, interview coordination, records, documentation and onboarding support.',
  captain:'At Captain Cook Bakery, she supported payroll and allowance processes, daily operations and workflow coordination. She contributed to improved workflows associated with a reported 15% reduction in processing time.',
  dareys:'At Darey’s Store, she built early experience in customer service, retail sales, inventory, cash handling and promotional activities from 2019 to 2022.',
  tools:'Her documented tool experience includes Microsoft Word, Google Workspace / Google Suite, CRM tools, and customer communication across phone, email and chat.',
  education:'Oyindamola holds a B.Sc. in Industrial Relations & Personnel Management from the University of Ilorin (2022). Her professional development includes Customer Analytics from the University of Pennsylvania via Coursera (2023), Virtual Customer Support & American Accent Development (2024), and Virtual Assistant training from ALX (2026).',
  contact:'You can contact Oyindamola at dareoyindamola22@gmail.com, call +234 808 971 4844, or connect on LinkedIn at linkedin.com/in/oyindamola-dare-838161222.',
  availability:'She is currently presented as open to remote and international opportunities, especially roles involving operations, customer support / customer success, virtual assistance, sales support, recruitment coordination and administration.'
};

function answerQuestion(rawQuestion){
  const q=rawQuestion.trim().toLowerCase();
  if(!q)return 'Ask me about Oyindamola’s services, experience, results, tools, suitability for remote work or contact details.';
  if(/(contact|email|phone|linkedin|reach|hire|talk)/.test(q))return portfolio.contact;
  if(/(result|achiev|metric|proof|80|15|impact)/.test(q))return portfolio.results;
  if(/(right pick|sales closer|order|delivery rate)/.test(q))return portfolio.rightPick;
  if(/(polaris|bank|customer experience)/.test(q))return portfolio.polaris;
  if(/(gao|recruit|candidate|interview|onboard|hr)/.test(q))return portfolio.gao;
  if(/(captain cook|processing time|payroll|allowance)/.test(q))return portfolio.captain;
  if(/(darey|retail|inventory|cash)/.test(q))return portfolio.dareys;
  if(/(tool|software|google|word|crm|platform)/.test(q))return portfolio.tools;
  if(/(education|degree|university|course|certif|study)/.test(q))return portfolio.education;
  if(/(available|remote|international|location|opportunit|role)/.test(q))return `${portfolio.availability} ${portfolio.positioning}`;
  if(/(service|skill|support|take off|help|handle|independent|operations|virtual assistant|\bva\b)/.test(q))return `${portfolio.value} ${portfolio.positioning}`;
  if(/(suitable|why|strength|value|business|founder|team)/.test(q))return `Her strongest value is dependable follow-through across customer-facing and operational work. ${portfolio.value} ${portfolio.results}`;
  return `Oyindamola’s portfolio is centred on remote operations, customer support, virtual assistance, sales support and recruitment coordination. ${portfolio.value} If you want, ask me about her results, a specific role, tools, education or contact details.`;
}

const launcher=$("#chatLauncher"),panel=$("#chatPanel"),closeButton=$("#chatClose"),form=$("#chatForm"),input=$("#chatInput"),messages=$("#chatMessages"),quickPrompts=$("#quickPrompts");
function setChat(open){panel?.classList.toggle('open',open);panel?.setAttribute('aria-hidden',String(!open));launcher?.setAttribute('aria-expanded',String(open));document.body.classList.toggle('chat-open',open&&window.innerWidth<760);if(open)window.setTimeout(()=>input?.focus(),120)}
launcher?.addEventListener('click',()=>setChat(!panel?.classList.contains('open')));
closeButton?.addEventListener('click',()=>setChat(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setChat(false)});

function addMessage(text,type){if(!messages)return;const wrap=document.createElement('div');wrap.className=`message ${type}`;const paragraph=document.createElement('p');paragraph.textContent=text;wrap.appendChild(paragraph);messages.appendChild(wrap);messages.scrollTop=messages.scrollHeight}
function ask(question){const clean=question.trim();if(!clean)return;addMessage(clean,'user');if(input)input.value='';window.setTimeout(()=>addMessage(answerQuestion(clean),'bot'),180)}
form?.addEventListener('submit',event=>{event.preventDefault();ask(input?.value||'')});
$$('button',quickPrompts||document.createElement('div')).forEach(button=>button.addEventListener('click',()=>ask(button.textContent||'')));
