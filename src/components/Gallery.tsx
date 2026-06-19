import { Embers } from './Embers';
import { useState, useEffect } from 'react';

function GalleryCard({ item }: { item: { title: string, images: string[] } }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % item.images.length);
      }, 1000); // Muda a imagem a cada 1 segundo
    } else {
      setCurrentIndex(0); // Reseta para a primeira imagem ao tirar o mouse
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, item.images.length]);

  return (
    <div
      className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-brand-gray"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`${item.title} - ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${idx === currentIndex
            ? 'opacity-80 group-hover:opacity-100 group-hover:scale-110 z-10'
            : 'opacity-0 scale-100 z-0'
            }`}
        />
      ))}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <span className="text-white font-semibold text-lg">{item.title}</span>
      </div>

      {/* Indicadores de progresso estilo Steam */}
      <div className={`absolute bottom-2 left-6 right-6 flex gap-1 z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {item.images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-brand-red' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  const services = [
    {
      title: 'Manutenção de PC Gamer',
      images: [
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://3ainfo.com.br/wp-content/uploads/2025/08/installed-system-unit-computer-i-adherent-transmitter-wireless-network-wifi_152904-67163.jpg',
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      title: 'Reparo em Placa Mãe',
      images: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      title: 'Limpeza de Notebook',
      images: [
        'https://notebookce.com.br/wp-content/uploads/2025/04/Limpeza-interna-de-Notebook-1024x678.webp',
        'https://wsltech.com.br/wp-content/uploads/2024/05/limpeza-preventiva-1.jpg',
        'https://s.zst.com.br/cms-assets/2021/03/limpeza-notebook-1-.jpg'
      ]
    },
    {
      title: 'Instalação de Water Cooler',
      images: [
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqr2B3fZKfxiIXIFIAgvQn4UROEBEtRwYTO7GaK_Vnu237I69w4UxCpCOgKyEkYuB-cncdNdoju_V6zQCJZM9QNUl6p_TcCORMtZQUA1zgttt4Yg9IXMwttnusxTGzG_0IE9CFhkoTUjJ7/s1024/abre.jpg',
        'https://preview.redd.it/o-que-acham-do-meu-cable-management-e-sobre-esse-water-v0-19a2h406d39c1.jpg?width=1080&crop=smart&auto=webp&s=ec1af95cb0e90c2771667c9208f847780cdff14d',
        'https://darkflash-image-cloud.s3.us-west-2.amazonaws.com/cdn/article/attach/000000000000177/202503310031549.jpg'
      ]
    },
    {
      title: 'Cable Management',
      images: [
        'https://scontent.frao1-1.fna.fbcdn.net/v/t39.30808-6/616180591_5109840739241714_5477682581185965080_n.jpg?stp=dst-jpg_tt6&cstp=mx1927x2048&ctp=s1927x2048&_nc_cat=110&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=5qoP-Vp4aDwQ7kNvwGwSjGP&_nc_oc=AdqXfBiN_tmMbwtP2tyDlZah1Pxpw78BlOnHFH3vkx4YvtuasyouS3A9FkdkVbZ23v4&_nc_zt=23&_nc_ht=scontent.frao1-1.fna&_nc_gid=HIZxWqBpX_PvjZhi7Zo4DQ&_nc_ss=7b2a8&oh=00_Af9ZV1VxxCr2K7EIKTkVuy-YujI40-M-gvtsm2zL4Wev6A&oe=6A3B2291',
        'https://preview.redd.it/notas-para-o-cable-management-v0-3xrimqi3qa6e1.jpg?width=1080&crop=smart&auto=webp&s=7758401ede8c503fd6fdd9889f63ac8344a4d774',
        'https://techguided.com/wp-content/uploads/2017/03/Behind-the-Motherboard-Cable-Management-768x768.jpg'
      ]
    },
    {
      title: 'Diagnóstico de Hardware',
      images: [
        'https://i.ibb.co/LD2qCMcy/Chat-GPT-Image-Jun-19-2026-09-29-30-AM.png',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  return (
    <section id="gallery" className="py-12 bg-brand-dark relative overflow-hidden">
      <Embers />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos <span className="text-brand-red">Serviços</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Confira um pouco do nosso dia a dia na bancada da <span className="text-white">Tech</span><span className="text-brand-red">Forge</span>.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <GalleryCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
