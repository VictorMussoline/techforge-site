import { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Wrench, MessageSquare, Phone } from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { id: 'hero', label: 'Início', icon: Home },
  { id: 'about', label: 'Sobre Nós', icon: Info },
  { id: 'gallery', label: 'Serviços', icon: Wrench },
  { id: 'reviews', label: 'Avaliações', icon: MessageSquare },
  { id: 'contact', label: 'Contato', icon: Phone },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
      <div className={cn(
        "pointer-events-auto bg-[#1a1a1a]/85 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 w-full",
        scrolled ? "max-w-4xl shadow-2xl" : "max-w-5xl shadow-xl"
      )}>
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="Tech Forge" className="h-8 object-contain" />
          <span className="font-bold tracking-tighter text-xl text-white">TECH<span className="text-brand-red">FORGE</span></span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "text-sm font-semibold transition-colors relative group",
                activeSection === id ? "text-brand-red" : "text-gray-400 hover:text-white"
              )}
            >
              {label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-0.5 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
                activeSection === id && "scale-x-100"
              )} />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (Modalzinho) */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden md:hidden z-40">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left font-medium",
                  activeSection === id 
                    ? "bg-brand-red/10 text-brand-red" 
                    : "text-gray-300 hover:bg-white/5"
                )}
              >
                <Icon size={20} className={activeSection === id ? "text-brand-red" : ""} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
