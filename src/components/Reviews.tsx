import { Star } from 'lucide-react';
import { useRef, useState } from 'react';

// ==========================================
// ⭐️ AVALIAÇÕES DOS CLIENTES
// ==========================================
// Para adicionar as melhores avaliações:
// 1. Tire print (ou baixe) a foto de perfil do seu cliente no Google Maps.
// 2. Salve a imagem dentro da pasta: /public/reviews/ (ex: 'public/reviews/joao.jpg')
// 3. Troque o link no campo "profile_photo_url" para o nome do arquivo, ex: "/reviews/joao.jpg"
// 4. Altere o nome e o texto conforme está no Google.
// 5. Adicione o link direto da avaliação no campo "review_url" (opcional).
// Nota: Se você deixar o link do ui-avatars.com, ele vai gerar uma imagem com as iniciais automaticamente!

const REVIEWS_DATA = [
  {
    id: 1,
    author_name: "Henrique Cintra",
    // Exemplo de como usar uma foto local: profile_photo_url: "/reviews/henrique.jpg",
    profile_photo_url: "/reviews/henrique_cintra.png",
    rating: 5,
    text: "Profissional super dedicado e comprometido, me atendeu em uma emergência e foi muito atencioso, recomento muito!",
    relative_time_description: "Avaliação Google",
    review_url: "https://share.google/PSp3Z0TlUYiiDALZx"
  },
  {
    id: 2,
    author_name: "Fernanda Souza",
    profile_photo_url: "/reviews/fernanda_souza.png",
    rating: 5,
    text: "Excelente atendimento! Resolveu tudo com muita rapidez e cuidado. Muito atencioso e profissional. Super recomendo!",
    relative_time_description: "Avaliação Google",
    review_url: "https://share.google/1jB0gH3LDyzBbbMFi"
  },
  {
    id: 3,
    author_name: "Beatriz Matias",
    profile_photo_url: "/reviews/beatriz_matias.png",
    rating: 5,
    text: "Serviço excelente e de muita confiança, rapidez e qualidade! Recomendo a todos!",
    relative_time_description: "Avaliação Google",
    review_url: "https://maps.app.goo.gl/t3zG9VKDg5EbWAFg8"
  }
];

function ReviewCard({ review }: { review: typeof REVIEWS_DATA[0] }) {
  const divRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();

    // Coordenadas para o Glow
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // Cálculo do Tilt 3D
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gira no máximo 8 graus para cada lado
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); setRotation({ x: 0, y: 0 }); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => {
    setOpacity(0);
    setRotation({ x: 0, y: 0 }); // Reseta o card quando o mouse sai
  };

  const CardWrapper = review.review_url ? 'a' : 'div';

  return (
    <CardWrapper
      ref={divRef}
      href={review.review_url || undefined}
      target={review.review_url ? "_blank" : undefined}
      rel={review.review_url ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Removemos o hover:-translate-y-2 do Tailwind porque vamos usar transform inline
      className={`relative overflow-hidden bg-brand-dark rounded-xl p-8 block transition-shadow duration-300 ${review.review_url ? 'cursor-pointer hover:shadow-[0_30px_50px_-15px_rgba(220,38,38,0.4)]' : ''}`}
      style={{
        border: '1px solid rgba(255,255,255,0.05)',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${opacity === 1 && review.review_url ? 1.02 : 1}, ${opacity === 1 && review.review_url ? 1.02 : 1}, 1)`,
        transition: opacity === 1 ? 'transform 0.5s ease-out' : 'transform 2s ease-out', // Transição rápida seguindo o mouse, mas lenta ao soltar
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Background Glow Interno */}
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(153, 27, 27, 0.15), transparent 40%)`, // Vermelho Escuro
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out'
        }}
      />

      {/* Borda Glow Vermelho Médio estilo "RGB" */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.8), transparent 40%)`, // Vermelho Médio
          zIndex: 1,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
          transition: opacity === 1 ? 'opacity 0.3s ease-out' : 'opacity 2s ease-out'
        }}
      />

      <div className="relative z-10">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img src={review.profile_photo_url} alt={review.author_name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
          <div>
            <h4 className="font-bold text-white">{review.author_name}</h4>
            <p className="text-xs text-gray-500">{review.relative_time_description}</p>
          </div>
        </div>

        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < review.rating ? "text-brand-red fill-brand-red" : "text-gray-600"} />
          ))}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">
          "{review.text}"
        </p>
      </div>
    </CardWrapper>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem <span className="text-brand-red">nossos clientes</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Confira as avaliações reais do nosso perfil no{' '}
            <a
              href="https://share.google/p8s2MLPrzDe7lHrIW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red font-bold transition-all duration-300 hover:text-white drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] hover:drop-shadow-[0_0_20px_rgba(220,38,38,1)]"
            >
              Google
            </a>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
