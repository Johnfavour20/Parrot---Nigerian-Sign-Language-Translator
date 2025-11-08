import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Play, Camera, CloudCog, MessageSquareText, Users, GraduationCap, Briefcase, Plus, Minus } from 'lucide-react';
import { Page } from '../types';
import { RealTimeIcon, PrivacyIcon, CommunityIcon, AiAccuracyIcon } from './icons';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Refs for scroll animations
  const refs = {
    stats: useRef<HTMLDivElement>(null),
    howItWorks: useRef<HTMLDivElement>(null),
    featuresTitle: useRef<HTMLDivElement>(null),
    featuresGrid: useRef<HTMLDivElement>(null),
    whoItsFor: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(refs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      Object.values(refs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [refs]);

  const stats = [
    { value: "AI-Powered", label: "Translation" },
    { value: "95%+", label: "Accuracy Goal" },
    { value: "24/7", label: "Availability" },
    { value: "Secure", label: "Conversation" }
  ];

  const features = [
    {
      icon: <RealTimeIcon className="w-full h-full" />,
      title: "Real-Time Translation",
      description: "Convert Nigerian Sign Language to text instantly with AI. Experience seamless, natural conversations."
    },
    {
      icon: <PrivacyIcon className="w-full h-full" />,
      title: "Privacy First",
      description: "Your camera feed is processed for translation and not stored. Your conversations remain private and secure."
    },
    {
      icon: <CommunityIcon className="w-full h-full" />,
      title: "Built for Community",
      description: "Designed specifically for the Nigerian Deaf community with localized NSL grammar and cultural context understanding."
    },
    {
      icon: <AiAccuracyIcon className="w-full h-full" />,
      title: "AI-Powered Accuracy",
      description: "Advanced machine learning ensures high-confidence sign recognition with contextual refinement for natural language output."
    }
  ];

  const faqs = [
    { q: "How accurate is the translation?", a: "Parrot uses a state-of-the-art AI model trained specifically on Nigerian Sign Language, aiming for over 95% accuracy. The model continuously improves with contextual understanding to provide natural language translations." },
    { q: "Is my camera data stored?", a: "No. Your privacy is our top priority. The camera feed is processed in real-time for translation and is never stored on our servers. All processing happens ephemerally." },
    { q: "Is this app free to use?", a: "Yes, the demo version of Parrot is completely free to use. Our goal is to make communication more accessible for everyone." },
    { q: "Can I use this to learn Nigerian Sign Language?", a: "Absolutely! The app serves as an excellent learning companion. The dictionary and quick translate features allow you to check your signing accuracy and learn new words." }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🦜</span>
              </div>
              <span className="text-2xl font-bold">Parrot<span className="text-lime-400">.</span></span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-300 hover:text-lime-400 transition-colors">Features</a>
              <a href="#faq" className="text-neutral-300 hover:text-lime-400 transition-colors">FAQ</a>
              <button onClick={() => onNavigate(Page.App)} className="bg-lime-400 text-neutral-950 px-6 py-2.5 rounded-lg font-semibold hover:bg-lime-300 transition-all transform hover:scale-105">
                Get Started
              </button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-neutral-300 hover:text-lime-400 py-2">Features</a>
              <a href="#faq" className="block text-neutral-300 hover:text-lime-400 py-2">FAQ</a>
              <button onClick={() => onNavigate(Page.App)} className="w-full bg-lime-400 text-neutral-950 px-6 py-2.5 rounded-lg font-semibold">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lime-400/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-block animate-slide-up" style={{ animationDelay: '100ms' }}>
                <span className="bg-lime-400/10 text-lime-400 px-4 py-2 rounded-full text-sm font-semibold border border-lime-400/20">Breaking Communication Barriers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up" style={{ animationDelay: '200ms' }}>
                Bridge The Gap With
                <span className="block text-lime-400 mt-2">Nigerian Sign Language</span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed animate-slide-up" style={{ animationDelay: '300ms' }}>
                Real-time translation powered by advanced AI. Connect the Nigerian Deaf community with fast, accurate, and localized sign language interpretation.
              </p>
              <div className="flex flex-wrap gap-4 items-center animate-slide-up justify-center lg:justify-start" style={{ animationDelay: '400ms' }}>
                <button onClick={() => onNavigate(Page.App)} className="bg-lime-400 text-neutral-950 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-lime-300 transition-all transform hover:scale-105 flex items-center space-x-2">
                  <span>Try Demo</span>
                  <Play className="w-5 h-5" />
                </button>
                <span className="text-neutral-500 text-sm w-full lg:w-auto">No signup required.</span>
              </div>
            </div>
            <div className="relative animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 bg-lime-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 sm:p-8 border border-neutral-700 shadow-2xl">
                <div className="aspect-square bg-lime-400/10 rounded-xl flex items-center justify-center border-2 border-lime-400/30">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-lime-400 rounded-full flex items-center justify-center animate-bounce-slow"><span className="text-4xl sm:text-5xl">👋</span></div>
                    <p className="text-lg sm:text-xl font-semibold text-lime-400">Real-Time Detection</p>
                    <p className="text-neutral-400">Camera feed processes signs instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div ref={refs.stats} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 p-4 sm:p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-lime-400/50 transition-all scroll-animate" style={{ transitionDelay: `${index * 100}ms`}}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-lime-400">{stat.value}</div>
                <div className="text-sm sm:text-base text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section ref={refs.howItWorks} className="py-20 px-4 sm:px-6 lg:px-8 scroll-animate">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Simple Steps to <span className="text-lime-400">Instant Translation</span></h2>
            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto">Our technology makes communication effortless. See how it works in three easy steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-800 hidden md:block"></div>
              <div className="absolute top-1/4 md:top-1/2 left-1/2 md:left-0 w-px md:w-full h-full md:h-px bg-neutral-800"></div>
              {[
                  { icon: <Camera className="w-8 h-8 sm:w-10 sm:h-10" />, title: 'Start Your Camera', desc: 'Securely open your camera feed within the app.' },
                  { icon: <CloudCog className="w-8 h-8 sm:w-10 sm:h-10" />, title: 'AI Processes Sign', desc: 'Our model analyzes the sign in real-time.' },
                  { icon: <MessageSquareText className="w-8 h-8 sm:w-10 sm:h-10" />, title: 'Get Instant Text', desc: 'Receive an accurate text translation instantly.' }
              ].map((step, index) => (
                  <div key={index} className="relative z-10 space-y-4 p-6 sm:p-8 bg-neutral-950">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center rounded-full bg-neutral-900 border-2 border-lime-400/30 text-lime-400 mb-4">{step.icon}</div>
                      <h3 className="text-lg sm:text-xl font-semibold">{step.title}</h3>
                      <p className="text-neutral-400">{step.desc}</p>
                  </div>
              ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={refs.featuresTitle} className="text-center mb-16 space-y-4 scroll-animate">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Powerful Features For <span className="block text-lime-400">Seamless Communication</span></h2>
            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto">Built with cutting-edge technology to provide the fastest and most accurate NSL translation experience.</p>
          </div>
          <div ref={refs.featuresGrid} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 sm:p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-lime-400/50 transition-all hover:transform hover:-translate-y-2 scroll-animate" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 text-lime-400 mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-4">{feature.description}</p>
                 <span className="text-lime-400 font-semibold flex items-center space-x-2"><span>Powered by Gemini</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={refs.whoItsFor} className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900/50 scroll-animate">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Designed For <span className="text-lime-400">Everyone</span></h2>
                <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto">Parrot is a versatile tool for building bridges and fostering inclusion across communities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: <Users className="w-8 h-8"/>, title: "Deaf Community", desc: "Communicate effortlessly in public spaces, appointments, and with non-signers." },
                    { icon: <GraduationCap className="w-8 h-8"/>, title: "Students & Learners", desc: "An interactive tool to practice signing and get instant feedback to accelerate learning." },
                    { icon: <Briefcase className="w-8 h-8"/>, title: "Family & Professionals", desc: "Connect with loved ones and create inclusive environments at work or school." }
                ].map((item, index) => (
                    <div key={index} className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 text-center space-y-4">
                        <div className="w-16 h-16 bg-lime-400/10 text-lime-400 rounded-full flex items-center justify-center mx-auto">{item.icon}</div>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-neutral-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section id="faq" ref={refs.faq} className="py-20 px-4 sm:px-6 lg:px-8 scroll-animate">
          <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Frequently Asked <span className="text-lime-400">Questions</span></h2>
                  <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto">Have questions? We've got answers. If you need more help, feel free to reach out.</p>
              </div>
              <div className="space-y-4">
                  {faqs.map((faq, index) => (
                      <div key={index} className="bg-neutral-900 border border-neutral-800 rounded-xl">
                          <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center text-left p-6">
                              <span className="text-lg font-semibold">{faq.q}</span>
                              {openFaq === index ? <Minus className="w-5 h-5 text-lime-400" /> : <Plus className="w-5 h-5 text-neutral-400" />}
                          </button>
                          {openFaq === index && (
                              <div className="px-6 pb-6 text-neutral-400 leading-relaxed animate-fade-in">
                                  {faq.a}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div ref={refs.cta} className="max-w-4xl mx-auto text-center scroll-animate relative">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10">
            <div className="w-full h-[400px] bg-lime-400/5 rounded-full blur-3xl"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready To Break Down 
            <span className="block text-lime-400">Communication Barriers?</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience the future of sign language translation. Start your journey towards inclusive communication today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onNavigate(Page.App)} 
              className="bg-lime-400 text-neutral-950 px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl rounded-xl font-semibold hover:bg-lime-300 transition-all transform hover:scale-105 shadow-lg shadow-lime-400/20"
            >
              Try the Live Demo
            </button>
          </div>
        </div>
      </section>
      
      <footer className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center"><span className="text-xl">🦜</span></div>
                <span className="text-xl font-bold">Parrot<span className="text-lime-400">.</span></span>
            </div>
            <p className="text-neutral-500 text-sm">&copy; {new Date().getFullYear()} Parrot. Bridging communication gaps with AI.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slide-up-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slide-up-fade-in 0.8s ease-out forwards; opacity: 0; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;