import { Cpu, ShieldCheck, Zap } from 'lucide-react';

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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre a <span className="text-brand-red">Tech Forge</span></h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Na Tech Forge, nós entendemos que o seu computador é mais do que uma máquina — é a sua ferramenta de trabalho, sua central de entretenimento e sua conexão com o mundo. Por isso, tratamos cada equipamento como se fosse nosso.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Com anos de experiência no mercado de hardware e software, nossa assistência técnica é referência em montagem de PCs gamers, reparos em placas-mãe de notebooks e otimização de sistemas.
            </p>
          </div>

          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((feature, index) => (
              <div key={index} className="bg-brand-dark p-6 rounded-xl border border-white/5 hover:border-brand-red/30 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
