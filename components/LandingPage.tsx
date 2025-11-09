import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Play,
  Camera,
  CloudCog,
  MessageSquareText,
  Users,
  GraduationCap,
  Briefcase,
  Plus,
  Minus,
} from "lucide-react";
import { Page } from "../types";
import {
  RealTimeIcon,
  PrivacyIcon,
  CommunityIcon,
  AiAccuracyIcon,
} from "./icons";

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

/**
 * Modern Apple-like Landing Page for Parrot
 * - Uses Framer Motion for smooth entrance and subtle micro-interactions
 * - Merges stats into hero (compact, premium feel)
 * - Accessible: clear contrasts, keyboard-friendly controls, aria attributes
 */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.55, ease: "easeOut" } }),
};

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stats = [
    { value: "AI-Powered", label: "Translation" },
    { value: "95%+", label: "Accuracy goal" },
    { value: "24/7", label: "Availability" },
    { value: "Private", label: "On-device" },
  ];

  const features = [
    {
      icon: <RealTimeIcon className="w-full h-full" />,
      title: "Real-time Translation",
      description:
        "Instant conversion from Nigerian Sign Language to clear text with near-natural phrasing.",
    },
    {
      icon: <PrivacyIcon className="w-full h-full" />,
      title: "Privacy-first",
      description:
        "Camera input is processed for translation only — nothing is stored without consent.",
    },
    {
      icon: <CommunityIcon className="w-full h-full" />,
      title: "Built for community",
      description:
        "Localized to NSL grammar and cultural context to make translations more accurate and useful.",
    },
    {
      icon: <AiAccuracyIcon className="w-full h-full" />,
      title: "Adaptive ML",
      description:
        "Models update with usage to improve recognition and disambiguate contextual signs.",
    },
  ];

  const faqs = [
    {
      q: "How accurate is the translation?",
      a: "Parrot uses models trained on Nigerian Sign Language datasets and targets 95%+ accuracy, improving over time with context and user feedback.",
    },
    {
      q: "Is my camera data stored?",
      a: "No. Camera frames are processed temporarily in memory for translation and not stored unless explicitly permitted.",
    },
    {
      q: "Can I use this to learn NSL?",
      a: "Yes — the app provides dictionary, practice modes, and instant feedback to help learners improve.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      {/* NAV */}
      <header className="fixed w-full z-50">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center shadow-md shadow-lime-400/20">
                <span aria-hidden className="text-2xl">
                  🦜
                </span>
              </div>
              <div className="text-2xl font-semibold tracking-tight">
                Parrot<span className="text-lime-400">.</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
              <a href="#how-it-works" className="text-neutral-300 hover:text-lime-400 transition">
                How it works
              </a>
              <a href="#features" className="text-neutral-300 hover:text-lime-400 transition">
                Features
              </a>
              <a href="#faq" className="text-neutral-300 hover:text-lime-400 transition">
                FAQ
              </a>
              <button
                onClick={() => onNavigate(Page.App)}
                className="ml-2 bg-lime-400 text-neutral-900 px-5 py-2.5 rounded-lg font-semibold shadow hover:bg-lime-300 transition transform hover:scale-[1.02]"
                aria-label="Get started"
              >
                Get started
              </button>
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((s) => !s)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="p-2 rounded-md text-neutral-100 hover:bg-neutral-900/30 focus:outline-none focus:ring-2 focus:ring-lime-400"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="md:hidden bg-neutral-900 border-t border-neutral-800"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#how-it-works" className="block text-neutral-300 py-2">How it works</a>
              <a href="#features" className="block text-neutral-300 py-2">Features</a>
              <a href="#faq" className="block text-neutral-300 py-2">FAQ</a>
              <button className="w-full bg-lime-400 text-neutral-900 px-4 py-2 rounded-md font-semibold" onClick={() => onNavigate(Page.App)}>
                Get started
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* HERO */}
      <main className="pt-28">
        <section className="relative overflow-hidden">
          {/* subtle radial spotlight */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-tr from-lime-400/8 to-transparent blur-3xl opacity-30" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Title + CTAs + stats */}
              <motion.div initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={fadeUp} custom={0}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-lime-400/10 px-3 py-1 text-sm font-medium text-lime-300 border border-lime-400/20">
                    Breaking communication barriers
                  </span>
                </motion.div>

                <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                  Bridge the gap with <span className="block text-lime-400">Nigerian Sign Language</span>
                </motion.h1>

                <motion.p variants={fadeUp} custom={2} className="text-lg text-neutral-300 max-w-xl">
                  Real-time translation powered by advanced AI — precise, private, and localized for the Nigerian Deaf community.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate(Page.App)}
                    className="inline-flex items-center gap-3 bg-lime-400 text-neutral-900 px-5 py-3 rounded-lg font-semibold shadow-md hover:scale-[1.02] transition"
                    aria-label="Try demo"
                  >
                    <Play className="w-4 h-4" />
                    Try demo
                  </button>

                  <a
                    href="#features"
                    className="text-neutral-400 hover:text-lime-300 transition"
                    aria-label="See features"
                  >
                    Learn more
                  </a>
                </motion.div>

                {/* Stats (integrated) */}
                <motion.div variants={fadeUp} custom={4} className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md">
                  {stats.map((s, idx) => (
                    <div key={s.label} className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 px-4 py-3 rounded-lg text-center">
                      <div className="text-lime-400 font-semibold">{s.value}</div>
                      <div className="text-sm text-neutral-400">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Demo mock (polished card) */}
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-6 border border-neutral-800 shadow-2xl shadow-lime-400/10">
                  <div className="aspect-[4/3] rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col">
                    {/* mock camera / detection area */}
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
                      <div className="w-28 h-28 rounded-full bg-lime-400/20 flex items-center justify-center">
                        <span className="text-4xl">👋</span>
                      </div>
                    </div>

                    {/* translation output */}
                    <div className="px-4 py-3 bg-neutral-900 border-t border-neutral-800">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-neutral-300 font-semibold">Live translation</div>
                        <div className="text-xs text-neutral-500">Realtime</div>
                      </div>
                      <div className="mt-2 text-neutral-200 text-base leading-snug">
                        “Good morning — how can I help you today?”
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm">Copy</button>
                        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-lime-400 text-neutral-900 text-sm">Use</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* small caption */}
                <div className="mt-4 text-sm text-neutral-500">See the demo: camera → translation (mock)</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mt-20 pb-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
              <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold">
                Simple steps to instant translation
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="mt-3 text-neutral-400">
                Open camera → AI detects signs → Get accurate text in real-time. Designed for accessibility and privacy.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 grid md:grid-cols-3 gap-8">
              {[
                { icon: <Camera className="w-8 h-8" />, title: "Start camera", desc: "Open your camera securely inside the app." },
                { icon: <CloudCog className="w-8 h-8" />, title: "AI processes sign", desc: "Advanced model recognizes NSL gestures." },
                { icon: <MessageSquareText className="w-8 h-8" />, title: "Get instant text", desc: "Instant, readable translation for conversation." },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center text-lime-300">{s.icon}</div>
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-sm text-neutral-400">{s.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold">
                Powerful features for seamless communication
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="mt-3 text-neutral-400">
                Built with privacy, speed, and cultural context in mind.
              </motion.p>
            </div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.article key={f.title} variants={fadeUp} custom={i} className="group p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 hover:scale-[1.02] transition transform shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 text-lime-400">{f.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{f.title}</h3>
                      <p className="mt-2 text-neutral-400">{f.description}</p>
                      <div className="mt-3 text-sm text-lime-300 font-medium">Powered by Parrot AI</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 bg-neutral-900/20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl font-bold">Frequently asked</motion.h2>
              <motion.p variants={fadeUp} custom={1} className="mt-3 text-neutral-400">Clear answers to common questions about Parrot.</motion.p>
            </div>

            <div className="mt-8 space-y-4">
              {faqs.map((fq, idx) => (
                <motion.div key={fq.q} variants={fadeUp} custom={idx} className="bg-neutral-900/40 border border-neutral-800 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                    aria-controls={`faq-${idx}`}
                  >
                    <span className="font-semibold">{fq.q}</span>
                    {openFaq === idx ? <Minus className="w-5 h-5 text-lime-300" /> : <Plus className="w-5 h-5 text-neutral-400" />}
                  </button>

                  {openFaq === idx && (
                    <div id={`faq-${idx}`} className="px-6 pb-6 text-neutral-300">
                      {fq.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold">
              Ready to break down communication barriers?
            </motion.h2>
            <motion.p className="mt-3 text-neutral-400">Try the live demo and experience instant translation.</motion.p>
            <motion.div className="mt-6 flex justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <button onClick={() => onNavigate(Page.App)} className="bg-lime-400 px-6 py-3 rounded-lg font-semibold text-neutral-900 shadow hover:bg-lime-300">
                Try live demo
              </button>
              <a href="#features" className="px-6 py-3 rounded-lg border border-neutral-800 text-neutral-300 hover:text-lime-300">Learn more</a>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-lime-400 flex items-center justify-center">🦜</div>
              <div className="font-semibold">Parrot<span className="text-lime-400">.</span></div>
            </div>
            <div className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} Parrot — Bridging communication gaps with AI.</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
