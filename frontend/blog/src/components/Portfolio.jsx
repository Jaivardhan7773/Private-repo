import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  Code2, Cpu, Globe, Github, Linkedin, Twitter, Mail,
  Download, ExternalLink, Terminal, Layers, Zap, ArrowRight,
  Calendar, MapPin, Award, ChevronRight, Server, Database,
  Braces, Smartphone, Cloud, Shield
} from 'lucide-react';
import Footer from './footer';
import SEO from './SEO';

// ─── Data ──────────────────────────────────────────────────────────────

const SKILLS = {
  'AI & Agents': [
    'Gemini 2.5 Flash', 'Anthropic Claude', 'Agentic Workflows',
    'MCP Protocol', 'LLM Orchestration', 'Google AI SDK'
  ],
  'Full Stack': [
    'React 18', 'Node.js', 'Express', 'Next.js', 'TypeScript', 'REST APIs'
  ],
  'Database & Cloud': [
    'MongoDB', 'Cloudinary', 'Firebase', 'Coolify', 'VPS Deployment', 'Render'
  ],
  'DevOps & Tools': [
    'Git', 'Docker (basics)', 'CI/CD', 'Vite', 'Postman', 'Linux CLI'
  ],
};

const EXPERIENCE = [
  {
    role: 'Lead Full Stack & AI Engineer',
    company: 'Aigiglab',
    period: 'Current',
    type: 'Full-time',
    points: [
      'Leading development of production AI-powered SaaS products',
      'Architecting agentic workflows using Gemini 2.5 Flash + MCP servers',
      'Built InstaForm AI — intelligent form generation platform',
      'Developed Remotion AI for automated video generation pipelines',
    ],
  },
];

const PROJECTS = [
  {
    title: 'TrendPulse AI (This Platform)',
    desc: 'Autonomous AI blog platform that scrapes Google Trends live, picks the top trending topic by search volume, generates a 500+ word journalist-style article using Gemini 2.5 Flash, fetches a relevant cover image, uploads to Cloudinary — all on a 2-hour cron. Zero human input.',
    stack: ['React', 'Node.js', 'Gemini API', 'Google Trends', 'MongoDB', 'Cloudinary'],
    link: 'https://trendingtopics.space',
    highlight: true,
  },
  {
    title: 'InstaForm AI',
    desc: 'AI-powered dynamic form builder. Users describe their form in plain English; the system generates fully functional, styled forms with validation in seconds.',
    stack: ['React', 'Gemini API', 'Node.js', 'MongoDB'],
    link: null,
  },
  {
    title: 'Telegram MCP Server',
    desc: 'Custom MCP (Model Context Protocol) server enabling Claude and Gemini agents to send, read, and manage Telegram messages programmatically via tool calls.',
    stack: ['Node.js', 'MCP Protocol', 'Telegram Bot API', 'TypeScript'],
    link: null,
  },
  {
    title: 'SpeedTalk',
    desc: 'Real-time messaging application with sub-100ms latency, JWT auth, and persistent message history.',
    stack: ['React', 'Node.js', 'WebSockets', 'MongoDB', 'JWT'],
    link: null,
  },
];

const CERTS = [
  'Anthropic Claude AI Developer Certification',
  'Full Stack Web Development — MERN Stack',
];

// ─── Sub-components ────────────────────────────────────────────────────

const Tag = ({ label }) => (
  <span style={{
    display: 'inline-block',
    padding: '2px 10px',
    background: 'rgba(245,158,11,0.08)',
    border: '1px solid rgba(245,158,11,0.25)',
    color: 'var(--accent-primary)',
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.5px',
    borderRadius: '2px',
  }}>
    {label}
  </span>
);

const SectionLabel = ({ children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase',
    marginBottom: '12px',
  }}>
    <span style={{ width: '20px', height: '1px', background: 'var(--accent-primary)', display: 'inline-block' }} />
    {children}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────

const Portfolio = () => {
  const [activeSkillTab, setActiveSkillTab] = useState(Object.keys(SKILLS)[0]);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
  };

  return (
    <>
      <SEO
        title="Jaivardhan Singh — Portfolio"
        description="Lead Full Stack & AI Engineer. Building autonomous AI systems, MCP servers, and production-grade web apps. Open to opportunities."
        url="/portfolio"
      />

      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <div style={{
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Grid background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.3,
            pointerEvents: 'none',
          }} />

          <Container className="py-5" style={{ position: 'relative', zIndex: 1 }}>
            <Row className="align-items-center g-5 py-3">
              <Col lg={7}>
                <motion.div initial="hidden" animate="show" variants={fadeUp}>
                  <SectionLabel>Available for opportunities</SectionLabel>

                  <h1 style={{
                    fontFamily: 'var(--font-main)',
                    fontWeight: 800,
                    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                    color: 'var(--text-primary)',
                    letterSpacing: '-2px',
                    lineHeight: 1.1,
                    marginBottom: '1rem',
                  }}>
                    JAIVARDHAN<br />
                    <span style={{ color: 'var(--accent-primary)' }}>SINGH</span>
                  </h1>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.7,
                    maxWidth: '520px',
                  }}>
                    Lead Full Stack & AI Engineer building{' '}
                    <span style={{ color: 'var(--text-primary)' }}>autonomous AI systems</span>,{' '}
                    <span style={{ color: 'var(--text-primary)' }}>MCP servers</span>, and{' '}
                    <span style={{ color: 'var(--text-primary)' }}>production-grade web apps</span>.
                    Currently at Aigiglab.
                  </p>

                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      <MapPin size={14} /> India
                    </div>
                    <span style={{ color: 'var(--border-color)' }}>|</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                      Open to work
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3">
                    <a
                      href="/jaivardhan-singh-resume.pdf"
                      download="Jaivardhan_Singh_Resume.pdf"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'var(--accent-primary)',
                        color: '#000', fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem', letterSpacing: '1px',
                        padding: '10px 20px', border: 'none',
                        textDecoration: 'none',
                        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Download size={15} /> DOWNLOAD CV
                    </a>

                    <a
                      href="mailto:jaivardhansinghrathore17@gmail.com"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'transparent',
                        color: 'var(--text-primary)', fontWeight: 600,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem', letterSpacing: '1px',
                        padding: '10px 20px',
                        border: '1px solid var(--border-color)',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                      <Mail size={15} /> CONTACT
                    </a>

                    <div className="d-flex gap-3 align-items-center">
                      {[
                        { href: 'https://github.com/Jaivardhan7773', Icon: Github },
                        { href: 'https://www.linkedin.com/in/jaivardhan7773/', Icon: Linkedin },
                        { href: 'https://x.com/Jay_Vardhan7773', Icon: Twitter },
                      ].map(({ href, Icon }) => (
                        <a key={href} href={href} target="_blank" rel="noreferrer"
                          style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                          <Icon size={20} />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Col>

              <Col lg={5}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {/* Terminal card */}
                  <div style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                  }}>
                    {/* Terminal header */}
                    <div style={{
                      background: 'var(--border-color)',
                      padding: '8px 14px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      {['#ef4444','#f59e0b','#10b981'].map(c => (
                        <span key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'inline-block' }} />
                      ))}
                      <span style={{ marginLeft: '8px', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>jaivardhan@portfolio ~ </span>
                    </div>
                    <div style={{ padding: '20px' }}>
                      {[
                        { key: 'name', val: '"Jaivardhan Singh"' },
                        { key: 'role', val: '"Lead Full Stack & AI Engineer"' },
                        { key: 'company', val: '"Aigiglab"' },
                        { key: 'ai_stack', val: '["Gemini", "Claude", "MCP"]' },
                        { key: 'web_stack', val: '["React", "Node", "MongoDB"]' },
                        { key: 'certs', val: '["Anthropic Certified"]' },
                        { key: 'status', val: '"open_to_work": true' },
                      ].map(({ key, val }, i) => (
                        <div key={key} style={{ marginBottom: '6px', color: 'var(--text-secondary)' }}>
                          <span style={{ color: '#93c5fd' }}>  {key}</span>
                          <span style={{ color: 'var(--text-tertiary)' }}>: </span>
                          <span style={{ color: '#86efac' }}>{val}</span>
                          {i < 6 && <span style={{ color: 'var(--text-tertiary)' }}>,</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* ── SKILLS ────────────────────────────────────────────────── */}
        <div style={{ borderBottom: '1px solid var(--border-color)', padding: '64px 0' }}>
          <Container>
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px', marginBottom: '32px', color: 'var(--text-primary)' }}>
              SKILLS & TOOLS
            </h2>

            {/* Tab switcher */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {Object.keys(SKILLS).map(cat => (
                <button key={cat} onClick={() => setActiveSkillTab(cat)}
                  style={{
                    padding: '6px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    background: activeSkillTab === cat ? 'var(--accent-primary)' : 'transparent',
                    color: activeSkillTab === cat ? '#000' : 'var(--text-secondary)',
                    border: `1px solid ${activeSkillTab === cat ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div
              key={activeSkillTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="d-flex flex-wrap gap-2"
            >
              {SKILLS[activeSkillTab].map(skill => (
                <span key={skill} style={{
                  padding: '8px 16px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  transition: 'border-color 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </Container>
        </div>

        {/* ── EXPERIENCE ────────────────────────────────────────────── */}
        <div style={{ borderBottom: '1px solid var(--border-color)', padding: '64px 0', background: 'var(--bg-secondary)' }}>
          <Container>
            <SectionLabel>Work</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px', marginBottom: '40px', color: 'var(--text-primary)' }}>
              EXPERIENCE
            </h2>

            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '32px', marginBottom: '32px',
                }}>
                  <div>
                    <div className="d-flex flex-wrap align-items-center gap-3 mb-2">
                      <h3 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                        {exp.role}
                      </h3>
                      <span style={{
                        padding: '2px 10px', background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      }}>
                        {exp.type}
                      </span>
                    </div>
                    <div style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      {exp.company}
                    </div>
                    <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{
                          display: 'flex', gap: '10px', alignItems: 'flex-start',
                          color: 'var(--text-secondary)', fontSize: '0.9rem',
                          lineHeight: 1.6, marginBottom: '8px',
                        }}>
                          <ChevronRight size={14} style={{ color: 'var(--accent-primary)', marginTop: '4px', flexShrink: 0 }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                    color: 'var(--text-tertiary)', textAlign: 'right',
                    whiteSpace: 'nowrap', paddingLeft: '24px',
                  }}>
                    <Calendar size={14} style={{ marginRight: '6px' }} />
                    {exp.period}
                  </div>
                </div>
              </motion.div>
            ))}
          </Container>
        </div>

        {/* ── PROJECTS ──────────────────────────────────────────────── */}
        <div style={{ borderBottom: '1px solid var(--border-color)', padding: '64px 0' }}>
          <Container>
            <SectionLabel>Work I've shipped</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px', marginBottom: '40px', color: 'var(--text-primary)' }}>
              PROJECTS
            </h2>

            <Row className="g-4">
              {PROJECTS.map((proj, i) => (
                <Col lg={proj.highlight ? 12 : 6} key={i}>
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    style={{
                      background: proj.highlight ? 'var(--bg-secondary)' : 'var(--bg-secondary)',
                      border: `1px solid ${proj.highlight ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      padding: '28px',
                      height: '100%',
                      position: 'relative',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => !proj.highlight && (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                    onMouseLeave={e => !proj.highlight && (e.currentTarget.style.borderColor = 'var(--border-color)')}
                  >
                    {proj.highlight && (
                      <div style={{
                        position: 'absolute', top: 0, right: 0,
                        background: 'var(--accent-primary)', color: '#000',
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        fontWeight: 700, letterSpacing: '1px',
                        padding: '4px 12px',
                      }}>
                        FEATURED
                      </div>
                    )}
                    <h4 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                      {proj.title}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '16px' }}>
                      {proj.desc}
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {proj.stack.map(s => <Tag key={s} label={s} />)}
                    </div>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem', textDecoration: 'none',
                        }}>
                        LIVE SITE <ExternalLink size={13} />
                      </a>
                    )}
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        {/* ── CERTIFICATIONS ────────────────────────────────────────── */}
        <div style={{ borderBottom: '1px solid var(--border-color)', padding: '64px 0', background: 'var(--bg-secondary)' }}>
          <Container>
            <SectionLabel>Credentials</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px', marginBottom: '32px', color: 'var(--text-primary)' }}>
              CERTIFICATIONS
            </h2>
            <div className="d-flex flex-column gap-3">
              {CERTS.map((cert, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                  }}>
                    <Award size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                      {cert}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <div style={{ padding: '80px 0' }}>
          <Container className="text-center">
            <SectionLabel>Let's build something</SectionLabel>
            <h2 style={{
              fontFamily: 'var(--font-main)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              letterSpacing: '-1.5px', marginBottom: '16px', color: 'var(--text-primary)',
            }}>
              OPEN TO WORK &<br /><span style={{ color: 'var(--accent-primary)' }}>COLLABORATION</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
              Looking for roles in AI engineering, full-stack development,<br />
              or agentic systems. DMs and emails are always open.
            </p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <a href="mailto:jaivardhansinghrathore17@gmail.com"
                className="btn-primary-glow"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} /> EMAIL ME
              </a>
              <a href="https://www.linkedin.com/in/jaivardhan7773/" target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem', letterSpacing: '1px', fontWeight: 700,
                  textDecoration: 'none', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <Linkedin size={15} /> LINKEDIN
              </a>
              <a href="/jaivardhan-singh-resume.pdf" download="Jaivardhan_Singh_Resume.pdf"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem', letterSpacing: '1px', fontWeight: 700,
                  textDecoration: 'none', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <Download size={15} /> RESUME PDF
              </a>
            </div>
          </Container>
        </div>

      </div>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
};

export default Portfolio;
