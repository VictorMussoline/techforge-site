import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useRef, useState } from 'react';
import { Embers } from './Embers';

function InteractiveContactCard({
  icon: Icon,
  title,
  children,
  buttonAction
}: {
  icon: any,
  title: string,
  children: React.ReactNode,
  buttonAction?: { label: string, onClick?: () => void, href?: string }
}) {
  const divRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current || isFocused) return;
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
  const handleBlur = () => { setIsFocused(false); setOpacity(0); setRotation({ x: 0, y: 0 }); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => {
    setOpacity(0);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bg-brand-gray rounded-xl p-6 flex items-center justify-between transition-shadow duration-300 ${buttonAction ? 'hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.2)]' : ''}`}
      style={{
        border: '1px solid rgba(255,255,255,0.05)',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${opacity === 1 ? 1.01 : 1}, ${opacity === 1 ? 1.01 : 1}, 1)`,
        transition: opacity === 1 ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(153, 27, 27, 0.15), transparent 40%)`,
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out'
        }}
      />

      <div
        className="pointer-events-none absolute -inset-px rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.8), transparent 40%)`,
          zIndex: 1,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out'
        }}
      />

      <div className="relative z-10 flex items-start gap-4 w-full">
        <Icon className="text-brand-red shrink-0 mt-1" size={24} />
        <div className="flex-1">
          <h4 className="font-bold mb-1 text-white">{title}</h4>
          <div className="text-gray-400 text-sm">
            {children}
          </div>
        </div>

        {buttonAction && (
          <div className="shrink-0 self-center z-20">
            {buttonAction.href ? (
              <a
                href={buttonAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red font-medium rounded-lg border border-brand-red/20 hover:bg-brand-red hover:text-white transition-colors text-sm"
              >
                {buttonAction.label}
              </a>
            ) : (
              <button
                onClick={buttonAction.onClick}
                className="px-4 py-2 bg-brand-red/10 text-brand-red font-medium rounded-lg border border-brand-red/20 hover:bg-brand-red hover:text-white transition-colors text-sm cursor-pointer"
              >
                {buttonAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveMapCard({ children }: { children: React.ReactNode }) {
  const divRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="lg:w-2/3 rounded-xl overflow-hidden border border-white/5 h-[400px] lg:h-auto bg-brand-gray relative transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.2)] group"

    >
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(153, 27, 27, 0.15), transparent 40%)`,
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out',
          zIndex: 10
        }}
      />

      <div
        className="pointer-events-none absolute -inset-px rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.8), transparent 40%)`,
          zIndex: 11,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out'
        }}
      />

      {/* Camada invisível para capturar o mouse por cima do iframe sem travar a navegação inicial, mas que não bloqueia clicks */}
      <div className="absolute inset-0 z-0 bg-transparent group-hover:pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-0">
        {children}
      </div>
    </div>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contato@techforge.com.br");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark relative overflow-hidden">
      <Embers />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em <span className="text-brand-red">Contato</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Traga sua máquina para um diagnóstico ou entre em contato pelos nossos canais.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 flex flex-col gap-6">

            <InteractiveContactCard
              icon={MapPin}
              title="Localização"
              buttonAction={{
                label: "Ir",
                href: "https://www.google.com/maps/dir//TechForge,+R.+Dr.+Alt%C3%ADno+Arantes,+1200+-+Parque+Universitario,+Franca+-+SP,+14404-614/@-20.5718785,-47.405108,19z/data=!4m17!1m7!3m6!1s0x94b0a9d4e80510fd:0xc357bc32cb32559a!2sTechForge!8m2!3d-20.5718785!4d-47.405108!16s%2Fg%2F11n55tgbz5!4m8!1m0!1m5!1m1!1s0x94b0a9d4e80510fd:0xc357bc32cb32559a!2m2!1d-47.405108!2d-20.5718785!3e0?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
              }}
            >
              R. Dr. Altíno Arantes, 1200 - Parque Universitario<br />Franca - SP, 14404-614
            </InteractiveContactCard>

            <InteractiveContactCard
              icon={Phone}
              title="Telefone / WhatsApp"
              buttonAction={{
                label: "Chamar",
                href: "https://wa.me/5516994295371"
              }}
            >
              (16) 99429-5371
            </InteractiveContactCard>

            <InteractiveContactCard
              icon={Mail}
              title="E-mail"
              buttonAction={{
                label: copied ? "Copiado!" : "Copiar",
                onClick: handleCopyEmail
              }}
            >
              contato@techforge.com.br
            </InteractiveContactCard>

            <InteractiveContactCard
              icon={Clock}
              title="Horário de Funcionamento"
            >
              Seg - Sex: Atendimento 24 horas<br />Sáb e Dom: Fechado
            </InteractiveContactCard>

          </div>

          <InteractiveMapCard>
            <iframe
              src="https://maps.google.com/maps?q=TechForge,%20Rua%20Dr.%20Alt%C3%ADno%20Arantes,%201200%20-%20Franca%20-%20SP&hl=pt-BR&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Tech Forge"
            ></iframe>
          </InteractiveMapCard>
        </div>
      </div>
    </section>
  );
}
