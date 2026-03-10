let initialized = false;
const crt = document.getElementById("crt");
const consent = document.getElementById("consent");
const boot = document.getElementById("boot");
const bootText = document.getElementById("bootText");
const app = document.getElementById("app");
const tabs = document.getElementById("tabs");
const content = document.getElementById("content");
const click = document.getElementById("click");
const soundToggle = document.getElementById("soundToggle");
const pipBoyHandler = document.getElementById("pipboy-handler");
const showResumeBtn = document.getElementById('show-resume-btn');
let flickerPref = false;
const $ = (id) => document.getElementById(id);
const sl = (ms) => new Promise((r) => setTimeout(r, ms));

let soundOn = true;
let index = 0;
let bootStarted = false;
const sections = [
    {
        title: "ABOUT", body: `<img src="profile_background_img.jpg" style="width: 100%;border: 1px solid;" /><br><br>I’m a Frontend Engineer with <b>close to 7 years of experience</b> building scalable, accessible, and high-performance web applications in fintech and enterprise domains. I’ve worked on customer-facing platforms used by millions of users, including digital banking systems and global e-commerce products.<br><br>
My core expertise lies in Angular, React, TypeScript, and microfrontend architectures, with a strong focus on performance optimization, accessibility (WCAG), and long-term maintainability. I’ve led frontend teams, collaborated closely with backend and product stakeholders, and delivered multi-country solutions across India, Saudi Arabia, Kenya, and Australia.<br><br>
I care deeply about clean UI engineering, real-world performance, and building systems that scale without sacrificing user experience.<br><br><span id="cursor"></span>`,
    },
    {
        title: "EXPERIENCE", body: `
<b>BACKBASE — HYDERABAD</b><br>
Software Engineer - Frontend | Jul 2023 — Present<br>
------------------------------------------------<br>
• Led a team of 3 frontend engineers delivering digital banking modules (Cards, Accounts, Loan Against Securities, Disputes) for HDFC Bank serving millions of users.<br>
• Architected enterprise banking solutions using Angular, TypeScript, and Backbase OOB modules enabling deployments across Saudi Arabia, Kenya, and Australia.<br>
• Built 20+ new modules across major banking epics and delivered 50+ feature enhancements improving UX and platform performance.<br>
• Conducted deep code audits eliminating redundant API calls and introducing strategic API caching — improving card flow performance by ~20%.<br>
• Refactored Angular module architecture and service layer, optimizing imports and shared modules to reduce initial load time.<br>
• Resolved 40+ WCAG accessibility issues and conducted 200+ code reviews to improve release stability and enforce strong testing practices.<br><br>

<b>BACANCY TECHNOLOGY LLP — REMOTE</b><br>
Senior Software Engineer - Frontend | Apr 2022 — Jun 2023<br>
------------------------------------------------<br>
• Delivered new features across Landing, PLP, and PDP pages for Marks & Spencer's e-commerce platform.<br>
• Enhanced product recommendations via Fredhopper integration improving product discovery and engagement.<br>
• Improved Core Web Vitals through bundle optimization and code performance initiatives.<br>
• Reduced bundle size by 2–5%, resulting in ~4% faster load time while improving LCP and reducing layout shifts.<br>
• Built frontend modules integrated with backend APIs ensuring seamless data flow and UI responsiveness.<br>
• Contributed to modular UI development and React-based experimentation within an enterprise stack.<br><br>

<b>DIVAMI DESIGN LABS — HYDERABAD</b><br>
UX Engineer | May 2019 — Mar 2022<br>
------------------------------------------------<br>
• Coordinated a team of 5 engineers across sprint planning, standups, and cross-team dependency management.<br>
• Served as primary technical contact for client discussions aligning business goals with technical implementation.<br>
• Authored use-case documentation and UI–API contracts improving development clarity and reducing rework.<br>
• Delivered multiple full-stack applications using React, Angular, Node.js, PostgreSQL, and AWS.<br><br><span id="cursor"></span>
` },
    { title: "SKILLS", body: `
<b>SKILLS</b><br>
----------------------------------------<br>
<b>Languages</b><br>
• JavaScript<br>
• TypeScript<br>
• Java<br><br>

<b>Libraries / Frameworks</b><br>
• Angular<br>
• React<br>
• Pug<br>
• TypeORM<br>
• RxJS<br>
• NgRx<br>
• Jasmine<br>
• Karma<br><br>

<b>Tools</b><br>
• Webpack<br>
• Babel<br>
• Gulp<br>
• Grunt<br><br>

<b>Cloud / Infrastructure</b><br>
• AWS<br><br>

<b>Performance / Quality</b><br>
• Web Performance Optimization<br>
• Core Web Vitals<br>
• Accessibility (WCAG)<br>
• Unit Testing<br>
• Test Driven Development (TDD)
<br><br><span id="cursor"></span>
` },
    { title: "CONTACT", body: contactView }
];
// ASCII boot
const BOOT_LINES = [
    { t: 'RAO-CO INDUSTRIES (TM) UNIFIED PORTFOLIO OPERATING SYSTEM', spd: 1 },
    { t: 'COPYRIGHT 1996-2026 RAO-CO INDUSTRIES', spd: 1 },
    { t: '', spd: 0 },
    { t: '-EXPERIENCE BANK 1 OK-', spd: 10 },
    { t: '-EXPERIENCE BANK 2 OK-', spd: 10 },
    { t: '-EXPERIENCE BANK 3 OK-', spd: 10 },
    { t: '', spd: 0 },
    { t: '64K RAM SYSTEM', spd: 10 },
    { t: '38911 BYTES FREE', spd: 10 },
    { t: '', spd: 0 },
    { t: '-CHECKSUM-                                        OK-', spd: 12 },
    { t: '-INITIATING PORTFOLIO-BOY UNIT-', spd: 20 },
    { t: '', spd: 0 },
    { t: 'LOADING PORTFOLIO-OS(R) V7.1.0.8 ...', spd: 18 },
    { t: 'ABOUT SECTION ............................... ONLINE', spd: 14 },
    { t: 'EXPERIENCE SECTION ................................. ONLINE', spd: 14 },
    { t: 'SKILLS SECTION ........................... ONLINE', spd: 14 },
    { t: 'CONTACT SECTION ................................ ONLINE', spd: 14 },
    {
        t: 'PROFESSION-IMAGE UPLINK .......................... NO SIGNAL',
        spd: 12,
        cls: 'warn',
    },
    {
        t: 'SUPER-PROFESSION-IMAGE UPLINK .......................... ONLINE',
        spd: 12,
        cls: 'warn',
    },
    { t: '', spd: 0 },
    { t: 'PORTFOLIO-BOY 3000 MK IV READY.', spd: 12 },
    { t: '', spd: 0 },
    { t: 'A>', spd: 10 },
];

// Flicker consent
function setFlicker(enabled) {
    localStorage.setItem("flicker", enabled);
    consent.style.display = "none";
    if (enabled) {
        crt.classList.remove("stop-flicker");
        pipBoyHandler.classList.add('voltage-flicker');
        flickerPref = true;
    } else {
        crt.classList.add("hidden");
    }
    startBoot();
}
crt.classList.add("hidden");


async function startBoot() {
    if (bootStarted) return;
    bootStarted = true;

    const cur = document.createElement('span');
    cur.id = 'cursor';
    bootText.appendChild(cur);

    for (const line of BOOT_LINES) {
        const tn = document.createTextNode('');
        bootText.insertBefore(tn, cur);

        if (line.t === '') {
            tn.textContent = '\n';
            await sl(80);
            continue;
        }

        for (let i = 0; i < line.t.length; i++) {
            tn.textContent = line.t.slice(0, i + 1);
            await sl(
                0
                //line.spd + (Math.random() > 0.92 ? 80 : 0)
            );
        }
        bootText.insertBefore(document.createTextNode('\n'), cur);
        await sl(55);
    }
    await sl(200);
    showResumeBtn.classList.remove('hide');
}

async function showResumeInfo() {
    await sl(100);
    boot.classList.add("hide");
    app.classList.remove("hidden");
    init();
}

async function init() {
    if (initialized) return;
    initialized = true;

    $('app-header').classList.remove('hide');
    await sl(400);
    $('app-footer').classList.remove('hide');
    await sl(400);

    tabs.innerHTML = "";

    sections.forEach((s, i) => {
        const b = document.createElement("button");
        b.classList.add('crt-btn');
        b.classList.add('text-center');
        b.textContent = s.title;
        b.onclick = () => load(i);
        tabs.appendChild(b);
    });

    $('app-content').classList.remove('hide');
    await sl(400);

    load(0);
}

function load(i) {
    index = i;
    [...tabs.children].forEach(b => b.classList.remove("active"));
    tabs.children[i].classList.add("active");

    const body = typeof sections[i].body === "function"
        ? sections[i].body()
        : sections[i].body;

    content.innerHTML = `<div>${body}</div>`;
    if (soundOn) click.play().catch(() => { });
    if (sections[i].title === "SETTINGS") {
        displayControls.classList.remove("hidden");
    } else {
        displayControls.classList.add("hidden");
    }
}

// Keyboard navigation
window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") load((index + 1) % sections.length);
    if (e.key === "ArrowLeft") load((index - 1 + sections.length) % sections.length);
});

// Sound toggle
// soundToggle.onclick = () => {
//     soundOn = !soundOn;
//     soundToggle.textContent = soundOn ? "🔊" : "🔇";
// };

// Contact
function contactView() {
    return `
<b>CONTACT</b><br>
----------------------------------------<br>
Email&nbsp;&nbsp;&nbsp;&nbsp;: <a href="mailto:shivarao96@gmail.com">shivarao96@gmail.com</a><br>
LinkedIn: <a href="https://www.linkedin.com/in/shivaraoalka/" target="_blank">linkedin.com/in/shivaraoalka</a><br>
GitHub&nbsp;&nbsp;&nbsp;: <a href="https://github.com/shivarao96" target="_blank">github.com/shivarao96</a><br><br><span id="cursor"></span>
`;
}


if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    localStorage.setItem("flicker", "false");
}


app.addEventListener('click', () => {

    if (flickerPref) {
        // Shake the whole screen
        app.classList.remove('shaking');
        void screen.offsetWidth; // reflow
        app.classList.add('shaking');
        setTimeout(() => app.classList.remove('shaking'), 370);
    }
});

function sayThanksAndGoodBye() {
    // window.close();
}