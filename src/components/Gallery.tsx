import { Embers } from './Embers';
import { useState, useEffect } from 'react';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type ServiceType = {
  title: string;
  description: string;
  features: string[];
  images: string[];
};

function GalleryCard({ item, onClick }: { item: ServiceType, onClick: () => void }) {
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
      className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-brand-gray cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-red/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
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
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
      
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-6">
        <span className="text-white font-bold text-xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</span>
        <span className="text-brand-red font-semibold flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
          Ver detalhes <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* Indicadores de progresso estilo Steam */}
      <div className={`absolute bottom-2 left-6 right-6 flex gap-1 z-30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
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

function ServiceModal({ service, onClose }: { service: ServiceType, onClose: () => void }) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-brand-dark border border-white/10 rounded-2xl w-full max-w-6xl max-h-full overflow-y-auto shadow-2xl flex flex-col lg:flex-row z-10"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-brand-red rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Images section */}
        <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 bg-black/20">
           {/* main image */}
           <div className="aspect-[4/3] rounded-xl overflow-hidden bg-brand-gray relative group">
              <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
           </div>
           {/* thumbnails */}
           <div className="grid grid-cols-2 gap-4">
              {service.images.slice(1).map((img, idx) => (
                 <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-brand-gray relative group">
                    <img src={img} alt={`${service.title} ${idx+2}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
              ))}
           </div>
        </div>
        
        {/* Content section */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative">
           {/* Decorative element */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl -z-10" />
           
           <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
             {service.title.split(' ').map((word, i, arr) => 
               i === arr.length - 1 ? <span key={i} className="text-brand-red">{word}</span> : word + ' '
             )}
           </h3>
           
           <p className="text-gray-300 text-lg mb-8 leading-relaxed">
             {service.description}
           </p>
           
           <h4 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
             O que está incluso
             <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
           </h4>
           
           <ul className="space-y-4 mb-10">
             {service.features.map((feature, idx) => (
               <motion.li 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 + 0.2 }}
                 key={idx} 
                 className="flex items-start gap-3 text-gray-300"
               >
                 <CheckCircle2 className="w-6 h-6 text-brand-red shrink-0" />
                 <span className="text-base">{feature}</span>
               </motion.li>
             ))}
           </ul>

           <div className="mt-auto pt-6 border-t border-white/10">
             <a 
               href="#contact" 
               onClick={onClose} 
               className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30"
             >
               Solicitar Orçamento
               <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  const services: ServiceType[] = [
    {
      title: 'Manutenção de PC Gamer',
      description: 'Oferecemos manutenção especializada e minuciosa para o seu setup gamer. Entendemos que cada frame importa, por isso focamos em otimizar as temperaturas, atualizar drivers e garantir a estabilidade máxima dos seus componentes durante as gameplays mais intensas.',
      features: [
        'Limpeza profunda de todos os componentes',
        'Troca de pasta térmica (alta condutividade)',
        'Teste de estresse e verificação de temperatura',
        'Atualização de BIOS e drivers',
      ],
      images: [
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://3ainfo.com.br/wp-content/uploads/2025/08/installed-system-unit-computer-i-adherent-transmitter-wireless-network-wifi_152904-67163.jpg',
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      title: 'Reparo em Placa Mãe',
      description: 'Nossa equipe possui laboratório avançado para análise e reparo de placas mãe em nível de componente. Realizamos desde a regravação de BIOS até a substituição de CIs, mosfets e capacitores, salvando seu equipamento de um descarte prematuro.',
      features: [
        'Análise de curtos e fugas de corrente',
        'Ressolda e troca de componentes SMD/BGA',
        'Regravação e recuperação de BIOS',
        'Desoxidação de circuitos',
      ],
      images: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      title: 'Limpeza de Notebook',
      description: 'Evite superaquecimento e lentidão! Realizamos a desmontagem completa do seu notebook para uma higienização rigorosa do sistema de refrigeração, garantindo maior vida útil e desempenho silencioso.',
      features: [
        'Desmontagem técnica completa',
        'Limpeza do cooler e dissipador',
        'Aplicação de pasta térmica em CPU/GPU',
        'Higienização externa da carcaça e tela',
      ],
      images: [
        'https://notebookce.com.br/wp-content/uploads/2025/04/Limpeza-interna-de-Notebook-1024x678.webp',
        'https://wsltech.com.br/wp-content/uploads/2024/05/limpeza-preventiva-1.jpg',
        'https://s.zst.com.br/cms-assets/2021/03/limpeza-notebook-1-.jpg'
      ]
    },
    {
      title: 'Instalação de Water Cooler',
      description: 'Maximize o resfriamento do seu processador com a instalação profissional de Water Coolers. Dimensionamos corretamente o radiador no gabinete, organizamos as mangueiras e configuramos as curvas de fan para um balanço perfeito entre temperatura e ruído.',
      features: [
        'Montagem segura no soquete do processador',
        'Posicionamento ideal do radiador (Push/Pull)',
        'Configuração de iluminação RGB/ARGB',
        'Ajuste das curvas de ventoinha na BIOS',
      ],
      images: [
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqr2B3fZKfxiIXIFIAgvQn4UROEBEtRwYTO7GaK_Vnu237I69w4UxCpCOgKyEkYuB-cncdNdoju_V6zQCJZM9QNUl6p_TcCORMtZQUA1zgttt4Yg9IXMwttnusxTGzG_0IE9CFhkoTUjJ7/s1024/abre.jpg',
        'https://preview.redd.it/o-que-acham-do-meu-cable-management-e-sobre-esse-water-v0-19a2h406d39c1.jpg?width=1080&crop=smart&auto=webp&s=ec1af95cb0e90c2771667c9208f847780cdff14d',
        'https://darkflash-image-cloud.s3.us-west-2.amazonaws.com/cdn/article/attach/000000000000177/202503310031549.jpg'
      ]
    },
    {
      title: 'Cable Management',
      description: 'Um setup bonito por fora e organizado por dentro. O cable management adequado não só melhora a estética, mas também otimiza o fluxo de ar dentro do gabinete, reduzindo as temperaturas gerais do sistema.',
      features: [
        'Organização e roteamento de cabos da fonte',
        'Ocultação de cabos do painel frontal e fans',
        'Melhoria no fluxo de ar (Airflow)',
        'Visual clean e profissional',
      ],
      images: [
        'https://scontent.frao1-1.fna.fbcdn.net/v/t39.30808-6/616180591_5109840739241714_5477682581185965080_n.jpg?stp=dst-jpg_tt6&cstp=mx1927x2048&ctp=s1927x2048&_nc_cat=110&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=5qoP-Vp4aDwQ7kNvwGwSjGP&_nc_oc=AdqXfBiN_tmMbwtP2tyDlZah1Pxpw78BlOnHFH3vkx4YvtuasyouS3A9FkdkVbZ23v4&_nc_zt=23&_nc_ht=scontent.frao1-1.fna&_nc_gid=HIZxWqBpX_PvjZhi7Zo4DQ&_nc_ss=7b2a8&oh=00_Af9ZV1VxxCr2K7EIKTkVuy-YujI40-M-gvtsm2zL4Wev6A&oe=6A3B2291',
        'https://preview.redd.it/notas-para-o-cable-management-v0-3xrimqi3qa6e1.jpg?width=1080&crop=smart&auto=webp&s=7758401ede8c503fd6fdd9889f63ac8344a4d774',
        'https://techguided.com/wp-content/uploads/2017/03/Behind-the-Motherboard-Cable-Management-768x768.jpg'
      ]
    },
    {
      title: 'Diagnóstico de Hardware',
      description: 'PC reiniciando, tela azul ou não liga? Nós identificamos a raiz do problema. Com ferramentas de diagnóstico avançadas, testamos processador, memória, placa de vídeo, fonte e armazenamento para apontar o defeito com precisão.',
      features: [
        'Teste de integridade do HD/SSD',
        'Análise de saúde das memórias RAM',
        'Teste de eficiência da fonte de alimentação',
        'Relatório técnico detalhado do defeito',
      ],
      images: [
        'https://i.ibb.co/LD2qCMcy/Chat-GPT-Image-Jun-19-2026-09-29-30-AM.png',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  return (
    <section id="gallery" className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
      <Embers />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos <span className="text-brand-red">Serviços</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Confira em detalhes o que a <span className="text-white font-semibold">Tech</span><span className="text-brand-red font-semibold">Forge</span> pode fazer pelo seu equipamento.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <GalleryCard key={idx} item={item} onClick={() => setSelectedService(item)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
