const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

const nav=$(".nav"),menuBtn=$("#menuBtn"),navLinks=$("#navLinks"),year=$("#year"),portraitStage=$("#portraitStage"),portraitCard=$("#portraitCard"),cursorAura=$(".cursor-aura");
if(year)year.textContent=new Date().getFullYear();

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
  positioning:'Oyindamola Dare is a Remote Operations & Customer Support Specialist. She is suited to customer support, customer success, virtual assistance, sales support, CRM administration, recruitment coordination and administrative operations roles.',
  value:'She can support a business by managing customer communication, CRM updates, lead follow ups, order processing, complaint resolution, recruitment coordination, records, documentation and recurring operational tasks with clear communication and dependable follow through.',
  strengths:'Her strongest skills include customer support across phone, email and chat, CRM and sales support, complaint resolution, lead follow up, recruitment coordination, candidate communication, onboarding support and administrative operations.',
  results:'At Right Pick Stores, she achieved a 60% delivery rate on assigned orders, exceeding the company target. At Captain Cook Bakery, she contributed to a reported 15% reduction in processing time. At Polaris Bank, she supported customers across phone, email and chat.',
  experience:'Her experience includes Customer Service Representative & Sales Closer at Right Pick Stores, Customer Experience Expert at Polaris Bank, HR Intern at GAO Tek Inc., Assistant to the Supervisor at Captain Cook Bakery and Sales Attendant at Darey\'s Store.',
  rightPick:'At Right Pick Stores, she manages customer conversations, lead conversion, follow ups, order processing, CRM updates, complaint resolution, after sales support and coordination with operations. She achieved a 60% delivery rate on assigned orders, above the company target.',
  polaris:'At Polaris Bank, she managed high volume customer interactions through phone, email and chat. Her work included active listening, customer problem solving, service guidance, issue resolution and collaboration with internal teams.',
  gao:'At GAO Tek Inc., from May 2026 to October 2026, she supported recruitment coordination, talent acquisition administration, candidate sourcing, screening, applicant communication, interview scheduling, records and onboarding support.',
  tools:'Her documented tools include Google Workspace, Microsoft Word, CRM tools and multichannel communication through phone, email and chat.',
  education:'Oyindamola holds a B.Sc. in Industrial Relations & Personnel Management from the University of Ilorin, completed in 2022. Her professional development includes Virtual Assistant training from ALX in 2026, Virtual Customer Support & American Accent Development in 2024, and Customer Analytics from the University of Pennsylvania via Coursera in 2023.',
  roles:'She is best suited to Remote Operations, Customer Support, Customer Success, Virtual Assistance, CRM and Sales Support, Recruitment Coordination, HR Administration and Executive or Administrative Support roles.',
  contact:'You can contact Oyindamola at dareoyindamola22@gmail.com, call +234 808 971 4844, or connect on LinkedIn at linkedin.com/in/oyindamola-dare-838161222.',
  availability:'She is based in Lagos, Nigeria on GMT+1 and is available for global remote opportunities.'
};

function answerQuestion(rawQuestion){
  const q=rawQuestion.trim().toLowerCase();
  if(!q)return 'Ask about Oyindamola\'s strongest skills, experience, results, suitable roles or how she can support your business.';
  if(/(contact|email|phone|linkedin|reach|hire|talk)/.test(q))return portfolio.contact;
  if(/(result|achiev|metric|proof|60|15|impact)/.test(q))return portfolio.results;
  if(/(strongest|strength|skill|capabilit)/.test(q))return portfolio.strengths;
  if(/(right pick|sales closer|order|delivery rate)/.test(q))return portfolio.rightPick;
  if(/(polaris|bank|customer experience)/.test(q))return portfolio.polaris;
  if(/(gao|recruit|candidate|interview|onboard|talent|hr)/.test(q))return portfolio.gao;
  if(/(tool|software|google|word|crm|platform)/.test(q))return portfolio.tools;
  if(/(education|degree|university|course|certif|study)/.test(q))return portfolio.education;
  if(/(role|best suited|position|job)/.test(q))return portfolio.roles;
  if(/(experience|career|worked|background)/.test(q))return portfolio.experience;
  if(/(support my business|support business|business|founder|why should|consider hiring|value|help|handle|take off)/.test(q))return `${portfolio.value} ${portfolio.results}`;
  if(/(available|remote|international|global|location|gmt)/.test(q))return `${portfolio.availability} ${portfolio.roles}`;
  return `${portfolio.positioning} ${portfolio.value}`;
}

const launcher=$("#chatLauncher"),panel=$("#chatPanel"),closeButton=$("#chatClose"),form=$("#chatForm"),input=$("#chatInput"),messages=$("#chatMessages"),quickPrompts=$("#quickPrompts");
function setChat(open){panel?.classList.toggle('open',open);panel?.setAttribute('aria-hidden',String(!open));launcher?.setAttribute('aria-expanded',String(open));document.body.classList.toggle('chat-open',open&&window.innerWidth<760);if(open)window.setTimeout(()=>input?.focus(),120)}
launcher?.addEventListener('click',()=>setChat(!panel?.classList.contains('open')));
closeButton?.addEventListener('click',()=>setChat(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setChat(false)});

function addMessage(text,type){if(!messages)return;const wrap=document.createElement('div');wrap.className=`message ${type}`;const paragraph=document.createElement('p');paragraph.textContent=text;wrap.appendChild(paragraph);messages.appendChild(wrap);messages.scrollTop=messages.scrollHeight}
function ask(question){const clean=question.trim();if(!clean)return;addMessage(clean,'user');if(input)input.value='';window.setTimeout(()=>addMessage(answerQuestion(clean),'bot'),160)}
form?.addEventListener('submit',event=>{event.preventDefault();ask(input?.value||'')});
$$('button',quickPrompts||document.createElement('div')).forEach(button=>button.addEventListener('click',()=>ask(button.textContent||'')));

function pdfEscape(value){return value.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
function makeCvPdf(){
  const commands=[];
  const add=(text,x,y,size=9,bold=false)=>commands.push(`BT /${bold?'F2':'F1'} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfEscape(text)}) Tj ET`);
  const rule=y=>commands.push(`0.78 0.84 0.88 RG 0.7 w 55 ${y} m 540 ${y} l S`);

  add('OYINDAMOLA TOLULOPE DARE',55,806,16,true);
  add('REMOTE OPERATIONS & CUSTOMER SUPPORT SPECIALIST',55,786,10.5,true);
  add('Virtual Assistance | Customer Experience | CRM | Sales Support | Recruitment Coordination',55,771,8.5,false);
  add('Lagos, Nigeria | GMT+1 | +234 808 971 4844 | dareoyindamola22@gmail.com',55,754,8,false);
  add('LinkedIn: linkedin.com/in/oyindamola-dare-838161222 | Portfolio: oyindamola-dare.vercel.app',55,742,8,false);
  rule(728);

  add('PROFESSIONAL SUMMARY',55,710,9.5,true);
  add('Remote operations and customer support professional with experience across customer service, sales, CRM',55,695,8.4,false);
  add('administration, recruitment support and day to day business operations. Experienced in phone, email and chat',55,683,8.4,false);
  add('support, lead conversion, records, interview coordination and onboarding. Available for global remote roles.',55,671,8.4,false);

  add('CORE EXPERTISE',55,646,9.5,true);
  add('Customer Support & Client Relations | Sales & Lead Conversion | CRM & Records Management',55,631,8.2,false);
  add('Email, Chat & Call Support | Complaint Resolution | Order Processing & Follow Up',55,619,8.2,false);
  add('Recruitment Support | Candidate Sourcing & Screening | Interview Coordination | Onboarding Support',55,607,8.2,false);
  add('Administrative Operations | Research & Evaluation | Google Workspace | Microsoft Word',55,595,8.2,false);

  add('PROFESSIONAL EXPERIENCE',55,570,9.5,true);
  add('Customer Service Representative & Sales Closer | Right Pick Stores | Remote | June 2026 | Present',55,554,8.4,true);
  add('Manage customer communication, convert qualified leads, handle follow ups, orders, complaints and after sales support.',65,542,8,false);
  add('Maintain CRM records and coordinate with operations. Achieved a 60% delivery rate, above the company target.',65,530,8,false);

  add('HR Intern | GAO Tek Inc. | Remote | May 2026 | October 2026',55,507,8.4,true);
  add('Supported candidate sourcing, screening, applicant communication, interview scheduling and recruitment records.',65,495,8,false);
  add('Assisted with onboarding, employment documentation and day to day HR administration.',65,483,8,false);

  add('Customer Experience Expert | Polaris Bank Limited | Lagos State | April 2025 | April 2026',55,460,8.4,true);
  add('Managed high volume customer interactions across phone, email and chat, with active listening and problem solving.',65,448,8,false);
  add('Guided customers through service options and collaborated with internal teams for timely issue resolution.',65,436,8,false);

  add('Assistant to the Supervisor | Captain Cook Bakery | Osogbo | 2022 | 2023',55,413,8.4,true);
  add('Supported payroll, allowances and daily operations, contributing to a reported 15% reduction in processing time.',65,401,8,false);

  add('Sales Attendant | Darey\'s Store | Osun | 2019 | 2022',55,378,8.4,true);
  add('Delivered customer service, managed inventory and cash register transactions, and supported promotions.',65,366,8,false);

  add('ADDITIONAL EXPERIENCE',55,341,9.5,true);
  add('Support Teacher, Civic Education | I.M.G. Grammar School | Ibadan | February 2023 | December 2023',55,326,8.2,true);
  add('Taught four classes, prepared lesson notes and assessed student performance.',65,314,8,false);

  add('EDUCATION & PROFESSIONAL DEVELOPMENT',55,289,9.5,true);
  add('B.Sc. Industrial Relations and Personnel Management | University of Ilorin, Kwara State, Nigeria | 2022',55,274,8.2,false);
  add('Virtual Assistant | ALX | 2026',55,257,8.2,false);
  add('Virtual Customer Support & American Accent Development | Regonet Global Academy | 2024',55,245,8.2,false);
  add('Customer Analytics | University of Pennsylvania, Coursera | 2023',55,233,8.2,false);

  rule(210);
  add('Customer Support | Virtual Assistance | Operations | Sales Support | Recruitment Coordination',55,193,8.4,true);
  add('Available for international remote opportunities.',55,179,8.4,false);

  const stream=commands.join('\n')+'\n';
  const objects={
    1:'<< /Type /Catalog /Pages 2 0 R >>',
    2:'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    3:'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    4:'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    5:'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    6:`<< /Length ${stream.length} >>\nstream\n${stream}endstream`
  };
  let pdf='%PDF-1.4\n';
  const offsets=[0];
  for(let i=1;i<=6;i++){offsets[i]=pdf.length;pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`}
  const xref=pdf.length;
  pdf+='xref\n0 7\n0000000000 65535 f \n';
  for(let i=1;i<=6;i++)pdf+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
  pdf+=`trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf],{type:'application/pdf'});
}
function downloadCV(event){
  event?.preventDefault();
  const url=URL.createObjectURL(makeCvPdf());
  const a=document.createElement('a');
  a.href=url;
  a.download='Oyindamola_Dare_Remote_CV.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$$('[data-download-cv]').forEach(link=>link.addEventListener('click',downloadCV));
