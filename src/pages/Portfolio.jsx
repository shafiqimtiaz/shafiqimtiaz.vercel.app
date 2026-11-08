import { useEffect, useRef, useState } from 'react';

const RESUME = '/docs/Resume-Shafiq-Imtiaz.pdf';

const chapters = [
  { id: 'top', label: 'Shafiq Imtiaz' },
  { id: 's1', label: 'The problem' },
  { id: 's2', label: 'Understanding' },
  { id: 's3', label: 'Agentic' },
  { id: 's4', label: 'People decide' },
  { id: 's5', label: 'Build' },
  { id: 's6', label: 'Result' },
];

const heroStats = [
  { to: 99, suf: '%', text: '99%', label: 'less setup time', color: 'var(--acc)' },
  { to: 2500, suf: '+', text: '2,500+', label: 'client configurations', color: 'var(--butter)' },
  {
    to: 50000,
    suf: '+',
    text: '50,000+',
    label: 'integrations analysed by AI',
    color: 'var(--peach)',
  },
  { to: 8000, suf: '+', text: '8,000+', label: 'integrations secured', color: 'var(--sky)' },
];

const why = [
  {
    title: 'Agent systems',
    text: 'Multi-agent orchestration, tool use, MCP, Claude Code plugins.',
    stat: '2 wks → 2 hrs',
    note: 'FlexForge',
  },
  {
    title: 'Retrieval',
    text: 'RAG, embeddings and reranking over messy, real-world data.',
    stat: '−50%',
    note: 'manual review time',
  },
  {
    title: 'Production AI',
    text: 'Model choice per task, cost tracking, guardrails for sensitive data.',
    stat: '50,000+',
    note: 'integrations analysed by AI',
  },
  {
    title: 'Full stack',
    text: 'TypeScript, React, Java and Spring Boot, Node.js, AWS.',
    stat: '2,500+',
    note: 'client configurations served',
  },
];

const work = [
  {
    title: 'AI Field Recommendations',
    text: 'Embeddings and reranking that suggest data mappings with confidence scores.',
    stat: '−50%',
    note: 'manual review time',
  },
  {
    title: 'AI Integration Analysis',
    text: 'Persona-based AI review of integrations that blocks sensitive data.',
    stat: '50,000+',
    note: 'integrations reviewed',
  },
  {
    title: 'Credentials Manager',
    text: 'Secure credential management, from API to UI.',
    stat: '8,000+',
    note: 'active integrations',
  },
  {
    title: 'Platform modernisation',
    text: 'Core services moved to Java 17 and Spring Boot 3.',
    stat: '−20%',
    note: 'API latency, 5 services',
  },
  {
    title: 'KemonPoray',
    text: 'Anonymous professor ratings for students in Bangladesh. My own product.',
    stat: '21,000+',
    note: 'professors, 180+ universities',
    href: 'https://www.kemonporay.com/',
  },
  {
    title: 'RAG chatbot',
    text: 'Internal hackathon build on company data.',
    stat: '$1,000',
    note: 'runner-up prize',
  },
];

const experience = [
  {
    when: '2026 to now',
    title: 'Principal engineer',
    text: 'Flexspring, Toronto. FlexForge, Agent Core, Local Stack.',
  },
  {
    when: '2024 to 2026',
    title: 'R&D and AI',
    text: 'Flexspring, Ottawa. AI analysis, AI recommendations, Agent Core.',
  },
  {
    when: '2023 to 2024',
    title: 'Intern',
    text: 'Flexspring, Montreal. 20+ UI components, 40% better rendering.',
  },
  {
    when: '2019 to 2021',
    title: 'Full stack developer',
    text: 'BSRM, Chittagong. 89% more efficient planning, 40+ vendors.',
  },
];

function Chips({ items }) {
  return (
    <div className="chips">
      {items.map(([label, color]) => (
        <span key={label}>
          <i style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

function Stat({ to, suf = '', text, note, color }) {
  return (
    <div className="stat" style={color ? { '--c': color } : undefined}>
      <b {...(to != null ? { 'data-to': to, 'data-suf': suf } : {})}>{text}</b>
      <small>{note}</small>
    </div>
  );
}

export default function Portfolio() {
  const canvasRef = useRef(null);
  const storyRef = useRef(null);
  const solidRef = useRef(null);
  const indexRef = useRef(null);
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const lenisRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let ff = null;
    let stopCount = null;
    let cancelled = false;
    // three.js is large, so the film loads after the page has painted.
    import('../lib/flexforge').then(({ initFlexForge, initCountUp }) => {
      if (cancelled) return;
      try {
        ff = initFlexForge({
          canvas: canvasRef.current,
          root: storyRef.current,
          solid: solidRef.current,
          index: indexRef.current,
        });
        lenisRef.current = ff.lenis;
      } catch {
        // No WebGL: the copy still reads top to bottom without the particles.
        canvasRef.current.style.display = 'none';
      }
      stopCount = initCountUp(rootRef.current);
    });
    return () => {
      cancelled = true;
      if (stopCount) stopCount();
      if (ff) ff.destroy();
    };
  }, []);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoaded(true);
      return undefined;
    }
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9));
      setLoading(n);
      if (n >= 100) {
        clearInterval(iv);
        setTimeout(() => setLoaded(true), 200);
      }
    }, 40);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) menuOpen ? lenis.stop() : lenis.start();
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="ff" ref={rootRef}>
      <canvas id="gl" ref={canvasRef} aria-hidden="true" />
      <div className="vig" aria-hidden="true" />
      {loading < 101 && (
        <div
          className={`pre${loaded ? ' done' : ''}`}
          aria-hidden="true"
          onTransitionEnd={() => setLoading(101)}
        >
          <div className="c">{loading}</div>
          <div className="l">loading FlexForge</div>
        </div>
      )}

      <header className="nav">
        <a className="brand" href="#top">
          <b>SI</b>Shafiq Imtiaz
        </a>
        <nav aria-label="Primary">
          <a href="#s1">FlexForge</a>
          <a href="#why">Why me</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          ref={menuRef}
          className="menu-btn"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="sheet"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>
      <div className="sheet" id="sheet" hidden={!menuOpen}>
        <nav aria-label="Mobile" onClickCapture={() => setMenuOpen(false)}>
          <a href="#s1">FlexForge</a>
          <a href="#why">Why me</a>
          <a href="#more">Also built</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <p>shafiqimtiaz@gmail.com</p>
      </div>

      <nav className="idx" aria-label="FlexForge chapters" ref={indexRef}>
        {chapters.map((c, i) => (
          <a key={c.id} href={`#${c.id}`} data-i={i}>
            <span>{c.label}</span>
            <i />
          </a>
        ))}
      </nav>

      <main>
        <section className="story" ref={storyRef}>
          <div className="hero" id="top" data-s="0">
            <h1>Shafiq Imtiaz, AI and agentic engineer</h1>
            <div className="row">
              <div>
                <div className="role">AI and agentic engineer, Principal at Flexspring</div>
                <p>
                  I design agent systems that do weeks of expert work in hours.{' '}
                  <span>
                    Most recently FlexForge: two weeks of integration setup, now two hours.
                  </span>
                </p>
              </div>
              <div className="scroll">scroll</div>
            </div>
            <div className="hstats">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <b data-to={s.to} data-suf={s.suf} style={{ color: s.color }}>
                    {s.text}
                  </b>
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="stage r" id="s1" data-s="1">
            <div className="copy">
              <div className="k">
                <b>FlexForge</b>
                <span>01 / the problem</span>
              </div>
              <h2>Every integration began with weeks of reading.</h2>
              <p>
                Before a client&apos;s HR and payroll systems could talk, specialists worked through
                a pile of meetings, specs and spreadsheets by hand. About two weeks per integration.
              </p>
              <Chips
                items={[
                  ['meetings', 'var(--sky)'],
                  ['spreadsheets', 'var(--acc)'],
                  ['specs', 'var(--butter)'],
                  ['notes', 'var(--peach)'],
                  ['credentials', 'var(--rose)'],
                ]}
              />
              <Stat
                to={2}
                suf=" weeks"
                text="2 weeks"
                note="of reading per integration, by hand"
                color="var(--peach)"
              />
            </div>
          </div>

          <div className="stage" id="s2" data-s="2">
            <div className="copy">
              <div className="k">
                <b>FlexForge</b>
                <span>02 / understanding</span>
              </div>
              <h2>So I built a system that reads all of it.</h2>
              <p>
                FlexForge takes in everything a client shares, organises it into searchable
                knowledge, and turns it into structured requirements.
              </p>
              <Stat
                to={2500}
                suf="+"
                text="2,500+"
                note="client configurations on the platform it serves"
                color="var(--butter)"
              />
            </div>
          </div>

          <div className="stage r" id="s3" data-s="3">
            <div className="copy">
              <div className="k">
                <b>FlexForge</b>
                <span>03 / agentic by design</span>
              </div>
              <h2>Too big for one prompt, so it works as a team.</h2>
              <p>
                I designed it as a multi-agent system: one agent plans, others each build a piece,
                and the work is checked and repaired before a person ever sees it.
              </p>
              <Stat text="1 click" note="from approved requirements to a built integration" />
            </div>
          </div>

          <div className="stage" id="s4" data-s="4">
            <div className="copy">
              <div className="k">
                <b>FlexForge</b>
                <span>04 / people stay in control</span>
              </div>
              <h2>Specialists decide. Agents do the rest.</h2>
              <p>
                Every proposed requirement is accepted or rejected by a person. What&apos;s accepted
                becomes the plan for the integration.
              </p>
              <Chips
                items={[
                  ['business', 'var(--peach)'],
                  ['data', 'var(--sky)'],
                  ['functional', 'var(--acc)'],
                  ['rejected', '#3c403d'],
                ]}
              />
              <Stat
                to={100}
                suf="%"
                text="100%"
                note="of requirements reviewed by a specialist"
                color="var(--sky)"
              />
            </div>
          </div>

          <div className="stage r" id="s5" data-s="5">
            <div className="copy">
              <div className="k">
                <b>FlexForge</b>
                <span>05 / build</span>
              </div>
              <h2>Then it builds the integration.</h2>
              <p>
                Credentials, data mappings and the integration process itself, generated from those
                decisions and ready to run.
              </p>
              <Chips
                items={[
                  ['credentials', 'var(--rose)'],
                  ['mappings', 'var(--sky)'],
                  ['lookups', 'var(--butter)'],
                  ['process', 'var(--acc)'],
                ]}
              />
              <Stat
                to={4}
                text="4"
                note="parts of every integration, generated together"
                color="var(--rose)"
              />
            </div>
          </div>

          <div className="result" id="s6" data-s="6">
            <div className="k">
              <b>FlexForge</b>
              <span>06 / result</span>
            </div>
            <div className="big">
              2 weeks
              <br />→ <em className="grad">2 hours</em>
            </div>
            <p>
              <strong>
                <span data-to={99} data-suf="%">
                  99%
                </span>{' '}
                less setup time
              </strong>{' '}
              per integration, on a platform serving 2,500+ client configurations. I designed
              FlexForge and drive it end to end.
            </p>
          </div>
        </section>

        <div className="solid" ref={solidRef}>
          <section className="sec wrap" id="why">
            <header>
              <h2>Why I fit agentic AI work</h2>
              <p>
                Shipping software since 2019, from enterprise tools in Bangladesh to production AI
                that teams at Flexspring rely on.
              </p>
            </header>
            <div className="why">
              {why.map((w) => (
                <div key={w.title}>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <b>
                    {w.stat}
                    <small>{w.note}</small>
                  </b>
                </div>
              ))}
            </div>
          </section>

          <section className="sec wrap" id="more">
            <header>
              <h2>Also built</h2>
              <p>Two tools I built for my team.</p>
            </header>
            <div className="duo">
              <article>
                <div className="k">
                  <b>Flexspring Agent Core</b>
                  <span>Claude Code plugin</span>
                </div>
                <h3>Claude Code, fluent in Flexspring.</h3>
                <p>
                  Agents, MCP servers and skills in one plugin. Install it and Claude Code knows how
                  Flexspring builds software.
                </p>
                <div className="ms">
                  <div>
                    <b>days → hours</b>
                    <small>to set up a new agent</small>
                  </div>
                  <div>
                    <b>+63%</b>
                    <small>tests, 81 → 132, with CI/CD</small>
                  </div>
                </div>
              </article>
              <article>
                <div className="k">
                  <b>Local Stack + Stack TUI</b>
                  <span>Docker, OpenTUI</span>
                </div>
                <h3>The whole platform, one command.</h3>
                <p>
                  Replaced hand-built Docker setups with one stack and a terminal UI my teammates
                  like using.
                </p>
                <div className="ms">
                  <div>
                    <b>1 command</b>
                    <small>laptop to running platform</small>
                  </div>
                  <div>
                    <b>1 file</b>
                    <small>one compose file for every service</small>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="sec wrap" id="work">
            <header>
              <h2>More work</h2>
              <p>Each with the number that mattered.</p>
            </header>
            <div className="list">
              {work.map((w) => {
                const body = (
                  <>
                    <span className="t">{w.title}</span>
                    <span className="d">{w.text}</span>
                    <span className="m">
                      {w.stat}
                      <small>{w.note}</small>
                    </span>
                  </>
                );
                return w.href ? (
                  <a key={w.title} className="row" href={w.href} target="_blank" rel="noreferrer">
                    {body}
                  </a>
                ) : (
                  <div key={w.title} className="row">
                    {body}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="sec wrap" id="experience">
            <header>
              <h2>Experience</h2>
              <p>Flexspring since 2023, after building enterprise tools in Bangladesh.</p>
            </header>
            <div className="xp">
              {experience.map((x) => (
                <div key={x.when}>
                  <time>{x.when}</time>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap end" id="contact">
            <p className="q">Building agents or AI platforms? Let&apos;s talk.</p>
            <a className="mail" href="mailto:shafiqimtiaz@gmail.com">
              <span>shafiqimtiaz@gmail.com</span>
            </a>
            <div className="cta">
              <a className="btn p" href={RESUME} target="_blank" rel="noreferrer">
                Download résumé
              </a>
              <a
                className="btn"
                href="https://linkedin.com/in/shafiqimtiaz"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn"
                href="https://github.com/shafiqimtiaz"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="foot">
              <span>© 2026 Shafiq Imtiaz, Toronto</span>
              <span>AWS Certified AI Practitioner</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
