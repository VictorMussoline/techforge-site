import { motion } from 'framer-motion';

import { Embers } from './Embers';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-dark pt-16 md:pt-0">
      <Embers />
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: 'url("/background/setup_techforge.png")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-brand-dark/50 to-brand-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              O Poder da <span className="text-brand-red">Tecnologia</span> em Suas Mãos
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
              Assistência Técnica Especializada em PCs e Notebooks. A Tech Forge resolve seus problemas com qualidade, agilidade e transparência.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg inline-flex justify-center items-center"
            >
              Fazer Orçamento
            </a>
            <a
              href="#gallery"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg inline-flex justify-center items-center"
            >
              Nossos Serviços
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
