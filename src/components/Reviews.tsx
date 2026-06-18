import { Star } from 'lucide-react';

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
    author_name: "Cliente Satisfeito",
    profile_photo_url: "https://ui-avatars.com/api/?name=Cliente+Satisfeito&background=random",
    rating: 5,
    text: "Serviço excelente e de muita confiança. A equipe da TechForge resolveu o problema do meu PS4 rapidamente.",
    relative_time_description: "Avaliação Local",
    review_url: "" // Cole o link da avaliação deste cliente aqui
  }
];

export function Reviews() {

  return (
    <section id="reviews" className="py-24 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem <span className="text-brand-red">nossos clientes</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Confira as avaliações reais do nosso perfil no Google Meu Negócio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review) => {
            const CardWrapper = review.review_url ? 'a' : 'div';
            return (
              <CardWrapper
                key={review.id}
                href={review.review_url || undefined}
                target={review.review_url ? "_blank" : undefined}
                rel={review.review_url ? "noopener noreferrer" : undefined}
                className={`bg-brand-dark rounded-xl p-8 border border-white/5 shadow-xl relative block ${review.review_url ? 'hover:border-brand-red/50 hover:-translate-y-1 transition-all cursor-pointer' : ''}`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img src={review.profile_photo_url} alt={review.author_name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-white">{review.author_name}</h4>
                    <p className="text-xs text-gray-500">{review.relative_time_description}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                  "{review.text}"
                </p>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
