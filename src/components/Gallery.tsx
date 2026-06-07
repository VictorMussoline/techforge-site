export function Gallery() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Manutenção de PC Gamer' },
    { src: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Reparo em Placa Mãe' },
    { src: 'https://images.unsplash.com/photo-1624704146112-9c4c1a704da8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Limpeza de Notebook' },
    { src: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Instalação de Water Cooler' },
    { src: 'https://images.unsplash.com/photo-1544156050-705b637a2a0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Cable Management' },
    { src: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Diagnóstico de Hardware' }
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos <span className="text-brand-red">Serviços</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Confira um pouco do nosso dia a dia na bancada da Tech Forge.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-brand-gray">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-semibold text-lg">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
