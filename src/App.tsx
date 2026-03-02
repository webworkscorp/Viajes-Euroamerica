import { Search, User, Users, ShoppingCart, Play, ChevronDown, ChevronLeft, ChevronRight, Calendar, MapPin, Plane, Globe, Star, ArrowRight, Send, Mail, Phone, Instagram, Facebook, Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, FormEvent, createContext, useContext } from 'react';
import { Language, translations } from './translations';

// --- Context ---
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.es;
}>({
  lang: 'es',
  setLang: () => {},
  t: translations.es
});

const useTranslation = () => useContext(LanguageContext);

// --- Components ---
const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-10 z-[70] flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 mb-2 min-w-[140px] overflow-hidden"
          >
            <button
              onClick={() => { setLang('es'); setIsOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${lang === 'es' ? 'bg-primary-blue text-white shadow-md' : 'text-text-primary hover:bg-gray-50'}`}
            >
              <span>Español</span>
              {lang === 'es' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
            <button
              onClick={() => { setLang('en'); setIsOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${lang === 'en' ? 'bg-primary-blue text-white shadow-md' : 'text-text-primary hover:bg-gray-50'}`}
            >
              <span>English</span>
              {lang === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white shadow-card rounded-full flex items-center justify-center border border-gray-100 text-primary-blue group relative"
      >
        <Languages size={24} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
            {lang.toUpperCase()}
          </span>
        )}
      </motion.button>
    </div>
  );
};

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    viewBox="0 0 448 512" 
    width={size} 
    height={size} 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.2 2.5-2.5 5.5-6.4 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const Preloader = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 3500); // 3.5 seconds
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <img 
            src="https://i.imgur.com/BlOlS7x.png" 
            alt={t.alt.logoAnim} 
            className="h-56 lg:h-80 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          {/* Strong Shine Effect */}
          <motion.div 
            initial={{ x: '-150%' }}
            animate={{ x: '250%' }}
            transition={{ 
              duration: 1.8, 
              delay: 1,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 w-[200%]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Header Bar (PC Only) */}
      <div className={`hidden lg:block w-full py-2 transition-all duration-300 ${isScrolled ? 'bg-primary-blue text-white' : 'bg-black/20 text-white border-b border-white/10'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-medium">
              <Mail size={14} />
              <span>ventas1@veuroamerica.com</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/50242585242" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><WhatsAppIcon size={16} /></a>
              <a href="https://www.facebook.com/share/1E8AbNsETu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Facebook size={16} /></a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollTo('inicio')} className="text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">{t.nav.home}</button>
            <button onClick={() => scrollTo('ofertas')} className="text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">{t.nav.offers}</button>
            <button onClick={() => scrollTo('contacto')} className="text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">{t.nav.contact}</button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 h-20 flex items-center ${isScrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://i.imgur.com/BpkJOyb.png" 
              alt={t.alt.logo} 
              className="h-24 lg:h-32 w-auto object-contain"
              referrerPolicy="no-referrer"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollTo('contacto')}
              className="hidden lg:block bg-primary-blue text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-card hover:scale-105 transition-transform active:scale-95"
            >
              {t.nav.bookNow}
            </button>
            
            {/* Hamburger Menu Toggle (Mobile & PC) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors ${isScrolled ? 'text-text-primary' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <img 
                src="https://i.imgur.com/BpkJOyb.png" 
                alt={t.alt.logo} 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-text-primary">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center gap-8 p-10">
              {[
                { name: t.nav.home, id: 'inicio' },
                { name: t.nav.offers, id: 'ofertas' },
                { name: t.nav.about, id: 'sobre-nosotros' },
                { name: t.nav.tours, id: 'tours' },
                { name: t.nav.destinations, id: 'destinos' },
                { name: t.nav.contact, id: 'contacto' }
              ].map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => scrollTo(item.id)}
                  className="text-3xl lg:text-5xl font-display font-bold text-text-primary hover:text-primary-blue transition-colors uppercase tracking-tighter"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            <div className="p-10 border-t border-gray-100 bg-bg-light/50 flex flex-col items-center gap-6">
              <div className="flex gap-8 text-primary-blue">
                <a href="https://wa.me/50242585242" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform"><WhatsAppIcon size={28} /></a>
                <a href="https://www.facebook.com/share/1E8AbNsETu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform"><Facebook size={28} /></a>
                <a href="mailto:ventas1@veuroamerica.com" className="hover:scale-125 transition-transform"><Mail size={28} /></a>
              </div>
              <p className="text-sm text-text-secondary font-medium">ventas1@veuroamerica.com</p>
              <p className="text-xs text-text-secondary text-center">4a Ave 15-70 zona 10, Guatemala City</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="relative min-h-[800px] lg:min-h-[900px] pt-32 lg:pt-48 pb-20 text-white flex items-center">
      {/* Background Wrapper with Overflow Hidden */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
              src="https://ohtpkxdwfincfaglhvsa.supabase.co/storage/v1/object/sign/Videos%20Kevin%20si/Advertisement_for_travel_agency_349c19b77b.mov?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZDIzNDkyNC00N2EyLTQ4Y2MtODc0Ny0xMDZkZmM5ODQyYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJWaWRlb3MgS2V2aW4gc2kvQWR2ZXJ0aXNlbWVudF9mb3JfdHJhdmVsX2FnZW5jeV8zNDljMTliNzdiLm1vdiIsImlhdCI6MTc3MjQzMTY4NywiZXhwIjoxODAzOTY3Njg3fQ.P2vt6rjifJ1zBaBkjB4bMS15IBobxXCVeHhIungzVvo" 
              type="video/quicktime" 
            />
            {lang === 'es' ? 'Tu navegador no soporta el tag de video.' : 'Your browser does not support the video tag.'}
          </video>
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-br from-primary-blue/60 to-black/60" />
        </div>

        {/* Background Elements (Optional, kept for some depth) */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-8 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
            <button 
              onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 sm:py-4 bg-primary-blue text-white rounded-full font-bold text-sm sm:text-base hover:bg-white hover:text-primary-blue shadow-lg transition-all"
            >
              {t.hero.viewOffers}
            </button>
            <button 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-bold text-sm sm:text-base hover:bg-white hover:text-primary-blue transition-all flex items-center gap-3 group"
            >
              {t.hero.schedule}
            </button>
          </div>
        </motion.div>

        <div className="relative hidden lg:block">
          {/* Main Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-20"
          >
            <img 
              src="https://picsum.photos/seed/travel-couple/800/800" 
              alt={t.alt.couple} 
              className="rounded-none shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-4 border-white/20 object-cover aspect-square"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 rounded-none shadow-card max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-accent-orange p-2 rounded-lg text-white">
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-text-primary font-bold">{t.hero.rating}</span>
              </div>
              <p className="text-xs text-text-secondary">{t.hero.ratingDesc}</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-none shadow-card flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary-blue rounded-none flex items-center justify-center text-white">
                <Globe size={24} />
              </div>
              <div>
                <p className="text-text-primary font-bold text-sm">{t.hero.destinations}</p>
                <p className="text-xs text-text-secondary">{t.hero.continents}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    pasajeros: '',
    fecha: '2026-01-01',
    detalle: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const message = encodeURIComponent(
      `*Nueva Consulta - Viajes Euroamerica*\n\n` +
      `*Nombre:* ${formData.nombre}\n` +
      `*Pasajeros:* ${formData.pasajeros}\n` +
      `*Fecha:* ${formData.fecha}\n` +
      `*Detalle:* ${formData.detalle}`
    );
    
    const whatsappUrl = `https://wa.me/50242585242?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="bg-[#f3f4f6] py-20 lg:py-32">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#9ca3af] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
              {t.contact.tag}
            </span>
            <h2 className="text-[#111827] text-4xl lg:text-[36px] font-semibold leading-[1.4] mb-6">
              {t.contact.title}
            </h2>
            <p className="text-[#6b7280] text-lg mb-10 leading-relaxed">
              {t.contact.desc}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary-blue">
                  <Mail size={20} />
                </div>
                <span className="text-[#111827] font-medium">ventas1@veuroamerica.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary-blue">
                  <Phone size={20} />
                </div>
                <span className="text-[#111827] font-medium">+502 2320-4949</span>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[18px] p-8 lg:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star size={32} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-2">{t.contact.successTitle}</h3>
                <p className="text-[#6b7280]">{t.contact.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#111827] ml-1">{t.contact.name}</label>
                  <input 
                    type="text" 
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full h-[48px] bg-[#f3f4f6] border-none rounded-[10px] px-4 text-sm focus:ring-2 focus:ring-primary-blue/25 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#111827] ml-1">{t.contact.passengers}</label>
                  <input 
                    type="number" 
                    required
                    placeholder={t.contact.passengersPlaceholder}
                    value={formData.pasajeros}
                    onChange={(e) => setFormData({...formData, pasajeros: e.target.value})}
                    className="w-full h-[48px] bg-[#f3f4f6] border-none rounded-[10px] px-4 text-sm focus:ring-2 focus:ring-primary-blue/25 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#111827] ml-1">{t.contact.date}</label>
                  <input 
                    type="date" 
                    required
                    min="2026-01-01"
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                    className="w-full h-[48px] bg-[#f3f4f6] border-none rounded-[10px] px-4 text-sm focus:ring-2 focus:ring-primary-blue/25 outline-none transition-all cursor-pointer"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#111827] ml-1">{t.contact.detail}</label>
                  <textarea 
                    required
                    placeholder={t.contact.detailPlaceholder}
                    value={formData.detalle}
                    onChange={(e) => setFormData({...formData, detalle: e.target.value})}
                    className="w-full h-[110px] bg-[#f3f4f6] border-none rounded-[10px] p-4 text-sm focus:ring-2 focus:ring-primary-blue/25 outline-none transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full h-[48px] bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white rounded-full font-medium flex items-center justify-center gap-2 hover:brightness-105 hover:shadow-[0_8px_18px_rgba(37,99,235,0.35)] transition-all duration-300 mt-6"
                >
                  <span>{t.contact.send}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProfessionalCover = () => {
  const { t } = useTranslation();
  return (
    <section id="sobre-nosotros" className="w-full mt-32 mb-20 overflow-hidden">
      {/* Clean Image Section - Moved Top */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="relative w-full group mb-20"
      >
        <img 
          src="https://i.imgur.com/wxZWYev.jpeg" 
          alt={t.alt.cover} 
          className="w-full h-auto block group-hover:scale-105 transition-transform duration-[5s] ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Decorative Borders (Sharp) */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary-blue" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary-blue" />
      </motion.div>

      {/* Text Section - Moved Bottom */}
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <span className="text-primary-blue font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
            {t.about.tag}
          </span>
          <h2 className="text-5xl lg:text-8xl font-display font-bold text-text-primary mb-10 leading-tight tracking-tighter">
            {t.about.title}
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
            {t.about.desc}
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <div className="h-[1px] w-20 bg-gray-200 self-center" />
            <img 
              src="https://i.imgur.com/NCksXmu.png" 
              alt={t.alt.rating} 
              className="h-40 lg:h-64 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="h-[1px] w-20 bg-gray-200 self-center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ExclusiveOffers = () => {
  const { t } = useTranslation();
  const offers = [
    { title: "", price: "", color: "bg-primary-blue", img: "https://i.imgur.com/DYDdReL.jpeg", hideDetails: true },
    { title: "", price: "", color: "bg-accent-orange", img: "https://i.imgur.com/as1GhQA.jpeg", hideDetails: true },
    { title: "", price: "", color: "bg-accent-teal", img: "https://i.imgur.com/EfjqvBU.jpeg", hideDetails: true },
    { title: "", price: "", color: "bg-emerald-500", img: "https://i.imgur.com/ynwlnuP.jpeg", hideDetails: true },
  ];

  return (
    <section id="ofertas" className="pt-24 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">{t.offers.tag}</span>
            <h2 className="text-4xl font-display font-bold mt-2">{t.offers.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {offers.map((offer, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative bg-white rounded-none overflow-hidden shadow-card cursor-pointer"
            >
              <div className="w-full overflow-hidden rounded-none">
                <img 
                  src={offer.img} 
                  alt={`Oferta ${idx + 1}`} 
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImageBannerSection = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full pt-0 pb-12">
      <div className="container mx-auto px-6 flex justify-center">
        <div className="relative group max-w-2xl w-full">
          <img 
            src="https://i.imgur.com/oo46T9O.png" 
            alt={t.alt.banner} 
            className="w-full h-auto block transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-primary-blue text-white rounded-full font-bold text-base shadow-xl hover:scale-110 transition-transform flex items-center gap-3"
            >
              {t.banner.btn} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorldDestinations = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const destinations = [
    "https://i.imgur.com/repqFwU.jpeg",
    "https://i.imgur.com/y4S9eCH.jpeg",
    "https://i.imgur.com/b6gWCOk.jpeg",
    "https://i.imgur.com/Mpm6xZW.jpeg",
    "https://i.imgur.com/RjmaIh4.jpeg",
    "https://i.imgur.com/sG60Bno.jpeg",
    "https://i.imgur.com/Y01lhES.jpeg",
    "https://i.imgur.com/v75jEGX.jpeg"
  ];

  return (
    <section id="destinos" className="section-spacing overflow-hidden bg-bg-light/30">
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">{t.destinations.tag}</span>
        <h2 className="text-4xl font-display font-bold mt-2">{t.destinations.title}</h2>
      </div>
      
      <div className="relative group">
        {/* Navigation Buttons (PC only) */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-xl hidden lg:flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronLeft size={24} className="text-primary-blue" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-xl hidden lg:flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronRight size={24} className="text-primary-blue" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 lg:px-20 py-10 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((img, idx) => (
            <div 
              key={idx} 
              className={`flex-shrink-0 snap-center rounded-full overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105`}
              style={{ 
                width: '240px', 
                height: idx % 2 === 0 ? '450px' : '350px',
                marginTop: idx % 2 === 0 ? '0' : '50px'
              }}
            >
              <img 
                src={img} 
                alt={t.alt.destination} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full pt-10 pb-24 bg-[#f3f4f6] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-primary-blue" />
            <span className="text-primary-blue font-bold tracking-[0.25em] uppercase text-xs bg-transparent">
              {t.expert.tag}
            </span>
            <div className="h-[2px] w-12 bg-primary-blue" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary mb-8 leading-[1.15] tracking-tight">
            {t.expert.title}
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed font-light mb-10">
            {t.expert.desc}
          </p>

          <div className="flex items-center justify-center gap-4 group cursor-pointer" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-full border border-primary-blue/30 flex items-center justify-center group-hover:bg-primary-blue group-hover:text-white transition-all duration-300 text-primary-blue">
              <ArrowRight size={20} />
            </div>
            <span className="font-bold text-sm uppercase tracking-widest text-text-primary group-hover:text-primary-blue transition-colors">
              {t.nav.contact}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LargeCoverSection = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full py-0">
      <div className="w-full">
        <img 
          src="https://i.imgur.com/56Fv0QG.jpeg" 
          alt={t.alt.cover} 
          className="w-full h-auto object-cover min-h-[400px] lg:min-h-[600px]"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

import { GoogleGenAI } from "@google/genai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: '👋 ¡Hola! Soy tu asistente de Viajes Euroamerica. ¿Buscas destinos u ofertas?' }
  ]);
  const [turnCount, setTurnCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isFinished || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    const newTurnCount = turnCount + 1;
    setTurnCount(newTurnCount);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // System instruction with website context
      const systemInstruction = `
        Eres un asistente de ventas virtual experto y persuasivo para "Viajes Euroamerica".
        Tu objetivo es conectar con el usuario y guiarlo a la compra de forma natural.
        
        INFORMACIÓN DE LA EMPRESA:
        - Nombre: Viajes Euroamerica
        - Especialidad: Viajes de lujo, experiencias a medida, lunas de miel.
        - Contacto: ventas1@veuroamerica.com, +502 2320-4949.
        
        REGLAS DE ORO (SÍGUELAS ESTRICTAMENTE):
        1. **BREVEDAD EXTREMA**: Tus respuestas NO deben superar las 40 palabras. Sé directo.
        2. **TONO NATURAL**: Habla como una persona real en WhatsApp. Usa emojis ocasionalmente. Evita formalismos robóticos.
        3. **PERSUASIÓN SUTIL**: No suenes desesperado por vender. Despierta el deseo con adjetivos sensoriales (ej: "inolvidable", "exclusivo").
        4. **OBJETIVO**: Tu meta es que pidan una cotización.
        5. **INFORMACIÓN**: Si no sabes algo, sugiere contactar a un asesor humano.
        
        Estás en el turno ${newTurnCount} de 7.
        
        ${newTurnCount >= 7 ? 
          "IMPORTANTE: Es el último mensaje. Despídete corto y pide llenar el formulario." : 
          "Termina cada respuesta con una pregunta corta o invitación a cotizar."}
      `;

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
        history: messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      });

      const result = await chat.sendMessage({ message: userText });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);

      if (newTurnCount >= 7) {
        setIsFinished(true);
      }

    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Lo siento, tuve un problema técnico. Por favor, contáctanos directamente por WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[80] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[90vw] sm:w-[400px] max-h-[80vh] flex flex-col overflow-hidden mb-2"
          >
            {/* Header */}
            <div className="bg-primary-blue p-4 flex items-center justify-between text-white shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                    <img src="https://i.imgur.com/EOI35iq.png" alt="Bot" className="w-8 h-8 object-contain brightness-0 invert" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary-blue rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-base">Asistente Virtual</h3>
                  <p className="text-[10px] opacity-90 uppercase tracking-wider font-medium">En línea</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 bg-gray-50 p-4 overflow-y-auto min-h-[300px] sm:min-h-[400px]">
              <div className="flex flex-col gap-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full border border-gray-100 flex-shrink-0 flex items-center justify-center p-1 shadow-sm ${msg.role === 'user' ? 'bg-primary-blue text-white' : 'bg-white'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <img src="https://i.imgur.com/EOI35iq.png" alt="Bot" className="w-full h-full object-contain" />}
                    </div>
                    <div className={`p-3.5 rounded-2xl shadow-sm text-sm max-w-[85%] leading-relaxed ${msg.role === 'user' ? 'bg-primary-blue text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex-shrink-0 flex items-center justify-center p-1 shadow-sm">
                      <img src="https://i.imgur.com/EOI35iq.png" alt="Bot" className="w-full h-full object-contain" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-600 border border-gray-100">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-primary-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-primary-blue/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-primary-blue/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
                
                {isFinished && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mt-2 pb-2"
                  >
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-green-500 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-green-600 transition-all hover:scale-105 flex items-center gap-2 animate-pulse"
                    >
                      Ir al Formulario <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white z-10">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isFinished ? "Chat finalizado" : "Escribe tu mensaje..."}
                  disabled={isFinished || isLoading}
                  className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button 
                  type="submit"
                  disabled={isFinished || isLoading || !inputMessage.trim()}
                  className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  <Send size={20} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center border border-gray-100 relative group z-[80]"
      >
        <img 
          src="https://i.imgur.com/EOI35iq.png" 
          alt="Chatbot" 
          className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300" 
        />
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-blue border-2 border-white"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://i.imgur.com/BpkJOyb.png" 
              alt={t.alt.logo} 
              className="h-28 lg:h-36 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <p className="text-white/60 mb-8 leading-relaxed max-w-md">
            {t.footer.desc}
          </p>
          <div className="flex gap-4">
            <a href="https://wa.me/50242585242" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-blue transition-colors">
              <WhatsAppIcon size={18} />
            </a>
            <a href="https://www.facebook.com/share/1E8AbNsETu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-blue transition-colors">
              <Facebook size={18} />
            </a>
            <a href="mailto:ventas1@veuroamerica.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-blue transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <div className="md:text-right">
          <h4 className="text-lg font-bold mb-8">{t.footer.contact}</h4>
          <ul className="space-y-4 text-white/60">
            <li className="flex items-center md:justify-end gap-2"><MapPin size={14} /> 4a Ave 15-70 zona 10, Guatemala City</li>
            <li className="flex items-center md:justify-end gap-2"><Phone size={14} /> +502 2320-4949</li>
            <li className="flex items-center md:justify-end gap-2"><Mail size={14} /> ventas1@veuroamerica.com</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-10 border-t border-white/10 text-center text-white/40 text-sm">
        <p>© 2026 Viajes Euroamerica. {t.footer.rights}</p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div className="min-h-screen selection:bg-primary-blue selection:text-white">
        <AnimatePresence mode="wait">
          {isLoading && (
            <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>
        
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            <main>
              <Hero />
              <ProfessionalCover />
              <ExclusiveOffers />
              <ImageBannerSection />
              <ExpertiseSection />
              <WorldDestinations />
              <LargeCoverSection />
              <ContactSection />
            </main>
            <Footer />
            <LanguageSwitcher />
            <Chatbot />
          </motion.div>
        )}
      </div>
    </LanguageContext.Provider>
  );
}
