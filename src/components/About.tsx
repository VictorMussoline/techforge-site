import { Cpu, ShieldCheck, Zap } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const entry = useIntersectionObserver(divRef, {
    threshold: 0.6,
    rootMargin: '-10% 0px -10% 0px',
  });
  
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    if (isTouch) {
      if (isIntersecting && divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: rect.width / 2, y: rect.height / 2 });
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    }
  }, [isTouch, isIntersecting]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouch || !divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); if (!isIntersecting) setOpacity(0); setRotation({ x: 0, y: 0 }); };
  const handleMouseEnter = () => { if (!isTouch) setOpacity(1); };
  const handleMouseLeave = () => {
    if (!isTouch) {
      setOpacity(0);
      setRotation({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bg-brand-dark p-6 rounded-xl block transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.3)] ${
        index === 2 ? "sm:col-span-2" : ""
      }`}
      style={{
        border: '1px solid rgba(255,255,255,0.05)',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${opacity === 1 ? 1.02 : 1}, ${opacity === 1 ? 1.02 : 1}, 1)`,
        transition: opacity === 1 ? 'transform 0.5s ease-out' : 'transform 2s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Background Glow Interno */}
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(153, 27, 27, 0.15), transparent 40%)`,
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out'
        }}
      />

      {/* Borda Glow Vermelho */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.8), transparent 40%)`,
          zIndex: 1,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out'
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
        <p className="text-sm text-gray-400">{feature.description}</p>
      </div>
    </div>
  );
}

export function About() {
  const features = [
    {
      icon: <Zap size={32} className="text-brand-red" />,
      title: 'Rapidez no Serviço',
      description: 'Diagnosticamos e resolvemos o seu problema no menor tempo possível.'
    },
    {
      icon: <Cpu size={32} className="text-brand-red" />,
      title: 'Especialistas',
      description: 'Equipe altamente qualificada para lidar com hardwares de última geração.'
    },
    {
      icon: <ShieldCheck size={32} className="text-brand-red" />,
      title: 'Garantia de Qualidade',
      description: 'Todos os nossos serviços contam com garantia e peças de procedência.'
    }
  ];

  return (
    <section id="about" className="py-12 bg-brand-gray relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre a <span className="text-white">Tech</span><span className="text-brand-red">Forge</span>
            </h2>
            <div className="border-l-4 border-brand-red pl-4 mb-6">
              <p className="text-gray-300 leading-relaxed">
                Na <span className="text-white">Tech</span><span className="text-brand-red">Forge</span>, nós entendemos que o seu computador é mais do que uma máquina — é a sua ferramenta de trabalho, sua central de entretenimento e sua conexão com o mundo. Por isso, tratamos cada equipamento como se fosse nosso.
              </p>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Com anos de experiência no mercado de hardware e software, nossa assistência técnica é referência em montagem de PCs gamers, reparos em placas-mãe de notebooks e otimização de sistemas.
            </p>
            
            <a href="#contact" className="inline-block bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-brand-red/30">
              Fale com um Especialista
            </a>
          </div>

          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
