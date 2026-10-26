// About page markup, built from the home page's About components
// (about7, capabilities, why-choose, mv/values, leadership, clients marquee).
import { CLIENTS } from './site/data.mjs';
import { esc, img } from './site/ui.mjs';

const bi = (n) => `<i class="bi bi-${n}"></i>`;
const caps = [
  ['bricks', 'Hardscape & Civil Finishing', 'hardscape-civil-finishing'], ['tools', 'Landscape Execution', 'landscaping-site-execution'],
  ['tree', 'Softscape & Plantation', 'softscape-plantation'], ['flower1', 'Gardening & Garden Maintenance', 'gardening-maintenance'],
  ['grid-3x3', 'Vertical & Terrace Gardens', 'vertical-gardens'],
  ['droplet-half', 'Irrigation Solutions', 'irrigation-solutions'], ['arrow-repeat', 'Tree Transplantation', 'tree-transplantation'],
  ['clipboard2-pulse', 'Horticulture Consultancy', 'horticulture-consultancy'], ['shop', 'Plant Nursery & Plant Supply', 'plant-nursery-supply'],
  ['gear-wide-connected', 'Fabrication & Allied Works', 'fabrication-allied-works'],
];
const pillars = [
  ['bullseye', 'Execution-Focused Approach', 'Our focus is on delivering work on site, with attention to quality, coordination and finishing.'],
  ['bricks', 'Strong Hardscape Expertise', 'Hardscape and civil finishing are an important part of our project execution capabilities.'],
  ['diagram-3', 'Integrated Hardscape & Softscape', 'We bring the built and natural elements of an outdoor space together for a cohesive result.'],
  ['check-all', 'Quality Workmanship', 'We focus on proper execution, finishing and attention to detail across every stage of the work.'],
  ['flower2', 'Practical Outdoor Solutions', 'Our approach balances aesthetics with functionality, durability and ease of use.'],
  ['compass', 'Project-Focused Delivery', 'Every project is approached according to its site conditions, scope, requirements and execution priorities.'],
];
const values = [
  ['award', 'Quality', 'We focus on quality workmanship, materials and execution at every stage.'],
  ['gear', 'Execution', 'A good landscape is not only about how it looks, but also about how effectively it is built and maintained.'],
  ['shield-check', 'Reliability', 'We work with clear communication, coordinated execution and commitment to project requirements.'],
  ['droplet', 'Sustainability', 'We encourage practical solutions that support efficient water use, healthy plantation and long-term landscape performance.'],
  ['person-check', 'Accountability', 'We take ownership of our work and strive to deliver as committed.'],
];
const TEAM = [
  {
    name: 'Amit Walawalkar',
    role: 'Founder Director',
    isFounder: true,
    education: 'M. Sc. (Agri)',
    specialty: 'Gold Medalist · Landscape Expert',
    experienceYears: '30 Years Exp.',
    image: 'assets/images/team/amit-walawalkar.webp',
    bio: 'Landscape & horticulture authority with 30 years spearheading commercial nurseries, hybrid seed production, large-scale public infrastructure consulting and mega tree transplantation.',
    skills: [
      'Commercial Plant Nursery',
      'Hybrid Seed Production',
      'Plantation of Horticultural Crops',
      'Landscaping Execution',
      'Hardscape / Civil Finishing Works',
      'Tree Transplantation',
      'Tree Plantation',
      'Irrigation Works',
      'Gardening & Maintenance',
      'Fabrication',
      'Vertical Gardens',
      'Terrace Gardens',
      'Fountains & Waterfalls',
      'Flower Shows'
    ]
  },
  {
    name: 'Santosh Shelar',
    role: 'Director',
    isFounder: false,
    education: 'B. Sc. (Agri)',
    specialty: 'Site & Tree Specialist',
    experienceYears: '32 Years Exp.',
    image: 'assets/images/team/santosh-shelar.webp',
    bio: 'With 32 years of comprehensive field mastery, Santosh directs high-end bungalow gardens, commercial nursery operations, complex tree transplanting and architectural vertical green walls.',
    skills: [
      'Commercial Plant Nursery',
      'Landscaping Execution',
      'Tree Transplantation',
      'Tree Plantation',
      'Gardening & Garden Maintenance',
      'Vertical Gardens',
      'Terrace Gardens',
      'Indoor Plants',
      'Bungalow Gardens'
    ]
  },
  {
    name: 'Dnyaneshwar Pednekar',
    role: 'Director',
    isFounder: false,
    education: 'M. Sc. (Agri)',
    specialty: 'Cultivation & Sourcing',
    experienceYears: '29 Years Exp.',
    image: 'assets/images/team/dnyaneshwar-pednekar.webp',
    bio: 'Holding 29 years of specialised agrarian and horticulture expertise, Dnyaneshwar drives precision plant propagation, exotic species sourcing, crop plantation and site horticultural health.',
    skills: [
      'Commercial Plant Nursery',
      'Growing & Sourcing of Plants',
      'Plantation of Horticultural Crops',
      'Landscaping Execution',
      'Gardening & Maintenance'
    ]
  }
];
const timeline = [
  ['1995', 'B.Sc. (Agriculture)', 'Konkan Agricultural University, Dapoli — passed with distinction and awarded the Gold Medal for first rank.'],
  ['1997', 'M.Sc. (Horticulture)', 'Specialisation in Olericulture, Konkan Agricultural University — passed with distinction.'],
  ['2004–2014', 'Divisional Manager, Green Grower', 'Garden and landscape division of Pest Control (India) Pvt. Ltd.'],
  ['2014', 'Founded 7 Petals Horticulture', 'Registered on 25 August 2014, with a nursery at Karjat and an office in Vikhroli (East), Mumbai.'],
  ['Today', 'Consultant on public projects', 'Tree transplanting for Mumbai Metro Rail Corporation, tree plantation for Samruddhi Mahamarg and garden development for Mumbai Port Authority.'],
];
const logoItems = CLIENTS.map(([f, n]) => `<div class="client-logo-item"><img src="assets/images/7petals-logo/${f}" alt="${esc(n)}" class="client-logo-img" loading="lazy"></div>`).join('');

export function aboutBody({ hero, ctaBand, head }) {
  return `
${hero}

  <!-- Story -->
  <section id="about" class="about7-section">
    <div class="about7-bg-texture"></div>
    <div class="container position-relative">
      <div class="about7-eyebrow"><span class="badge-dot-green"></span><span>ABOUT 7 PETALS</span><span class="about7-eyebrow-line"></span></div>
      <div class="about7-grid">
        <div class="about7-copy reveal-on-scroll">
          <h2 class="about7-heading">Turning Planned Spaces<br><em class="about7-heading-em">Into Lasting Landscapes.</em></h2>
          <p class="about7-lead">7 Petals Horticulture delivers landscape execution, hardscape, civil finishing and horticulture solutions for residential, commercial and institutional spaces.</p>
          <div class="about7-narratives">
            <div class="about7-narrative-item reveal-on-scroll delay-1"><div class="about7-ni-icon">${bi('shield-check')}</div><div class="about7-ni-body"><h4>Quality Execution</h4><p>Our strength lies in turning planned spaces into functional, durable and visually appealing environments through quality execution and coordinated site work.</p></div></div>
            <div class="about7-narrative-item reveal-on-scroll delay-2"><div class="about7-ni-icon">${bi('layers-half')}</div><div class="about7-ni-body"><h4>One-Roof Integration</h4><p>From hard landscaping and civil finishing to softscape, gardening, irrigation and plant solutions — multiple landscape requirements, one partner.</p></div></div>
            <div class="about7-narrative-item reveal-on-scroll delay-3"><div class="about7-ni-icon">${bi('compass')}</div><div class="about7-ni-body"><h4>Execution-Focused Approach</h4><p>We work closely with clients, project teams and stakeholders to balance functionality, durability, aesthetics and long-term maintenance.</p></div></div>
          </div>
          <div class="about7-ctas reveal-on-scroll delay-3">
            <a href="#what-we-do" class="btn-editorial btn-editorial-primary"><span>EXPLORE WHAT WE DO</span>${bi('arrow-down')}</a>
            <a href="contact.html" class="btn-editorial btn-editorial-outline"><span>GET IN TOUCH</span>${bi('chat-dots')}</a>
          </div>
        </div>
        <div class="about7-mosaic reveal-on-scroll delay-1">
          <div class="about7-img-hero">${img('crown-podium', { sizes: '(min-width: 992px) 45vw, 100vw' })}<div class="about7-img-overlay"></div>
            <div class="about7-img-tag">${bi('geo-alt-fill')} Landscape Execution</div>
            <div class="about7-float-badge">${bi('award-fill')}<span>Est.<br>2014</span></div></div>
          <div class="about7-img-stack">
            <div class="about7-img-thumb">${img('seawoods-epdm', { sizes: '(min-width: 992px) 22vw, 50vw' })}<div class="about7-img-overlay"></div><div class="about7-img-tag">${bi('layers-half')} Hardscape</div></div>
            <div class="about7-img-thumb">${img('vaikunth-flowers', { sizes: '(min-width: 992px) 22vw, 50vw' })}<div class="about7-img-overlay"></div><div class="about7-img-tag">${bi('flower1')} Softscape</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- At a glance -->
  <section class="section-padding-sm inner-glance">
    <div class="container"><div class="row g-0 text-center">
      <div class="col-6 col-lg-3 inner-glance-item reveal-on-scroll"><span class="inner-glance-num">2014</span><span class="inner-glance-label">Established, Mumbai</span></div>
      <div class="col-6 col-lg-3 inner-glance-item reveal-on-scroll delay-1"><span class="inner-glance-num">29+</span><span class="inner-glance-label">Years founder experience</span></div>
      <div class="col-6 col-lg-3 inner-glance-item reveal-on-scroll delay-2"><span class="inner-glance-num">1,000+</span><span class="inner-glance-label">Trees transplanted by our founder</span></div>
      <div class="col-6 col-lg-3 inner-glance-item reveal-on-scroll delay-3"><span class="inner-glance-num">Karjat</span><span class="inner-glance-label">Own plant nursery</span></div>
    </div></div>
  </section>

  <!-- What we do -->
  <section id="what-we-do" class="section-padding bg-alt">
    <div class="container">
      ${head('WHAT WE DO', 'Comprehensive Capabilities.|Under One Roof.', 'Integrated solutions across hard landscape, softscape, irrigation and specialised horticultural works.', true)}
      <div class="capabilities-grid reveal-on-scroll delay-1">${caps.map(([ic, t, s]) => `
        <a class="capability-card inner-cap-link" href="service-${s}.html"><div class="capability-icon-wrap">${bi(ic)}</div><h3 class="capability-title">${esc(t)}</h3></a>`).join('')}
      </div>
    </div>
  </section>

  <!-- Why choose -->
  <section id="bento" class="section-padding why-choose-section">
    <div class="container">
      <div class="why-choose-header text-center max-w-750 mx-auto mb-5">
        <div class="services-eyebrow mx-auto mb-3">WHY CHOOSE US</div>
        <h2 class="heading-editorial">Built for Execution.<br><em>Finished with Care.</em></h2>
        <p class="subheading-editorial mx-auto">Choosing the right landscape execution partner takes experience across hardscape, civil finishing, softscape, horticulture, irrigation and site execution.</p>
      </div>
      <div class="why-choose-grid">
        <div class="why-spotlight-card">${img('seawoods-path', { sizes: '(min-width: 992px) 45vw, 100vw', cls: 'why-spotlight-bg' })}<div class="why-spotlight-overlay"></div>
          <div class="why-spotlight-content">
            <h3 class="why-spotlight-title">More Than Landscaping.<br>Built for Execution.</h3>
            <p class="why-spotlight-desc">Led by <strong>qualified horticulturists</strong>, we coordinate <strong>hardscape, civil finishing, softscape, gardening, irrigation and plantation</strong> through one execution partner — from groundwork to finishing.</p>
            <div class="why-team-footer"><div class="why-mini-stats">
              <div class="mini-stat-item"><span class="mini-stat-num">25+</span><span class="mini-stat-text">Years leadership experience</span></div><div class="mini-stat-divider"></div>
              <div class="mini-stat-item"><span class="mini-stat-num">3 acre</span><span class="mini-stat-text">Karjat nursery</span></div><div class="mini-stat-divider"></div>
              <div class="mini-stat-item"><span class="mini-stat-num">360&deg;</span><span class="mini-stat-text">End-to-end solutions</span></div>
            </div></div>
          </div></div>
        <div class="why-pillars-column">${pillars.map(([ic, t, d]) => `
          <div class="why-pillar-card"><div class="pillar-icon-box">${bi(ic)}</div><div class="pillar-content"><h4 class="pillar-title">${esc(t)}</h4><p class="pillar-desc">${esc(d)}</p></div></div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- Mission, vision, values -->
  <section id="mission-vision-values" class="section-padding bg-main">
    <div class="container">
      ${head('MISSION, VISION & VALUES', 'Purpose & Principles.|Shaping Every Project.', 'The commitments that drive excellence across landscape execution and long-term performance.', true)}
      <div class="mv-grid reveal-on-scroll delay-1">
        <div class="mv-card vision"><div class="mv-card-header"><div class="mv-icon-badge">${bi('eye')}</div><div><h3 class="mv-title">Our Vision</h3></div></div><p class="mv-desc">To be a trusted name in landscape execution, hardscape and horticulture solutions, creating functional, sustainable and well-maintained outdoor spaces.</p></div>
        <div class="mv-card mission"><div class="mv-card-header"><div class="mv-icon-badge">${bi('bullseye')}</div><div><h3 class="mv-title">Our Mission</h3></div></div><p class="mv-desc">To deliver quality landscape and horticulture solutions through strong execution, skilled workmanship, reliable materials and professional project coordination.</p></div>
      </div>
      <div class="reveal-on-scroll delay-2">
        <div class="d-flex align-items-center justify-content-between mb-4"><h3 class="heading-editorial-sm mb-0">Our Values</h3><span class="badge-editorial m-0">${bi('stars')} Core Standards</span></div>
        <div class="values-grid">${values.map(([ic, t, d], i) => `
          <div class="value-card"><div class="value-card-num">0${i + 1} / PRINCIPLE</div><div class="value-icon-box">${bi(ic)}</div><h4 class="value-title">${esc(t)}</h4><p class="value-desc">${esc(d)}</p></div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- Leadership -->
  <section id="leadership" class="section-padding bg-alt team-leadership-section">
    <div class="container">
      ${head('LEADERSHIP & EXPERTISE', 'The People|Behind 7 Petals.', '7 Petals is guided by qualified agricultural scientists and industry veterans with over 90 years of combined hands-on experience across horticulture, commercial nurseries, tree transplantation and comprehensive landscape execution.', true)}
      
      <!-- Combined Strength Metrics -->
      <div class="team-metrics-bar reveal-on-scroll mb-5">
        <div class="team-metric-item">
          <span class="team-metric-val">90+</span>
          <span class="team-metric-lbl">Years Combined Experience</span>
        </div>
        <div class="team-metric-item">
          <span class="team-metric-val">100%</span>
          <span class="team-metric-lbl">Agri Science Leaders (M.Sc / B.Sc)</span>
        </div>
        <div class="team-metric-item">
          <span class="team-metric-val">1,000+</span>
          <span class="team-metric-lbl">Trees Successfully Transplanted</span>
        </div>
        <div class="team-metric-item">
          <span class="team-metric-val">Hands-On</span>
          <span class="team-metric-lbl">Direct Field &amp; Quality Oversight</span>
        </div>
      </div>

      <!-- Leadership Cards Grid -->
      <div class="row g-4 team-cards-grid align-items-stretch">
        ${TEAM.map((m, i) => `
        <div class="col-lg-4 col-md-6 reveal-on-scroll delay-${i}">
          <div class="team-member-card${m.isFounder ? ' highlight-founder' : ''}">
            <div class="team-photo-wrap">
              <img src="${m.image}" alt="${esc(m.name)} - ${esc(m.role)}" class="team-photo" loading="lazy" width="480" height="600">
              <span class="team-badge-role${m.isFounder ? ' founder' : ''}">${bi(m.isFounder ? 'patch-check-fill' : 'award-fill')} ${esc(m.role)}</span>
              <span class="team-badge-exp">${bi('clock-history')} ${esc(m.experienceYears)}</span>
            </div>
            <div class="team-card-content">
              <div class="team-card-header">
                <h3 class="team-name">${esc(m.name)}</h3>
                <div class="team-edu-role">
                  <span class="team-edu-pill">${bi('mortarboard-fill')} ${esc(m.education)}</span>
                  <span class="team-spec-pill">${esc(m.specialty)}</span>
                </div>
              </div>
              <p class="team-bio-summary">${esc(m.bio)}</p>
              <div class="team-expertise-section">
                <span class="team-expertise-heading">${bi('grid-fill')} Core Expertise &amp; Specializations:</span>
                <div class="team-skill-tags">
                  ${m.skills.map((s) => `<span class="skill-tag">${esc(s)}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>`).join('')}
      </div>

      <!-- Credentials & Directorial Ethos -->
      <div class="team-bottom-panels mt-5">
        <div class="row g-4 align-items-stretch">
          <div class="col-lg-7 reveal-on-scroll">
            <div class="team-credentials-card">
              <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <h3 class="heading-editorial-sm mb-0">Credentials &amp; Institutional Consulting</h3>
                <span class="badge-editorial m-0">${bi('shield-check')} Proven Track Record</span>
              </div>
              <ol class="inner-timeline">${timeline.map(([y, t, d]) => `
                <li><span class="inner-timeline-year">${esc(y)}</span><div><h4>${esc(t)}</h4><p>${esc(d)}</p></div></li>`).join('')}
              </ol>
            </div>
          </div>
          <div class="col-lg-5 reveal-on-scroll delay-1">
            <div class="team-ethos-card">
              <div class="ethos-badge">${bi('compass')} DIRECTORIAL PHILOSOPHY</div>
              <h3 class="ethos-title">Hands-On Science.<br><em>Zero Compromise on Ground.</em></h3>
              <p class="ethos-desc">Unlike traditional landscape contractors who delegate critical horticultural decisions to third-party labourers, every project at 7 Petals is personally overseen by qualified agricultural scientists.</p>
              <div class="ethos-highlights">
                <div class="ethos-highlight-item">
                  ${bi('check-circle-fill')}
                  <div><strong>Direct Ground Oversight:</strong> Directors remain actively involved on site, ensuring specifications, soil biology and civil details meet exact standards.</div>
                </div>
                <div class="ethos-highlight-item">
                  ${bi('check-circle-fill')}
                  <div><strong>Agrarian Science Foundation:</strong> Plant selection, health diagnostics and transplanting methods backed by 90+ years of botanical science.</div>
                </div>
                <div class="ethos-highlight-item">
                  ${bi('check-circle-fill')}
                  <div><strong>Single-Point Execution:</strong> Seamless integration between commercial nursery supply, civil hardscape and long-term garden maintenance.</div>
                </div>
              </div>
              <div class="ethos-quote-footer">
                <p>“At 7 Petals, our leadership remains directly rooted in field execution, plant science and lasting landscape performance.”</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Clients -->
  <section class="clients-marquee-section">
    <div class="container text-center mb-4 reveal-on-scroll">
      <div class="services-eyebrow mb-2"><span>CLIENTS &amp; PARTNERS</span></div>
      <h2 class="heading-editorial-sm mb-0">Clients We Have <em>Worked With.</em></h2>
    </div>
    <div class="container-fluid px-0 reveal-scale delay-1"><div class="marquee-container"><div class="marquee-content">${logoItems}${logoItems}</div></div></div>
  </section>

${ctaBand}`;
}
