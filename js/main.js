// =========================================================
// Merve Sertdemir — Data Analyst Portfolio
// Vanilla JS: theme toggle, mobile nav, scroll spy,
// hero query typing effect, skills table rendering, contact form.
// =========================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Theme toggle (persisted) ---------------- */
(function () {
  const root = document.body;
  const toggleBtn = document.getElementById('themeToggle');
  const label = document.getElementById('themeLabel');
  const icon = document.getElementById('themeIcon');
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  const sunPath = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  const moonPath = '<path d="M21 12.6A9 9 0 1 1 11.4 3a7 7 0 0 0 9.6 9.6Z"/>';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.removeAttribute('data-theme');
      root.setAttribute('data-theme', 'light');
      label.textContent = 'Light mode';
      icon.innerHTML = sunPath;
      if (metaTheme) metaTheme.setAttribute('content', '#f6f7fa');
    } else {
      root.setAttribute('data-theme', 'dark');
      label.textContent = 'Dark mode';
      icon.innerHTML = moonPath;
      if (metaTheme) metaTheme.setAttribute('content', '#0d1320');
    }
  }

  const saved = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(saved || (prefersLight ? 'light' : 'dark'));

  toggleBtn.addEventListener('click', function () {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });
})();

/* ---------------- Mobile nav ---------------- */
(function () {
  const nav = document.getElementById('mobileNav');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');

  openBtn.addEventListener('click', () => nav.classList.add('open'));
  closeBtn.addEventListener('click', () => nav.classList.remove('open'));
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
})();

/* ---------------- Scroll spy for sidebar nav ---------------- */
(function () {
  const links = document.querySelectorAll('#sidebarNav a');
  const sections = Array.from(links).map((a) =>
    document.querySelector(a.getAttribute('href'))
  );

  function onScroll() {
    let currentIndex = 0;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((sec, i) => {
      if (sec && sec.offsetTop <= scrollPos) currentIndex = i;
    });
    links.forEach((l, i) => l.classList.toggle('active', i === currentIndex));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------------- Hero console typing effect ---------------- */
(function () {
  const target = document.getElementById('typedQuery');
  const resultBox = document.getElementById('queryResult');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { t: 'kw', text: 'SELECT ' },
    { t: 'col', text: 'name, focus_area, status' },
    { t: 'plain', text: '\n' },
    { t: 'kw', text: 'FROM ' },
    { t: 'plain', text: 'candidates' },
    { t: 'plain', text: '\n' },
    { t: 'kw', text: 'WHERE ' },
    { t: 'plain', text: 'sql_skill = ' },
    { t: 'str', text: "'confident'" },
    { t: 'plain', text: '\n  ' },
    { t: 'kw', text: 'AND ' },
    { t: 'plain', text: 'data_quality_mindset = ' },
    { t: 'kw', text: 'TRUE' },
    { t: 'plain', text: '\n' },
    { t: 'kw', text: 'ORDER BY ' },
    { t: 'plain', text: 'availability ' },
    { t: 'kw', text: 'DESC' },
    { t: 'plain', text: ';' },
  ];

  function renderFull() {
    target.innerHTML = lines
      .map((l) =>
        l.t === 'plain' ? l.text : `<span class="${l.t}">${l.text}</span>`
      )
      .join('');
    resultBox.classList.add('show');
  }

  if (reduceMotion) {
    renderFull();
    return;
  }

  let li = 0,
    ci = 0;
  let html = '';

  function typeStep() {
    if (li >= lines.length) {
      resultBox.classList.add('show');
      return;
    }
    const line = lines[li];
    if (ci === 0 && line.t !== 'plain') html += `<span class="${line.t}">`;
    if (ci < line.text.length) {
      html += line.text[ci] === '\n' ? '<br/>' : line.text[ci];
      target.innerHTML = html + '<span class="cursor" style="width:2px;height:14px;"></span>';
      ci++;
      setTimeout(typeStep, line.text[ci - 1] === ' ' ? 8 : 18);
    } else {
      if (line.t !== 'plain') html += '</span>';
      li++;
      ci = 0;
      setTimeout(typeStep, 40);
    }
  }

  // Start typing once the console scrolls into view (or immediately on load)
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        typeStep();
        io.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  io.observe(document.querySelector('.console'));
})();

/* ---------------- Skills data + render ---------------- */
(function () {
  const categories = [
    {
      name: 'Data Analysis',
      note: 'Turning raw tables into a readable answer',
      skills: [
        ['SQL', 'Joins, aggregations, window functions'],
        ['Excel', 'Pivot tables, lookups, reporting'],
        ['SPSS', 'Used for statistical reporting during an internship'],
        ['Data Cleaning', 'Deduplication, type fixes, outlier checks'],
      ],
    },
    {
      name: 'SQL & Databases',
      note: 'Where the analysis actually happens',
      skills: [
        ['SQL Server / SSMS', 'Primary environment across all three internships'],
        ['PostgreSQL', 'DWH analysis and reporting'],
        ['Oracle Database', 'Target environment in a migration project'],
      ],
    },
    {
      name: 'ETL & Data Engineering',
      note: 'Getting data from source to something queryable',
      skills: [
        ['SSIS', 'Built CSV-to-staging load pipelines'],
        ['ETL / ELT concepts', 'Comfortable with the concepts, still building production-scale depth'],
        ['Data Conversion', 'PostgreSQL → Oracle migration during internship'],
      ],
    },
    {
      name: 'Business Intelligence',
      note: 'Turning validated data into a decision-ready view',
      skills: [
        ['Power BI', 'Multi-page dashboards, RFM and cohort views'],
        ['DAX', 'Wrote 8+ measures for a production-style dashboard'],
        ['KPI & Report Design', 'Executive, operational and sales-facing views'],
      ],
    },
    {
      name: 'Data Quality & Testing',
      note: 'The part before the dashboard that most people skip',
      skills: [
        ['Data Validation', 'Null, type and range checks before reporting'],
        ['Data Reconciliation', 'Source vs. target comparisons'],
        ['Data Quality Testing', 'Duplicate and integrity checks, quality reports'],
        ['Database Testing', 'Cross-engine logic checks (SQL Server vs SQLite)'],
      ],
    },
    {
      name: 'Tools',
      note: 'Day-to-day working environment',
      skills: [
        ['Python', 'pandas, scikit-learn — used in personal projects, still learning', true],
        ['Git & GitHub', 'Version control for personal projects'],
        ['Jira & CRM tools', 'Cross-team coordination during internships'],
        ['MS Office & Google Workspace', 'Reporting and documentation'],
        ['AI-assisted tools (Claude, Gemini)', 'Used to speed up analysis and documentation'],
      ],
    },
  ];

  const wrap = document.getElementById('skillsCats');

  categories.forEach((cat) => {
    const catEl = document.createElement('div');
    catEl.className = 'skill-cat';

    const rows = cat.skills
      .map(([name, note, isPython101]) => `
        <tr>
          <td>${name}${isPython101 ? '<span class="skill-tag-101">101</span>' : ''}</td>
          <td class="note">${note}</td>
        </tr>`)
      .join('');

    catEl.innerHTML = `
      <div class="skill-cat-head">
        <h3>${cat.name}</h3>
        <span>— ${cat.note}</span>
      </div>
      <table class="skill-table"><tbody>${rows}</tbody></table>
    `;

    wrap.appendChild(catEl);
  });
})();

/* ---------------- Contact form (mailto fallback) ---------------- */
(function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in every field.';
      status.className = 'form-status show err';
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:srtdmrmerve@icloud.com?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your email client…';
    status.className = 'form-status show ok';
  });
})();
